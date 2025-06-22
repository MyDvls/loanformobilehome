<?php

namespace Database\Seeders;

use App\Models\LoanSection;
use Illuminate\Database\Seeder;

class LoanSectionSeeder extends Seeder
{
    public function run(): void
    {
        LoanSection::create([
            'title' => [
                'en' => 'GET YOUR LOAN IN 5 EASY STEPS',
                'es' => 'Obtén tu préstamo en 5 sencillos pasos',
            ],
            'step1_title' => [
                'en' => 'Choose Your Home',
                'es' => 'Elige tu casa',
            ],
            'step1_description' => [
                'en' => 'Choose a home and make sure you have the 20% downpayment. An agent must be working with you to buy your new home.',
                'es' => 'Elija una casa y asegúrese de tener el 20% de enganche. Un agente debe trabajar con usted para comprar su nueva casa.',
            ],
            'step2_title' => [
                'en' => 'Apply Online',
                'es' => 'Aplicar en línea',
            ],
            'step2_description' => [
                'en' => 'Start your application process through our website (15 min process!).',
                'es' => 'Comienza tu proceso de solicitud a través de nuestro sitio web (¡proceso de 15 min!).',
            ],
            'step3_title' => [
                'en' => 'Get Pre-Approved',
                'es' => 'Obtenga una aprobación previa',
            ],
            'step3_description' => [
                'en' => 'MFS will contact you to gather basic financial documents to start your loan process and get you PRE-APPROVED.',
                'es' => 'MFS se comunicará con usted para reunir los documentos financieros básicos para iniciar su proceso de préstamo y obtener su PREAPROBACIÓN.',
            ],
            'step4_title' => [
                'en' => 'Closing Preparation',
                'es' => 'Preparación de cierre',
            ],
            'step4_description' => [
                'en' => "Get ready for closing. You can opt for a home inspection, and you must get insurance to get your loan! Let's protect your new asset.",
                'es' => 'Prepárese para el cierre. Puede optar por una inspección de la vivienda y debe obtener un seguro para obtener su préstamo. Protejamos su nuevo activo.',
            ],
            'step5_title' => [
                'en' => 'Move In',
                'es' => 'Avanzar',
            ],
            'step5_description' => [
                'en' => 'CONGRATULATIONS! YOU HAVE A NEW LOAN AND A NEW HOME. Make payments online and get your loan progress tracking from the comfort of your home.',
                'es' => '¡FELICIDADES! TIENES UN NUEVO PRÉSTAMO Y UNA CASA NUEVA. Realiza pagos en línea y consulta el progreso de tu préstamo desde la comodidad de tu hogar.',
            ],
        ]);
    }
}
