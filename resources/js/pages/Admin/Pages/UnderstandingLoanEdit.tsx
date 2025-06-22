import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Disclosure, DisclosureButton, DisclosurePanel, Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { Head, router, usePage } from '@inertiajs/react';
import { ChevronDown, Globe } from 'lucide-react';
import { useState } from 'react';
import AdminLayout from '../AdminLayout';

/** Reusable section wrapper with collapsible panel */
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

interface SectionWrapperProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

const UnderstandingLoanEdit = () => {
    const { props } = usePage();
    const { understandingLoanSection, errors } = props;

    const [formData, setFormData] = useState({
        title: understandingLoanSection?.title || { en: '', es: '' },
        subtitle: understandingLoanSection?.subtitle || { en: '', es: '' },
        section1: understandingLoanSection?.section1 || {
            title: { en: '', es: '' },
            description: { en: '', es: '' },
            principal: { en: '', es: '' },
            interest: { en: '', es: '' },
            escrow: { en: '', es: '' },
            tip: { en: '', es: '' },
            graph1_title: { en: '', es: '' },
        },
        section2: understandingLoanSection?.section2 || {
            title: { en: '', es: '' },
            additional: { en: '', es: '' },
            interest_save: { en: '', es: '' },
            term_shorten: { en: '', es: '' },
            result: { en: '', es: '' },
            graph2_tip: { en: '', es: '' },
            image: null,
            image_url: understandingLoanSection?.section2?.image_url || '',
        },
    });

    const [imagePreview, setImagePreview] = useState(formData.section2.image_url || '');

    const handleInputChange = (section, lang, value) => {
        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [lang]: value,
            },
        }));
    };

    const handleSectionInputChange = (section, field, lang, value) => {
        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: {
                    ...prev[section][field],
                    [lang]: value,
                },
            },
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({
                ...prev,
                section2: {
                    ...prev.section2,
                    image: file,
                },
            }));
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('title[en]', formData.title.en);
        form.append('title[es]', formData.title.es);
        form.append('subtitle[en]', formData.subtitle.en);
        form.append('subtitle[es]', formData.subtitle.es);
        form.append('section1[title][en]', formData.section1.title.en);
        form.append('section1[title][es]', formData.section1.title.es);
        form.append('section1[description][en]', formData.section1.description.en);
        form.append('section1[description][es]', formData.section1.description.es);
        form.append('section1[principal][en]', formData.section1.principal.en);
        form.append('section1[principal][es]', formData.section1.principal.es);
        form.append('section1[interest][en]', formData.section1.interest.en);
        form.append('section1[interest][es]', formData.section1.interest.es);
        form.append('section1[escrow][en]', formData.section1.escrow.en);
        form.append('section1[escrow][es]', formData.section1.escrow.es);
        form.append('section1[tip][en]', formData.section1.tip.en);
        form.append('section1[tip][es]', formData.section1.tip.es);
        form.append('section1[graph1_title][en]', formData.section1.graph1_title.en);
        form.append('section1[graph1_title][es]', formData.section1.graph1_title.es);
        form.append('section2[title][en]', formData.section2.title.en);
        form.append('section2[title][es]', formData.section2.title.es);
        form.append('section2[additional][en]', formData.section2.additional.en);
        form.append('section2[additional][es]', formData.section2.additional.es);
        form.append('section2[interest_save][en]', formData.section2.interest_save.en);
        form.append('section2[interest_save][es]', formData.section2.interest_save.es);
        form.append('section2[term_shorten][en]', formData.section2.term_shorten.en);
        form.append('section2[term_shorten][es]', formData.section2.term_shorten.es);
        form.append('section2[result][en]', formData.section2.result.en);
        form.append('section2[result][es]', formData.section2.result.es);
        form.append('section2[graph2_tip][en]', formData.section2.graph2_tip.en);
        form.append('section2[graph2_tip][es]', formData.section2.graph2_tip.es);
        if (formData.section2.image) {
            form.append('section2[image]', formData.section2.image);
        }

        router.post('/admin/pages/get-a-loan/section', form, {
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
                <div className="container mx-auto">
                    {errors.error && <div className="mb-4 text-red-500">{errors.error}</div>}
                    <SectionWrapper title="Loan Information">
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
                            <form onSubmit={handleSubmit}>
                                <TabPanels className="pb-4">
                                    {['en', 'es'].map((lang) => (
                                        <TabPanel key={lang}>
                                            <div className="space-y-6">
                                                <div>
                                                    <Label>Title</Label>
                                                    <Input
                                                        className="w-full rounded border-gray-300 p-2 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                                        value={formData.title[lang]}
                                                        onChange={(e) => handleInputChange('title', lang, e.target.value)}
                                                        placeholder="Enter title"
                                                    />
                                                </div>
                                                <div>
                                                    <Label>Subtitle</Label>
                                                    <Input
                                                        className="w-full rounded border-gray-300 p-2 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                                        value={formData.subtitle[lang]}
                                                        onChange={(e) => handleInputChange('subtitle', lang, e.target.value)}
                                                        placeholder="Enter subtitle"
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-neutral-100">Section 1</h3>
                                                    <div className="mt-4 space-y-4">
                                                        <div>
                                                            <Label>Title</Label>
                                                            <Input
                                                                className="w-full rounded border-gray-300 p-2 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                                                value={formData.section1.title[lang]}
                                                                onChange={(e) => handleSectionInputChange('section1', 'title', lang, e.target.value)}
                                                                placeholder="Enter section 1 title"
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label>Description</Label>
                                                            <Input
                                                                className="w-full rounded border-gray-300 p-2 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                                                value={formData.section1.description[lang]}
                                                                onChange={(e) =>
                                                                    handleSectionInputChange('section1', 'description', lang, e.target.value)
                                                                }
                                                                placeholder="Enter section 1 description"
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label>Principal</Label>
                                                            <Input
                                                                className="w-full rounded border-gray-300 p-2 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                                                value={formData.section1.principal[lang]}
                                                                onChange={(e) =>
                                                                    handleSectionInputChange('section1', 'principal', lang, e.target.value)
                                                                }
                                                                placeholder="Enter principal description"
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label>Interest</Label>
                                                            <Input
                                                                className="w-full rounded border-gray-300 p-2 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                                                value={formData.section1.interest[lang]}
                                                                onChange={(e) =>
                                                                    handleSectionInputChange('section1', 'interest', lang, e.target.value)
                                                                }
                                                                placeholder="Enter interest description"
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label>Escrow</Label>
                                                            <Input
                                                                className="w-full rounded border-gray-300 p-2 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                                                value={formData.section1.escrow[lang]}
                                                                onChange={(e) => handleSectionInputChange('section1', 'escrow', lang, e.target.value)}
                                                                placeholder="Enter escrow description"
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label>Tip</Label>
                                                            <Input
                                                                className="w-full rounded border-gray-300 p-2 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                                                value={formData.section1.tip[lang]}
                                                                onChange={(e) => handleSectionInputChange('section1', 'tip', lang, e.target.value)}
                                                                placeholder="Enter tip"
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label>Graph Title</Label>
                                                            <Input
                                                                className="w-full rounded border-gray-300 p-2 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                                                value={formData.section1.graph1_title[lang]}
                                                                onChange={(e) =>
                                                                    handleSectionInputChange('section1', 'graph1_title', lang, e.target.value)
                                                                }
                                                                placeholder="Enter graph title"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-neutral-100">
                                                        Section 2: Making Additional Payments
                                                    </h3>
                                                    <div className="mt-4 space-y-4">
                                                        <div>
                                                            <Label>Title</Label>
                                                            <Input
                                                                className="w-full rounded border-gray-300 p-2 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                                                value={formData.section2.title[lang]}
                                                                onChange={(e) => handleSectionInputChange('section2', 'title', lang, e.target.value)}
                                                                placeholder="Enter section 2 title"
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label>Additional Payments</Label>
                                                            <Input
                                                                className="w-full rounded border-gray-300 p-2 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                                                value={formData.section2.additional[lang]}
                                                                onChange={(e) =>
                                                                    handleSectionInputChange('section2', 'additional', lang, e.target.value)
                                                                }
                                                                placeholder="Enter additional payments description"
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label>Save on Interest</Label>
                                                            <Input
                                                                className="w-full rounded border-gray-300 p-2 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                                                value={formData.section2.interest_save[lang]}
                                                                onChange={(e) =>
                                                                    handleSectionInputChange('section2', 'interest_save', lang, e.target.value)
                                                                }
                                                                placeholder="Enter save on interest description"
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label>Shorten Loan Term</Label>
                                                            <Input
                                                                className="w-full rounded border-gray-300 p-2 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                                                value={formData.section2.term_shorten[lang]}
                                                                onChange={(e) =>
                                                                    handleSectionInputChange('section2', 'term_shorten', lang, e.target.value)
                                                                }
                                                                placeholder="Enter shorten loan term description"
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label>Result</Label>
                                                            <Input
                                                                className="w-full rounded border-gray-300 p-2 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                                                value={formData.section2.result[lang]}
                                                                onChange={(e) => handleSectionInputChange('section2', 'result', lang, e.target.value)}
                                                                placeholder="Enter result description"
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label>Tip</Label>
                                                            <Input
                                                                className="w-full rounded border-gray-300 p-2 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                                                value={formData.section2.graph2_tip[lang]}
                                                                onChange={(e) =>
                                                                    handleSectionInputChange('section2', 'graph2_tip', lang, e.target.value)
                                                                }
                                                                placeholder="Enter tip"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </TabPanel>
                                    ))}
                                </TabPanels>
                                <div className="space-y-4">
                                    <Label>Section 2 Image Upload</Label>
                                    <Input type="file" accept="image/*" onChange={handleImageChange} />
                                    {imagePreview && <img src={imagePreview} alt="Section 2 Preview" className="mt-4 w-full max-w-xs rounded" />}
                                </div>
                                <div className="mt-6 flex gap-4">
                                    <Button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                                        Save Changes
                                    </Button>
                                </div>
                            </form>
                        </TabGroup>
                    </SectionWrapper>
                </div>
            </AdminLayout>
        </AppLayout>
    );
};

export default UnderstandingLoanEdit;
