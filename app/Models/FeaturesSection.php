<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class FeaturesSection extends Model
{
    use HasTranslations;

    public $translatable = ['title'];

    protected $fillable = ['title'];

    public function featureItems()
    {
        return $this->hasMany(FeatureItem::class, 'feature_section_id');
    }
}
