<?php

namespace Database\Seeders;

use App\Models\LoanSection;
use App\Models\LoanItem;
use Illuminate\Database\Seeder;

class LoanSectionSeeder extends Seeder
{
    public function run(): void
    {
        // Create the Loan Section
        $loanSection = LoanSection::create([
            'title' => 'GET YOUR LOAN IN 5 EASY STEPS',
        ]);

        // Define the steps as an array
        $steps = [
            [
                'title' => 'Choose Your Home',
                'description' => 'Choose a home and make sure you have the 20% downpayment. An agent must be working with you to buy your new home.',
                'image_path' => 'images/home.png'
            ],
            [
                'title' => 'Apply Online',
                'description' => 'Start your application process through our website (15 min process!).',
                'image_path' => 'images/apply.png'
            ],
            [
                'title' => 'Get Pre-Approved',
                'description' => 'MFS will contact you to gather basic financial documents to start your loan process and get you PRE-APPROVED.',
                'image_path' => 'images/stamp.png'
            ],
            [
                'title' => 'Closing Preparation',
                'description' => "Get ready for closing. You can opt for a home inspection, and you must get insurance to get your loan! Let's protect your new asset.",
                'image_path' => 'images/locked.png'
            ],
            [
                'title' => 'Move In',
                'description' => 'CONGRATULATIONS! YOU HAVE A NEW LOAN AND A NEW HOME. Make payments online and get your loan progress tracking from the comfort of your home.',
                'image_path' => 'images/moving-home.png'
            ],
        ];

        // Create LoanItem records for each step
        foreach ($steps as $step) {
            LoanItem::create([
                'loan_section_id' => $loanSection->id,
                'title' => $step['title'],
                'description' => $step['description'],
                'image_path' => $step['image_path'] ?? null, // Optional: Set to a default image URL or leave as null
            ]);
        }
    }
}
