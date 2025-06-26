<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RequirementItem extends Model
{
    protected $fillable = [
        'requirement_section_id',
        'title',
        'description',
        'image_path',
    ];

    public function requirementSection(): BelongsTo
    {
        return $this->belongsTo(RequirementSection::class);
    }
}
