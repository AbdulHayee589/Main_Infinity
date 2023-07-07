<?php

namespace App\Http\Controllers\Orders;

use App\Http\Controllers\Controller;
use App\Http\Requests\Mockups\NewMockupRequest;
use App\Models\Mockup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MockupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        return Inertia::render("страницата, в която потребителя вижда своите мокъпи", [
            'mockup' => $user->mockups
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // хендълва се от блупринт контролера
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(NewMockupRequest $request) {
        try {
            $mockup = $request->createMockup();
            dd($mockup);
        } catch(\Exception $ex) {
            dd($ex);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $mockup = Mockup::find($id);
        $user = Auth::user();
        if(!$mockup)
            return back()->withErrors(["message" => trans("mockups.not_found")])->withInput();

        if($mockup->user->id != $user->id)
            return back()->withErrors(["message" => trans("mockups.not_found")])->withInput();

        return Inertia::render("страницата, в която потребителя вижда? своя мокъп", [
            'mockup' => $mockup
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $mockup = Mockup::find($id);
        $user = Auth::user();
        if(!$mockup)
            return back()->withErrors(["message" => trans("mockups.not_found")])->withInput();

        if($mockup->user->id != $user->id)
            return back()->withErrors(["message" => trans("mockups.not_found")])->withInput();

        return Inertia::render("страницата, в която потребителя променя своя мокъп", [
            'mockup' => $mockup
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $mockup = Mockup::find($id);
        $user = Auth::user();
        if(!$mockup)
            return back()->withErrors(["message" => trans("mockups.not_found")])->withInput();

        if($mockup->user->id != $user->id)
            return back()->withErrors(["message" => trans("mockups.not_found")])->withInput();

        $validatedData = $request->validate([
            'id' => 'prohibited',
            'bp_id' => 'prohibited',
            'user_id' => 'prohibited',
            'pp_id' => 'prohibited',
            'v_id' => 'prohibited',
            'created_at' => 'prohibited',
            'updated_at' => 'prohibited',
            'title' => 'sometimes|string|max:60|min:5',
            'description' => 'sometimes|string|max:255|min:5',
            'isActive' => 'sometimes|boolean'
        ]);

        $mockup->update($validatedData);

        return Inertia::render("страницата, в която потребителя променя своя мокъп", [
            'mockup' => $mockup
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $mockup = Mockup::find($id);
        $user = Auth::user();
        if(!$mockup)
            return back()->withErrors(["message" => trans("mockups.not_found")])->withInput();

        if($mockup->user->id != $user->id)
            return back()->withErrors(["message" => trans("mockups.not_found")])->withInput();

        $mockup->delete();

        return back()->withInput(["message" => "mockups.destroy_success"]);
    }
}
