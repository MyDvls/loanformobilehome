import React, { useState } from 'react';

interface LoanGuideTabsProps {
  tabLabels: string[];
  children: React.ReactNode[];
  className?: string;
}

const LoanGuideTabs: React.FC<LoanGuideTabsProps> = ({ tabLabels, children, className = '' }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-center border-b border-gray-200 dark:border-gray-700">
        {tabLabels.map((label, idx) => (
          <button
            key={label}
            className={`px-6 py-2 text-lg font-medium transition-colors duration-200 focus:outline-none
              ${activeTab === idx
                ? 'border-b-2 border-[#5B3D5C] text-[#5B3D5C] dark:text-white dark:border-white bg-white dark:bg-[#333333]'
                : 'text-gray-500 hover:text-[#5B3D5C] dark:text-gray-400 dark:hover:text-white'}`}
            onClick={() => setActiveTab(idx)}
            aria-selected={activeTab === idx}
            aria-controls={`loan-guide-tabpanel-${idx}`}
            role="tab"
            tabIndex={activeTab === idx ? 0 : -1}
          >
            {label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`loan-guide-tabpanel-${activeTab}`} className="w-full">
        {children[activeTab]}
      </div>
    </div>
  );
};

export default LoanGuideTabs; 