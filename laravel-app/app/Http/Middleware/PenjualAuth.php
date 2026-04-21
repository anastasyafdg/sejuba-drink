<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PenjualAuth
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!session()->has('penjual_id')) {
            return redirect()->route('penjual.login')->with('error', 'Silakan login terlebih dahulu.');
        }

        return $next($request);
    }
}