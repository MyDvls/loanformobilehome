<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class LoanItem extends Model
{
    protected $fillable = [
        'loan_section_id',
        'title',
        'description',
        'image_path',
    ];

    public function loanSection(): BelongsTo
    {
        return $this->belongsTo(LoanSection::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($loanItem) {
            if ($loanItem->image_path) {
                Storage::disk('public')->delete(str_replace('public/', '', $loanItem->image_path));
            }
        });
    }
}
