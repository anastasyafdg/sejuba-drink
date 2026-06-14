<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Pembeli;

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

    public function pembeli()
{
    return $this->belongsTo(
        Pembeli::class,
        'id_pembeli',
        'id_pembeli'
    );
}

    public function bayar($id)
{
    $pesanan = Pesanan::findOrFail($id);

    $pesanan->update([
        'status_pembayaran' => 'Berhasil',
        'status_pesanan' => 'Diproses'
    ]);

    return response()->json([
        'success' => true,
        'message' => 'Pembayaran berhasil'
    ]);
}
}