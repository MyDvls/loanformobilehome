<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ServicesSectionSeeder extends Seeder
{
    public function run(): void
    {
        $sectionId = DB::table('service_section')->insertGetId([
            'heading' => 'Services Designed for You',
            'sub_heading' => 'Tailored solutions to meet your home financing and investment needs.',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $services = [
            [
                'title' => 'Mortgage Loan Origination and Servicing',
                'description' => 'At Mobile Fund Services, we excel as a mortgage originator and servicer, guiding you through every step of the lending process. Our experienced team works diligently to secure the best financing options tailored to your needs, ensuring a smooth and efficient journey from application to approval.',
                'image' => 'images/image.png',
            ],
            [
                'title' => 'Closing and Title Transfer',
                'description' => 'We also function as a closing and title transfer company, managing all the essential details to finalize your manufactured home purchase. Our meticulous attention to detail ensures that every aspect of the closing process is handled accurately and efficiently, giving you peace of mind.',
                'image' => 'images/image-1.png',
            ],
            [
                'title' => 'Investment Management',
                'description' => 'In addition, Mobile Fund Services offers comprehensive investment management services. Our expertise in the manufactured housing market allows us to provide strategic investment advice and management, helping you maximize returns and achieve your financial goals with confidence.',
                'image' => 'images/image-2.png',
            ],
        ];

        foreach ($services as $service) {
            DB::table('service_items')->insert([
                'service_section_id' => $sectionId,
                'title' => $service['title'],
                'description' => $service['description'],
                'image_path' => $service['image'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
