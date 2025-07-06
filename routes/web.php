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
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

// ────────────────────────────────────────────────────────────────
// HOME
// ────────────────────────────────────────────────────────────────
Route::get('/', function (TranslationService $translator) {
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
            'image_url'   => $i->image_path ? Storage::url($i->image_path) : null,
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
})->name('home');


// ────────────────────────────────────────────────────────────────
// SERVICES
// ────────────────────────────────────────────────────────────────
Route::get('/services', function (TranslationService $translator) {
    $locale   = app()->getLocale();

    $serviceSection = ServiceSection::first();
    $serviceItems   = ServiceItem::orderBy('id')->get();
    $featuresSection = FeatureSection::with('featureItems')->first();

    $sectionData = $serviceSection ? [
        'heading'     => $serviceSection->heading,
        'sub_heading' => $serviceSection->sub_heading,
    ] : null;

    $itemsData = $serviceItems->map(fn($i) => [
        'id'          => $i->id,
        'title'       => $i->title,
        'description' => $i->description,
        'image_url'   => $i->image_path ? Storage::url($i->image_path) : null,
    ])->toArray();

    $featuresData = $featuresSection ? ['title' => $featuresSection->title] : null;
    $featureItemsData = $featuresSection
        ? $featuresSection->featureItems->map(fn($i) => [
            'id'          => $i->id,
            'title'       => $i->title,
            'description' => $i->description,
            'image_path'  => $i->image_path ? Storage::url($i->image_path) : null,
        ])->toArray()
        : [];

    if ($locale !== 'en') {
        $sectionData      = $sectionData      ? $translator->translateArray($sectionData, $locale)           : null;
        $itemsData        = array_map(fn($i) => $translator->translateArray($i, $locale), $itemsData);
        $featuresData     = $featuresData     ? $translator->translateArray($featuresData, $locale)         : null;
        $featureItemsData = array_map(fn($i) => $translator->translateArray($i, $locale), $featureItemsData);
    }

    $props = [
        'serviceSection' => $sectionData,
        'serviceItems'   => $itemsData,
        'featuresSection' => $featuresData,
        'featureItems'   => $featureItemsData,
        'locale'         => $locale,
    ];


    return Inertia::render('Services', $props);
})->name('services');


// ────────────────────────────────────────────────────────────────
// UNDERSTANDING LOAN
// ────────────────────────────────────────────────────────────────
Route::get('/understanding-loan', function (TranslationService $translator) {
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
})->name('understanding-loan');


// ────────────────────────────────────────────────────────────────
// TEAM
// ────────────────────────────────────────────────────────────────
Route::get('/team', function (TranslationService $translator) {
    $locale   = app()->getLocale();

    $teamSection = TeamSection::first();
    $teamMembers = TeamMember::orderBy('id')->get();

    $sectionData = $teamSection ? [
        'heading'     => $teamSection->heading,
        'sub_heading' => $teamSection->sub_heading,
    ] : null;

    $membersData = $teamMembers->map(fn($m) => [
        'id'        => $m->id,
        'name'      => $m->name,
        'role'      => $m->role,
        'bio'       => $m->bio,
        'image_url' => $m->image_path ? Storage::url($m->image_path) : null,
    ])->toArray();

    if ($locale !== 'en') {
        $sectionData = $sectionData ? $translator->translateArray($sectionData, $locale) : null;
        $membersData = array_map(fn($i) => $translator->translateArray($i, $locale), $membersData);
    }

    $props = [
        'teamSection' => $sectionData,
        'teamMembers' => $membersData,
        'locale'      => $locale,
    ];


    return Inertia::render('Team', $props);
})->name('team');

// ────────────────────────────────────────────────────────────────
// CONTACT
// ────────────────────────────────────────────────────────────────
Route::get('/contact', function (TranslationService $translator) {
    $locale   = app()->getLocale();

    $sec = ContactSection::first();

    $data = $sec ? [
        'company_name'  => $sec->company_name,
        'address'       => $sec->address,
        'email'         => $sec->email,
        'telephone'     => $sec->telephone,
        'working_hours' => $sec->working_hours,
        'logo_url'      => $sec->logo_path ? Storage::url($sec->logo_path) : null,
    ] : null;

    if ($locale !== 'en' && $data) {
        $data = $translator->translateArray($data, $locale);
    }

    $props = [
        'contactSection' => $data,
        'locale'         => $locale,
    ];


    return Inertia::render('Contact', $props);
})->name('contact');


Route::get('/investors', function () {
    return Inertia::render('Investors');
})->name('investors');

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
