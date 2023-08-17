<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Http\Requests\Addresses\CreateAddress;
use App\Models\ShippingBook;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index() {
        $user = Auth::user();

        return Inertia::render('user/ProfilePage', [
            'user' => $user,
            'mockups' => $user->mockups
        ]);
    }


    public function addresses() {
        $user = Auth::user();
        return response()->json($user->addresses);
    }

    public function changeMainShippingAddy($id) {
        $user = Auth::user();
        $addy = ShippingBook::where(['id' => $id, 'user_id' => $user->id])->first();

        if(!$addy)
            return response()->json(["status" => false, "message" => trans('addresses.invalid_address')]);

        $user->shippingAddressId = $id;
        $user->save();
        return response()->json($addy);
    }

    public function changeMainBillingAddy($id) {
        $user = Auth::user();
        $addy = ShippingBook::where(['id' => $id, 'user_id' => $user->id])->first();

        if(!$addy)
            return response()->json(["status" => false, "message" => trans('addresses.invalid_address')]);

        $user->billingAddressId = $id;
        $user->save();
        return response()->json($addy);
    }

    public function createAddy(CreateAddress $request) {
        try {
            return $request->createAddy();
        } catch(ValidationException $ex) {
            return back()->withErrors($ex->errors())->withInput();
        }
    }

    public function removeAddy($id)
    {
        $user = Auth::user();
        $addy = ShippingBook::where(['id' => $id, 'user_id' => $user->id])->first();

        if(!$addy)
            return response()->json(["status" => false, "message" => trans('addresses.invalid_address')]);

        $addy->delete();
    }
}
