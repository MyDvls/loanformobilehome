import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import TranslatedInput from '../components/TranslatedInput';

interface Testimonial {
    id?: number;
    post: string;
    full_name: string;
    heading: string;
}

interface TestimonialFormData {
    testimonials: Array<{
        id?: number;
        post: string;
        full_name: string;
        heading: string;
    }>;
}

interface Props {
    testimonialsSection?: Testimonial[];
}

export default function TestimonialSectionEdit({ testimonialsSection }: Props) {
    const { data, setData, post, errors, processing } = useForm<TestimonialFormData>({
        testimonials: testimonialsSection?.map((item) => ({
            id: item.id,
            post: item.post || '',
            full_name: item.full_name || '',
            heading: item.heading || '',
        })) || [
            {
                post: '',
                full_name: '',
                heading: '',
            },
        ],
    });

    const [selectedTestimonialIndex, setSelectedTestimonialIndex] = useState(0);

    const updateTestimonial = (index: number, key: 'post' | 'full_name' | 'heading', value: string) => {
        setData(
            'testimonials',
            data.testimonials.map((testimonial, i) => (i === index ? { ...testimonial, [key]: value } : testimonial)),
        );
    };

    const addTestimonial = () => {
        const newIndex = data.testimonials.length;
        setData('testimonials', [...data.testimonials, { post: '', full_name: '', heading: '' }]);
        setSelectedTestimonialIndex(newIndex);
    };

    const resetTestimonial = () => {
        setData({
            testimonials: testimonialsSection?.map((item) => ({
                id: item.id,
                post: item.post || '',
                full_name: item.full_name || '',
                heading: item.heading || '',
            })) || [{ post: '', full_name: '', heading: '' }],
        });
        setSelectedTestimonialIndex(0);
    };

    const deleteTestimonial = () => {
        if (data.testimonials.length === 0) return;
        setData(
            'testimonials',
            data.testimonials.filter((_, i) => i !== selectedTestimonialIndex),
        );
        setSelectedTestimonialIndex((prevIndex) => Math.min(prevIndex, data.testimonials.length - 2));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'PUT');

        data.testimonials.forEach((testimonial, index) => {
            if (testimonial.id) {
                formData.append(`testimonials[${index}][id]`, testimonial.id.toString());
            }
            formData.append(`testimonials[${index}][post]`, testimonial.post);
            formData.append(`testimonials[${index}][full_name]`, testimonial.full_name);
            formData.append(`testimonials[${index}][heading]`, testimonial.heading);
        });

        post('/admin/pages/testimonials/section', {
            data: formData,
            forceFormData: true,
            onSuccess: () => {
                alert('Testimonial section updated successfully.');
            },
            onError: (errors) => {
                console.error('Save errors:', errors);
                alert('Failed to save changes: ' + Object.values(errors).join(', '));
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
            <div className="flex flex-wrap gap-2 sm:gap-4">
                {data.testimonials.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`h-10 w-10 rounded-full border-2 p-2 px-2 py-1 text-sm font-medium ${
                            index === selectedTestimonialIndex ? 'bg-blue-600 text-white' : 'border-blue-600 text-blue-600'
                        }`}
                        onClick={() => setSelectedTestimonialIndex(index)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={addTestimonial}
                    type="button"
                    className="h-10 w-10 rounded-full border-2 border-gray-400 text-xl text-gray-600 dark:text-gray-300"
                >
                    +
                </button>
            </div>

            {data.testimonials.length > 0 && (
                <div className="space-y-4">
                    <TranslatedInput
                        label={`Testimonial ${selectedTestimonialIndex + 1} Full Name`}
                        value={data.testimonials[selectedTestimonialIndex].full_name}
                        onChange={(value) => updateTestimonial(selectedTestimonialIndex, 'full_name', value)}
                        error={errors[`testimonials.${selectedTestimonialIndex}.full_name`]}
                        placeholder="Enter full name"
                        required
                    />
                    <TranslatedInput
                        label={`Testimonial ${selectedTestimonialIndex + 1} Heading`}
                        value={data.testimonials[selectedTestimonialIndex].heading}
                        onChange={(value) => updateTestimonial(selectedTestimonialIndex, 'heading', value)}
                        error={errors[`testimonials.${selectedTestimonialIndex}.heading`]}
                        placeholder="Enter heading or title"
                        type="textarea"
                        required
                    />
                    <TranslatedInput
                        label={`Testimonial ${selectedTestimonialIndex + 1} Post`}
                        value={data.testimonials[selectedTestimonialIndex].post}
                        onChange={(value) => updateTestimonial(selectedTestimonialIndex, 'post', value)}
                        error={errors[`testimonials.${selectedTestimonialIndex}.post`]}
                        placeholder="Enter testimonial"
                        type="textarea"
                        required
                    />
                </div>
            )}

            <div className="flex flex-col items-start justify-end gap-4 border-t border-gray-200 pt-6 md:flex-row dark:border-neutral-700">
                <button
                    type="button"
                    onClick={resetTestimonial}
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
                    onClick={deleteTestimonial}
                    className="inline-flex items-center rounded-md border border-red-400 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-600 dark:text-red-300 dark:hover:bg-red-900/20"
                    disabled={data.testimonials.length === 0 || processing}
                >
                    Delete
                </button>
            </div>
        </form>
    );
}
