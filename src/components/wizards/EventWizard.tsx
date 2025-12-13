
import React from 'react';
import { useEventWizard } from '../../contexts/EventWizardContext';
import { EventTypeStep } from './events/EventTypeStep';
import { EventDetailsStep } from './events/EventDetailsStep';
import { EventLogisticsStep } from './events/EventLogisticsStep';
import { EventReviewStep } from './events/EventReviewStep';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const EventWizard: React.FC = () => {
  const { state } = useEventWizard();
  const navigate = useNavigate();

  const steps = [
    { num: 1, label: 'Concept' },
    { num: 2, label: 'Venue' },
    { num: 3, label: 'Production' },
    { num: 4, label: 'Review' },
  ];

  return (
    <div className="min-h-screen bg-white pt-24 pb-12">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md z-40 border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
           <div className="font-serif text-xl font-bold">FashionOS Event Planner</div>
           <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-gray-100 rounded-full">
              <X size={24} />
           </button>
        </div>
        {/* Progress Bar */}
        <div className="h-1 w-full bg-gray-100">
           <div className="h-full bg-black transition-all duration-500" style={{ width: `${(state.step / 4) * 100}%` }}></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pt-12">
         {state.step === 1 && <EventTypeStep />}
         {state.step === 2 && <EventDetailsStep />}
         {state.step === 3 && <EventLogisticsStep />}
         {state.step === 4 && <EventReviewStep />}
      </div>
    </div>
  );
};
