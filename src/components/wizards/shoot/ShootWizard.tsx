import React from 'react';
import { useShootWizard, ShootWizardProvider } from '../../../contexts/ShootWizardContext';
import { ModeSelection } from './steps/ModeSelection';
import { SignalCapture } from './steps/SignalCapture';
import { ThinkingState } from './steps/ThinkingState';
import { StrategySummary } from './steps/StrategySummary';

const WizardContent: React.FC = () => {
  const { state } = useShootWizard();

  const renderStep = () => {
    switch (state.step) {
      case 'mode': return <ModeSelection />;
      case 'signals': return <SignalCapture />;
      case 'thinking': return <ThinkingState />;
      case 'summary': return <StrategySummary />;
      default: return <ModeSelection />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFBFA] py-20 overflow-x-hidden">
      <div className="max-w-[1440px] mx-auto">
        {renderStep()}
      </div>
    </div>
  );
};

export const ShootWizard: React.FC = () => (
  <ShootWizardProvider>
    <WizardContent />
  </ShootWizardProvider>
);