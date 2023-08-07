<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mockup extends Model
{
    use HasFactory;

    protected $fillable = [
        'pp_id',
        'bp_id',
        'user_id',
        'v_id',
        'title',
        'description',
        'print_areas',
        'isActive'
    ];

    protected $casts = [
        'print_areas' => 'json',
        'isActive' => 'boolean'
    ];

    protected $appends = [
        "rating"
    ];

    public function user() {
        return $this->belongsTo(User::class, "user_id");
    }

    public function blueprint() {
        return $this->belongsTo(Blueprint::class, 'bp_id');
    }

    public function ratings() {
        return $this->hasMany(Rating::class, "mc_id");
    }

    public function getRatingAttribute() {
        return $this->ratings()->where("isApproved", true)->avg("star_rating");
    }


}
