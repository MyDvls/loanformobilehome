import { Link } from '@inertiajs/react';
import { MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="border-t border-gray-200 bg-white py-12 dark:border-gray-700 dark:bg-gray-800">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {/* Contact Info */}
                    <div className="flex flex-col space-y-2">
                        <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">{t('footer.contact')}</h3>
                        <a
                            href="mailto:Support@loanformobilehome.com"
                            className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
                        >
                            Support@loanformobilehome.com
                        </a>
                        <a href="tel:+17205601018" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500">
                            720.560.1018
                        </a>
                        <p className="text-gray-600 dark:text-gray-400">
                            324 Main St.
                            <br />
                            Unit D
                            <br />
                            Lyons, CO 80540
                            <br />
                            United States
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex flex-col space-y-2">
                        <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">{t('nav.services')}</h3>
                        <Link href="/about" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500">
                            {t('footer.about')}
                        </Link>
                        <Link href="/contact" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500">
                            {t('footer.contact')}
                        </Link>
                        <Link href="/team" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500">
                            {t('footer.team')}
                        </Link>
                        <Link href="/investors" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500">
                            {t('footer.investors')}
                        </Link>
                        <Link href="/privacy" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500">
                            {t('footer.privacy')}
                        </Link>
                        <Link href="/terms" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500">
                            {t('footer.terms')}
                        </Link>
                    </div>

                    {/* Working Hours */}
                    <div className="flex flex-col space-y-2">
                        <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">{t('footer.hours')}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{t('footer.monday')}</p>
                        <p className="text-gray-600 dark:text-gray-400">{t('footer.tuesday')}</p>
                        <p className="text-gray-600 dark:text-gray-400">{t('footer.wednesday')}</p>
                        <p className="text-gray-600 dark:text-gray-400">{t('footer.thursday')}</p>
                        <p className="text-gray-600 dark:text-gray-400">{t('footer.friday')}</p>
                        <p className="text-gray-600 dark:text-gray-400">{t('footer.saturday')}</p>
                        <p className="text-gray-600 dark:text-gray-400">{t('footer.sunday')}</p>
                    </div>
                </div>

                {/* WhatsApp and Copyright */}
                <div className="mt-8 flex flex-col items-center justify-between border-t border-gray-200 pt-8 md:flex-row dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400">© 2024 Mobile Fund Services. {t('footer.rights')}</p>
                    <a
                        href="https://wa.me/99999999"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 flex items-center space-x-2 text-gray-800 hover:text-blue-600 md:mt-0 dark:text-gray-200 dark:hover:text-blue-500"
                    >
                        <MessageCircle className="h-5 w-5" />
                        <span>{t('footer.whatsapp')}</span>
                    </a>
                </div>
            </div>
        </footer>
    );
}
