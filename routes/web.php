<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/services', function () {
    return Inertia::render('Services');
})->name('services');

Route::get('/understanding-loan', function () {
    return Inertia::render('UnderstandingLoan');
})->name('understanding-loan');

Route::get('/team', function () {
    return Inertia::render('Team');
})->name('team');

Route::get('/investors', function () {
    return Inertia::render('Investors');
})->name('investors');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

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

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');
});

Route::get('/{any}', function () {
    return Inertia::render('NotFound');
})->where('any', '.*')->name('not-found');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
