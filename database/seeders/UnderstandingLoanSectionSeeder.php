<?php

namespace Database\Seeders;

use App\Models\UnderstandingLoanSection;
use Illuminate\Database\Seeder;

class UnderstandingLoanSectionSeeder extends Seeder
{
    public function run(): void
    {
        UnderstandingLoanSection::create([
            'title' => 'Understanding Your Loan',
            'subtitle' => 'Get clarity on your loan payments and how to pay off your loan smarter and faster.',
            'section1_title' => 'How Your Monthly Payment Works',
            'section1_description' => 'When you take on a loan, your monthly payment is a combination of principal and interest. Though your monthly payment amount stays the same, the division between principal and interest changes as you pay it down.',
            'section1_principal' => 'Principal Debt (loan amount)',
            'section1_interest' => 'Interest (cost of borrowing)',
            'section1_escrow' => 'Escrow (taxes + insurance) independent from MFS',
            'section1_tip' => 'At the start, most of your payment goes toward interest. Over time, more goes toward paying off your principal debt.',
            'section1_graph1_title' => 'How Does Interest Work on my Loan?',
            'section2_title' => 'Making Additional Payments',
            'section2_additional' => 'Additional payments = pay off faster!',
            'section2_interest_save' => 'Extra payments go directly to the Principal. You save on interest.',
            'section2_term_shorten' => 'Loan term shortens — monthly payment stays the same.',
            'section2_result' => 'Result: You own your home sooner, and pay less in total.',
            'section2_graph2_tip' => 'Making additional payments reduces your principal balance faster, allowing you to build equity quicker and potentially saving thousands in interest over the life of your loan.',
            'section2_image_url' => 'understanding_loan/payoff_loans_faster.png',
        ]);
    }
}
