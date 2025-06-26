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
                'image' => 'https://cdn.builder.io/api/v1/image/assets/8065c8e268d14015b7bf1ebd244b31e3/e5eac81f96a88033f97adfc424e8143de6823829?placeholderIfAbsent=true',
            ],
            [
                'title' => 'Closing and Title Transfer',
                'description' => 'We also function as a closing and title transfer company, managing all the essential details to finalize your manufactured home purchase. Our meticulous attention to detail ensures that every aspect of the closing process is handled accurately and efficiently, giving you peace of mind.',
                'image' => 'https://cdn.builder.io/api/v1/image/assets/8065c8e268d14015b7bf1ebd244b31e3/94956d5c13f803f89cf197f91cd9237d2507e440?placeholderIfAbsent=true',
            ],
            [
                'title' => 'Investment Management',
                'description' => 'In addition, Mobile Fund Services offers comprehensive investment management services. Our expertise in the manufactured housing market allows us to provide strategic investment advice and management, helping you maximize returns and achieve your financial goals with confidence.',
                'image' => 'https://cdn.builder.io/api/v1/image/assets/8065c8e268d14015b7bf1ebd244b31e3/1958ffae6de1889377673fb11777427a4d426440?placeholderIfAbsent=true',
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
