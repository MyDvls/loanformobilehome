<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class TeamSection extends Model
{
    use HasTranslations;

    protected $fillable = ['heading', 'sub_heading'];

    protected $translatable = ['heading', 'sub_heading'];

    public function members()
    {
        return $this->hasMany(TeamMember::class);
    }
}
