<?php

namespace Database\Seeders;

use App\Models\Pembeli;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        Pembeli::factory()->create([
            'nama_pembeli' => 'Test Pembeli',
            'email'        => 'test@example.com',
            'no_telepon'   => '081234567890',
        ]);
    }
}
