<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactSection extends Model
{
    protected $table = 'contact_section';

    protected $fillable = [
        'company_name',
        'address',
        'email',
        'telephone',
        'working_hours',
        'logo_path',
    ];
}
