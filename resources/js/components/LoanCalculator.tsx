import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LoanCalculator = () => {
    const { t } = useTranslation();
    console.log(t('loanCalculator.loanAmount'));
    const [loanAmount, setLoanAmount] = useState('60000');
    const [downPayment, setDownPayment] = useState('14000');
    const [termPeriod, setTermPeriod] = useState('180');
    const [interestRate, setInterestRate] = useState('12');
    const [monthlyPayment, setMonthlyPayment] = useState('552');

    const calculateLoan = (event) => {
        event.preventDefault();

        const principal = parseFloat(loanAmount) - parseFloat(downPayment);
        const monthlyRate = parseFloat(interestRate) / 100 / 12;
        const numberOfPayments = parseInt(termPeriod);

        let monthly;

        if (monthlyRate === 0) {
            // No interest
            monthly = principal / numberOfPayments;
        } else {
            monthly = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        }

        setMonthlyPayment(monthly.toFixed(2));
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <div className="flex w-full flex-wrap gap-8 lg:gap-12">
            {/* Left Side - Input Fields */}
            <div className="min-w-0 flex-1 shrink basis-[45%] max-sm:basis-full">
                <form className="space-y-6" onSubmit={calculateLoan}>
                    {/* Loan Amount */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            {t('loanCalculator.loanAmount')} <span className="text-red-500">*</span>
                        </label>
                        <div className="flex">
                            <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 dark:border-gray-600 dark:bg-[#4A4A4A] dark:text-gray-300">
                                $
                            </span>
                            <input
                                type="number"
                                value={loanAmount}
                                onChange={(e) => setLoanAmount(e.target.value)}
                                className="block w-full rounded-none rounded-r-md border border-gray-300 bg-white px-3 py-3 text-gray-900 focus:border-purple-500 focus:ring-purple-500 focus:outline-none dark:border-gray-600 dark:bg-[#4A4A4A] dark:text-white"
                                placeholder="120000"
                                required
                            />
                        </div>
                    </div>

                    {/* Down Payment */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('loanCalculator.downPayment')} <span className="text-red-500">*</span>
                        </label>
                        <div className="flex">
                            <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 dark:border-gray-600 dark:bg-[#4A4A4A] dark:text-gray-300">
                                $
                            </span>
                            <input
                                type="number"
                                value={downPayment}
                                onChange={(e) => setDownPayment(e.target.value)}
                                className="block w-full rounded-none rounded-r-md border border-gray-300 bg-white px-3 py-3 text-gray-900 focus:border-purple-500 focus:ring-purple-500 focus:outline-none dark:border-gray-600 dark:bg-[#4A4A4A] dark:text-white"
                                placeholder="10000"
                                required
                            />
                        </div>
                    </div>

                    {/* Term Period */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('loanCalculator.termPeriod')} <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            value={termPeriod}
                            onChange={(e) => setTermPeriod(e.target.value)}
                            className="block w-full rounded-md border border-gray-300 bg-white px-3 py-3 text-gray-900 focus:border-purple-500 focus:ring-purple-500 focus:outline-none dark:border-gray-600 dark:bg-[#4A4A4A] dark:text-white"
                            placeholder="12"
                            required
                        />
                    </div>

                    {/* Interest Rate */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('loanCalculator.interestRate')} <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={interestRate}
                            onChange={(e) => setInterestRate(e.target.value)}
                            className="block w-full rounded-md border border-gray-300 bg-white px-3 py-3 text-gray-900 focus:border-purple-500 focus:ring-purple-500 focus:outline-none dark:border-gray-600 dark:bg-[#4A4A4A] dark:text-white"
                            placeholder="5"
                        />
                    </div>

                    {/* Calculate Button */}
                    <button type="submit" className="cursor-pointer rounded-md bg-[#49274A] px-6 py-3 text-white shadow-sm">
                        {t('loanCalculator.calculate')}
                    </button>
                </form>
            </div>

            {/* Right Side - Loan Details */}
            <div className="min-w-0 flex-1 shrink basis-[45%] max-sm:basis-full">
                <div className="flex h-full flex-col rounded-lg bg-gray-200 p-6 dark:bg-[#4A4A4A]">
                    <h4 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white">{t('loanCalculator.title')}</h4>

                    <div className="flex h-full flex-col justify-between">
                        {/* Top content */}
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">{t('loanCalculator.loanAmount')}</span>
                                <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(loanAmount)}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">{t('loanCalculator.downPayment')}</span>
                                <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(downPayment)}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">{t('loanCalculator.termPeriod')}</span>
                                <span className="font-medium text-gray-900 dark:text-white">{termPeriod} months</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">{t('loanCalculator.interestRate')}</span>
                                <span className="font-medium text-gray-900 dark:text-white">{interestRate}%</span>
                            </div>
                        </div>

                        {/* Bottom Monthly Payment */}
                        <div className="mt-6 border-t border-gray-300 pt-6 dark:border-gray-600">
                            <div className="flex justify-between">
                                <span className="text-start text-lg font-semibold text-gray-800 dark:text-white">
                                    {t('loanCalculator.monthlyPayment')}:
                                </span>
                                <span className="text-2xl font-bold dark:text-white">{formatCurrency(monthlyPayment)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoanCalculator;
