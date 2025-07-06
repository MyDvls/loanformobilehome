<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hero_section', function (Blueprint $table) {
            $table->id();
            $table->text('slogan');
            $table->text('heading_part1');
            $table->text('heading_part2');
            $table->text('heading_part3');
            $table->text('sub_heading');
            $table->timestamps();
        });

         Schema::create('hero_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('hero_section_id')
                ->constrained('hero_section')
                ->onDelete('cascade');
            $table->string('image_path')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hero_section');
        Schema::dropIfExists('hero_items');
    }
};
