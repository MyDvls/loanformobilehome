import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { Globe } from 'lucide-react';
import { useState } from 'react';
import TranslatedInput from '../components/TranslatedInput';
import FileUpload from '../components/FileUpload';
interface TranslatedField {
    en: string;
    es: string;
}

interface HeroSection {
    slogan?: TranslatedField;
    heading_part1?: TranslatedField;
    heading_part2?: TranslatedField;
    heading_part3?: TranslatedField;
    sub_heading?: TranslatedField;
    image_url?: string;
}

interface HeroFormData {
    slogan: TranslatedField;
    heading_part1: TranslatedField;
    heading_part2: TranslatedField;
    heading_part3: TranslatedField;
    sub_heading: TranslatedField;
    image: File | null;
}

export default function HeroEdit({ hero }: { hero: HeroSection }) {
    const { data, setData, post, errors, processing } = useForm<HeroFormData>({
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
        Object.entries(data).forEach(([key, value]) => {
            if (key === 'image') {
                formData.append('image', value instanceof File ? value : '');
            } else {
                formData.append(`${key}[en]`, value.en);
                formData.append(`${key}[es]`, value.es);
            }
        });
        post('/admin/pages/home/hero', { data: formData, forceFormData: true });
    };

    const handleHeroImageChange = (file: File | null) => {
        if (file) {
            if (!file.type.startsWith('image/')) {
                setHeroImageError('Please upload a valid image file (PNG, JPG, GIF).');
                setData('image', null);
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                setHeroImageError('File size exceeds 2MB limit.');
                setData('image', null);
                return;
            }
            setHeroImageError(null);
            setData('image', file);
        } else {
            setData('image', null);
            setHeroImageError(null);
        }
    };

    const handleHeroReset = () => {
        setData({
            slogan: { en: hero?.slogan?.en || '', es: hero?.slogan?.es || '' },
            heading_part1: { en: hero?.heading_part1?.en || '', es: hero?.heading_part1?.es || '' },
            heading_part2: { en: hero?.heading_part2?.en || '', es: hero?.heading_part2?.es || '' },
            heading_part3: { en: hero?.heading_part3?.en || '', es: hero?.heading_part3?.es || '' },
            sub_heading: { en: hero?.sub_heading?.en || '', es: hero?.sub_heading?.es || '' },
            image: null,
        });
        setHeroImageError(null);
    };

    return (
        <form onSubmit={handleHeroSubmit} className="space-y-6 p-6">
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
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <TranslatedInput
                                label="Slogan"
                                value={data.slogan.en}
                                onChange={(value) => setData('slogan', { ...data.slogan, en: value })}
                                error={errors['slogan.en']}
                                placeholder="Slogan in English"
                                required
                            />
                            <TranslatedInput
                                label="Heading Part 1"
                                value={data.heading_part1.en}
                                onChange={(value) => setData('heading_part1', { ...data.heading_part1, en: value })}
                                error={errors['heading_part1.en']}
                                placeholder="First heading part"
                                required
                            />
                            <TranslatedInput
                                label="Heading Part 2"
                                value={data.heading_part2.en}
                                onChange={(value) => setData('heading_part2', { ...data.heading_part2, en: value })}
                                error={errors['heading_part2.en']}
                                placeholder="Second heading part"
                                required
                            />
                            <TranslatedInput
                                label="Heading Part 3"
                                value={data.heading_part3.en}
                                onChange={(value) => setData('heading_part3', { ...data.heading_part3, en: value })}
                                error={errors['heading_part3.en']}
                                placeholder="Third heading part"
                                required
                            />
                        </div>
                        <TranslatedInput
                            label="Sub-Heading"
                            value={data.sub_heading.en}
                            onChange={(value) => setData('sub_heading', { ...data.sub_heading, en: value })}
                            error={errors['sub_heading.en']}
                            placeholder="Sub-heading in English"
                            type="textarea"
                            required
                        />
                    </TabPanel>
                    <TabPanel className="space-y-6">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <TranslatedInput
                                label="Slogan"
                                value={data.slogan.es}
                                onChange={(value) => setData('slogan', { ...data.slogan, es: value })}
                                error={errors['slogan.es']}
                                placeholder="Eslogan en español"
                                required
                            />
                            <TranslatedInput
                                label="Heading Parte 1"
                                value={data.heading_part1.es}
                                onChange={(value) => setData('heading_part1', { ...data.heading_part1, es: value })}
                                error={errors['heading_part1.es']}
                                placeholder="Primera parte del título"
                                required
                            />
                            <TranslatedInput
                                label="Heading Parte 2"
                                value={data.heading_part2.es}
                                onChange={(value) => setData('heading_part2', { ...data.heading_part2, es: value })}
                                error={errors['heading_part2.es']}
                                placeholder="Segunda parte del título"
                                required
                            />
                            <TranslatedInput
                                label="Heading Parte 3"
                                value={data.heading_part3.es}
                                onChange={(value) => setData('heading_part3', { ...data.heading_part3, es: value })}
                                error={errors['heading_part3.es']}
                                placeholder="Tercera parte del título"
                                required
                            />
                        </div>
                        <TranslatedInput
                            label="Subtítulo"
                            value={data.sub_heading.es}
                            onChange={(value) => setData('sub_heading', { ...data.sub_heading, es: value })}
                            error={errors['sub_heading.es']}
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
                error={heroImageError || errors.image}
                currentImageUrl={hero?.image_url && !data.image ? hero.image_url : undefined}
                previewImage={data.image}
                onRemove={() => handleHeroImageChange(null)}
            />
            <div className="flex items-center justify-end space-x-3 border-t border-gray-200 pt-6 dark:border-neutral-700">
                <button
                    type="button"
                    onClick={handleHeroReset}
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
    );
}
