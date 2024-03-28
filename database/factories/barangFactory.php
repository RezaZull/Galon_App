<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Barang>
 */
class barangFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    public function definition(): array
    {
        return [
            'nama'=> fake()->name(),
            'deskripsi'=> fake()->sentence(6,true),
            'stock'=> fake()->randomNumber(),
            'harga'=> fake()->randomNumber(),
        ];
    }
}
