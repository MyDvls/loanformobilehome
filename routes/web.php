<?php

use App\Http\Controllers\ApplyController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PageBuilderController;
use App\Http\Middleware\CustomTrimStrings;
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
use Illuminate\Foundation\Http\Middleware\TrimStrings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

Route::get('/', function () {
    $hero = HeroSection::first();
    $loanSection = LoanSection::with('loanItems')->first();
    $requirements = RequirementsSection::first();
    $featuresSection = FeaturesSection::with('featureItems')->first();
    $locale = app()->getLocale();

    return Inertia::render('Home', [
        'hero' => $hero ? [
            'slogan' => $hero->getTranslation('slogan', $locale),
            'heading_part1' => $hero->getTranslation('heading_part1', $locale),
            'heading_part2' => $hero->getTranslation('heading_part2', $locale),
            'heading_part3' => $hero->getTranslation('heading_part3', $locale),
            'sub_heading' => $hero->getTranslation('sub_heading', $locale),
            'image_url' => $hero->image_url,
        ] : null,
        'loanSection' => $loanSection ? [
            'title' => $loanSection->getTranslation('title', $locale),
        ] : null,
        'loanItems' => $loanSection ? $loanSection->loanItems->map(function ($item) use ($locale) {
            return [
                'id' => $item->id,
                'title' => $item->getTranslation('title', $locale),
                'description' => $item->getTranslation('description', $locale),
                'image_url' => $item->image_path ? Storage::url($item->image_path) : null,
            ];
        })->toArray() : [],
        'requirementsSection' => $requirements ? [
            'title' => $requirements->getTranslation('title', $locale),
            'subtitle' => $requirements->getTranslation('subtitle', $locale),
            'requirement1' => [
                'icon' => $requirements->getTranslation('requirement1_icon', $locale),
                'title' => $requirements->getTranslation('requirement1_title', $locale),
                'description' => $requirements->getTranslation('requirement1_description', $locale),
            ],
            'requirement2' => [
                'icon' => $requirements->getTranslation('requirement2_icon', $locale),
                'title' => $requirements->getTranslation('requirement2_title', $locale),
                'description' => $requirements->getTranslation('requirement2_description', $locale),
            ],
            'requirement3' => [
                'icon' => $requirements->getTranslation('requirement3_icon', $locale),
                'title' => $requirements->getTranslation('requirement3_title', $locale),
                'description' => $requirements->getTranslation('requirement3_description', $locale),
            ],
            'requirement4' => [
                'icon' => $requirements->getTranslation('requirement4_icon', $locale),
                'title' => $requirements->getTranslation('requirement4_title', $locale),
                'description' => $requirements->getTranslation('requirement4_description', $locale),
            ],
            'requirement5' => [
                'icon' => $requirements->getTranslation('requirement5_icon', $locale),
                'title' => $requirements->getTranslation('requirement5_title', $locale),
                'description' => $requirements->getTranslation('requirement5_description', $locale),
            ],
            'requirement6' => [
                'icon' => $requirements->getTranslation('requirement6_icon', $locale),
                'title' => $requirements->getTranslation('requirement6_title', $locale),
                'description' => $requirements->getTranslation('requirement6_description', $locale),
            ],
        ] : null,
        'featuresSection' => $featuresSection ? [
            'title' => $featuresSection->getTranslation('title', $locale),
        ] : null,
        'featureItems' => $featuresSection ? $featuresSection->featureItems->map(function ($item) use ($locale) {
            return [
                'id' => $item->id,
                'title' => $item->getTranslation('title', $locale),
                'description' => $item->getTranslation('description', $locale),
                'image_path' => $item->image_path ? Storage::url($item->image_path) : null,
            ];
        })->toArray() : [],
        'locale' => $locale,
    ]);
})->name('home');

Route::get('/services', function () {
    $serviceSection = ServiceSection::first();
    $serviceItems = ServiceItem::orderBy('id', 'asc')->get();
    $locale = app()->getLocale();
    $features = FeaturesSection::first();

    return Inertia::render('Services', [
        'serviceSection' => $serviceSection ? [
            'heading' => $serviceSection->getTranslation('heading', $locale),
            'sub_heading' => $serviceSection->getTranslation('sub_heading', $locale),
        ] : null,
        'serviceItems' => $serviceItems->map(function ($item) use ($locale) {
            return [
                'id' => $item->id,
                'title' => $item->getTranslation('title', $locale),
                'description' => $item->getTranslation('description', $locale),
                'image_url' => $item->image_path ? Storage::url($item->image_path) : null,
            ];
        })->toArray(),
        'featuresSection' => $features ? [
            'title' => $features->getTranslation('title', $locale),
            'feature1' => [
                'title' => $features->getTranslation('feature1_title', $locale),
                'description' => $features->getTranslation('feature1_description', $locale),
            ],
            'feature2' => [
                'title' => $features->getTranslation('feature2_title', $locale),
                'description' => $features->getTranslation('feature2_description', $locale),
            ],
            'feature3' => [
                'title' => $features->getTranslation('feature3_title', $locale),
                'description' => $features->getTranslation('feature3_description', $locale),
            ],
            'feature4' => [
                'title' => $features->getTranslation('feature4_title', $locale),
                'description' => $features->getTranslation('feature4_description', $locale),
            ],
            'feature5' => [
                'title' => $features->getTranslation('feature5_title', $locale),
                'description' => $features->getTranslation('feature5_description', $locale),
            ],
        ] : null,
        'locale' => $locale,
    ]);
})->name('services');

Route::get('/understanding-loan', function () {
    $understandingLoanSection = UnderstandingLoanSection::first();
    $locale = app()->getLocale();

    return Inertia::render('UnderstandingLoan', [
        'understandingLoanSection' => $understandingLoanSection ? [
            'title' => $understandingLoanSection->getTranslation('title', $locale),
            'subtitle' => $understandingLoanSection->getTranslation('subtitle', $locale),
            'section1' => [
                'title' => $understandingLoanSection->getTranslation('section1_title', $locale),
                'description' => $understandingLoanSection->getTranslation('section1_description', $locale),
                'principal' => $understandingLoanSection->getTranslation('section1_principal', $locale),
                'interest' => $understandingLoanSection->getTranslation('section1_interest', $locale),
                'escrow' => $understandingLoanSection->getTranslation('section1_escrow', $locale),
                'tip' => $understandingLoanSection->getTranslation('section1_tip', $locale),
                'graph1_title' => $understandingLoanSection->getTranslation('section1_graph1_title', $locale),
            ],
            'section2' => [
                'title' => $understandingLoanSection->getTranslation('section2_title', $locale),
                'additional' => $understandingLoanSection->getTranslation('section2_additional', $locale),
                'interest_save' => $understandingLoanSection->getTranslation('section2_interest_save', $locale),
                'term_shorten' => $understandingLoanSection->getTranslation('section2_term_shorten', $locale),
                'result' => $understandingLoanSection->getTranslation('section2_result', $locale),
                'graph2_tip' => $understandingLoanSection->getTranslation('section2_graph2_tip', $locale),
                'image_url' => $understandingLoanSection->section2_image_url,
            ],
        ] : null,
        'locale' => $locale,
    ]);
})->name('understanding-loan');

Route::get('/team', function () {
    $teamSection = TeamSection::first();
    $teamMembers = TeamMember::orderBy('id', 'asc')->get();
    $locale = app()->getLocale();

    return Inertia::render('Team', [
        'teamSection' => $teamSection ? [
            'heading' => $teamSection->getTranslation('heading', $locale),
            'sub_heading' => $teamSection->getTranslation('sub_heading', $locale),
        ] : null,
        'teamMembers' => $teamMembers->map(function ($member) use ($locale) {
            return [
                'id' => $member->id,
                'name' => $member->getTranslation('name', $locale),
                'role' => $member->getTranslation('role', $locale),
                'bio' => $member->getTranslation('bio', $locale),
                'image_url' => $member->image_path ? Storage::url($member->image_path) : null,
            ];
        })->toArray(),
        'locale' => $locale,
    ]);
})->name('team');

Route::get('/investors', function () {
    return Inertia::render('Investors');
})->name('investors');

Route::get('/contact', function () {
    $contactSection = ContactSection::first();
    $locale = app()->getLocale();
    return Inertia::render('Contact', [
        'contactSection' => $contactSection ? [
            'company_name' => $contactSection->getTranslation('company_name', $locale),
            'address' => $contactSection->getTranslation('address', $locale),
            'email' => $contactSection->getTranslation('email', $locale),
            'telephone' => $contactSection->getTranslation('telephone', $locale),
            'working_hours' => $contactSection->getTranslation('working_hours', $locale),
            'logo_url' => $contactSection->logo_path ? Storage::url($contactSection->logo_path) : null,
        ] : null,
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
