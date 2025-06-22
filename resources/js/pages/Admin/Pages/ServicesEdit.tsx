import AppLayout from '@/layouts/app-layout';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { Head, router, usePage } from '@inertiajs/react';
import { Globe } from 'lucide-react';
import { useState } from 'react';
import AdminLayout from '../AdminLayout';

export default function ServicesEdit() {
    const { props } = usePage();
    const { serviceSection, serviceItems } = props;

    const [heading, setHeading] = useState({
        en: serviceSection?.heading?.en || '',
        es: serviceSection?.heading?.es || '',
    });
    const [subHeading, setSubHeading] = useState({
        en: serviceSection?.sub_heading?.en || '',
        es: serviceSection?.sub_heading?.es || '',
    });
    const [services, setServices] = useState(
        serviceItems?.map((item) => ({
            id: item.id,
            image: item.image_path ? `/storage/${item.image_path}` : '',
            title: { en: item.title?.en || '', es: item.title?.es || '' },
            description: { en: item.description?.en || '', es: item.description?.es || '' },
        })) || [],
    );
    const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);

    const updateService = (index, key, lang, value) => {
        const updated = [...services];
        updated[index][key][lang] = value;
        setServices(updated);
    };

    const handleImageChange = (index, file) => {
        const reader = new FileReader();
        reader.onload = () => {
            const updated = [...services];
            updated[index].image = reader.result;
            setServices(updated);
        };
        reader.readAsDataURL(file);
    };

    const addService = () => {
        const newIndex = services.length;
        setServices([...services, { id: null, image: '', title: { en: '', es: '' }, description: { en: '', es: '' } }]);
        setSelectedServiceIndex(newIndex);
    };

    const resetService = (index) => {
        if (serviceItems && serviceItems[index]) {
            const original = serviceItems[index];
            setServices((prev) =>
                prev.map((service, i) =>
                    i === index
                        ? {
                              id: original.id,
                              image: original.image_path ? `/storage/${original.image_path}` : '',
                              title: { en: original.title?.en || '', es: original.title?.es || '' },
                              description: { en: original.description?.en || '', es: original.description?.es || '' },
                          }
                        : service,
                ),
            );
        } else {
            setServices((prev) => prev.filter((_, i) => i !== index));
            setSelectedServiceIndex((prevIndex) => {
                if (services.length - 1 === 0) return 0;
                return Math.min(prevIndex, services.length - 2);
            });
        }
    };

    const deleteService = () => {
        if (services.length === 0) return;
        setServices((prev) => prev.filter((_, i) => i !== selectedServiceIndex));
        setSelectedServiceIndex((prevIndex) => {
            if (services.length - 1 === 0) return 0;
            return Math.min(prevIndex, services.length - 2);
        });
    };

    const saveChanges = () => {
        const formData = new FormData();
        formData.append('heading[en]', heading.en);
        formData.append('heading[es]', heading.es);
        formData.append('sub_heading[en]', subHeading.en);
        formData.append('sub_heading[es]', subHeading.es);

        services.forEach((service, index) => {
            if (service.id !== null && service.id !== undefined) {
                formData.append(`services[${index}][id]`, service.id.toString());
            }
            formData.append(`services[${index}][title][en]`, service.title.en);
            formData.append(`services[${index}][title][es]`, service.title.es);
            formData.append(`services[${index}][description][en]`, service.description.en);
            formData.append(`services[${index}][description][es]`, service.description.es);
            if (service.image && service.image.startsWith('data:image')) {
                const byteString = atob(service.image.split(',')[1]);
                const mimeString = service.image.split(',')[0].split(':')[1].split(';')[0];
                const ab = new ArrayBuffer(byteString.length);
                const ia = new Uint8Array(ab);
                for (let i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                const blob = new Blob([ab], { type: mimeString });
                formData.append(`services[${index}][image]`, blob, `service-${index}.png`);
            }
        });

        console.log('FormData:', Object.fromEntries(formData)); // Debug form data
        router.post('/admin/pages/services/section', formData, {
            onSuccess: () => {
                alert('Services section updated successfully.');
            },
            onError: (errors) => {
                console.error('Save errors:', errors);
                alert('Failed to save changes: ' + Object.values(errors).join(', '));
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Edit Homepage" />
            <AdminLayout title="Edit Homepage" subtitle="Services">
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
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Heading *</label>
                                    <input
                                        value={heading[lang]}
                                        onChange={(e) => setHeading({ ...heading, [lang]: e.target.value })}
                                        className="mt-1 w-full rounded border-gray-300 p-2 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sub-Heading</label>
                                    <input
                                        value={subHeading[lang]}
                                        onChange={(e) => setSubHeading({ ...subHeading, [lang]: e.target.value })}
                                        className="mt-1 w-full rounded border-gray-300 p-2 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                    />
                                </div>
                                <div className="flex items-center gap-4">
                                    {services.map((_, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            className={`h-10 w-10 rounded-full border-2 p-2 px-2 py-1 text-sm font-medium ${
                                                index === selectedServiceIndex ? 'bg-blue-600 text-white' : 'border-blue-600 text-blue-600'
                                            }`}
                                            onClick={() => setSelectedServiceIndex(index)}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                    <button
                                        onClick={addService}
                                        type="button"
                                        className="h-10 w-10 rounded-full border-2 border-gray-400 text-xl text-gray-600 dark:text-gray-300"
                                    >
                                        +
                                    </button>
                                </div>
                                {services.length > 0 && (
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                        <div className="space-y-4 lg:col-span-2">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title *</label>
                                                <input
                                                    value={services[selectedServiceIndex].title[lang]}
                                                    onChange={(e) => updateService(selectedServiceIndex, 'title', lang, e.target.value)}
                                                    className="mt-1 w-full rounded border-gray-300 p-2 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Paragraph *</label>
                                                <textarea
                                                    value={services[selectedServiceIndex].description[lang]}
                                                    onChange={(e) => updateService(selectedServiceIndex, 'description', lang, e.target.value)}
                                                    className="mt-1 w-full rounded border-gray-300 p-2 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                                    rows={3}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image</label>
                                            <div className="relative mt-1 h-40 w-full overflow-hidden rounded border border-gray-300 bg-white dark:border-neutral-700 dark:bg-neutral-800">
                                                {services[selectedServiceIndex].image && (
                                                    <img
                                                        src={services[selectedServiceIndex].image}
                                                        alt="Service"
                                                        className="h-full w-full object-contain"
                                                    />
                                                )}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        if (e.target.files && e.target.files[0]) {
                                                            handleImageChange(selectedServiceIndex, e.target.files[0]);
                                                        }
                                                    }}
                                                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </TabPanel>
                        ))}
                    </TabPanels>
                </TabGroup>
                <div className="mt-6 flex gap-4">
                    <button
                        onClick={saveChanges}
                        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                        Save Changes
                    </button>
                    <button
                        onClick={() => resetService(selectedServiceIndex)}
                        className="rounded border border-gray-400 px-4 py-2 text-gray-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-300"
                    >
                        Discard
                    </button>
                    <button
                        onClick={deleteService}
                        className="rounded border border-red-400 px-4 py-2 text-red-600 hover:bg-red-50 dark:border-red-600 dark:text-red-300 dark:hover:bg-red-900/20"
                        disabled={services.length === 0}
                    >
                        Delete
                    </button>
                </div>
            </AdminLayout>
        </AppLayout>
    );
}