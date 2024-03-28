<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BarangImage>
 */
class pesananFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "status"=> $this->faker->randomElement(['dipesan','diantarkan','selesai']),
            "catatan"=> $this->faker->sentence(3),
            "user_id"=> $this->faker->randomElement([1,2,3]),
        ];
    }
}
