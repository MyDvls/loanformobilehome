<?php

namespace App\Http\Controllers;

use App\Models\LoanSection;
use App\Models\RequirementSection;
use App\Models\UnderstandingLoanSection;
use App\Services\TranslationService;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class UnderstandingLoanController extends Controller
{
    public function index(TranslationService $translator)
    {
        $locale   = app()->getLocale();
        $cacheKey = "page.understanding-loan.payload.{$locale}";

        $sec = UnderstandingLoanSection::first();
        $requirements       = RequirementSection::with(['requirementItems' => fn($q) => $q->orderBy('id')])->first();
        $loanSection        = LoanSection::with(['loanItems' => fn($q) => $q->orderBy('id')])->first();

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

        $requirementsData     = $requirements ? ['title' => $requirements->title, 'subtitle' => $requirements->subtitle] : null;
        $requirementItemsData = $requirements
            ? $requirements->requirementItems->map(fn($i) => [
                'id'          => $i->id,
                'title'       => $i->title,
                'description' => $i->description,
                'image_path'   => $i->image_path ? Storage::url($i->image_path) : null,
            ])->toArray()
            : [];

        $loanData      = $loanSection ? ['title' => $loanSection->title] : null;
        $loanItemsData = $loanSection
            ? $loanSection->loanItems->map(fn($i) => [
                'id'          => $i->id,
                'title'       => $i->title,
                'description' => $i->description,
                'image_url'   => $i->image_path ? Storage::url($i->image_path) : null,
            ])->toArray()
            : [];

        if ($locale !== 'en' && $data) {
            $data = $translator->translateArray($data, $locale);
        }

        $props = [
            'understandingLoanSection' => $data,
            'locale'                   => $locale,
            'requirementSection' => $requirementsData,
            'requirementsData'  => $requirementItemsData,
            'loanSection' => $loanData,
            'loanItems' => $loanItemsData,
        ];

        return Inertia::render('LoanGuide', $props);
    }
}
