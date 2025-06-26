<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('feature_section', function (Blueprint $table) {
            $table->id();
            $table->text('title');
            $table->timestamps();
        });

        Schema::create('feature_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('feature_section_id');
            $table->text('title');
            $table->text('description');
            $table->string('image_path')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('feature_section');
        Schema::dropIfExists('feature_items');
    }
};
