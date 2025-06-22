<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('loan_sections', function (Blueprint $table) {
            $table->id();
            $table->json('title')->nullable();
            $table->json('step1_title')->nullable();
            $table->json('step1_description')->nullable();
            $table->string('step1_image_path')->nullable();
            $table->json('step2_title')->nullable();
            $table->json('step2_description')->nullable();
            $table->string('step2_image_path')->nullable();
            $table->json('step3_title')->nullable();
            $table->json('step3_description')->nullable();
            $table->string('step3_image_path')->nullable();
            $table->json('step4_title')->nullable();
            $table->json('step4_description')->nullable();
            $table->string('step4_image_path')->nullable();
            $table->json('step5_title')->nullable();
            $table->json('step5_description')->nullable();
            $table->string('step5_image_path')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('loan_sections');
    }
};
