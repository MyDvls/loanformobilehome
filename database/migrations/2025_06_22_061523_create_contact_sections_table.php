<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContactSectionsTable extends Migration
{
    public function up()
    {
        Schema::create('contact_sections', function (Blueprint $table) {
            $table->id();
            $table->json('company_name')->nullable();
            $table->json('address')->nullable();
            $table->json('email')->nullable();
            $table->json('telephone')->nullable();
            $table->json('working_hours')->nullable();
            $table->string('logo_path')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('contact_sections');
    }
}
