<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShippingBook extends Model
{
    use HasFactory;

    protected $table = "address_books";

    protected $fillable = [
        'first_name',
        'last_name',
        'phone_number',
        'address',
        'city',
        'country',
        'zip_code',
        'is_company',
        'company_name',
        'EIK',
        'DDS',
        'MOL',
        'user_id'
    ];

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }
}
