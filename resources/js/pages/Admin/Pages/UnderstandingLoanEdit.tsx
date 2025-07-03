import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import AdminLayout from '../AdminLayout';
import FileUpload from '../components/FileUpload';
import TranslatedInput from '../components/TranslatedInput';

interface SectionWrapperProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

interface UnderstandingLoanSection {
    id?: number;
    title?: string;
    subtitle?: string;
    section1?: {
        title: string;
        description: string;
        principal: string;
        interest: string;
        escrow: string;
        tip: string;
        graph1_title: string;
    };
    section2?: {
        title: string;
        additional: string;
        interest_save: string;
        term_shorten: string;
        result: string;
        graph2_tip: string;
        image_url?: string;
    };
}

interface UnderstandingLoanFormData {
    title: string;
    subtitle: string;
    section1: {
        title: string;
        description: string;
        principal: string;
        interest: string;
        escrow: string;
        tip: string;
        graph1_title: string;
    };
    section2: {
        title: string;
        additional: string;
        interest_save: string;
        term_shorten: string;
        result: string;
        graph2_tip: string;
        image: File | null;
        image_url?: string;
    };
}

interface Props {
    understandingLoanSection?: UnderstandingLoanSection;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ title, children, defaultOpen = true }) => (
    <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
        <Disclosure defaultOpen={!defaultOpen}>
            {({ open }) => (
                <>
                    <DisclosureButton className="flex w-full items-center justify-between px-4 py-3">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-neutral-100">{title}</h2>
                        <ChevronDown className={`${open ? 'rotate-180' : ''} h-5 w-5 text-gray-500 transition-transform dark:text-neutral-400`} />
                    </DisclosureButton>
                    <DisclosurePanel className="border-t border-gray-200 dark:border-neutral-700">{children}</DisclosurePanel>
                </>
            )}
        </Disclosure>
    </div>
);

export default function UnderstandingLoanEdit({ understandingLoanSection }: Props) {
    const { data, setData, post, errors, processing } = useForm<UnderstandingLoanFormData>({
        title: understandingLoanSection?.title || '',
        subtitle: understandingLoanSection?.subtitle || '',
        section1: {
            title: understandingLoanSection?.section1?.title || '',
            description: understandingLoanSection?.section1?.description || '',
            principal: understandingLoanSection?.section1?.principal || '',
            interest: understandingLoanSection?.section1?.interest || '',
            escrow: understandingLoanSection?.section1?.escrow || '',
            tip: understandingLoanSection?.section1?.tip || '',
            graph1_title: understandingLoanSection?.section1?.graph1_title || '',
        },
        section2: {
            title: understandingLoanSection?.section2?.title || '',
            additional: understandingLoanSection?.section2?.additional || '',
            interest_save: understandingLoanSection?.section2?.interest_save || '',
            term_shorten: understandingLoanSection?.section2?.term_shorten || '',
            result: understandingLoanSection?.section2?.result || '',
            graph2_tip: understandingLoanSection?.section2?.graph2_tip || '',
            image: null,
            image_url: understandingLoanSection?.section2?.image_url || '',
        },
    });

    const [imageError, setImageError] = useState<string | null>(null);

    const handleSectionInputChange = (section: 'section1' | 'section2', field: string, value: string) => {
        setData(section, {
            ...data[section],
            [field]: value,
        });
    };

    const handleImageChange = (file: File | null) => {
        if (file) {
            if (!file.type.startsWith('image/')) {
                setImageError('Please upload a valid image file (PNG, JPG, GIF).');
                setData('section2', { ...data.section2, image: null });
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                setImageError('File size exceeds 2MB limit.');
                setData('section2', { ...data.section2, image: null });
                return;
            }
            setImageError(null);
            setData('section2', { ...data.section2, image: file });
        } else {
            setData('section2', { ...data.section2, image: null });
            setImageError(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = new FormData();
        form.append('_method', 'PUT');
        form.append('title', data.title);
        form.append('subtitle', data.subtitle);
        form.append('section1[title]', data.section1.title);
        form.append('section1[description]', data.section1.description);
        form.append('section1[principal]', data.section1.principal);
        form.append('section1[interest]', data.section1.interest);
        form.append('section1[escrow]', data.section1.escrow);
        form.append('section1[tip]', data.section1.tip);
        form.append('section1[graph1_title]', data.section1.graph1_title);
        form.append('section2[title]', data.section2.title);
        form.append('section2[additional]', data.section2.additional);
        form.append('section2[interest_save]', data.section2.interest_save);
        form.append('section2[term_shorten]', data.section2.term_shorten);
        form.append('section2[result]', data.section2.result);
        form.append('section2[graph2_tip]', data.section2.graph2_tip);
        if (data.section2.image instanceof File) {
            form.append('section2[image]', data.section2.image);
        }

        post('/admin/pages/get-a-loan/section', {
            data: form,
            forceFormData: true,
            onSuccess: () => {
                alert('Understanding Loan section updated successfully.');
            },
            onError: (errors) => {
                console.error('Save errors:', errors);
                alert('Failed to save changes: ' + Object.values(errors).join(', '));
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Edit Understanding Loan Section" />
            <AdminLayout title="Edit Understanding Loan Section" subtitle="Loan Information">
                <div className="container rounded-md border px-6 py-6">
                    {errors.error && <div className="mb-4 text-red-500">{errors.error}</div>}
                    <form onSubmit={handleSubmit}>
                        <SectionWrapper title="Loan Information">
                            <div className="space-y-6 pt-4">
                                <TranslatedInput
                                    label="Title"
                                    value={data.title}
                                    onChange={(value) => setData('title', value)}
                                    error={errors.title}
                                    placeholder="Enter title"
                                    required
                                />
                                <TranslatedInput
                                    label="Subtitle"
                                    value={data.subtitle}
                                    onChange={(value) => setData('subtitle', value)}
                                    error={errors.subtitle}
                                    placeholder="Enter subtitle"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-neutral-100">Section 1</h3>
                                    <div className="mt-4 space-y-4">
                                        <TranslatedInput
                                            label="Title"
                                            value={data.section1.title}
                                            onChange={(value) => handleSectionInputChange('section1', 'title', value)}
                                            error={errors['section1.title']}
                                            placeholder="Enter section 1 title"
                                            required
                                        />
                                        <TranslatedInput
                                            label="Description"
                                            value={data.section1.description}
                                            onChange={(value) => handleSectionInputChange('section1', 'description', value)}
                                            error={errors['section1.description']}
                                            placeholder="Enter section 1 description"
                                            type="textarea"
                                            required
                                        />
                                        <TranslatedInput
                                            label="Principal"
                                            value={data.section1.principal}
                                            onChange={(value) => handleSectionInputChange('section1', 'principal', value)}
                                            error={errors['section1.principal']}
                                            placeholder="Enter principal description"
                                            required
                                        />
                                        <TranslatedInput
                                            label="Interest"
                                            value={data.section1.interest}
                                            onChange={(value) => handleSectionInputChange('section1', 'interest', value)}
                                            error={errors['section1.interest']}
                                            placeholder="Enter interest description"
                                            required
                                        />
                                        <TranslatedInput
                                            label="Escrow"
                                            value={data.section1.escrow}
                                            onChange={(value) => handleSectionInputChange('section1', 'escrow', value)}
                                            error={errors['section1.escrow']}
                                            placeholder="Enter escrow description"
                                            required
                                        />
                                        <TranslatedInput
                                            label="Tip"
                                            value={data.section1.tip}
                                            onChange={(value) => handleSectionInputChange('section1', 'tip', value)}
                                            error={errors['section1.tip']}
                                            placeholder="Enter tip"
                                            type="textarea"
                                            required
                                        />
                                        <TranslatedInput
                                            label="Graph Title"
                                            value={data.section1.graph1_title}
                                            onChange={(value) => handleSectionInputChange('section1', 'graph1_title', value)}
                                            error={errors['section1.graph1_title']}
                                            placeholder="Enter graph title"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-neutral-100">
                                        Section 2: Making Additional Payments
                                    </h3>
                                    <div className="mt-4 space-y-4">
                                        <TranslatedInput
                                            label="Title"
                                            value={data.section2.title}
                                            onChange={(value) => handleSectionInputChange('section2', 'title', value)}
                                            error={errors['section2.title']}
                                            placeholder="Enter section 2 title"
                                            required
                                        />
                                        <TranslatedInput
                                            label="Additional Payments"
                                            value={data.section2.additional}
                                            onChange={(value) => handleSectionInputChange('section2', 'additional', value)}
                                            error={errors['section2.additional']}
                                            placeholder="Enter additional payments description"
                                            required
                                        />
                                        <TranslatedInput
                                            label="Save on Interest"
                                            value={data.section2.interest_save}
                                            onChange={(value) => handleSectionInputChange('section2', 'interest_save', value)}
                                            error={errors['section2.interest_save']}
                                            placeholder="Enter save on interest description"
                                            required
                                        />
                                        <TranslatedInput
                                            label="Shorten Loan Term"
                                            value={data.section2.term_shorten}
                                            onChange={(value) => handleSectionInputChange('section2', 'term_shorten', value)}
                                            error={errors['section2.term_shorten']}
                                            placeholder="Enter shorten loan term description"
                                            required
                                        />
                                        <TranslatedInput
                                            label="Result"
                                            value={data.section2.result}
                                            onChange={(value) => handleSectionInputChange('section2', 'result', value)}
                                            error={errors['section2.result']}
                                            placeholder="Enter result description"
                                            type="textarea"
                                            required
                                        />
                                        <TranslatedInput
                                            label="Tip"
                                            value={data.section2.graph2_tip}
                                            onChange={(value) => handleSectionInputChange('section2', 'graph2_tip', value)}
                                            error={errors['section2.graph2_tip']}
                                            placeholder="Enter tip"
                                            type="textarea"
                                            required
                                        />
                                        <FileUpload
                                            label="Section 2 Image"
                                            onChange={handleImageChange}
                                            error={imageError || errors['section2.image']}
                                            currentImageUrl={data.section2.image_url && !data.section2.image ? data.section2.image_url : undefined}
                                            previewImage={data.section2.image}
                                            onRemove={() => handleImageChange(null)}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col items-start justify-end gap-4 border-t border-gray-200 pt-6 md:flex-row dark:border-neutral-700">
                                    <Button
                                        type="button"
                                        onClick={() =>
                                            setData({
                                                title: understandingLoanSection?.title || '',
                                                subtitle: understandingLoanSection?.subtitle || '',
                                                section1: {
                                                    title: understandingLoanSection?.section1?.title || '',
                                                    description: understandingLoanSection?.section1?.description || '',
                                                    principal: understandingLoanSection?.section1?.principal || '',
                                                    interest: understandingLoanSection?.section1?.interest || '',
                                                    escrow: understandingLoanSection?.section1?.escrow || '',
                                                    tip: understandingLoanSection?.section1?.tip || '',
                                                    graph1_title: understandingLoanSection?.section1?.graph1_title || '',
                                                },
                                                section2: {
                                                    title: understandingLoanSection?.section2?.title || '',
                                                    additional: understandingLoanSection?.section2?.additional || '',
                                                    interest_save: understandingLoanSection?.section2?.interest_save || '',
                                                    term_shorten: understandingLoanSection?.section2?.term_shorten || '',
                                                    result: understandingLoanSection?.section2?.result || '',
                                                    graph2_tip: understandingLoanSection?.section2?.graph2_tip || '',
                                                    image: null,
                                                    image_url: understandingLoanSection?.section2?.image_url || '',
                                                },
                                            })
                                        }
                                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:ring-offset-neutral-800"
                                        disabled={processing}
                                    >
                                        Discard
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-neutral-800"
                                        disabled={processing}
                                    >
                                        {processing ? 'Saving...' : 'Save Changes'}
                                    </Button>
                                </div>
                            </div>
                        </SectionWrapper>
                    </form>
                </div>
            </AdminLayout>
        </AppLayout>
    );
}
