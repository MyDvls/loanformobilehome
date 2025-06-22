<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('features_sections', function (Blueprint $table) {
            $table->id();
            $table->json('title');
            $table->json('feature1_title');
            $table->json('feature1_description');
            $table->json('feature2_title');
            $table->json('feature2_description');
            $table->json('feature3_title');
            $table->json('feature3_description');
            $table->json('feature4_title');
            $table->json('feature4_description');
            $table->json('feature5_title');
            $table->json('feature5_description');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('features_sections');
    }
};
