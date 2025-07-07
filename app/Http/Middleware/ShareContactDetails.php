<?php

namespace App\Http\Middleware;

use App\Models\ContactSection;
use App\Services\TranslationService;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ShareContactDetails
{
    public function handle(Request $request, Closure $next)
    {
        $locale = app()->getLocale();

        $sec = ContactSection::first();

        if (!$sec) {
            return null;
        }

        $payload = [
            'company_name'  => $sec->company_name,
            'address'       => $sec->address,
            'email'         => $sec->email,
            'telephone'     => $sec->telephone,
            'working_hours' => $sec->working_hours,
            'logo_url'      => $sec->logo_path ? Storage::url($sec->logo_path) : null,
        ];

        if ($locale !== 'en') {
            $translator = app(TranslationService::class);
            $payload = $translator->translateArray($payload, $locale);
        }

        // Share globally with all Inertia responses
        Inertia::share('contactSection', $payload);

        return $next($request);
    }
}
