<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Spatie\Translatable\HasTranslations;

class UnderstandingLoanSection extends Model
{
    use HasFactory, HasTranslations;

    protected $table = 'understanding_loan_sections';

    protected $fillable = [
        'title',
        'subtitle',
        'section1_title',
        'section1_description',
        'section1_principal',
        'section1_interest',
        'section1_escrow',
        'section1_graph1_title',
        'section1_tip',
        'section2_title',
        'section2_additional',
        'section2_interest_save',
        'section2_term_shorten',
        'section2_result',
        'section2_graph2_tip',
        'section2_image_url',
    ];

    public $translatable = [
        'title',
        'subtitle',
        'section1_title',
        'section1_description',
        'section1_principal',
        'section1_interest',
        'section1_escrow',
        'section1_graph1_title',
        'section1_tip',
        'section2_title',
        'section2_additional',
        'section2_interest_save',
        'section2_term_shorten',
        'section2_result',
        'section2_graph2_tip',
    ];

    /**
     * Get the section2 image URL with storage path.
     */
    public function getSection2ImageUrlAttribute($value)
    {
        return $value ? Storage::url($value) : null;
    }
}
