<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ServicesSectionSeeder extends Seeder
{
    public function run(): void
    {
        $sectionId = DB::table('service_sections')->insertGetId([
            'heading' => json_encode([
                'en' => 'Services Designed for You',
                'es' => 'Servicios Diseñados para Usted',
            ]),
            'sub_heading' => json_encode([
                'en' => 'Tailored solutions to meet your home financing and investment needs.',
                'es' => 'Soluciones personalizadas para satisfacer sus necesidades de financiamiento e inversión.',
            ]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $services = [
            [
                'title' => [
                    'en' => 'Mortgage Loan Origination and Servicing',
                    'es' => 'Originación y Gestión de Préstamos Hipotecarios',
                ],
                'description' => [
                    'en' => 'At Mobile Fund Services, we excel as a mortgage originator and servicer, guiding you through every step of the lending process. Our experienced team works diligently to secure the best financing options tailored to your needs, ensuring a smooth and efficient journey from application to approval.',
                    'es' => 'En Mobile Fund Services, destacamos como originadores y gestores de préstamos hipotecarios, guiándolo en cada paso del proceso de préstamo. Nuestro equipo experimentado trabaja diligentemente para asegurar las mejores opciones de financiamiento adaptadas a sus necesidades, garantizando un proceso fluido y eficiente desde la solicitud hasta la aprobación.',
                ],
                'image' => 'https://cdn.builder.io/api/v1/image/assets/8065c8e268d14015b7bf1ebd244b31e3/e5eac81f96a88033f97adfc424e8143de6823829?placeholderIfAbsent=true',
            ],
            [
                'title' => [
                    'en' => 'Closing and Title Transfer',
                    'es' => 'Cierre y Transferencia de Títulos',
                ],
                'description' => [
                    'en' => 'We also function as a closing and title transfer company, managing all the essential details to finalize your manufactured home purchase. Our meticulous attention to detail ensures that every aspect of the closing process is handled accurately and efficiently, giving you peace of mind.',
                    'es' => 'También funcionamos como una empresa de cierre y transferencia de títulos, manejando todos los detalles esenciales para finalizar la compra de su casa prefabricada. Nuestra meticulosa atención al detalle asegura que cada aspecto del proceso de cierre se gestione de manera precisa y eficiente, brindándole tranquilidad.',
                ],
                'image' => 'https://cdn.builder.io/api/v1/image/assets/8065c8e268d14015b7bf1ebd244b31e3/94956d5c13f803f89cf197f91cd9237d2507e440?placeholderIfAbsent=true',
            ],
            [
                'title' => [
                    'en' => 'Investment Management',
                    'es' => 'Gestión de Inversiones',
                ],
                'description' => [
                    'en' => 'In addition, Mobile Fund Services offers comprehensive investment management services. Our expertise in the manufactured housing market allows us to provide strategic investment advice and management, helping you maximize returns and achieve your financial goals with confidence.',
                    'es' => 'Además, Mobile Fund Services ofrece servicios integrales de gestión de inversiones. Nuestra experiencia en el mercado de viviendas prefabricadas nos permite proporcionar asesoramiento y gestión de inversiones estratégicas, ayudándolo a maximizar retornos y alcanzar sus objetivos financieros con confianza.',
                ],
                'image' => 'https://cdn.builder.io/api/v1/image/assets/8065c8e268d14015b7bf1ebd244b31e3/1958ffae6de1889377673fb11777427a4d426440?placeholderIfAbsent=true',
            ],
        ];

        foreach ($services as $service) {
            DB::table('service_items')->insert([
                'service_section_id' => $sectionId,
                'title' => json_encode($service['title']),
                'description' => json_encode($service['description']),
                'image_path' => $service['image'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
