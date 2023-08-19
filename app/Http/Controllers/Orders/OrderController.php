<?php

namespace App\Http\Controllers\Orders;

use App\Http\Controllers\Controller;
use App\Http\Requests\Orders\CreateOrder;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index() {

    }

    public function show($id) {
        //TODO: GET ORDER STATUS DIRECTLY FROM PRINTIFY
        $order = Order::find($id);
        return response()->json($order);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateOrder $request) {
        try {
            $order = $request->makeOrder();
            return response()->json($order);
        } catch(\Exception $ex) {
            return back()->withErrors($ex);
        }
    }

    //TODO: PROCESS PAYMENT
}
