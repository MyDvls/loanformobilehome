<?php

namespace App\Http\Controllers;

use App\Models\FeatureSection;
use App\Models\HeroSection;
use App\Models\LoanSection;
use App\Models\RequirementSection;
use App\Models\TestimonialSection;
use App\Services\TranslationService;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(TranslationService $translator)
    {
        $locale   = app()->getLocale();
        $hero               = HeroSection::with(['heroItems' => fn($q) => $q->orderBy('id')])->first();
        $loanSection        = LoanSection::with(['loanItems' => fn($q) => $q->orderBy('id')])->first();
        $requirements       = RequirementSection::with(['requirementItems' => fn($q) => $q->orderBy('id')])->first();
        $featuresSection    = FeatureSection::with(['featureItems'   => fn($q) => $q->orderBy('id')])->first();
        $testimonialSection = TestimonialSection::all();

        // Build raw arrays…
        $heroData = $hero ? [
            'slogan'        => $hero->slogan,
            'heading_part1' => $hero->heading_part1,
            'heading_part2' => $hero->heading_part2,
            'heading_part3' => $hero->heading_part3,
            'sub_heading'   => $hero->sub_heading,
        ] : null;

        $heroItemsData = $hero
            ? $hero->heroItems->map(fn($item) => [
                'id'           => $item->id,
                'hero_section_id' => $item->hero_section_id,
                'image_path'    => $item->image_path ? Storage::url($item->image_path) : null,
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

        $requirementsData     = $requirements ? ['title' => $requirements->title, 'subtitle' => $requirements->subtitle] : null;
        $requirementItemsData = $requirements
            ? $requirements->requirementItems->map(fn($i) => [
                'id'          => $i->id,
                'title'       => $i->title,
                'description' => $i->description,
                'image_path'   => $i->image_path ? Storage::url($i->image_path) : null,
            ])->toArray()
            : [];

        $featuresData     = $featuresSection ? ['title' => $featuresSection->title] : null;
        $featureItemsData = $featuresSection
            ? $featuresSection->featureItems->map(fn($i) => [
                'id'          => $i->id,
                'title'       => $i->title,
                'description' => $i->description,
                'image_url'   => $i->image_path ? Storage::url($i->image_path) : null,
            ])->toArray()
            : [];

        $testimonialData = $testimonialSection->map(fn($t) => [
            'id'    => $t->id,
            'quote' => $t->post,
            'name'  => $t->full_name,
            'title' => $t->heading,
        ])->toArray();

        // Translate if needed…
        if ($locale !== 'en') {
            $heroData             = $heroData             ? $translator->translateArray($heroData, $locale)               : null;
            $loanData             = $loanData             ? $translator->translateArray($loanData, $locale)               : null;
            $loanItemsData        = array_map(fn($i) => $translator->translateArray($i, $locale), $loanItemsData);
            $requirementsData     = $requirementsData     ? $translator->translateArray($requirementsData, $locale)      : null;
            $requirementItemsData = array_map(fn($i) => $translator->translateArray($i, $locale), $requirementItemsData);
            $featuresData         = $featuresData         ? $translator->translateArray($featuresData, $locale)          : null;
            $featureItemsData     = array_map(fn($i) => $translator->translateArray($i, $locale), $featureItemsData);
            $testimonialData      = array_map(fn($i) => $translator->translateArray($i, $locale), $testimonialData);
        }

        $props =  [
            'hero'       => $heroData,
            'heroItems'  => $heroItemsData,
            'loanSection'         => $loanData,
            'loanItems'           => $loanItemsData,
            'requirementsSection' => $requirementsData,
            'requirementItems'    => $requirementItemsData,
            'featuresSection'     => $featuresData,
            'featureItems'        => $featureItemsData,
            'testimonialSection'  => $testimonialData,
            'locale'              => $locale,
        ];

        return Inertia::render('Home', $props);
    }
}
