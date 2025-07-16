import AnimateOnView from '@/components/AnimateOnView';
import Features from '@/components/Features';
import LoanCalculator from '@/components/LoanCalculator';
import ProcessSteps from '@/components/ProcessSteps';
import Requirements from '@/components/Requirements';
import TestimonialSection from '@/components/TestimonialSection';
import { Hero } from '@/components/ui/Hero';
import LandingLayout from '@/layouts/landing-layout';
import { Head } from '@inertiajs/react';

interface Step {
    id?: number;
    title: string;
    description: string;
    image_url: string | null;
}

interface FeatureItem {
    id?: number;
    title: string;
    description: string;
}

interface Props {
    hero: any;
    heroItems: { id: number; image_path: string }[] | null;
    loanSection: { title: string } | null;
    loanItems: Step[];
    requirementsSection: any;
    requirementItems: Step[];
    featuresSection: { title: string } | null;
    featureItems: FeatureItem[];

    testimonialSection: any[];
    locale: string;
}

export default function Home({
    hero,
    heroItems,
    loanSection,
    loanItems,
    requirementsSection,
    requirementItems,
    featuresSection,
    featureItems,
    testimonialSection,
    locale,
}: Props) {
    return (
        <LandingLayout>
            <Head title="Home" />
            <div className="flex min-h-screen flex-col">
                <AnimateOnView delay={0.2}>
                    <Hero hero={hero} heroItems={heroItems} />
                </AnimateOnView>
                <ProcessSteps loanSection={loanSection} loanItems={loanItems} />
                <Requirements requirementsSection={requirementsSection} requirementItems={requirementItems} />
                <Features featuresSection={featuresSection} featureItems={featureItems} />
                <div className="h-[80px]"></div>
                <TestimonialSection testimonialsSection={testimonialSection} />
                <AnimateOnView delay={1.5}>
                    <div className="mt-12 w-full px-4 max-sm:px-2 sm:mt-16 sm:px-8 md:mt-20 md:px-16 lg:px-24 xl:px-32">
                        <div className="flex w-full min-w-0 flex-col justify-center rounded-2xl border border-solid border-[#F9F0E9] bg-[#FDFAF8] p-4 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.20),0px_4px_5px_0px_rgba(0,0,0,0.14),0px_1px_10px_0px_rgba(0,0,0,0.12)] sm:p-6 md:p-8 dark:border-[#4A4A4A] dark:bg-[#333333]">
                            <h3 className="mb-6 text-start text-2xl font-bold text-gray-800 sm:text-3xl md:text-4xl dark:text-white">
                                Loan Calculator
                            </h3>
                            <LoanCalculator />
                        </div>
                    </div>
                </AnimateOnView>
                <div className="h-[80px]"></div>
            </div>
        </LandingLayout>
    );
}
