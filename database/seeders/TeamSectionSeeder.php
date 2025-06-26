<?php

namespace Database\Seeders;

use App\Models\TeamSection;
use App\Models\TeamMember;
use Illuminate\Database\Seeder;

class TeamSectionSeeder extends Seeder
{
    public function run(): void
    {
        $section = TeamSection::create([
            'heading' => 'Our Team',
            'sub_heading' => 'Meet the experts behind our success',
        ]);

        TeamMember::create([
            'team_section_id' => $section->id,
            'name' => 'Grayson Gibson',
            'role' => 'CEO',
            'bio' => 'Grayson leads with vision and passion.',
            'image_path' => 'team/grayson-ceo.jpg',
            'order' => 1,
        ]);

        TeamMember::create([
            'team_section_id' => $section->id,
            'name' => 'Cord Mossberg',
            'role' => 'COO',
            'bio' => 'Cord ensures operational excellence.',
            'image_path' => 'team/cord-cfo.jpg',
            'order' => 2,
        ]);
    }
}
