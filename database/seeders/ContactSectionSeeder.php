<?php

namespace Database\Seeders;

use App\Models\ContactSection;
use Illuminate\Database\Seeder;

class ContactSectionSeeder extends Seeder
{
    public function run()
    {
        ContactSection::create([
            'company_name' => [
                'en' => 'Mobile Fund Services',
                'es' => 'Mobile Fund Services',
            ],
            'address' => [
                'en' => '324 Main St. Unit D. Lyons, CO 80540',
                'es' => '324 Main St. Unit D. Lyons, CO 80540',
            ],
            'email' => [
                'en' => 'Arhemy@loanformobilehome.com',
                'es' => 'Arhemy@loanformobilehome.com',
            ],
            'telephone' => [
                'en' => '(720) 560-1018',
                'es' => '(720) 560-1018',
            ],
            'working_hours' => [
                'en' => "Monday to Friday: 9:00 am – 5:00 pm\nSaturday & Sunday: Closed",
                'es' => "Lunes a Viernes: 9:00 am – 5:00 pm\nSábado y Domingo: Cerrado",
            ],
            'logo_path' => 'contact/logo.png', // Placeholder path
        ]);
    }
}
