<?php

namespace Database\Seeders;

use App\Models\HeroItem;
use App\Models\HeroSection;
use Illuminate\Database\Seeder;

class HeroSectionSeeder extends Seeder
{
    public function run(): void
    {
        HeroSection::query()->delete();
        HeroSection::create([
            'slogan' => 'Your Home. Your Future. Your Way.',
            'heading_part1' => 'Your Path to ',
            'heading_part2' => 'Mobile Home',
            'heading_part3' => ' Ownership Starts Here .',
            'sub_heading' => 'Simple, transparent financing solutions for your manufactured home, with competitive rates and personalized service.',
        ]);

        HeroItem::create([
            'hero_section_id' => 1,
            'image_path' => 'images/basket-ball-mobile-home-background-comprimida.jpeg',
        ]);
        HeroItem::create([
            'hero_section_id' => 1,
            'image_path' => 'images/Mobile-home-autumn-comprimida.jpeg',
        ]);
        HeroItem::create([
            'hero_section_id' => 1,
            'image_path' => 'images/Mobile-home-beautiful-background-comprimida.jpeg',
        ]);
    }
}
