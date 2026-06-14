<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ulasan;
use Illuminate\Http\Request;

class UlasanController extends Controller
{
    public function index()
    {
        $ulasan = Ulasan::with([
            'pembeli',
            'produk'
        ])->latest()->get();

        return response()->json([
            'success' => true,
            'data' => $ulasan
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'id_pembeli' => 'required',
            'id_produk' => 'required',
            'rating' => 'required|integer|min:1|max:5',
            'ulasan' => 'required'
        ]);

        $ulasan = Ulasan::create([
            'id_pembeli' => $request->id_pembeli,
            'id_produk' => $request->id_produk,
            'rating' => $request->rating,
            'ulasan' => $request->ulasan,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Ulasan berhasil ditambahkan',
            'data' => $ulasan
        ]);
    }
}