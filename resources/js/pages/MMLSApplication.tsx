import LanguageSwitcher from '@/components/LanguageSwitcher';
import MLSApplicationForm from '@/components/MLSApplicationForm';
import { useAppearance } from '@/hooks/use-appearance';
import { Head } from '@inertiajs/react';
import { Moon, Sun } from 'lucide-react';

export default function MMLSApplication() {
    const { appearance, updateAppearance } = useAppearance();

    return (
        <>
            <Head title="MMLS Application" />
            <div className="min-h-screen bg-gray-50 p-4 dark:bg-black">
                {/* Language and Theme Toggle Bar */}
                <div className="mb-6 flex items-center justify-end">
                    <div className="flex-1">
                        <LanguageSwitcher />
                    </div>
                    <button
                        onClick={() => updateAppearance(appearance === 'light' ? 'dark' : 'light')}
                        className="rounded-full p-2 text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                        aria-label={appearance === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                    >
                        {appearance === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    </button>
                </div>

                <img src="/images/brand-logo.svg" alt="Brand logo" className="mx-auto h-30 w-auto" />

                <div className="mx-auto my-2 max-w-4xl rounded-xl border border-gray-300 bg-white p-10 dark:border-gray-600 dark:bg-black">
                    <MLSApplicationForm />
                </div>
            </div>
        </>
    );
}
