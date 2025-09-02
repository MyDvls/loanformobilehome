<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TeamSection extends Model
{
    protected $table = 'team_section';

    protected $fillable = [
        'heading',
        'sub_heading',
    ];

    public function teamMembers(): HasMany
    {
        return $this->hasMany(TeamMember::class);
    }
}
