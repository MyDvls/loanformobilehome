import ProcessSteps from '@/components/ProcessSteps';
import Requirements from '@/components/Requirements';
import { Button } from '@/components/ui/button';
import LoanGuideTabs from '@/components/ui/LoanGuideTabs';
import LandingLayout from '@/layouts/landing-layout';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import UnderstandingLoan from './UnderstandingLoan';

interface LoanGuideProps {
    understandingLoanSection: any;
    locale: string;
    requirementSection: any;
    requirementsData: any[];

    loanSection: any[];

    loanItems: any[];
}

const LoanGuide = ({ understandingLoanSection, locale, requirementSection, requirementsData, loanSection, loanItems }: LoanGuideProps) => {
    const { t } = useTranslation();
    return (
        <div className="container mx-auto px-4 py-12 pt-20">
            <h1 className="my-8 text-center text-3xl font-bold">{t('loanGuide.title', 'Loan Guide')}</h1>
            <LoanGuideTabs tabLabels={[t('loanGuide.howToGet', 'How to Get Your Loan'), t('loanGuide.understanding', 'Understanding Your Loan')]}>
                {/* Tab 1: How to Get Your Loan */}
                <LandingLayout>
                    <Head title="How Yo Get Your Loan" />
                    <div className="-mt-15 scale-95 space-y-12">
                        {/* If you have ProcessSteps data, pass it here. For now, Requirements only. */}
                        <ProcessSteps loanSection={loanSection} loanItems={loanItems} />
                        <Requirements requirementsSection={requirementSection} requirementItems={requirementsData} />
                        <div className="my-8 flex justify-center">
                            <Link href="/apply">
                                <Button variant="primary" className="px-8 py-3 text-lg font-semibold">
                                    {t('loanGuide.getStarted', 'Get Started With An Application')}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </LandingLayout>
                {/* Tab 2: Understanding Your Loan */}
                <UnderstandingLoan understandingLoanSection={understandingLoanSection} locale={locale} />
            </LoanGuideTabs>
        </div>
    );
};

export default LoanGuide;
