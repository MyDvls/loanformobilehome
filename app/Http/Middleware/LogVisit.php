<?php

namespace App\Http\Middleware;

use App\Models\Visit;
use Closure;
use Illuminate\Http\Request;

class LogVisit
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        if (! session('visit_logged')) {
            Visit::create([
                'visited_at' => now(),
                'ip_address' => $request->ip(), // Optional
                'user_agent' => $request->userAgent(), // Optional
            ]);
            session(['visit_logged' => true]);
        }

        return $next($request);
    }
}
