<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'dateOfBirth',
        'gender',
        'email',
        'password',
        'oauth'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'billingAddressId',
        'shippingAddressId',
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function mockups() {
        return $this->hasMany(Mockup::class);
    }

    public function addresses() {
        return $this->hasMany(ShippingBook::class, 'user_id');
    }

    public function shippingAddress() {
        return $this->hasOne(ShippingBook::class, 'id', 'shippingAddressId');
    }

    public function billingAddress() {
        return $this->hasOne(ShippingBook::class, 'id', 'billingAddressId');
    }
}
