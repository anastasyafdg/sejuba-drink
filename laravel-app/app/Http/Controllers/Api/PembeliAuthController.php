<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pembeli;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class PembeliAuthController extends Controller
{
    // ================= REGISTER =================
    public function register(Request $request): JsonResponse
    {
        $request->validate([
            'nama_pembeli'          => 'required|string|max:255',
            'email'                 => 'required|email|unique:pembeli,email',
            'no_telepon'            => 'required|string|max:20',
            'password'              => 'required|string|min:8|confirmed',
        ], [
            'nama_pembeli.required'  => 'Nama lengkap wajib diisi.',
            'email.required'         => 'Email wajib diisi.',
            'email.email'            => 'Format email tidak valid.',
            'email.unique'           => 'Email sudah terdaftar.',
            'no_telepon.required'    => 'Nomor telepon wajib diisi.',
            'password.required'      => 'Password wajib diisi.',
            'password.min'           => 'Password minimal 8 karakter.',
            'password.confirmed'     => 'Konfirmasi password tidak cocok.',
        ]);

        Pembeli::create([
            'nama_pembeli' => $request->nama_pembeli,
            'email'        => $request->email,
            'no_telepon'   => $request->no_telepon,
            'password'     => Hash::make($request->password),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Registrasi berhasil',
        ], 201);
    }

    // ================= LOGIN =================
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ], [
            'email.required'    => 'Email wajib diisi.',
            'email.email'       => 'Format email tidak valid.',
            'password.required' => 'Password wajib diisi.',
        ]);

        $pembeli = Pembeli::where('email', $request->email)->first();

        if (!$pembeli) {
            return response()->json([
                'success' => false,
                'message' => 'Email tidak ditemukan.',
            ], 401);
        }

        if (!Hash::check($request->password, $pembeli->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Password salah.',
            ], 401);
        }

        return response()->json([
            'success' => true,
            'message' => 'Login berhasil',
            'data'    => [
                'id_pembeli'   => $pembeli->id_pembeli,
                'nama_pembeli' => $pembeli->nama_pembeli,
                'email'        => $pembeli->email,
                'no_telepon'   => $pembeli->no_telepon,
            ],
        ]);
    }
}
