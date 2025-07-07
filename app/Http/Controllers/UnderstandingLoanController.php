<?php

namespace App\Http\Controllers;

use App\Models\UnderstandingLoanSection;
use App\Services\TranslationService;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class UnderstandingLoanController extends Controller
{
    public function index(TranslationService $translator)
    {
        $locale   = app()->getLocale();
        $cacheKey = "page.understanding-loan.payload.{$locale}";

        $props = Cache::remember($cacheKey, now()->addDays(2), function () use ($translator, $locale) {
            $sec = UnderstandingLoanSection::first();

            $data = $sec ? [
                'title'    => $sec->title,
                'subtitle' => $sec->subtitle,
                'section1' => [
                    'title'       => $sec->section1_title,
                    'description' => $sec->section1_description,
                    'principal'   => $sec->section1_principal,
                    'interest'    => $sec->section1_interest,
                    'escrow'      => $sec->section1_escrow,
                    'tip'         => $sec->section1_tip,
                    'graph1_title' => $sec->section1_graph1_title,
                ],
                'section2' => [
                    'title'          => $sec->section2_title,
                    'additional'     => $sec->section2_additional,
                    'interest_save'  => $sec->section2_interest_save,
                    'term_shorten'   => $sec->section2_term_shorten,
                    'result'         => $sec->section2_result,
                    'graph2_tip'     => $sec->section2_graph2_tip,
                    'image_url'      => $sec->section2_image_url,
                ],
            ] : null;

            if ($locale !== 'en' && $data) {
                $data = $translator->translateArray($data, $locale);
            }

            return [
                'understandingLoanSection' => $data,
                'locale'                   => $locale,
            ];
        });

        return Inertia::render('UnderstandingLoan', $props);
    }
}
