import { useAppearance } from '@/hooks/use-appearance';
import { Link, usePage } from '@inertiajs/react';
import { ArrowRight, Menu, Moon, Sun } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { Logo } from './Logo';
import MobileMenu from './MobileMenu';
import Navigation from './Navigation';
import { Button } from './ui/button';

interface HeaderProps {
    isScrolled: boolean;
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
    locale: string;
}

export default function Header({ isScrolled, isMobileMenuOpen, setIsMobileMenuOpen, locale }: HeaderProps) {
    const { appearance, updateAppearance } = useAppearance();
    const { props } = usePage<{
        locale: string;
        contactSection?: { logo_url?: string };
    }>();
    const logoUrl = props.contactSection?.logo_url;
    const { t } = useTranslation();

    return (
        <header
            className={`fixed top-0 right-0 left-0 z-50 min-h-4 w-full transition-all duration-300 ${
                isScrolled ? 'bg-background/95 shadow-md backdrop-blur-sm' : 'bg-background'
            }`}
        >
            <div className="flex min-h-4 w-full bg-[#927D92] max-md:max-w-full" />
            <nav className="container mx-auto flex h-auto items-center justify-between px-[20px] py-5 md:px-[25px] xl:px-[40px]">
                {/* Left: Logo */}
                <Link href="/" className="z-10 my-auto flex items-center self-stretch">
                    <Logo logoUrl={logoUrl} />
                </Link>

                {/* Center & Right: Navigation (hidden on mobile) */}
                <Navigation />
                <div className="">
                    <LanguageSwitcher />
                </div>
                {/* Right (mobile only): Language/Theme toggle + menu */}
                <div className="my-auto flex items-center gap-2 self-stretch lg:hidden">
                    <button onClick={() => updateAppearance(appearance === 'light' ? 'dark' : 'light')}>
                        {appearance === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    </button>
                    <button className="p-2 text-gray-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
                        <Menu size={24} />
                    </button>
                </div>

                {/* Right group: Language / Theme / Auth */}
                <div className="hidden items-center gap-x-2 lg:flex">
                    <div className="flex flex-1 justify-center">
                        <button onClick={() => updateAppearance(appearance === 'light' ? 'dark' : 'light')}>
                            {appearance === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                        </button>
                    </div>
                    <div className="flex flex-1 justify-center">
                        <Link href="/login" className="text-sm font-medium transition-colors duration-200">
                            {t('nav.login')}
                        </Link>
                    </div>
                    <div className="flex flex-1 justify-center">
                        <Link prefetch="mount" cache-for="5m" href="/apply">
                            <Button variant="primary">
                                {t('nav.apply')}
                                <ArrowRight className="h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Mobile menu */}
                <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
            </nav>
        </header>
    );
}
