<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Translatable\HasTranslations;

class ServiceSection extends Model
{
    use HasFactory, HasTranslations;

    protected $fillable = ['heading', 'sub_heading'];

    protected $casts = [
        'heading' => 'array',
        'sub_heading' => 'array',
    ];

    protected $translatable = ['heading', 'sub_heading'];

    public function items()
    {
        return $this->hasMany(ServiceItem::class);
    }
}
