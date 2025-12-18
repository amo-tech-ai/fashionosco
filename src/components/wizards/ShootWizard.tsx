
import React from 'react';
import { useShootWizard } from '../../contexts/ShootWizardContext';
import { ShootTypeStep } from './steps/ShootTypeStep';
import { ShootDetailsStep } from './steps/ShootDetailsStep';
import { CreativeDirectionStep } from './steps/CreativeDirectionStep';
import { TalentStylingStep } from './steps/TalentStylingStep';
import { DeliverablesStep } from './steps/DeliverablesStep';
import { AddOnsStep } from './steps/AddOnsStep';
import { ReviewConfirmStep } from './steps/ReviewConfirmStep';
import { SidebarSummary } from './SidebarSummary';
import { ProgressBar } from './ProgressBar';
import { OnboardingOverlay } from './OnboardingOverlay';

export const ShootWizard: React.FC = () => {
  const { state } = useShootWizard();

  const renderStep = () => {
    switch (state.step) {
      case 1: return <ShootTypeStep />;
      case 2: return <ShootDetailsStep />;
      case 3: return <CreativeDirectionStep />;
      case 4: return <TalentStylingStep />;
      case 5: return <DeliverablesStep />;
      case 6: return <AddOnsStep />;
      case 7: return <ReviewConfirmStep />;
      default: return <ShootTypeStep />;
    }
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <OnboardingOverlay />
      <ProgressBar />
      
      <main className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12">
        {/* Main Content Area */}
        <div className="lg:col-span-8 lg:col-start-2 xl:col-span-7 xl:col-start-2">
           <div className="mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400">
              <span>Step {state.step} of 7</span>
              <span className="text-gray-300">/</span>
              <span>FashionOS Production</span>
           </div>
           
           {renderStep()}
        </div>

        {/* Sidebar Summary (Hidden on mobile/tablet step 1) */}
        <div className="hidden lg:block lg:col-span-3 xl:col-span-3 xl:col-start-10">
           {/* Fix: Use a type check to resolve the error where '>' cannot be used on 'string | number' */}
           {typeof state.step === 'number' && state.step > 1 && <SidebarSummary />}
        </div>
      </main>
    </div>
  );
};
