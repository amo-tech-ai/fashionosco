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
import { WizardLayout } from './WizardLayout';
import { AIRecommendationSidebar } from './AIRecommendationSidebar';

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

  const currentStepNum = typeof state.step === 'number' ? state.step : 1;

  // Choose the most relevant sidebar content based on current step
  const sidebarContent = currentStepNum < 7 ? (
    <div className="space-y-6">
      {currentStepNum > 1 && <SidebarSummary />}
      <AIRecommendationSidebar />
    </div>
  ) : null;

  return (
    <div className="bg-[#FCFBFA]">
      <OnboardingOverlay />
      <ProgressBar />
      
      <WizardLayout 
        currentStep={currentStepNum}
        totalSteps={7}
        title="FashionOS Production"
        sidebar={sidebarContent}
      >
        {renderStep()}
      </WizardLayout>
    </div>
  );
};