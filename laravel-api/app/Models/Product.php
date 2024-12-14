<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
use App\Models\Brand;

class Product extends Model
{
    protected $fillable = [
        'category_id',
        'brand_id',
        'product_name',
        'description',
        'quantity',
        'price',
        'discount',
        'image',
        'status',
        'wishlist',
    ];

    public function categories()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function brands()
    {
        return $this->belongsTo(Brand::class, 'brand_id');
    }


}
