<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Spatie\Translatable\HasTranslations;

class LoanSection extends Model
{
    use HasTranslations;

    public $translatable = ['title'];

    protected $fillable = ['title'];

    public function loanItems()
    {
        return $this->hasMany(LoanItem::class);
    }
}
