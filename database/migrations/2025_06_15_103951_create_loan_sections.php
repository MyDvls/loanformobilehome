<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('loan_section', function (Blueprint $table) {
            $table->id();
            $table->text('title')->nullable();
            $table->timestamps();
        });

        Schema::create('loan_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('loan_section_id')
                ->constrained('loan_section')
                ->onDelete('cascade');
            $table->text('title');
            $table->text('description');
            $table->string('image_path')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('loan_section');
        Schema::dropIfExists('loan_items');
    }
};
