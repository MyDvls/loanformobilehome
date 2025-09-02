<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LoanSection extends Model
{
    protected $table = 'loan_section';

    protected $fillable = [
        'title',
    ];

    public function loanItems(): HasMany
    {
        return $this->hasMany(LoanItem::class);
    }
}
