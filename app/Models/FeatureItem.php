<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class FeatureItem extends Model
{
    protected $fillable = [
        'features_section_id',
        'title',
        'description',
        'image_path',
    ];

    public function featureSection(): BelongsTo
    {
        return $this->belongsTo(FeatureSection::class);
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
