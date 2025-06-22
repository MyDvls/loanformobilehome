<?php

namespace Database\Seeders;

use App\Models\FeaturesSection;
use Illuminate\Database\Seeder;

class FeaturesSectionSeeder extends Seeder
{
    public function run(): void
    {
        FeaturesSection::updateOrCreate(
            ['id' => 1],
            [
                'title' => [
                    'en' => 'Why Choose Us?',
                    'es' => '¿Por Qué Elegirnos?',
                ],
                'feature1_title' => [
                    'en' => 'Competitive Rates',
                    'es' => 'Tasas Competitivas',
                ],
                'feature1_description' => [
                    'en' => 'We offer some of the most competitive interest rates in the market.',
                    'es' => 'Ofrecemos algunas de las tasas de interés más competitivas del mercado.',
                ],
                'feature2_title' => [
                    'en' => 'Easy Application Process',
                    'es' => 'Proceso de Solicitud Fácil',
                ],
                'feature2_description' => [
                    'en' => 'Our streamlined application process saves you time and effort.',
                    'es' => 'Nuestro proceso de solicitud simplificado te ahorra tiempo y esfuerzo.',
                ],
                'feature3_title' => [
                    'en' => 'Secure Transactions',
                    'es' => 'Transacciones Seguras',
                ],
                'feature3_description' => [
                    'en' => 'Your data is protected with state-of-the-art security measures.',
                    'es' => 'Tus datos están protegidos con medidas de seguridad de última generación.',
                ],
                'feature4_title' => [
                    'en' => 'Excellent Customer Service',
                    'es' => 'Excelente Servicio al Cliente',
                ],
                'feature4_description' => [
                    'en' => 'Our team is dedicated to providing top-notch support.',
                    'es' => 'Nuestro equipo está dedicado a proporcionar un soporte de primera calidad.',
                ],
                'feature5_title' => [
                    'en' => 'Trusted by Thousands',
                    'es' => 'Confiado por Miles',
                ],
                'feature5_description' => [
                    'en' => 'Join thousands of satisfied customers who trust our services.',
                    'es' => 'Únete a miles de clientes satisfechos que confían en nuestros servicios.',
                ],
            ]
        );
    }
}