
import React from 'react';
import { useEventWizard } from '../../../contexts/EventWizardContext';
import { EVENT_TYPES } from '../../../types/event-wizard';
import { Button } from '../../Button';

export const EventTypeStep: React.FC = () => {
  const { state, updateField, nextStep } = useEventWizard();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div>
        <h2 className="font-serif text-4xl mb-3">What are we creating?</h2>
        <p className="text-gray-500">Select the format for your upcoming event.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {EVENT_TYPES.map((type) => (
          <button
            key={type.id}
            onClick={() => updateField('eventType', type.id)}
            className={`p-6 rounded-xl border text-left transition-all group hover:shadow-lg ${
              state.eventType === type.id 
              ? 'border-black bg-black text-white' 
              : 'border-gray-200 bg-white hover:border-black'
            }`}
          >
            <div className="text-4xl mb-4">{type.icon}</div>
            <h3 className="font-serif text-xl font-bold mb-1">{type.name}</h3>
            <p className={`text-sm ${state.eventType === type.id ? 'text-gray-400' : 'text-gray-500'}`}>
               {type.desc}
            </p>
            <div className={`mt-4 pt-4 border-t text-xs font-bold uppercase tracking-widest ${state.eventType === type.id ? 'border-gray-800 text-gray-400' : 'border-gray-100 text-gray-400'}`}>
               Starts at ${type.basePrice.toLocaleString()}
            </div>
          </button>
        ))}
      </div>

      <div className="pt-8 flex justify-end">
         <Button onClick={nextStep} disabled={!state.eventType}>Continue</Button>
      </div>
    </div>
  );
};
