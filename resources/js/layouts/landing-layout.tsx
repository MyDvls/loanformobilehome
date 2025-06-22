import AnimateOnView from '@/components/AnimateOnView';
import { Footer } from '@/components/Footer';
import Header from '@/components/Header';
import { usePage } from '@inertiajs/react';
import { ReactNode, useEffect, useState } from 'react';

interface LandingLayoutProps {
    children: ReactNode;
}

export default function LandingLayout({ children }: LandingLayoutProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { props } = usePage<{ locale: string }>();

    // Handle scroll effect for sticky navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [props.url]);

    return (
        <div className="flex min-h-screen flex-col">
            <Header isScrolled={isScrolled} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} locale={props.locale} />
            <main className="flex-1 pt-16">
                <AnimateOnView>{children}</AnimateOnView>
            </main>
            <Footer />
        </div>
    );
}
