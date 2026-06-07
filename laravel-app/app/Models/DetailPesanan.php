<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Product; 

class DetailPesanan extends Model
{
    protected $table = 'detail_pesanan';

    protected $primaryKey = 'id_detail';

    protected $fillable = [

        'id_pesanan',
        'id_produk',
        'ukuran',
        'jumlah',
        'harga_satuan',
        'subtotal'
    ];

    public function pesanan()
    {
        return $this->belongsTo(
            Pesanan::class,
            'id_pesanan',
            'id_pesanan'
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