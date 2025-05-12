import { Card } from '@/components/ui/card';
import { Banknote, CreditCard, FileCheck, FileKey, FileText, UserCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AnimateOnView from './AnimateOnView';

const requirements = [
    {
        icon: CreditCard,
        title: 'requirements.item1.title',
        description: 'requirements.item1.description',
    },
    {
        icon: FileText,
        title: 'requirements.item2.title',
        description: 'requirements.item2.description',
    },
    {
        icon: FileCheck,
        title: 'requirements.item3.title',
        description: 'requirements.item3.description',
    },
    {
        icon: UserCheck,
        title: 'requirements.item4.title',
        description: 'requirements.item4.description',
    },
    {
        icon: FileKey,
        title: 'requirements.item5.title',
        description: 'requirements.item5.description',
    },
    {
        icon: Banknote,
        title: 'requirements.item6.title',
        description: 'requirements.item6.description',
    },
];

const Requirements = () => {
    const { t } = useTranslation();
    return (
        <section className="bg-gradient-to-b from-gray-50 to-gray-200 py-20 dark:from-gray-600 dark:to-gray-500">
            <div className="container mx-auto px-4">
                <h2 className="mb-4 text-center text-4xl font-bold">{t('requirements.title')}</h2>
                <p className="mb-12 text-center text-xl text-gray-600 dark:text-gray-200">{t('requirements.subtitle')}</p>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {requirements.map((req, index) => (
                        <AnimateOnView key={index} delay={0.2}>
                            <Card
                                key={index}
                                className="group transform p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:ring-2 hover:ring-blue-500"
                            >
                                <div className="flex items-start space-x-4">
                                    <div className="transform transition-transform duration-500 ease-in-out group-hover:rotate-[360deg]">
                                        <req.icon className="h-8 w-8 flex-shrink-0 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="mb-2 text-lg font-semibold">{t(req.title)}</h3>
                                        <p className="text-gray-600 dark:text-gray-400">{t(req.description)}</p>
                                    </div>
                                </div>
                            </Card>
                        </AnimateOnView>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Requirements;
