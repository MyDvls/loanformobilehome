import { Features } from '@/components/Features';
import ServicesSection from '@/components/ServicesSection';
import LandingLayout from '@/layouts/landing-layout';

const Services = () => {
    return (
        <div className="min-h-screen bg-[#FDFAF8]">
            <LandingLayout>
                <ServicesSection />
                <Features />
                <div className="h-[88px]"></div>
            </LandingLayout>
        </div>
    );
};

export default Services;
