<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ServiceItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_section_id',
        'title',
        'description',
        'image_path',
    ];

    public function section()
    {
        return $this->belongsTo(ServiceSection::class, 'service_section_id');
    }
}
