<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Login;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;
use Stevebauman\Location\Facades\Location;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('auth/SignInPage', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    public function store(LoginRequest $request)
    {
        try {
            $request->authenticate();
        } catch(ValidationException $ex) {
            return back()->withErrors($ex->errors())->withInput();
        }

        $request->session()->regenerate();

        // TODO
        // @ddimitrov1108
        return Inertia::render('public/Test');
    }

    /**
     * Destroy an authenticated session.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();
    }

    public function oauth(string $provider) {
        try {
            $oUser = Socialite::driver($provider)->user();
        } catch(\Exception $ex) {
            return back()->withErrors(["message" => trans("auth.oauth_failed")])->withInput();
        }

        $user = User::firstOrCreate([
            'email' => $oUser->getEmail(),
        ], [
            'name' => $oUser->getName(),
        ]);

        Auth::login($user);

        // TODO
        // @ddimitrov1108
        return Inertia::render('public/Test');
    }

    public function oauth_redirect(string $provider) {
        try {
            return Socialite::driver($provider)->redirect();
        } catch(\Exception $ex) {
            return response()->json(["message" => trans("auth.oauth_unsupported")]);
        }
    }

}
