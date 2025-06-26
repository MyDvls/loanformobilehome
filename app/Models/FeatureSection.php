<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FeatureSection extends Model
{
    protected $table = 'feature_section';
    protected $fillable = [
        'title',
    ];

    public function featureItems(): HasMany
    {
        return $this->hasMany(FeatureItem::class);
    }
}
