import AnimateOnView from '@/components/AnimateOnView';
import { Features } from '@/components/Features';
import ProcessSteps from '@/components/ProcessSteps';
import Requirements from '@/components/Requirements';
import TestimonialSection from '@/components/TestimonialSection';
import { Hero } from '@/components/ui/Hero';
import LandingLayout from '@/layouts/landing-layout';
import { Head } from '@inertiajs/react';

export default function Home() {
    return (
        <LandingLayout>
            <Head title="Home" />
            {/* <PageTransition> */}
            <div className="flex min-h-screen flex-col">
                <AnimateOnView delay={0.2}>
                    <Hero />
                </AnimateOnView>
                <ProcessSteps />
                <Requirements />
                <Features />
                <div className="h-[80px]"></div>
                <TestimonialSection />
            </div>
            {/* </PageTransition> */}
        </LandingLayout>
    );
}
