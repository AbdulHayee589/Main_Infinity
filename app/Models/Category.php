<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    public static function all($columns = ['*'])
    {
        $categories = parent::all($columns);
        $translatedCategories = $categories->map(function ($category) {
            $category->name = __('categories.' . $category->name);
            return $category;
        });

        return $translatedCategories;
    }
}
