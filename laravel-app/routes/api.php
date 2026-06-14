<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PenjualAuthController;
use App\Http\Controllers\Api\PembeliAuthController;
use App\Http\Controllers\Api\PembeliProfileController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\PesananController;

// ================= PENJUAL =================
Route::post('/penjual/login', [PenjualAuthController::class, 'loginApi']);

// ================= PEMBELI AUTH =================
Route::post('/pembeli/register', [PembeliAuthController::class, 'register']);
Route::post('/pembeli/login', [PembeliAuthController::class, 'login']);

// ================= PEMBELI PROFIL =================
Route::get('/pembeli/profil', [PembeliProfileController::class, 'show']);
Route::put('/pembeli/profil', [PembeliProfileController::class, 'update']);
Route::put('/pembeli/password', [PembeliProfileController::class, 'updatePassword']);

// ================= PRODUK =================
Route::get('/products', [ProductController::class, 'index']);
Route::post('/products', [ProductController::class, 'store']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::put('/products/{id}', [ProductController::class, 'update']);
Route::delete('/products/{id}', [ProductController::class, 'destroy']);

// ================= PESANAN =================
Route::get('/pesanan', [PesananController::class, 'index']);
Route::post('/pesanan', [PesananController::class, 'store']);
Route::put('/pesanan/{id}/bayar', [PesananController::class, 'bayar']);
Route::get('/pesanan/{id}', [PesananController::class, 'show']);
Route::get('/pembeli/{id}/pesanan', [PesananController::class, 'riwayatPembeli']);
Route::put('/pesanan/{id}/status', [PesananController::class, 'updateStatus']);