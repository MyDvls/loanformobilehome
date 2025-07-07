import { useAppearance } from '@/hooks/use-appearance';
import { Link, usePage } from '@inertiajs/react';
import { Menu, Moon, Sun } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { Logo } from './Logo';
import MobileMenu from './MobileMenu';
import Navigation from './Navigation';

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

                {/* Right (mobile only): Language/Theme toggle + menu */}
                <div className="my-auto flex items-center gap-2 self-stretch lg:hidden">
                    <button onClick={() => updateAppearance(appearance === 'light' ? 'dark' : 'light')}>
                        {appearance === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    </button>
                    <LanguageSwitcher currentLocale={props.locale} />
                    <button className="p-2 text-gray-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
                        <Menu size={24} />
                    </button>
                </div>

                {/* Mobile menu */}
                <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
            </nav>
        </header>
    );
}
