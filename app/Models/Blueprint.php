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
        $filters_resolved = [];
        foreach($bps as $bp) {
            $filters = $bp->filters;
            if(!$filters) continue;

            foreach($filters as $key => $value) {
                if(isset($filters_resolved[$key]) && gettype($filters_resolved[$key]) == 'array') {
                    if(!in_array($value, $filters_resolved[$key])) {
                        $filters_resolved[$key][] = $value;
                    }
                } else {
                    $filters_resolved[$key][] = $value;
                }
            }
        }

        $translated = [];
        foreach($filters_resolved as $key => $value) {
            $translated[trans("filters.".$key)] = $value;
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
