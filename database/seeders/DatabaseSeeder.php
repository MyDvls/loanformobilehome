<?php

namespace Database\Seeders;

use App\Models\ContactSection;
use App\Models\RequirementsSection;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            ContactSectionSeeder::class,
            TeamSectionSeeder::class,
            LoanSectionSeeder::class,
            FeaturesSectionSeeder::class,
            HeroSectionSeeder::class,
            ServicesSectionSeeder::class,
            UnderstandingLoanSectionSeeder::class,
            RequirementsSectionSeeder::class,
            UserSeeder::class,
        ]);
    }
}
