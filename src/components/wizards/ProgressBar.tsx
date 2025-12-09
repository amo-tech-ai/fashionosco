
import React from 'react';
import { useShootWizard } from '../../contexts/ShootWizardContext';
import { Check } from 'lucide-react';

export const ProgressBar: React.FC = () => {
  const { state } = useShootWizard();
  
  const steps = [
    { num: 1, label: 'Type' },
    { num: 2, label: 'Details' },
    { num: 3, label: 'Creative' },
    { num: 4, label: 'Talent' },
    { num: 5, label: 'Shots' },
    { num: 6, label: 'Add-ons' },
    { num: 7, label: 'Review' },
  ];

  return (
    <div className="w-full bg-white/90 backdrop-blur-md border-b border-gray-100 fixed top-[80px] left-0 z-40 py-4 overflow-x-auto hide-scrollbar transition-all duration-300">
      <div className="max-w-[1440px] mx-auto px-6 min-w-[600px]">
        <div className="flex justify-between items-center relative">
          
          {/* Connecting Line background */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -z-10 -translate-y-1/2"></div>
          
          {/* Active Line Progress */}
          <div 
            className="absolute top-1/2 left-0 h-0.5 bg-black -z-10 -translate-y-1/2 transition-all duration-500 ease-out"
            style={{ width: `${((state.step - 1) / (steps.length - 1)) * 100}%` }}
          ></div>

          {steps.map((s) => {
            const isCompleted = state.step > s.num;
            const isActive = state.step === s.num;

            return (
              <div key={s.num} className="flex flex-col items-center gap-2 bg-transparent px-2 cursor-default">
                <div 
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 bg-white
                    ${isCompleted 
                      ? 'bg-black border-black text-white' 
                      : isActive 
                        ? 'border-black text-black scale-110 shadow-md ring-2 ring-white' 
                        : 'border-gray-200 text-gray-300'
                    }
                  `}
                >
                  {isCompleted ? <Check size={14} strokeWidth={3} /> : s.num}
                </div>
                <span 
                  className={`
                    text-[10px] uppercase tracking-widest font-bold transition-colors duration-300
                    ${isActive ? 'text-black' : isCompleted ? 'text-gray-500' : 'text-gray-300'}
                  `}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
