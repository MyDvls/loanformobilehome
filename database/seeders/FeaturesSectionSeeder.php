<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FeaturesSectionSeeder extends Seeder
{
    public function run(): void
    {
        // Create the Features Section
        $sectionId = DB::table('feature_section')->insertGetId([
            'title' => 'Why Choose Our Loan Services?',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Define the features as an array
        $features = [
            [
                'title' => 'Expert Guidance',
                'description' => 'Over 35 years experience in the Financial services industry.',
                'image_path' => 'images/2.png',
            ],
            [
                'title' => 'Bilingual Support',
                'description' => 'Friendly service in English and Spanish.',
                'image_path' => 'images/1.png',
            ],
            [
                'title' => 'Competitive Rates',
                'description' => 'We offer loan options with rates designed to save you money.',
                'image_path' => 'images/5.png',
            ],
            [
                'title' => 'Fast Appraisals and Closings',
                'description' => 'Enjoy quick desktop appraisals, smooth closings, and speedy functions to get you into your home faster.',
                'image_path' => 'images/4.png',
            ],
            [
                'title' => 'Trusted by Homeowners',
                'description' => 'Hundreds of satisfied clients and families.',
                'image_path' => 'images/3.png',
            ],
        ];

        // Create feature items
        foreach ($features as $feature) {
            DB::table('feature_items')->insert([
                'feature_section_id' => $sectionId,
                'title' => $feature['title'],
                'description' => $feature['description'],
                'image_path' => $feature['image_path'] ?? null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
