import { Features } from '@/components/Features';
import ServicesSection from '@/components/ServicesSection';
import LandingLayout from '@/layouts/landing-layout';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

const Services = () => {
    const { t } = useTranslation();
    return (
        <LandingLayout>
            <Head title={t('nav.services')} />
            <ServicesSection />
            <Features />
            <div className="h-[88px]"></div>
        </LandingLayout>
    );
};

export default Services;
