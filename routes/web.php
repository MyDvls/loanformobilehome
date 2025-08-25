<?php

use App\Http\Controllers\ApplyController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PageBuilderController;
use App\Http\Controllers\ServicesController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\UnderstandingLoanController;
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

// Public Routes
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/services', [ServicesController::class, 'index'])->name('services');
Route::get('/loan-guide', [UnderstandingLoanController::class, 'index'])->name('loan-guide');
Route::get('/team', [TeamController::class, 'index'])->name('team');
Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
Route::get('/investors', fn() => Inertia::render('Investors'))->name('investors');
Route::get('/customers', fn() => Inertia::render('Customers'))->name('customers');
Route::get('/login', fn() => Inertia::render('Login'))->name('login');
Route::get('/apply', fn() => Inertia::render('Apply'))->name('apply');
Route::get('/apply/mmls', fn() => Inertia::render('MMLSApplication'))->name('apply.mmls');
Route::post('/apply', [ApplyController::class, 'apply'])->name('apply.store');
Route::get('/about', fn() => Inertia::render('About'))->name('about');
Route::get('/privacy', fn() => Inertia::render('Privacy'))->name('privacy');
Route::get('/terms', fn() => Inertia::render('Terms'))->name('terms');

// Admin Routes
Route::middleware(['auth', 'verified', 'custom.trim'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

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
