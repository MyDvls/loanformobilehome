import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import React from 'react';

interface SectionWrapperProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

export default function SectionWrapper({ title, children, defaultOpen = true }: SectionWrapperProps) {
    return (
        <Disclosure defaultOpen={defaultOpen}>
            {({ open }) => (
                <>
                    <DisclosureButton
                        as="div"
                        className="mb-6 cursor-pointer rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-800"
                    >
                        <div className="flex w-full items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-neutral-100">{title}</h2>
                            <ChevronDown className={`${open ? 'rotate-180' : ''} h-5 w-5 text-gray-500 transition-transform dark:text-neutral-400`} />
                        </div>
                    </DisclosureButton>
                    <DisclosurePanel className="mb-6 rounded-xl border border-gray-200 bg-white p-6 pt-0 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
                        {children}
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    );
}
