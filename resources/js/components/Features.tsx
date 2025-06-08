import React from 'react';
import { useTranslation } from 'react-i18next';

export const Features: React.FC = () => {
    const { t } = useTranslation();
    const features = [
        {
            icon: 'https://cdn.builder.io/api/v1/image/assets/8065c8e268d14015b7bf1ebd244b31e3/49ae7f7241201d554d39a316734c19d97c016c1d?placeholderIfAbsent=true',
            title: t('features.1.title'),
            description: (
                <>
                    <span className="text-[#191817]">{t('features.1.description')}</span>
                </>
            ),
        },
        {
            icon: 'https://cdn.builder.io/api/v1/image/assets/8065c8e268d14015b7bf1ebd244b31e3/caa9cebb7f2ee27128b046f808519ee1b0db109b?placeholderIfAbsent=true',
            title: t('features.2.title'),
            description: (
                <>
                    <span className="text-[#191817]">{t('features.2.description')}</span>
                </>
            ),
        },
        {
            icon: 'https://cdn.builder.io/api/v1/image/assets/8065c8e268d14015b7bf1ebd244b31e3/c86d775aad3393f5c1db83c020640f53aeceb20f?placeholderIfAbsent=true',
            title: t('features.3.title'),
            description: t('features.3.description'),
        },
        {
            icon: 'https://cdn.builder.io/api/v1/image/assets/8065c8e268d14015b7bf1ebd244b31e3/7e70a0f079b36271b9a4cc5c402397a0339a9114?placeholderIfAbsent=true',
            title: t('features.4.title'),
            description: t('features.4.description'),
        },
        {
            icon: 'https://cdn.builder.io/api/v1/image/assets/8065c8e268d14015b7bf1ebd244b31e3/c86d775aad3393f5c1db83c020640f53aeceb20f?placeholderIfAbsent=true',
            title: t('features.5.title'),
            description: t('features.5.description'),
        },
    ];

    return (
        <>
            {/* Desktop Version (md and up) */}
            <section className="mt-[88px] hidden w-full px-[120px] md:block">
                <div className="w-full">
                    <h2 className="text-center text-[40px] font-bold text-black dark:text-white">{t('features.title')}</h2>
                    <div className="mt-14 flex w-full flex-wrap gap-[18px_24px]">
                        {features.map((feature, index) => (
                            <article
                                key={index}
                                className="flex min-h-[249px] min-w-96 flex-1 shrink basis-[0%] flex-col rounded-2xl border border-solid border-[#F9F0E9] bg-[#FDFAF8] p-4 text-center shadow-[0px_2px_4px_0px_rgba(0,0,0,0.20),0px_4px_5px_0px_rgba(0,0,0,0.14),0px_1px_10px_0px_rgba(0,0,0,0.12)]"
                            >
                                <img src={feature.icon} className="aspect-[1] w-[76px] self-center object-contain" alt={`${feature.title} icon`} />
                                <div className="mt-4 w-full flex-1">
                                    <h3 className="text-xl font-medium text-[#111]">{feature.title}</h3>
                                    <p className="mt-3 text-base leading-6 font-normal text-[#191817]">{feature.description}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mobile Version (below md) */}
            <section className="mt-10 block w-full px-5 md:hidden">
                <div className="w-full">
                    <h2 className="text-center text-[28px] font-bold text-[#111]">Why Choose Us?</h2>
                    <div className="mt-10 flex flex-col gap-6">
                        {features.map((feature, index) => (
                            <article
                                key={index}
                                className="flex w-full flex-col rounded-2xl border border-solid border-[#F9F0E9] bg-[#FDFAF8] p-4 text-center shadow-[0px_2px_4px_0px_rgba(0,0,0,0.20),0px_4px_5px_0px_rgba(0,0,0,0.14),0px_1px_10px_0px_rgba(0,0,0,0.12)]"
                            >
                                <img src={feature.icon} className="aspect-[1] w-[64px] self-center object-contain" alt={`${feature.title} icon`} />
                                <div className="mt-4 w-full">
                                    <h3 className="text-lg font-medium text-[#111]">{feature.title}</h3>
                                    <p className="mt-3 text-base leading-6 font-normal text-[#191817]">{feature.description}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};
