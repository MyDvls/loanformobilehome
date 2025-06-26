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
                'title' => 'Competitive Rates',
                'description' => 'Enjoy some of the lowest interest rates in the market, tailored to your financial needs.',
            ],
            [
                'title' => 'Fast Approval Process',
                'description' => 'Get pre-approved quickly with our streamlined online application process.',
            ],
            [
                'title' => 'Flexible Terms',
                'description' => 'Choose from a variety of loan terms to fit your budget and lifestyle.',
            ],
            [
                'title' => 'Expert Support',
                'description' => 'Our dedicated team is here to guide you through every step of the loan process.',
            ],
            [
                'title' => 'Online Management',
                'description' => 'Manage your loan payments and track progress conveniently from anywhere.',
            ],
        ];

        // Create feature items
        foreach ($features as $feature) {
            DB::table('feature_items')->insert([
                'feature_section_id' => $sectionId,
                'title' => $feature['title'],
                'description' => $feature['description'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
