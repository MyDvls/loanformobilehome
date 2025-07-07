<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Visit extends Model
{
    protected $fillable = [
        'visited_at',
        'ip_address', // Optional
        'user_agent', // Optional
    ];

    protected $casts = [
        'visited_at' => 'datetime',
    ];
}
