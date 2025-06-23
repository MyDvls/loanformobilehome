<?php

namespace Database\Seeders;

use App\Models\FeaturesSection;
use App\Models\FeatureItem;
use Illuminate\Database\Seeder;

class FeaturesSectionSeeder extends Seeder
{
    public function run(): void
    {
        // Create the Features Section
        $featuresSection = FeaturesSection::create([
            'title' => [
                'en' => 'Why Choose Our Loan Services?',
                'es' => '¿Por qué elegir nuestros servicios de préstamo?',
            ],
        ]);

        // Define the features as an array
        $features = [
            [
                'title' => [
                    'en' => 'Competitive Rates',
                    'es' => 'Tasas competitivas',
                ],
                'description' => [
                    'en' => 'Enjoy some of the lowest interest rates in the market, tailored to your financial needs.',
                    'es' => 'Disfruta de algunas de las tasas de interés más bajas del mercado, adaptadas a tus necesidades financieras.',
                ],
            ],
            [
                'title' => [
                    'en' => 'Fast Approval Process',
                    'es' => 'Proceso de aprobación rápido',
                ],
                'description' => [
                    'en' => 'Get pre-approved quickly with our streamlined online application process.',
                    'es' => 'Obtén una preaprobación rápida con nuestro proceso de solicitud en línea optimizado.',
                ],
            ],
            [
                'title' => [
                    'en' => 'Flexible Terms',
                    'es' => 'Términos flexibles',
                ],
                'description' => [
                    'en' => 'Choose from a variety of loan terms to fit your budget and lifestyle.',
                    'es' => 'Elige entre una variedad de términos de préstamo para adaptarse a tu presupuesto y estilo de vida.',
                ],
            ],
            [
                'title' => [
                    'en' => 'Expert Support',
                    'es' => 'Soporte experto',
                ],
                'description' => [
                    'en' => 'Our dedicated team is here to guide you through every step of the loan process.',
                    'es' => 'Nuestro equipo dedicado está aquí para guiarte en cada paso del proceso de préstamo.',
                ],
            ],
            [
                'title' => [
                    'en' => 'Online Management',
                    'es' => 'Gestión en línea',
                ],
                'description' => [
                    'en' => 'Manage your loan payments and track progress conveniently from anywhere.',
                    'es' => 'Administra los pagos de tu préstamo y sigue el progreso cómodamente desde cualquier lugar.',
                ],
            ],
        ];

        // Create FeatureItem records for each feature
        foreach ($features as $feature) {
            FeatureItem::create([
                'feature_section_id' => $featuresSection->id,
                'title' => $feature['title'],
                'description' => $feature['description'],
            ]);
        }
    }
}
