<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;

class Provider extends Model
{
    use HasFactory;

    protected $fillable = [
        'blueprint_id',
        'internal_id',
        'title',
        'variants'
    ];

    protected $casts = [
        'variants' => 'json'
    ];

    public function variants() {
        return $this->getAttribute('variants')['variants'];
    }

    public function variant($id) {
        return Arr::first($this->variants(), function($value, $key) use ($id) {
            return $value['id'] == $id;
        });
    }
}
