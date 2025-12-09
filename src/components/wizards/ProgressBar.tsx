
import React from 'react';
import { useShootWizard } from '../../contexts/ShootWizardContext';

export const ProgressBar: React.FC = () => {
  const { state } = useShootWizard();
  const totalSteps = 7;
  const progress = (state.step / totalSteps) * 100;

  return (
    <div className="w-full bg-gray-100 h-1.5 fixed top-[80px] left-0 z-40">
      <div 
         className="h-full bg-black transition-all duration-500 ease-out" 
         style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};
