<?php

namespace App\Http\Controllers\Blueprints;

use App\Http\Controllers\Controller;
use App\Models\Blueprint;
use App\Models\Category;
use App\Models\Rating;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
            'filters' => 'nullable|array',
            'filters.*' => 'array',
            'filters.*.*' => 'string',
        ]);

        $searchTerm = $request->query('search');
        $filters = $request->input('filters');

        if ($validator->fails())
            return redirect()->back()->withErrors($validator->errors())->withInput();

        $catId = $request->query('category');

        $blueprints = Blueprint::query();
        if ($catId !== null) {
            $categoryIds = DB::table('categories')
                ->where('id', $catId)
                ->orWhereRaw('parent_id IN (
            WITH RECURSIVE category_tree AS (
                SELECT id, parent_id FROM categories WHERE id = ?
                UNION ALL
                SELECT c.id, c.parent_id FROM categories c JOIN category_tree ct ON c.parent_id = ct.id
            )
            SELECT id FROM category_tree
        )', [$catId])
                ->pluck('id');

            $blueprints->whereIn('category_id', $categoryIds);
        }

        if ($searchTerm !== null) {
            $blueprints->where(function ($query) use ($searchTerm) {
                $query->where('title', 'like', '%' . $searchTerm . '%')
                    ->orWhere('description', 'like', '%' . $searchTerm . '%');
            });
        }

        if (!empty($filters)) {
            $blueprints->where(function ($query) use ($filters) {
                foreach ($filters as $key => $filter) {
                    foreach ($filter as $value) {
                        $query->whereJsonContains('filters->' . $key, $value);
                    }
                }
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

    public function store(Request $request) //apply filters
    {
        return $this->index($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $bp = Blueprint::where('id', $id)->with("ratings")->first();

        if(!$bp)
            return back()->withErrors([
                "errors" => trans("blueprints.not_found")
            ]);

        $providers = $bp->print_providers->get();


        return Inertia::render('public/shop/ProductDetailsPage', [
            'blueprints' => $bp,
            'providers' => $providers,
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

        return Inertia::render('public/shop/ProductDetailsPage', [
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

        return Inertia::render('public/shop/ProductDetailsPage', [
            'providers' => $bp->getPrintProviders()
        ]);
    }

    public function rate(string $id, Request $request) {
        //TODO uncomment after frontend part is done
//        $user = Auth::user();
//        if(!$user)
//            return back()->withErrors([
//                "errors" => trans("blueprints.rating_guest")
//            ]);

        $bp = Blueprint::find($id);
        if(!$bp)
            return back()->withErrors([
                "errors" => trans("blueprints.not_found")
            ]);

        //TODO uncomment after frontend part is done
//        $user_rating = Rating::where('bp_id', $bp->id)
//            ->where('by_id', $user->id)
//            ->exists();
//
//        if($user_rating)
//            return back()->withErrors([
//                "errors" => trans("blueprints.rating_exists")
//            ]);

        $rating = $request->get("rating");
        if(!$rating || is_nan($rating) || $rating < 1 || $rating > 5)
            return back()->withErrors([
                "errors" => trans("blueprints.rating_invalid")
            ]);

        $rating_msg = $request->get("message");
        if(strlen($rating_msg) > 100)
            return back()->withErrors([
                "errors" => trans("blueprints.rating_toolong")
            ]);

        $rating = Rating::create([
            "isMockup" => false,
            "bp_id" => $bp->id,
            "by_id" => 1, //TODO replace with $user->id after frontend part is done
            "star_rating" => $rating,
            "message" => $rating_msg
        ]);

        $rating->save();
        return $this->show($id);
    }

    public function editor($id, $provider) {
        $bp = Blueprint::find($id);
        if(!$bp)
            return back()->withErrors([
                "errors" => trans("blueprints.not_found")
            ]);

        $provider = $bp->print_providers->where('internal_id', $provider)->first();

        if(!$provider)
            return back()->withErrors([
                "errors" => trans("blueprints.not_found")
            ]);

        return Inertia::render('public/shop/ProductEditor', [
            'blueprint' => $bp,
            'provider' => $provider
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
