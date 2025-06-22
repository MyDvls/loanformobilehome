import AnimateOnView from '@/components/AnimateOnView';
import Features from '@/components/Features';
import ProcessSteps from '@/components/ProcessSteps';
import Requirements from '@/components/Requirements';
import TestimonialSection from '@/components/TestimonialSection';
import { Hero } from '@/components/ui/Hero';
import LandingLayout from '@/layouts/landing-layout';
import { Head } from '@inertiajs/react';

export default function Home({
    hero,
    loanSection,
    requirementsSection,
    featuresSection,
    locale,
}: {
    hero: any;
    loanSection: any;
    requirementsSection: any;
    featuresSection: any;
    locale: string;
}) {
    return (
        <LandingLayout>
            <Head title="Home" />
            <div className="flex min-h-screen flex-col">
                <AnimateOnView delay={0.2}>
                    <Hero hero={hero} />
                </AnimateOnView>
                <ProcessSteps loanSection={loanSection} />
                <Requirements requirementsSection={requirementsSection} />
                <Features featuresSection={featuresSection} />
                <div className="h-[80px]"></div>
                <TestimonialSection />
            </div>
        </LandingLayout>
    );
}
