import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '../AdminLayout';
import FileUpload from '../components/FileUpload';
import TranslatedInput from '../components/TranslatedInput';

interface ServiceItem {
    id?: number;
    title: string;
    description: string;
    image_path?: string;
}

interface ServiceSection {
    id?: number;
    heading?: string;
    sub_heading?: string;
}

interface ServiceFormData {
    heading: string;
    sub_heading: string;
    services: Array<{
        id?: number;
        title: string;
        description: string;
        image: File | null;
        image_path?: string;
    }>;
}

interface Props {
    serviceSection?: ServiceSection;
    serviceItems?: ServiceItem[];
}

export default function ServicesEdit({ serviceSection, serviceItems }: Props) {
    const { data, setData, post, errors, processing } = useForm<ServiceFormData>({
        heading: serviceSection?.heading || '',
        sub_heading: serviceSection?.sub_heading || '',
        services: serviceItems?.map((item) => ({
            id: item.id,
            title: item.title || '',
            description: item.description || '',
            image: null,
            image_path: item.image_path || '',
        })) || [
            {
                title: '',
                description: '',
                image: null,
                image_path: '',
            },
        ],
    });

    const [imageErrors, setImageErrors] = useState<{ [key: number]: string | null }>({});
    const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);

    const updateService = (index: number, key: 'title' | 'description', value: string) => {
        setData(
            'services',
            data.services.map((service, i) => (i === index ? { ...service, [key]: value } : service)),
        );
    };

    const handleImageChange = (index: number, file: File | null) => {
        if (file) {
            if (!file.type.startsWith('image/')) {
                setImageErrors((prev) => ({ ...prev, [index]: 'Please upload a valid image file (PNG, JPG, GIF).' }));
                setData(
                    'services',
                    data.services.map((service, i) => (i === index ? { ...service, image: null } : service)),
                );
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                setImageErrors((prev) => ({ ...prev, [index]: 'File size exceeds 2MB limit.' }));
                setData(
                    'services',
                    data.services.map((service, i) => (i === index ? { ...service, image: null } : service)),
                );
                return;
            }
            setImageErrors((prev) => ({ ...prev, [index]: null }));
            setData(
                'services',
                data.services.map((service, i) => (i === index ? { ...service, image: file } : service)),
            );
        } else {
            setData(
                'services',
                data.services.map((service, i) => (i === index ? { ...service, image: null } : service)),
            );
            setImageErrors((prev) => ({ ...prev, [index]: null }));
        }
    };

    const addService = () => {
        const newIndex = data.services.length;
        setData('services', [...data.services, { title: '', description: '', image: null, image_path: '' }]);
        setSelectedServiceIndex(newIndex);
    };

    const resetService = () => {
        setData({
            heading: serviceSection?.heading || '',
            sub_heading: serviceSection?.sub_heading || '',
            services: serviceItems?.map((item) => ({
                id: item.id,
                title: item.title || '',
                description: item.description || '',
                image: null,
                image_path: item.image_path || '',
            })) || [{ title: '', description: '', image: null, image_path: '' }],
        });
        setImageErrors({});
        setSelectedServiceIndex(0);
    };

    const deleteService = () => {
        if (data.services.length === 0) return;
        setData(
            'services',
            data.services.filter((_, i) => i !== selectedServiceIndex),
        );
        setImageErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[selectedServiceIndex];
            return newErrors;
        });
        setSelectedServiceIndex((prevIndex) => Math.min(prevIndex, data.services.length - 2));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('heading', data.heading);
        formData.append('sub_heading', data.sub_heading);

        data.services.forEach((service, index) => {
            if (service.id) {
                formData.append(`services[${index}][id]`, service.id.toString());
            }
            formData.append(`services[${index}][title]`, service.title);
            formData.append(`services[${index}][description]`, service.description);
            formData.append(`services[${index}][image]`, service.image instanceof File ? service.image : '');
        });

        post('/admin/pages/services/section', {
            data: formData,
            forceFormData: true,
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
            <Head title="Edit Services Section" />
            <AdminLayout title="Edit Homepage" subtitle="Services">
                <form onSubmit={handleSubmit} className="container space-y-6 rounded-md border p-6">
                    <TranslatedInput
                        label="Services Section Heading"
                        value={data.heading}
                        onChange={(value) => setData('heading', value)}
                        error={errors.heading}
                        placeholder="Services section heading"
                        required
                    />
                    <TranslatedInput
                        label="Sub-Heading"
                        value={data.sub_heading}
                        onChange={(value) => setData('sub_heading', value)}
                        error={errors.sub_heading}
                        placeholder="Services section sub-heading"
                    />

                    <div className="flex flex-wrap gap-2 sm:gap-4">
                        {data.services.map((_, index) => (
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

                    {data.services.length > 0 && (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <div className="space-y-4 lg:col-span-2">
                                <TranslatedInput
                                    label={`Service ${selectedServiceIndex + 1} Title`}
                                    value={data.services[selectedServiceIndex].title}
                                    onChange={(value) => updateService(selectedServiceIndex, 'title', value)}
                                    error={errors[`services.${selectedServiceIndex}.title`]}
                                    placeholder="Enter title"
                                    required
                                />
                                <TranslatedInput
                                    label={`Service ${selectedServiceIndex + 1} Description`}
                                    value={data.services[selectedServiceIndex].description}
                                    onChange={(value) => updateService(selectedServiceIndex, 'description', value)}
                                    error={errors[`services.${selectedServiceIndex}.description`]}
                                    placeholder="Enter description"
                                    type="textarea"
                                    required
                                />
                            </div>
                            <div>
                                <FileUpload
                                    label={`Service ${selectedServiceIndex + 1} Image`}
                                    onChange={(file) => handleImageChange(selectedServiceIndex, file)}
                                    error={imageErrors[selectedServiceIndex] || errors[`services.${selectedServiceIndex}.image`]}
                                    currentImageUrl={
                                        data.services[selectedServiceIndex].image_path && !data.services[selectedServiceIndex].image
                                            ? data.services[selectedServiceIndex].image_path
                                            : undefined
                                    }
                                    previewImage={data.services[selectedServiceIndex].image}
                                    onRemove={() => handleImageChange(selectedServiceIndex, null)}
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col items-start justify-end gap-4 border-t border-gray-200 pt-6 md:flex-row dark:border-neutral-700">
                        <button
                            type="button"
                            onClick={resetService}
                            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:ring-offset-neutral-800"
                            disabled={processing}
                        >
                            Discard
                        </button>
                        <button
                            type="submit"
                            className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-neutral-800"
                            disabled={processing}
                        >
                            {processing ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                            type="button"
                            onClick={deleteService}
                            className="inline-flex items-center rounded-md border border-red-400 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-600 dark:text-red-300 dark:hover:bg-red-900/20"
                            disabled={data.services.length === 0 || processing}
                        >
                            Delete
                        </button>
                    </div>
                </form>
            </AdminLayout>
        </AppLayout>
    );
}
