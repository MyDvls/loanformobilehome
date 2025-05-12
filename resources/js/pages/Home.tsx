import AnimateOnView from '@/components/AnimateOnView';
import LanguageHoverButton from '@/components/LanguageHoverButton';
import PageTransition from '@/components/PageTransition';
import ProcessSteps from '@/components/ProcessSteps';
import Requirements from '@/components/Requirements';
import TestimonialSection from '@/components/TestimonialSection';
import LandingLayout from '@/layouts/landing-layout';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function Home() {
    const { t } = useTranslation();
    return (
        <LandingLayout>
            <Head title="Home" />
            <PageTransition>
                <div className="flex min-h-screen flex-col">
                    <AnimateOnView delay={0.2}>
                        <section className="bg-gradient-to-b from-gray-50 to-gray-200 py-40 dark:from-gray-900 dark:to-gray-800">
                            <div className="container mx-auto px-4">
                                <div className="mx-auto max-w-3xl text-center">
                                    <h1 className="mb-6 text-5xl font-bold text-gray-900 dark:text-white">{t('home.title')}</h1>
                                    <p className="mb-8 text-xl text-gray-600 dark:text-gray-300">{t('home.subtitle')}</p>
                                    <Link href="/apply">
                                        <LanguageHoverButton />
                                    </Link>
                                </div>
                            </div>
                        </section>
                    </AnimateOnView>
                    <ProcessSteps />
                    <Requirements />
                    <TestimonialSection />
                </div>
            </PageTransition>
        </LandingLayout>
    );
}
