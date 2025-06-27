import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '../AdminLayout';
import FileUpload from '../components/FileUpload';
import TranslatedInput from '../components/TranslatedInput';

interface ContactSection {
    id?: number;
    company_name?: string;
    address?: string;
    email?: string;
    telephone?: string;
    working_hours?: string;
    logo_url?: string;
}

interface ContactFormData {
    company_name: string;
    address: string;
    email: string;
    telephone: string;
    working_hours: string;
    logo: File | null;
    logo_url?: string;
}

interface Props {
    contactSection?: ContactSection;
}

export default function ContactEdit({ contactSection }: Props) {
    const { data, setData, post, errors, processing } = useForm<ContactFormData>({
        company_name: contactSection?.company_name || '',
        address: contactSection?.address || '',
        email: contactSection?.email || '',
        telephone: contactSection?.telephone || '',
        working_hours: contactSection?.working_hours || '',
        logo: null,
        logo_url: contactSection?.logo_url || '',
    });

    const [imageError, setImageError] = useState<string | null>(null);

    const handleImageChange = (file: File | null) => {
        if (file) {
            if (!file.type.startsWith('image/')) {
                setImageError('Please upload a valid image file (PNG, JPG, GIF).');
                setData('logo', null);
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                setImageError('File size exceeds 2MB limit.');
                setData('logo', null);
                return;
            }
            setImageError(null);
            setData('logo', file);
        } else {
            setData('logo', null);
            setImageError(null);
        }
    };

    const resetChanges = () => {
        setData({
            company_name: contactSection?.company_name || '',
            address: contactSection?.address || '',
            email: contactSection?.email || '',
            telephone: contactSection?.telephone || '',
            working_hours: contactSection?.working_hours || '',
            logo: null,
            logo_url: contactSection?.logo_url || '',
        });
        setImageError(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('company_name', data.company_name);
        formData.append('address', data.address);
        formData.append('email', data.email);
        formData.append('telephone', data.telephone);
        formData.append('working_hours', data.working_hours);
        if (data.logo instanceof File) {
            formData.append('logo', data.logo);
        }

        post('/admin/pages/contact/section', {
            data: formData,
            forceFormData: true,
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
                <form onSubmit={handleSubmit} className="space-y-6 p-6">
                    <TranslatedInput
                        label="Company Name"
                        value={data.company_name}
                        onChange={(value) => setData('company_name', value)}
                        error={errors.company_name}
                        placeholder="Enter company name"
                        required
                    />
                    <TranslatedInput
                        label="Address"
                        value={data.address}
                        onChange={(value) => setData('address', value)}
                        error={errors.address}
                        placeholder="Enter address"
                        type="textarea"
                        required
                    />
                    <TranslatedInput
                        label="Email"
                        value={data.email}
                        onChange={(value) => setData('email', value)}
                        error={errors.email}
                        placeholder="Enter email"
                        required
                    />
                    <TranslatedInput
                        label="Telephone"
                        value={data.telephone}
                        onChange={(value) => setData('telephone', value)}
                        error={errors.telephone}
                        placeholder="Enter telephone"
                        required
                    />
                    <TranslatedInput
                        label="Working Hours"
                        value={data.working_hours}
                        onChange={(value) => setData('working_hours', value)}
                        error={errors.working_hours}
                        placeholder="Enter working hours"
                        type="textarea"
                        required
                    />
                    <FileUpload
                        label="Logo"
                        onChange={handleImageChange}
                        error={imageError || errors.logo}
                        currentImageUrl={data.logo_url && !data.logo ? data.logo_url : undefined}
                        previewImage={data.logo}
                        onRemove={() => handleImageChange(null)}
                    />

                    <div className="flex items-center justify-end gap-4 border-t border-gray-200 pt-6 dark:border-neutral-700">
                        <button
                            type="button"
                            onClick={resetChanges}
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
                    </div>
                </form>
            </AdminLayout>
        </AppLayout>
    );
}