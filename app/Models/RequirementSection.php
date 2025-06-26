<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RequirementSection extends Model
{
    use HasFactory;

    protected $table = 'requirement_section';
    protected $fillable = [
        'title',
        'subtitle',
    ];

    public function requirementItems(): HasMany
    {
        return $this->hasMany(RequirementItem::class);
    }
}
