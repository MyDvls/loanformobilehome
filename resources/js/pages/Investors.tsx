import AnimateOnView from '@/components/AnimateOnView';
import LandingLayout from '@/layouts/landing-layout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Investors() {
    const { t } = useTranslation();
    const [isIframeLoading, setIsIframeLoading] = useState(true);

    // Handle iframe loading state
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsIframeLoading(false);
        }, 4000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <LandingLayout>
            <Head title={t('investors.title')} />
            <section className="relative overflow-visible bg-gradient-to-b from-gray-50 to-gray-200 py-20 dark:from-gray-800 dark:to-gray-700">
                <div className="relative z-10 container mx-auto px-4">
                    <AnimateOnView delay={0.2}>
                        <h2 className="mb-10 text-center text-4xl font-bold text-gray-800 dark:text-white">{t('investors.title')}</h2>
                    </AnimateOnView>
                    <AnimateOnView delay={0.4}>
                        <div className="flex justify-center">
                            {isIframeLoading ? (
                                <motion.div
                                    className="min-h-[500px] w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-600"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                                />
                            ) : (
                                <iframe
                                    src="https://mfs.loanformobilehome.com/login"
                                    width="100%"
                                    className="min-h-[500px] w-full rounded-lg border-none md:min-h-[600px]"
                                    title={t('investors.iframe_title')}
                                    onLoad={() => setIsIframeLoading(false)}
                                    allowFullScreen
                                />
                            )}
                        </div>
                    </AnimateOnView>
                </div>
            </section>
        </LandingLayout>
    );
}
