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
            'heading' => ['en' => 'Our Team', 'es' => 'Nuestro Equipo'],
            'sub_heading' => ['en' => 'Meet the experts behind our success', 'es' => 'Conoce a los expertos detrás de nuestro éxito'],
        ]);

        TeamMember::create([
            'team_section_id' => $section->id,
            'name' => ['en' => 'Grayson Gibson', 'es' => 'Grayson Gibson'],
            'role' => ['en' => 'CEO', 'es' => 'Director Ejecutivo'],
            'bio' => ['en' => 'Grayson leads with vision and passion.', 'es' => 'Grayson lidera con visión y pasión.'],
            'image_path' => 'team/grayson-ceo.jpg',
            'order' => 1,
        ]);

        TeamMember::create([
            'team_section_id' => $section->id,
            'name' => ['en' => 'Cord Mossberg', 'es' => 'Cord Mossberg'],
            'role' => ['en' => 'COO', 'es' => 'Director de Operaciones'],
            'bio' => ['en' => 'Cord ensures operational excellence.', 'es' => 'Cord asegura la excelencia operativa.'],
            'image_path' => 'team/cord-cfo.jpg',
            'order' => 2,
        ]);
    }
}
