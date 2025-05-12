import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimateOnView from "./AnimateOnView";
import { useTranslation } from "react-i18next";

const steps = [
  {
    number: "ONE",
    title: "process.step1.title",
    description: "process.step1.description",
    image: "images/basket-ball-mobile-home-background-comprimida.jpeg",
  },
  {
    number: "TWO",
    title: "process.step2.title",
    description: "process.step2.description",
    image: "images/Mobile-home-autumn-comprimida.jpeg",
  },
  {
    number: "THREE",
    title: "process.step3.title",
    description: "process.step3.description",
    image: "images/Mobile-home-beautiful-background-comprimida.jpeg",
  },
  {
    number: "FOUR",
    title: "process.step4.title",
    description: "process.step4.description",
    image: "images/basket-ball-mobile-home-background-comprimida.jpeg",
  },
  {
    number: "FIVE",
    title: "process.step5.title",
    description: "process.step5.description",
    image: "images/Mobile-home-beautiful-background-comprimida.jpeg",
  },
];

const ProcessSteps = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const stepRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
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
    const words = description.split(" ");
    const lastFewWords = words.slice(-8).join(" ");
    const mainText = words.slice(0, -8).join(" ");
    return { mainText, lastFewWords };
  };

  const { mainText, lastFewWords } = getDescriptionParts(
    steps[currentStep].description
  );

  const TypeAnimation = ({ text }: { text: string }) => {
    const [displayedText, setDisplayedText] = useState("");
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
      setDisplayedText("");
      setCurrentIndex(0);
    }, [text]);

    return (
      <span className="text-gray-700 dark:text-white font-medium">
        {displayedText}
        <span className="inline-block w-0.5 h-5 bg-gray-700 dark:bg-white ml-0.5 animate-pulse" />
      </span>
    );
  };

  const StepIndicator = ({ step, index }) => {
    const isActive = currentStep >= index;
    const isCurrent = currentStep === index;

    return (
      <div
        className="flex flex-col items-center relative"
        ref={(el) => (stepRefs.current[index] = el)}
      >
        <button
          onClick={() => {
            setCurrentStep(index);
          }}
          className={`w-12 h-12 rounded-full flex items-center justify-center text-lg
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
            transition-all duration-300 ease-in-out
            ${
              isCurrent
                ? "bg-blue-500 text-white ring-4 ring-blue-200 dark:ring-blue-900"
                : isActive
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
            }`}
          aria-label={`${t("process.goToStep")} ${index + 1}: ${t(step.title)}`}
          aria-current={isCurrent ? "step" : undefined}
        >
          {index + 1}
        </button>

        <span
          className={`mt-3 text-sm font-medium whitespace-nowrap transition-colors duration-300
          ${
            isCurrent
              ? "text-blue-600 dark:text-blue-400"
              : isActive
              ? "text-gray-800 dark:text-gray-200"
              : "text-gray-500 dark:text-gray-400"
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
      className="py-20 bg-gradient-to-b from-gray-50 to-gray-200 dark:from-gray-800 dark:to-gray-700 relative overflow-visible"
      aria-labelledby="processTitle"
    >
      <div className="container mx-auto px-4 relative z-10">
        <h2
          id="processTitle"
          className="text-4xl font-bold text-center mb-10 text-gray-800 dark:text-white"
        >
          {t("process.title")}
        </h2>

        <AnimateOnView delay={0.2}>
          <div className="flex flex-col items-center justify-center gap-12">
            <div className="hidden md:flex w-full max-w-4xl mx-auto px-4">
              <div className="relative flex justify-between items-center mb-12 w-full">
                <div className="absolute top-6 left-6 right-6 h-1 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <motion.div
                    className="h-1 bg-blue-500 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{
                      width: `${(currentStep / (steps.length - 1)) * 100}%`,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                </div>

                {steps.map((step, index) => (
                  <StepIndicator key={index} step={step} index={index} />
                ))}
              </div>
            </div>

            <div className="w-full max-w-5xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="w-full"
                >
                  <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                    <div className="w-full md:w-1/2 order-2 md:order-1">
                      <motion.div
                        className="rounded-lg overflow-hidden bg-white p-2 shadow-lg dark:bg-gray-800 dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
                        initial={{ y: 15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        <div className="relative pt-[75%]">
                          <img
                            src={steps[currentStep].image}
                            alt={t(steps[currentStep].title)}
                            className="absolute inset-0 w-full h-full object-cover rounded-lg"
                            loading="lazy"
                          />
                        </div>
                      </motion.div>
                    </div>

                    <div className="w-full md:w-1/2 flex flex-col justify-center order-1 md:order-2">
                      <motion.div
                        initial={{ y: 15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        <h2 className="text-2xl font-medium text-gray-800 dark:text-white mb-4">
                          {t(steps[currentStep].title)}
                        </h2>
                        <p className="text-gray-700 dark:text-gray-200 text-lg leading-relaxed">
                          {mainText} <TypeAnimation text={lastFewWords} />
                        </p>

                        <div className="md:hidden flex justify-between mt-8">
                          {/* Previous Button */}
                          <button
                            onClick={() =>
                              setCurrentStep(Math.max(currentStep - 1, 0))
                            }
                            disabled={currentStep === 0}
                            className={`px-4 py-2 rounded-md flex items-center gap-2 transition
                  ${
                    currentStep === 0
                      ? "text-gray-400 cursor-not-allowed bg-gray-100 dark:bg-gray-800 dark:text-gray-600"
                      : "text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  }`}
                            aria-label={t("process.previousStep")}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                              />
                            </svg>
                            {t("process.previousStep")}
                          </button>

                          {/* Next Button */}
                          <button
                            onClick={() =>
                              setCurrentStep(
                                Math.min(currentStep + 1, steps.length - 1)
                              )
                            }
                            disabled={currentStep === steps.length - 1}
                            className={`px-4 py-2 rounded-md flex items-center gap-2 transition
                  ${
                    currentStep === steps.length - 1
                      ? "text-gray-400 cursor-not-allowed bg-gray-100 dark:bg-gray-800 dark:text-gray-600"
                      : "text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                  }`}
                            aria-label={t("process.nextStep")}
                          >
                            {t("process.nextStep")}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
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

      <div className="absolute bottom-[-50px] left-0 w-full h-[100px] bg-gray-200 dark:bg-gray-700 transform skew-y-[-3deg] origin-top z-0" />
    </section>
  );
};

export default ProcessSteps;
