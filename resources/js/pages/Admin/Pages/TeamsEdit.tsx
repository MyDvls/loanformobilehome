import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '../AdminLayout';
import FileUpload from '../components/FileUpload';
import TranslatedInput from '../components/TranslatedInput';

interface TeamMember {
    id?: number;
    name: string;
    role: string;
    bio: string;
    image_path?: string;
}

interface TeamSection {
    id?: number;
    heading?: string;
    sub_heading?: string;
}

interface TeamFormData {
    heading: string;
    sub_heading: string;
    team_members: Array<{
        id?: number;
        name: string;
        role: string;
        bio: string;
        image: File | null;
        image_path?: string;
    }>;
}

interface Props {
    teamSection?: TeamSection;
    teamMembers?: TeamMember[];
}

export default function TeamEdit({ teamSection, teamMembers }: Props) {
    const { data, setData, post, errors, processing } = useForm<TeamFormData>({
        heading: teamSection?.heading || '',
        sub_heading: teamSection?.sub_heading || '',
        team_members: teamMembers?.map((item) => ({
            id: item.id,
            name: item.name || '',
            role: item.role || '',
            bio: item.bio || '',
            image: null,
            image_path: item.image_path || '',
        })) || [
            {
                name: '',
                role: '',
                bio: '',
                image: null,
                image_path: '',
            },
        ],
    });

    const [imageErrors, setImageErrors] = useState<{ [key: number]: string | null }>({});
    const [selectedMemberIndex, setSelectedMemberIndex] = useState(0);

    const updateMember = (index: number, key: 'name' | 'role' | 'bio', value: string) => {
        setData(
            'team_members',
            data.team_members.map((member, i) => (i === index ? { ...member, [key]: value } : member)),
        );
    };

    const handleImageChange = (index: number, file: File | null) => {
        if (file) {
            if (!file.type.startsWith('image/')) {
                setImageErrors((prev) => ({ ...prev, [index]: 'Please upload a valid image file (PNG, JPG, GIF).' }));
                setData(
                    'team_members',
                    data.team_members.map((member, i) => (i === index ? { ...member, image: null } : member)),
                );
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                setImageErrors((prev) => ({ ...prev, [index]: 'File size exceeds 2MB limit.' }));
                setData(
                    'team_members',
                    data.team_members.map((member, i) => (i === index ? { ...member, image: null } : member)),
                );
                return;
            }
            setImageErrors((prev) => ({ ...prev, [index]: null }));
            setData(
                'team_members',
                data.team_members.map((member, i) => (i === index ? { ...member, image: file } : member)),
            );
        } else {
            setData(
                'team_members',
                data.team_members.map((member, i) => (i === index ? { ...member, image: null } : member)),
            );
            setImageErrors((prev) => ({ ...prev, [index]: null }));
        }
    };

    const addMember = () => {
        const newIndex = data.team_members.length;
        setData('team_members', [...data.team_members, { name: '', role: '', bio: '', image: null, image_path: '' }]);
        setSelectedMemberIndex(newIndex);
    };

    const resetMember = () => {
        setData({
            heading: teamSection?.heading || '',
            sub_heading: teamSection?.sub_heading || '',
            team_members: teamMembers?.map((item) => ({
                id: item.id,
                name: item.name || '',
                role: item.role || '',
                bio: item.bio || '',
                image: null,
                image_path: item.image_path || '',
            })) || [{ name: '', role: '', bio: '', image: null, image_path: '' }],
        });
        setImageErrors({});
        setSelectedMemberIndex(0);
    };

    const deleteMember = () => {
        if (data.team_members.length === 0) return;
        setData(
            'team_members',
            data.team_members.filter((_, i) => i !== selectedMemberIndex),
        );
        setImageErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[selectedMemberIndex];
            return newErrors;
        });
        setSelectedMemberIndex((prevIndex) => Math.min(prevIndex, data.team_members.length - 2));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('heading', data.heading);
        formData.append('sub_heading', data.sub_heading);

        data.team_members.forEach((member, index) => {
            if (member.id) {
                formData.append(`team_members[${index}][id]`, member.id.toString());
            }
            formData.append(`team_members[${index}][name]`, member.name);
            formData.append(`team_members[${index}][role]`, member.role);
            formData.append(`team_members[${index}][bio]`, member.bio);
            formData.append(`team_members[${index}][image]`, member.image instanceof File ? member.image : '');
        });

        post('/admin/pages/team/section', {
            data: formData,
            forceFormData: true,
            onSuccess: () => {
                alert('Team section updated successfully.');
            },
            onError: (errors) => {
                console.error('Save errors:', errors);
                alert('Failed to save changes: ' + Object.values(errors).join(', '));
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Edit Team" />
            <AdminLayout title="Edit Homepage" subtitle="Team">
                <form onSubmit={handleSubmit} className="space-y-6 p-6">
                    <TranslatedInput
                        label="Team Section Heading"
                        value={data.heading}
                        onChange={(value) => setData('heading', value)}
                        error={errors.heading}
                        placeholder="Team section heading"
                        required
                    />
                    <TranslatedInput
                        label="Sub-Heading"
                        value={data.sub_heading}
                        onChange={(value) => setData('sub_heading', value)}
                        error={errors.sub_heading}
                        placeholder="Team section sub-heading"
                        required
                    />

                    <div className="flex items-center gap-4">
                        {data.team_members.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                className={`h-10 w-10 rounded-full border-2 p-2 px-2 py-1 text-sm font-medium ${
                                    index === selectedMemberIndex ? 'bg-blue-600 text-white' : 'border-blue-600 text-blue-600'
                                }`}
                                onClick={() => setSelectedMemberIndex(index)}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={addMember}
                            type="button"
                            className="h-10 w-10 rounded-full border-2 border-gray-400 text-xl text-gray-600 dark:text-gray-300"
                        >
                            +
                        </button>
                    </div>

                    {data.team_members.length > 0 && (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <div className="space-y-4 lg:col-span-2">
                                <TranslatedInput
                                    label={`Team Member ${selectedMemberIndex + 1} Name`}
                                    value={data.team_members[selectedMemberIndex].name}
                                    onChange={(value) => updateMember(selectedMemberIndex, 'name', value)}
                                    error={errors[`team_members.${selectedMemberIndex}.name`]}
                                    placeholder="Enter name"
                                    required
                                />
                                <TranslatedInput
                                    label={`Team Member ${selectedMemberIndex + 1} Role`}
                                    value={data.team_members[selectedMemberIndex].role}
                                    onChange={(value) => updateMember(selectedMemberIndex, 'role', value)}
                                    error={errors[`team_members.${selectedMemberIndex}.role`]}
                                    placeholder="Enter role"
                                    required
                                />
                                <TranslatedInput
                                    label={`Team Member ${selectedMemberIndex + 1} Bio`}
                                    value={data.team_members[selectedMemberIndex].bio}
                                    onChange={(value) => updateMember(selectedMemberIndex, 'bio', value)}
                                    error={errors[`team_members.${selectedMemberIndex}.bio`]}
                                    placeholder="Enter bio"
                                    type="textarea"
                                    required
                                />
                            </div>
                            <div>
                                <FileUpload
                                    label={`Team Member ${selectedMemberIndex + 1} Image`}
                                    onChange={(file) => handleImageChange(selectedMemberIndex, file)}
                                    error={imageErrors[selectedMemberIndex] || errors[`team_members.${selectedMemberIndex}.image`]}
                                    currentImageUrl={
                                        data.team_members[selectedMemberIndex].image_path && !data.team_members[selectedMemberIndex].image
                                            ? data.team_members[selectedMemberIndex].image_path
                                            : undefined
                                    }
                                    previewImage={data.team_members[selectedMemberIndex].image}
                                    onRemove={() => handleImageChange(selectedMemberIndex, null)}
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex items-center justify-end gap-4 border-t border-gray-200 pt-6 dark:border-neutral-700">
                        <button
                            type="button"
                            onClick={resetMember}
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
                            onClick={deleteMember}
                            className="inline-flex items-center rounded-md border border-red-400 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-600 dark:text-red-300 dark:hover:bg-red-900/20"
                            disabled={data.team_members.length === 0 || processing}
                        >
                            Delete
                        </button>
                    </div>
                </form>
            </AdminLayout>
        </AppLayout>
    );
}
