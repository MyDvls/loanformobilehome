<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('understanding_loan_section', function (Blueprint $table) {
            $table->id();
            $table->text('title')->nullable(); // Translatable: "Understanding Your Loan"
            $table->text('subtitle')->nullable(); // Translatable: Subtitle
            // Section 1: How Your Monthly Payment Works
            $table->text('section1_title')->nullable(); // Translatable: "How Your Monthly Payment Works"
            $table->text('section1_description')->nullable(); // Translatable: Description
            $table->text('section1_principal')->nullable(); // Translatable: Principal description
            $table->text('section1_interest')->nullable(); // Translatable: Interest description
            $table->text('section1_escrow')->nullable(); // Translatable: Escrow description
            $table->text('section1_graph1_title')->nullable(); // Translatable: "Your Monthly Payment"
            $table->text('section1_tip')->nullable(); // Translatable: Tip
            // Section 2: Making Additional Payments
            $table->text('section2_title')->nullable(); // Translatable: "Making Additional Payments"
            $table->text('section2_additional')->nullable(); // Translatable: Additional payments description
            $table->text('section2_interest_save')->nullable(); // Translatable: Save on interest
            $table->text('section2_term_shorten')->nullable(); // Translatable: Shorten loan term
            $table->text('section2_result')->nullable(); // Translatable: Accelerate equity growth
            $table->text('section2_graph2_tip')->nullable(); // Translatable: Tip
            $table->string('section2_image_url')->nullable(); // Image: e.g., "understanding_loan/section2_image.jpg"
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('understanding_loan_section');
    }
};
