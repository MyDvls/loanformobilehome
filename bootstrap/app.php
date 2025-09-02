<?php

use App\Http\Middleware\CustomTrimStrings;
use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\SetLocale;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->alias([
            'custom.trim' => CustomTrimStrings::class,
        ]);
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->replace(
            \Illuminate\Foundation\Http\Middleware\TrimStrings::class,
            CustomTrimStrings::class
        );

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
            SetLocale::class,
            \App\Http\Middleware\ShareContactDetails::class,
            \App\Http\Middleware\LogVisit::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
