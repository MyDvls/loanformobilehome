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
        Schema::create('requirements_sections', function (Blueprint $table) {
            $table->id();
            $table->json('title'); // Translatable title
            $table->json('subtitle'); // Translatable subtitle
            $table->json('requirement1_icon')->nullable();
            $table->json('requirement1_title');
            $table->json('requirement1_description');
            $table->json('requirement2_icon')->nullable();
            $table->json('requirement2_title');
            $table->json('requirement2_description');
            $table->json('requirement3_icon')->nullable();
            $table->json('requirement3_title');
            $table->json('requirement3_description');
            $table->json('requirement4_icon')->nullable();
            $table->json('requirement4_title');
            $table->json('requirement4_description');
            $table->json('requirement5_icon')->nullable();
            $table->json('requirement5_title');
            $table->json('requirement5_description');
            $table->json('requirement6_icon')->nullable();
            $table->json('requirement6_title');
            $table->json('requirement6_description');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('requirements_sections');
    }
};
