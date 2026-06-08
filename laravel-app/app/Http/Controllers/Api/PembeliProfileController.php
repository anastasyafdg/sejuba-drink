<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pembeli;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class PembeliProfileController extends Controller
{
    // ── Helper: ambil pembeli berdasarkan id dari header X-Pembeli-Id ─────────
    private function getPembeli(Request $request): Pembeli|JsonResponse
    {
        $id = $request->header('X-Pembeli-Id');

        if (!$id) {
            return response()->json([
                'success' => false,
                'message' => 'Tidak terautentikasi.',
            ], 401);
        }

        $pembeli = Pembeli::find($id);

        if (!$pembeli) {
            return response()->json([
                'success' => false,
                'message' => 'Akun tidak ditemukan.',
            ], 404);
        }

        return $pembeli;
    }

    // ================= GET PROFIL =================
    public function show(Request $request): JsonResponse
    {
        $pembeli = $this->getPembeli($request);

        if ($pembeli instanceof JsonResponse) return $pembeli;

        return response()->json([
            'success' => true,
            'data'    => [
                'id_pembeli'   => $pembeli->id_pembeli,
                'nama_pembeli' => $pembeli->nama_pembeli,
                'email'        => $pembeli->email,
                'no_telepon'   => $pembeli->no_telepon,
            ],
        ]);
    }

    // ================= UPDATE PROFIL =================
    public function update(Request $request): JsonResponse
    {
        $pembeli = $this->getPembeli($request);

        if ($pembeli instanceof JsonResponse) return $pembeli;

        try {
            $request->validate([
                'nama_pembeli' => 'required|string|max:255',
                'email'        => 'required|email|unique:pembeli,email,' . $pembeli->id_pembeli . ',id_pembeli',
                'no_telepon'   => 'required|string|max:20',
            ], [
                'nama_pembeli.required' => 'Nama lengkap wajib diisi.',
                'email.required'        => 'Email wajib diisi.',
                'email.email'           => 'Format email tidak valid.',
                'email.unique'          => 'Email sudah digunakan akun lain.',
                'no_telepon.required'   => 'Nomor telepon wajib diisi.',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => collect($e->errors())->flatten()->first(),
            ], 422);
        }

        $pembeli->update([
            'nama_pembeli' => $request->nama_pembeli,
            'email'        => $request->email,
            'no_telepon'   => $request->no_telepon,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Profil berhasil diperbarui.',
            'data'    => [
                'id_pembeli'   => $pembeli->id_pembeli,
                'nama_pembeli' => $pembeli->nama_pembeli,
                'email'        => $pembeli->email,
                'no_telepon'   => $pembeli->no_telepon,
            ],
        ]);
    }

    // ================= UPDATE PASSWORD =================
    public function updatePassword(Request $request): JsonResponse
    {
        $pembeli = $this->getPembeli($request);

        if ($pembeli instanceof JsonResponse) return $pembeli;

        try {
            $request->validate([
                'password_lama'         => 'required',
                'password_baru'         => 'required|string|min:8',
                'password_confirmation' => 'required|same:password_baru',
            ], [
                'password_lama.required'         => 'Password lama wajib diisi.',
                'password_baru.required'         => 'Password baru wajib diisi.',
                'password_baru.min'              => 'Password baru minimal 8 karakter.',
                'password_confirmation.required' => 'Konfirmasi password wajib diisi.',
                'password_confirmation.same'     => 'Konfirmasi password tidak cocok.',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => collect($e->errors())->flatten()->first(),
            ], 422);
        }

        // Verifikasi password lama
        if (!Hash::check($request->password_lama, $pembeli->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Password lama tidak sesuai.',
            ], 422);
        }

        $pembeli->update([
            'password' => Hash::make($request->password_baru),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Password berhasil diperbarui.',
        ]);
    }
}
