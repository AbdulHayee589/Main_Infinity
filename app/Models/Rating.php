<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    use HasFactory;

    protected $fillable = [
        "isMockup",
        "star_rating",
        "message",
        "isApproved",
        "bp_id",
        "mc_id",
        "by_id"
    ];

    protected $hidden = [
        "bp_id",
        "mc_id",
        "by_id"
    ];

    protected $appends = [
      "user"
    ];

    public function user() {
        return $this->belongsTo(User::class, "by_id");
    }

    public function getUserAttribute() {
        return $this->user()->name;
    }

    public function product() {
        if($this->isMockup)
            return $this->belongsTo(Mockup::class, "mc_id");

        return $this->belongsTo(Blueprint::class, "bp_id");
    }
}
