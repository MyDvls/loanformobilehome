import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Disclosure, DisclosureButton, DisclosurePanel, Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { ChevronDown, Globe, Upload, X } from 'lucide-react';
import React, { useState } from 'react';
import AdminLayout from '../AdminLayout';

// Interfaces
interface TranslatedField {
    en: string;
    es: string;
}

interface Step {
    title: TranslatedField;
    description: TranslatedField;
    image: File | null;
    image_url?: string;
}

interface Requirement {
    icon: TranslatedField;
    title: TranslatedField;
    description: TranslatedField;
}

interface Feature {
    title: TranslatedField;
    description: TranslatedField;
}

interface HeroSection {
    slogan?: TranslatedField;
    heading_part1?: TranslatedField;
    heading_part2?: TranslatedField;
    heading_part3?: TranslatedField;
    sub_heading?: TranslatedField;
    image_url?: string;
}

interface LoanSection {
    title?: TranslatedField;
    step1?: Step;
    step2?: Step;
    step3?: Step;
    step4?: Step;
    step5?: Step;
}

interface RequirementsSection {
    title?: TranslatedField;
    subtitle?: TranslatedField;
    requirement1?: Requirement;
    requirement2?: Requirement;
    requirement3?: Requirement;
    requirement4?: Requirement;
    requirement5?: Requirement;
    requirement6?: Requirement;
}

interface FeaturesSection {
    title?: TranslatedField;
    feature1?: Feature;
    feature2?: Feature;
    feature3?: Feature;
    feature4?: Feature;
    feature5?: Feature;
}

interface HomeEditProps {
    hero: HeroSection;
    loanSection: LoanSection;
    requirementsSection: RequirementsSection;
    featuresSection: FeaturesSection;
}

// Form Data Types
interface HeroFormData {
    slogan: TranslatedField;
    heading_part1: TranslatedField;
    heading_part2: TranslatedField;
    heading_part3: TranslatedField;
    sub_heading: TranslatedField;
    image: File | null;
}

interface LoanFormData {
    title: TranslatedField;
    step1: Step;
    step2: Step;
    step3: Step;
    step4: Step;
    step5: Step;
}

interface RequirementsFormData {
    title: TranslatedField;
    subtitle: TranslatedField;
    requirement1: Requirement;
    requirement2: Requirement;
    requirement3: Requirement;
    requirement4: Requirement;
    requirement5: Requirement;
    requirement6: Requirement;
}

interface FeaturesFormData {
    title: TranslatedField;
    feature1: Feature;
    feature2: Feature;
    feature3: Feature;
    feature4: Feature;
    feature5: Feature;
}

// Reusable Components
interface TranslatedInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    placeholder: string;
    required?: boolean;
    type?: 'text' | 'textarea' | 'select';
    rows?: number;
    options?: { value: string; label: string }[];
}

/** Reusable input/textarea/select for translated fields */
const TranslatedInput: React.FC<TranslatedInputProps> = ({
    label,
    value,
    onChange,
    error,
    placeholder,
    required,
    type = 'text',
    rows = 3,
    options = [],
}) => (
    <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-neutral-200">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        {type === 'text' ? (
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="block w-full rounded-md border-gray-300 bg-white p-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                placeholder={placeholder}
                required={required}
            />
        ) : type === 'textarea' ? (
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows={rows}
                className="block w-full rounded-md border-gray-300 bg-white p-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                placeholder={placeholder}
                required={required}
            />
        ) : (
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="block w-full rounded-md border-gray-300 bg-white p-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                required={required}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        )}
        {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
);

interface FileUploadProps {
    label: string;
    onChange: (file: File | null) => void;
    error?: string;
    currentImageUrl?: string;
    previewImage?: File;
    onRemove: () => void;
}

/** Reusable file upload component with drag-and-drop */
const FileUpload: React.FC<FileUploadProps> = ({ label, onChange, error, currentImageUrl, previewImage, onRemove }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/') && file.size <= 2 * 1024 * 1024) {
            onChange(file);
        } else {
            onChange(null);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/') && file.size <= 2 * 1024 * 1024) {
            onChange(file);
        } else {
            onChange(null);
        }
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-neutral-200">{label}</label>
            {(currentImageUrl || previewImage) && (
                <div className="relative inline-block">
                    <img
                        src={previewImage ? URL.createObjectURL(previewImage) : currentImageUrl}
                        alt={label}
                        className="h-32 w-auto rounded-lg border border-gray-200 object-cover dark:border-neutral-600"
                    />
                    <button
                        type="button"
                        onClick={onRemove}
                        className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            )}
            <div
                className={`flex w-full items-center justify-center rounded-lg border-2 border-dashed p-4 ${
                    isDragging
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                        : 'border-gray-300 bg-gray-50 dark:border-neutral-600 dark:bg-neutral-900'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="mb-4 h-8 w-8 text-gray-500 dark:text-neutral-400" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-neutral-400">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-neutral-400">PNG, JPG, GIF up to 2MB</p>
                    </div>
                    <input type="file" className="hidden" onChange={handleChange} accept="image/*" />
                </label>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
    );
};

interface SectionWrapperProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

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

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Web Pages', href: null },
    { title: 'Homepage', href: '/admin/pages/home' },
];

const iconOptions = [
    { value: '', label: 'Select an icon' },
    { value: 'CreditCard', label: 'CreditCard' },
    { value: 'FileText', label: 'FileText' },
    { value: 'FileCheck', label: 'FileCheck' },
    { value: 'UserCheck', label: 'UserCheck' },
    { value: 'FileKey', label: 'FileKey' },
    { value: 'Banknote', label: 'Banknote' },
];

/** Main HomeEdit Component */
export default function HomeEdit({ hero, loanSection, requirementsSection, featuresSection }: HomeEditProps) {
    // Hero Section Form
    const {
        data: heroData,
        setData: setHeroData,
        post: postHero,
        errors: heroErrors,
        processing: heroProcessing,
    } = useForm<HeroFormData>({
        slogan: { en: hero?.slogan?.en || '', es: hero?.slogan?.es || '' },
        heading_part1: { en: hero?.heading_part1?.en || '', es: hero?.heading_part1?.es || '' },
        heading_part2: { en: hero?.heading_part2?.en || '', es: hero?.heading_part2?.es || '' },
        heading_part3: { en: hero?.heading_part3?.en || '', es: hero?.heading_part3?.es || '' },
        sub_heading: { en: hero?.sub_heading?.en || '', es: hero?.sub_heading?.es || '' },
        image: null,
    });

    const [heroImageError, setHeroImageError] = useState<string | null>(null);

    const handleHeroSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'PUT');

        Object.entries(heroData).forEach(([key, value]) => {
            if (key === 'image') {
                if (value instanceof File) {
                    formData.append('image', value);
                } else {
                    // Send empty value if image is null, just like loan section
                    formData.append('image', '');
                }
            } else if (typeof value === 'object') {
                formData.append(`${key}[en]`, value.en);
                formData.append(`${key}[es]`, value.es);
            }
        });
        console.log('Updating hero section with data: ', heroData);
        postHero('/admin/pages/home/hero', { data: formData, forceFormData: true });
    };

    const handleHeroReset = () => {
        setHeroData({
            slogan: { en: hero?.slogan?.en || '', es: hero?.slogan?.es || '' },
            heading_part1: { en: hero?.heading_part1?.en || '', es: hero?.heading_part1?.es || '' },
            heading_part2: { en: hero?.heading_part2?.en || '', es: hero?.heading_part2?.es || '' },
            heading_part3: { en: hero?.heading_part3?.en || '', es: hero?.heading_part3?.es || '' },
            sub_heading: { en: hero?.sub_heading?.en || '', es: hero?.sub_heading?.es || '' },
            image: null,
        });
        setHeroImageError(null);
    };

    const handleHeroImageChange = (file: File | null) => {
        if (file) {
            if (!file.type.startsWith('image/')) {
                setHeroImageError('Please upload a valid image file (PNG, JPG, GIF).');
                setHeroData('image', null);
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                setHeroImageError('File size exceeds 2MB limit.');
                setHeroData('image', null);
                return;
            }
            setHeroImageError(null);
            setHeroData('image', file);
        } else {
            setHeroData('image', null);
            setHeroImageError(null);
        }
    };

    // Loan Section Form
    const {
        data: loanData,
        setData: setLoanData,
        post: postLoan,
        errors: loanErrors,
        processing: loanProcessing,
    } = useForm<LoanFormData>({
        title: { en: loanSection?.title?.en || '', es: loanSection?.title?.es || '' },
        step1: {
            title: { en: loanSection?.step1?.title?.en || '', es: loanSection?.step1?.title?.es || '' },
            description: { en: loanSection?.step1?.description?.en || '', es: loanSection?.step1?.description?.es || '' },
            image: null,
        },
        step2: {
            title: { en: loanSection?.step2?.title?.en || '', es: loanSection?.step2?.title?.es || '' },
            description: { en: loanSection?.step2?.description?.en || '', es: loanSection?.step2?.description?.es || '' },
            image: null,
        },
        step3: {
            title: { en: loanSection?.step3?.title?.en || '', es: loanSection?.step3?.title?.es || '' },
            description: { en: loanSection?.step3?.description?.en || '', es: loanSection?.step3?.description?.es || '' },
            image: null,
        },
        step4: {
            title: { en: loanSection?.step4?.title?.en || '', es: loanSection?.step4?.title?.es || '' },
            description: { en: loanSection?.step4?.description?.en || '', es: loanSection?.step4?.description?.es || '' },
            image: null,
        },
        step5: {
            title: { en: loanSection?.step5?.title?.en || '', es: loanSection?.step5?.title?.es || '' },
            description: { en: loanSection?.step5?.description?.en || '', es: loanSection?.step5?.description?.es || '' },
            image: null,
        },
    });

    const [loanImageErrors, setLoanImageErrors] = useState<{ [key: string]: string | null }>({});

    const handleLoanImageChange = (step: string, file: File | null) => {
        if (file) {
            if (!file.type.startsWith('image/')) {
                setLoanImageErrors((prev) => ({ ...prev, [step]: 'Please upload a valid image file (PNG, JPG, GIF).' }));
                setLoanData(step, { ...loanData[step], image: null });
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                setLoanImageErrors((prev) => ({ ...prev, [step]: 'File size exceeds 2MB limit.' }));
                setLoanData(step, { ...loanData[step], image: null });
                return;
            }
            setLoanImageErrors((prev) => ({ ...prev, [step]: null }));
            setLoanData(step, { ...loanData[step], image: file });
        } else {
            setLoanData(step, { ...loanData[step], image: null });
            setLoanImageErrors((prev) => ({ ...prev, [step]: null }));
        }
    };

    const handleLoanSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('title[en]', loanData.title.en);
        formData.append('title[es]', loanData.title.es);
        ['step1', 'step2', 'step3', 'step4', 'step5'].forEach((step) => {
            const stepData = loanData[step];
            formData.append(`${step}[title][en]`, stepData.title.en);
            formData.append(`${step}[title][es]`, stepData.title.es);
            formData.append(`${step}[description][en]`, stepData.description.en);
            formData.append(`${step}[description][es]`, stepData.description.es);
            if (stepData.image instanceof File) {
                formData.append(`${step}[image]`, stepData.image);
            }
        });
        postLoan('/admin/pages/home/loan-section', { data: formData, forceFormData: true });
    };

    const handleLoanReset = () => {
        setLoanData({
            title: { en: loanSection?.title?.en || '', es: loanSection?.title?.es || '' },
            step1: {
                title: { en: loanSection?.step1?.title?.en || '', es: loanSection?.step1?.title?.es || '' },
                description: { en: loanSection?.step1?.description?.en || '', es: loanSection?.step1?.description?.es || '' },
                image: null,
            },
            step2: {
                title: { en: loanSection?.step2?.title?.en || '', es: loanSection?.step2?.title?.es || '' },
                description: { en: loanSection?.step2?.description?.en || '', es: loanSection?.step2?.description?.es || '' },
                image: null,
            },
            step3: {
                title: { en: loanSection?.step3?.title?.en || '', es: loanSection?.step3?.title?.es || '' },
                description: { en: loanSection?.step3?.description?.en || '', es: loanSection?.step3?.description?.es || '' },
                image: null,
            },
            step4: {
                title: { en: loanSection?.step4?.title?.en || '', es: loanSection?.step4?.title?.en || '' },
                description: { en: loanSection?.step4?.description?.en || '', es: loanSection?.step4?.description?.es || '' },
                image: null,
            },
            step5: {
                title: { en: loanSection?.step5?.title?.en || '', es: loanSection?.step5?.title?.es || '' },
                description: { en: loanSection?.step5?.description?.en || '', es: loanSection?.step5?.description?.es || '' },
                image: null,
            },
        });
        setLoanImageErrors({});
    };

    // Requirements Section Form
    const {
        data: requirementsData,
        setData: setRequirementsData,
        post: postRequirements,
        errors: requirementsErrors,
        processing: requirementsProcessing,
    } = useForm<RequirementsFormData>({
        title: { en: requirementsSection?.title?.en || '', es: requirementsSection?.title?.es || '' },
        subtitle: { en: requirementsSection?.subtitle?.en || '', es: requirementsSection?.subtitle?.es || '' },
        requirement1: {
            icon: { en: requirementsSection?.requirement1?.icon?.en || '', es: requirementsSection?.requirement1?.icon?.es || '' },
            title: { en: requirementsSection?.requirement1?.title?.en || '', es: requirementsSection?.requirement1?.title?.es || '' },
            description: {
                en: requirementsSection?.requirement1?.description?.en || '',
                es: requirementsSection?.requirement1?.description?.es || '',
            },
        },
        requirement2: {
            icon: { en: requirementsSection?.requirement2?.icon?.en || '', es: requirementsSection?.requirement2?.icon?.es || '' },
            title: { en: requirementsSection?.requirement2?.title?.en || '', es: requirementsSection?.requirement2?.title?.es || '' },
            description: {
                en: requirementsSection?.requirement2?.description?.en || '',
                es: requirementsSection?.requirement2?.description?.es || '',
            },
        },
        requirement3: {
            icon: { en: requirementsSection?.requirement3?.icon?.en || '', es: requirementsSection?.requirement3?.icon?.es || '' },
            title: { en: requirementsSection?.requirement3?.title?.en || '', es: requirementsSection?.requirement3?.title?.es || '' },
            description: {
                en: requirementsSection?.requirement3?.description?.en || '',
                es: requirementsSection?.requirement3?.description?.es || '',
            },
        },
        requirement4: {
            icon: { en: requirementsSection?.requirement4?.icon?.en || '', es: requirementsSection?.requirement4?.icon?.es || '' },
            title: { en: requirementsSection?.requirement4?.title?.en || '', es: requirementsSection?.requirement4?.title?.es || '' },
            description: {
                en: requirementsSection?.requirement4?.description?.en || '',
                es: requirementsSection?.requirement4?.description?.es || '',
            },
        },
        requirement5: {
            icon: { en: requirementsSection?.requirement5?.icon?.en || '', es: requirementsSection?.requirement5?.icon?.es || '' },
            title: { en: requirementsSection?.requirement5?.title?.en || '', es: requirementsSection?.requirement5?.title?.es || '' },
            description: {
                en: requirementsSection?.requirement5?.description?.en || '',
                es: requirementsSection?.requirement5?.description?.es || '',
            },
        },
        requirement6: {
            icon: { en: requirementsSection?.requirement6?.icon?.en || '', es: requirementsSection?.requirement6?.icon?.es || '' },
            title: { en: requirementsSection?.requirement6?.title?.en || '', es: requirementsSection?.requirement6?.title?.es || '' },
            description: {
                en: requirementsSection?.requirement6?.description?.en || '',
                es: requirementsSection?.requirement6?.description?.es || '',
            },
        },
    });

    const handleRequirementsSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('title[en]', requirementsData.title.en);
        formData.append('title[es]', requirementsData.title.es);
        formData.append('subtitle[en]', requirementsData.subtitle.en);
        formData.append('subtitle[es]', requirementsData.subtitle.es);
        ['requirement1', 'requirement2', 'requirement3', 'requirement4', 'requirement5', 'requirement6'].forEach((req) => {
            const reqData = requirementsData[req];
            formData.append(`${req}[icon][en]`, reqData.icon.en);
            formData.append(`${req}[icon][es]`, reqData.icon.es);
            formData.append(`${req}[title][en]`, reqData.title.en);
            formData.append(`${req}[title][es]`, reqData.title.es);
            formData.append(`${req}[description][en]`, reqData.description.en);
            formData.append(`${req}[description][es]`, reqData.description.es);
        });
        postRequirements('/admin/pages/home/requirements-section', { data: formData, forceFormData: true });
    };

    const handleRequirementsReset = () => {
        setRequirementsData({
            title: { en: requirementsSection?.title?.en || '', es: requirementsSection?.title?.es || '' },
            subtitle: { en: requirementsSection?.subtitle?.en || '', es: requirementsSection?.subtitle?.es || '' },
            requirement1: {
                icon: { en: requirementsSection?.requirement1?.icon?.en || '', es: requirementsSection?.requirement1?.icon?.es || '' },
                title: { en: requirementsSection?.requirement1?.title?.en || '', es: requirementsSection?.requirement1?.title?.es || '' },
                description: {
                    en: requirementsSection?.requirement1?.description?.en || '',
                    es: requirementsSection?.requirement1?.description?.es || '',
                },
            },
            requirement2: {
                icon: { en: requirementsSection?.requirement2?.icon?.en || '', es: requirementsSection?.requirement2?.icon?.es || '' },
                title: { en: requirementsSection?.requirement2?.title?.en || '', es: requirementsSection?.requirement2?.title?.es || '' },
                description: {
                    en: requirementsSection?.requirement2?.description?.en || '',
                    es: requirementsSection?.requirement2?.description?.es || '',
                },
            },
            requirement3: {
                icon: { en: requirementsSection?.requirement3?.icon?.en || '', es: requirementsSection?.requirement3?.icon?.es || '' },
                title: { en: requirementsSection?.requirement3?.title?.en || '', es: requirementsSection?.requirement3?.title?.es || '' },
                description: {
                    en: requirementsSection?.requirement3?.description?.en || '',
                    es: requirementsSection?.requirement3?.description?.es || '',
                },
            },
            requirement4: {
                icon: { en: requirementsSection?.requirement4?.icon?.en || '', es: requirementsSection?.requirement4?.icon?.es || '' },
                title: { en: requirementsSection?.requirement4?.title?.en || '', es: requirementsSection?.requirement4?.title?.es || '' },
                description: {
                    en: requirementsSection?.requirement4?.description?.en || '',
                    es: requirementsSection?.requirement4?.description?.es || '',
                },
            },
            requirement5: {
                icon: { en: requirementsSection?.requirement5?.icon?.en || '', es: requirementsSection?.requirement5?.icon?.es || '' },
                title: { en: requirementsSection?.requirement5?.title?.en || '', es: requirementsSection?.requirement5?.title?.es || '' },
                description: {
                    en: requirementsSection?.requirement5?.description?.en || '',
                    es: requirementsSection?.requirement5?.description?.es || '',
                },
            },
            requirement6: {
                icon: { en: requirementsSection?.requirement6?.icon?.en || '', es: requirementsSection?.requirement6?.icon?.es || '' },
                title: { en: requirementsSection?.requirement6?.title?.en || '', es: requirementsSection?.requirement6?.title?.es || '' },
                description: {
                    en: requirementsSection?.requirement6?.description?.en || '',
                    es: requirementsSection?.requirement6?.description?.es || '',
                },
            },
        });
    };

    // Features Section Form
    const {
        data: featuresData,
        setData: setFeaturesData,
        post: postFeatures,
        errors: featuresErrors,
        processing: featuresProcessing,
    } = useForm<FeaturesFormData>({
        title: { en: featuresSection?.title?.en || '', es: featuresSection?.title?.es || '' },
        feature1: {
            title: { en: featuresSection?.feature1?.title?.en || '', es: featuresSection?.feature1?.title?.es || '' },
            description: { en: featuresSection?.feature1?.description?.en || '', es: featuresSection?.feature1?.description?.es || '' },
        },
        feature2: {
            title: { en: featuresSection?.feature2?.title?.en || '', es: featuresSection?.feature2?.title?.es || '' },
            description: { en: featuresSection?.feature2?.description?.en || '', es: featuresSection?.feature2?.description?.es || '' },
        },
        feature3: {
            title: { en: featuresSection?.feature3?.title?.en || '', es: featuresSection?.feature3?.title?.en || '' },
            description: { en: featuresSection?.feature3?.description?.en || '', es: featuresSection?.feature3?.description?.es || '' },
        },
        feature4: {
            title: { en: featuresSection?.feature4?.title?.en || '', es: featuresSection?.feature4?.title?.es || '' },
            description: { en: featuresSection?.feature4?.description?.en || '', es: featuresSection?.feature4?.description?.es || '' },
        },
        feature5: {
            title: { en: featuresSection?.feature5?.title?.en || '', es: featuresSection?.feature5?.title?.es || '' },
            description: { en: featuresSection?.feature5?.description?.en || '', es: featuresSection?.feature5?.description?.es || '' },
        },
    });

    const handleFeaturesSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('title[en]', featuresData.title.en);
        formData.append('title[es]', featuresData.title.es);
        ['feature1', 'feature2', 'feature3', 'feature4', 'feature5'].forEach((feat) => {
            const featData = featuresData[feat];
            formData.append(`${feat}[title][en]`, featData.title.en);
            formData.append(`${feat}[title][es]`, featData.title.es);
            formData.append(`${feat}[description][en]`, featData.description.en);
            formData.append(`${feat}[description][es]`, featData.description.es);
        });
        postFeatures('/admin/pages/home/features-section', { data: formData, forceFormData: true });
    };

    const handleFeaturesReset = () => {
        setFeaturesData({
            title: { en: featuresSection?.title?.en || '', es: featuresSection?.title?.es || '' },
            feature1: {
                title: { en: featuresSection?.feature1?.title?.en || '', es: featuresSection?.feature1?.title?.es || '' },
                description: { en: featuresSection?.feature1?.description?.en || '', es: featuresSection?.feature1?.description?.es || '' },
            },
            feature2: {
                title: { en: featuresSection?.feature2?.title?.en || '', es: featuresSection?.feature2?.title?.es || '' },
                description: { en: featuresSection?.feature2?.description?.en || '', es: featuresSection?.feature2?.description?.es || '' },
            },
            feature3: {
                title: { en: featuresSection?.feature3?.title?.en || '', es: featuresSection?.feature3?.title?.es || '' },
                description: { en: featuresSection?.feature3?.description?.en || '', es: featuresSection?.feature3?.description?.es || '' },
            },
            feature4: {
                title: { en: featuresSection?.feature4?.title?.en || '', es: featuresSection?.feature4?.title?.es || '' },
                description: { en: featuresSection?.feature4?.description?.en || '', es: featuresSection?.feature4?.description?.es || '' },
            },
            feature5: {
                title: { en: featuresSection?.feature5?.title?.en || '', es: featuresSection?.feature5?.title?.es || '' },
                description: { en: featuresSection?.feature5?.description?.en || '', es: featuresSection?.feature5?.description?.es || '' },
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Edit Homepage" />
            <AdminLayout title="Edit Homepage" subtitle="Web Pages">
                <div className="container mx-auto py-6">
                    <div className="">
                        {/* Hero Section */}
                        <SectionWrapper title="Hero Section" defaultOpen={true}>
                            <form onSubmit={handleHeroSubmit} className="space-y-6 p-6">
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
                                        <TabPanel className="space-y-6">
                                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                                <TranslatedInput
                                                    label="Slogan"
                                                    value={heroData.slogan.en}
                                                    onChange={(value) => setHeroData('slogan', { ...heroData.slogan, en: value })}
                                                    error={heroErrors['slogan.en']}
                                                    placeholder="Slogan in English"
                                                    required
                                                />
                                                <TranslatedInput
                                                    label="Heading Part 1"
                                                    value={heroData?.heading_part1?.en}
                                                    onChange={(value) => setHeroData('heading_part1', { ...heroData.heading_part1, en: value })}
                                                    error={heroErrors['heading_part1.en']}
                                                    placeholder="First heading part"
                                                    required
                                                />
                                                <TranslatedInput
                                                    label="Heading Part 2"
                                                    value={heroData?.heading_part2?.en}
                                                    onChange={(value) => setHeroData('heading_part2', { ...heroData.heading_part2, en: value })}
                                                    error={heroErrors['heading_part2.en']}
                                                    placeholder="Second heading part"
                                                    required
                                                />
                                                <TranslatedInput
                                                    label="Heading Part 3"
                                                    value={heroData?.heading_part3?.en}
                                                    onChange={(value) => setHeroData('heading_part3', { ...heroData.heading_part3, en: value })}
                                                    error={heroErrors['heading_part3.en']}
                                                    placeholder="Third heading part"
                                                    required
                                                />
                                            </div>
                                            <TranslatedInput
                                                label="Sub-Heading"
                                                value={heroData?.sub_heading?.en}
                                                onChange={(value) => setHeroData('sub_heading', { ...heroData.sub_heading, en: value })}
                                                error={heroErrors['sub_heading.en']}
                                                placeholder="Sub-heading in English"
                                                type="textarea"
                                                required
                                            />
                                        </TabPanel>
                                        <TabPanel className="space-y-6">
                                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                                <TranslatedInput
                                                    label="Slogan"
                                                    value={heroData.slogan.es}
                                                    onChange={(value) => setHeroData('slogan', { ...heroData.slogan, es: value })}
                                                    error={heroErrors['slogan.es']}
                                                    placeholder="Eslogan en español"
                                                    required
                                                />
                                                <TranslatedInput
                                                    label="Heading Parte 1"
                                                    value={heroData?.heading_part1?.es}
                                                    onChange={(value) => setHeroData('heading_part1', { ...heroData.heading_part1, es: value })}
                                                    error={heroErrors['heading_part1.es']}
                                                    placeholder="Primera parte del título"
                                                    required
                                                />
                                                <TranslatedInput
                                                    label="Heading Parte 2"
                                                    value={heroData?.heading_part2?.es}
                                                    onChange={(value) => setHeroData('heading_part2', { ...heroData.heading_part2, es: value })}
                                                    error={heroErrors['heading_part2.es']}
                                                    placeholder="Segunda parte del título"
                                                    required
                                                />
                                                <TranslatedInput
                                                    label="Heading Parte 3"
                                                    value={heroData?.heading_part3?.es}
                                                    onChange={(value) => setHeroData('heading_part3', { ...heroData.heading_part3, es: value })}
                                                    error={heroErrors['heading_part3.es']}
                                                    placeholder="Tercera parte del título"
                                                    required
                                                />
                                            </div>
                                            <TranslatedInput
                                                label="Subtítulo"
                                                value={heroData?.sub_heading?.es}
                                                onChange={(value) => setHeroData('sub_heading', { ...heroData.sub_heading, es: value })}
                                                error={heroErrors['sub_heading.es']}
                                                placeholder="Subtítulo en español"
                                                type="textarea"
                                                required
                                            />
                                        </TabPanel>
                                    </TabPanels>
                                </TabGroup>
                                <FileUpload
                                    label="Hero Image"
                                    onChange={handleHeroImageChange}
                                    error={heroImageError || heroErrors.image}
                                    currentImageUrl={hero?.image_url && !heroData.image ? hero.image_url : undefined}
                                    previewImage={heroData.image}
                                    onRemove={() => handleHeroImageChange(null)}
                                />
                                <div className="flex items-center justify-end space-x-3 border-t border-gray-200 pt-6 dark:border-neutral-700">
                                    <button
                                        type="button"
                                        onClick={handleHeroReset}
                                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:ring-offset-neutral-800"
                                        disabled={heroProcessing}
                                    >
                                        Discard
                                    </button>
                                    <button
                                        type="submit"
                                        className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-neutral-800"
                                        disabled={heroProcessing}
                                    >
                                        {heroProcessing ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </SectionWrapper>

                        {/* Loan Section */}
                        <SectionWrapper title="Loan Section">
                            <form onSubmit={handleLoanSubmit} className="space-y-6 p-6">
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
                                        <TabPanel className="space-y-6">
                                            <TranslatedInput
                                                label="Loan Section Title"
                                                value={loanData.title.en}
                                                onChange={(value) => setLoanData('title', { ...loanData.title, en: value })}
                                                error={loanErrors['title.en']}
                                                placeholder="Loan section title in English"
                                                required
                                            />
                                            {['step1', 'step2', 'step3', 'step4', 'step5'].map((step) => (
                                                <div key={step} className="flex flex-col gap-6 lg:flex-row">
                                                    <div className="space-y-4 lg:w-2/3">
                                                        <TranslatedInput
                                                            label={`${step.charAt(0).toUpperCase() + step.slice(1)} Title`}
                                                            value={loanData[step].title.en}
                                                            onChange={(value) =>
                                                                setLoanData(step, {
                                                                    ...loanData[step],
                                                                    title: { ...loanData[step].title, en: value },
                                                                })
                                                            }
                                                            error={loanErrors[`${step}.title.en`]}
                                                            placeholder={`Enter ${step} title in English`}
                                                            required
                                                        />
                                                        <TranslatedInput
                                                            label={`${step.charAt(0).toUpperCase() + step.slice(1)} Description`}
                                                            value={loanData[step].description.en}
                                                            onChange={(value) =>
                                                                setLoanData(step, {
                                                                    ...loanData[step],
                                                                    description: { ...loanData[step].description, en: value },
                                                                })
                                                            }
                                                            error={loanErrors[`${step}.description.en`]}
                                                            placeholder={`Enter ${step} description in English`}
                                                            type="textarea"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="lg:w-1/3">
                                                        <FileUpload
                                                            label={`${step.charAt(0).toUpperCase() + step.slice(1)} Image`}
                                                            onChange={(file) => handleLoanImageChange(step, file)}
                                                            error={loanImageErrors[step] || loanErrors[`${step}.image`]}
                                                            currentImageUrl={
                                                                loanSection?.[step]?.image_url && !loanData[step].image
                                                                    ? loanSection[step].image_url
                                                                    : undefined
                                                            }
                                                            previewImage={loanData[step].image}
                                                            onRemove={() => handleLoanImageChange(step, null)}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </TabPanel>
                                        <TabPanel className="space-y-6">
                                            <TranslatedInput
                                                label="Título de la Sección de Préstamos"
                                                value={loanData.title.es}
                                                onChange={(value) => setLoanData('title', { ...loanData.title, es: value })}
                                                error={loanErrors['title.es']}
                                                placeholder="Título de la sección de préstamos en español"
                                                required
                                            />
                                            {['step1', 'step2', 'step3', 'step4', 'step5'].map((step) => (
                                                <div key={step} className="flex flex-col gap-6 lg:flex-row">
                                                    <div className="space-y-4 lg:w-2/3">
                                                        <TranslatedInput
                                                            label={`Título ${step.charAt(0).toUpperCase() + step.slice(1)}`}
                                                            value={loanData[step].title.es}
                                                            onChange={(value) =>
                                                                setLoanData(step, {
                                                                    ...loanData[step],
                                                                    title: { ...loanData[step].title, es: value },
                                                                })
                                                            }
                                                            error={loanErrors[`${step}.title.es`]}
                                                            placeholder={`Ingrese el título ${step} en español`}
                                                            required
                                                        />
                                                        <TranslatedInput
                                                            label={`Descripción ${step.charAt(0).toUpperCase() + step.slice(1)}`}
                                                            value={loanData[step].description.es}
                                                            onChange={(value) =>
                                                                setLoanData(step, {
                                                                    ...loanData[step],
                                                                    description: { ...loanData[step].description, es: value },
                                                                })
                                                            }
                                                            error={loanErrors[`${step}.description.es`]}
                                                            placeholder={`Ingrese la descripción ${step} en español`}
                                                            type="textarea"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="lg:w-1/3">
                                                        <FileUpload
                                                            label={`Imagen ${step.charAt(0).toUpperCase() + step.slice(1)}`}
                                                            onChange={(file) => handleLoanImageChange(step, file)}
                                                            error={loanImageErrors[step] || loanErrors[`${step}.image`]}
                                                            currentImageUrl={
                                                                loanSection?.[step]?.image_url && !loanData[step].image
                                                                    ? loanSection[step].image_url
                                                                    : undefined
                                                            }
                                                            previewImage={loanData[step].image}
                                                            onRemove={() => handleLoanImageChange(step, null)}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </TabPanel>
                                    </TabPanels>
                                </TabGroup>
                                <div className="flex items-center justify-end space-x-3 border-t border-gray-200 pt-6 dark:border-neutral-700">
                                    <button
                                        type="button"
                                        onClick={handleLoanReset}
                                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:ring-offset-neutral-800"
                                        disabled={loanProcessing}
                                    >
                                        Discard
                                    </button>
                                    <button
                                        type="submit"
                                        className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-neutral-800"
                                        disabled={loanProcessing}
                                    >
                                        {loanProcessing ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </SectionWrapper>

                        {/* Requirements Section */}
                        <SectionWrapper title="Requirements Section">
                            <form onSubmit={handleRequirementsSubmit} className="space-y-6 p-6">
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
                                        <TabPanel className="space-y-6">
                                            <TranslatedInput
                                                label="Requirements Section Title"
                                                value={requirementsData.title.en}
                                                onChange={(value) => setRequirementsData('title', { ...requirementsData.title, en: value })}
                                                error={requirementsErrors['title.en']}
                                                placeholder="Requirements section title in English"
                                                required
                                            />
                                            <TranslatedInput
                                                label="Requirements Section Subtitle"
                                                value={requirementsData.subtitle.en}
                                                onChange={(value) => setRequirementsData('subtitle', { ...requirementsData.subtitle, en: value })}
                                                error={requirementsErrors['subtitle.en']}
                                                placeholder="Requirements section subtitle in English"
                                                type="textarea"
                                                required
                                            />
                                            {['requirement1', 'requirement2', 'requirement3', 'requirement4', 'requirement5', 'requirement6'].map(
                                                (req) => (
                                                    <div key={req} className="space-y-4">
                                                        <TranslatedInput
                                                            label={`${req.charAt(0).toUpperCase() + req.slice(1)} Icon`}
                                                            value={requirementsData[req].icon.en}
                                                            onChange={(value) =>
                                                                setRequirementsData(req, {
                                                                    ...requirementsData[req],
                                                                    icon: { ...requirementsData[req].icon, en: value },
                                                                })
                                                            }
                                                            error={requirementsErrors[`${req}.icon.en`]}
                                                            placeholder={`Select icon for ${req}`}
                                                            type="select"
                                                            options={iconOptions}
                                                            required
                                                        />
                                                        <TranslatedInput
                                                            label={`${req.charAt(0).toUpperCase() + req.slice(1)} Title`}
                                                            value={requirementsData[req].title.en}
                                                            onChange={(value) =>
                                                                setRequirementsData(req, {
                                                                    ...requirementsData[req],
                                                                    title: { ...requirementsData[req].title, en: value },
                                                                })
                                                            }
                                                            error={requirementsErrors[`${req}.title.en`]}
                                                            placeholder={`Enter ${req} title in English`}
                                                            required
                                                        />
                                                        <TranslatedInput
                                                            label={`${req.charAt(0).toUpperCase() + req.slice(1)} Description`}
                                                            value={requirementsData[req].description.en}
                                                            onChange={(value) =>
                                                                setRequirementsData(req, {
                                                                    ...requirementsData[req],
                                                                    description: { ...requirementsData[req].description, en: value },
                                                                })
                                                            }
                                                            error={requirementsErrors[`${req}.description.en`]}
                                                            placeholder={`Enter ${req} description in English`}
                                                            type="textarea"
                                                            required
                                                        />
                                                    </div>
                                                ),
                                            )}
                                        </TabPanel>
                                        <TabPanel className="space-y-6">
                                            <TranslatedInput
                                                label="Título de la Sección de Requisitos"
                                                value={requirementsData.title.es}
                                                onChange={(value) => setRequirementsData('title', { ...requirementsData.title, es: value })}
                                                error={requirementsErrors['title.es']}
                                                placeholder="Título de la sección de requisitos en español"
                                                required
                                            />
                                            <TranslatedInput
                                                label="Subtítulo de la Sección de Requisitos"
                                                value={requirementsData.subtitle.es}
                                                onChange={(value) => setRequirementsData('subtitle', { ...requirementsData.subtitle, es: value })}
                                                error={requirementsErrors['subtitle.es']}
                                                placeholder="Subtítulo de la sección de requisitos en español"
                                                type="textarea"
                                                required
                                            />
                                            {['requirement1', 'requirement2', 'requirement3', 'requirement4', 'requirement5', 'requirement6'].map(
                                                (req) => (
                                                    <div key={req} className="space-y-4">
                                                        <TranslatedInput
                                                            label={`Ícono ${req.charAt(0).toUpperCase() + req.slice(1)}`}
                                                            value={requirementsData[req].icon.es}
                                                            onChange={(value) =>
                                                                setRequirementsData(req, {
                                                                    ...requirementsData[req],
                                                                    icon: { ...requirementsData[req].icon, es: value },
                                                                })
                                                            }
                                                            error={requirementsErrors[`${req}.icon.es`]}
                                                            placeholder={`Seleccione ícono para ${req}`}
                                                            type="select"
                                                            options={iconOptions}
                                                            required
                                                        />
                                                        <TranslatedInput
                                                            label={`Título ${req.charAt(0).toUpperCase() + req.slice(1)}`}
                                                            value={requirementsData[req].title.es}
                                                            onChange={(value) =>
                                                                setRequirementsData(req, {
                                                                    ...requirementsData[req],
                                                                    title: { ...requirementsData[req].title, es: value },
                                                                })
                                                            }
                                                            error={requirementsErrors[`${req}.title.es`]}
                                                            placeholder={`Ingrese el título ${req} en español`}
                                                            required
                                                        />
                                                        <TranslatedInput
                                                            label={`Descripción ${req.charAt(0).toUpperCase() + req.slice(1)}`}
                                                            value={requirementsData[req].description.es}
                                                            onChange={(value) =>
                                                                setRequirementsData(req, {
                                                                    ...requirementsData[req],
                                                                    description: { ...requirementsData[req].description, es: value },
                                                                })
                                                            }
                                                            error={requirementsErrors[`${req}.description.es`]}
                                                            placeholder={`Ingrese la descripción ${req} en español`}
                                                            type="textarea"
                                                            required
                                                        />
                                                    </div>
                                                ),
                                            )}
                                        </TabPanel>
                                    </TabPanels>
                                </TabGroup>
                                <div className="flex items-center justify-end space-x-3 border-t border-gray-200 pt-6 dark:border-neutral-700">
                                    <button
                                        type="button"
                                        onClick={handleRequirementsReset}
                                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:ring-offset-neutral-800"
                                        disabled={requirementsProcessing}
                                    >
                                        Discard
                                    </button>
                                    <button
                                        type="submit"
                                        className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-neutral-800"
                                        disabled={requirementsProcessing}
                                    >
                                        {requirementsProcessing ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </SectionWrapper>

                        {/* Features Section */}
                        <SectionWrapper title="Features Section">
                            <form onSubmit={handleFeaturesSubmit} className="space-y-6 p-6">
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
                                        <TabPanel className="space-y-6">
                                            <TranslatedInput
                                                label="Features Section Title"
                                                value={featuresData.title.en}
                                                onChange={(value) => setFeaturesData('title', { ...featuresData.title, en: value })}
                                                error={featuresErrors['title.en']}
                                                placeholder="Features section title in English"
                                                required
                                            />
                                            {['feature1', 'feature2', 'feature3', 'feature4', 'feature5'].map((feat) => (
                                                <div key={feat} className="space-y-4">
                                                    <TranslatedInput
                                                        label={`${feat.charAt(0).toUpperCase() + feat.slice(1)} Title`}
                                                        value={featuresData[feat].title.en}
                                                        onChange={(value) =>
                                                            setFeaturesData(feat, {
                                                                ...featuresData[feat],
                                                                title: { ...featuresData[feat].title, en: value },
                                                            })
                                                        }
                                                        error={featuresErrors[`${feat}.title.en`]}
                                                        placeholder={`Enter ${feat} title in English`}
                                                        required
                                                    />
                                                    <TranslatedInput
                                                        label={`${feat.charAt(0).toUpperCase() + feat.slice(1)} Description`}
                                                        value={featuresData[feat].description.en}
                                                        onChange={(value) =>
                                                            setFeaturesData(feat, {
                                                                ...featuresData[feat],
                                                                description: { ...featuresData[feat].description, en: value },
                                                            })
                                                        }
                                                        error={featuresErrors[`${feat}.description.en`]}
                                                        placeholder={`Enter ${feat} description in English`}
                                                        type="textarea"
                                                        required
                                                    />
                                                </div>
                                            ))}
                                        </TabPanel>
                                        <TabPanel className="space-y-6">
                                            <TranslatedInput
                                                label="Título de la Sección de Características"
                                                value={featuresData.title.es}
                                                onChange={(value) => setFeaturesData('title', { ...featuresData.title, es: value })}
                                                error={featuresErrors['title.es']}
                                                placeholder="Título de la sección de características en español"
                                                required
                                            />
                                            {['feature1', 'feature2', 'feature3', 'feature4', 'feature5'].map((feat) => (
                                                <div key={feat} className="space-y-4">
                                                    <TranslatedInput
                                                        label={`Título ${feat.charAt(0).toUpperCase() + feat.slice(1)}`}
                                                        value={featuresData[feat].title.es}
                                                        onChange={(value) =>
                                                            setFeaturesData(feat, {
                                                                ...featuresData[feat],
                                                                title: { ...featuresData[feat].title, es: value },
                                                            })
                                                        }
                                                        error={featuresErrors[`${feat}.title.es`]}
                                                        placeholder={`Ingrese el título ${feat} en español`}
                                                        required
                                                    />
                                                    <TranslatedInput
                                                        label={`Descripción ${feat.charAt(0).toUpperCase() + feat.slice(1)}`}
                                                        value={featuresData[feat].description.es}
                                                        onChange={(value) =>
                                                            setFeaturesData(feat, {
                                                                ...featuresData[feat],
                                                                description: { ...featuresData[feat].description, es: value },
                                                            })
                                                        }
                                                        error={featuresErrors[`${feat}.description.es`]}
                                                        placeholder={`Ingrese la descripción ${feat} en español`}
                                                        type="textarea"
                                                        required
                                                    />
                                                </div>
                                            ))}
                                        </TabPanel>
                                    </TabPanels>
                                </TabGroup>
                                <div className="flex items-center justify-end space-x-3 border-t border-gray-200 pt-6 dark:border-neutral-700">
                                    <button
                                        type="button"
                                        onClick={handleFeaturesReset}
                                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:ring-offset-neutral-800"
                                        disabled={featuresProcessing}
                                    >
                                        Discard
                                    </button>
                                    <button
                                        type="submit"
                                        className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-neutral-800"
                                        disabled={featuresProcessing}
                                    >
                                        {featuresProcessing ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </SectionWrapper>
                    </div>
                </div>
            </AdminLayout>
        </AppLayout>
    );
}
