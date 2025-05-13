import AnimateOnView from '@/components/AnimateOnView';
import LandingLayout from '@/layouts/landing-layout';
import { Head } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface TeamMember {
    name: string;
    role: string;
    bio: string;
    image?: string;
}

const teamMembers: TeamMember[] = [
    {
        name: 'Grayson Gibson',
        role: 'CEO',
        bio: 'team.member1.bio',
        image: '/images/grayson-ceo_orig.jpg',
    },
    {
        name: 'Cord Mossberg',
        role: 'COO',
        bio: 'team.member2.bio',
        image: '/images/cord-cfo.jpg',
    },
    {
        name: 'Chance Schaeffer',
        role: 'Managing Broker',
        bio: 'team.member3.bio',
        image: 'https://ui-avatars.com/api/?name=Chance+Schaeffer&size=128&background=8B5CF6&color=fff',
    },
];

export default function Team() {
    const { t } = useTranslation();
    const [selectedMember, setSelectedMember] = useState<string | null>(null);

    const openMemberDetails = (name: string) => {
        setSelectedMember(name);
    };

    const closeMemberDetails = () => {
        setSelectedMember(null);
    };

    return (
        <LandingLayout>
            <Head title={t('team.title')} />

            <section className="relative overflow-visible bg-gradient-to-b from-gray-50 to-gray-200 py-20 dark:from-gray-800 dark:to-gray-700">
                <div className="relative z-10 container mx-auto px-4">
                    <AnimateOnView delay={0.2}>
                        <h2 className="mb-10 text-center text-4xl font-bold text-gray-800 dark:text-white">{t('team.title')}</h2>
                        <p className="mb-12 text-center text-xl text-gray-600 dark:text-gray-300">{t('team.subtitle')}</p>
                    </AnimateOnView>

                    {/* Team member grid */}
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {teamMembers.map((member, index) => (
                            <AnimateOnView key={member.name} delay={0.3 + index * 0.1}>
                                <motion.div
                                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                    className="group flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-lg transition-all duration-300 dark:bg-gray-800"
                                >
                                    <div className="relative mb-4 h-40 w-40 overflow-hidden rounded-full">
                                        <img
                                            style={{
                                                width: '150px',
                                                height: '150px',
                                                borderRadius: '50%',
                                                objectFit: 'cover',
                                                objectPosition: 'top',
                                            }}
                                            src={member.image}
                                            alt={`${member.name}`}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{member.name}</h3>
                                    <p className="mb-4 font-medium text-purple-600 dark:text-purple-400">{member.role}</p>
                                    <p className="mb-4 line-clamp-3 text-gray-600 dark:text-gray-300">{t(member.bio.substring(0, 150))}...</p>
                                    <button
                                        onClick={() => openMemberDetails(member.name)}
                                        className="mt-auto flex items-center rounded-md bg-purple-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-purple-700"
                                    >
                                        Read more
                                        <svg
                                            className="ml-2 h-4 w-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                        </svg>
                                    </button>
                                </motion.div>
                            </AnimateOnView>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modal for team member details */}
            <AnimatePresence>
                {selectedMember && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="bg-opacity-50 fixed inset-0 z-40 flex items-center justify-center bg-black p-4"
                            onClick={closeMemberDetails}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.3 }}
                                className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-xl dark:bg-gray-800"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {teamMembers
                                    .filter((member) => member.name === selectedMember)
                                    .map((member) => (
                                        <div key={member.name} className="flex flex-col md:flex-row">
                                            <div className="flex flex-col items-center justify-start bg-purple-50 p-8 md:w-1/3 dark:bg-gray-700">
                                                <div className="mb-4 h-40 w-40 overflow-hidden rounded-full">
                                                    <img
                                                        style={{
                                                            width: '150px',
                                                            height: '150px',
                                                            borderRadius: '50%',
                                                            objectFit: 'cover',
                                                            objectPosition: 'top',
                                                        }}
                                                        src={member.image}
                                                        alt={`${member.name}`}
                                                        className="h-full w-full"
                                                    />
                                                </div>
                                                <h3 className="text-center text-2xl font-bold text-gray-800 dark:text-white">{member.name}</h3>
                                                <p className="text-center font-medium text-purple-600 dark:text-purple-400">{member.role}</p>
                                            </div>
                                            <div className="p-8 md:w-2/3">
                                                <div className="mb-4 flex items-center justify-between">
                                                    <h4 className="text-xl font-semibold text-gray-800 dark:text-white">Biography</h4>
                                                    <button
                                                        onClick={closeMemberDetails}
                                                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                                        aria-label="Close"
                                                    >
                                                        <svg
                                                            className="h-6 w-6"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M6 18L18 6M6 6l12 12"
                                                            ></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                                <div className="max-h-[60vh] overflow-y-auto pr-2">
                                                    <p className="whitespace-pre-line text-gray-600 dark:text-gray-300">{t(member.bio)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </LandingLayout>
    );
}
