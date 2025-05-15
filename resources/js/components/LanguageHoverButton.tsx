import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageHoverButton = () => {
    const { t, i18n } = useTranslation();
    const [isRightHovered, setIsRightHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.width;
        const percent = width * 0.1;

        setIsRightHovered(x > width - percent);
    };

    const handleMouseLeave = () => {
        setIsRightHovered(false);
    };

    const getOppositeLanguageText = () => {
        const oppositeLang = i18n.language === 'en' ? 'es' : 'en';
        return i18n.t('home.cta', { lng: oppositeLang });
    };

    const getDisplayText = () => {
        if (isRightHovered) {
            return getOppositeLanguageText();
        }
        return t('home.cta');
    };

    const getOppositeLanguageLabel = () => {
        return i18n.language === 'en' ? 'ES' : 'EN';
    };

    return (
        <div
            className="relative inline-block w-64 rounded-xl"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            role="button"
            aria-label="Button with opposite language preview on right hover"
        >
            <Button className="flex w-full justify-center bg-blue-600 px-8 py-6 text-lg text-white hover:bg-blue-700">{getDisplayText()}</Button>
            {/* Right 10% hover region with EN/ES label */}
            <div
                className={`absolute top-0 right-0 flex h-full w-[10%] items-center justify-center border-l border-gray-300 dark:border-gray-600 ${
                    isRightHovered ? 'bg-opacity-20 rounded-sm bg-blue-600 dark:bg-blue-600' : ''
                }`}
                aria-label={`Preview ${i18n.language === 'en' ? 'Spanish' : 'English'} text`}
            >
                <span className="text-xs font-medium text-white">{getOppositeLanguageLabel()}</span>
            </div>
        </div>
    );
};

export default LanguageHoverButton;
