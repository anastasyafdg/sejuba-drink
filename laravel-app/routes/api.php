<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PenjualAuthController;
use App\Http\Controllers\Api\PembeliAuthController;
use App\Http\Controllers\Api\ProductController;

// ================= PENJUAL =================
Route::post('/penjual/login', [PenjualAuthController::class, 'loginApi']);

// ================= PEMBELI =================
Route::post('/pembeli/register', [PembeliAuthController::class, 'register']);
Route::post('/pembeli/login',    [PembeliAuthController::class, 'login']);

// ================= PRODUK =================
Route::get('/products',        [ProductController::class, 'index']);
Route::post('/products',       [ProductController::class, 'store']);
Route::get('/products/{id}',   [ProductController::class, 'show']);
Route::put('/products/{id}',   [ProductController::class, 'update']);
Route::delete('/products/{id}', [ProductController::class, 'destroy']);