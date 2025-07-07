<?php

namespace Database\Seeders;

use App\Models\ContactSection;
use Illuminate\Database\Seeder;

class ContactSectionSeeder extends Seeder
{
    public function run()
    {
        ContactSection::create([
            'company_name' => 'Mobile Fund Services',
            'address' => '324 Main St. Unit D. Lyons, CO 80540',
            'email' => 'Arhemy@loanformobilehome.com',
            'telephone' => '(720) 560-1018',
            'working_hours' => "Monday to Friday: 9:00 am – 5:00 pm\nSaturday & Sunday: Closed",
            'logo_path' => 'images/logo.svg',
        ]);
    }
}
