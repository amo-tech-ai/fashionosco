
import React, { useState } from 'react';
import { useEventWizard } from '../../../contexts/EventWizardContext';
import { Button } from '../../Button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../ToastProvider';
import { CampaignService, Campaign } from '../../../services/data/campaigns';
import { Check, Loader2 } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

export const EventReviewStep: React.FC = () => {
  const { state, reset } = useEventWizard();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!user) {
        addToast("Please log in to book an event.", "error");
        navigate('/login', { state: { returnTo: '/event-wizard' } });
        return;
    }

    setIsSubmitting(true);
    
    try {
        const newCampaign: Campaign = {
            id: `EVT-${Date.now().toString().slice(-6)}`,
            type: 'event',
            title: state.eventName,
            status: 'Planning',
            client: user.email || 'FashionOS User',
            date: state.date ? state.date.toISOString() : null,
            progress: 10,
            data: state, // Persist full wizard state
            totalPrice: state.totalPrice,
            location: state.venueType || 'TBD',
            createdAt: new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
            user_id: user.id
        };

        const saved = await CampaignService.save(newCampaign);
        
        if (saved && saved.id) {
            localStorage.setItem('active_campaign_id', saved.id);
        }
        
        addToast("Event brief created successfully!", "success");
        reset(); // Clear wizard context
        navigate('/dashboard');
    } catch (error) {
        console.error("Failed to save event", error);
        addToast("Failed to create event. Please try again.", "error");
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="text-center">
        <h2 className="font-serif text-4xl mb-2">Review & Confirm</h2>
        <p className="text-gray-500">Your event production brief.</p>
      </div>

      <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 max-w-2xl mx-auto space-y-6">
         <div className="flex justify-between items-start border-b border-gray-200 pb-6">
            <div>
               <h3 className="font-bold text-2xl mb-1">{state.eventName}</h3>
               <p className="text-gray-500 capitalize">{state.eventType} • {state.venueType} Venue</p>
            </div>
            <div className="text-right">
               <div className="text-xs font-bold uppercase tracking-widest text-gray-400">Est. Budget</div>
               <div className="text-3xl font-serif">${state.totalPrice.toLocaleString()}</div>
            </div>
         </div>

         <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
               <span className="block text-gray-400 text-xs font-bold uppercase mb-1">Guests</span>
               <span className="font-medium">{state.guestCount} Pax</span>
            </div>
            <div>
               <span className="block text-gray-400 text-xs font-bold uppercase mb-1">Deposit Required</span>
               <span className="font-medium">${state.deposit.toLocaleString()} (50%)</span>
            </div>
         </div>

         <div className="space-y-3 pt-2">
            <span className="block text-gray-400 text-xs font-bold uppercase">Includes</span>
            <ul className="space-y-2">
               {state.avLighting && <li className="flex items-center gap-2"><Check size={14} className="text-green-500"/> AV & Lighting Production</li>}
               {state.catering && <li className="flex items-center gap-2"><Check size={14} className="text-green-500"/> Full Catering Service</li>}
               {state.security && <li className="flex items-center gap-2"><Check size={14} className="text-green-500"/> Security Team</li>}
               {state.livestream && <li className="flex items-center gap-2"><Check size={14} className="text-green-500"/> Global Livestream</li>}
               <li className="flex items-center gap-2"><Check size={14} className="text-green-500"/> Event Producer (Dedicated)</li>
            </ul>
         </div>
      </div>

      <div className="flex justify-center pt-8">
         <Button onClick={handleSubmit} disabled={isSubmitting} className="px-12 py-4">
            {isSubmitting ? (
                <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin" size={16} /> Processing...
                </span>
            ) : (
                'Submit Brief & Pay Deposit'
            )}
         </Button>
      </div>
    </div>
  );
};
