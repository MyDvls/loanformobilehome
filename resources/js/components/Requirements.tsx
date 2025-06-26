import { Card } from '@/components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AnimateOnView from './AnimateOnView';
import { Button } from './ui/button';

const Requirements = ({ requirementsSection, requirementItems }: { requirementsSection: any; requirementItems: any[] }) => {
    const { t } = useTranslation();

    // Use requirementItems directly instead of mapping from requirementsSection
    const requirements = requirementItems || [];

    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="gradient-section gradient-section-2 relative w-full overflow-hidden pt-[200px] pb-35">
            <div className="relative z-10 container mx-auto px-4">
                <h2 className="mb-4 text-center text-4xl font-bold text-gray-200">{requirementsSection?.title || t('requirements.title')}</h2>
                <p className="mb-12 text-center text-xl text-gray-200">{requirementsSection?.subtitle || t('requirements.subtitle')}</p>

                {/* Mobile: Single column */}
                <div className="flex flex-col gap-8 md:hidden">
                    {requirements.map((req, index) => (
                        <AnimateOnView key={index} delay={index * 0.1}>
                            <Card className="p-6 transition-all">
                                <div className="flex flex-col space-y-4">
                                    <div className="flex items-center gap-4">
                                        <img src={req.image_path} alt={req.title} className="h-8 w-8 flex-shrink-0 object-contain" />
                                        <h3 className="text-lg font-semibold text-gray-200">{t(req.title)}</h3>
                                    </div>
                                    <p className="text-gray-200">{t(req.description)}</p>
                                </div>
                            </Card>
                        </AnimateOnView>
                    ))}
                </div>

                {/* Desktop: Side-by-side layout */}
                <div className="hidden flex-col gap-8 md:flex md:flex-row">
                    {/* Images sidebar - 50% width */}
                    <div className="relative h-[600px] w-full md:w-1/2">
                        <div className="relative flex h-full items-center justify-center">
                            <img
                                src={requirements[activeIndex]?.image_path}
                                alt={requirements[activeIndex]?.title}
                                className="h-full w-full object-contain transition-all duration-500"
                            />
                        </div>
                    </div>

                    {/* Content area - 50% width (same as before) */}
                    <div className="w-full md:w-1/2">
                        <AnimateOnView key={activeIndex} delay={0.2}>
                            <Card className="flex h-full items-start border-none bg-transparent p-8 shadow-none transition-all duration-300">
                                <div className="flex flex-col space-y-6">
                                    <div className="transform transition-transform duration-500 ease-in-out">
                                        <div className="m-0 flex h-20 w-20 flex-shrink-0 items-end justify-start p-0 text-4xl text-white">
                                            0{activeIndex + 1}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="mb-4 text-2xl font-semibold text-gray-200">{requirements[activeIndex]?.title || ''}</h3>
                                        <p className="text-lg text-gray-200">{requirements[activeIndex]?.description || ''}</p>
                                    </div>
                                </div>
                            </Card>
                        </AnimateOnView>
                        {/* Navigation Buttons */}
                        <div className="mt-6 flex justify-start gap-4 md:w-full">
                            {activeIndex > 0 && (
                                <Button
                                    variant="primary"
                                    onClick={() => setActiveIndex((prev) => Math.max(prev - 1, 0))}
                                    className="cursor-pointer rounded px-4 py-2 text-white transition"
                                >
                                    <ArrowLeft className="mr-2 h-5 w-5" />
                                    {t('common.previous', 'Previous')}
                                </Button>
                            )}

                            <Button
                                variant="primary"
                                onClick={() => setActiveIndex((prev) => Math.min(prev + 1, requirements.length - 1))}
                                disabled={activeIndex === requirements.length - 1}
                                className={`rounded px-4 py-2 text-white transition ${
                                    activeIndex === requirements.length - 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                                }`}
                            >
                                {t('common.next', 'Next')}
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Requirements;
