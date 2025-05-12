import { Button } from '@/components/ui/button';
import { Link, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function Navigation() {
    const { props } = usePage();
    const { t } = useTranslation();

    const isActive = (path: string) => {
        return props.url === path;
    };

    return (
        <div className="hidden items-center space-x-6 md:flex">
            <Link
                href="/"
                className={`text-sm font-medium transition-colors duration-200 ${
                    isActive('/') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600 dark:text-gray-400'
                }`}
            >
                {t('nav.home')}
            </Link>
            <Link
                href="/services"
                className={`text-sm font-medium transition-colors duration-200 ${
                    isActive('/services') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600 dark:text-gray-400'
                }`}
            >
                {t('nav.services')}
            </Link>
            <Link
                href="/understanding-loan"
                className={`text-sm font-medium transition-colors duration-200 ${
                    isActive('/understanding-loan') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600 dark:text-gray-400'
                }`}
            >
                {t('nav.understanding-loan')}
            </Link>
            <Link
                href="/team"
                className={`text-sm font-medium transition-colors duration-200 ${
                    isActive('/team') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600 dark:text-gray-400'
                }`}
            >
                {t('nav.team')}
            </Link>
            <Link
                href="/investors"
                className={`text-sm font-medium transition-colors duration-200 ${
                    isActive('/investors') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600 dark:text-gray-400'
                }`}
            >
                {t('nav.investors')}
            </Link>
            <Link
                href="/contact"
                className={`text-sm font-medium transition-colors duration-200 ${
                    isActive('/contact') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600 dark:text-gray-400'
                }`}
            >
                {t('nav.contact')}
            </Link>
            <Link
                href="/login"
                className={`text-sm font-medium transition-colors duration-200 ${
                    isActive('/login') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600 dark:text-gray-400'
                }`}
            >
                {t('nav.login')}
            </Link>
            <Link href="/apply">
                <Button className="bg-blue-600 font-medium shadow-lg shadow-blue-500/30 hover:bg-blue-700">{t('nav.apply')}</Button>
            </Link>
        </div>
    );
}
