<?php

namespace App\Http\Controllers\Blueprints;

use App\Http\Controllers\Controller;
use App\Models\Blueprint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class BlueprintsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        # @ddimitrov1108
        return Inertia::render('public/shop/ProductsPage', [
            'blueprints' => Blueprint::all(), //категории по нататък
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $bp = Blueprint::find($id);
        if(!$bp)
            return back()->withErrors([
                "errors" => trans("blueprints.not_found")
            ]);

        # @ddimitrov1108
        return Inertia::render('тук сложи страницата където се показва самия продукт', [
            'blueprints' => Blueprint::all(), //категории по нататък
        ]);
    }

    /**
     * Fetch variants by blueprint & provider
     */

    public function variants(string $blueprintId, string $providerId) {
        $bp = Blueprint::find($blueprintId);
        if(!$bp)
            return back()->withErrors([
                "errors" => trans("blueprints.not_found")
            ]);

        $variants = $bp->getVariantsOfProvider($providerId);

        # @ddimitrov1108
        return Inertia::render('тук сложи страницата където се показва самия продукт', [
            'variants' => $variants,
        ]);
    }

    /**
     * Fetch providers by blueprint
     */

    public function providers(string $blueprintId) {
        $bp = Blueprint::find($blueprintId);
        if(!$bp)
            return back()->withErrors([
                "errors" => trans("blueprints.not_found")
            ]);

        # @ddimitrov1108
        return Inertia::render('тук сложи страницата където се показва самия продукт', [
            'providers' => $bp->print_providers,
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
