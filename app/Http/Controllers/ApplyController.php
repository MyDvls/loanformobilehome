<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ApplyLoanRequest;
use Illuminate\Support\Facades\Http;

class ApplyController extends Controller
{
    public function apply(ApplyLoanRequest $request)
    {
        try {
            \Log::info('Apply Loan Request', $request->all());
            // Headers for all API requests
            $headers = [
                'Authorization' => 'Bearer ' . env('LOANPRO_AUTH_TOKEN'),
                'Autopal-Instance-Id' => env('LOANPRO_INSTANCE_ID'),
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
                \Log::error('Customer Creation Failed', $customerResponse->json());
                return response()->json(['error' => 'Failed to create customer'], 500);
            }

            $customer = $customerResponse->json();
            \Log::info('Customer Created', $customer);
            // Assuming the response follows a similar structure to collateral with 'd.results'
            $customerId = $customer['d']['id'] ?? null;
            if (!$customerId) {
                return response()->json(['error' => 'Customer ID not found in response'], 500);
            }

            // Step 2: Create Loan
            $loanData = $request->input('loan');
            // Ensure Collateral is structured with "results"
            if (isset($loanData['Collateral']) && is_array($loanData['Collateral']) && !isset($loanData['Collateral']['results'])) {
                $loanData['Collateral'] = ['results' => $loanData['Collateral']];
            }
            $loanData['Customers'] = [
                'results' => [
                    [
                        '__id' => $customerId,
                        '__setLoanRole' => 'loan.customerRole.primary',
                    ],
                ],
            ];

            $loanResponse = Http::withHeaders($headers)->post(
                'https://loanpro.simnang.com/api/public/api/1/odata.svc/Loans',
                $loanData
            );

            \Log::info('Loan Created', $loanResponse->json());
            if (!$loanResponse->successful()) {
                return response()->json(['error' => 'Failed to create loan'], 500);
            }

            $loan = $loanResponse->json();
            $loanId =  $loan['d']['id'] ?? null;
            if (!$loanId) {
                return response()->json(['error' => 'Loan ID not found in response'], 500);
            }

            // Step 3: Get Collateral ID from Loan
            $collateralResponse = Http::withHeaders($headers)->get(
                "https://loanpro.simnang.com/api/public/api/1/odata.svc/Loans({$loanId})/Collateral"
            );

            if (!$collateralResponse->successful()) {
                return response()->json(['error' => 'Failed to retrieve collateral'], 500);
            }

            $collateralData = $collateralResponse->json();
            \Log::info('Collateral Retrieved', $collateralData);
            $collateral = $collateralData['d']['results'][0] ?? null;
            if (!$collateral) {
                return response()->json(['error' => 'Collateral not found'], 500);
            }
            $collateralId = $collateral['id'];

            // Step 4: Update Collateral Custom Field Values
            $collateralCustomFields = $request->input('collateralCustomFields');
            $collateral['CustomFieldValues'] = [
                'results' => $collateralCustomFields,
            ];
            $collateral['__update'] = true;
            $collateral['__id'] = $collateralId;
            $collateral['__metadata'] = [
                'uri' => "https://loanpro.simnang.com/api/public/api/1/odata.svc/Collateral(id={$collateralId})",
                'type' => 'Entity.Collateral',
            ];

            $updatePayload = [
                'Collateral' => [
                    'results' => [$collateral],
                ],
            ];

            $updateResponse = Http::withHeaders($headers)->put(
                "https://loanpro.simnang.com/api/public/api/1/odata.svc/Loans({$loanId})",
                $updatePayload
            );
            \Log::info('Collateral Custom Fields Updated', $updateResponse->json());
            if (!$updateResponse->successful()) {
                return response()->json(['error' => 'Failed to update collateral custom fields'], 500);
            }

            return response()->json(['message' => 'Loan application processed successfully'], 200);
        } catch (\Exception $e) {
            \Log::error('Error in Apply Loan', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'An error occurred while processing the loan application'], 500);
        }
    }
}
