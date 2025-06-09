import { Card } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Banknote, CreditCard, FileCheck, FileKey, FileText, UserCheck } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AnimateOnView from './AnimateOnView';
import { Button } from './ui/button';

const requirements = [
    {
        icon: CreditCard,
        title: 'requirements.item1.title',
        description: 'requirements.item1.description',
    },
    {
        icon: FileText,
        title: 'requirements.item2.title',
        description: 'requirements.item2.description',
    },
    {
        icon: FileCheck,
        title: 'requirements.item3.title',
        description: 'requirements.item3.description',
    },
    {
        icon: UserCheck,
        title: 'requirements.item4.title',
        description: 'requirements.item4.description',
    },
    {
        icon: FileKey,
        title: 'requirements.item5.title',
        description: 'requirements.item5.description',
    },
    {
        icon: Banknote,
        title: 'requirements.item6.title',
        description: 'requirements.item6.description',
    },
];

const Requirements = () => {
    const { t } = useTranslation();
    const [activeIndex, setActiveIndex] = useState(0);
    const ActiveIcon = requirements[activeIndex].icon;

    // Calculate oscillation with decaying amplitude - first item starts at center
    const getOscillationStyle = (index: number) => {
        const baseSpacing = 120; // Base horizontal spacing between items
        const initialAmplitude = 240; // Starting vertical amplitude
        const decayFactor = 0.7; // How quickly the amplitude decreases (0.7 = 30% reduction each step)

        // First item (index 0) starts at center with no oscillation
        if (index === 0) {
            return {
                left: `${index * baseSpacing}px`,
                top: '30%',
                transform: 'translateY(0px)',
                transition: 'transform 0.5s ease-out',
            };
        }

        // Calculate decaying amplitude for subsequent items
        const amplitude = initialAmplitude * Math.pow(decayFactor, index - 1);
        // Alternate direction for each item (starting from index 1)
        const direction = index % 2 === 1 ? -1 : 1;

        return {
            left: `${index * baseSpacing}px`,
            top: '30%',
            transform: `translateY(${direction * amplitude}px)`,
            transition: 'transform 0.5s ease-out',
        };
    };

    return (
        <section className="gradient-section gradient-section-2 relative w-full overflow-hidden pt-[200px] pb-35">
            <div className="relative z-10 container mx-auto px-4">
                <h2 className="mb-4 text-center text-4xl font-bold text-gray-200">{t('requirements.title')}</h2>
                <p className="mb-12 text-center text-xl text-gray-200">{t('requirements.subtitle')}</p>

                {/* Mobile: Single column */}
                <div className="flex flex-col gap-8 md:hidden">
                    {requirements.map((req, index) => (
                        <AnimateOnView key={index} delay={index * 0.1}>
                            <Card className="p-6 transition-all">
                                <div className="flex flex-col space-y-4">
                                    <div className="flex items-center gap-4">
                                        <req.icon className="h-8 w-8 flex-shrink-0 text-blue-600" />
                                        <h3 className="text-lg font-semibold text-gray-200">{t(req.title)}</h3>
                                    </div>
                                    <p className="text-gray-200">{t(req.description)}</p>
                                </div>
                            </Card>
                        </AnimateOnView>
                    ))}
                </div>

                {/* Desktop: Side-by-side layout with decaying oscillation */}
                <div className="hidden flex-col gap-8 md:flex md:flex-row">
                    {/* Icons sidebar - 50% width with dynamic oscillation */}
                    <div className="relative h-[600px] w-full md:w-1/2">
                        <div className="relative h-full">
                            {requirements.map((req, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`absolute z-10 flex items-center justify-center rounded-full border p-4 transition-all ${
                                        activeIndex >= index
                                            ? 'border-gray-600 bg-gray-800 text-gray-400'
                                            : 'border-gray-300 bg-white text-gray-400 hover:border-gray-500 hover:bg-gray-700'
                                    }`}
                                    style={getOscillationStyle(index)}
                                >
                                    <req.icon className={`h-8 w-8 flex-shrink-0`} />
                                </button>
                            ))}

                            {/* Dynamic connecting path in segments */}
                            <svg
                                className="pointer-events-none absolute top-0 left-0 h-full w-full"
                                viewBox={`0 0 ${requirements.length * 120} 600`}
                                preserveAspectRatio="none"
                            >
                                {(() => {
                                    const points = requirements.map((_, i) => {
                                        const style = getOscillationStyle(i);
                                        const x = i * 120 + 28;
                                        const y =
                                            250 +
                                            (style.transform.includes('-')
                                                ? -parseInt(style.transform.match(/\d+/)![0])
                                                : parseInt(style.transform.match(/\d+/)![0]));
                                        return { x, y };
                                    });

                                    const paths = [];
                                    for (let i = 1; i < points.length; i++) {
                                        const current = points[i];
                                        const previous = points[i - 1];
                                        const controlPointOffset = 60;

                                        const cp1x = previous.x + controlPointOffset;
                                        const cp1y = previous.y;
                                        const cp2x = current.x - controlPointOffset;
                                        const cp2y = current.y;

                                        const d = `M ${previous.x} ${previous.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${current.x} ${current.y}`;

                                        paths.push(
                                            <path
                                                key={i}
                                                d={d}
                                                stroke={i <= activeIndex ? '#4B5563' : '#D1D5DB'} // gray-700 vs gray-300
                                                strokeWidth="6"
                                                fill="none"
                                                className={`transition-all duration-500`}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeDasharray="50,10"
                                            />,
                                        );
                                    }

                                    return paths;
                                })()}
                            </svg>
                        </div>
                    </div>

                    {/* Content area - 50% width */}
                    <div className="w-full md:w-1/2">
                        <AnimateOnView key={activeIndex} delay={0.2}>
                            <Card className="flex h-full items-start border-none bg-transparent p-8 transition-all duration-300">
                                <div className="flex flex-col space-y-6">
                                    <div className="transform transition-transform duration-500 ease-in-out">
                                        <ActiveIcon className="h-12 w-12 flex-shrink-0 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="mb-4 text-2xl font-semibold text-gray-200">{t(requirements[activeIndex].title)}</h3>
                                        <p className="text-lg text-gray-200">{t(requirements[activeIndex].description)}</p>
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
