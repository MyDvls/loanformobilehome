<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ApplyLoanRequest;
use App\Jobs\ProcessLoanAndCollateral;
use App\Jobs\SaveCustomerDetails;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class ApplyController extends Controller
{
    public function apply(ApplyLoanRequest $request)
    {
        try {
            \Log::info('Apply Loan Request', $request->all());
            // Headers for all API requests
            $headers = [
                'Authorization' => 'Bearer ' . config('services.loanpro.auth_token'),
                'Autopal-Instance-Id' => config('services.loanpro.instance_id'),
            ];

            // Step 1: Create Customer
            $customerData = $request->input('customer');
            $customerData['__ignoreWarnings'] = true;
            // Ensure Phones is structured with "results"
            if (isset($customerData['Phones']) && is_array($customerData['Phones']) && !isset($customerData['Phones']['results'])) {
                $customerData['Phones'] = ['results' => $customerData['Phones']];
            }

            $customerResponse = Http::withHeaders($headers)->post(
                'https://loanpro.simnang.com/api/public/api/1/odata.svc/Customers',
                $customerData
            );

            if (!$customerResponse->successful()) {
                \Log::error('Customer Creation Failed', $customerResponse->json() ?? []);
                return response()->json(['error' => 'Failed to create customer'], 500);
            }

            $customer = $customerResponse->json();
            \Log::info('Customer Created', $customer);
            // Assuming the response follows a similar structure to collateral with 'd.results'
            $customerId = $customer['d']['id'] ?? null;
            if (!$customerId) {
                return response()->json(['error' => 'Customer ID not found in response'], 500);
            }

            SaveCustomerDetails::dispatch($customerData);

            // Dispatch job to handle loan creation, collateral retrieval, and custom fields
            ProcessLoanAndCollateral::dispatch(
                $request->input('loan'),
                $customerId,
                $request->input('collateralCustomFields'),
                $headers
            );

            $loanData = $request->input('loan');
            $displayId = $loanData['displayId'] ?? null;

            if ($displayId && Str::contains($displayId, 'MMLS')) {
                Log::info('Apply Loan Request for MMLS', ['displayId' => $displayId]);
                // Get webhook url from services 
                $webhookUrl = config('services.mmls.webhook_url');
                $mmlsResponse = Http::withHeaders([
                    'Authorization' => 'Bearer ' . config('services.mmls.auth_token'),
                ])->post(
                    $webhookUrl,
                    [
                        'customer_id' => (string) $customerId,
                    ]
                );

                if (!$mmlsResponse->successful()) {
                    \Log::error('MMLS Response Failed', $mmlsResponse->json() ?? []);
                    \Log::error('MMLS Response Failed', [
                        'status' => $mmlsResponse->status(),
                        'body'   => $mmlsResponse->body(),
                        'headers' => $mmlsResponse->headers(),
                    ]);
                    return response()->json(['error' => 'Failed to send customer id to MMLS'], 500);
                }
            }

            return response()->json(['message' => 'Loan application processed successfully'], 200);
        } catch (\Exception $e) {
            \Log::error('Error in Apply Loan', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'An error occurred while processing the loan application'], 500);
        }
    }
}
