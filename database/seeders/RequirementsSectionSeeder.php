<?php

namespace Database\Seeders;

use App\Models\RequirementsSection;
use Illuminate\Database\Seeder;

class RequirementsSectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        RequirementsSection::updateOrCreate(
            ['id' => 1], // Assuming a single record for the homepage
            [
                'title' => [
                    'en' => 'Get Started With An Application',
                    'es' => 'Comience con una Solicitud',
                ],
                'subtitle' => [
                    'en' => 'Listed below are the items required by Mobile Fund Services for a new loan or refinance',
                    'es' => 'A continuación se enumeran los elementos requeridos por Mobile Fund Services para un nuevo préstamo o refinanciamiento',
                ],
                'requirement1_icon' => [
                    'en' => 'UserCheck',
                    'es' => 'UserCheck',
                ],
                'requirement1_title' => [
                    'en' => 'Valid Colorado Drivers License or ID',
                    'es' => 'Licencia de Conducir o Identificación de Colorado Válida',
                ],
                'requirement1_description' => [
                    'en' => "A photo or scan of a non-expired driver's license or state ID.",
                    'es' => 'Una foto o escaneo de una licencia de conducir o identificación estatal no vencida.',
                ],
                'requirement2_icon' => [
                    'en' => 'FileText',
                    'es' => 'FileText',
                ],
                'requirement2_title' => [
                    'en' => '2 Years of Personal Tax Returns',
                    'es' => '2 Años de Declaraciones de Impuestos Personales',
                ],
                'requirement2_description' => [
                    'en' => 'The most recent two years of federal tax returns showing all income.',
                    'es' => 'Las declaraciones de impuestos federales de los últimos dos años que muestren todos los ingresos.',
                ],
                'requirement3_icon' => [
                    'en' => 'FileCheck',
                    'es' => 'FileCheck',
                ],
                'requirement3_title' => [
                    'en' => 'Last 2 Months Proof of Employment',
                    'es' => 'Comprobante de Empleo de los Últimos 2 Meses',
                ],
                'requirement3_description' => [
                    'en' => 'Photos or scans of pay stubs from the most recent two months.',
                    'es' => 'Fotos o escaneos de los talones de pago de los últimos dos meses.',
                ],
                'requirement4_icon' => [
                    'en' => 'CreditCard',
                    'es' => 'CreditCard',
                ],
                'requirement4_title' => [
                    'en' => 'Social Security Number or ITIN',
                    'es' => 'Número de Seguro Social o ITIN',
                ],
                'requirement4_description' => [
                    'en' => 'Your Social Security Number (SSN) or Individual Taxpayer Identification Number (ITIN) for identity verification and credit checks.',
                    'es' => 'Su Número de Seguro Social (SSN) o Número de Identificación del Contribuyente Individual (ITIN) para verificación de identidad y revisiones de crédito.',
                ],
                'requirement5_icon' => [
                    'en' => 'FileKey',
                    'es' => 'FileKey',
                ],
                'requirement5_title' => [
                    'en' => 'Purchase Agreement',
                    'es' => 'Contrato de Compra',
                ],
                'requirement5_description' => [
                    'en' => 'A signed contract outlining the terms and conditions of the property purchase.',
                    'es' => 'Un contrato firmado que detalla los términos y condiciones de la compra de la propiedad.',
                ],
                'requirement6_icon' => [
                    'en' => 'Banknote',
                    'es' => 'Banknote',
                ],
                'requirement6_title' => [
                    'en' => '20% Down Payment',
                    'es' => '20% de Enganche',
                ],
                'requirement6_description' => [
                    'en' => "At least 20% of the property's purchase price as a down payment.",
                    'es' => 'Al menos el 20% del precio de compra de la propiedad como enganche.',
                ],
            ]
        );
    }
}
