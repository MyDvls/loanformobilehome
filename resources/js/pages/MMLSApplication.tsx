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

                <h1 className="text-center text-3xl font-bold text-gray-900 dark:text-white">MMLS Application Form</h1>
                <div className="mx-auto my-10 max-w-4xl rounded-xl border border-gray-300 bg-white p-10 dark:border-gray-600 dark:bg-black">
                    <MLSApplicationForm />
                </div>
            </div>
        </>
    );
}
