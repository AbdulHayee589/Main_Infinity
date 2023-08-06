<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Http\Requests\Addresses\CreateAddress;
use App\Models\ShippingBook;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    public function index() {
        // TODO: REMOVE IN PRODUCTION
        //$user = Auth::user();
        $user = User::find(1)->with(["shippingAddress", "billingAddress", "addresses"])->get();
        return response()->json($user);
    }


    public function addresses() {
        // TODO: REMOVE IN PRODUCTION
        //$user = Auth::user();
        $user = User::find(1);
        return response()->json($user->addresses);
    }

    public function changeMainShippingAddy($id) {
        // TODO: REMOVE IN PRODUCTION
        //$user = Auth::user();
        $user = User::find(1);
        $addy = ShippingBook::where(['id' => $id, 'user_id' => $user->id])->first();

        if(!$addy)
            return response()->json(["status" => false, "message" => trans('addresses.invalid_address')]);

        $user->shippingAddressId = $id;
        $user->save();
        return response()->json($addy);
    }

    public function changeMainBillingAddy($id) {
        // TODO: REMOVE IN PRODUCTION
        //$user = Auth::user();
        $user = User::find(1);
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
        // TODO: REMOVE IN PRODUCTION
        //$user = Auth::user();
        $user = User::find(1);
        $addy = ShippingBook::where(['id' => $id, 'user_id' => $user->id])->first();

        if(!$addy)
            return response()->json(["status" => false, "message" => trans('addresses.invalid_address')]);

        $addy->delete();
    }
}
