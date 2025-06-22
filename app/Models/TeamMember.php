<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class TeamMember extends Model
{
    use HasTranslations;

    protected $fillable = ['team_section_id', 'name', 'role', 'bio', 'image_path', 'order'];

    protected $translatable = ['name', 'role', 'bio'];

    public function section()
    {
        return $this->belongsTo(TeamSection::class, 'team_section_id');
    }
}
