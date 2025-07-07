import { CompanyInfo } from '@/components/ui/CompanyInfo';
import { ContactForm } from '@/components/ui/ContactForm';
import { useToast } from '@/hooks/use-toast';
import LandingLayout from '@/layouts/landing-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface FormData {
    name: string;
    email: string;
    message: string;
    [key: string]: string;
}

interface ContactSection {
    company_name: string;
    address: string;
    email: string;
    telephone: string;
    working_hours: string;
    logo_url?: string;
}

interface PageProps extends Record<string, unknown> {
    flash?: { success?: string; error?: string };
    contactSection?: ContactSection;
}

export default function Contact() {
    const { t } = useTranslation();
    const { flash, contactSection } = usePage<PageProps>().props;

    const { toast } = useToast();
    const { data, setData, post, processing, errors, reset } = useForm<FormData>({
        name: '',
        email: '',
        message: '',
    });

    const [submitted, setSubmitted] = useState(false);

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
            <section className="relative overflow-visible py-8 md:py-20">
                <div className="relative mx-auto flex w-full max-w-6xl px-4 md:w-2/3 md:px-0">
                    {/* Desktop Layout */}
                    <div className="hidden xl:block">
                        <div className="absolute top-1/2 left-0 z-10 w-[360px] -translate-y-1/2 transform pt-12">
                            {contactSection && (
                                <CompanyInfo
                                    companyName={contactSection.company_name}
                                    address={contactSection.address}
                                    email={contactSection.email}
                                    telephone={contactSection.telephone}
                                    workingHours={contactSection.working_hours}
                                    logoUrl={contactSection.logo_url}
                                />
                            )}
                        </div>
                        <div className="flex w-full justify-end pl-[150px]">
                            <ContactForm />
                        </div>
                    </div>

                    {/* Mobile Layout */}
                    <div className="block w-full space-y-6 xl:hidden">
                        <div className="w-full">
                            {contactSection && (
                                <CompanyInfo
                                    companyName={contactSection.company_name}
                                    address={contactSection.address}
                                    email={contactSection.email}
                                    telephone={contactSection.telephone}
                                    workingHours={contactSection.working_hours}
                                    logoUrl={contactSection.logo_url}
                                />
                            )}
                        </div>
                        <div className="w-full">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>
        </LandingLayout>
    );
}
