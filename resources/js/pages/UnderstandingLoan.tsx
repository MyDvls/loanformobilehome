import AnimateOnView from '@/components/AnimateOnView';
import { Button } from '@/components/ui/button';
import LandingLayout from '@/layouts/landing-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, BarChart3, PiggyBank } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

const UnderstandingLoan = () => {
    const { t } = useTranslation();
    const [activeChartIndex, setActiveChartIndex] = useState(0);

    const handleAnimationEnd = (index: number) => {
        if (index < monthlyPaymentData.length - 1) {
            setTimeout(() => setActiveChartIndex(index + 1), 100);
        }
    };

    const monthlyPaymentData = [
        {
            name: '6 Months',
            data: [
                { name: 'Principal', value: 50 },
                { name: 'Interest', value: 50 },
            ],
            colors: ['#000000', '#9F7199'],
        },
        {
            name: '12 Months',
            data: [
                { name: 'Principal', value: 65 },
                { name: 'Interest', value: 35 },
            ],
            colors: ['#000000', '#9F7199'],
        },
        {
            name: '24 Months',
            data: [
                { name: 'Principal', value: 80 },
                { name: 'Interest', value: 20 },
            ],
            colors: ['#000000', '#9F7199'],
        },
    ];

    return (
        <LandingLayout>
            <Head title={t('understanding.title')} />
            <section className="relative overflow-visible py-12 sm:py-16 md:py-20">
                <div className="relative z-10 container mx-auto px-4 py-20 sm:px-6 md:px-8">
                    <AnimateOnView delay={0.2}>
                        <h1 className="mb-4 text-center text-3xl font-bold text-gray-800 sm:text-3xl md:text-4xl lg:text-5xl dark:text-white">
                            {t('understanding.title')}
                        </h1>
                        <p className="mx-auto mb-8 max-w-3xl text-center text-base text-gray-600 sm:mb-10 sm:text-lg md:mb-12 md:text-xl dark:text-gray-300">
                            {t('understanding.subtitle')}
                        </p>
                    </AnimateOnView>

                    {/* Section 1: How Your Monthly Payment Works with Visual Chart */}
                    <AnimateOnView delay={0.5}>
                        <div className="mt-8 w-full px-4 max-sm:px-2 sm:mt-10 sm:px-8 md:mt-12 md:px-16 lg:px-24 xl:px-32">
                            <div className="flex w-full min-w-0 flex-col justify-center rounded-2xl border border-solid border-[#F9F0E9] bg-[#FDFAF8] p-4 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.20),0px_4px_5px_0px_rgba(0,0,0,0.14),0px_1px_10px_0px_rgba(0,0,0,0.12)] sm:p-6 md:p-8 dark:border-[#4A4A4A] dark:bg-[#333333]">
                                <div className="flex w-full flex-wrap gap-4 sm:gap-6 md:gap-8">
                                    {/* Text content */}
                                    <div className="min-w-0 flex-1 shrink basis-[40%] text-black max-sm:basis-full dark:text-white">
                                        <div className="w-full">
                                            <h3 className="flex items-center text-lg font-medium sm:text-xl md:text-2xl">
                                                <BarChart3 className="mr-2 text-purple-500 sm:mr-3" size={20} sm:size={24} md:size={28} />
                                                {t('understanding.section1.title')}
                                            </h3>
                                            <p className="mt-4 text-sm leading-6 font-normal sm:mt-5 sm:text-base md:text-lg">
                                                {t('understanding.section1.description')}
                                            </p>
                                        </div>
                                        <div className="mt-6 w-full max-w-full text-sm leading-6 font-normal sm:mt-8 sm:text-base">
                                            <div className="flex w-full gap-3 sm:gap-4 md:gap-[18px]">
                                                <ArrowRight size={20} className="text-black dark:text-white" />
                                                <div>
                                                    <strong>Principal</strong>
                                                    <br />
                                                    {t('understanding.section1.principal')}
                                                </div>
                                            </div>
                                            <div className="mt-6 flex w-full gap-3 sm:mt-8 sm:gap-4 md:gap-[17px]">
                                                <ArrowRight size={20} className="text-black dark:text-white" />
                                                <div>
                                                    <strong>Interest</strong>
                                                    <br />
                                                    {t('understanding.section1.interest')}
                                                </div>
                                            </div>
                                            <div className="mt-6 flex w-full gap-3 sm:mt-8 sm:gap-4 md:gap-[17px]">
                                                <ArrowRight size={20} className="text-black dark:text-white" />
                                                <div>
                                                    <strong>Escrow</strong>
                                                    <br />
                                                    {t('understanding.section1.escrow')}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Chart visualization */}
                                    <div className="min-w-0 flex-1 shrink basis-[40%] max-sm:basis-full">
                                        <div className="flex w-full min-w-0 flex-col justify-center rounded-lg bg-[#F5EEE9] p-4 text-black sm:p-5 md:p-6 dark:bg-[#4A4A4A]">
                                            <h4 className="text-center text-lg font-medium sm:text-xl md:text-2xl">
                                                {t('understanding.section1.graph1.title')}
                                            </h4>
                                            <div className="mt-6 flex w-full flex-wrap items-center justify-center gap-4 text-sm font-normal whitespace-nowrap sm:mt-8 sm:gap-6 sm:text-base md:mt-[37px] md:gap-8 lg:gap-[40px]">
                                                <div className="my-auto flex items-center gap-2 self-stretch sm:gap-3">
                                                    <div className="my-auto flex h-3 w-3 shrink-0 self-stretch rounded bg-black sm:h-4 sm:w-4 md:h-[17px] md:w-[17px]" />
                                                    <span className="my-auto self-stretch dark:text-white">Principal</span>
                                                </div>
                                                <div className="my-auto flex items-center gap-2 self-stretch sm:gap-3">
                                                    <div className="my-auto flex h-3 w-3 shrink-0 self-stretch rounded bg-[#9F7199] sm:h-4 sm:w-4 md:h-[17px] md:w-[17px]" />
                                                    <span className="my-auto self-stretch dark:text-white">Interest</span>
                                                </div>
                                            </div>
                                            <div className="mt-4 flex w-full flex-wrap items-center justify-center gap-4 text-center text-sm font-normal max-sm:gap-2 sm:mt-6 sm:gap-6 sm:text-base md:mt-8 md:gap-8 lg:mt-10 lg:gap-[20px]">
                                                {monthlyPaymentData.map((entry, idx) => {
                                                    if (idx > activeChartIndex) return null;

                                                    return (
                                                        <div key={idx} className="flex flex-col items-center">
                                                            <ResponsiveContainer width="100%" height={100}>
                                                                <PieChart>
                                                                    <Pie
                                                                        data={entry.data}
                                                                        cx="50%"
                                                                        cy="50%"
                                                                        innerRadius={0}
                                                                        outerRadius={35}
                                                                        paddingAngle={0}
                                                                        dataKey="value"
                                                                        isAnimationActive={idx === activeChartIndex}
                                                                        onAnimationEnd={() => handleAnimationEnd(idx)}
                                                                    >
                                                                        {entry.data.map((item, index) => (
                                                                            <Cell
                                                                                key={`cell-${index}`}
                                                                                fill={entry.colors[index % entry.colors.length]}
                                                                            />
                                                                        ))}
                                                                    </Pie>
                                                                </PieChart>
                                                            </ResponsiveContainer>
                                                            <p className="mb-2 text-sm font-medium text-black sm:text-base dark:text-white">
                                                                {entry.name}
                                                            </p>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <div className="mt-4 flex w-full min-w-0 gap-2 rounded-lg border border-solid border-[#FFB840] bg-[rgba(255,160,0,0.10)] p-3 text-sm leading-6 font-normal text-[#C67C00] sm:mt-6 sm:p-4 sm:text-base md:mt-7">
                                            <img
                                                src="https://cdn.builder.io/api/v1/image/assets/8065c8e268d14015b7bf1ebd244b31e3/ae1ede54efacac98473befea74bc995933c1a720?placeholderIfAbsent=true"
                                                alt="Information icon"
                                                className="my-auto aspect-[1] w-8 shrink-0 rounded-[50%] object-contain sm:w-10 md:w-12"
                                            />
                                            <p className="flex-1 text-[#C67C00]">{t('understanding.section1.tip')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AnimateOnView>

                    {/* Section 2: Making Additional Payments */}
                    <AnimateOnView delay={1.0}>
                        <div className="mt-12 flex w-full flex-col items-stretch max-sm:mt-8 sm:mt-16 md:mt-20">
                            <div className="w-full px-4 max-sm:px-2 sm:px-8 md:px-16 lg:px-24 xl:px-32">
                                <div className="flex w-full min-w-0 flex-col justify-center rounded-2xl border border-solid border-[#F9F0E9] bg-[#FDFAF8] p-4 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.20),0px_4px_5px_0px_rgba(0,0,0,0.14),0px_1px_10px_0px_rgba(0,0,0,0.12)] sm:p-6 md:p-8 dark:border-[#4A4A4A] dark:bg-[#333333]">
                                    <div className="flex w-full flex-wrap gap-4 sm:gap-6 md:gap-8 lg:gap-12">
                                        {/* Text content */}
                                        <div className="min-w-0 flex-1 shrink basis-[40%] text-black max-sm:basis-full">
                                            <div className="mb-4 flex items-center sm:mb-6">
                                                <PiggyBank className="mr-2 text-green-500 sm:mr-3" size={20} sm:size={24} md:size={28} />
                                                <h3 className="text-lg font-medium sm:text-xl md:text-2xl dark:text-white">
                                                    {t('understanding.section2.title')}
                                                </h3>
                                            </div>
                                            <div className="mt-4 w-full text-sm leading-6 font-normal sm:mt-6 sm:text-base">
                                                <div className="flex w-full flex-wrap gap-2 sm:gap-3">
                                                    <div className="flex-1 dark:text-white">
                                                        <strong>Make Extra Payments</strong>
                                                        <br />
                                                        {t('understanding.section2.additional')}
                                                    </div>
                                                </div>
                                                <div className="mt-6 flex w-full gap-2 sm:mt-8 sm:gap-[15px]">
                                                    <ArrowRight size={20} className="text-black dark:text-white" />
                                                    <div className="flex-1 dark:text-white">
                                                        <strong>Save on Interest</strong>
                                                        <br />
                                                        {t('understanding.section2.interestSave')}
                                                    </div>
                                                </div>
                                                <div className="mt-6 flex w-full gap-2 sm:mt-8 sm:gap-[18px]">
                                                    <ArrowRight size={20} className="text-black dark:text-white" />
                                                    <div className="flex-1 dark:text-white">
                                                        <strong>Shorten Your Loan Term</strong>
                                                        <br />
                                                        {t('understanding.section2.termShorten')}
                                                    </div>
                                                </div>
                                                <div className="mt-6 flex w-full gap-2 sm:mt-8 sm:gap-[21px]">
                                                    <ArrowRight size={20} className="text-black dark:text-white" />
                                                    <div className="flex-1 dark:text-white">
                                                        <strong>Accelerate Equity Growth</strong>
                                                        <br />
                                                        {t('understanding.section2.result')}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Visualization section */}
                                        <div className="min-w-0 flex-1 shrink basis-[40%] text-sm leading-6 font-normal text-[#173C19] max-sm:basis-full sm:text-base">
                                            <img
                                                src="/images/payoff_loans_faster.png"
                                                alt="Example of making additional payments"
                                                className="aspect-[1.09] w-full max-w-full rounded-lg object-contain"
                                            />
                                            <div className="mt-3 flex w-full min-w-0 flex-col justify-center rounded-lg border border-solid border-[#4CB851] bg-[rgba(56,142,60,0.10)] p-3 sm:mt-4 sm:p-4 md:mt-[13px]">
                                                <div className="flex w-full flex-wrap items-stretch gap-2 sm:gap-[15px]">
                                                    <img
                                                        src="https://cdn.builder.io/api/v1/image/assets/8065c8e268d14015b7bf1ebd244b31e3/80db70d0a63d56d5c418f3105216023ddaaac175?placeholderIfAbsent=true"
                                                        alt="Success icon"
                                                        className="my-auto aspect-[1] w-8 shrink-0 rounded-[50%] object-contain sm:w-10 md:w-12"
                                                    />
                                                    <p className="flex-1 text-[#173C19] dark:text-[#388E3C]">
                                                        {t('understanding.section1.graph2.tip')}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AnimateOnView>

                    <div className="flex w-full min-w-0 items-center justify-center py-8 sm:py-10 md:py-12">
                        <Link href="/apply">
                            <Button variant="primary" className="w-full max-w-xs sm:max-w-48">
                                {t('home.apply')}
                                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </LandingLayout>
    );
};

export default UnderstandingLoan;
