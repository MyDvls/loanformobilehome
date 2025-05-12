import { Button } from '@/components/ui/button';
import { useAppearance } from '@/hooks/use-appearance';
import { Link } from '@inertiajs/react';
import { Menu, Moon, Sun } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import Logo from './Logo';
import MobileMenu from './MobileMenu';
import Navigation from './Navigation';

interface HeaderProps {
    isScrolled: boolean;
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Header({ isScrolled, isMobileMenuOpen, setIsMobileMenuOpen }: HeaderProps) {
    const { appearance, updateAppearance } = useAppearance();

    return (
        <header
            className={`fixed top-0 right-0 left-0 z-50 w-full transition-all duration-300 ${
                isScrolled ? 'bg-background/95 shadow-md backdrop-blur-sm' : 'bg-background'
            }`}
        >
            <nav className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="z-10 flex items-center">
                    <Logo />
                </Link>

                <div className="flex items-center">
                    {/* Language Switcher */}
                    <LanguageSwitcher />

                    {/* Theme Toggle */}
                    <Button variant="ghost" size="icon" onClick={() => updateAppearance(appearance === 'light' ? 'dark' : 'light')} className="mr-4">
                        {appearance === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    </Button>

                    {/* Mobile menu button */}
                    <button
                        className="z-10 p-2 text-gray-600 md:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <Menu size={24} />
                    </button>
                </div>

                {/* Mobile menu */}
                <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

                {/* Desktop Navigation */}
                <Navigation />
            </nav>
        </header>
    );
}
