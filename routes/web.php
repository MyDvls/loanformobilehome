<?php

use App\Http\Controllers\ApplyController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PageBuilderController;
use App\Http\Middleware\CustomTrimStrings;
use App\Models\ContactSection;
use App\Models\FeatureSection;
use App\Models\FeaturesSection;
use App\Models\HeroSection;
use App\Models\LoanSection;
use App\Models\RequirementSection;
use App\Models\ServiceItem;
use App\Models\ServiceSection;
use App\Models\TeamMember;
use App\Models\TeamSection;
use App\Models\TestimonialSection;
use App\Models\UnderstandingLoanSection;
use App\Services\TranslationService;
use Illuminate\Foundation\Http\Middleware\TrimStrings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

Route::get('/', function (TranslationService $translator) {
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
    $testimonialSection = TestimonialSection::all();
    $locale = app()->getLocale();

    // Prepare hero data in English first
    $heroData = $hero ? [
        'slogan' => $hero->slogan,
        'heading_part1' => $hero->heading_part1,
        'heading_part2' => $hero->heading_part2,
        'heading_part3' => $hero->heading_part3,
        'sub_heading' => $hero->sub_heading,
        'image_path' => $hero->image_path ? Storage::url($hero->image_path) : null,
    ] : null;

    // Prepare loan section data
    $loanData = $loanSection ? [
        'title' => $loanSection->title,
    ] : null;

    // Prepare loan items data
    $loanItemsData = $loanSection ? $loanSection->loanItems->map(function ($item) {
        return [
            'id' => $item->id,
            'title' => $item->title,
            'description' => $item->description,
            'image_url' => $item->image_path ? Storage::url($item->image_path) : null,
        ];
    })->toArray() : [];

    // Prepare requirements section data
    $requirementsData = $requirements ? [
        'title' => $requirements->title,
        'subtitle' => $requirements->subtitle,
    ] : null;

    // Prepare requirement items data
    $requirementItemsData = $requirements ? $requirements->requirementItems->map(function ($item) {
        return [
            'id' => $item->id,
            'title' => $item->title,
            'description' => $item->description,
            'image_path' => $item->image_path ? Storage::url($item->image_path) : null,
        ];
    })->toArray() : [];

    // Prepare features section data
    $featuresData = $featuresSection ? [
        'title' => $featuresSection->title,
    ] : null;

    // Prepare feature items data
    $featureItemsData = $featuresSection ? $featuresSection->featureItems->map(function ($item) {
        return [
            'id' => $item->id,
            'title' => $item->title,
            'description' => $item->description,
            'image_path' => $item->image_path ? Storage::url($item->image_path) : null,
        ];
    })->toArray() : [];


    $testimonialData = $testimonialSection->map(function ($testimonial) {
        return [
            'id' => $testimonial->id,
            'quote' => $testimonial->post,
            'name' => $testimonial->full_name,
            'title' => $testimonial->heading,
        ];
    })->toArray();

    // Translate if locale is not English
    if ($locale !== 'en') {
        // Translate hero data
        if ($heroData) {
            $heroData = $translator->translateArray($heroData, $locale);
        }

        // Translate loan section data
        if ($loanData) {
            $loanData = $translator->translateArray($loanData, $locale);
        }

        // Translate loan items data
        if (!empty($loanItemsData)) {
            $loanItemsData = array_map(function ($item) use ($translator, $locale) {
                return $translator->translateArray($item, $locale);
            }, $loanItemsData);
        }

        // Translate requirements data
        if ($requirementsData) {
            $requirementsData = $translator->translateArray($requirementsData, $locale);
        }

        // Translate requirements item data
        if (!empty($requirementItemsData)) {
            $requirementItemsData = array_map(function ($item) use ($translator, $locale) {
                return $translator->translateArray($item, $locale);
            }, $requirementItemsData);
        }

        // Translate features section data
        if ($featuresData) {
            $featuresData = $translator->translateArray($featuresData, $locale);
        }

        // Translate feature items data
        if (!empty($featureItemsData)) {
            $featureItemsData = array_map(function ($item) use ($translator, $locale) {
                return $translator->translateArray($item, $locale);
            }, $featureItemsData);
        }

        // Translate testimonial data
        if (!empty($testimonialData)) {
            $testimonialData = array_map(function ($item) use ($translator, $locale) {
                return $translator->translateArray($item, $locale);
            }, $testimonialData);
        }
    }

    return Inertia::render('Home', [
        'hero' => $heroData,
        'loanSection' => $loanData,
        'loanItems' => $loanItemsData,
        'requirementsSection' => $requirementsData,
        'requirementItems' => $requirementItemsData,
        'featuresSection' => $featuresData,
        'featureItems' => $featureItemsData,
        'testimonialSection' => $testimonialData,
        'locale' => $locale,
    ]);
})->name('home');

Route::get('/services', function (TranslationService $translator) {
    $serviceSection = ServiceSection::first();
    $serviceItems = ServiceItem::orderBy('id', 'asc')->get();
    $featuresSection = FeatureSection::with('featureItems')->first();
    $locale = app()->getLocale();

    $serviceSectionData = $serviceSection ? [
        'heading' => $serviceSection->heading,
        'sub_heading' => $serviceSection->sub_heading,
    ] : null;

    $serviceItemsData = $serviceItems->map(function ($item) {
        return [
            'id' => $item->id,
            'title' => $item->title,
            'description' => $item->description,
            'image_url' => $item->image_path ? Storage::url($item->image_path) : null,
        ];
    })->toArray();

    $featuresData = $featuresSection ? [
        'title' => $featuresSection->title,
    ] : null;

    $featureItemsData = $featuresSection ? $featuresSection->featureItems->map(function ($item) {
        return [
            'id' => $item->id,
            'title' => $item->title,
            'description' => $item->description,
            'image_path' => $item->image_path ? Storage::url($item->image_path) : null,
        ];
    })->toArray() : [];

    if ($locale !== 'en') {
        if ($serviceSectionData) {
            $serviceSectionData = $translator->translateArray($serviceSectionData, $locale);
        }
        if (!empty($serviceItemsData)) {
            $serviceItemsData = array_map(function ($item) use ($translator, $locale) {
                return $translator->translateArray($item, $locale);
            }, $serviceItemsData);
        }
        if ($featuresData) {
            $featuresData = $translator->translateArray($featuresData, $locale);
        }
        if (!empty($featureItemsData)) {
            $featureItemsData = array_map(function ($item) use ($translator, $locale) {
                return $translator->translateArray($item, $locale);
            }, $featureItemsData);
        }
    }

    return Inertia::render('Services', [
        'serviceSection' => $serviceSectionData,
        'serviceItems' => $serviceItemsData,
        'featuresSection' => $featuresData,
        'featureItems' => $featureItemsData,
        'locale' => $locale,
    ]);
})->name('services');

Route::get('/understanding-loan', function (TranslationService $translator) {
    $understandingLoanSection = UnderstandingLoanSection::first();
    $locale = app()->getLocale();

    $understandingLoanSectionData = $understandingLoanSection ? [
        'title' => $understandingLoanSection->title,
        'subtitle' => $understandingLoanSection->subtitle,
        'section1' => [
            'title' => $understandingLoanSection->section1_title,
            'description' => $understandingLoanSection->section1_description,
            'principal' => $understandingLoanSection->section1_principal,
            'interest' => $understandingLoanSection->section1_interest,
            'escrow' => $understandingLoanSection->section1_escrow,
            'tip' => $understandingLoanSection->section1_tip,
            'graph1_title' => $understandingLoanSection->section1_graph1_title,
        ],
        'section2' => [
            'title' => $understandingLoanSection->section2_title,
            'additional' => $understandingLoanSection->section2_additional,
            'interest_save' => $understandingLoanSection->section2_interest_save,
            'term_shorten' => $understandingLoanSection->section2_term_shorten,
            'result' => $understandingLoanSection->section2_result,
            'graph2_tip' => $understandingLoanSection->section2_graph2_tip,
            'image_url' => $understandingLoanSection->section2_image_url,
        ],
    ] : null;

    if ($locale !== 'en' && $understandingLoanSectionData) {
        $understandingLoanSectionData = $translator->translateArray($understandingLoanSectionData, $locale);
    }

    return Inertia::render('UnderstandingLoan', [
        'understandingLoanSection' => $understandingLoanSectionData,
        'locale' => $locale,
    ]);
})->name('understanding-loan');

Route::get('/team', function (TranslationService $translator) {
    $teamSection = TeamSection::first();
    $teamMembers = TeamMember::orderBy('id', 'asc')->get();
    $locale = app()->getLocale();

    $teamSectionData = $teamSection ? [
        'heading' => $teamSection->heading,
        'sub_heading' => $teamSection->sub_heading,
    ] : null;

    $teamMembersData = $teamMembers->map(function ($member) {
        return [
            'id' => $member->id,
            'name' => $member->name,
            'role' => $member->role,
            'bio' => $member->bio,
            'image_url' => $member->image_path ? Storage::url($member->image_path) : null,
        ];
    })->toArray();

    if ($locale !== 'en') {
        if ($teamSectionData) {
            $teamSectionData = $translator->translateArray($teamSectionData, $locale);
        }
        if (!empty($teamMembersData)) {
            $teamMembersData = array_map(function ($item) use ($translator, $locale) {
                return $translator->translateArray($item, $locale);
            }, $teamMembersData);
        }
    }

    return Inertia::render('Team', [
        'teamSection' => $teamSectionData,
        'teamMembers' => $teamMembersData,
        'locale' => $locale,
    ]);
})->name('team');

Route::get('/investors', function () {
    return Inertia::render('Investors');
})->name('investors');

Route::get('/contact', function (TranslationService $translator) {
    $contactSection = ContactSection::first();
    $locale = app()->getLocale();

    $contactSectionData = $contactSection ? [
        'company_name' => $contactSection->company_name,
        'address' => $contactSection->address,
        'email' => $contactSection->email,
        'telephone' => $contactSection->telephone,
        'working_hours' => $contactSection->working_hours,
        'logo_url' => $contactSection->logo_path ? Storage::url($contactSection->logo_path) : null,
    ] : null;

    if ($locale !== 'en' && $contactSectionData) {
        $contactSectionData = $translator->translateArray($contactSectionData, $locale);
    }

    return Inertia::render('Contact', [
        'contactSection' => $contactSectionData,
        'locale' => $locale,
    ]);
})->name('contact');

Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

Route::get('/login', function () {
    return Inertia::render('Login');
})->name('login');

Route::get('/apply', function () {
    return Inertia::render('Apply');
})->name('apply');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/privacy', function () {
    return Inertia::render('Privacy');
})->name('privacy');

Route::get('/terms', function () {
    return Inertia::render('Terms');
})->name('terms');

Route::post('/apply', [ApplyController::class, 'apply'])->name('apply.store');

Route::middleware(['auth', 'verified', 'custom.trim'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');

    Route::get('/admin/pages/home', [PageBuilderController::class, 'editHome'])->name('admin.pages.home.edit');
    Route::post('/admin/pages/home/hero', [PageBuilderController::class, 'updateHero'])->name('admin.pages.home.hero.update');
    Route::post('/admin/pages/home/loan-section', [PageBuilderController::class, 'updateLoanSection'])->name('admin.pages.home.loan.update');
    Route::post('/admin/pages/home/requirements-section', [PageBuilderController::class, 'updateRequirementsSection'])->name('admin.pages.home.requirements.update');
    Route::post('/admin/pages/home/features-section', [PageBuilderController::class, 'updateFeaturesSection'])->name('admin.pages.home.features.update');
    Route::post('/admin/pages/testimonials/section', [PageBuilderController::class, 'updateTestimonialSection'])->name('admin.pages.testimonials.section.update');

    Route::get('/admin/pages/services', [PageBuilderController::class, 'editServices'])->name('admin.pages.services.edit');
    Route::post('/admin/pages/services/section', [PageBuilderController::class, 'updateServiceSection'])->name('admin.pages.services.section.update');

    Route::get('/admin/pages/team', [PageBuilderController::class, 'editTeam'])->name('admin.pages.team.edit');
    Route::post('/admin/pages/team/section', [PageBuilderController::class, 'updateTeamSection'])->name('admin.pages.team.section.update');

    Route::get('/admin/pages/get-a-loan', [PageBuilderController::class, 'editUnderstandingLoan'])->name('admin.pages.get-a-loan.edit');
    Route::post('/admin/pages/get-a-loan/section', [PageBuilderController::class, 'updateUnderstandingLoanSection'])->name('admin.pages.get-a-loan.section.update');

    Route::get('/admin/pages/contact', [PageBuilderController::class, 'editContact'])->name('admin.pages.contact.edit');
    Route::post('/admin/pages/contact/section', [PageBuilderController::class, 'updateContactSection'])->name('admin.pages.contact.section.update');
});

Route::post('/language/switch', function (Request $request) {
    $locale = $request->input('locale');

    if (in_array($locale, config('app.available_locales'))) {
        session(['locale' => $locale]);
        app()->setLocale($locale);
    }

    return redirect()->back();
})->name('language.switch');


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

Route::get('/{any}', function () {
    return Inertia::render('NotFound');
})->where('any', '.*')->name('not-found');
