<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Visit;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // 1. Customers per day for the last 7 days
        $customersPerDay = Customer::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as count'))
            ->where('created_at', '>=', now()->subDays(7))
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->map(function ($item) {
                return [
                    'date' => Carbon::parse($item->date)->format('M j'),
                    'customers' => $item->count,
                ];
            });

        // 2. Total customers this month
        $customersThisMonth = Customer::whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->count();

        // 3. Conversion rate
        $totalCustomers = Customer::whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->count();

        $totalVisits = Visit::whereMonth('visited_at', now()->month)
            ->whereYear('visited_at', now()->year)
            ->count();

        $conversionRate = $totalVisits > 0 ? round(($totalCustomers / $totalVisits) * 100, 1) : 0;

        // 4. Enhanced latest customers with additional information
        $latestCustomers = Customer::orderBy('created_at', 'desc')
            ->take(3)
            ->get()
            ->map(function ($customer) {
                return [
                    'id' => $customer->id,
                    'name' => trim($customer->first_name . ' ' . $customer->last_name),
                    'email' => $customer->email,
                    'date' => $customer->created_at->diffForHumans(),
                    'status' => $customer->status ?? 'active',
                    'customer_type' => $customer->customer_type ?? 'standard',
                    'location' => $this->formatLocation($customer),
                    'employer_company_name' => $customer->employer_company_name ?? 'Not specified',
                    'employer_title' => $customer->employer_title ?? 'Not specified',
                    'employer_income' => $customer->employer_income ?? 0,
                    'gender' => $customer->gender ?? 'Not specified',
                    'age' => $this->calculateAge($customer->birth_date),
                    'avatar' => $this->generateAvatar($customer->first_name, $customer->last_name),
                    'created_at_formatted' => $customer->created_at->format('M j, Y g:i A'),
                    'is_recent' => $customer->created_at->diffInHours() < 24,
                ];
            });

        // 5. Additional statistics for enhanced dashboard
        $customerStats = $this->getCustomerStatistics();

        return Inertia::render('Admin/Dashboard', [
            'chartData' => $customersPerDay,
            'customersThisMonth' => $customersThisMonth,
            'conversionRate' => $conversionRate,
            'latestCustomers' => $latestCustomers,
            'customerStats' => $customerStats,
        ]);
    }

    /**
     * Format customer location from address fields
     */
    private function formatLocation($customer)
    {
        $parts = array_filter([
            $customer->primary_city,
            $customer->primary_state,
        ]);

        return !empty($parts) ? implode(', ', $parts) : 'Location not specified';
    }

    /**
     * Calculate age from birth date
     */
    private function calculateAge($birthDate)
    {
        if (!$birthDate) {
            return null;
        }

        return Carbon::parse($birthDate)->age;
    }

    /**
     * Generate avatar initials
     */
    private function generateAvatar($firstName, $lastName)
    {
        $first = $firstName ? strtoupper(substr($firstName, 0, 1)) : '';
        $last = $lastName ? strtoupper(substr($lastName, 0, 1)) : '';

        return $first . $last;
    }

    /**
     * Get additional customer statistics
     */
    private function getCustomerStatistics()
    {
        return [
            'total_customers' => Customer::count(),
            'active_customers' => Customer::where('status', 'active')->count(),
            'premium_customers' => Customer::where('customer_type', 'premium')->count(),
            'customers_this_week' => Customer::where('created_at', '>=', now()->startOfWeek())->count(),
            'customers_today' => Customer::whereDate('created_at', today())->count(),
            'average_income' => Customer::whereNotNull('employer_income')
                ->where('employer_income', '>', 0)
                ->avg('employer_income'),
            'top_locations' => Customer::select('primary_city', 'primary_state', DB::raw('count(*) as count'))
                ->whereNotNull('primary_city')
                ->groupBy('primary_city', 'primary_state')
                ->orderByDesc('count')
                ->take(5)
                ->get()
                ->map(function ($item) {
                    return [
                        'location' => $item->primary_city . ', ' . $item->primary_state,
                        'count' => $item->count,
                    ];
                }),
            'gender_distribution' => Customer::select('gender', DB::raw('count(*) as count'))
                ->whereNotNull('gender')
                ->groupBy('gender')
                ->get()
                ->pluck('count', 'gender')
                ->toArray(),
        ];
    }

    /**
     * Get customers with filters and pagination
     */
    public function getCustomers(Request $request)
    {
        $query = Customer::query();

        // Apply filters
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->whereRaw("CONCAT(first_name, ' ', last_name) LIKE ?", ["%{$search}%"])
                    ->orWhere('email', 'LIKE', "%{$search}%")
                    ->orWhere('employer_company_name', 'LIKE', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        if ($request->filled('customer_type')) {
            $query->where('customer_type', $request->input('customer_type'));
        }

        if ($request->filled('location')) {
            $location = $request->input('location');
            $query->where(function ($q) use ($location) {
                $q->where('primary_city', 'LIKE', "%{$location}%")
                    ->orWhere('primary_state', 'LIKE', "%{$location}%");
            });
        }

        // Sort
        $sortBy = $request->input('sort_by', 'created_at');
        $sortDirection = $request->input('sort_direction', 'desc');
        $query->orderBy($sortBy, $sortDirection);

        // Paginate
        $customers = $query->paginate($request->input('per_page', 15));

        // Transform data
        $customers->getCollection()->transform(function ($customer) {
            return [
                'id' => $customer->id,
                'name' => trim($customer->first_name . ' ' . $customer->last_name),
                'email' => $customer->email,
                'status' => $customer->status ?? 'active',
                'customer_type' => $customer->customer_type ?? 'standard',
                'location' => $this->formatLocation($customer),
                'employer_company_name' => $customer->employer_company_name ?? 'Not specified',
                'employer_title' => $customer->employer_title ?? 'Not specified',
                'employer_income' => $customer->employer_income ?? 0,
                'gender' => $customer->gender ?? 'Not specified',
                'age' => $this->calculateAge($customer->birth_date),
                'avatar' => $this->generateAvatar($customer->first_name, $customer->last_name),
                'created_at' => $customer->created_at->format('M j, Y g:i A'),
                'created_at_human' => $customer->created_at->diffForHumans(),
                'phone' => $customer->primary_phone ?? 'Not provided',
            ];
        });

        return response()->json($customers);
    }
}
