<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PenjualAuthController;

// API route untuk Next.js (bebas CSRF)
Route::post('/api/penjual/login', [PenjualAuthController::class , 'loginApi'])
    ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);


// Web routes (session-based, untuk Blade views)
Route::prefix('penjual')->group(function () {
    Route::get('/login', [PenjualAuthController::class , 'showLogin'])->name('penjual.login');
    Route::post('/login', [PenjualAuthController::class , 'login'])->name('penjual.login.submit');

    Route::middleware('penjual.auth')->group(function () {
            Route::get('/dashboard', [PenjualAuthController::class , 'dashboard'])->name('penjual.dashboard');
            Route::post('/logout', [PenjualAuthController::class , 'logout'])->name('penjual.logout');
        }
        );
    });