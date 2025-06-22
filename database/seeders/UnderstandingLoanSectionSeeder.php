<?php

namespace Database\Seeders;

use App\Models\UnderstandingLoanSection;
use Illuminate\Database\Seeder;

class UnderstandingLoanSectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        UnderstandingLoanSection::create([
            'title' => [
                'en' => 'Understanding Your Loan',
                'es' => 'Entendiendo Su Préstamo',
            ],
            'subtitle' => [
                'en' => 'Get clarity on your loan payments and how to pay off your loan smarter and faster.',
                'es' => 'Obtenga claridad sobre sus pagos de préstamo y cómo pagar su préstamo de manera más inteligente y rápida.',
            ],
            'section1_title' => [
                'en' => 'How Your Monthly Payment Works',
                'es' => 'Cómo Funciona Su Pago Mensual',
            ],
            'section1_description' => [
                'en' => 'When you take on a loan, your monthly payment is a combination of principal and interest. Though your monthly payment amount stays the same, the division between principal and interest changes as you pay it down.',
                'es' => 'Al solicitar un préstamo, su pago mensual es una combinación de capital e intereses. Aunque el monto de su pago mensual se mantiene constante, la distribución entre capital e intereses cambia a medida que paga el préstamo.',
            ],
            'section1_principal' => [
                'en' => 'Principal Debt (loan amount)',
                'es' => 'Deuda Principal (monto del préstamo)',
            ],
            'section1_interest' => [
                'en' => 'Interest (cost of borrowing)',
                'es' => 'Intereses (costo del préstamo)',
            ],
            'section1_escrow' => [
                'en' => 'Escrow (taxes + insurance) independent from MFS',
                'es' => 'Escrow (impuestos + seguro) independiente de MFS',
            ],
            'section1_tip' => [
                'en' => 'At the start, most of your payment goes toward interest. Over time, more goes toward paying off your principal debt.',
                'es' => 'Al inicio, la mayor parte de su pago va a los intereses. Con el tiempo, más se destina a pagar su deuda principal.',
            ],
            'section1_graph1_title' => [
                'en' => 'How Does Interest Work on my Loan?',
                'es' => '¿Cómo funciona el interés de mi préstamo?',
            ],
            'section2_title' => [
                'en' => 'Making Additional Payments',
                'es' => 'Haciendo Pagos Adicionales',
            ],
            'section2_additional' => [
                'en' => 'Additional payments = pay off faster!',
                'es' => '¡Pagos adicionales = pagar más rápido!',
            ],
            'section2_interest_save' => [
                'en' => 'Extra payments go directly to the Principal. You save on interest.',
                'es' => 'Los pagos extras van directamente al Principal. ¡Ahorra en intereses!',
            ],
            'section2_term_shorten' => [
                'en' => 'Loan term shortens — monthly payment stays the same.',
                'es' => 'El plazo del préstamo se acorta — el pago mensual permanece igual.',
            ],
            'section2_result' => [
                'en' => 'Result: You own your home sooner, and pay less in total.',
                'es' => 'Resultado: ¡Posee su casa antes y paga menos en total!',
            ],
            'section2_graph2_tip' => [
                'en' => 'Making additional payments reduces your principal balance faster, allowing you to build equity quicker and potentially saving thousands in interest over the life of your loan.',
                'es' => 'Realizar pagos adicionales reduce su saldo principal más rápido, lo que le permite generar capital más rápidamente y potencialmente ahorrar miles en intereses durante la vida de su préstamo.',
            ],
            'section2_image_url' => 'understanding_loan/payoff_loans_faster.png',
        ]);
    }
}
