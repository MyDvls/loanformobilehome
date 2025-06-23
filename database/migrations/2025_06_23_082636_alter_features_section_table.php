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
        Schema::create('feature_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('feature_section_id');
            $table->json('title');
            $table->json('description');
            $table->string('image_path')->nullable();
            $table->timestamps();
        });

        Schema::table('features_sections', function (Blueprint $table) {
            $table->dropColumn('feature1_title');
            $table->dropColumn('feature1_description');
            $table->dropColumn('feature2_title');
            $table->dropColumn('feature2_description');
            $table->dropColumn('feature3_title');
            $table->dropColumn('feature3_description');
            $table->dropColumn('feature4_title');
            $table->dropColumn('feature4_description');
            $table->dropColumn('feature5_title');
            $table->dropColumn('feature5_description');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('feature_items');

        Schema::table('features_sections', function (Blueprint $table) {
            $table->json('feature1_title')->nullable();
            $table->json('feature1_description')->nullable();
            $table->json('feature2_title')->nullable();
            $table->json('feature2_description')->nullable();
            $table->json('feature3_title')->nullable();
            $table->json('feature3_description')->nullable();
            $table->json('feature4_title')->nullable();
            $table->json('feature4_description')->nullable();
            $table->json('feature5_title')->nullable();
            $table->json('feature5_description')->nullable();
        });
    }
};
