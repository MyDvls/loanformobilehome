<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('customer_type')->default('customer.type.individual');
            $table->string('status')->default('Lead');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('middle_name')->nullable();
            $table->date('birth_date')->nullable();
            $table->string('gender')->nullable();
            $table->string('email')->unique();
            $table->string('primary_address1')->nullable();
            $table->string('primary_city')->nullable();
            $table->string('primary_state')->nullable();
            $table->string('primary_zipcode')->nullable();
            $table->string('primary_country')->nullable();
            $table->string('employer_company_name')->nullable();
            $table->string('employer_title')->nullable();
            $table->date('employer_hire_date')->nullable();
            $table->decimal('employer_income', 15, 2)->nullable();
            $table->string('employer_income_frequency')->nullable();
            $table->string('primary_phone')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
