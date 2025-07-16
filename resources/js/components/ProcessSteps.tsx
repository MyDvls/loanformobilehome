import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import AnimateOnView from './AnimateOnView';

interface Step {
    id: number;
    title: string;
    description: string;
    image_url: string | null;
}

interface Props {
    loanSection: {
        title: string;
    } | null;
    loanItems: Step[];
}

const ProcessSteps = ({ loanSection, loanItems }: Props) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const ref = useRef(null);
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Map loanItems to steps array
    const steps = loanItems.map((item, index) => ({
        number: ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN'][index] || (index + 1).toString(),
        title: item.title,
        description: item.description,
        image: item.image_url || '/images/placeholder-home.jpg',
    }));

    // Auto-advance timer effect
    useEffect(() => {
        if (isVisible && !isPaused && steps.length > 0) {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }

            timerRef.current = setTimeout(() => {
                setCurrentStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
            }, 8000);
        }

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [currentStep, isVisible, isPaused, steps.length]);

    // Intersection observer for visibility
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.5 },
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    const getDescriptionParts = (description: string) => {
        const words = description.split(' ');
        const lastFewWords = words.slice(-8).join(' ');
        const mainText = words.slice(0, -8).join(' ');
        return { mainText, lastFewWords };
    };

    const TypeAnimation = ({ text }: { text: string }) => {
        const [displayedText, setDisplayedText] = useState('');
        const [currentIndex, setCurrentIndex] = useState(0);

        useEffect(() => {
            if (currentIndex < text.length) {
                const timeout = setTimeout(() => {
                    setDisplayedText((prev) => prev + text[currentIndex]);
                    setCurrentIndex((prev) => prev + 1);
                }, 50);
                return () => clearTimeout(timeout);
            }
        }, [currentIndex, text]);

        useEffect(() => {
            setDisplayedText('');
            setCurrentIndex(0);
        }, [text]);

        return (
            <span className="font-medium text-gray-700 dark:text-white">
                {displayedText}
                <span className="ml-0.5 inline-block h-5 w-0.5 animate-pulse bg-gray-700 dark:bg-white" />
            </span>
        );
    };

    const StepIndicator = ({ step, index }: { step: (typeof steps)[0]; index: number }) => {
        const isActive = currentStep >= index;
        const isCurrent = currentStep === index;

        return (
            <div className="relative flex flex-col items-center pb-4" ref={(el) => (stepRefs.current[index] = el)}>
                <button
                    onClick={() => {
                        setCurrentStep(index);
                        setIsPaused(true);
                        setTimeout(() => setIsPaused(false), 1000);
                    }}
                    className={`flex h-12 w-12 items-center justify-center rounded-full text-lg transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none ${
                        isCurrent
                            ? 'bg-[#5B3D5C] text-white ring-4 ring-purple-200 dark:ring-purple-400'
                            : isActive
                              ? 'border-[#C8BEC9] bg-[#5B3D5C] text-white'
                              : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                    }`}
                    aria-label={`Go to step ${index + 1}: ${step.title}`}
                    aria-current={isCurrent ? 'step' : undefined}
                >
                    {index + 1}
                </button>
            </div>
        );
    };

    if (!loanSection || steps.length === 0) {
        return null; // Render nothing if loanSection or loanItems are not provided
    }

    const { mainText, lastFewWords } = getDescriptionParts(steps[currentStep].description);

    return (
        <section ref={ref} className="relative overflow-visible py-10" aria-labelledby="processTitle">
            <div className="relative z-10 container mx-auto px-4">
                <h2 id="processTitle" className="mb-10 text-center text-5xl font-bold text-gray-800 dark:text-white">
                    {loanSection.title}
                </h2>

                <AnimateOnView delay={0.2}>
                    <div className="flex flex-col items-center justify-center">
                        <div className="mx-auto hidden w-full max-w-4xl px-4 md:flex">
                            <div className="relative mb-4 flex w-full items-center justify-between">
                                <div className="absolute top-6 right-6 left-6 h-1 rounded-full bg-gray-200 dark:bg-gray-700">
                                    <motion.div
                                        className="h-1 rounded-full bg-[#5B3D5C]"
                                        initial={{ width: '0%' }}
                                        animate={{
                                            width: `${(currentStep / (steps.length - 1)) * 100}%`,
                                        }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    />
                                </div>

                                {steps.map((step, index) => (
                                    <StepIndicator key={step.id || index} step={step} index={index} />
                                ))}
                            </div>
                        </div>

                        <div className="mx-auto w-full max-w-5xl">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentStep}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-full"
                                >
                                    <div className="flex flex-col items-center gap-4">
                                        {/* Image Section */}
                                        <div className="w-full max-w-lg">
                                            <motion.div
                                                className="overflow-hidden rounded-lg p-2"
                                                initial={{ y: 15, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ duration: 0.5, delay: 0.1 }}
                                            >
                                                <div className="relative h-0 pb-[75%]">
                                                    <img
                                                        src={steps[currentStep].image}
                                                        alt={steps[currentStep].title}
                                                        className="absolute inset-0 h-full w-full rounded-lg object-contain"
                                                        loading="lazy"
                                                    />
                                                </div>
                                            </motion.div>
                                        </div>

                                        {/* Text and Buttons Section */}
                                        <div className="w-full text-center">
                                            <motion.div
                                                initial={{ y: 15, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ duration: 0.5, delay: 0.1 }}
                                            >
                                                <h2 className="mb-4 text-4xl font-medium text-gray-800 dark:text-white">
                                                    {steps[currentStep].title}
                                                </h2>
                                                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-200">
                                                    {mainText}
                                                    {/* Disabled because google translate doesnt work with it */}
                                                    {/* <TypeAnimation text={lastFewWords} /> */}
                                                    <span className="font-medium text-gray-700 dark:text-white">
                                                        {lastFewWords}
                                                        <span className="ml-0.5 inline-block h-5 w-0.5 animate-pulse bg-gray-700 dark:bg-white" />
                                                    </span>
                                                </p>

                                                <div className="mt-8 flex justify-center gap-4 md:hidden">
                                                    {/* Previous Button */}
                                                    <button
                                                        onClick={() => {
                                                            setCurrentStep(Math.max(currentStep - 1, 0));
                                                            setIsPaused(true);
                                                            setTimeout(() => setIsPaused(false), 1000);
                                                        }}
                                                        disabled={currentStep === 0}
                                                        className={`flex items-center gap-2 rounded-md px-4 py-2 transition ${
                                                            currentStep === 0
                                                                ? 'cursor-not-allowed bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600'
                                                                : 'text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
                                                        }`}
                                                        aria-label="Previous step"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-5 w-5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                        </svg>
                                                        Previous
                                                    </button>

                                                    {/* Next Button */}
                                                    <button
                                                        onClick={() => {
                                                            setCurrentStep(Math.min(currentStep + 1, steps.length - 1));
                                                            setIsPaused(true);
                                                            setTimeout(() => setIsPaused(false), 1000);
                                                        }}
                                                        disabled={currentStep === steps.length - 1}
                                                        className={`flex items-center gap-2 rounded-md px-4 py-2 transition ${
                                                            currentStep === steps.length - 1
                                                                ? 'cursor-not-allowed bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600'
                                                                : 'bg-[#5B3D5C] text-white hover:bg-[#5B3D5C] dark:bg-[#5B3D5C] dark:hover:bg-[#5B3D5C]'
                                                        }`}
                                                        aria-label="Next step"
                                                    >
                                                        Next
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-5 w-5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </AnimateOnView>
            </div>
        </section>
    );
};

export default ProcessSteps;
