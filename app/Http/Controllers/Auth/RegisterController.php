<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use function Symfony\Component\Translation\t;

class RegisterController extends Controller
{
    /**
     * Display the registration view.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('auth/SignUpPage');
    }


    public function store(RegisterRequest $request)
    {
        try {
            $request->register();
        } catch(ValidationException $ex) {
            return back()->withErrors($ex->errors());
        }

        $request->session()->regenerate();

        // TODO
        // @ddimitrov1108
        return Inertia::render('public/Test');
    }
}
