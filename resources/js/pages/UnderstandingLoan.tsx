import AnimateOnView from '@/components/AnimateOnView';
import { Card, CardContent } from '@/components/ui/card';
import LandingLayout from '@/layouts/landing-layout';
import { Head } from '@inertiajs/react';
import { ArrowRight, BarChart3, Clock, CoinsIcon, HelpCircle, Lightbulb, PiggyBank } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

const UnderstandingLoan = () => {
    const { t } = useTranslation();
    const [activeChartIndex, setActiveChartIndex] = useState(0);

    const handleAnimationEnd = (index: number) => {
        if (index < monthlyPaymentData.length - 1) {
            setTimeout(() => setActiveChartIndex(index + 1), 100); // Optional small delay between animations
        }
    };

    // Data for principal and interest chart representation
    const monthlyPaymentData = [
        {
            name: '6 Months',
            data: [
                { name: 'Principal', value: 50 },
                { name: 'Interest', value: 50 },
            ],
            colors: ['#394867', '#B5D858'],
        },
        {
            name: '12 Months',
            data: [
                { name: 'Principal', value: 65 },
                { name: 'Interest', value: 35 },
            ],
            colors: ['#394867', '#B5D858'],
        },
        {
            name: '24 Months',
            data: [
                { name: 'Principal', value: 80 },
                { name: 'Interest', value: 20 },
            ],
            colors: ['#394867', '#B5D858'],
        },
    ];

    return (
        <LandingLayout>
            <Head title={t('understanding.title')} />
            <section className="relative overflow-visible bg-gradient-to-b from-gray-50 to-gray-200 py-20 dark:from-gray-800 dark:to-gray-700">
                <div className="relative z-10 container mx-auto px-4">
                    <AnimateOnView delay={0.2}>
                        <h2 className="mb-4 text-center text-4xl font-bold text-gray-800 dark:text-white">{t('understanding.title')}</h2>
                        <p className="mx-auto mb-12 max-w-3xl text-center text-xl text-gray-600 dark:text-gray-300">{t('understanding.subtitle')}</p>
                    </AnimateOnView>

                    {/* Section 1: How Your Monthly Payment Works with Visual Chart */}
                    <AnimateOnView delay={0.5}>
                        <Card className="mb-12 overflow-hidden">
                            <CardContent className="p-0">
                                <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
                                    {/* Text content */}
                                    <div className="p-8">
                                        <div className="mb-6 flex items-center">
                                            <BarChart3 className="mr-3 text-purple-500" size={28} />
                                            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                                                {t('understanding.section1.title')}
                                            </h3>
                                        </div>

                                        <p className="mb-6 text-gray-600 dark:text-gray-300">{t('understanding.section1.description')}</p>

                                        <div className="space-y-4">
                                            <div className="flex items-start">
                                                <div className="mt-1">
                                                    <ArrowRight className="mr-2 text-purple-500" size={20} />
                                                </div>
                                                <div>
                                                    <span className="block font-medium text-gray-800 dark:text-gray-200">Principal</span>
                                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                                        {t('understanding.section1.principal')}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-start">
                                                <div className="mt-1">
                                                    <ArrowRight className="mr-2 text-purple-500" size={20} />
                                                </div>
                                                <div>
                                                    <span className="block font-medium text-gray-800 dark:text-gray-200">Interest</span>
                                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                                        {t('understanding.section1.interest')}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-start">
                                                <div className="mt-1">
                                                    <ArrowRight className="mr-2 text-purple-500" size={20} />
                                                </div>
                                                <div>
                                                    <span className="block font-medium text-gray-800 dark:text-gray-200">Escrow</span>
                                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                                        {t('understanding.section1.escrow')}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex items-center rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
                                            <Lightbulb className="mr-3 flex-shrink-0 text-yellow-500" size={24} />
                                            <span className="text-gray-700 italic dark:text-gray-300">{t('understanding.section1.tip')}</span>
                                        </div>
                                    </div>

                                    {/* Chart visualization */}
                                    <div className="flex flex-col items-center justify-center bg-gray-50 p-6 dark:bg-gray-800/50">
                                        <h4 className="mb-4 text-center text-xl font-semibold text-gray-800 dark:text-white">
                                            {t('understanding.section1.graph1.title')}
                                        </h4>

                                        <div className="w-full">
                                            <div className="mb-4 flex flex-row items-end justify-center gap-4">
                                                {monthlyPaymentData.map((entry, idx) => {
                                                    if (idx > activeChartIndex) return null; // hide charts not yet activated

                                                    return (
                                                        <div key={idx} className="flex flex-col items-center">
                                                            <p className="mb-2 font-medium text-purple-500">{entry.name}</p>
                                                            <ResponsiveContainer width={100} height={300}>
                                                                <PieChart>
                                                                    <Pie
                                                                        data={entry.data}
                                                                        cx="50%"
                                                                        cy="50%"
                                                                        innerRadius={0}
                                                                        outerRadius={50}
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
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            <div className="mt-4 flex justify-center">
                                                <div className="mr-6 flex items-center">
                                                    <div className="mr-2 h-4 w-4 rounded-sm bg-[#394867]" />
                                                    <span className="text-sm text-gray-600 dark:text-gray-300">Principal</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="mr-2 h-4 w-4 rounded-sm bg-[#B5D858]" />
                                                    <span className="text-sm text-gray-600 dark:text-gray-300">Interest</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </AnimateOnView>

                    {/* Section 2: Making Additional Payments - Enhanced with visuals */}
                    <AnimateOnView delay={1.0}>
                        <Card>
                            <CardContent className="p-8">
                                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                    <div>
                                        <div className="mb-6 flex items-center">
                                            <PiggyBank className="mr-3 text-green-500" size={28} />
                                            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                                                {t('understanding.section2.title')}
                                            </h3>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-start">
                                                <div className="mt-1 flex-shrink-0">
                                                    <CoinsIcon className="mr-2 text-green-500" size={20} />
                                                </div>
                                                <div>
                                                    <span className="block font-medium text-gray-800 dark:text-gray-200">Make Extra Payments</span>
                                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                                        {t('understanding.section2.additional')}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-start">
                                                <div className="mt-1 flex-shrink-0">
                                                    <CoinsIcon className="mr-2 text-green-500" size={20} />
                                                </div>
                                                <div>
                                                    <span className="block font-medium text-gray-800 dark:text-gray-200">Save on Interest</span>
                                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                                        {t('understanding.section2.interestSave')}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-start">
                                                <div className="mt-1 flex-shrink-0">
                                                    <Clock className="mr-2 text-green-500" size={20} />
                                                </div>
                                                <div>
                                                    <span className="block font-medium text-gray-800 dark:text-gray-200">Shorten Your Loan Term</span>
                                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                                        {t('understanding.section2.termShorten')}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-start">
                                                <div className="mt-1 flex-shrink-0">
                                                    <CoinsIcon className="mr-2 text-green-500" size={20} />
                                                </div>
                                                <div>
                                                    <span className="block font-medium text-gray-800 dark:text-gray-200">
                                                        Accelerate Equity Growth
                                                    </span>
                                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                                        {t('understanding.section2.result')}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Visual illustration for the additional payments section */}
                                    <div className="flex flex-col justify-center rounded-lg bg-gray-50 p-6 dark:bg-gray-800/50">
                                        <div className="relative">
                                            <img
                                                src="/images/payoff_loans_faster.png"
                                                alt="Example of making additional payments"
                                                className="w-full rounded-lg shadow-md"
                                            />
                                        </div>
                                        <div className="absolute right-5 bottom-1 text-xs text-gray-500">* Example for illustrative purposes</div>

                                        <div className="mt-6 flex items-start rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                                            <HelpCircle className="mt-1 mr-3 flex-shrink-0 text-green-500" size={20} />
                                            <p className="text-sm text-gray-700 dark:text-gray-300">{t('understanding.section1.graph2.tip')}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </AnimateOnView>
                </div>
            </section>
        </LandingLayout>
    );
};

export default UnderstandingLoan;
