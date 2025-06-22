<?php

namespace Database\Seeders;

use App\Models\HeroSection;
use Illuminate\Database\Seeder;

class HeroSectionSeeder extends Seeder
{
    public function run(): void
    {
        HeroSection::query()->delete();
        HeroSection::create([
            'slogan' => [
                'en' => 'Your Home. Your Future. Your Way.',
                'es' => 'Tu Hogar. Tu Futuro. Tu Camino.',
            ],
            'heading_part1' => [
                'en' => 'Your Path to ',
                'es' => 'Tu Camino hacia la Propiedad de tu ',
            ],
            'heading_part2' => [
                'en' => 'Mobile Home',
                'es' => 'Casa Móvil',
            ],
            'heading_part3' => [
                'en' => ' Ownership Starts Here .',
                'es' => ' Comienza Aquí .',
            ],
            'sub_heading' => [
                'en' => 'Simple, transparent financing solutions for your manufactured home, with competitive rates and personalized service.',
                'es' => 'Soluciones de financiamiento simples y transparentes para tu casa prefabricada, con tasas competitivas y servicio personalizado.',
            ],
            'image_path' => 'images/Mobile-home-autumn-comprimida.jpeg',
        ]);
    }
}
