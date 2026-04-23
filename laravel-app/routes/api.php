<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PenjualAuthController;

Route::post('/penjual/login', [PenjualAuthController::class , 'loginApi']);
