import { usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const { props } = usePage<{
        locale: string;
        contactSection?: {
            logo_url?: string;
            address?: string;
            phone?: string;
            email?: string;
        };
    }>();
    const logoUrl = props.contactSection?.logo_url;
    const address = props.contactSection?.address;
    const phone = props.contactSection?.phone;
    const emailContact = props.contactSection?.email;

    const handleWhatsAppClick = () => {
        window.open('https://wa.me/17205601018', '_blank');
    };

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Email submitted:', email);
        setEmail('');
    };

    return (
        <footer className="flex min-h-[410px] w-full flex-wrap items-stretch overflow-hidden bg-[#49274A] px-[120px] pt-[60px] max-md:max-w-full max-md:px-5">
            <div className="w-full min-w-60 flex-1 shrink basis-[0%] max-md:max-w-full">
                <div className="flex h-full w-full flex-1 flex-wrap gap-[118px_40px] max-md:max-w-full">
                    <div className="min-w-[300px] flex-1 shrink basis-[0%]">
                        <div className="flex w-[183px] max-w-full items-center gap-1.5 rounded-lg bg-[#FDFAF8] px-3 py-2 text-lg font-bold text-[#191817]">
                            <img
                                src={
                                    logoUrl ||
                                    'https://cdn.builder.io/api/v1/image/assets/8065c8e268d14015b7bf1ebd244b31e3/ec2d3fb7bc2bddc14fc001b963b948d766c2f6b1?placeholderIfAbsent=true'
                                }
                                alt="Mobile Fund Services Logo"
                                className="h-auto w-7 object-contain md:w-9"
                            />
                            <div className="my-auto self-stretch text-[#191817]">
                                <span className="text-[#5B3D5C]">Mobile Fund</span>
                                <br />
                                <span style={{ lineHeight: '21px' }}>Services</span>
                            </div>
                        </div>
                        <address className="mt-5 flex w-full flex-col items-stretch text-base font-normal text-[#FDFAF8] not-italic">
                            <div className="flex w-full items-center gap-3 leading-6">
                                <img
                                    src="https://cdn.builder.io/api/v1/image/assets/8065c8e268d14015b7bf1ebd244b31e3/2a95a1f18b1bf768196367e3274c3920e397ea9e?placeholderIfAbsent=true"
                                    className="my-auto aspect-[0.75] w-[18px] shrink-0 self-stretch object-contain"
                                    alt="Location icon"
                                />
                                <div className="my-auto w-[270px] self-stretch text-[#FDFAF8]">
                                    {address || '324 Main St. Unit D Lyons, CO 80540 United States'}
                                </div>
                            </div>
                            <div className="mt-2.5 flex w-[306px] max-w-full items-center gap-3">
                                <img
                                    src="https://cdn.builder.io/api/v1/image/assets/8065c8e268d14015b7bf1ebd244b31e3/32be4b5ce60dd1aadad796e29b5b5b1b8d39eefd?placeholderIfAbsent=true"
                                    className="my-auto aspect-[1] w-6 shrink-0 self-stretch object-contain"
                                    alt="Email icon"
                                />
                                <a href="mailto:Support@loanformobilehome.com" className="my-auto self-stretch text-[#FDFAF8] hover:underline">
                                    Support@loanformobilehome.com
                                </a>
                            </div>
                            <div className="mt-2.5 flex items-center gap-3">
                                <img
                                    src="https://cdn.builder.io/api/v1/image/assets/8065c8e268d14015b7bf1ebd244b31e3/244b755a7bc8b8dc16d52c6aab261a3bcb097f45?placeholderIfAbsent=true"
                                    className="my-auto aspect-[1] w-7 shrink-0 self-stretch object-contain"
                                    alt="Phone icon"
                                />
                                <a href="tel:7205601018" className="my-auto self-stretch text-[#FDFAF8] hover:underline">
                                    (720) 560-1018
                                </a>
                            </div>
                            <button
                                onClick={handleWhatsAppClick}
                                className="mt-2.5 flex items-center gap-1.5 rounded-lg bg-[#2AA81A] px-4 py-2 transition-colors duration-200 hover:bg-[#248a16]"
                            >
                                <img
                                    src="https://cdn.builder.io/api/v1/image/assets/8065c8e268d14015b7bf1ebd244b31e3/02b0b9daa2b4400f0d8e2029e07e225e921d6fc4?placeholderIfAbsent=true"
                                    className="my-auto aspect-[1] w-[30px] shrink-0 self-stretch rounded-[50%] object-contain"
                                    alt="WhatsApp icon"
                                />
                                <span className="my-auto self-stretch text-[#FDFAF8]">{t('footer.whatsapp')}</span>
                            </button>
                        </address>
                    </div>

                    <nav className="min-w-[200px] flex-1 shrink basis-[0%] text-base text-[#FDFAF8]">
                        <h3 className="font-semibold text-[#FDFAF8]">{t('footer.quick')}</h3>
                        <ul className="mt-6 flex w-full flex-col items-stretch justify-center space-y-3 font-normal">
                            <li>
                                <a href="/services" className="text-[#FDFAF8] hover:underline">
                                    {t('footer.services')}
                                </a>
                            </li>
                            <li>
                                <a href="/contact" className="text-[#FDFAF8] hover:underline">
                                    {t('footer.contact')}
                                </a>
                            </li>

                            <li>
                                <a href="/loan-guide" className="text-[#FDFAF8] hover:underline">
                                    {t('footer.loan_guide')}
                                </a>
                            </li>
                            <li>
                                <a href="/apply" className="text-[#FDFAF8] hover:underline">
                                    {t('footer.loan')}
                                </a>
                            </li>
                            <li>
                                <a href="/team" className="text-[#FDFAF8] hover:underline">
                                    {t('footer.team')}
                                </a>
                            </li>
                            <li>
                                <a href="/investors" className="text-[#FDFAF8] hover:underline">
                                    {t('footer.investors')}
                                </a>
                            </li>
                            <li>
                                <a href="/customers" className="text-[#FDFAF8] hover:underline">
                                    {t('footer.customers')}
                                </a>
                            </li>
                        </ul>
                    </nav>

                    <nav className="min-w-[200px] flex-1 shrink basis-[0%] text-base text-[#FDFAF8]">
                        <h3 className="font-semibold text-[#FDFAF8]">{t('footer.support')}</h3>
                        <ul className="mt-6 flex w-full flex-col items-stretch justify-center space-y-3 font-normal">
                            <li>
                                <a href="/contact" className="text-[#FDFAF8] hover:underline">
                                    {t('footer.contact')}
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/privacy-policy-updated.pdf"
                                    className="text-[#FDFAF8] hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {t('footer.privacy')}
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/terms-and-conditions.pdf"
                                    className="text-[#FDFAF8] hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {t('footer.terms')}
                                </a>
                            </li>
                        </ul>
                    </nav>

                    <div className="min-w-[232px] flex-1 shrink basis-[0%] text-base text-[#FDFAF8]">
                        <h3 className="font-semibold text-[#FDFAF8]">{t('footer.hours')}</h3>
                        <div className="mt-6 flex w-[232px] max-w-full flex-col items-stretch justify-center space-y-3 font-normal">
                            <div>{t('footer.monday')}</div>
                            <div>{t('footer.tuesday')}</div>
                            <div>{t('footer.wednesday')}</div>
                            <div>{t('footer.thursday')}</div>
                            <div>{t('footer.friday')}</div>
                            <div>{t('footer.saturday')}</div>
                            <div>{t('footer.sunday')}</div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex w-full flex-col items-stretch text-center text-xs font-normal text-[#FDFAF8] max-md:max-w-full">
                    <div className="min-h-px w-full bg-[#5B3D5C] max-md:max-w-full" />
                    <div className="mt-1 text-[#FDFAF8] max-md:max-w-full">© 2024 Mobile Fund Services. All Rights Reserved.</div>
                </div>
            </div>
        </footer>
    );
};
