<?php

namespace App\Http\Controllers\Orders;

use App\Http\Controllers\Controller;
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

    //TODO: CREATE ORDER
    //TODO: PROCESS PAYMENT
}
