<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_type',
        'status',
        'first_name',
        'last_name',
        'middle_name',
        'birth_date',
        'gender',
        'email',
        'primary_address1',
        'primary_city',
        'primary_state',
        'primary_zipcode',
        'primary_country',
        'employer_company_name',
        'employer_title',
        'employer_hire_date',
        'employer_income',
        'employer_income_frequency',
        'primary_phone',
    ];

    protected $casts = [
        'birth_date' => 'date',
        'employer_hire_date' => 'date',
        'employer_income' => 'float',
    ];
}
