<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {

            $table->id();

            /*
            Product
            */

            $table->string('name');

            $table->enum('category', [
                'Cold Pressed Juice',
                'Infused Water Drink'
            ]);

            $table->string('image')->nullable();

            /*
            PRODUCT STATUS
            */

            $table->enum('status', [
                'Tersedia',
                'Habis'
            ])->default('Tersedia');

            /*
            UI / FRONTEND
            */

            $table->string('bg_color')->nullable();

            /*
            |--------------------------------------------------------------------------
            | 50 ML VARIANT
            |--------------------------------------------------------------------------
            */

            $table->integer('price_50')->nullable();
            $table->integer('stock_50')->default(0);

            /*
            |--------------------------------------------------------------------------
            | 100 ML VARIANT
            |--------------------------------------------------------------------------
            */

            $table->integer('price_100')->nullable();
            $table->integer('stock_100')->default(0);

            /*
            |--------------------------------------------------------------------------
            | 250 ML VARIANT
            |--------------------------------------------------------------------------
            */

            $table->integer('price_250')->nullable();
            $table->integer('stock_250')->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};