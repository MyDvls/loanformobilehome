<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('team_section', function (Blueprint $table) {
            $table->id();
            $table->text('heading');
            $table->text('sub_heading');
            $table->timestamps();
        });

        Schema::create('team_members', function (Blueprint $table) {
            $table->id();
            $table->foreignId('team_section_id')->constrained('team_section')->onDelete('cascade');
            $table->text('name');
            $table->text('role');
            $table->text('bio');
            $table->string('image_path')->nullable();
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('team_section');
        Schema::dropIfExists('team_members');
    }
};
