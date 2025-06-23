import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { Globe } from 'lucide-react';
import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import TranslatedInput from '../components/TranslatedInput';

interface TranslatedField {
    en: string;
    es: string;
}

interface LoanItem {
    id?: number;
    title: TranslatedField;
    description: TranslatedField;
    image_path?: string;
}

interface LoanSection {
    id?: number;
    title?: TranslatedField;
}

interface LoanFormData {
    title: TranslatedField;
    loanItems: LoanItem[];
}

interface Props {
    loanSection?: LoanSection;
    loanItems?: LoanItem[];
}

export default function LoanEdit({ loanSection, loanItems }: Props) {
    const { data, setData, post, errors, processing } = useForm<LoanFormData>({
        title: {
            en: loanSection?.title?.en || '',
            es: loanSection?.title?.es || '',
        },
        loanItems:
            loanItems?.map((item) => ({
                id: item.id,
                title: { en: item.title?.en || '', es: item.title?.es || '' },
                description: { en: item.description?.en || '', es: item.description?.es || '' },
                image: null,
                image_path: item.image_path ? `${item.image_path}` : '',
            })) || [],
    });

    const [imageErrors, setImageErrors] = useState<{ [key: number]: string | null }>({});
    const [selectedIndex, setSelectedIndex] = useState(0);

    const updateItem = (index: number, key: 'title' | 'description', lang: 'en' | 'es', value: string) => {
        setData(
            'loanItems',
            data.loanItems.map((item, i) => (i === index ? { ...item, [key]: { ...item[key], [lang]: value } } : item)),
        );
    };

    const handleImageChange = (index: number, file: File | null) => {
        if (file) {
            if (!file.type.startsWith('image/')) {
                setImageErrors((prev) => ({ ...prev, [index]: 'Please upload a valid image file (PNG, JPG, GIF).' }));
                setData(
                    'loanItems',
                    data.loanItems.map((item, i) => (i === index ? { ...item, image: null } : item)),
                );
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                setImageErrors((prev) => ({ ...prev, [index]: 'File size exceeds 2MB limit.' }));
                setData(
                    'loanItems',
                    data.loanItems.map((item, i) => (i === index ? { ...item, image: null } : item)),
                );
                return;
            }
            setImageErrors((prev) => ({ ...prev, [index]: null }));
            setData(
                'loanItems',
                data.loanItems.map((item, i) => (i === index ? { ...item, image: file } : item)),
            );
        } else {
            setData(
                'loanItems',
                data.loanItems.map((item, i) => (i === index ? { ...item, image: null } : item)),
            );
            setImageErrors((prev) => ({ ...prev, [index]: null }));
        }
    };

    const addItem = () => {
        const newIndex = data.loanItems.length;
        setData('loanItems', [...data.loanItems, { title: { en: '', es: '' }, description: { en: '', es: '' }, image: null, image_path: '' }]);
        setSelectedIndex(newIndex);
    };

    const resetItem = () => {
        setData({
            title: {
                en: loanSection?.title?.en || '',
                es: loanSection?.title?.es || '',
            },
            loanItems:
                loanItems?.map((item) => ({
                    id: item.id,
                    title: { en: item.title?.en || '', es: item.title?.es || '' },
                    description: { en: item.description?.en || '', es: item.description?.es || '' },
                    image: null,
                    image_path: item.image_path ? `/storage/${item.image_path}` : '',
                })) || [],
        });
        setImageErrors({});
        setSelectedIndex(0);
    };

    const deleteItem = () => {
        if (data.loanItems.length === 0) return;
        setData(
            'loanItems',
            data.loanItems.filter((_, i) => i !== selectedIndex),
        );
        setImageErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[selectedIndex];
            return newErrors;
        });
        setSelectedIndex((prevIndex) => Math.min(prevIndex, data.loanItems.length - 2));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('title[en]', data.title.en);
        formData.append('title[es]', data.title.es);

        data.loanItems.forEach((item, index) => {
            if (item.id) {
                formData.append(`loanItems[${index}][id]`, item.id.toString());
            }
            formData.append(`loanItems[${index}][title][en]`, item.title.en);
            formData.append(`loanItems[${index}][title][es]`, item.title.es);
            formData.append(`loanItems[${index}][description][en]`, item.description.en);
            formData.append(`loanItems[${index}][description][es]`, item.description.es);
            formData.append(`loanItems[${index}][image]`, item.image instanceof File ? item.image : '');
        });

        post('/admin/pages/home/loan-section', {
            data: formData,
            forceFormData: true,
            onSuccess: () => {
                alert('Loan section updated successfully.');
            },
            onError: (errors) => {
                console.error('Save errors:', errors);
                alert('Failed to save changes: ' + Object.values(errors).join(', '));
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
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
                            value={data.title.en}
                            onChange={(value) => setData('title', { ...data.title, en: value })}
                            error={errors['title.en']}
                            placeholder="Loan section title in English"
                            required
                        />
                    </TabPanel>
                    <TabPanel className="space-y-6">
                        <TranslatedInput
                            label="Título de la Sección de Préstamos"
                            value={data.title.es}
                            onChange={(value) => setData('title', { ...data.title, es: value })}
                            error={errors['title.es']}
                            placeholder="Título de la sección de préstamos en español"
                            required
                        />
                    </TabPanel>
                </TabPanels>
            </TabGroup>

            <div className="flex items-center gap-4">
                {data.loanItems.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`h-10 w-10 rounded-full border-2 p-2 px-2 py-1 text-sm font-medium ${
                            index === selectedIndex ? 'bg-blue-600 text-white' : 'border-blue-600 text-blue-600'
                        }`}
                        onClick={() => setSelectedIndex(index)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={addItem}
                    type="button"
                    className="h-10 w-10 rounded-full border-2 border-gray-400 text-xl text-gray-600 dark:text-gray-300"
                >
                    +
                </button>
            </div>

            {data.loanItems.length > 0 && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-4 lg:col-span-2">
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
                                        label="Title"
                                        value={data.loanItems[selectedIndex].title.en}
                                        onChange={(value) => updateItem(selectedIndex, 'title', 'en', value)}
                                        error={errors[`loanItems.${selectedIndex}.title.en`]}
                                        placeholder="Enter title in English"
                                        required
                                    />
                                    <TranslatedInput
                                        label="Description"
                                        value={data.loanItems[selectedIndex].description.en}
                                        onChange={(value) => updateItem(selectedIndex, 'description', 'en', value)}
                                        error={errors[`loanItems.${selectedIndex}.description.en`]}
                                        placeholder="Enter description in English"
                                        type="textarea"
                                        required
                                    />
                                </TabPanel>
                                <TabPanel className="space-y-6">
                                    <TranslatedInput
                                        label="Título"
                                        value={data.loanItems[selectedIndex].title.es}
                                        onChange={(value) => updateItem(selectedIndex, 'title', 'es', value)}
                                        error={errors[`loanItems.${selectedIndex}.title.es`]}
                                        placeholder="Ingrese título en español"
                                        required
                                    />
                                    <TranslatedInput
                                        label="Descripción"
                                        value={data.loanItems[selectedIndex].description.es}
                                        onChange={(value) => updateItem(selectedIndex, 'description', 'es', value)}
                                        error={errors[`loanItems.${selectedIndex}.description.es`]}
                                        placeholder="Ingrese descripción en español"
                                        type="textarea"
                                        required
                                    />
                                </TabPanel>
                            </TabPanels>
                        </TabGroup>
                    </div>
                    <div>
                        <FileUpload
                            label={`Loan Item ${selectedIndex + 1} Image`}
                            onChange={(file) => handleImageChange(selectedIndex, file)}
                            error={imageErrors[selectedIndex] || errors[`loanItems.${selectedIndex}.image`]}
                            currentImageUrl={
                                data.loanItems[selectedIndex].image_path && !data.loanItems[selectedIndex].image
                                    ? data.loanItems[selectedIndex].image_path
                                    : undefined
                            }
                            previewImage={data.loanItems[selectedIndex].image}
                            onRemove={() => handleImageChange(selectedIndex, null)}
                        />
                    </div>
                </div>
            )}

            <div className="flex items-center justify-end gap-4 border-t border-gray-200 pt-6 dark:border-neutral-700">
                <button
                    type="button"
                    onClick={resetItem}
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
                    onClick={deleteItem}
                    className="inline-flex items-center rounded-md border border-red-400 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-600 dark:text-red-300 dark:hover:bg-red-900/20"
                    disabled={data.loanItems.length === 0 || processing}
                >
                    Delete
                </button>
            </div>
        </form>
    );
}
