<?php

namespace Database\Seeders;

use App\Models\BarangImage;
use App\Models\Keranjang;
use App\Models\Pesanan;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Barang;

class barangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->count(10)->create();
        Barang::factory()->count(10)->create();
        BarangImage::factory()->count(10)->create();
        Pesanan::factory()->count(10)->create();
        Keranjang::factory()->count(10)->create();
    }
}
