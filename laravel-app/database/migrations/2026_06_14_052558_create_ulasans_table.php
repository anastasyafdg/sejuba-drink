<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
{
    Schema::create('ulasan', function (Blueprint $table) {

        $table->id('id_ulasan');

        $table->unsignedBigInteger('id_pembeli');
        $table->unsignedBigInteger('id_produk');

        $table->integer('rating');

        $table->text('ulasan');

        $table->timestamps();

        $table->foreign('id_pembeli')
            ->references('id_pembeli')
            ->on('pembeli')
            ->onDelete('cascade');

        $table->foreign('id_produk')
            ->references('id')
            ->on('products')
            ->onDelete('cascade');
    });
}

public function down(): void
{
    Schema::dropIfExists('ulasan');
}
};
