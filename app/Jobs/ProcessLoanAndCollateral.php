<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;

class ProcessLoanAndCollateral implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $loanData;
    protected $customerId;
    protected $collateralCustomFields;
    protected $headers;

    public function __construct(array $loanData, int $customerId, array $collateralCustomFields, array $headers)
    {
        $this->loanData = $loanData;
        $this->customerId = $customerId;
        $this->collateralCustomFields = $collateralCustomFields;
        $this->headers = $headers;
    }

    public function handle(): void
    {
        // Step 1: Create Loan
        if (isset($this->loanData['Collateral']) && is_array($this->loanData['Collateral']) && !isset($this->loanData['Collateral']['results'])) {
            $this->loanData['Collateral'] = ['results' => $this->loanData['Collateral']];
        }
        $this->loanData['Customers'] = [
            'results' => [
                [
                    '__id' => $this->customerId,
                    '__setLoanRole' => 'loan.customerRole.primary',
                ],
            ],
        ];

        \Log::info('Creating Loan', $this->loanData);

        $loanResponse = Http::withHeaders($this->headers)->post(
            'https://loanpro.simnang.com/api/public/api/1/odata.svc/Loans',
            $this->loanData
        );

        if (!$loanResponse->successful()) {
            \Log::error('Loan Creation Failed', $loanResponse->json());
            $this->fail(new \Exception('Failed to create loan'));
            return;
        }

        $loan = $loanResponse->json();
        \Log::info('Loan Created', $loan);
        $loanId = $loan['d']['id'] ?? null;
        if (!$loanId) {
            \Log::error('Loan ID not found in response');
            $this->fail(new \Exception('Loan ID not found'));
            return;
        }

        // Step 2: Get Collateral ID
        $collateralResponse = Http::withHeaders($this->headers)->get(
            "https://loanpro.simnang.com/api/public/api/1/odata.svc/Loans({$loanId})/Collateral"
        );

        if (!$collateralResponse->successful()) {
            \Log::error('Collateral Retrieval Failed', $collateralResponse->json());
            $this->fail(new \Exception('Failed to retrieve collateral'));
            return;
        }

        $collateralData = $collateralResponse->json();
        \Log::info('Collateral Retrieved', $collateralData);
        $collateral = $collateralData['d']['results'][0] ?? null;
        if (!$collateral) {
            \Log::error('Collateral not found');
            $this->fail(new \Exception('Collateral not found'));
            return;
        }
        $collateralId = $collateral['id'];

        // Step 3: Update Collateral Custom Fields
        $customFields = collect($this->collateralCustomFields)->map(function ($field) {
            $value = $field['customFieldValue'];

            // Normalize booleans to "1"/"0"
            if (is_bool($value)) {
                $value = $value ? "1" : "0";
            } elseif ($value === null) {
                $value = ""; // keep nulls as empty string
            } else {
                $value = (string) $value; // fallback for text/numbers
            }

            return [
                'customFieldId'    => (int) $field['customFieldId'],
                'customFieldValue' => $value,
            ];
        })->toArray();
        $collateral['CustomFieldValues'] = ['results' => $customFields];
        $collateral['__update'] = true;
        $collateral['__id'] = $collateralId;
        $collateral['__metadata'] = [
            'uri' => "https://loanpro.simnang.com/api/public/api/1/odata.svc/Collateral(id={$collateralId})",
            'type' => 'Entity.Collateral',
        ];

        $updatePayload = [
            'Collateral' => ['results' => [$collateral]],
        ];

        \Log::info('Updating Collateral Custom Fields', $updatePayload);
        $updateResponse = Http::withHeaders($this->headers)->put(
            "https://loanpro.simnang.com/api/public/api/1/odata.svc/Loans({$loanId})",
            $updatePayload
        );

        if (!$updateResponse->successful()) {
            \Log::error('Collateral Custom Fields Update Failed', $updateResponse->json());
            $this->fail(new \Exception('Failed to update collateral custom fields'));
            return;
        }

        \Log::info('Collateral Custom Fields Updated', $updateResponse->json());
    }
}
