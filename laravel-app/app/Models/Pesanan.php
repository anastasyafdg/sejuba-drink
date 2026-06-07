<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pesanan extends Model
{
    protected $table = 'pesanan';

    protected $primaryKey = 'id_pesanan';

    protected $fillable = [

        'id_pembeli',
        'tanggal_pesanan',
        'total_harga',
        'alamat_pengiriman',
        'status_pembayaran',
        'status_pesanan'
    ];

    public function detailPesanan()
    {
        return $this->hasMany(
            DetailPesanan::class,
            'id_pesanan',
            'id_pesanan'
        );
    }
}