<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pesanan;
use App\Models\DetailPesanan;
use Illuminate\Http\Request;

class PesananController extends Controller
{
    public function index()
{
    $pesanan = Pesanan::with(
        'pembeli',
        'detailPesanan.produk'
    )
    ->orderBy('id_pesanan', 'desc')
    ->get();

    return response()->json([
        'success' => true,
        'data' => $pesanan
    ]);
}

    public function store(Request $request)
    {
        $request->validate([
            'id_pembeli' => 'required',
            'alamat_pengiriman' => 'required',
            'items' => 'required|array'
        ]);

        $totalHarga = 0;

        foreach ($request->items as $item) {
            $totalHarga += $item['price'] * $item['qty'];
        }

        $pesanan = Pesanan::create([
            'id_pembeli' => $request->id_pembeli,
            'tanggal_pesanan' => now(),
            'total_harga' => $totalHarga,
            'alamat_pengiriman' => $request->alamat_pengiriman,
            'status_pembayaran' => 'Menunggu Pembayaran',
            'status_pesanan' => 'Menunggu Konfirmasi',
        ]);

        foreach ($request->items as $item) {
            if (empty($item['id'])) {
                return response()->json([
                    'success' => false,
                    'message' => 'ID produk tidak valid pada item: ' . ($item['name'] ?? 'unknown'),
                ], 422);
            }

            DetailPesanan::create([
                'id_pesanan' => $pesanan->id_pesanan,
                'id_produk' => $item['id'],
                'ukuran' => $item['size'] ?? '-', 
                'jumlah' => $item['qty'],
                'harga_satuan' => $item['price'],
                'subtotal' => $item['price'] * $item['qty'],
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Pesanan berhasil dibuat',
            'data' => $pesanan
        ]);
    }

    public function bayar($id)
{
    $pesanan = Pesanan::find($id);

    if (!$pesanan) {
        return response()->json([
            'success' => false,
            'message' => 'Pesanan tidak ditemukan'
        ], 404);
    }

    $pesanan->status_pembayaran = 'Lunas';
    $pesanan->status_pesanan = 'Diproses';
    $pesanan->save();

    return response()->json([
        'success' => true,
        'message' => 'Pembayaran berhasil',
        'data' => $pesanan
    ]);
}  

public function show($id)
{
    $pesanan = Pesanan::with(
    'detailPesanan.produk'
)->find($id); 

    if (!$pesanan) {
        return response()->json([
            'success' => false,
            'message' => 'Pesanan tidak ditemukan'
        ], 404);
    }

    return response()->json([
        'success' => true,
        'data' => $pesanan
    ]);
}

public function riwayatPembeli($id)
{
    $pesanan = Pesanan::with('detailPesanan.produk') 
    ->where('id_pembeli', $id)
    ->orderBy('id_pesanan', 'desc')
    ->get();

    return response()->json([
        'success' => true,
        'data' => $pesanan
    ]);
}

public function updateStatus(Request $request, $id)
{
    $pesanan = Pesanan::find($id);

    if (!$pesanan) {
        return response()->json([
            'success' => false,
            'message' => 'Pesanan tidak ditemukan'
        ], 404);
    }

    $pesanan->status_pesanan =
        $request->input('status_pesanan');

    $pesanan->save();

    return response()->json([
        'success' => true,
        'message' => 'Status berhasil diperbarui',
        'data' => $pesanan
    ]);
}
}