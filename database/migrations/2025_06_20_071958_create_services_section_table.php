<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('service_section', function (Blueprint $table) {
            $table->id();
            $table->text('heading')->nullable();
            $table->text('sub_heading')->nullable();
            $table->timestamps();
        });

        Schema::create('service_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_section_id')->constrained('service_section')->onDelete('cascade');
            $table->text('title')->nullable();
            $table->text('description')->nullable();
            $table->string('image_path')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('service_section');
        Schema::dropIfExists('service_items');
    }
};
