<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroSection extends Model
{
    protected $table = 'hero_section';
    protected $fillable = [
        'slogan',
        'heading_part1',
        'heading_part2',
        'heading_part3',
        'sub_heading',
    ];

    public function heroItems()
    {
        return $this->hasMany(HeroItem::class, 'hero_section_id');
    }
}
