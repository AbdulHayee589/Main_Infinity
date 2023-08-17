<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'bp_id',
        'provider_id',
        'variant_id',
        'shipping_id',
        'billing_id'
    ];

    protected $hidden = [
        'user_id',
        'bp_id',
        'shipping_id',
        'billing_id',
        'provider_id',
        'variant_id'
    ];

    protected $appends = [
        'variant'
    ];

    protected $with = [
        'blueprint',
        'provider',
        'billing_address',
        'shipping_address',
        'billing_address',
    ];

    public function user() {
        return $this->belongsTo(User::class, "user_id");
    }

    public function blueprint() {
        return $this->belongsTo(Blueprint::class, "bp_id");
    }

    public function getVariantAttribute() {
        return Arr::where($this->provider()->first()['variants']['variants'], function($value, $key) {
            return $value['id'] == $this->variant_id;
        });
    }

    public function provider() {
        return $this->belongsTo(Provider::class, "provider_id");
    }

    public function shipping_address() {
        return $this->belongsTo(ShippingBook::class, "shipping_id");
    }

    public function billing_address() {
        return $this->belongsTo(ShippingBook::class, "billing_id");
    }
}
