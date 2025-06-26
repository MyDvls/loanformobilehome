<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContactSectionsTable extends Migration
{
    public function up()
    {
        Schema::create('contact_section', function (Blueprint $table) {
            $table->id();
            $table->text('company_name')->nullable();
            $table->text('address')->nullable();
            $table->text('email')->nullable();
            $table->text('telephone')->nullable();
            $table->text('working_hours')->nullable();
            $table->string('logo_path')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('contact_section');
    }
}
