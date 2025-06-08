import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Language {
    code: 'en' | 'es' | 'fr';
    label: string;
    flag: string;
}

interface LanguageSwitcherProps {
    className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '' }) => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const languages: Language[] = [
        {
            code: 'en',
            label: 'En',
            flag: 'https://cdn.builder.io/api/v1/image/assets/8065c8e268d14015b7bf1ebd244b31e3/2e77c09c22b5f2cda9fdb1cbe654af1964fd4d38?placeholderIfAbsent=true',
        },
        {
            code: 'es',
            label: 'Es',
            flag: 'https://cdn.builder.io/api/v1/image/assets/8065c8e268d14015b7bf1ebd244b31e3/2e77c09c22b5f2cda9fdb1cbe654af1964fd4d38?placeholderIfAbsent=true',
        },
    ];

    const currentLang = languages.find((lang) => lang.code === i18n.language) || languages[0];

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const selectLanguage = (lang: Language) => {
        i18n.changeLanguage(lang.code);
        setIsOpen(false);
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
                                    className="flex w-full items-center gap-2 px-2 py-1 text-left text-[#635F5C] hover:bg-gray-100"
                                    role="option"
                                    aria-selected={i18n.language === language.code}
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
