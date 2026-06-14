<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pembeli;

class PembeliController extends Controller
{
    public function index()
    {
        $pembeli = Pembeli::withCount('pesanan')
            ->orderBy('id_pembeli', 'asc')
            ->get()
            ->map(function ($p) {
                return [
                    'id'            => $p->id_pembeli,
                    'nama'          => $p->nama_pembeli,
                    'email'         => $p->email,
                    'no_telepon'    => $p->no_telepon,
                    'total_pesanan' => $p->pesanan_count,
                ];
            });

        return response()->json([
            'success' => true,
            'data'    => $pembeli,
        ]);
    }
}
