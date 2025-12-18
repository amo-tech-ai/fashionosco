
import React from 'react';

interface WizardLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  currentStep: number | string;
  totalSteps: number;
  title: string;
}

export const WizardLayout: React.FC<WizardLayoutProps> = ({ 
  children, 
  sidebar, 
  currentStep, 
  totalSteps, 
  title 
}) => {
  return (
    <div className="min-h-screen bg-[#FCFBFA] pt-32 pb-20">
      <main className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12">
        {/* Main Content Area */}
        <div className="lg:col-span-8 lg:col-start-2 xl:col-span-7 xl:col-start-2">
           <div className="mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400">
              <span>Step {currentStep} of {totalSteps}</span>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900 font-black">{title}</span>
           </div>
           
           <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
           </div>
        </div>

        {/* Responsive Sidebar */}
        <div className="hidden lg:block lg:col-span-3 xl:col-span-3 xl:col-start-10">
           {sidebar}
        </div>

        {/* Mobile Sidebar - Moved to bottom if provided */}
        {sidebar && (
          <div className="lg:hidden mt-12 border-t border-gray-100 pt-12">
            {sidebar}
          </div>
        )}
      </main>
    </div>
  );
};
