<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class RequirementsSection extends Model
{
    use HasFactory, HasTranslations;

    protected $fillable = [
        'title',
        'subtitle',
        'requirement1_icon',
        'requirement1_title',
        'requirement1_description',
        'requirement2_icon',
        'requirement2_title',
        'requirement2_description',
        'requirement3_icon',
        'requirement3_title',
        'requirement3_description',
        'requirement4_icon',
        'requirement4_title',
        'requirement4_description',
        'requirement5_icon',
        'requirement5_title',
        'requirement5_description',
        'requirement6_icon',
        'requirement6_title',
        'requirement6_description',
    ];

    public $translatable = [
        'title',
        'subtitle',
        'requirement1_icon',
        'requirement1_title',
        'requirement1_description',
        'requirement2_icon',
        'requirement2_title',
        'requirement2_description',
        'requirement3_icon',
        'requirement3_title',
        'requirement3_description',
        'requirement4_icon',
        'requirement4_title',
        'requirement4_description',
        'requirement5_icon',
        'requirement5_title',
        'requirement5_description',
        'requirement6_icon',
        'requirement6_title',
        'requirement6_description',
    ];

    protected $casts = [
        'title' => 'array',
        'subtitle' => 'array',
        'requirement1_icon' => 'array',
        'requirement1_title' => 'array',
        'requirement1_description' => 'array',
        'requirement2_icon' => 'array',
        'requirement2_title' => 'array',
        'requirement2_description' => 'array',
        'requirement3_icon' => 'array',
        'requirement3_title' => 'array',
        'requirement3_description' => 'array',
        'requirement4_icon' => 'array',
        'requirement4_title' => 'array',
        'requirement4_description' => 'array',
        'requirement5_icon' => 'array',
        'requirement5_title' => 'array',
        'requirement5_description' => 'array',
        'requirement6_icon' => 'array',
        'requirement6_title' => 'array',
        'requirement6_description' => 'array',
    ];
}
