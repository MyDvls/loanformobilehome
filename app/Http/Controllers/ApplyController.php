<?php

namespace App\Http\Controllers;

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
                'Authorization' => 'Bearer '.config('services.loanpro.auth_token'),
                'Autopal-Instance-Id' => config('services.loanpro.instance_id'),
            ];

            // Step 1: Create Customer
            $customerData = $request->input('customer');
            $customerData['__ignoreWarnings'] = true;
            // Ensure Phones is structured with "results"
            if (isset($customerData['Phones']) && is_array($customerData['Phones']) && ! isset($customerData['Phones']['results'])) {
                $customerData['Phones'] = ['results' => $customerData['Phones']];
            }

            $customerResponse = Http::withHeaders($headers)->post(
                'https://loanpro.simnang.com/api/public/api/1/odata.svc/Customers',
                $customerData
            );

            if (! $customerResponse->successful()) {
                $errorData = $customerResponse->json() ?? [];
                \Log::error('Customer Creation Failed', $errorData);

                // Extract the specific error message if available
                $errorMessage = 'Failed to create customer';
                if (isset($errorData['error']['message'])) {
                    $errorMessage = $errorData['error']['message'];
                } elseif (isset($errorData['message'])) {
                    $errorMessage = $errorData['message'];
                }

                return response()->json(['error' => $errorMessage], 500);
            }

            $customer = $customerResponse->json();
            \Log::info('Customer Created', $customer);
            // Assuming the response follows a similar structure to collateral with 'd.results'
            $customerId = $customer['d']['id'] ?? null;
            if (! $customerId) {
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
                    'Authorization' => 'Bearer '.config('services.mmls.auth_token'),
                ])->post(
                    $webhookUrl,
                    [
                        'customer_id' => (string) $customerId,
                    ]
                );

                if (! $mmlsResponse->successful()) {
                    $mmlsErrorData = $mmlsResponse->json() ?? [];
                    \Log::error('MMLS Response Failed', $mmlsErrorData);
                    \Log::error('MMLS Response Failed', [
                        'status' => $mmlsResponse->status(),
                        'body' => $mmlsResponse->body(),
                        'headers' => $mmlsResponse->headers(),
                    ]);

                    // Extract MMLS-specific error message
                    $mmlsErrorMessage = 'Failed to send customer information to MMLS';
                    if (isset($mmlsErrorData['error']['message'])) {
                        $mmlsErrorMessage = 'MMLS Error: '.$mmlsErrorData['error']['message'];
                    } elseif (isset($mmlsErrorData['message'])) {
                        $mmlsErrorMessage = 'MMLS Error: '.$mmlsErrorData['message'];
                    }

                    return response()->json(['error' => $mmlsErrorMessage], 500);
                }
            }

            return response()->json(['message' => 'Loan application processed successfully'], 200);
        } catch (\Exception $e) {
            \Log::error('Error in Apply Loan', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            // Return more specific error messages based on the exception
            $errorMessage = $e->getMessage();

            // Check if it's a validation error or HTTP error
            if (str_contains($errorMessage, 'validation') || str_contains($errorMessage, 'validate')) {
                return response()->json(['error' => $errorMessage], 422);
            }

            // For other errors, provide a more informative message
            if (str_contains($errorMessage, 'HTTP') || str_contains($errorMessage, 'connection')) {
                return response()->json(['error' => 'Service temporarily unavailable. Please try again later.'], 503);
            }

            return response()->json(['error' => $errorMessage], 500);
        }
    }
}
