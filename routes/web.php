<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

// We are going to use this class to render React components

Route::inertia('/', 'public/Test');

Route::inertia('/how-it-works', 'public/HowItWorksPage');
Route::inertia('/policy/terms-and-conditions', 'policy/TermsAndConditionsPage');
Route::inertia('/policy/refund', 'policy/RefundPage');
Route::inertia('/policy/privacy', 'policy/PrivacyPage');


//Shop
Route::prefix('shop')->group(function() {
    //Mockups
    Route::resource("/mockups", \App\Http\Controllers\Orders\MockupController::class);

    //Shopping Cart
    Route::get("/cart", [\App\Http\Controllers\Orders\ShoppingCartController::class, 'index']);
    Route::post("/cart", [\App\Http\Controllers\Orders\ShoppingCartController::class, 'store']);
    Route::post("/cart/update", [\App\Http\Controllers\Orders\ShoppingCartController::class, 'update']);
    Route::post("/cart/remove", [\App\Http\Controllers\Orders\ShoppingCartController::class, 'destroy']);

    //Products
    Route::resource("products", \App\Http\Controllers\Blueprints\BlueprintsController::class);
    Route::get("products/{id}/{provider}/variants", [\App\Http\Controllers\Blueprints\BlueprintsController::class, "variants"]);
    Route::get("products/{id}/providers", [\App\Http\Controllers\Blueprints\BlueprintsController::class, "providers"]);
    Route::get("products/{id}/{provider}/editor", [\App\Http\Controllers\Blueprints\BlueprintsController::class, "editor"]);
    Route::post("products/{id}/rate", [\App\Http\Controllers\Blueprints\BlueprintsController::class, "rate"]);
});

//User
Route::prefix('user')->group(function () {
    Route::get("/", [\App\Http\Controllers\Users\UserController::class, "index"]);
    Route::get("/addresses", [\App\Http\Controllers\Users\UserController::class, "addresses"]);
    Route::post("/addresses", [\App\Http\Controllers\Users\UserController::class, "createAddy"]);
    Route::delete("/addresses/{id}", [\App\Http\Controllers\Users\UserController::class, "removeAddy"]);

    Route::post("/addresses/shipping/{id}", [\App\Http\Controllers\Users\UserController::class, "changeMainShippingAddy"]);
    Route::post("/addresses/billing/{id}", [\App\Http\Controllers\Users\UserController::class, "changeMainBillingAddy"]);
});

//Authentication
Route::prefix('auth')->group(function () {
    Route::post("/login", [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, "store"]);
    Route::get("/login", [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, "create"]);
    Route::post("/logout", [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, "destroy"]);

    Route::post("/signup", [\App\Http\Controllers\Auth\RegisterController::class, "store"]);
    Route::get("/signup", [\App\Http\Controllers\Auth\RegisterController::class, "create"]);
});


//oAuth Webhooks
Route::prefix('oauth')->group(function () {
    //Handle oauth webhooks
    Route::get("/{oauth}", [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'oauth']);

    //Handle oauth login requests && redirect them to provider
    Route::get("/make/{oauth}", [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'oauth_redirect']);
});

Route::fallback(function () {
    return Inertia::render('NotFound');
});
