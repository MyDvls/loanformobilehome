<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Spatie\Translatable\HasTranslations;

class LoanItem extends Model
{
    use HasTranslations;

    public $translatable = ['title', 'description'];

    protected $fillable = ['loan_section_id', 'title', 'description', 'image_path'];

    public function loanSection()
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
