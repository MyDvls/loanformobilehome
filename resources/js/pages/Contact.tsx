import AnimateOnView from '@/components/AnimateOnView';
import { useToast } from '@/hooks/use-toast';
import LandingLayout from '@/layouts/landing-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface FormData {
    name: string;
    email: string;
    message: string;
    [key: string]: string;
}

interface PageProps extends Record<string, unknown> {
    flash?: { success?: string; error?: string };
}

export default function Contact() {
    const { t } = useTranslation();
    const { flash } = usePage<PageProps>().props;
    const { toast } = useToast();
    const { data, setData, post, processing, errors, reset } = useForm<FormData>({
        name: '',
        email: '',
        message: '',
    });

    const [submitted, setSubmitted] = useState(false);

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('contact.store'), {
            onSuccess: () => {
                setSubmitted(true);
                reset();
                toast({
                    title: t('contact.success_title'),
                    description: t('contact.success'),
                });
            },
            onError: () => {
                toast({
                    title: t('contact.error_title'),
                    description: t('contact.error'),
                    variant: 'destructive',
                });
            },
        });
    };

    // Handle flash messages
    useEffect(() => {
        if (flash?.success) {
            toast({
                title: t('contact.success_title'),
                description: flash.success,
            });
        }
        if (flash?.error) {
            toast({
                title: t('contact.error_title'),
                description: flash.error,
                variant: 'destructive',
            });
        }
    }, [flash, toast, t]);

    return (
        <LandingLayout>
            <Head title={t('contact.title')} />
            <section className="relative overflow-visible bg-gradient-to-b from-gray-50 to-gray-200 py-20 dark:from-gray-800 dark:to-gray-700">
                <div className="relative z-10 container mx-auto px-4">
                    <AnimateOnView delay={0.2}>
                        <h2 className="mb-10 text-center text-4xl font-bold text-gray-800 dark:text-white">{t('contact.title')}</h2>
                        <p className="mb-12 text-center text-xl text-gray-600 dark:text-gray-300">{t('contact.subtitle')}</p>
                    </AnimateOnView>
                    <div className="grid gap-8 md:grid-cols-2">
                        {/* Contact Details and Hours */}
                        <AnimateOnView delay={0.4}>
                            <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                                <h3 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">{t('contact.details')}</h3>
                                <div className="space-y-4">
                                    <p className="flex items-center text-gray-600 dark:text-gray-300">
                                        <MapPin className="mr-2 text-blue-700" size={20} />
                                        <span>
                                            <strong>{t('contact.address')}:</strong> 324 Main St. Unit D. Lyons, CO 80540
                                        </span>
                                    </p>
                                    <p className="flex items-center text-gray-600 dark:text-gray-300">
                                        <MapPin className="mr-2 text-blue-700" size={20} />
                                        <span>
                                            <strong>{t('contact.mailing_address')}:</strong> PO Box 1729 Lyons, CO 80540
                                        </span>
                                    </p>
                                    <p className="flex items-center text-gray-600 dark:text-gray-300">
                                        <Phone className="mr-2 text-blue-700" size={20} />
                                        <span>
                                            <strong>{t('contact.telephone')}:</strong>{' '}
                                            <a href="tel:+17205601018" className="text-blue-700 hover:underline">
                                                (720) 560-1018
                                            </a>
                                        </span>
                                    </p>
                                    <p className="flex items-center text-gray-600 dark:text-gray-300">
                                        <Mail className="mr-2 text-blue-700" size={20} />
                                        <span>
                                            <strong>{t('contact.email')}:</strong>{' '}
                                            <a href="mailto:Arhemy@loanformobilehome.com" className="text-blue-700 hover:underline">
                                                Arhemy@loanformobilehome.com
                                            </a>
                                        </span>
                                    </p>
                                </div>
                                <h3 className="mt-6 mb-4 text-2xl font-semibold text-gray-800 dark:text-white">{t('contact.hours')}</h3>
                                <div className="space-y-2">
                                    <p className="flex items-center text-gray-600 dark:text-gray-300">
                                        <Clock className="mr-2 text-blue-700" size={20} />
                                        <span>{t('contact.hours_monday')}: 9:00 am – 5:00 pm</span>
                                    </p>
                                    <p className="flex items-center text-gray-600 dark:text-gray-300">
                                        <Clock className="mr-2 text-blue-700" size={20} />
                                        <span>{t('contact.hours_tuesday')}: 9:00 am – 5:00 pm</span>
                                    </p>
                                    <p className="flex items-center text-gray-600 dark:text-gray-300">
                                        <Clock className="mr-2 text-blue-700" size={20} />
                                        <span>{t('contact.hours_wednesday')}: 9:00 am – 5:00 pm</span>
                                    </p>
                                    <p className="flex items-center text-gray-600 dark:text-gray-300">
                                        <Clock className="mr-2 text-blue-700" size={20} />
                                        <span>{t('contact.hours_thursday')}: 9:00 am – 5:00 pm</span>
                                    </p>
                                    <p className="flex items-center text-gray-600 dark:text-gray-300">
                                        <Clock className="mr-2 text-blue-700" size={20} />
                                        <span>{t('contact.hours_friday')}: 9:00 am – 5:00 pm</span>
                                    </p>
                                    <p className="flex items-center text-gray-600 dark:text-gray-300">
                                        <Clock className="mr-2 text-blue-700" size={20} />
                                        <span>{t('contact.hours_saturday')}: Closed</span>
                                    </p>
                                    <p className="flex items-center text-gray-600 dark:text-gray-300">
                                        <Clock className="mr-2 text-blue-700" size={20} />
                                        <span>{t('contact.hours_sunday')}: Closed</span>
                                    </p>
                                </div>
                            </div>
                        </AnimateOnView>
                        {/* Contact Form */}
                        <AnimateOnView delay={0.6}>
                            <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                                <h3 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">{t('contact.form_title')}</h3>
                                {submitted ? (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-green-500">
                                        <p>{t('contact.success')}</p>
                                        <button onClick={() => setSubmitted(false)} className="mt-4 text-blue-700 hover:underline">
                                            {t('contact.send_another')}
                                        </button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label htmlFor="name" className="block text-gray-800 dark:text-white">
                                                {t('contact.form_name')} <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                required
                                                aria-describedby={errors.name ? 'name-error' : undefined}
                                            />
                                            {errors.name && (
                                                <p id="name-error" className="text-sm text-red-500">
                                                    {errors.name}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-gray-800 dark:text-white">
                                                {t('contact.form_email')} <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                required
                                                aria-describedby={errors.email ? 'email-error' : undefined}
                                            />
                                            {errors.email && (
                                                <p id="email-error" className="text-sm text-red-500">
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label htmlFor="message" className="block text-gray-800 dark:text-white">
                                                {t('contact.form_message')}
                                            </label>
                                            <textarea
                                                id="message"
                                                value={data.message}
                                                onChange={(e) => setData('message', e.target.value)}
                                                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                rows={5}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full rounded-lg bg-blue-700 py-2 text-white hover:bg-blue-800 disabled:opacity-50"
                                        >
                                            {processing ? t('contact.sending') : t('contact.send')}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </AnimateOnView>
                    </div>
                </div>
            </section>
        </LandingLayout>
    );
}
