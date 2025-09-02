<?php

namespace App\Http\Controllers;

use App\Models\FeatureSection;
use App\Models\ServiceItem;
use App\Models\ServiceSection;
use App\Services\TranslationService;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ServicesController extends Controller
{
    public function index(TranslationService $translator)
    {
        $locale = app()->getLocale();

        $serviceSection = ServiceSection::first();
        $serviceItems = ServiceItem::orderBy('id')->get();
        $featuresSection = FeatureSection::with('featureItems')->first();

        $sectionData = $serviceSection ? [
            'heading' => $serviceSection->heading,
            'sub_heading' => $serviceSection->sub_heading,
        ] : null;

        $itemsData = $serviceItems->map(fn ($i) => [
            'id' => $i->id,
            'title' => $i->title,
            'description' => $i->description,
            'image_url' => $i->image_path ? Storage::url($i->image_path) : null,
        ])->toArray();

        $featuresData = $featuresSection ? ['title' => $featuresSection->title] : null;
        $featureItemsData = $featuresSection
            ? $featuresSection->featureItems->map(fn ($i) => [
                'id' => $i->id,
                'title' => $i->title,
                'description' => $i->description,
                'image_path' => $i->image_path ? Storage::url($i->image_path) : null,
            ])->toArray()
            : [];

        if ($locale !== 'en') {
            $sectionData = $sectionData ? $translator->translateArray($sectionData, $locale) : null;
            $itemsData = array_map(fn ($i) => $translator->translateArray($i, $locale), $itemsData);
            $featuresData = $featuresData ? $translator->translateArray($featuresData, $locale) : null;
            $featureItemsData = array_map(fn ($i) => $translator->translateArray($i, $locale), $featureItemsData);
        }

        $props = [
            'serviceSection' => $sectionData,
            'serviceItems' => $itemsData,
            'featuresSection' => $featuresData,
            'featureItems' => $featureItemsData,
            'locale' => $locale,
        ];

        return Inertia::render('Services', $props);
    }
}
