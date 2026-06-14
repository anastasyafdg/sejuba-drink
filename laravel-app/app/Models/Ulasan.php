<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ulasan extends Model
{
    protected $table = 'ulasan';

    protected $primaryKey = 'id_ulasan';

    protected $fillable = [
        'id_pembeli',
        'id_produk',
        'rating',
        'ulasan'
    ];

    public function pembeli()
    {
        return $this->belongsTo(
            Pembeli::class,
            'id_pembeli',
            'id_pembeli'
        );
    }

    public function produk()
    {
        return $this->belongsTo(
            Product::class,
            'id_produk',
            'id'
        );
    }
}