<?php

namespace App\Http\Controllers;

use App\Models\TeamMember;
use App\Models\TeamSection;
use App\Services\TranslationService;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TeamController extends Controller
{
    public function index(TranslationService $translator)
    {
        $locale = app()->getLocale();

        $teamSection = TeamSection::first();
        $teamMembers = TeamMember::orderBy('id')->get();

        $sectionData = $teamSection ? [
            'heading' => $teamSection->heading,
            'sub_heading' => $teamSection->sub_heading,
        ] : null;

        $membersData = $teamMembers->map(fn ($m) => [
            'id' => $m->id,
            'name' => $m->name,
            'role' => $m->role,
            'bio' => $m->bio,
            'image_url' => $m->image_path ? Storage::url($m->image_path) : null,
        ])->toArray();

        if ($locale !== 'en') {
            $sectionData = $sectionData ? $translator->translateArray($sectionData, $locale) : null;
            $membersData = array_map(fn ($i) => $translator->translateArray($i, $locale), $membersData);
        }

        $props = [
            'teamSection' => $sectionData,
            'teamMembers' => $membersData,
            'locale' => $locale,
        ];

        return Inertia::render('Team', $props);
    }
}
