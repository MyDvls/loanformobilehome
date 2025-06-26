<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ServiceSection extends Model
{
    use HasFactory;

    protected $table = 'service_section';
    protected $fillable = ['heading', 'sub_heading'];

    public function items()
    {
        return $this->hasMany(ServiceItem::class);
    }
}
