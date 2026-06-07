<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pesanan', function (Blueprint $table) {

            $table->id('id_pesanan');

            $table->unsignedBigInteger('id_pembeli');

            $table->dateTime('tanggal_pesanan');

            $table->integer('total_harga');

            $table->text('alamat_pengiriman');

            $table->enum('status_pembayaran', [
                'Menunggu Pembayaran',
                'Lunas',
                'Gagal'
            ])->default('Menunggu Pembayaran');

            $table->enum('status_pesanan', [
                'Menunggu Konfirmasi',
                'Diproses',
                'Dikirim',
                'Selesai',
                'Dibatalkan'
            ])->default('Menunggu Konfirmasi');

            $table->timestamps();

            $table->foreign('id_pembeli')
                ->references('id_pembeli')
                ->on('pembeli')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pesanan');
    }
};