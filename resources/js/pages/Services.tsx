import AnimateOnView from '@/components/AnimateOnView';
import LandingLayout from '@/layouts/landing-layout';
import { Head } from '@inertiajs/react';
import { DollarSign, FileText, Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const services = [
    {
        icon: Home,
        title: 'services.mortgage.title',
        description: 'services.mortgage.description',
    },
    {
        icon: FileText,
        title: 'services.closing.title',
        description: 'services.closing.description',
    },
    {
        icon: DollarSign,
        title: 'services.investment.title',
        description: 'services.investment.description',
    },
];

const Services = () => {
    const { t } = useTranslation();

    return (
        <LandingLayout>
            <Head title={t('services.title')} />
            <section className="relative overflow-visible bg-gradient-to-b from-gray-50 to-gray-200 py-20 dark:from-gray-800 dark:to-gray-700">
                <div className="relative z-10 container mx-auto px-4">
                    <AnimateOnView delay={0.2}>
                        <h2 className="mb-10 text-center text-4xl font-bold text-gray-800 dark:text-white">{t('services.title')}</h2>
                        <p className="mb-12 text-center text-xl text-gray-600 dark:text-gray-300">{t('services.subtitle')}</p>
                    </AnimateOnView>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {services.map((service, index) => (
                            <AnimateOnView key={index} delay={0.5 + index * 0.5}>
                                <div className="flex flex-col items-center rounded-lg bg-white p-6 shadow-lg transition-transform duration-300 hover:scale-105 dark:bg-gray-800">
                                    <div className="mb-4">
                                        <service.icon size={48} className="text-purple-500 dark:text-purple-400" />
                                    </div>
                                    <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">{t(service.title)}</h3>
                                    <p className="text-center text-gray-600 dark:text-gray-300">{t(service.description)}</p>
                                </div>
                            </AnimateOnView>
                        ))}
                    </div>
                </div>
            </section>
        </LandingLayout>
    );
};

export default Services;
