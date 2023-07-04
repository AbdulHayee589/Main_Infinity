<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Http;

class Blueprint extends Model
{
    use HasFactory;
    protected $fillable = [
        'bp_id',
        'title',
        'description',
        'brand',
        'model',
        'images',
        'category_id',
        'filters'
    ];

    protected $casts = [
        'images' => 'json',
        'filters' => 'json'
    ];

    public static function filters() {
        $bps = self::all();
        $filters = [];
        foreach($bps as $bp) {
            $meta = $bp->filters;
            if(!$meta) continue;

            foreach(array_keys($meta) as $filter) {
                if(!array_search($filter, $filters))
                    $filters[] = $filter;
            }
        }

        $translated = [];
        foreach($filters as $filter) {
            $translated[] = trans("filters.".$filter);
        }

        return $translated;
    }

    public function getPrintProviders() {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('PRINTIFY_APIKEY'),
        ])->get('https://api.printify.com//v1/catalog/blueprints/'.$this->bp_id.'/print_providers.json');

        if($response->successful())
            return $response->json();

        return null;
    }

    public function getVariantsOfProvider($provider) {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('PRINTIFY_APIKEY'),
        ])->get('https://api.printify.com//v1/catalog/blueprints/'.$this->bp_id.'/print_providers/'.$provider.'/variants.json');

        if($response->successful())
            return $response->json();

        return null;
    }

    public function category() {
        return $this->belongsTo(Category::class, 'category_id');
    }
}
