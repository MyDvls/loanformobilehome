<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ContactSection;
use App\Models\FeaturesSection;
use App\Models\HeroSection;
use App\Models\LoanSection;
use App\Models\RequirementsSection;
use App\Models\ServiceItem;
use App\Models\ServiceSection;
use App\Models\TeamMember;
use App\Models\TeamSection;
use App\Models\UnderstandingLoanSection;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PageBuilderController extends Controller
{
    public function editHome()
    {
        $hero = HeroSection::first();
        $loan = LoanSection::first();
        $requirements = RequirementsSection::first();
        $featuresSection = FeaturesSection::first();

        return Inertia::render('Admin/Pages/HomeEdit', [
            'hero' => $hero ? [
                'slogan' => [
                    'en' => $hero->getTranslation('slogan', 'en'),
                    'es' => $hero->getTranslation('slogan', 'es'),
                ],
                'heading_part1' => [
                    'en' => $hero->getTranslation('heading_part1', 'en'),
                    'es' => $hero->getTranslation('heading_part1', 'es'),
                ],
                'heading_part2' => [
                    'en' => $hero->getTranslation('heading_part2', 'en'),
                    'es' => $hero->getTranslation('heading_part2', 'es'),
                ],
                'heading_part3' => [
                    'en' => $hero->getTranslation('heading_part3', 'en'),
                    'es' => $hero->getTranslation('heading_part3', 'es'),
                ],
                'sub_heading' => [
                    'en' => $hero->getTranslation('sub_heading', 'en'),
                    'es' => $hero->getTranslation('sub_heading', 'es'),
                ],
                'image_url' => $hero->image_url,
            ] : null,
            'loanSection' => $loan ? [
                'title' => [
                    'en' => $loan->getTranslation('title', 'en'),
                    'es' => $loan->getTranslation('title', 'es'),
                ],
                'step1' => [
                    'title' => [
                        'en' => $loan->getTranslation('step1_title', 'en'),
                        'es' => $loan->getTranslation('step1_title', 'es'),
                    ],
                    'description' => [
                        'en' => $loan->getTranslation('step1_description', 'en'),
                        'es' => $loan->getTranslation('step1_description', 'es'),
                    ],
                    'image_url' => $loan->step1_image_url,
                ],
                'step2' => [
                    'title' => [
                        'en' => $loan->getTranslation('step2_title', 'en'),
                        'es' => $loan->getTranslation('step2_title', 'es'),
                    ],
                    'description' => [
                        'en' => $loan->getTranslation('step2_description', 'en'),
                        'es' => $loan->getTranslation('step2_description', 'es'),
                    ],
                    'image_url' => $loan->step2_image_url,
                ],
                'step3' => [
                    'title' => [
                        'en' => $loan->getTranslation('step3_title', 'en'),
                        'es' => $loan->getTranslation('step3_title', 'es'),
                    ],
                    'description' => [
                        'en' => $loan->getTranslation('step3_description', 'en'),
                        'es' => $loan->getTranslation('step3_description', 'es'),
                    ],
                    'image_url' => $loan->step3_image_url,
                ],
                'step4' => [
                    'title' => [
                        'en' => $loan->getTranslation('step4_title', 'en'),
                        'es' => $loan->getTranslation('step4_title', 'es'),
                    ],
                    'description' => [
                        'en' => $loan->getTranslation('step4_description', 'en'),
                        'es' => $loan->getTranslation('step4_description', 'es'),
                    ],
                    'image_url' => $loan->step4_image_url,
                ],
                'step5' => [
                    'title' => [
                        'en' => $loan->getTranslation('step5_title', 'en'),
                        'es' => $loan->getTranslation('step5_title', 'es'),
                    ],
                    'description' => [
                        'en' => $loan->getTranslation('step5_description', 'en'),
                        'es' => $loan->getTranslation('step5_description', 'es'),
                    ],
                    'image_url' => $loan->step5_image_url,
                ],
            ] : null,
            'requirementsSection' => $requirements ? [
                'title' => [
                    'en' => $requirements->getTranslation('title', 'en'),
                    'es' => $requirements->getTranslation('title', 'es'),
                ],
                'subtitle' => [
                    'en' => $requirements->getTranslation('subtitle', 'en'),
                    'es' => $requirements->getTranslation('subtitle', 'es'),
                ],
                'requirement1' => [
                    'icon' => [
                        'en' => $requirements->getTranslation('requirement1_icon', 'en'),
                        'es' => $requirements->getTranslation('requirement1_icon', 'es'),
                    ],
                    'title' => [
                        'en' => $requirements->getTranslation('requirement1_title', 'en'),
                        'es' => $requirements->getTranslation('requirement1_title', 'es'),
                    ],
                    'description' => [
                        'en' => $requirements->getTranslation('requirement1_description', 'en'),
                        'es' => $requirements->getTranslation('requirement1_description', 'es'),
                    ],
                ],
                'requirement2' => [
                    'icon' => [
                        'en' => $requirements->getTranslation('requirement2_icon', 'en'),
                        'es' => $requirements->getTranslation('requirement2_icon', 'es'),
                    ],
                    'title' => [
                        'en' => $requirements->getTranslation('requirement2_title', 'en'),
                        'es' => $requirements->getTranslation('requirement2_title', 'es'),
                    ],
                    'description' => [
                        'en' => $requirements->getTranslation('requirement2_description', 'en'),
                        'es' => $requirements->getTranslation('requirement2_description', 'es'),
                    ],
                ],
                'requirement3' => [
                    'icon' => [
                        'en' => $requirements->getTranslation('requirement3_icon', 'en'),
                        'es' => $requirements->getTranslation('requirement3_icon', 'es'),
                    ],
                    'title' => [
                        'en' => $requirements->getTranslation('requirement3_title', 'en'),
                        'es' => $requirements->getTranslation('requirement3_title', 'es'),
                    ],
                    'description' => [
                        'en' => $requirements->getTranslation('requirement3_description', 'en'),
                        'es' => $requirements->getTranslation('requirement3_description', 'es'),
                    ],
                ],
                'requirement4' => [
                    'icon' => [
                        'en' => $requirements->getTranslation('requirement4_icon', 'en'),
                        'es' => $requirements->getTranslation('requirement4_icon', 'es'),
                    ],
                    'title' => [
                        'en' => $requirements->getTranslation('requirement4_title', 'en'),
                        'es' => $requirements->getTranslation('requirement4_title', 'es'),
                    ],
                    'description' => [
                        'en' => $requirements->getTranslation('requirement4_description', 'en'),
                        'es' => $requirements->getTranslation('requirement4_description', 'es'),
                    ],
                ],
                'requirement5' => [
                    'icon' => [
                        'en' => $requirements->getTranslation('requirement5_icon', 'en'),
                        'es' => $requirements->getTranslation('requirement5_icon', 'es'),
                    ],
                    'title' => [
                        'en' => $requirements->getTranslation('requirement5_title', 'en'),
                        'es' => $requirements->getTranslation('requirement5_title', 'es'),
                    ],
                    'description' => [
                        'en' => $requirements->getTranslation('requirement5_description', 'en'),
                        'es' => $requirements->getTranslation('requirement5_description', 'es'),
                    ],
                ],
                'requirement6' => [
                    'icon' => [
                        'en' => $requirements->getTranslation('requirement6_icon', 'en'),
                        'es' => $requirements->getTranslation('requirement6_icon', 'es'),
                    ],
                    'title' => [
                        'en' => $requirements->getTranslation('requirement6_title', 'en'),
                        'es' => $requirements->getTranslation('requirement6_title', 'es'),
                    ],
                    'description' => [
                        'en' => $requirements->getTranslation('requirement6_description', 'en'),
                        'es' => $requirements->getTranslation('requirement6_description', 'es'),
                    ],
                ],
            ] : null,
            'featuresSection' => $featuresSection ? [
                'title' => [
                    'en' => $featuresSection->getTranslation('title', 'en'),
                    'es' => $featuresSection->getTranslation('title', 'es'),
                ],
                'feature1' => [
                    'title' => [
                        'en' => $featuresSection->getTranslation('feature1_title', 'en'),
                        'es' => $featuresSection->getTranslation('feature1_title', 'es'),
                    ],
                    'description' => [
                        'en' => $featuresSection->getTranslation('feature1_description', 'en'),
                        'es' => $featuresSection->getTranslation('feature1_description', 'es'),
                    ],
                ],
                'feature2' => [
                    'title' => [
                        'en' => $featuresSection->getTranslation('feature2_title', 'en'),
                        'es' => $featuresSection->getTranslation('feature2_title', 'es'),
                    ],
                    'description' => [
                        'en' => $featuresSection->getTranslation('feature2_description', 'en'),
                        'es' => $featuresSection->getTranslation('feature2_description', 'es'),
                    ],
                ],
                'feature3' => [
                    'title' => [
                        'en' => $featuresSection->getTranslation('feature3_title', 'en'),
                        'es' => $featuresSection->getTranslation('feature3_title', 'es'),
                    ],
                    'description' => [
                        'en' => $featuresSection->getTranslation('feature3_description', 'en'),
                        'es' => $featuresSection->getTranslation('feature3_description', 'es'),
                    ],
                ],
                'feature4' => [
                    'title' => [
                        'en' => $featuresSection->getTranslation('feature4_title', 'en'),
                        'es' => $featuresSection->getTranslation('feature4_title', 'es'),
                    ],
                    'description' => [
                        'en' => $featuresSection->getTranslation('feature4_description', 'en'),
                        'es' => $featuresSection->getTranslation('feature4_description', 'es'),
                    ],
                ],
                'feature5' => [
                    'title' => [
                        'en' => $featuresSection->getTranslation('feature5_title', 'en'),
                        'es' => $featuresSection->getTranslation('feature5_title', 'es'),
                    ],
                    'description' => [
                        'en' => $featuresSection->getTranslation('feature5_description', 'en'),
                        'es' => $featuresSection->getTranslation('feature5_description', 'es'),
                    ],
                ],
            ] : null,
        ]);
    }

    public function updateHero(Request $request)
    {
        $request->validate([
            'slogan.en' => 'required|string|max:255',
            'slogan.es' => 'required|string|max:255',
            'heading_part1.en' => 'required|string|max:255',
            'heading_part1.es' => 'required|string|max:255',
            'heading_part2.en' => 'required|string|max:255',
            'heading_part2.es' => 'required|string|max:255',
            'heading_part3.en' => 'required|string|max:255',
            'heading_part3.es' => 'required|string|max:255',
            'sub_heading.en' => 'required|string|max:500',
            'sub_heading.es' => 'required|string|max:500',
            'image' => 'nullable|image|max:2048',
        ]);
        Log::info('Updating hero section with data: ', $request->all());
        $hero = HeroSection::firstOrCreate([]);

        $hero->setTranslation('slogan', 'en', $request->input('slogan.en'));
        $hero->setTranslation('slogan', 'es', $request->input('slogan.es'));
        $hero->setTranslation('heading_part1', 'en', $request->input('heading_part1.en'));
        $hero->setTranslation('heading_part1', 'es', $request->input('heading_part1.es'));
        $hero->setTranslation('heading_part2', 'en', $request->input('heading_part2.en'));
        $hero->setTranslation('heading_part2', 'es', $request->input('heading_part2.es'));
        $hero->setTranslation('heading_part3', 'en', $request->input('heading_part3.en'));
        $hero->setTranslation('heading_part3', 'es', $request->input('heading_part3.es'));
        $hero->setTranslation('sub_heading', 'en', $request->input('sub_heading.en'));
        $hero->setTranslation('sub_heading', 'es', $request->input('sub_heading.es'));

        if ($request->hasFile('image')) {
            if ($hero->image_path) {
                Storage::disk('public')->delete(str_replace('public/', '', $hero->image_path));
            }
            $path = $request->file('image')->store('hero', 'public');
            $hero->image_path = $path;
        }

        $hero->save();

        return redirect()->route('admin.pages.home.edit')->with('success', 'Hero section updated successfully.');
    }

    public function updateLoanSection(Request $request)
    {
        $request->validate([
            'title.en' => 'required|string|max:255',
            'title.es' => 'required|string|max:255',
            'step1.title.en' => 'required|string|max:255',
            'step1.title.es' => 'required|string|max:255',
            'step1.description.en' => 'required|string|max:1000',
            'step1.description.es' => 'required|string|max:1000',
            'step1.image' => 'nullable|image|max:2048',
            'step2.title.en' => 'required|string|max:255',
            'step2.title.es' => 'required|string|max:255',
            'step2.description.en' => 'required|string|max:1000',
            'step2.description.es' => 'required|string|max:1000',
            'step2.image' => 'nullable|image|max:2048',
            'step3.title.en' => 'required|string|max:255',
            'step3.title.es' => 'required|string|max:255',
            'step3.description.en' => 'required|string|max:1000',
            'step3.description.es' => 'required|string|max:1000',
            'step3.image' => 'nullable|image|max:2048',
            'step4.title.en' => 'required|string|max:255',
            'step4.title.es' => 'required|string|max:255',
            'step4.description.en' => 'required|string|max:1000',
            'step4.description.es' => 'required|string|max:1000',
            'step4.image' => 'nullable|image|max:2048',
            'step5.title.en' => 'required|string|max:255',
            'step5.title.es' => 'required|string|max:255',
            'step5.description.en' => 'required|string|max:1000',
            'step5.description.es' => 'required|string|max:1000',
            'step5.image' => 'nullable|image|max:2048',
        ]);

        Log::info('Updating loan section with data: ', $request->all());
        $loan = LoanSection::firstOrCreate([]);

        $loan->setTranslation('title', 'en', $request->input('title.en'));
        $loan->setTranslation('title', 'es', $request->input('title.es'));

        foreach (['step1', 'step2', 'step3', 'step4', 'step5'] as $step) {
            $loan->setTranslation("{$step}_title", 'en', $request->input("{$step}.title.en"));
            $loan->setTranslation("{$step}_title", 'es', $request->input("{$step}.title.es"));
            $loan->setTranslation("{$step}_description", 'en', $request->input("{$step}.description.en"));
            $loan->setTranslation("{$step}_description", 'es', $request->input("{$step}.description.es"));

            if ($request->hasFile("{$step}.image")) {
                if ($loan->{"{$step}_image_path"}) {
                    Storage::disk('public')->delete(str_replace('public/', '', $loan->{"{$step}_image_path"}));
                }
                $path = $request->file("{$step}.image")->store('loan', 'public');
                $loan->{"{$step}_image_path"} = $path;
            }
        }

        $loan->save();

        return redirect()->route('admin.pages.home.edit')->with('success', 'Loan section updated successfully.');
    }

    public function updateRequirementsSection(Request $request)
    {
        $request->validate([
            'title.en' => 'required|string|max:255',
            'title.es' => 'required|string|max:255',
            'subtitle.en' => 'required|string|max:500',
            'subtitle.es' => 'required|string|max:500',
            'requirement1.icon.en' => 'required|string|max:100',
            'requirement1.icon.es' => 'required|string|max:100',
            'requirement1.title.en' => 'required|string|max:255',
            'requirement1.title.es' => 'required|string|max:255',
            'requirement1.description.en' => 'required|string|max:1000',
            'requirement1.description.es' => 'required|string|max:1000',
            'requirement2.icon.en' => 'required|string|max:100',
            'requirement2.icon.es' => 'required|string|max:100',
            'requirement2.title.en' => 'required|string|max:255',
            'requirement2.title.es' => 'required|string|max:255',
            'requirement2.description.en' => 'required|string|max:1000',
            'requirement2.description.es' => 'required|string|max:1000',
            'requirement3.icon.en' => 'required|string|max:100',
            'requirement3.icon.es' => 'required|string|max:100',
            'requirement3.title.en' => 'required|string|max:255',
            'requirement3.title.es' => 'required|string|max:255',
            'requirement3.description.en' => 'required|string|max:1000',
            'requirement3.description.es' => 'required|string|max:1000',
            'requirement4.icon.en' => 'required|string|max:100',
            'requirement4.icon.es' => 'required|string|max:100',
            'requirement4.title.en' => 'required|string|max:255',
            'requirement4.title.es' => 'required|string|max:255',
            'requirement4.description.en' => 'required|string|max:1000',
            'requirement4.description.es' => 'required|string|max:1000',
            'requirement5.icon.en' => 'required|string|max:100',
            'requirement5.icon.es' => 'required|string|max:100',
            'requirement5.title.en' => 'required|string|max:255',
            'requirement5.title.es' => 'required|string|max:255',
            'requirement5.description.en' => 'required|string|max:1000',
            'requirement5.description.es' => 'required|string|max:1000',
            'requirement6.icon.en' => 'required|string|max:100',
            'requirement6.icon.es' => 'required|string|max:100',
            'requirement6.title.en' => 'required|string|max:255',
            'requirement6.title.es' => 'required|string|max:255',
            'requirement6.description.en' => 'required|string|max:1000',
            'requirement6.description.es' => 'required|string|max:1000',
        ]);

        Log::info('Updating requirements section with data: ', $request->all());
        $requirements = RequirementsSection::firstOrCreate([]);

        $requirements->setTranslation('title', 'en', $request->input('title.en'));
        $requirements->setTranslation('title', 'es', $request->input('title.es'));
        $requirements->setTranslation('subtitle', 'en', $request->input('subtitle.en'));
        $requirements->setTranslation('subtitle', 'es', $request->input('subtitle.es'));

        foreach (['requirement1', 'requirement2', 'requirement3', 'requirement4', 'requirement5', 'requirement6'] as $req) {
            $requirements->setTranslation("{$req}_icon", 'en', $request->input("{$req}.icon.en"));
            $requirements->setTranslation("{$req}_icon", 'es', $request->input("{$req}.icon.es"));
            $requirements->setTranslation("{$req}_title", 'en', $request->input("{$req}.title.en"));
            $requirements->setTranslation("{$req}_title", 'es', $request->input("{$req}.title.es"));
            $requirements->setTranslation("{$req}_description", 'en', $request->input("{$req}.description.en"));
            $requirements->setTranslation("{$req}_description", 'es', $request->input("{$req}.description.es"));
        }

        $requirements->save();

        return redirect()->route('admin.pages.home.edit')->with('success', 'Requirements section updated successfully.');
    }

    public function updateFeaturesSection(Request $request)
    {
        $request->validate([
            'title.en' => 'required|string|max:255',
            'title.es' => 'required|string|max:255',
            'feature1.title.en' => 'required|string|max:255',
            'feature1.title.es' => 'required|string|max:255',
            'feature1.description.en' => 'required|string|max:1000',
            'feature1.description.es' => 'required|string|max:1000',
            'feature2.title.en' => 'required|string|max:255',
            'feature2.title.es' => 'required|string|max:255',
            'feature2.description.en' => 'required|string|max:1000',
            'feature2.description.es' => 'required|string|max:1000',
            'feature3.title.en' => 'required|string|max:255',
            'feature3.title.es' => 'required|string|max:255',
            'feature3.description.en' => 'required|string|max:1000',
            'feature3.description.es' => 'required|string|max:1000',
            'feature4.title.en' => 'required|string|max:255',
            'feature4.title.es' => 'required|string|max:255',
            'feature4.description.en' => 'required|string|max:1000',
            'feature4.description.es' => 'required|string|max:1000',
            'feature5.title.en' => 'required|string|max:255',
            'feature5.title.es' => 'required|string|max:255',
            'feature5.description.en' => 'required|string|max:1000',
            'feature5.description.es' => 'required|string|max:1000',
        ]);

        Log::info('Updating features section with data: ', $request->all());
        $features = FeaturesSection::firstOrCreate([]);

        $features->setTranslation('title', 'en', $request->input('title.en'));
        $features->setTranslation('title', 'es', $request->input('title.es'));

        foreach (['feature1', 'feature2', 'feature3', 'feature4', 'feature5'] as $feat) {
            $features->setTranslation("{$feat}_title", 'en', $request->input("{$feat}.title.en"));
            $features->setTranslation("{$feat}_title", 'es', $request->input("{$feat}.title.es"));
            $features->setTranslation("{$feat}_description", 'en', $request->input("{$feat}.description.en"));
            $features->setTranslation("{$feat}_description", 'es', $request->input("{$feat}.description.es"));
        }

        $features->save();

        return redirect()->route('admin.pages.home.edit')->with('success', 'Features section updated successfully.');
    }

    public function editServices()
    {
        try {
            $serviceSection = ServiceSection::first();
            $serviceItems = ServiceItem::orderBy('id', 'asc')->get();
            Log::info('Fetched services data: ', [
                'serviceSection' => $serviceSection,
                'serviceItems' => $serviceItems
            ]);
            return Inertia::render('Admin/Pages/ServicesEdit', [
                'serviceSection' => $serviceSection ? [
                    'id' => $serviceSection->id,
                    'heading' => [
                        'en' => $serviceSection->getTranslation('heading', 'en'),
                        'es' => $serviceSection->getTranslation('heading', 'es'),
                    ],
                    'sub_heading' => [
                        'en' => $serviceSection->getTranslation('sub_heading', 'en'),
                        'es' => $serviceSection->getTranslation('sub_heading', 'es'),
                    ],
                ] : null,
                'serviceItems' => $serviceItems->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'image_path' => $item->image_path,
                        'title' => [
                            'en' => $item->getTranslation('title', 'en'),
                            'es' => $item->getTranslation('title', 'es'),
                        ],
                        'description' => [
                            'en' => $item->getTranslation('description', 'en'),
                            'es' => $item->getTranslation('description', 'es'),
                        ],
                    ];
                })->toArray(),
            ]);
        } catch (Exception $e) {
            Log::error('Error fetching services data: ' . $e->getMessage());
            return Inertia::render('Admin/Pages/ServicesEdit', [
                'serviceSection' => null,
                'serviceItems' => [],
                'error' => 'Failed to load services data'
            ]);
        }
    }

    public function updateServiceSection(Request $request)
    {
        $request->validate([
            'heading.en' => 'required|string|max:255',
            'heading.es' => 'required|string|max:255',
            'sub_heading.en' => 'required|string|max:500',
            'sub_heading.es' => 'required|string|max:500',
            'services' => 'required|array',
            'services.*.id' => 'sometimes|nullable|integer|exists:service_items,id',
            'services.*.title.en' => 'required|string|max:255',
            'services.*.title.es' => 'required|string|max:255',
            'services.*.description.en' => 'required|string|max:1000',
            'services.*.description.es' => 'required|string|max:1000',
            'services.*.image' => 'nullable|file|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        try {
            Log::info('Updating services section with data: ', $request->all());

            // Update or create ServiceSection
            $serviceSection = ServiceSection::firstOrCreate([]);
            $serviceSection->setTranslation('heading', 'en', $request->input('heading.en'));
            $serviceSection->setTranslation('heading', 'es', $request->input('heading.es'));
            $serviceSection->setTranslation('sub_heading', 'en', $request->input('sub_heading.en'));
            $serviceSection->setTranslation('sub_heading', 'es', $request->input('sub_heading.es'));
            $serviceSection->save();

            // Get IDs of services in the request, safely handling missing 'id'
            $requestServiceIds = collect($request->input('services'))
                ->filter(fn($service) => isset($service['id']) && $service['id'])
                ->pluck('id')
                ->toArray();

            // Delete ServiceItems not included in the request
            ServiceItem::whereNotIn('id', $requestServiceIds)->delete();

            // Update or create ServiceItems
            foreach ($request->input('services') as $index => $serviceData) {
                $serviceItem = isset($serviceData['id']) && $serviceData['id']
                    ? ServiceItem::find($serviceData['id'])
                    : new ServiceItem();

                $serviceItem->service_section_id = $serviceSection->id;
                $serviceItem->setTranslation('title', 'en', $serviceData['title']['en']);
                $serviceItem->setTranslation('title', 'es', $serviceData['title']['es']);
                $serviceItem->setTranslation('description', 'en', $serviceData['description']['en']);
                $serviceItem->setTranslation('description', 'es', $serviceData['description']['es']);

                if ($request->hasFile("services.{$index}.image")) {
                    if ($serviceItem->image_path) {
                        Storage::disk('public')->delete(str_replace('public/', '', $serviceItem->image_path));
                    }
                    $path = $request->file("services.{$index}.image")->store('services', 'public');
                    $serviceItem->image_path = $path;
                }

                $serviceItem->save();
            }

            return redirect()->route('admin.pages.services.edit')->with('success', 'Services section updated successfully.');
        } catch (Exception $e) {
            Log::error('Error updating services section: ' . $e->getMessage());
            return redirect()->back()->withErrors(['error' => 'Failed to update services section']);
        }
    }

    public function editTeam()
    {
        try {
            $teamSection = TeamSection::first();
            $teamMembers = TeamMember::orderBy('order', 'asc')->get();
            Log::info('Fetched team data: ', [
                'teamSection' => $teamSection,
                'teamMembers' => $teamMembers
            ]);
            return Inertia::render('Admin/Pages/TeamsEdit', [
                'teamSection' => $teamSection ? [
                    'id' => $teamSection->id,
                    'heading' => [
                        'en' => $teamSection->getTranslation('heading', 'en'),
                        'es' => $teamSection->getTranslation('heading', 'es'),
                    ],
                    'sub_heading' => [
                        'en' => $teamSection->getTranslation('sub_heading', 'en'),
                        'es' => $teamSection->getTranslation('sub_heading', 'es'),
                    ],
                ] : null,
                'teamMembers' => $teamMembers->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'image_path' => $item->image_path,
                        'name' => [
                            'en' => $item->getTranslation('name', 'en'),
                            'es' => $item->getTranslation('name', 'es'),
                        ],
                        'role' => [
                            'en' => $item->getTranslation('role', 'en'),
                            'es' => $item->getTranslation('role', 'es'),
                        ],
                        'bio' => [
                            'en' => $item->getTranslation('bio', 'en'),
                            'es' => $item->getTranslation('bio', 'es'),
                        ],
                        'order' => $item->order ?? 0,
                    ];
                })->toArray(),
            ]);
        } catch (Exception $e) {
            Log::error('Error fetching team data: ' . $e->getMessage());
            return Inertia::render('Admin/Pages/TeamEdit', [
                'teamSection' => null,
                'teamMembers' => [],
                'error' => 'Failed to load team data'
            ]);
        }
    }

    public function updateTeamSection(Request $request)
    {
        $request->validate([
            'heading.en' => 'required|string|max:255',
            'heading.es' => 'required|string|max:255',
            'sub_heading.en' => 'required|string|max:500',
            'sub_heading.es' => 'required|string|max:500',
            'team_members' => 'required|array',
            'team_members.*.id' => 'sometimes|nullable|integer|exists:team_members,id',
            'team_members.*.name.en' => 'required|string|max:255',
            'team_members.*.name.es' => 'required|string|max:255',
            'team_members.*.role.en' => 'required|string|max:255',
            'team_members.*.role.es' => 'required|string|max:255',
            'team_members.*.bio.en' => 'required|string|max:2000',
            'team_members.*.bio.es' => 'required|string|max:2000',
            'team_members.*.image' => 'nullable|file|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        try {
            Log::info('Updating team section with data: ', $request->all());

            // Update or create TeamSection
            $teamSection = TeamSection::firstOrCreate([]);
            $teamSection->setTranslation('heading', 'en', $request->input('heading.en'));
            $teamSection->setTranslation('heading', 'es', $request->input('heading.es'));
            $teamSection->setTranslation('sub_heading', 'en', $request->input('sub_heading.en'));
            $teamSection->setTranslation('sub_heading', 'es', $request->input('sub_heading.es'));
            $teamSection->save();

            // Get IDs of team members in the request, safely handling missing 'id'
            $requestMemberIds = collect($request->input('team_members'))
                ->filter(fn($member) => isset($member['id']) && $member['id'])
                ->pluck('id')
                ->toArray();

            // Delete TeamMembers not included in the request
            TeamMember::whereNotIn('id', $requestMemberIds)->delete();

            // Update or create TeamMembers
            foreach ($request->input('team_members') as $index => $memberData) {
                $teamMember = isset($memberData['id']) && $memberData['id']
                    ? TeamMember::find($memberData['id'])
                    : new TeamMember();

                $teamMember->team_section_id = $teamSection->id;
                $teamMember->setTranslation('name', 'en', $memberData['name']['en']);
                $teamMember->setTranslation('name', 'es', $memberData['name']['es']);
                $teamMember->setTranslation('role', 'en', $memberData['role']['en']);
                $teamMember->setTranslation('role', 'es', $memberData['role']['es']);
                $teamMember->setTranslation('bio', 'en', $memberData['bio']['en']);
                $teamMember->setTranslation('bio', 'es', $memberData['bio']['es']);
                $teamMember->order = $index;

                if ($request->hasFile("team_members.{$index}.image")) {
                    if ($teamMember->image_path) {
                        Storage::disk('public')->delete(str_replace('public/', '', $teamMember->image_path));
                    }
                    $path = $request->file("team_members.{$index}.image")->store('team', 'public');
                    $teamMember->image_path = $path;
                }

                $teamMember->save();
            }

            return redirect()->route('admin.pages.team.edit')->with('success', 'Team section updated successfully.');
        } catch (Exception $e) {
            Log::error('Error updating team section: ' . $e->getMessage());
            return redirect()->back()->withErrors(['error' => 'Failed to update team section']);
        }
    }

    public function editUnderstandingLoan()
    {
        try {
            $section = UnderstandingLoanSection::first();
            Log::info('Fetched understanding loan section data: ', ['section' => $section]);

            return Inertia::render('Admin/Pages/UnderstandingLoanEdit', [
                'understandingLoanSection' => $section ? [
                    'title' => [
                        'en' => $section->getTranslation('title', 'en'),
                        'es' => $section->getTranslation('title', 'es'),
                    ],
                    'subtitle' => [
                        'en' => $section->getTranslation('subtitle', 'en'),
                        'es' => $section->getTranslation('subtitle', 'es'),
                    ],
                    'section1' => [
                        'title' => [
                            'en' => $section->getTranslation('section1_title', 'en'),
                            'es' => $section->getTranslation('section1_title', 'es'),
                        ],
                        'description' => [
                            'en' => $section->getTranslation('section1_description', 'en'),
                            'es' => $section->getTranslation('section1_description', 'es'),
                        ],
                        'principal' => [
                            'en' => $section->getTranslation('section1_principal', 'en'),
                            'es' => $section->getTranslation('section1_principal', 'es'),
                        ],
                        'interest' => [
                            'en' => $section->getTranslation('section1_interest', 'en'),
                            'es' => $section->getTranslation('section1_interest', 'es'),
                        ],
                        'escrow' => [
                            'en' => $section->getTranslation('section1_escrow', 'en'),
                            'es' => $section->getTranslation('section1_escrow', 'es'),
                        ],
                        'tip' => [
                            'en' => $section->getTranslation('section1_tip', 'en'),
                            'es' => $section->getTranslation('section1_tip', 'es'),
                        ],
                        'graph1_title' => [
                            'en' => $section->getTranslation('section1_graph1_title', 'en'),
                            'es' => $section->getTranslation('section1_graph1_title', 'es'),
                        ],
                    ],
                    'section2' => [
                        'title' => [
                            'en' => $section->getTranslation('section2_title', 'en'),
                            'es' => $section->getTranslation('section2_title', 'es'),
                        ],
                        'additional' => [
                            'en' => $section->getTranslation('section2_additional', 'en'),
                            'es' => $section->getTranslation('section2_additional', 'es'),
                        ],
                        'interest_save' => [
                            'en' => $section->getTranslation('section2_interest_save', 'en'),
                            'es' => $section->getTranslation('section2_interest_save', 'es'),
                        ],
                        'term_shorten' => [
                            'en' => $section->getTranslation('section2_term_shorten', 'en'),
                            'es' => $section->getTranslation('section2_term_shorten', 'es'),
                        ],
                        'result' => [
                            'en' => $section->getTranslation('section2_result', 'en'),
                            'es' => $section->getTranslation('section2_result', 'es'),
                        ],
                        'graph2_tip' => [
                            'en' => $section->getTranslation('section2_graph2_tip', 'en'),
                            'es' => $section->getTranslation('section2_graph2_tip', 'es'),
                        ],
                        'image_url' => $section->section2_image_url,
                    ],
                ] : null,
            ]);
        } catch (Exception $e) {
            Log::error('Error fetching understanding loan section data: ' . $e->getMessage());
            return Inertia::render('Admin/Pages/UnderstandingLoanEdit', [
                'understandingLoanSection' => null,
                'error' => 'Failed to load understanding loan section data',
            ]);
        }
    }

    public function updateUnderstandingLoanSection(Request $request)
    {
        $request->validate([
            'title.en' => 'required|string|max:255',
            'title.es' => 'required|string|max:255',
            'subtitle.en' => 'required|string|max:500',
            'subtitle.es' => 'required|string|max:500',
            'section1.title.en' => 'required|string|max:255',
            'section1.title.es' => 'required|string|max:255',
            'section1.description.en' => 'required|string|max:1000',
            'section1.description.es' => 'required|string|max:1000',
            'section1.principal.en' => 'required|string|max:255',
            'section1.principal.es' => 'required|string|max:255',
            'section1.interest.en' => 'required|string|max:255',
            'section1.interest.es' => 'required|string|max:255',
            'section1.escrow.en' => 'required|string|max:255',
            'section1.escrow.es' => 'required|string|max:255',
            'section1.tip.en' => 'required|string|max:1000',
            'section1.tip.es' => 'required|string|max:1000',
            'section1.graph1_title.en' => 'required|string|max:255',
            'section1.graph1_title.es' => 'required|string|max:255',
            'section2.title.en' => 'required|string|max:255',
            'section2.title.es' => 'required|string|max:255',
            'section2.additional.en' => 'required|string|max:255',
            'section2.additional.es' => 'required|string|max:255',
            'section2.interest_save.en' => 'required|string|max:255',
            'section2.interest_save.es' => 'required|string|max:255',
            'section2.term_shorten.en' => 'required|string|max:255',
            'section2.term_shorten.es' => 'required|string|max:255',
            'section2.result.en' => 'required|string|max:255',
            'section2.result.es' => 'required|string|max:255',
            'section2.graph2_tip.en' => 'required|string|max:1000',
            'section2.graph2_tip.es' => 'required|string|max:1000',
            'section2.image' => 'nullable|image|max:2048',
        ]);

        try {
            Log::info('Updating understanding loan section with data: ', $request->all());
            $section = UnderstandingLoanSection::firstOrCreate([]);

            $section->setTranslation('title', 'en', $request->input('title.en'));
            $section->setTranslation('title', 'es', $request->input('title.es'));
            $section->setTranslation('subtitle', 'en', $request->input('subtitle.en'));
            $section->setTranslation('subtitle', 'es', $request->input('subtitle.es'));

            $section->setTranslation('section1_title', 'en', $request->input('section1.title.en'));
            $section->setTranslation('section1_title', 'es', $request->input('section1.title.es'));
            $section->setTranslation('section1_description', 'en', $request->input('section1.description.en'));
            $section->setTranslation('section1_description', 'es', $request->input('section1.description.es'));
            $section->setTranslation('section1_principal', 'en', $request->input('section1.principal.en'));
            $section->setTranslation('section1_principal', 'es', $request->input('section1.principal.es'));
            $section->setTranslation('section1_interest', 'en', $request->input('section1.interest.en'));
            $section->setTranslation('section1_interest', 'es', $request->input('section1.interest.es'));
            $section->setTranslation('section1_escrow', 'en', $request->input('section1.escrow.en'));
            $section->setTranslation('section1_escrow', 'es', $request->input('section1.escrow.es'));
            $section->setTranslation('section1_tip', 'en', $request->input('section1.tip.en'));
            $section->setTranslation('section1_tip', 'es', $request->input('section1.tip.es'));
            $section->setTranslation('section1_graph1_title', 'en', $request->input('section1.graph1_title.en'));
            $section->setTranslation('section1_graph1_title', 'es', $request->input('section1.graph1_title.es'));

            $section->setTranslation('section2_title', 'en', $request->input('section2.title.en'));
            $section->setTranslation('section2_title', 'es', $request->input('section2.title.es'));
            $section->setTranslation('section2_additional', 'en', $request->input('section2.additional.en'));
            $section->setTranslation('section2_additional', 'es', $request->input('section2.additional.es'));
            $section->setTranslation('section2_interest_save', 'en', $request->input('section2.interest_save.en'));
            $section->setTranslation('section2_interest_save', 'es', $request->input('section2.interest_save.es'));
            $section->setTranslation('section2_term_shorten', 'en', $request->input('section2.term_shorten.en'));
            $section->setTranslation('section2_term_shorten', 'es', $request->input('section2.term_shorten.es'));
            $section->setTranslation('section2_result', 'en', $request->input('section2.result.en'));
            $section->setTranslation('section2_result', 'es', $request->input('section2.result.es'));
            $section->setTranslation('section2_graph2_tip', 'en', $request->input('section2.graph2_tip.en'));
            $section->setTranslation('section2_graph2_tip', 'es', $request->input('section2.graph2_tip.es'));

            if ($request->hasFile('section2.image')) {
                if ($section->section2_image_url) {
                    Storage::disk('public')->delete(str_replace('public/', '', $section->section2_image_url));
                }
                $path = $request->file('section2.image')->store('understanding_loan', 'public');
                $section->section2_image_url = $path;
            }

            $section->save();

            return redirect()->route('admin.pages.get-a-loan.edit')->with('success', 'Understanding Loan section updated successfully.');
        } catch (Exception $e) {
            Log::error('Error updating understanding loan section: ' . $e->getMessage());
            return redirect()->back()->withErrors(['error' => 'Failed to update understanding loan section']);
        }
    }

    public function editContact()
    {
        try {
            $contactSection = ContactSection::first();
            Log::info('Fetched contact section data: ', ['contactSection' => $contactSection]);

            return Inertia::render('Admin/Pages/ContactEdit', [
                'contactSection' => $contactSection ? [
                    'company_name' => [
                        'en' => $contactSection->getTranslation('company_name', 'en'),
                        'es' => $contactSection->getTranslation('company_name', 'es'),
                    ],
                    'address' => [
                        'en' => $contactSection->getTranslation('address', 'en'),
                        'es' => $contactSection->getTranslation('address', 'es'),
                    ],
                    'email' => [
                        'en' => $contactSection->getTranslation('email', 'en'),
                        'es' => $contactSection->getTranslation('email', 'es'),
                    ],
                    'telephone' => [
                        'en' => $contactSection->getTranslation('telephone', 'en'),
                        'es' => $contactSection->getTranslation('telephone', 'es'),
                    ],
                    'working_hours' => [
                        'en' => $contactSection->getTranslation('working_hours', 'en'),
                        'es' => $contactSection->getTranslation('working_hours', 'es'),
                    ],
                    'logo_url' => $contactSection->logo_path ? Storage::url($contactSection->logo_path) : null,
                ] : null,
            ]);
        } catch (Exception $e) {
            Log::error('Error fetching contact section data: ' . $e->getMessage());
            return Inertia::render('Admin/Pages/ContactEdit', [
                'contactSection' => null,
                'error' => 'Failed to load contact section data',
            ]);
        }
    }

    public function updateContactSection(Request $request)
    {
        $request->validate([
            'company_name.en' => 'required|string|max:255',
            'company_name.es' => 'required|string|max:255',
            'address.en' => 'required|string|max:500',
            'address.es' => 'required|string|max:500',
            'email.en' => 'required|email|max:255',
            'email.es' => 'required|email|max:255',
            'telephone.en' => 'required|string|max:20',
            'telephone.es' => 'required|string|max:20',
            'working_hours.en' => 'required|string|max:1000',
            'working_hours.es' => 'required|string|max:1000',
            'logo' => 'nullable|image|max:2048',
        ]);

        try {
            Log::info('Updating contact section with data: ', $request->all());
            $contactSection = ContactSection::firstOrCreate([]);

            $contactSection->setTranslation('company_name', 'en', $request->input('company_name.en'));
            $contactSection->setTranslation('company_name', 'es', $request->input('company_name.es'));
            $contactSection->setTranslation('address', 'en', $request->input('address.en'));
            $contactSection->setTranslation('address', 'es', $request->input('address.es'));
            $contactSection->setTranslation('email', 'en', $request->input('email.en'));
            $contactSection->setTranslation('email', 'es', $request->input('email.es'));
            $contactSection->setTranslation('telephone', 'en', $request->input('telephone.en'));
            $contactSection->setTranslation('telephone', 'es', $request->input('telephone.es'));
            $contactSection->setTranslation('working_hours', 'en', $request->input('working_hours.en'));
            $contactSection->setTranslation('working_hours', 'es', $request->input('working_hours.es'));

            if ($request->hasFile('logo')) {
                if ($contactSection->logo_path) {
                    Storage::disk('public')->delete(str_replace('public/', '', $contactSection->logo_path));
                }
                $path = $request->file('logo')->store('contact', 'public');
                $contactSection->logo_path = $path;
            }

            $contactSection->save();

            return redirect()->route('admin.pages.contact.edit')->with('success', 'Contact section updated successfully.');
        } catch (Exception $e) {
            Log::error('Error updating contact section: ' . $e->getMessage());
            return redirect()->back()->withErrors(['error' => 'Failed to update contact section']);
        }
    }
}
