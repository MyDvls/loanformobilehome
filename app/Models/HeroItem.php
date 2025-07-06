<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroItem extends Model
{
    protected $table = 'hero_items';

    protected $fillable = [
        'hero_section_id',
        'image_path',
    ];

    public function heroSection()
    {
        return $this->belongsTo(HeroSection::class, 'hero_section_id');
    }
}
