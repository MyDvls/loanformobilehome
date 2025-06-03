import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AnimateOnView from './AnimateOnView';

const steps = [
    {
        number: 'ONE',
        title: 'process.step1.title',
        description: 'process.step1.description',
        image: 'images/basket-ball-mobile-home-background-comprimida.jpeg',
    },
    {
        number: 'TWO',
        title: 'process.step2.title',
        description: 'process.step2.description',
        image: 'images/Mobile-home-autumn-comprimida.jpeg',
    },
    {
        number: 'THREE',
        title: 'process.step3.title',
        description: 'process.step3.description',
        image: 'images/Mobile-home-beautiful-background-comprimida.jpeg',
    },
    {
        number: 'FOUR',
        title: 'process.step4.title',
        description: 'process.step4.description',
        image: 'images/basket-ball-mobile-home-background-comprimida.jpeg',
    },
    {
        number: 'FIVE',
        title: 'process.step5.title',
        description: 'process.step5.description',
        image: 'images/Mobile-home-beautiful-background-comprimida.jpeg',
    },
];

const ProcessSteps = () => {
    const { t } = useTranslation();
    const [currentStep, setCurrentStep] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const ref = useRef(null);
    const stepRefs = useRef([]);
    const timerRef = useRef(null);

    // Auto-advance timer effect
    useEffect(() => {
        if (isVisible && !isPaused) {
            // Clear existing timer when component is visible
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }

            // Set new timer for 8 seconds
            timerRef.current = setTimeout(() => {
                // Advance to the next step, or loop back to the first
                setCurrentStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
            }, 8000);
        }

        // Clean up timer on component unmount or when visibility changes
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [currentStep, isVisible, isPaused]);

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

    const getDescriptionParts = (descriptionKey: string) => {
        const description = t(descriptionKey);
        const words = description.split(' ');
        const lastFewWords = words.slice(-8).join(' ');
        const mainText = words.slice(0, -8).join(' ');
        return { mainText, lastFewWords };
    };

    const { mainText, lastFewWords } = getDescriptionParts(steps[currentStep].description);

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

    const StepIndicator = ({ step, index }) => {
        const isActive = currentStep >= index;
        const isCurrent = currentStep === index;

        return (
            <div className="relative flex flex-col items-center" ref={(el) => (stepRefs.current[index] = el)}>
                <button
                    onClick={() => {
                        setCurrentStep(index);
                        setIsPaused(true);
                        setTimeout(() => setIsPaused(false), 1000);
                    }}
                    className={`flex h-12 w-12 items-center justify-center rounded-full text-lg transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none ${
                        isCurrent
                            ? 'bg-blue-500 text-white ring-4 ring-blue-200 dark:ring-blue-900'
                            : isActive
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                    }`}
                    aria-label={`${t('process.goToStep')} ${index + 1}: ${t(step.title)}`}
                    aria-current={isCurrent ? 'step' : undefined}
                >
                    {index + 1}
                </button>

                <span
                    className={`mt-3 text-sm font-medium whitespace-nowrap transition-colors duration-300 ${
                        isCurrent
                            ? 'text-blue-600 dark:text-blue-400'
                            : isActive
                              ? 'text-gray-800 dark:text-gray-200'
                              : 'text-gray-500 dark:text-gray-400'
                    }`}
                >
                    {t(step.title)}
                </span>
            </div>
        );
    };

    return (
        <section
            ref={ref}
            className="relative overflow-visible bg-gradient-to-b from-gray-50 to-gray-200 py-20 dark:from-gray-800 dark:to-gray-700"
            aria-labelledby="processTitle"
        >
            <div className="relative z-10 container mx-auto px-4">
                <h2 id="processTitle" className="mb-10 text-center text-4xl font-bold text-gray-800 dark:text-white">
                    {t('process.title')}
                </h2>

                <AnimateOnView delay={0.2}>
                    <div className="flex flex-col items-center justify-center gap-12">
                        <div className="mx-auto hidden w-full max-w-4xl px-4 md:flex">
                            <div className="relative mb-12 flex w-full items-center justify-between">
                                <div className="absolute top-6 right-6 left-6 h-1 rounded-full bg-gray-200 dark:bg-gray-700">
                                    <motion.div
                                        className="h-1 rounded-full bg-blue-500"
                                        initial={{ width: '0%' }}
                                        animate={{
                                            width: `${(currentStep / (steps.length - 1)) * 100}%`,
                                        }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    />
                                </div>

                                {steps.map((step, index) => (
                                    <StepIndicator key={index} step={step} index={index} />
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
                                    <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
                                        <div className="order-2 w-full md:order-1 md:w-1/2">
                                            <motion.div
                                                className="overflow-hidden rounded-lg bg-white p-2 shadow-lg dark:bg-gray-800 dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
                                                initial={{ y: 15, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ duration: 0.5, delay: 0.1 }}
                                            >
                                                <div className="relative pt-[75%]">
                                                    <img
                                                        src={steps[currentStep].image}
                                                        alt={t(steps[currentStep].title)}
                                                        className="absolute inset-0 h-full w-full rounded-lg object-cover"
                                                        loading="lazy"
                                                    />
                                                </div>
                                            </motion.div>
                                        </div>

                                        <div className="order-1 flex w-full flex-col justify-center md:order-2 md:w-1/2">
                                            <motion.div
                                                initial={{ y: 15, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ duration: 0.5, delay: 0.1 }}
                                            >
                                                <h2 className="mb-4 text-2xl font-medium text-gray-800 dark:text-white">
                                                    {t(steps[currentStep].title)}
                                                </h2>
                                                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-200">
                                                    {mainText} <TypeAnimation text={lastFewWords} />
                                                </p>

                                                <div className="mt-8 flex justify-between md:hidden">
                                                    {/* Previous Button */}
                                                    <button
                                                        onClick={() => {
                                                            setCurrentStep(Math.max(currentStep - 1, 0));
                                                            // Pause auto-advance temporarily when manually clicking
                                                            setIsPaused(true);
                                                            setTimeout(() => setIsPaused(false), 1000);
                                                        }}
                                                        disabled={currentStep === 0}
                                                        className={`flex items-center gap-2 rounded-md px-4 py-2 transition ${
                                                            currentStep === 0
                                                                ? 'cursor-not-allowed bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600'
                                                                : 'text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
                                                        }`}
                                                        aria-label={t('process.previousStep')}
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
                                                        {t('process.previousStep')}
                                                    </button>

                                                    {/* Next Button */}
                                                    <button
                                                        onClick={() => {
                                                            setCurrentStep(Math.min(currentStep + 1, steps.length - 1));
                                                            // Pause auto-advance temporarily when manually clicking
                                                            setIsPaused(true);
                                                            setTimeout(() => setIsPaused(false), 1000);
                                                        }}
                                                        disabled={currentStep === steps.length - 1}
                                                        className={`flex items-center gap-2 rounded-md px-4 py-2 transition ${
                                                            currentStep === steps.length - 1
                                                                ? 'cursor-not-allowed bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600'
                                                                : 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
                                                        }`}
                                                        aria-label={t('process.nextStep')}
                                                    >
                                                        {t('process.nextStep')}
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

            <div className="absolute bottom-[-50px] left-0 z-0 h-[120px] w-full origin-top skew-y-[-2.5deg] transform bg-gray-200 dark:bg-gray-700" />
            <div className="absolute bottom-[-50px] left-0 z-0 h-[120px] w-full origin-top skew-y-[2.5deg] transform bg-gray-200 dark:bg-gray-700" />
        </section>
    );
};

export default ProcessSteps;
