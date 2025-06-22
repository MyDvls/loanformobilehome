<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Spatie\Translatable\HasTranslations;

class LoanSection extends Model
{
    use HasFactory, HasTranslations;

    protected $fillable = [
        'title',
        'step1_title',
        'step1_description',
        'step1_image_path',
        'step2_title',
        'step2_description',
        'step2_image_path',
        'step3_title',
        'step3_description',
        'step3_image_path',
        'step4_title',
        'step4_description',
        'step4_image_path',
        'step5_title',
        'step5_description',
        'step5_image_path',
    ];

    public $translatable = [
        'title',
        'step1_title',
        'step1_description',
        'step2_title',
        'step2_description',
        'step3_title',
        'step3_description',
        'step4_title',
        'step4_description',
        'step5_title',
        'step5_description',
    ];

    public function getStep1ImageUrlAttribute()
    {
        return $this->step1_image_path ? Storage::url($this->step1_image_path) : null;
    }

    public function getStep2ImageUrlAttribute()
    {
        return $this->step2_image_path ? Storage::url($this->step2_image_path) : null;
    }

    public function getStep3ImageUrlAttribute()
    {
        return $this->step3_image_path ? Storage::url($this->step3_image_path) : null;
    }

    public function getStep4ImageUrlAttribute()
    {
        return $this->step4_image_path ? Storage::url($this->step4_image_path) : null;
    }

    public function getStep5ImageUrlAttribute()
    {
        return $this->step5_image_path ? Storage::url($this->step5_image_path) : null;
    }
}
