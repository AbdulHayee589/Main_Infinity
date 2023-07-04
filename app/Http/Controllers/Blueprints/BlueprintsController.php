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
        ]);

        if ($validator->fails())
            return redirect()->back()->withErrors($validator->errors())->withInput();

        $catId = $request->query('category');

        $blueprints = Blueprint::query();
        if($catId !== null)
            $blueprints->where( 'category_id', $catId);

        $blueprints = $blueprints->paginate(25);

        # @ddimitrov1108
        return Inertia::render('public/shop/ProductsPage', [
            'blueprints' => $blueprints,
            'lastPage' => $blueprints->lastPage(),
            'categories' => Category::all(),
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

        if(!$bp)
            return back()->withErrors([
                "errors" => trans("blueprints.not_found")
            ]);

        # @ddimitrov1108
        return Inertia::render('public/Shop/ProductsDetailPage', [
            'blueprints' => $bp,
            'providers' => $providers,
            'variants' => Inertia::lazy(fn () => $this->variants($id, $provider))
        ]);
    }

    /**
     * Fetch variants by blueprint & provider
     */

    public function variants($blueprintId, $providerId) {
        if($providerId === null) return null;

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
