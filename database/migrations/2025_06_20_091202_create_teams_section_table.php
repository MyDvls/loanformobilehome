<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('team_sections', function (Blueprint $table) {
            $table->id();
            $table->json('heading');
            $table->json('sub_heading');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('team_sections');
    }
};