<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia; // We are going to use this class to render React components

Route::get('/', function () {
    return Inertia::render('Test'); // This will get component Test.jsx from the resources/js/Pages/Test.jsx
});

Route::inertia('/sign-in', 'auth/SignInPage');
Route::inertia('/sign-up', 'auth/SignUpPage');

Route::inertia('/how-it-works', 'HowItWorksPage');
Route::inertia('/policy/terms-and-conditions', 'policy/TermsAndConditionsPage');
Route::inertia('/policy/refund', 'policy/RefundPage');
Route::inertia('/policy/privacy', 'policy/PrivacyPage');