<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

// We are going to use this class to render React components

Route::inertia('/', 'HomePage');

Route::inertia('/how-it-works', 'HowItWorksPage');
Route::inertia('/policy/terms-and-conditions', 'policy/TermsAndConditionsPage');
Route::inertia('/policy/refund', 'policy/RefundPage');
Route::inertia('/policy/privacy', 'policy/PrivacyPage');


//Orders
Route::prefix('orders')->group(function () {
    Route::get("/", [\App\Http\Controllers\Orders\OrderController::class, 'index']);
    Route::get("/{id}", [\App\Http\Controllers\Orders\OrderController::class, 'show']);
});

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
})->middleware("auth");



Route::fallback(function () {
    return Inertia::render('NotFound');
});

require __DIR__.'/auth.php';
