
import React from 'react';
import { useShootWizard } from '../../../contexts/ShootWizardContext';
import { SHOOT_TYPES } from '../../../types/wizard';
import { Button } from '../../Button';

export const ShootTypeStep: React.FC = () => {
  const { state, updateField, nextStep } = useShootWizard();

  const handleSelect = (typeId: string) => {
    updateField('shootType', typeId);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center md:text-left">
        <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-2">What type of shoot are you planning?</h2>
        <p className="text-gray-500 font-light">Select the category that best fits your project needs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SHOOT_TYPES.map((type) => (
          <button
            key={type.id}
            onClick={() => handleSelect(type.id)}
            className={`
              flex flex-col items-start p-6 rounded-xl border text-left transition-all duration-200 group
              ${state.shootType === type.id 
                ? 'border-black bg-gray-50 ring-1 ring-black shadow-md' 
                : 'border-gray-200 hover:border-gray-400 hover:bg-white bg-white'}
            `}
          >
            <span className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all">{type.icon}</span>
            <h3 className="font-serif text-lg font-bold text-gray-900 mb-1">{type.name}</h3>
            <p className="text-xs text-gray-500 font-light leading-relaxed">{type.description}</p>
            <div className="mt-4 pt-4 w-full border-t border-gray-100 flex justify-between items-center">
               <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">From</span>
               <span className="text-sm font-medium text-gray-900">${type.startingPrice}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-end pt-8">
        <Button 
          onClick={nextStep} 
          disabled={!state.shootType}
          className="w-full md:w-auto"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
