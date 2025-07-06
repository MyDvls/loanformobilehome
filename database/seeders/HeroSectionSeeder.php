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
            'image_path' => 'images/hero/hero-image-1.jpg',
        ]);
        HeroItem::create([
            'hero_section_id' => 1,
            'image_path' => 'images/hero/hero-image-2.jpg',
        ]);
        HeroItem::create([
            'hero_section_id' => 1,
            'image_path' => 'images/hero/hero-image-3.jpg',
        ]);
        HeroItem::create([
            'hero_section_id' => 1,
            'image_path' => 'images/hero/hero-image-4.jpg',
        ]);
        HeroItem::create([
            'hero_section_id' => 1,
            'image_path' => 'images/hero/hero-image-5.jpg',
        ]);
    }
}
