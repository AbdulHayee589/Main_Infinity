<?php

namespace App\Http\Controllers\Orders;

use App\Http\Controllers\Controller;
use App\Models\Blueprint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use App\Services\CartService;

class ShoppingCartController extends Controller
{


    public function __construct()
    {

    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cart = CartService::getCart();

        # @ddimitrov1108
        return Inertia::render('тук сложи страницата където се показва кошницата')->with([
           'cart' => $cart
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'mockupId' => 'required|exists:mockups,id',
            'quantity' => 'required|min:1'
        ]);

        if ($validator->fails())
            return redirect()->back()->withErrors($validator->errors())->withInput();

        $mockupId = $request->input('mockupId');
        $quantity = $request->input('quantity');
        $cart = CartService::addToCart($mockupId, $quantity);

        return response()->json($cart);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $mId)
    {
        $validator = Validator::make($request->all(), [
            'mockupId' => 'required|exists:mockups,id',
            'quantity' => 'required|min:1'
        ]);

        if ($validator->fails())
            return redirect()->back()->withErrors($validator->errors())->withInput();

        $mockupId = $request->input('mockupId');
        $quantity = $request->input('quantity');
        $cart = CartService::updateQuantity($mockupId, $quantity);

        return response()->json($cart);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'mockupId' => 'required|exists:mockups,id',
        ]);

        if ($validator->fails())
            return redirect()->back()->withErrors($validator->errors())->withInput();

        $mockupId = $request->input('mockupId');
        $cart = CartService::removeFromCart($mockupId);

        return response()->json($cart);
    }
}
