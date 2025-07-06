import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import TranslatedInput from '../components/TranslatedInput';

interface HeroItem {
    id?: number;
    image_path?: string;
}

interface HeroSection {
    slogan?: string;
    heading_part1?: string;
    heading_part2?: string;
    heading_part3?: string;
    sub_heading?: string;
}

interface HeroFormData {
    slogan: string;
    heading_part1: string;
    heading_part2: string;
    heading_part3: string;
    sub_heading: string;
    heroItems: Array<{
        id?: number;
        image: File | null;
        image_path?: string;
    }>;
}

interface Props {
    hero?: HeroSection;
    heroItems?: HeroItem[];
}

export default function HeroEdit({ hero, heroItems }: Props) {
    console.log('HeroEdit component rendered with hero:', hero, 'and heroItems:', heroItems);
    const { data, setData, post, errors, processing } = useForm<HeroFormData>({
        slogan: hero?.slogan || '',
        heading_part1: hero?.heading_part1 || '',
        heading_part2: hero?.heading_part2 || '',
        heading_part3: hero?.heading_part3 || '',
        sub_heading: hero?.sub_heading || '',
        heroItems:
            heroItems?.map((item) => ({
                id: item.id,
                image: null,
                image_path: item.image_path ? `${item.image_path}` : '',
            })) || [],
    });

    const [imageErrors, setImageErrors] = useState<{ [key: number]: string | null }>({});
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleImageChange = (index: number, file: File | null) => {
        if (file) {
            if (!file.type.startsWith('image/')) {
                setImageErrors((prev) => ({ ...prev, [index]: 'Please upload a valid image file (PNG, JPG, GIF).' }));
                setData(
                    'heroItems',
                    data.heroItems.map((item, i) => (i === index ? { ...item, image: null } : item)),
                );
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                setImageErrors((prev) => ({ ...prev, [index]: 'File size exceeds 2MB limit.' }));
                setData(
                    'heroItems',
                    data.heroItems.map((item, i) => (i === index ? { ...item, image: null } : item)),
                );
                return;
            }
            setImageErrors((prev) => ({ ...prev, [index]: null }));
            setData(
                'heroItems',
                data.heroItems.map((item, i) => (i === index ? { ...item, image: file } : item)),
            );
        } else {
            setData(
                'heroItems',
                data.heroItems.map((item, i) => (i === index ? { ...item, image: null } : item)),
            );
            setImageErrors((prev) => ({ ...prev, [index]: null }));
        }
    };

    const addItem = () => {
        const newIndex = data.heroItems.length;
        setData('heroItems', [...data.heroItems, { image: null, image_path: '' }]);
        setSelectedIndex(newIndex);
    };

    const deleteItem = () => {
        if (data.heroItems.length === 0) return;
        setData(
            'heroItems',
            data.heroItems.filter((_, i) => i !== selectedIndex),
        );
        setImageErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[selectedIndex];
            return newErrors;
        });
        setSelectedIndex((prevIndex) => Math.min(prevIndex, data.heroItems.length - 2));
    };

    const handleHeroReset = () => {
        setData({
            slogan: hero?.slogan || '',
            heading_part1: hero?.heading_part1 || '',
            heading_part2: hero?.heading_part2 || '',
            heading_part3: hero?.heading_part3 || '',
            sub_heading: hero?.sub_heading || '',
            heroItems:
                heroItems?.map((item) => ({
                    id: item.id,
                    image: null,
                    image_path: item.image_path ? `${item.image_path}` : '',
                })) || [],
        });
        setImageErrors({});
        setSelectedIndex(0);
    };

    const handleHeroSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'PUT');

        // Append hero section fields
        formData.append('slogan', data.slogan);
        formData.append('heading_part1', data.heading_part1);
        formData.append('heading_part2', data.heading_part2);
        formData.append('heading_part3', data.heading_part3);
        formData.append('sub_heading', data.sub_heading);

        // Append hero items
        data.heroItems.forEach((item, index) => {
            if (item.id) {
                formData.append(`heroItems[${index}][id]`, item.id.toString());
            }
            formData.append(`heroItems[${index}][image]`, item.image instanceof File ? item.image : '');
        });

        post('/admin/pages/home/hero', {
            data: formData,
            forceFormData: true,
            onSuccess: () => {
                alert('Hero section updated successfully.');
            },
            onError: (errors) => {
                console.error('Save errors:', errors);
                alert('Failed to save changes: ' + Object.values(errors).join(', '));
            },
        });
    };

    return (
        <form onSubmit={handleHeroSubmit} className="space-y-6 p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <TranslatedInput
                    label="Slogan"
                    value={data.slogan}
                    onChange={(value) => setData('slogan', value)}
                    error={errors.slogan}
                    placeholder="Slogan"
                    required
                />
                <TranslatedInput
                    label="Heading Part 1"
                    value={data.heading_part1}
                    onChange={(value) => setData('heading_part1', value)}
                    error={errors.heading_part1}
                    placeholder="First heading part"
                    required
                />
                <TranslatedInput
                    label="Heading Part 2"
                    value={data.heading_part2}
                    onChange={(value) => setData('heading_part2', value)}
                    error={errors.heading_part2}
                    placeholder="Second heading part"
                    required
                />
                <TranslatedInput
                    label="Heading Part 3"
                    value={data.heading_part3}
                    onChange={(value) => setData('heading_part3', value)}
                    error={errors.heading_part3}
                    placeholder="Third heading part"
                    required
                />
            </div>

            <TranslatedInput
                label="Sub-Heading"
                value={data.sub_heading}
                onChange={(value) => setData('sub_heading', value)}
                error={errors.sub_heading}
                placeholder="Sub-heading"
                type="textarea"
                required
            />

            {/* Hero Items Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Hero Images</h3>

                <div className="flex flex-wrap gap-2 sm:gap-4">
                    {data.heroItems.map((_, index) => (
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

                {data.heroItems.length > 0 && (
                    <div className="space-y-4">
                        <FileUpload
                            label={`Hero Image ${selectedIndex + 1}`}
                            onChange={(file) => handleImageChange(selectedIndex, file)}
                            error={imageErrors[selectedIndex] || errors[`heroItems.${selectedIndex}.image`]}
                            currentImageUrl={
                                data.heroItems[selectedIndex].image_path && !data.heroItems[selectedIndex].image
                                    ? data.heroItems[selectedIndex].image_path
                                    : undefined
                            }
                            previewImage={data.heroItems[selectedIndex].image}
                            onRemove={() => handleImageChange(selectedIndex, null)}
                        />
                    </div>
                )}
            </div>

            <div className="flex flex-col items-start justify-end gap-4 border-t border-gray-200 pt-6 md:flex-row dark:border-neutral-700">
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
                <button
                    type="button"
                    onClick={deleteItem}
                    className="inline-flex items-center rounded-md border border-red-400 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-600 dark:text-red-300 dark:hover:bg-red-900/20"
                    disabled={data.heroItems.length === 0 || processing}
                >
                    Delete
                </button>
            </div>
        </form>
    );
}
