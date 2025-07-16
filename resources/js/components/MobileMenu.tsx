import { Button } from '@/components/ui/button';
import { Link, usePage } from '@inertiajs/react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    const { props } = usePage();
    const { t } = useTranslation();

    const isActive = (path: string) => {
        return props.url === path;
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-10 h-[100vh] bg-white px-6 pt-20 lg:hidden dark:bg-gray-800">
            <button className="absolute top-6 right-6 text-gray-600 dark:text-gray-400" onClick={onClose} aria-label={t('nav.closeMenu')}>
                <X size={28} />
            </button>
            <div className="flex flex-col space-y-6">
                <Link
                    prefetch="mount"
                    cache-for="5m"
                    href="/"
                    className={`text-lg font-medium ${isActive('/') ? 'text-blue-600' : 'text-gray-800 dark:text-gray-200'}`}
                    onClick={onClose}
                >
                    {t('nav.home')}
                </Link>
                <Link
                    prefetch="mount"
                    cache-for="5m"
                    href="/services"
                    className={`text-lg font-medium ${isActive('/services') ? 'text-blue-600' : 'text-gray-800 dark:text-gray-200'}`}
                    onClick={onClose}
                >
                    {t('nav.services')}
                </Link>
                <Link
                    prefetch="mount"
                    cache-for="5m"
                    href="/understanding-loan"
                    className={`text-lg font-medium ${isActive('/understanding-loan') ? 'text-blue-600' : 'text-gray-800 dark:text-gray-200'}`}
                    onClick={onClose}
                >
                    {t('nav.understanding-loan')}
                </Link>
                <Link
                    prefetch="mount"
                    cache-for="5m"
                    href="/team"
                    className={`text-lg font-medium ${isActive('/team') ? 'text-blue-600' : 'text-gray-800 dark:text-gray-200'}`}
                    onClick={onClose}
                >
                    {t('nav.team')}
                </Link>
                <Link
                    prefetch="mount"
                    cache-for="5m"
                    href="/investors"
                    className={`text-lg font-medium ${isActive('/investors') ? 'text-blue-600' : 'text-gray-800 dark:text-gray-200'}`}
                    onClick={onClose}
                >
                    {t('nav.investors')}
                </Link>
                <Link
                    prefetch="mount"
                    cache-for="5m"
                    href="/contact"
                    className={`text-lg font-medium ${isActive('/contact') ? 'text-blue-600' : 'text-gray-800 dark:text-gray-200'}`}
                    onClick={onClose}
                >
                    {t('nav.contact')}
                </Link>
                <a
                    href="https://manufacturedmls.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-lg font-medium ${isActive('/contact') ? 'text-blue-600' : 'text-gray-800 dark:text-gray-200'}`}
                    onClick={onClose}
                >
                    {t('nav.home_worth')}
                </a>
                <Link
                    prefetch="mount"
                    cache-for="5m"
                    href="/login"
                    className={`text-lg font-medium ${isActive('/login') ? 'text-blue-600' : 'text-gray-800 dark:text-gray-200'}`}
                    onClick={onClose}
                >
                    {t('nav.login')}
                </Link>
                <Link prefetch="mount" cache-for="5m" href="/apply" onClick={onClose}>
                    <Button className="w-full bg-blue-600 py-6 text-lg hover:bg-blue-700">{t('nav.apply')}</Button>
                </Link>
            </div>
        </div>
    );
}
