import ApplicationForm from '@/components/ApplicationForm';
import PageTransition from '@/components/PageTransition';
import { Card } from '@/components/ui/card';
import LandingLayout from '@/layouts/landing-layout';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

const Apply = () => {
    const { t } = useTranslation();

    return (
        <LandingLayout>
            <PageTransition>
                <Head title="Home" />
                <div className="container mx-auto px-4 py-8">
                    <Card className="mx-auto max-w-4xl p-8">
                        <h1 className="mb-8 text-center text-3xl font-bold">{t('apply.title')}</h1>
                        <ApplicationForm />
                    </Card>
                </div>
            </PageTransition>
        </LandingLayout>
    );
};

export default Apply;
