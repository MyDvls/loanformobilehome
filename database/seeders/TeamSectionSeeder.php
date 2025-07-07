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
            'bio' => 'Grayson Gibson is co-founder and CEO of Mobile Fund Services LLC. He brings more than ten years of executive experience lending to the manufactured housing market. As a licensed Mortgage Loan Originator and CEO, he has provided essential aid in financing affordable housing in the Colorado Front Range. Mr. Gibson has funded over $10 million in manufactured home loans in the past couple of years. Previously, Grayson worked as VP at Sam’s Housing LLC., a manufactured home retail agency, and doubled the business’s income which is grossing over $60 million in sales over the past 15 years. While working for Sam’s Housing he developed a deep knowledge of the industry, its target markets, and business gaps, which led to the creation of Mobile Fund Service. 

            Born and raised in Colorado, Grayson started his career while still attending college by personally financing manufactured homes. Once out of college he pursued a career as a financial advisor with Northwestern Mutual while still being a retailer and financier of manufactured housing. Grayson saw the growing opportunity in the latter sector and decided to work with Sam’s Housing full-time while, in parallel, creating his own company with Cord Mossberg. 

            After living one year abroad, Mr. Gibson married Maria Del Pilar, a Mexico City native. He has found a growing love and connection for Mexican culture. Fluent in Spanish, he enjoys learning and working with the Hispanic community in Colorado as well as assisting in their need for affordable housing. Mr. Gibson holds B.S in Finance and Computer Information Systems from Colorado State University.',
            'image_path' => 'images/grayson-ceo_orig.jpg',
            'order' => 1,
        ]);

        TeamMember::create([
            'team_section_id' => $section->id,
            'name' => 'Cord Mossberg',
            'role' => 'COO',
            'bio' => 'Cord W. Mossberg: Mr. Mossberg is a 10 year veteran of Wall Street. Having first worked with trading clients on various trading exchange floors including the New York Stock Exchange, American Stock Exchange, Chicago Board Options Exchange, Mr. Mossberg later transitioned to support and assist more institutional investment clients. While growing his client base across different investor profiles, Mr. Mossberg supported clients in investing in various asset classes including US-listed Equities, Equity Options, and Futures. By maintaining relationships with the different investors, Mr. Mossberg has continued to learn and understand the various approaches to investing.

            A Colorado native, Mr. Mossberg ultimately wanted to return to his roots and use his investing knowledge in his home state. After a brief time in Mexico, where Mr. Mossberg lived to study Spanish and research the opportunities in lending internationally, he found that there was great potential in helping lower-income families procure financial stability. He returned to Colorado where he connected with his good friend and business partner Grayson Gibson. Combining Mr. Gibson’s knowledge of the Manufactured Home industry with his own investing experience, Mr. Mossberg and Mr. Gibson started Mobile Fund Services, LLC.

            Mr. Mossberg holds Financial Industry Regulatory Authority (FINRA/NASD) Licenses Series 7, Series 63, Series 4, Series 3.',
            'image_path' => 'images/cord-cfo.jpg',
            'order' => 2,
        ]);
    }
}
