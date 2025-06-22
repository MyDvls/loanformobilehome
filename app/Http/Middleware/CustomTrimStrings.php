<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\TrimStrings as Middleware;
use Illuminate\Support\Facades\Log;

class CustomTrimStrings extends Middleware
{
    protected function transform($key, $value)
    {
        Log::info("Trimming value for key: $key", ['value' => $value]);
        // Skip trimming for specific keys
        if (in_array($key, [
            'slogan.en',
            'slogan.es',
            'heading_part1.en',
            'heading_part1.es',
            'heading_part2.en',
            'heading_part2.es',
            'heading_part3.en',
            'heading_part3.es',
            'sub_heading.en',
            'sub_heading.es'
        ])) {
            return $value;
        }

        return parent::transform($key, $value);
    }
}
