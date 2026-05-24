<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [

        'name',
        'category',
        'image',
        'status',
        'bg_color',

        'price_50',
        'stock_50',

        'price_100',
        'stock_100',

        'price_250',
        'stock_250',
    ];
}