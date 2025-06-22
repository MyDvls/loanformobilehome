import { router } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react';

interface Language {
    code: 'en' | 'es';
    label: string;
    flag: string;
}

interface LanguageSwitcherProps {
    className?: string;
    currentLocale: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '', currentLocale }) => {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    console.log('LanguageSwitcher props:', { currentLocale });

    const languages: Language[] = [
        { code: 'en', label: 'En', flag: 'https://flagcdn.com/w20/us.png' },
        { code: 'es', label: 'Es', flag: 'https://flagcdn.com/w20/es.png' },
    ];

    const currentLang = languages.find((lang) => lang.code === currentLocale) || languages[0];
    console.log('Current language:', currentLang);
    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const selectLanguage = (lang: Language) => {
        setIsOpen(false);
        router.post(
            route('language.switch'),
            { locale: lang.code },
            {
                preserveState: false,
                preserveScroll: true,
            },
        );
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Escape') {
            setIsOpen(false);
            buttonRef.current?.focus();
        }
    };

    return (
        <div className={`relative ${className}`}>
            <button
                type="button"
                onClick={toggleDropdown}
                ref={buttonRef}
                className="flex min-h-8 w-[61px] flex-col items-stretch justify-center rounded-2xl border border-solid border-[#635F5C] px-2 py-1 text-center whitespace-nowrap text-[#635F5C] transition-colors duration-200 hover:bg-gray-50"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-label="Select language"
            >
                <div className="flex items-center gap-[5px]">
                    <img
                        src={currentLang.flag}
                        alt={`${currentLang.label} flag`}
                        className="my-auto aspect-[1] w-[18px] shrink-0 self-stretch object-contain"
                    />
                    <span className="my-auto self-stretch text-[#635F5C]">{currentLang.label}</span>
                </div>
            </button>

            {isOpen && (
                <div
                    ref={dropdownRef}
                    onKeyDown={handleKeyDown}
                    className="absolute top-full left-0 z-10 mt-1 w-full rounded-lg border border-[#635F5C] bg-white shadow-lg"
                >
                    <ul role="listbox" className="py-1">
                        {languages.map((language) => (
                            <li key={language.code}>
                                <button
                                    type="button"
                                    onClick={() => selectLanguage(language)}
                                    className={`flex w-full items-center gap-2 px-2 py-1 text-left text-[#635F5C] hover:bg-gray-100 ${currentLocale === language.code ? 'font-bold' : ''}`}
                                    role="option"
                                    aria-selected={currentLocale === language.code}
                                >
                                    <img src={language.flag} alt={`${language.label} flag`} className="aspect-[1] w-[18px] object-contain" />
                                    <span>{language.label}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;
