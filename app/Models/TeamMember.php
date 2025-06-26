<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TeamMember extends Model
{
    protected $fillable = [
        'team_section_id',
        'name',
        'role',
        'bio',
        'image_path',
        'order',
    ];

    public function teamSection(): BelongsTo
    {
        return $this->belongsTo(TeamSection::class);
    }
}
