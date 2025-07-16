import React, { useEffect, useRef, useState } from 'react';

const LANGUAGES = [
    { code: 'en', label: 'En', flag: 'https://flagcdn.com/w20/us.png' },
    { code: 'es', label: 'Es', flag: 'https://flagcdn.com/w20/es.png' },
    { code: 'fr', label: 'Fr', flag: 'https://flagcdn.com/w20/fr.png' },
    { code: 'de', label: 'De', flag: 'https://flagcdn.com/w20/de.png' },
    { code: 'it', label: 'It', flag: 'https://flagcdn.com/w20/it.png' },
    { code: 'hi', label: 'hi', flag: 'https://flagcdn.com/w20/in.png' },
];

const GOOGLE_TRANSLATE_ID = 'google_translate_element';

const LanguageSwitcher: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [currentLang, setCurrentLang] = useState(LANGUAGES[0]);

    // Inject Google Translate script and widget
    useEffect(() => {
        if (!document.getElementById('google-translate-script')) {
            const script = document.createElement('script');
            script.id = 'google-translate-script';
            script.type = 'text/javascript';
            script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            document.body.appendChild(script);
        }
        (window as any).googleTranslateElementInit = function () {
            if (!document.getElementById(GOOGLE_TRANSLATE_ID)) return;
            new (window as any).google.translate.TranslateElement(
                {
                    pageLanguage: 'en',
                    autoDisplay: false,
                },
                GOOGLE_TRANSLATE_ID,
            );
        };
    }, []);

    // Hide the default Google Translate UI
    useEffect(() => {
        const hideWidget = () => {
            const widget = document.getElementById(GOOGLE_TRANSLATE_ID);
            if (widget) {
                widget.style.display = 'none';
            }
        };
        setTimeout(hideWidget, 1500);
    }, []);

    // Handle language selection
    const selectLanguage = (lang: { code: string; label: string; flag: string }) => {
        setIsOpen(false);
        setCurrentLang(lang);
        // Find the Google Translate select and set its value
        const select = document.querySelector('select.goog-te-combo') as HTMLSelectElement;
        if (select) {
            select.value = lang.code;
            select.dispatchEvent(new Event('change'));
        }
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
        <div className="relative">
            {/* Hidden Google Translate widget */}
            <div id={GOOGLE_TRANSLATE_ID} style={{ display: 'none' }} />
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
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
                    className="absolute top-full left-0 z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-[#635F5C] bg-white shadow-lg"
                    style={{ minWidth: 110 }}
                >
                    <ul role="listbox" className="py-1">
                        {LANGUAGES.map((language) => (
                            <li key={language.code}>
                                <button
                                    type="button"
                                    onClick={() => selectLanguage(language)}
                                    className={`flex w-full items-center gap-2 px-2 py-1 text-left text-[#635F5C] hover:bg-gray-100 ${currentLang.code === language.code ? 'font-bold' : ''}`}
                                    role="option"
                                    aria-selected={currentLang.code === language.code}
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
