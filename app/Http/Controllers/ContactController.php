<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactRequest;
use App\Models\ContactSection;
use App\Services\TranslationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ContactController extends Controller
{

    public function index(TranslationService $translator)
    {
        $locale = app()->getLocale();

        $section = ContactSection::first();

        $props = [
            'contactSection' => $section ? [
                'company_name' => $section->company_name,
                'address' => $section->address,
                'email' => $section->email,
                'telephone' => $section->telephone,
                'working_hours' => $section->working_hours,
                'logo_url' => $section->logo_path ? Storage::url($section->logo_path) : null,
            ] : null,
            'locale' => $locale,
        ];

        if ($locale !== 'en' && $props['contactSection']) {
            $props['contactSection'] = $translator->translateArray($props['contactSection'], $locale);
        }

        return Inertia::render('Contact', $props);
    }

    public function store(StoreContactRequest $request)
    {
        // Send email
        // Mail::to('arogyadhdl@gmail.com')->send(new ContactFormSubmitted($request->validated()));

        return redirect()->route('contact')->with('success', 'Your message has been sent successfully!');
    }
}
