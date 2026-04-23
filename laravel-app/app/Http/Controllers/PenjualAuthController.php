<?php

namespace App\Http\Controllers;

use App\Models\Penjual;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\JsonResponse;

class PenjualAuthController extends Controller
{
    public function showLogin()
    {
        if (session()->has('penjual_id')) {
            return redirect()->route('penjual.dashboard');
        }

        return view('auth.login-penjual');
    }

    public function login(Request $request)
    {
        $request->validate([
            'nama_penjual' => 'required',
            'password' => 'required'
        ], [
            'nama_penjual.required' => 'Username wajib diisi.',
            'password.required' => 'Password wajib diisi.',
        ]);

        $penjual = Penjual::where('nama_penjual', $request->nama_penjual)->first();

        if (!$penjual) {
            return back()->withErrors([
                'nama_penjual' => 'Username tidak ditemukan.'
            ])->withInput();
        }

        if (!Hash::check($request->password, $penjual->password)) {
            return back()->withErrors([
                'password' => 'Password salah.'
            ])->withInput();
        }

        session([
            'penjual_id' => $penjual->id_penjual,
            'penjual_nama' => $penjual->nama_penjual,
            'penjual_email' => $penjual->email,
        ]);

        return redirect()->route('penjual.dashboard');
    }

    public function loginApi(Request $request): JsonResponse
    {
        $request->validate([
            'nama_penjual' => 'required',
            'password' => 'required',
        ]);

        $penjual = Penjual::where('nama_penjual', $request->nama_penjual)->first();

        if (!$penjual) {
            return response()->json([
                'success' => false,
                'message' => 'Username tidak ditemukan.',
            ], 401);
        }

        if (!Hash::check($request->password, $penjual->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Password salah.',
            ], 401);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $penjual->id_penjual,
                'nama' => $penjual->nama_penjual,
                'email' => $penjual->email,
            ],
        ]);
    }

    public function dashboard()
    {
        return view('penjual.dashboard');
    }

    public function logout(Request $request)
    {
        $request->session()->forget([
            'penjual_id',
            'penjual_nama',
            'penjual_email',
        ]);

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('penjual.login');
    }
}