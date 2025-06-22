import Features from '@/components/Features';
import ServicesSection from '@/components/ServicesSection';
import LandingLayout from '@/layouts/landing-layout';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

interface ServicesProps {
    serviceSection: any;
    serviceItems: any;
    locale: any;
    featuresSection: any;
}

const Services = ({ serviceSection, serviceItems, locale, featuresSection }: ServicesProps) => {
    const { t } = useTranslation();
    return (
        <LandingLayout>
            <Head title={t('nav.services')} />
            <ServicesSection serviceSection={serviceSection} serviceItems={serviceItems} />
            <Features featuresSection={featuresSection} />
            <div className="h-[88px]"></div>
        </LandingLayout>
    );
};

export default Services;
