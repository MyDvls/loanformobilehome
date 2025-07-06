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

        // 3. Conversion rate (assuming Visit model exists)
        $totalCustomers = Customer::whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->count();

        $totalVisits = Visit::whereMonth('visited_at', now()->month)
            ->whereYear('visited_at', now()->year)
            ->count();

        $conversionRate = $totalVisits > 0 ? round(($totalCustomers / $totalVisits) * 100, 1) : 0;

        // 4. Latest customers
        $latestCustomers = Customer::orderBy('created_at', 'desc')
            ->take(5)
            ->get()
            ->map(function ($customer) {
                return [
                    'id' => $customer->id,
                    'name' => $customer->first_name . ' ' . $customer->last_name,
                    'email' => $customer->email,
                    'date' => $customer->created_at->diffForHumans(),
                ];
            });

        return Inertia::render('Admin/Dashboard', [
            'chartData' => $customersPerDay,
            'customersThisMonth' => $customersThisMonth,
            'conversionRate' => $conversionRate,
            'latestCustomers' => $latestCustomers,
        ]);
    }
}
