<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Spatie\Translatable\HasTranslations;

class FeatureItem extends Model
{
    use HasTranslations;

    public $translatable = ['title', 'description'];

    protected $fillable = ['feature_section_id', 'title', 'description', 'image_path'];

    public function featureSection()
    {
        return $this->belongsTo(FeaturesSection::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($featureItem) {
            if ($featureItem->image_path) {
                Storage::disk('public')->delete(str_replace('public/', '', $featureItem->image_path));
            }
        });
    }
}
