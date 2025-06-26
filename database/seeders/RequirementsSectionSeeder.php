<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RequirementsSectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create the section
        $sectionId = DB::table('requirement_section')->insertGetId([
            'title' => 'Get Started With An Application',
            'subtitle' => 'Listed below are the items required by Mobile Fund Services for a new loan or refinance',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Create requirement items
        $requirementItems = [
            [
                'title' => 'Valid Colorado Drivers License or ID',
                'description' => "A photo or scan of a non-expired driver's license or state ID.",
                'image_path' => 'UserCheck',
            ],
            [
                'title' => '2 Years of Personal Tax Returns',
                'description' => 'The most recent two years of federal tax returns showing all income.',
                'image_path' => 'FileText',
            ],
            [
                'title' => 'Last 2 Months Proof of Employment',
                'description' => 'Photos or scans of pay stubs from the most recent two months.',
                'image_path' => 'FileCheck',
            ],
            [
                'title' => 'Social Security Number or ITIN',
                'description' => 'Your Social Security Number (SSN) or Individual Taxpayer Identification Number (ITIN) for identity verification and credit checks.',
                'image_path' => 'CreditCard',
            ],
            [
                'title' => 'Purchase Agreement',
                'description' => 'A signed contract outlining the terms and conditions of the property purchase.',
                'image_path' => 'FileKey',
            ],
            [
                'title' => '20% Down Payment',
                'description' => "At least 20% of the property's purchase price as a down payment.",
                'image_path' => 'Banknote',
            ],
        ];

        foreach ($requirementItems as $item) {
            DB::table('requirement_items')->insert([
                'requirement_section_id' => $sectionId,
                'title' => $item['title'],
                'description' => $item['description'],
                'image_path' => $item['image_path'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
