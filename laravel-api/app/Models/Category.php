<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Product;

class Category extends Model
{
  protected $fillable = [
    "id",
    "name",
    "description",
    "status",
    "parent_id"
  ];

  // One Category has many Products
  public function products()
  {
    return $this->hasMany(Product::class);
  }

}
