<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class FeaturesSection extends Model
{
    use HasFactory, HasTranslations;

    protected $fillable = [
        'title',
        'feature1_title',
        'feature1_description',
        'feature2_title',
        'feature2_description',
        'feature3_title',
        'feature3_description',
        'feature4_title',
        'feature4_description',
        'feature5_title',
        'feature5_description',
    ];

    public $translatable = [
        'title',
        'feature1_title',
        'feature1_description',
        'feature2_title',
        'feature2_description',
        'feature3_title',
        'feature3_description',
        'feature4_title',
        'feature4_description',
        'feature5_title',
        'feature5_description',
    ];

    protected $casts = [
        'title' => 'array',
        'feature1_title' => 'array',
        'feature1_description' => 'array',
        'feature2_title' => 'array',
        'feature2_description' => 'array',
        'feature3_title' => 'array',
        'feature3_description' => 'array',
        'feature4_title' => 'array',
        'feature4_description' => 'array',
        'feature5_title' => 'array',
        'feature5_description' => 'array',
    ];
}
