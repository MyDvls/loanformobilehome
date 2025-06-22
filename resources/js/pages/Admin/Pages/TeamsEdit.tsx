import AppLayout from '@/layouts/app-layout';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { Head, router, usePage } from '@inertiajs/react';
import { Globe } from 'lucide-react';
import { useState } from 'react';
import AdminLayout from '../AdminLayout';

export default function TeamEdit() {
    const { props } = usePage();
    const { teamSection, teamMembers } = props;

    const [heading, setHeading] = useState({
        en: teamSection?.heading?.en || '',
        es: teamSection?.heading?.es || '',
    });
    const [subHeading, setSubHeading] = useState({
        en: teamSection?.sub_heading?.en || '',
        es: teamSection?.sub_heading?.es || '',
    });
    const [teamMembersState, setTeamMembersState] = useState(
        teamMembers?.map((item) => ({
            id: item.id,
            image: item.image_path ? `/storage/${item.image_path}` : '',
            name: { en: item.name?.en || '', es: item.name?.es || '' },
            role: { en: item.role?.en || '', es: item.role?.es || '' },
            bio: { en: item.bio?.en || '', es: item.bio?.es || '' },
        })) || [],
    );
    console.log('Initial teamMembersState:', teamMembersState);
    const [selectedMemberIndex, setSelectedMemberIndex] = useState(0);

    const updateMember = (index, key, lang, value) => {
        const updated = [...teamMembersState];
        updated[index][key][lang] = value;
        setTeamMembersState(updated);
    };

    const handleImageChange = (index, file) => {
        const reader = new FileReader();
        reader.onload = () => {
            const updated = [...teamMembersState];
            updated[index].image = reader.result;
            setTeamMembersState(updated);
        };
        reader.readAsDataURL(file);
    };

    const addMember = () => {
        const newIndex = teamMembersState.length;
        setTeamMembersState([
            ...teamMembersState,
            { id: null, image: '', name: { en: '', es: '' }, role: { en: '', es: '' }, bio: { en: '', es: '' } },
        ]);
        setSelectedMemberIndex(newIndex);
    };

    const resetMember = (index) => {
        if (teamMembers && teamMembers[index]) {
            const original = teamMembers[index];
            setTeamMembersState((prev) =>
                prev.map((member, i) =>
                    i === index
                        ? {
                              id: original.id,
                              image: item.image_path ? `/storage/${item.image_path}` : '',
                              name: { en: original.name?.en || '', es: original.name?.es || '' },
                              role: { en: original.role?.en || '', es: original.role?.es || '' },
                              bio: { en: original.bio?.en || '', es: original.bio?.es || '' },
                          }
                        : member,
                ),
            );
        } else {
            setTeamMembersState((prev) => prev.filter((_, i) => i !== index));
            setSelectedMemberIndex((prevIndex) => {
                if (teamMembersState.length - 1 === 0) return 0;
                return Math.min(prevIndex, teamMembersState.length - 2);
            });
        }
    };

    const deleteMember = () => {
        if (teamMembersState.length === 0) return; // Prevent deletion if no members
        setTeamMembersState((prev) => prev.filter((_, i) => i !== selectedMemberIndex));
        setSelectedMemberIndex((prevIndex) => {
            if (teamMembersState.length - 1 === 0) return 0; // Reset to 0 if no members left
            return Math.min(prevIndex, teamMembersState.length - 2); // Select previous member or last one
        });
    };

    const saveChanges = () => {
        const formData = new FormData();
        formData.append('heading[en]', heading.en);
        formData.append('heading[es]', heading.es);
        formData.append('sub_heading[en]', subHeading.en);
        formData.append('sub_heading[es]', subHeading.es);

        teamMembersState.forEach((member, index) => {
            if (member.id) {
                formData.append(`team_members[${index}][id]`, member.id.toString());
            }
            formData.append(`team_members[${index}][name][en]`, member.name.en);
            formData.append(`team_members[${index}][name][es]`, member.name.es);
            formData.append(`team_members[${index}][role][en]`, member.role.en);
            formData.append(`team_members[${index}][role][es]`, member.role.es);
            formData.append(`team_members[${index}][bio][en]`, member.bio.en);
            formData.append(`team_members[${index}][bio][es]`, member.bio.es);
            if (member.image && member.image.startsWith('data:image')) {
                const byteString = atob(member.image.split(',')[1]);
                const mimeString = member.image.split(',')[0].split(':')[1].split(';')[0];
                const ab = new ArrayBuffer(byteString.length);
                const ia = new Uint8Array(ab);
                for (let i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                const blob = new Blob([ab], { type: mimeString });
                formData.append(`team_members[${index}][image]`, blob, `member-${index}.png`);
            }
        });

        router.post('/admin/pages/team/section', formData, {
            onSuccess: () => {
                alert('Team section updated successfully.');
            },
            onError: (errors) => {
                alert('Failed to save changes: ' + Object.values(errors).join(', '));
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Edit Team" />
            <AdminLayout title="Edit Homepage" subtitle="Team">
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
                        {['en', 'es'].map((lang, langIndex) => (
                            <TabPanel key={lang} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Heading *</label>
                                    <input
                                        value={heading[lang]}
                                        onChange={(e) => setHeading({ ...heading, [lang]: e.target.value })}
                                        className="mt-1 w-full rounded border-gray-300 p-2 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sub-Heading</label>
                                    <input
                                        value={subHeading[lang]}
                                        onChange={(e) => setSubHeading({ ...subHeading, [lang]: e.target.value })}
                                        className="mt-1 w-full rounded border-gray-300 p-2 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                    />
                                </div>
                                <div className="flex items-center gap-4">
                                    {teamMembersState.map((_, index) => (
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
                                {teamMembersState.length > 0 && (
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                        <div className="space-y-4 lg:col-span-2">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name *</label>
                                                <input
                                                    value={teamMembersState[selectedMemberIndex].name[lang]}
                                                    onChange={(e) => updateMember(selectedMemberIndex, 'name', lang, e.target.value)}
                                                    className="mt-1 w-full rounded border-gray-300 p-2 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role *</label>
                                                <input
                                                    value={teamMembersState[selectedMemberIndex].role[lang]}
                                                    onChange={(e) => updateMember(selectedMemberIndex, 'role', lang, e.target.value)}
                                                    className="mt-1 w-full rounded border-gray-300 p-2 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bio *</label>
                                                <textarea
                                                    value={teamMembersState[selectedMemberIndex].bio[lang]}
                                                    onChange={(e) => updateMember(selectedMemberIndex, 'bio', lang, e.target.value)}
                                                    className="mt-1 w-full rounded border-gray-300 p-2 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                                                    rows={3}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image</label>
                                            <div className="relative mt-1 h-40 w-full overflow-hidden rounded border border-gray-300 bg-white dark:border-neutral-200 dark:bg-neutral-800">
                                                {teamMembersState[selectedMemberIndex].image && (
                                                    <img
                                                        src={teamMembersState[selectedMemberIndex].image}
                                                        alt="Team Member"
                                                        className="h-full w-full object-contain"
                                                    />
                                                )}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        if (e.target.files && e.target.files[0]) {
                                                            handleImageChange(selectedMemberIndex, e.target.files[0]);
                                                        }
                                                    }}
                                                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </TabPanel>
                        ))}
                    </TabPanels>
                </TabGroup>
                <div className="mt-6 flex gap-4">
                    <button onClick={saveChanges} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                        Save Changes
                    </button>
                    <button
                        onClick={() => resetMember(selectedMemberIndex)}
                        className="rounded border border-gray-400 px-4 py-2 text-gray-600 dark:border-gray-600 dark:text-gray-300"
                    >
                        Discard
                    </button>
                    <button
                        onClick={deleteMember}
                        className="rounded border border-red-400 px-4 py-2 text-red-600 hover:bg-red-50 dark:border-red-600 dark:text-red-300 dark:hover:bg-red-900/20"
                        disabled={teamMembersState.length === 0}
                    >
                        Delete
                    </button>
                </div>
            </AdminLayout>
        </AppLayout>
    );
}
