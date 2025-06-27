import { Card } from '@/components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AnimateOnView from './AnimateOnView';
import { Button } from './ui/button';

interface RequirementItem {
    id: number;
    title: string;
    description: string;
    image_path: string | null;
}

interface RequirementsSection {
    title: string;
    subtitle: string;
}

interface RequirementsProps {
    requirementsSection: RequirementsSection;
    requirementItems: RequirementItem[];
}

const Requirements = ({ requirementsSection, requirementItems }: RequirementsProps) => {
    const { t } = useTranslation();

    const [activeIndex, setActiveIndex] = useState(0);

    // Separate amplitude configs for buttons and stroke
    const buttonAmplitude = 450; // Larger movement for buttons
    const strokeAmplitude = 35; // Original value for stroke path
    const decayFactor = 0.75;

    // Calculate oscillation with decaying amplitude - responsive to container width
    const getOscillationStyle = (index: number, totalItems: number, amplitudeBase: number) => {
        const containerWidth = 100; // Use percentage-based positioning
        const itemWidth = containerWidth / Math.max(totalItems - 1, 1); // Distribute items across container width
        const initialAmplitude = amplitudeBase; // Use the passed amplitude base
        const decayFactor = 0.75; // How quickly the amplitude decreases

        // First item (index 0) starts at left with no oscillation
        if (index === 0) {
            return {
                left: '0%',
                top: '50%',
                transform: 'translateY(0%) translateX(-50%)',
                transition: 'all 0.5s ease-out',
            };
        }

        // Calculate position as percentage of container width
        const leftPosition = index * itemWidth;

        // Calculate decaying amplitude for subsequent items
        const amplitude = initialAmplitude * Math.pow(decayFactor, index - 1);
        // Alternate direction for each item (starting from index 1)
        const direction = index % 2 === 1 ? -1 : 1;

        return {
            left: `${Math.min(leftPosition, 95)}%`, // Ensure items don't go beyond container
            top: '47.5%',
            transform: `translateY(${direction * amplitude}%) translateX(-0%)`,
            transition: 'all 0.5s ease-out',
        };
    };

    // Return early if no requirement items
    if (!requirementItems || requirementItems.length === 0) {
        return (
            <section className="gradient-section gradient-section-2 relative w-full overflow-hidden pt-[200px] pb-35">
                <div className="relative z-10 container mx-auto px-4">
                    <h2 className="mb-4 text-center text-4xl font-bold text-gray-200">{requirementsSection?.title || t('requirements.title')}</h2>
                    <p className="mb-12 text-center text-xl text-gray-200">{requirementsSection?.subtitle || t('requirements.subtitle')}</p>
                    <div className="text-center text-gray-200">
                        <p>{t('requirements.no_items', 'No requirements available')}</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="gradient-section gradient-section-2 relative w-full overflow-hidden pt-[200px] pb-35">
            <div className="relative z-10 container mx-auto px-4">
                <h2 className="mb-4 text-center text-4xl font-bold text-gray-200">{requirementsSection?.title || t('requirements.title')}</h2>
                <p className="mb-12 text-center text-xl text-gray-200">{requirementsSection?.subtitle || t('requirements.subtitle')}</p>

                {/* Mobile: Single column */}
                <div className="flex flex-col gap-8 md:hidden">
                    {requirementItems.map((item, index) => (
                        <AnimateOnView key={item.id} delay={index * 0.1}>
                            <Card className="p-6 transition-all">
                                <div className="flex flex-col space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                            {item.image_path ? (
                                                <img src={item.image_path} alt={item.title} className="h-full w-full object-cover" />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-gray-300 text-gray-500">
                                                    <span>No Image</span>
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-200">{item.title}</h3>
                                    </div>
                                    <p className="text-gray-200">{item.description}</p>
                                </div>
                            </Card>
                        </AnimateOnView>
                    ))}
                </div>

                {/* Desktop: Side-by-side layout with decaying oscillation */}
                <div className="hidden flex-col gap-8 md:flex md:flex-row">
                    {/* Icons sidebar - 50% width with dynamic oscillation */}
                    <div className="relative h-[600px] w-full md:w-1/2">
                        <div className="relative h-full w-full">
                            {requirementItems.map((item, index) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveIndex(index)}
                                    className={`absolute z-10 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 p-1 transition-all ${
                                        activeIndex >= index
                                            ? 'border-gray-600 bg-gray-800'
                                            : 'border-gray-300 bg-white hover:border-gray-500 hover:bg-gray-700'
                                    }`}
                                    style={getOscillationStyle(index, requirementItems.length, buttonAmplitude)}
                                >
                                    {item.image_path ? (
                                        <img src={item.image_path} alt={item.title} className="h-full w-full rounded-full object-cover" />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-300 text-xs text-gray-500">
                                            {index + 1}
                                        </div>
                                    )}
                                </button>
                            ))}

                            {/* Dynamic connecting path in segments */}
                            <svg className="pointer-events-none absolute top-0 left-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                {(() => {
                                    const points = requirementItems.map((_, i) => {
                                        const style = getOscillationStyle(i, requirementItems.length, strokeAmplitude);
                                        const leftPercent = parseFloat(style.left);
                                        const x = leftPercent;

                                        // Extract vertical offset from transform
                                        const transformMatch = style.transform.match(/translateY\(([^%]+)%\)/);
                                        const yOffset = transformMatch ? parseFloat(transformMatch[1]) : 0;
                                        const y = 50 + yOffset;

                                        return { x, y };
                                    });

                                    const paths = [];
                                    for (let i = 1; i < points.length; i++) {
                                        const current = points[i];
                                        const previous = points[i - 1];
                                        const controlPointOffset = Math.abs(current.x - previous.x) * 0.3;

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
                                                strokeWidth="1"
                                                fill="none"
                                                className={`transition-all duration-500`}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeDasharray="5,2"
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
                        {requirementItems[activeIndex] && (
                            <AnimateOnView key={activeIndex} delay={0.2}>
                                <Card className="flex h-full items-start border-none bg-transparent p-8 shadow-none transition-all duration-300">
                                    <div className="flex flex-col space-y-6">
                                        <div className="transform transition-transform duration-500 ease-in-out">
                                            <div className="m-0 flex h-20 w-20 flex-shrink-0 items-end justify-start p-0 text-4xl text-white">
                                                0{activeIndex + 1}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="mb-4 text-2xl font-semibold text-gray-200">{requirementItems[activeIndex].title}</h3>
                                            <p className="text-lg text-gray-200">{requirementItems[activeIndex].description}</p>
                                        </div>
                                    </div>
                                </Card>
                            </AnimateOnView>
                        )}

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
                                onClick={() => setActiveIndex((prev) => Math.min(prev + 1, requirementItems.length - 1))}
                                disabled={activeIndex === requirementItems.length - 1}
                                className={`rounded px-4 py-2 text-white transition ${
                                    activeIndex === requirementItems.length - 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
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
