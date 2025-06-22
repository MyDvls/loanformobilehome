<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Translatable\HasTranslations;

class ServiceItem extends Model
{
    use HasFactory, HasTranslations;

    protected $fillable = [
        'service_section_id',
        'title',
        'description',
        'image_path',
    ];

    protected $translatable = ['title', 'description'];

    protected $casts = [
        'title' => 'array',
        'description' => 'array',
    ];

    public function section()
    {
        return $this->belongsTo(ServiceSection::class, 'service_section_id');
    }
}
