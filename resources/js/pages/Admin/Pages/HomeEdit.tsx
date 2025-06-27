import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import AdminLayout from '../AdminLayout';
import SectionWrapper from '../components/SectionWrapper';
import FeaturesEdit from './FeaturesEdit';
import HeroEdit from './HeroEdit';
import LoanEdit from './LoanEdit';
import RequirementsEdit from './RequirementsEdit';
import TestimonialSectionEdit from './TestimonialsEdit';

interface HeroSection {
    slogan?: { en: string; es: string };
    heading_part1?: { en: string; es: string };
    heading_part2?: { en: string; es: string };
    heading_part3?: { en: string; es: string };
    sub_heading?: { en: string; es: string };
    image_url?: string;
}

interface Requirement {
    icon: { en: string; es: string };
    title: { en: string; es: string };
    description: { en: string; es: string };
}

interface Feature {
    title: { en: string; es: string };
    description: { en: string; es: string };
}

interface RequirementsSection {
    title?: { en: string; es: string };
    subtitle?: { en: string; es: string };
    requirement1?: Requirement;
    requirement2?: Requirement;
    requirement3?: Requirement;
    requirement4?: Requirement;
    requirement5?: Requirement;
    requirement6?: Requirement;
}

interface FeaturesSection {
    title?: { en: string; es: string };
    feature1?: Feature;
    feature2?: Feature;
    feature3?: Feature;
    feature4?: Feature;
    feature5?: Feature;
}

interface LoanItem {
    id?: number;
    title: { en: string; es: string };
    description: { en: string; es: string };
    image_path?: string;
}

interface FeatureItem {
    id?: number;
    title: { en: string; es: string };
    description: { en: string; es: string };
    image_path?: string;
}

interface LoanSection {
    id?: number;
    title?: { en: string; es: string };
}

interface HomeEditProps {
    hero: HeroSection;
    loanSection: LoanSection;
    loanItems: LoanItem[];
    requirementsSection: RequirementsSection;
    featuresSection: FeaturesSection;

    featureItems: FeatureItem[];

    testimonialsSection?: {
        id?: number;
        post: string;
        full_name: string;
        heading: string;
    }[];
}

export default function HomeEdit({
    hero,
    loanSection,
    loanItems,
    requirementsSection,
    featuresSection,
    featureItems,
    testimonialsSection,
}: HomeEditProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Web Pages', href: null },
        { title: 'Homepage', href: '/admin/pages/home' },
    ];

    return (
        <AppLayout>
            <Head title="Edit Homepage" />
            <AdminLayout title="Edit Homepage" subtitle="Web Pages" breadcrumbs={breadcrumbs}>
                <div className="container mx-auto py-6">
                    <div>
                        <SectionWrapper title="Hero Section" defaultOpen={true}>
                            <HeroEdit hero={hero} />
                        </SectionWrapper>
                        <SectionWrapper title="Loan Section">
                            <LoanEdit loanSection={loanSection} loanItems={loanItems} />
                        </SectionWrapper>
                        <SectionWrapper title="Requirements Section">
                            <RequirementsEdit requirementsSection={requirementsSection} />
                        </SectionWrapper>
                        <SectionWrapper title="Features Section">
                            <FeaturesEdit featuresSection={featuresSection} featureItems={featureItems} />
                        </SectionWrapper>
                        <SectionWrapper title="Testimonial Section">
                            <TestimonialSectionEdit testimonialsSection={testimonialsSection} />
                        </SectionWrapper>
                    </div>
                </div>
            </AdminLayout>
        </AppLayout>
    );
}
