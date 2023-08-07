<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Http;
use GuzzleHttp\Psr7\Request;

class Blueprint extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'bp_id',
        'title',
        'description',
        'brand',
        'model',
        'images',
        'category_id',
        'filters',
        'print_providers'
    ];
    protected $casts = [
        'images' => 'array',
        'filters' => 'json',
        'print_providers' => 'json'
    ];

    protected $appends = [
        "rating"
    ];

    public function ratings() {
        return $this->hasMany(Rating::class, "bp_id");
    }

    public function getRatingAttribute() {
        return $this->ratings()->where("isApproved", true)->avg("star_rating");
    }

    public function getPrintProvidersAttribute() { //internal
        return $this->hasMany(Provider::class, 'blueprint_id');
    }

    public function fetchProviders() { //external
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('PRINTIFY_APIKEY'),
        ])->get('https://api.printify.com/v1/catalog/blueprints/' . $this->bp_id . '/print_providers.json');

        if($response->successful())
            return $response->json();

        return false;
    }

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
        return $filters_resolved;
    }

    public function category() {
        return $this->belongsTo(Category::class, 'category_id');
    }
}
