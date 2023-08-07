<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get("sign-up", [\App\Http\Controllers\Auth\RegisterController::class, "create"])->name('signup');
    Route::post("sign-up", [\App\Http\Controllers\Auth\RegisterController::class, "store"]);

    Route::get("sign-in", [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, "create"])->name('login');
    Route::post("sign-in", [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, "store"]);

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
        ->name('password.update');

    Route::prefix('oauth')->group(function () {
        //Handle oauth webhooks
        Route::get("/{oauth}", [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'oauth']);

        //Handle oauth login requests && redirect them to provider
        Route::get("/make/{oauth}", [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'oauth_redirect']);
    });

});

Route::middleware('auth')->group(function () {
    Route::get('verify-email', [EmailVerificationPromptController::class, '__invoke'])
        ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', [VerifyEmailController::class, '__invoke'])
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:1,0.5')
        ->name('verification.send');

    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
        ->name('password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::get('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});
