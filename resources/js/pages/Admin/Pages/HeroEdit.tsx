import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import TranslatedInput from '../components/TranslatedInput';

interface HeroSection {
    slogan?: string;
    heading_part1?: string;
    heading_part2?: string;
    heading_part3?: string;
    sub_heading?: string;
    image_url?: string;
}

interface HeroFormData {
    slogan: string;
    heading_part1: string;
    heading_part2: string;
    heading_part3: string;
    sub_heading: string;
    image: File | null;
}

export default function HeroEdit({ hero }: { hero: HeroSection }) {
    const { data, setData, post, errors, processing } = useForm<HeroFormData>({
        slogan: hero?.slogan || '',
        heading_part1: hero?.heading_part1 || '',
        heading_part2: hero?.heading_part2 || '',
        heading_part3: hero?.heading_part3 || '',
        sub_heading: hero?.sub_heading || '',
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
                formData.append(key, value);
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
            slogan: hero?.slogan || '',
            heading_part1: hero?.heading_part1 || '',
            heading_part2: hero?.heading_part2 || '',
            heading_part3: hero?.heading_part3 || '',
            sub_heading: hero?.sub_heading || '',
            image: null,
        });
        setHeroImageError(null);
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
            <FileUpload
                label="Hero Image"
                onChange={handleHeroImageChange}
                error={heroImageError || errors.image}
                currentImageUrl={hero?.image_url && !data.image ? hero.image_url : undefined}
                previewImage={data.image}
                onRemove={() => handleHeroImageChange(null)}
            />
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
            </div>
        </form>
    );
}
