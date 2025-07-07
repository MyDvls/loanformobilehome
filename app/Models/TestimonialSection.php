<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TestimonialSection extends Model
{
    protected $table = 'testimonial_section';

    protected $fillable = [
        'post',
        'full_name',
        'heading',
    ];
}
