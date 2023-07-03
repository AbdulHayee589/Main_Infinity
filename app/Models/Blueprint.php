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
        'print_providers'
    ];

    protected $attributes = [
        'print_providers' => null
    ];

    protected $casts = [
        'images' => 'json'
    ];

    public function getPrintProvidersAttribute() {
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
}
