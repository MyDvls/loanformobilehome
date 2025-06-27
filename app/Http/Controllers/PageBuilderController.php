<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ContactSection;
use App\Models\FeatureItem;
use App\Models\FeatureSection;
use App\Models\HeroSection;
use App\Models\LoanItem;
use App\Models\LoanSection;
use App\Models\RequirementItem;
use App\Models\RequirementSection;
use App\Models\ServiceItem;
use App\Models\ServiceSection;
use App\Models\TeamMember;
use App\Models\TeamSection;
use App\Models\TestimonialSection;
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
        $loanSection = LoanSection::with(['loanItems' => function ($query) {
            $query->orderBy('id');
        }])->first();

        $requirements = RequirementSection::with(['requirementItems' => function ($query) {
            $query->orderBy('id');
        }])->first();

        $featuresSection = FeatureSection::with(['featureItems' => function ($query) {
            $query->orderBy('id');
        }])->first();

        $testimonialsSection = TestimonialSection::all();

        return Inertia::render('Admin/Pages/HomeEdit', [
            'hero' => $hero ? [
                'slogan' => $hero->slogan,
                'heading_part1' => $hero->heading_part1,
                'heading_part2' => $hero->heading_part2,
                'heading_part3' => $hero->heading_part3,
                'sub_heading' => $hero->sub_heading,
                'image_url' => $hero->image_url,
            ] : null,
            'loanSection' => $loanSection ? [
                'id' => $loanSection->id,
                'title' => $loanSection->title,
            ] : null,
            'loanItems' => $loanSection ? $loanSection->loanItems->map(function ($item) {
                return [
                    'id' => $item->id,
                    'title' => $item->title,
                    'description' => $item->description,
                    'image_path' => $item->image_path ? Storage::url($item->image_path) : null,
                ];
            })->toArray() : [],
            'requirementsSection' => $requirements ? [
                'title' => $requirements->title,
                'subtitle' => $requirements->subtitle,
                'items' => $requirements->requirementItems->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'icon' => $item->icon,
                        'title' => $item->title,
                        'description' => $item->description,
                        'image_path' => $item->image_path ? Storage::url($item->image_path) : null,
                    ];
                })->toArray(),
            ] : null,
            'featuresSection' => $featuresSection ? [
                'id' => $featuresSection->id,
                'title' => $featuresSection->title,
            ] : null,
            'featureItems' => $featuresSection ? $featuresSection->featureItems->map(function ($item) {
                return [
                    'id' => $item->id,
                    'title' => $item->title,
                    'description' => $item->description,
                    'image_path' => $item->image_path ? Storage::url($item->image_path) : null,
                ];
            })->toArray() : [],
            'testimonialsSection' => $testimonialsSection->map(function ($testimonial) {
                return [
                    'id' => $testimonial->id,
                    'post' => $testimonial->post,
                    'full_name' => $testimonial->full_name,
                    'heading' => $testimonial->heading,
                ];
            })->toArray(),
        ]);
    }

    public function updateHero(Request $request)
    {
        $request->validate([
            'slogan' => 'required|string|max:255',
            'heading_part1' => 'required|string|max:255',
            'heading_part2' => 'required|string|max:255',
            'heading_part3' => 'required|string|max:255',
            'sub_heading' => 'required|string|max:500',
            'image' => 'nullable|image|max:2048',
        ]);

        Log::info('Updating hero section with data: ', $request->all());
        $hero = HeroSection::firstOrCreate([]);

        $hero->slogan = $request->input('slogan');
        $hero->heading_part1 = $request->input('heading_part1');
        $hero->heading_part2 = $request->input('heading_part2');
        $hero->heading_part3 = $request->input('heading_part3');
        $hero->sub_heading = $request->input('sub_heading');

        if ($request->hasFile('image')) {
            if ($hero->image_path) {
                Storage::disk('public')->delete($hero->image_path);
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
            'title' => 'required|string|max:255',
            'loanItems' => 'required|array',
            'loanItems.*.id' => 'sometimes|nullable|integer|exists:loan_items,id',
            'loanItems.*.title' => 'required|string|max:255',
            'loanItems.*.description' => 'required|string|max:1000',
            'loanItems.*.image' => 'nullable|file|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $loanSection = LoanSection::firstOrCreate([]);
        $loanSection->title = $request->input('title');
        $loanSection->save();

        $requestLoanItemIds = collect($request->input('loanItems'))
            ->filter(fn($item) => isset($item['id']) && $item['id'])
            ->pluck('id')
            ->toArray();

        LoanItem::where('loan_section_id', $loanSection->id)
            ->whereNotIn('id', $requestLoanItemIds)
            ->delete();

        foreach ($request->input('loanItems') as $index => $loanItemData) {
            $loanItem = isset($loanItemData['id']) && $loanItemData['id']
                ? LoanItem::find($loanItemData['id'])
                : new LoanItem();

            $loanItem->loan_section_id = $loanSection->id;
            $loanItem->title = $loanItemData['title'];
            $loanItem->description = $loanItemData['description'];

            if ($request->hasFile("loanItems.{$index}.image")) {
                if ($loanItem->image_path) {
                    Storage::disk('public')->delete($loanItem->image_path);
                }
                $path = $request->file("loanItems.{$index}.image")->store('loan', 'public');
                $loanItem->image_path = $path;
            }

            $loanItem->save();
        }

        return redirect()->route('admin.pages.home.edit')->with('success', 'Loan section updated successfully.');
    }

    public function updateRequirementsSection(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'required|string|max:500',
            'requirementItems' => 'required|array',
            'requirementItems.*.id' => 'sometimes|nullable|integer|exists:requirement_items,id',
            'requirementItems.*.title' => 'required|string|max:255',
            'requirementItems.*.description' => 'required|string|max:1000',
            'requirementItems.*.image' => 'nullable|file|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        Log::info('Updating requirements section with data: ', $request->all());
        $requirements = RequirementSection::firstOrCreate([]);

        $requirements->title = $request->input('title');
        $requirements->subtitle = $request->input('subtitle');
        $requirements->save();

        $requestItemIds = collect($request->input('requirementItems'))
            ->filter(fn($item) => isset($item['id']) && $item['id'])
            ->pluck('id')
            ->toArray();

        RequirementItem::where('requirement_section_id', $requirements->id)
            ->whereNotIn('id', $requestItemIds)
            ->delete();

        foreach ($request->input('requirementItems') as $index => $itemData) {
            $requirementItem = isset($itemData['id']) && $itemData['id']
                ? RequirementItem::find($itemData['id'])
                : new RequirementItem();

            $requirementItem->requirement_section_id = $requirements->id;
            $requirementItem->title = $itemData['title'];
            $requirementItem->description = $itemData['description'];

            if ($request->hasFile("requirementItems.{$index}.image")) {
                if ($requirementItem->image_path) {
                    Storage::disk('public')->delete($requirementItem->image_path);
                }
                $path = $request->file("requirementItems.{$index}.image")->store('requirements', 'public');
                $requirementItem->image_path = $path;
            }

            $requirementItem->save();
        }

        return redirect()->route('admin.pages.home.edit')->with('success', 'Requirements section updated successfully.');
    }

    public function updateFeaturesSection(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'featureItems' => 'required|array',
            'featureItems.*.id' => 'sometimes|nullable|integer|exists:feature_items,id',
            'featureItems.*.title' => 'required|string|max:255',
            'featureItems.*.description' => 'required|string|max:1000',
            'featureItems.*.image' => 'nullable|file|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        Log::info('Updating features section with data: ', $request->all());

        $featuresSection = FeatureSection::firstOrCreate([]);
        $featuresSection->title = $request->input('title');
        $featuresSection->save();

        $requestFeatureItemIds = collect($request->input('featureItems'))
            ->filter(fn($item) => isset($item['id']) && $item['id'])
            ->pluck('id')
            ->toArray();

        FeatureItem::where('feature_section_id', $featuresSection->id)
            ->whereNotIn('id', $requestFeatureItemIds)
            ->delete();

        foreach ($request->input('featureItems') as $index => $featureItemData) {
            $featureItem = isset($featureItemData['id']) && $featureItemData['id']
                ? FeatureItem::find($featureItemData['id'])
                : new FeatureItem();

            $featureItem->feature_section_id = $featuresSection->id;
            $featureItem->title = $featureItemData['title'];
            $featureItem->description = $featureItemData['description'];

            if ($request->hasFile("featureItems.{$index}.image")) {
                if ($featureItem->image_path) {
                    Storage::disk('public')->delete($featureItem->image_path);
                }
                $path = $request->file("featureItems.{$index}.image")->store('feature', 'public');
                $featureItem->image_path = $path;
            }

            $featureItem->save();
        }

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
                    'heading' => $serviceSection->heading,
                    'sub_heading' => $serviceSection->sub_heading,
                ] : null,
                'serviceItems' => $serviceItems->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'image_path' => $item->image_path,
                        'title' => $item->title,
                        'description' => $item->description,
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
            'heading' => 'required|string|max:255',
            'sub_heading' => 'required|string|max:500',
            'services' => 'required|array',
            'services.*.id' => 'sometimes|nullable|integer|exists:service_items,id',
            'services.*.title' => 'required|string|max:255',
            'services.*.description' => 'required|string|max:1000',
            'services.*.image' => 'nullable|file|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        try {
            Log::info('Updating services section with data: ', $request->all());

            $serviceSection = ServiceSection::firstOrCreate([]);
            $serviceSection->heading = $request->input('heading');
            $serviceSection->sub_heading = $request->input('sub_heading');
            $serviceSection->save();

            $requestServiceIds = collect($request->input('services'))
                ->filter(fn($service) => isset($service['id']) && $service['id'])
                ->pluck('id')
                ->toArray();

            ServiceItem::whereNotIn('id', $requestServiceIds)->delete();

            foreach ($request->input('services') as $index => $serviceData) {
                $serviceItem = isset($serviceData['id']) && $serviceData['id']
                    ? ServiceItem::find($serviceData['id'])
                    : new ServiceItem();

                $serviceItem->service_section_id = $serviceSection->id;
                $serviceItem->title = $serviceData['title'];
                $serviceItem->description = $serviceData['description'];

                if ($request->hasFile("services.{$index}.image")) {
                    if ($serviceItem->image_path) {
                        Storage::disk('public')->delete($serviceItem->image_path);
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
                    'heading' => $teamSection->heading,
                    'sub_heading' => $teamSection->sub_heading,
                ] : null,
                'teamMembers' => $teamMembers->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'image_path' => $item->image_path,
                        'name' => $item->name,
                        'role' => $item->role,
                        'bio' => $item->bio,
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
            'heading' => 'required|string|max:255',
            'sub_heading' => 'required|string|max:500',
            'team_members' => 'required|array',
            'team_members.*.id' => 'sometimes|nullable|integer|exists:team_members,id',
            'team_members.*.name' => 'required|string|max:255',
            'team_members.*.role' => 'required|string|max:255',
            'team_members.*.bio' => 'required|string|max:2000',
            'team_members.*.image' => 'nullable|file|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        try {
            Log::info('Updating team section with data: ', $request->all());

            $teamSection = TeamSection::firstOrCreate([]);
            $teamSection->heading = $request->input('heading');
            $teamSection->sub_heading = $request->input('sub_heading');
            $teamSection->save();

            $requestMemberIds = collect($request->input('team_members'))
                ->filter(fn($member) => isset($member['id']) && $member['id'])
                ->pluck('id')
                ->toArray();

            TeamMember::whereNotIn('id', $requestMemberIds)->delete();

            foreach ($request->input('team_members') as $index => $memberData) {
                $teamMember = isset($memberData['id']) && $memberData['id']
                    ? TeamMember::find($memberData['id'])
                    : new TeamMember();

                $teamMember->team_section_id = $teamSection->id;
                $teamMember->name = $memberData['name'];
                $teamMember->role = $memberData['role'];
                $teamMember->bio = $memberData['bio'];
                $teamMember->order = $index;

                if ($request->hasFile("team_members.{$index}.image")) {
                    if ($teamMember->image_path) {
                        Storage::disk('public')->delete($teamMember->image_path);
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
                    'title' => $section->title,
                    'subtitle' => $section->subtitle,
                    'section1' => [
                        'title' => $section->section1_title,
                        'description' => $section->section1_description,
                        'principal' => $section->section1_principal,
                        'interest' => $section->section1_interest,
                        'escrow' => $section->section1_escrow,
                        'tip' => $section->section1_tip,
                        'graph1_title' => $section->section1_graph1_title,
                    ],
                    'section2' => [
                        'title' => $section->section2_title,
                        'additional' => $section->section2_additional,
                        'interest_save' => $section->section2_interest_save,
                        'term_shorten' => $section->section2_term_shorten,
                        'result' => $section->section2_result,
                        'graph2_tip' => $section->section2_graph2_tip,
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
            'title' => 'required|string|max:255',
            'subtitle' => 'required|string|max:500',
            'section1.title' => 'required|string|max:255',
            'section1.description' => 'required|string|max:1000',
            'section1.principal' => 'required|string|max:255',
            'section1.interest' => 'required|string|max:255',
            'section1.escrow' => 'required|string|max:255',
            'section1.tip' => 'required|string|max:1000',
            'section1.graph1_title' => 'required|string|max:255',
            'section2.title' => 'required|string|max:255',
            'section2.additional' => 'required|string|max:255',
            'section2.interest_save' => 'required|string|max:255',
            'section2.term_shorten' => 'required|string|max:255',
            'section2.result' => 'required|string|max:255',
            'section2.graph2_tip' => 'required|string|max:1000',
            'section2.image' => 'nullable|image|max:2048',
        ]);

        try {
            Log::info('Updating understanding loan section with data: ', $request->all());
            $section = UnderstandingLoanSection::firstOrCreate([]);

            $section->title = $request->input('title');
            $section->subtitle = $request->input('subtitle');
            $section->section1_title = $request->input('section1.title');
            $section->section1_description = $request->input('section1.description');
            $section->section1_principal = $request->input('section1.principal');
            $section->section1_interest = $request->input('section1.interest');
            $section->section1_escrow = $request->input('section1.escrow');
            $section->section1_tip = $request->input('section1.tip');
            $section->section1_graph1_title = $request->input('section1.graph1_title');
            $section->section2_title = $request->input('section2.title');
            $section->section2_additional = $request->input('section2.additional');
            $section->section2_interest_save = $request->input('section2.interest_save');
            $section->section2_term_shorten = $request->input('section2.term_shorten');
            $section->section2_result = $request->input('section2.result');
            $section->section2_graph2_tip = $request->input('section2.graph2_tip');

            if ($request->hasFile('section2.image')) {
                if ($section->section2_image_url) {
                    Storage::disk('public')->delete($section->section2_image_url);
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
                    'company_name' => $contactSection->company_name,
                    'address' => $contactSection->address,
                    'email' => $contactSection->email,
                    'telephone' => $contactSection->telephone,
                    'working_hours' => $contactSection->working_hours,
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
            'company_name' => 'required|string|max:255',
            'address' => 'required|string|max:500',
            'email' => 'required|email|max:255',
            'telephone' => 'required|string|max:20',
            'working_hours' => 'required|string|max:1000',
            'logo' => 'nullable|image|max:2048',
        ]);

        try {
            Log::info('Updating contact section with data: ', $request->all());
            $contactSection = ContactSection::firstOrCreate([]);

            $contactSection->company_name = $request->input('company_name');
            $contactSection->address = $request->input('address');
            $contactSection->email = $request->input('email');
            $contactSection->telephone = $request->input('telephone');
            $contactSection->working_hours = $request->input('working_hours');

            if ($request->hasFile('logo')) {
                if ($contactSection->logo_path) {
                    Storage::disk('public')->delete($contactSection->logo_path);
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

    public function updateTestimonialSection(Request $request)
    {
        $validated = $request->validate([
            'testimonials.*.id' => 'nullable|integer|exists:testimonial_section,id',
            'testimonials.*.post' => 'required|string',
            'testimonials.*.full_name' => 'required|string|max:255',
            'testimonials.*.heading' => 'required|string',
        ]);

        // Delete existing testimonials not in the request
        $existingIds = collect($validated['testimonials'])->pluck('id')->filter()->toArray();
        TestimonialSection::whereNotIn('id', $existingIds)->delete();

        // Update or create testimonials
        foreach ($validated['testimonials'] as $testimonialData) {
            TestimonialSection::updateOrCreate(
                ['id' => $testimonialData['id'] ?? null],
                [
                    'post' => $testimonialData['post'],
                    'full_name' => $testimonialData['full_name'],
                    'heading' => $testimonialData['heading'],
                ]
            );
        }

        return redirect()->back()->with('success', 'Testimonial section updated successfully.');
    }
}
