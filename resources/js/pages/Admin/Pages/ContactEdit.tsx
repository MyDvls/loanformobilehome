import AppLayout from '@/layouts/app-layout';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { Head, router, usePage } from '@inertiajs/react';
import { Globe } from 'lucide-react';
import { useState } from 'react';
import AdminLayout from '../AdminLayout';

export default function ContactEdit() {
    const { props } = usePage();
    const { contactSection } = props;

    const [companyName, setCompanyName] = useState({
        en: contactSection?.company_name?.en || '',
        es: contactSection?.company_name?.es || '',
    });
    const [address, setAddress] = useState({
        en: contactSection?.address?.en || '',
        es: contactSection?.address?.es || '',
    });
    const [email, setEmail] = useState({
        en: contactSection?.email?.en || '',
        es: contactSection?.email?.es || '',
    });
    const [telephone, setTelephone] = useState({
        en: contactSection?.telephone?.en || '',
        es: contactSection?.telephone?.es || '',
    });
    const [workingHours, setWorkingHours] = useState({
        en: contactSection?.working_hours?.en || '',
        es: contactSection?.working_hours?.es || '',
    });
    const [logo, setLogo] = useState(contactSection?.logo_url || '');

    const handleImageChange = (file) => {
        const reader = new FileReader();
        reader.onload = () => {
            setLogo(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const resetChanges = () => {
        setCompanyName({
            en: contactSection?.company_name?.en || '',
            es: contactSection?.company_name?.es || '',
        });
        setAddress({
            en: contactSection?.address?.en || '',
            es: contactSection?.address?.es || '',
        });
        setEmail({
            en: contactSection?.email?.en || '',
            es: contactSection?.email?.es || '',
        });
        setTelephone({
            en: contactSection?.telephone?.en || '',
            es: contactSection?.telephone?.es || '',
        });
        setWorkingHours({
            en: contactSection?.working_hours?.en || '',
            es: contactSection?.working_hours?.es || '',
        });
        setLogo(contactSection?.logo_url || '');
    };

    const saveChanges = () => {
        const formData = new FormData();
        formData.append('company_name[en]', companyName.en);
        formData.append('company_name[es]', companyName.es);
        formData.append('address[en]', address.en);
        formData.append('address[es]', address.es);
        formData.append('email[en]', email.en);
        formData.append('email[es]', email.es);
        formData.append('telephone[en]', telephone.en);
        formData.append('telephone[es]', telephone.es);
        formData.append('working_hours[en]', workingHours.en);
        formData.append('working_hours[es]', workingHours.es);

        if (logo && logo.startsWith('data:image')) {
            const byteString = atob(logo.split(',')[1]);
            const mimeString = logo.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            const blob = new Blob([ab], { type: mimeString });
            formData.append('logo', blob, 'logo.png');
        }

        console.log('FormData:', Object.fromEntries(formData)); // Debug form data
        router.post('/admin/pages/contact/section', formData, {
            onSuccess: () => {
                alert('Contact section updated successfully.');
            },
            onError: (errors) => {
                console.error('Save errors:', errors);
                alert('Failed to save changes: ' + Object.values(errors).join(', '));
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Edit Contact Section" />
            <AdminLayout title="Edit Contact Section" subtitle="Contact">
                <TabGroup>
                    <TabList className="flex space-x-1 rounded-lg bg-gray-100 p-1 dark:bg-neutral-700">
                        <Tab
                            className={({ selected }) =>
                                `flex w-full items-center justify-center rounded-md py-2.5 text-sm font-semibold transition-all ${
                                    selected
                                        ? 'bg-white text-blue-700 shadow-sm dark:bg-blue-600 dark:text-white'
                                        : 'text-gray-500 hover:bg-gray-200 dark:text-neutral-200 dark:hover:bg-neutral-600'
                                }`
                            }
                        >
                            <Globe className="mr-2 h-4 w-4" /> English
                        </Tab>
                        <Tab
                            className={({ selected }) =>
                                `flex w-full items-center justify-center rounded-md py-2.5 text-sm font-semibold transition-all ${
                                    selected
                                        ? 'bg-white text-blue-700 shadow-sm dark:bg-blue-600 dark:text-white'
                                        : 'text-gray-500 hover:bg-gray-200 dark:text-neutral-200 dark:hover:bg-neutral-600'
                                }`
                            }
                        >
                            <Globe className="mr-2 h-4 w-4" /> Spanish
                        </Tab>
                    </TabList>
                    <TabPanels className="mt-6">
                        {['en', 'es'].map((lang, langIndex) => (
                            <TabPanel key={lang} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Company Name *</label>
                                    <input
                                        value={companyName[lang]}
                                        onChange={(e) => setCompanyName({ ...companyName, [lang]: e.target.value })}
                                        className="mt-1 w-full rounded border-gray-300 p-2 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address *</label>
                                    <textarea
                                        value={address[lang]}
                                        onChange={(e) => setAddress({ ...address, [lang]: e.target.value })}
                                        className="mt-1 w-full rounded border-gray-300 p-2 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                        rows={3}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email *</label>
                                    <input
                                        value={email[lang]}
                                        onChange={(e) => setEmail({ ...email, [lang]: e.target.value })}
                                        className="mt-1 w-full rounded border-gray-300 p-2 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                        type="email"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Telephone *</label>
                                    <input
                                        value={telephone[lang]}
                                        onChange={(e) => setTelephone({ ...telephone, [lang]: e.target.value })}
                                        className="mt-1 w-full rounded border-gray-300 p-2 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                        type="tel"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Working Hours *</label>
                                    <textarea
                                        value={workingHours[lang]}
                                        onChange={(e) => setWorkingHours({ ...workingHours, [lang]: e.target.value })}
                                        className="mt-1 w-full rounded border-gray-300 p-2 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                        rows={3}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Logo</label>
                                    <div className="relative mt-1 h-40 w-full overflow-hidden rounded border border-gray-300 bg-white dark:border-neutral-700 dark:bg-neutral-800">
                                        {logo && <img src={logo} alt="Logo" className="h-full w-full object-contain" />}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                if (e.target.files && e.target.files[0]) {
                                                    handleImageChange(e.target.files[0]);
                                                }
                                            }}
                                            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                                        />
                                    </div>
                                </div>
                            </TabPanel>
                        ))}
                    </TabPanels>
                </TabGroup>
                <div className="mt-6 flex gap-4">
                    <button onClick={saveChanges} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                        Save Changes
                    </button>
                    <button
                        onClick={resetChanges}
                        className="rounded border border-gray-400 px-4 py-2 text-gray-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-300"
                    >
                        Discard
                    </button>
                </div>
            </AdminLayout>
        </AppLayout>
    );
}
