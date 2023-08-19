<?php

namespace App\Http\Controllers\Media;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class MediaController extends Controller
{
    public function store(Request $request) {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $imageName = time().Str::random(9). '.'.$request->image->extension();
        $request->image->move(public_path('mockups'), $imageName);

        return response()->json([
            "url" => env("APP_URL") . '/mockups/' . $imageName
        ]);
    }
}
