<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;
use Illuminate\Support\Facades\Storage;

class HeroSection extends Model
{
    use HasTranslations;

    protected $fillable = [
        'slogan',
        'heading_part1',
        'heading_part2',
        'heading_part3',
        'sub_heading',
        'image_path',
    ];

    public $translatable = [
        'slogan',
        'heading_part1',
        'heading_part2',
        'heading_part3',
        'sub_heading',
    ];

    protected $casts = [
        'slogan' => 'array',
        'heading_part1' => 'array',
        'heading_part2' => 'array',
        'heading_part3' => 'array',
        'sub_heading' => 'array',
    ];

    public function getImageUrlAttribute()
    {
        return $this->image_path ? Storage::url($this->image_path) : null;
    }
}
