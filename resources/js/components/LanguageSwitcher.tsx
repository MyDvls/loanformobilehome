import React, { useEffect } from 'react';

const LanguageSwitcher: React.FC = () => {
    useEffect(() => {
        // Prevent duplicate script injection
        if (!document.getElementById('google-translate-script')) {
            const script = document.createElement('script');
            script.id = 'google-translate-script';
            script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            document.body.appendChild(script);

            (window as any).googleTranslateElementInit = function () {
                if (document.getElementById('google_translate_element')) {
                    new (window as any).google.translate.TranslateElement(
                        {
                            pageLanguage: 'en',
                            layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
                            includedLanguages: 'en,es,fr,de,it,pt,ru,ja,ko,zh,ar,hi',
                        },
                        'google_translate_element',
                    );

                    // Add accessibility attributes
                    const translateLink = document.querySelector('#google_translate_element .goog-te-gadget-simple a');
                    if (translateLink) {
                        translateLink.setAttribute('title', 'Select Language');
                        translateLink.setAttribute('aria-label', 'Select Language');
                    }
                }
            };

            return () => {
                // Cleanup script on component unmount
                const scriptElement = document.getElementById('google-translate-script');
                if (scriptElement) {
                    document.body.removeChild(scriptElement);
                }
            };
        }
    }, []);

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
            }}
        >
            <div id="google_translate_element"></div>
        </div>
    );
};

export default LanguageSwitcher;
