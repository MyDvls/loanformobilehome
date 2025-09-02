<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeolocationController extends Controller
{
    /**
     * Get user's location based on their IP address
     */
    public function getUserLocation(Request $request): JsonResponse
    {
        $ip = $request->ip();

        // For testing/localhost, use a default state
        if ($ip === '127.0.0.1' || $ip === '::1' || str_starts_with($ip, '192.168.') || str_starts_with($ip, '10.')) {
            return response()->json([
                'success' => true,
                'state' => 'Colorado', // Default state for localhost
                'city' => 'Denver',
                'ip' => $ip,
            ]);
        }

        try {
            // Using ipapi.co free service (no API key required, 100 requests/day)
            $response = Http::timeout(5)->get("https://ipapi.co/{$ip}/json/");

            if ($response->successful()) {
                $data = $response->json();

                // Map the state abbreviation to full state name
                $stateMapping = [
                    'AL' => 'Alabama',
                    'AK' => 'Alaska',
                    'AZ' => 'Arizona',
                    'AR' => 'Arkansas',
                    'CA' => 'California',
                    'CO' => 'Colorado',
                    'CT' => 'Connecticut',
                    'DE' => 'Delaware',
                    'FL' => 'Florida',
                    'GA' => 'Georgia',
                    'HI' => 'Hawaii',
                    'ID' => 'Idaho',
                    'IL' => 'Illinois',
                    'IN' => 'Indiana',
                    'IA' => 'Iowa',
                    'KS' => 'Kansas',
                    'KY' => 'Kentucky',
                    'LA' => 'Louisiana',
                    'ME' => 'Maine',
                    'MD' => 'Maryland',
                    'MA' => 'Massachusetts',
                    'MI' => 'Michigan',
                    'MN' => 'Minnesota',
                    'MS' => 'Mississippi',
                    'MO' => 'Missouri',
                    'MT' => 'Montana',
                    'NE' => 'Nebraska',
                    'NV' => 'Nevada',
                    'NH' => 'New Hampshire',
                    'NJ' => 'New Jersey',
                    'NM' => 'New Mexico',
                    'NY' => 'New York',
                    'NC' => 'North Carolina',
                    'ND' => 'North Dakota',
                    'OH' => 'Ohio',
                    'OK' => 'Oklahoma',
                    'OR' => 'Oregon',
                    'PA' => 'Pennsylvania',
                    'RI' => 'Rhode Island',
                    'SC' => 'South Carolina',
                    'SD' => 'South Dakota',
                    'TN' => 'Tennessee',
                    'TX' => 'Texas',
                    'UT' => 'Utah',
                    'VT' => 'Vermont',
                    'VA' => 'Virginia',
                    'WA' => 'Washington',
                    'WV' => 'West Virginia',
                    'WI' => 'Wisconsin',
                    'WY' => 'Wyoming',
                ];

                $stateCode = $data['region_code'] ?? null;
                $stateName = $stateCode ? ($stateMapping[$stateCode] ?? $stateCode) : null;

                if ($stateName && $data['country_code'] === 'US') {
                    return response()->json([
                        'success' => true,
                        'state' => $stateName,
                        'city' => $data['city'] ?? '',
                        'ip' => $ip,
                    ]);
                }
            }
        } catch (\Exception $e) {
            Log::warning('Geolocation API failed', [
                'error' => $e->getMessage(),
                'ip' => $ip,
            ]);
        }

        // Fallback: return null so frontend can handle gracefully
        return response()->json([
            'success' => false,
            'state' => null,
            'city' => null,
            'ip' => $ip,
            'message' => 'Could not determine location',
        ]);
    }
}
