import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { Globe } from 'lucide-react';
import TranslatedInput from '../components/TranslatedInput';

interface TranslatedField {
    en: string;
    es: string;
}

interface Requirement {
    icon: TranslatedField;
    title: TranslatedField;
    description: TranslatedField;
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

const iconOptions = [
    { value: '', label: 'Select an icon' },
    { value: 'CreditCard', label: 'CreditCard' },
    { value: 'FileText', label: 'FileText' },
    { value: 'FileCheck', label: 'FileCheck' },
    { value: 'UserCheck', label: 'UserCheck' },
    { value: 'FileKey', label: 'FileKey' },
    { value: 'Banknote', label: 'Banknote' },
];

export default function RequirementsEdit({ requirementsSection }: { requirementsSection: RequirementsSection }) {
    const { data, setData, post, errors, processing } = useForm<RequirementsFormData>({
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
        formData.append('title[en]', data.title.en);
        formData.append('title[es]', data.title.es);
        formData.append('subtitle[en]', data.subtitle.en);
        formData.append('subtitle[es]', data.subtitle.es);
        ['requirement1', 'requirement2', 'requirement3', 'requirement4', 'requirement5', 'requirement6'].forEach((req) => {
            const reqData = data[req];
            formData.append(`${req}[icon][en]`, reqData.icon.en);
            formData.append(`${req}[icon][es]`, reqData.icon.es);
            formData.append(`${req}[title][en]`, reqData.title.en);
            formData.append(`${req}[title][es]`, reqData.title.es);
            formData.append(`${req}[description][en]`, reqData.description.en);
            formData.append(`${req}[description][es]`, reqData.description.es);
        });
        post('/admin/pages/home/requirements-section', { data: formData, forceFormData: true });
    };

    const handleRequirementsReset = () => {
        setData({
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

    return (
        <form onSubmit={handleRequirementsSubmit} className="space-y-6 p-6">
            <TabGroup>
                <TabList className="flex space-x-1 rounded-lg bg-gray-100 p-1 dark:bg-neutral-700">
                    <Tab
                        className={({ selected }) =>
                            `flex w-full items-center justify-center rounded-md py-2.5 text-sm font-semibold transition-all ${selected ? 'bg-white text-blue-700 shadow-sm dark:bg-blue-600 dark:text-white' : 'text-gray-500 hover:bg-gray-200 dark:text-neutral-200 dark:hover:bg-neutral-600'}`
                        }
                    >
                        <Globe className="mr-2 h-4 w-4" /> English
                    </Tab>
                    <Tab
                        className={({ selected }) =>
                            `flex w-full items-center justify-center rounded-md py-2.5 text-sm font-semibold transition-all ${selected ? 'bg-white text-blue-700 shadow-sm dark:bg-blue-600 dark:text-white' : 'text-gray-500 hover:bg-gray-200 dark:text-neutral-200 dark:hover:bg-neutral-600'}`
                        }
                    >
                        <Globe className="mr-2 h-4 w-4" /> Spanish
                    </Tab>
                </TabList>
                <TabPanels className="mt-6">
                    <TabPanel className="space-y-6">
                        <TranslatedInput
                            label="Requirements Section Title"
                            value={data.title.en}
                            onChange={(value) => setData('title', { ...data.title, en: value })}
                            error={errors['title.en']}
                            placeholder="Requirements section title in English"
                            required
                        />
                        <TranslatedInput
                            label="Subtitle"
                            value={data.subtitle.en}
                            onChange={(value) => setData('subtitle', { ...data.subtitle, en: value })}
                            error={errors['subtitle.en']}
                            placeholder="Requirements section subtitle in English"
                            type="textarea"
                            required
                        />
                        {['requirement1', 'requirement2', 'requirement3', 'requirement4', 'requirement5', 'requirement6'].map((req) => (
                            <div key={req} className="space-y-4">
                                <TranslatedInput
                                    label={`${req.charAt(0).toUpperCase() + req.slice(1)} Icon`}
                                    value={data[req].icon.en}
                                    onChange={(value) =>
                                        setData(req, {
                                            ...data[req],
                                            icon: { ...data[req].icon, en: value },
                                        })
                                    }
                                    error={errors[`${req}.icon.en`]}
                                    placeholder={`Select icon for ${req}`}
                                    type="select"
                                    options={iconOptions}
                                    required
                                />
                                <TranslatedInput
                                    label={`${req.charAt(0).toUpperCase() + req.slice(1)} Title`}
                                    value={data[req].title.en}
                                    onChange={(value) =>
                                        setData(req, {
                                            ...data[req],
                                            title: { ...data[req].title, en: value },
                                        })
                                    }
                                    error={errors[`${req}.title.en`]}
                                    placeholder={`Enter ${req} title in English`}
                                    required
                                />
                                <TranslatedInput
                                    label={`${req.charAt(0).toUpperCase() + req.slice(1)} Description`}
                                    value={data[req].description.en}
                                    onChange={(value) =>
                                        setData(req, {
                                            ...data[req],
                                            description: { ...data[req].description, en: value },
                                        })
                                    }
                                    error={errors[`${req}.description.en`]}
                                    placeholder={`Enter ${req} description in English`}
                                    type="textarea"
                                    required
                                />
                            </div>
                        ))}
                    </TabPanel>
                    <TabPanel className="space-y-6">
                        <TranslatedInput
                            label="Título de la Sección de Requisitos"
                            value={data.title.es}
                            onChange={(value) => setData('title', { ...data.title, es: value })}
                            error={errors['title.es']}
                            placeholder="Título de la sección de requisitos en español"
                            required
                        />
                        <TranslatedInput
                            label="Subtítulo"
                            value={data.subtitle.es}
                            onChange={(value) => setData('subtitle', { ...data.subtitle, es: value })}
                            error={errors['subtitle.es']}
                            placeholder="Subtítulo de la sección de requisitos en español"
                            type="textarea"
                            required
                        />
                        {['requirement1', 'requirement2', 'requirement3', 'requirement4', 'requirement5', 'requirement6'].map((req) => (
                            <div key={req} className="space-y-4">
                                <TranslatedInput
                                    label={`Ícono de ${req.charAt(0).toUpperCase() + req.slice(1)}`}
                                    value={data[req].icon.es}
                                    onChange={(value) =>
                                        setData(req, {
                                            ...data[req],
                                            icon: { ...data[req].icon, es: value },
                                        })
                                    }
                                    error={errors[`${req}.icon.es`]}
                                    placeholder={`Seleccione ícono para ${req}`}
                                    type="select"
                                    options={iconOptions}
                                    required
                                />
                                <TranslatedInput
                                    label={`Título ${req.charAt(0).toUpperCase() + req.slice(1)}`}
                                    value={data[req].title.es}
                                    onChange={(value) =>
                                        setData(req, {
                                            ...data[req],
                                            title: { ...data[req].title, es: value },
                                        })
                                    }
                                    error={errors[`${req}.title.es`]}
                                    placeholder={`Ingrese ${req} título en español`}
                                    required
                                />
                                <TranslatedInput
                                    label={`Descripción ${req.charAt(0).toUpperCase() + req.slice(1)}`}
                                    value={errors[`${req}.description.es`]}
                                    onChange={(value) =>
                                        setData(req, {
                                            ...data[req],
                                            description: { ...data[req].description, es: value },
                                        })
                                    }
                                    error={errors[`${req}.description.es`]}
                                    placeholder={`Ingrese ${req} descripción en español`}
                                    type="textarea"
                                    required
                                />
                            </div>
                        ))}
                    </TabPanel>
                </TabPanels>
            </TabGroup>
            <div className="flex items-center justify-end space-x-3 border-t border-gray-200 pt-6 dark:border-neutral-600">
                <button
                    type="button"
                    onClick={handleRequirementsReset}
                    className="dark:focus:ring-offset-dark2 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:border-neutral-600 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
                    disabled={processing}
                >
                    Discard
                </button>
                <button
                    type="submit"
                    className="dark:focus:ring-offset-dark inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
                    disabled={processing}
                >
                    {processing ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </form>
    );
}
