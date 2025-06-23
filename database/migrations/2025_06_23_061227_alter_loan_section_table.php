<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Http\Request;

return new class extends Migration
{
    public function up()
    {
        Schema::create('loan_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('loan_section_id')->constrained()->onDelete('cascade');
            $table->json('title');
            $table->json('description');
            $table->string('image_path')->nullable();
            $table->timestamps();
        });

        Schema::table('loan_sections', function (Blueprint $table) {
            $table->dropColumn('step1_title');
            $table->dropColumn('step1_description');
            $table->dropColumn('step1_image_path');
            $table->dropColumn('step2_title');
            $table->dropColumn('step2_description');
            $table->dropColumn('step2_image_path');
            $table->dropColumn('step3_title');
            $table->dropColumn('step3_description');
            $table->dropColumn('step3_image_path');
            $table->dropColumn('step4_title');
            $table->dropColumn('step4_description');
            $table->dropColumn('step4_image_path');
            $table->dropColumn('step5_title');
            $table->dropColumn('step5_description');
            $table->dropColumn('step5_image_path');
        });
    }

    public function down()
    {
        Schema::dropIfExists('loan_items');

        Schema::table('loan_sections', function (Blueprint $table) {
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
        });
    }
};
