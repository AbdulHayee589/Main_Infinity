<?php

namespace App\Http\Controllers\Blueprints;

use App\Http\Controllers\Controller;
use App\Models\Blueprint;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class BlueprintsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $validator = Validator::make($request->query(), [
            'category' => 'nullable|integer|exists:categories,id',
            'page' => 'nullable|integer',
            'search' => 'nullable|string',
        ]);

        $searchTerm = $request->query('search');


        if ($validator->fails())
            return redirect()->back()->withErrors($validator->errors())->withInput();

        $catId = $request->query('category');

        $blueprints = Blueprint::query();
        if($catId !== null)
            $blueprints->where( 'category_id', $catId);

        if ($searchTerm !== null) {
            $blueprints->where(function ($query) use ($searchTerm) {
                $query->where('title', 'like', '%' . $searchTerm . '%')
                    ->orWhere('description', 'like', '%' . $searchTerm . '%');
            });
        }

        $blueprints = $blueprints->paginate(25);

        return Inertia::render('public/shop/ProductsPage', [
            'blueprints' => $blueprints,
            'lastPage' => $blueprints->lastPage(),
            'filters' => Blueprint::filters(),
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
    public function show(Request $request, string $id)
    {
        $bp = Blueprint::find($id);
        if(!$bp)
            return back()->withErrors([
                "errors" => trans("blueprints.not_found")
            ]);

        $providers = $bp->getPrintProviders();
        $provider = null;
        if($request->query("provider")) {
            $id = $request->query("provider");
            $exists = array_filter($providers, function ($p) use ($id) {
                if(strval($p['id']) === $id) return true;
                return false;
            });

            if(count($exists) === 1)
                $provider = $request->query("provider");
        }

        return Inertia::render('public/shop/ProductsDetailPage', [
            'blueprints' => $bp,
            'providers' => $providers,
            'variants' => Inertia::lazy(fn () => $this->variants($id, $provider))
        ]);
    }

    /**
     * Fetch variants by blueprint & provider
     */

    // fallback if above doesnt work
    public function variants($blueprintId, $providerId) {
        if($providerId === null) return null;

        $bp = Blueprint::find($blueprintId);
        if(!$bp)
            return back()->withErrors([
                "errors" => trans("blueprints.not_found")
            ]);

        $variants = $bp->getVariantsOfProvider($providerId);

        return Inertia::render('public/shop/ProductsDetailPage', [
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
        return Inertia::render('public/shop/ProductsDetailPage', [
            'providers' => $bp->getPrintProviders()
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
