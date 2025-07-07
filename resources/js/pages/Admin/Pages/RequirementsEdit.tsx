import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import TranslatedInput from '../components/TranslatedInput';

interface RequirementItem {
    id?: number;
    title: string;
    description: string;
    image_path?: string;
}

interface RequirementsSection {
    title?: string;
    subtitle?: string;
    items?: RequirementItem[];
}

interface RequirementsFormData {
    title: string;
    subtitle: string;
    requirementItems: Array<{
        id?: number;
        title: string;
        description: string;
        image: File | null;
        image_path?: string;
    }>;
}

interface Props {
    requirementsSection?: RequirementsSection;
}

export default function RequirementsEdit({ requirementsSection }: Props) {
    const { data, setData, post, errors, processing } = useForm<RequirementsFormData>({
        title: requirementsSection?.title || '',
        subtitle: requirementsSection?.subtitle || '',
        requirementItems:
            requirementsSection?.items?.map((item) => ({
                id: item.id,
                title: item.title || '',
                description: item.description || '',
                image: null,
                image_path: item.image_path || '',
            })) || [],
    });
    console.log('Initial data req:', data);
    const [imageErrors, setImageErrors] = useState<{ [key: number]: string | null }>({});
    const [selectedIndex, setSelectedIndex] = useState(0);

    const updateItem = (index: number, key: 'title' | 'description', value: string) => {
        setData(
            'requirementItems',
            data.requirementItems.map((item, i) => (i === index ? { ...item, [key]: value } : item)),
        );
    };

    const handleImageChange = (index: number, file: File | null) => {
        if (file) {
            if (!file.type.startsWith('image/')) {
                setImageErrors((prev) => ({ ...prev, [index]: 'Please upload a valid image file (PNG, JPG, GIF).' }));
                setData(
                    'requirementItems',
                    data.requirementItems.map((item, i) => (i === index ? { ...item, image: null } : item)),
                );
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                setImageErrors((prev) => ({ ...prev, [index]: 'File size exceeds 2MB limit.' }));
                setData(
                    'requirementItems',
                    data.requirementItems.map((item, i) => (i === index ? { ...item, image: null } : item)),
                );
                return;
            }
            setImageErrors((prev) => ({ ...prev, [index]: null }));
            setData(
                'requirementItems',
                data.requirementItems.map((item, i) => (i === index ? { ...item, image: file } : item)),
            );
        } else {
            setData(
                'requirementItems',
                data.requirementItems.map((item, i) => (i === index ? { ...item, image: null } : item)),
            );
            setImageErrors((prev) => ({ ...prev, [index]: null }));
        }
    };

    const addItem = () => {
        const newIndex = data.requirementItems.length;
        setData('requirementItems', [...data.requirementItems, { title: '', description: '', image: null, image_path: '' }]);
        setSelectedIndex(newIndex);
    };

    const resetItem = () => {
        setData({
            title: requirementsSection?.title || '',
            subtitle: requirementsSection?.subtitle || '',
            requirementItems:
                requirementsSection?.items?.map((item) => ({
                    id: item.id,
                    title: item.title || '',
                    description: item.description || '',
                    image: null,
                    image_path: item.image_path || '',
                })) || [],
        });
        setImageErrors({});
        setSelectedIndex(0);
    };

    const deleteItem = () => {
        if (data.requirementItems.length === 0) return;
        setData(
            'requirementItems',
            data.requirementItems.filter((_, i) => i !== selectedIndex),
        );
        setImageErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[selectedIndex];
            return newErrors;
        });
        setSelectedIndex((prevIndex) => Math.min(prevIndex, data.requirementItems.length - 2));
    };

    const handleRequirementsSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('title', data.title);
        formData.append('subtitle', data.subtitle);

        data.requirementItems.forEach((item, index) => {
            if (item.id) {
                formData.append(`requirementItems[${index}][id]`, item.id.toString());
            }
            formData.append(`requirementItems[${index}][title]`, item.title);
            formData.append(`requirementItems[${index}][description]`, item.description);
            formData.append(`requirementItems[${index}][image]`, item.image instanceof File ? item.image : '');
        });

        post('/admin/pages/home/requirements-section', {
            data: formData,
            forceFormData: true,
            onSuccess: () => {
                alert('Requirements section updated successfully.');
            },
            onError: (errors) => {
                console.error('Save errors:', errors);
                alert('Failed to save changes: ' + Object.values(errors).join(', '));
            },
        });
    };

    return (
        <form onSubmit={handleRequirementsSubmit} className="space-y-6 py-6">
            <TranslatedInput
                label="Requirements Section Title"
                value={data.title}
                onChange={(value) => setData('title', value)}
                error={errors.title}
                placeholder="Requirements section title"
                required
            />
            <TranslatedInput
                label="Subtitle"
                value={data.subtitle}
                onChange={(value) => setData('subtitle', value)}
                error={errors.subtitle}
                placeholder="Requirements section subtitle"
                type="textarea"
                required
            />

            <div className="flex flex-wrap gap-2 sm:gap-4">
                {data.requirementItems.map((_, index) => (
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

            {data.requirementItems.length > 0 && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-4 lg:col-span-2">
                        <TranslatedInput
                            label={`Requirement ${selectedIndex + 1} Title`}
                            value={data.requirementItems[selectedIndex].title}
                            onChange={(value) => updateItem(selectedIndex, 'title', value)}
                            error={errors[`requirementItems.${selectedIndex}.title`]}
                            placeholder="Enter title"
                            required
                        />
                        <TranslatedInput
                            label={`Requirement ${selectedIndex + 1} Description`}
                            value={data.requirementItems[selectedIndex].description}
                            onChange={(value) => updateItem(selectedIndex, 'description', value)}
                            error={errors[`requirementItems.${selectedIndex}.description`]}
                            placeholder="Enter description"
                            type="textarea"
                            required
                        />
                    </div>
                    <div>
                        <FileUpload
                            label={`Requirement ${selectedIndex + 1} Image`}
                            onChange={(file) => handleImageChange(selectedIndex, file)}
                            error={imageErrors[selectedIndex] || errors[`requirementItems.${selectedIndex}.image`]}
                            currentImageUrl={
                                data.requirementItems[selectedIndex].image_path && !data.requirementItems[selectedIndex].image
                                    ? data.requirementItems[selectedIndex].image_path
                                    : undefined
                            }
                            previewImage={data.requirementItems[selectedIndex].image || null}
                            onRemove={() => handleImageChange(selectedIndex, null)}
                        />
                    </div>
                </div>
            )}

            <div className="flex flex-col items-start justify-end gap-4 border-t border-gray-200 pt-6 md:flex-row dark:border-neutral-700">
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
                    disabled={data.requirementItems.length === 0 || processing}
                >
                    Delete
                </button>
            </div>
        </form>
    );
}
