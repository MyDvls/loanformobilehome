import AnimateOnView from '@/components/AnimateOnView';
import LandingLayout from '@/layouts/landing-layout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Customers() {
    const { t } = useTranslation();
    const [isIframeLoading, setIsIframeLoading] = useState(true);

    // Handle iframe loading state
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsIframeLoading(false);
        }, 4000);
        return () => clearTimeout(timer);
    }, []);

    // Handle postMessage from iframe for login response
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            // Verify origin for security
            if (event.origin !== 'https://loanpro.simnang.com' && 
                event.origin !== 'https://mobilefundservices.loanpro.software') {
                return;
            }

            try {
                const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
                
                // Check for redirectUrl format (actual format from iframe)
                if (data && data.redirectUrl) {
                    window.location.href = data.redirectUrl;
                }
                // Check if this is the old format (keeping for compatibility)
                else if (data && data.d && data.d.sessionId && data.d.postLoginPage) {
                    const postLoginUrl = `https://mobilefundservices.loanpro.software/app/${data.d.postLoginPage}`;
                    window.location.href = postLoginUrl;
                }
            } catch (error) {
                console.error('Error parsing message from iframe:', error);
            }
        };

        // Add event listener for postMessage
        window.addEventListener('message', handleMessage);

        // Cleanup event listener
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    return (
        <LandingLayout>
            <Head title={t('customers.title')} />
            <section className="relative min-h-screen bg-gray-50 py-12">
                <h1 className="py-6 text-center text-2xl font-bold text-gray-800">Customers Login</h1>
                <div className="container mx-auto flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center bg-gray-200 px-4 md:flex-row md:space-x-8">
                    {/* Left Side - Logo */}
                    <div className="mb-10 flex w-full flex-col items-center justify-center md:mb-0 md:w-1/2">
                        <div className="flex h-48 w-full items-center justify-center px-4">
                            <img
                                src="/images/mfs_large_logo.svg"
                                alt="Mobile Fund Services Logo"
                                className="h-auto max-h-full w-auto max-w-xs object-contain"
                            />
                        </div>
                    </div>

                    {/* Right Side - Iframe */}
                    <div className="flex w-full flex-col items-center justify-center md:w-1/2">
                        <AnimateOnView delay={0.4}>
                            <div className="flex flex-col items-center">
                                <h2 className="mb-6 text-3xl font-bold text-gray-800">Mobile Fund Services</h2>
                                <div className="flex w-full max-w-2xl items-center justify-center">
                                    {isIframeLoading ? (
                                        <motion.div
                                            className="w-full animate-pulse bg-gray-300"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                                        >
                                            Loading...
                                        </motion.div>
                                    ) : (
                                        <iframe
                                            src="https://loanpro.simnang.com/client/public/iframe/customerLogin.html?domain=mobilefundservices.loanpro.software&tenant=5202294&logout=https://loanformobilehome.com"
                                            width="100%"
                                            sandbox="allow-top-navigation allow-scripts allow-same-origin allow-forms"
                                            className="w-full"
                                            title={t('customers.iframe_title')}
                                            onLoad={() => setIsIframeLoading(false)}
                                            allowFullScreen
                                        />
                                    )}
                                </div>
                            </div>
                        </AnimateOnView>
                    </div>
                </div>
            </section>
        </LandingLayout>
    );
}
