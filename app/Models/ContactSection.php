<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class ContactSection extends Model
{
    use HasFactory, HasTranslations;

    protected $fillable = [
        'company_name',
        'address',
        'email',
        'telephone',
        'working_hours',
        'logo_path',
    ];

    public $translatable = [
        'company_name',
        'address',
        'email',
        'telephone',
        'working_hours',
    ];

    protected $casts = [
        'company_name' => 'array',
        'address' => 'array',
        'email' => 'array',
        'telephone' => 'array',
        'working_hours' => 'array',
    ];
}