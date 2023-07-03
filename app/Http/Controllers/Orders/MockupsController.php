<?php

namespace App\Http\Controllers\Orders;

use App\Http\Controllers\Controller;
use App\Http\Requests\Mockups\NewMockupRequest;
use Illuminate\Http\Request;

class MockupsController extends Controller
{
    public function store(NewMockupRequest $request) {
        try {
            $mockup = $request->createMockup();
        } catch(\Exception $ex) {
            dd($ex);
        }
    }
}
