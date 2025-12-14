
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShootWizard } from '../../../contexts/ShootWizardContext';
import { Button } from '../../Button';
import { Check, Calendar, MapPin, Package, Clock, Shield, Sparkles, Layers, FileText } from 'lucide-react';
import { useToast } from '../../ToastProvider';
import { generateCallSheetPDF } from '../../../services/pdf/callSheet';
import { CampaignService, Campaign } from '../../../services/data/campaigns';
import { StorageService } from '../../../services/storage';
import { useAuth } from '../../../contexts/AuthContext';
import { PaymentModal } from '../../commerce/PaymentModal';

export const ReviewConfirmStep: React.FC = () => {
  const { state, prevStep, resetWizard } = useShootWizard();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { user } = useAuth();

  const handleBookClick = () => {
    if (!user) {
        addToast("Please log in to book a shoot.", "error");
        navigate('/login', { state: { returnTo: '/shoot-wizard' } });
        return;
    }
    // Open Payment Modal instead of immediate submit
    setShowPayment(true);
  };

  const handlePaymentSuccess = async (invoiceId: string) => {
    setIsSubmitting(true);
    
    try {
        // 1. Process Images via Storage Service
        let savedImageUrls: string[] = [];
        if (state.moodBoardImages.length > 0) {
            const filesToUpload = state.moodBoardImages.filter(img => img instanceof File) as File[];
            const existingUrls = state.moodBoardImages.filter(img => typeof img === 'string') as unknown as string[];
            
            if (filesToUpload.length > 0) {
               const newUrls = await StorageService.uploadFiles(filesToUpload, 'moodboards', user.id);
               savedImageUrls = [...existingUrls, ...newUrls];
            } else {
               savedImageUrls = existingUrls;
            }
        }

        // 2. Prepare Campaign Data
        const newCampaign: Campaign = {
            id: `SHOOT-${Date.now().toString().slice(-6)}`,
            type: 'shoot',
            title: `${state.shootType ? state.shootType.charAt(0).toUpperCase() + state.shootType.slice(1) : 'Custom'} Shoot`,
            status: 'Pre-Production', // Promoted from 'Planning' because they paid
            client: user.email || 'FashionOS User',
            date: state.date ? state.date.toISOString() : null,
            progress: 25, // Higher progress due to payment
            data: { ...state, moodBoardImages: savedImageUrls, invoiceId },
            totalPrice: state.totalPrice,
            location: state.location,
            createdAt: new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
            user_id: user.id
        };

        // 3. Save
        const saved = await CampaignService.save(newCampaign);
        
        if (saved && saved.id) {
            localStorage.setItem('active_campaign_id', saved.id);
        }
        
        localStorage.removeItem('wizard_state');
        setIsSuccess(true);

    } catch (error) {
        console.error("Booking failed", error);
        addToast("Failed to finalize booking record. Contact support.", "error");
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleFinish = () => {
    resetWizard();
    navigate('/dashboard');
  };

  const handleDownloadPDF = () => {
    generateCallSheetPDF(state);
  };

  if (isSuccess) {
     return (
        <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in-95 duration-500 text-center">
           <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8 shadow-sm">
              <Check size={48} strokeWidth={3} />
           </div>
           <h2 className="font-serif text-4xl mb-4 text-gray-900">Booking Confirmed!</h2>
           <p className="text-gray-500 mb-8 max-w-md mx-auto text-lg font-light">
              Payment received. Your shoot is now in pre-production. Our team will review your AI brief and confirm the crew within 24 hours.
           </p>
           <div className="flex gap-4">
              <Button variant="secondary" onClick={handleDownloadPDF} className="flex items-center gap-2">
                 <FileText size={16} /> Download Brief
              </Button>
              <Button onClick={handleFinish} className="px-8 py-4 text-sm">Go to Dashboard</Button>
           </div>
        </div>
     );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <PaymentModal 
         isOpen={showPayment} 
         onClose={() => setShowPayment(false)} 
         amount={state.deposit} 
         description={`${state.shootType} Shoot Deposit`}
         onSuccess={handlePaymentSuccess}
      />

      <div>
        <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-2">Review & Confirm.</h2>
        <p className="text-gray-500 font-light">Please check your details before proceeding to payment.</p>
      </div>

      <div className="bg-[#F7F7F5] border border-gray-200 rounded-xl p-6 md:p-8 space-y-6">
         <div className="flex justify-between items-start border-b border-gray-200 pb-6">
            <div>
               <h3 className="font-serif text-2xl mb-1 capitalize">{state.shootType?.replace('-', ' ') || 'Custom'} Shoot</h3>
               <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1"><Package size={14} /> {state.numberOfItems} items</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> {state.estimatedDuration}</span>
               </div>
            </div>
            <div className="text-right">
               <div className="text-xs font-bold uppercase tracking-widest text-gray-400">Total Estimate</div>
               <div className="text-2xl font-serif font-bold">${state.totalPrice}</div>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
               <h4 className="font-bold text-gray-900 mb-2">Logistics</h4>
               <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2"><MapPin size={14} /> {state.location === 'studio' ? 'FashionOS Studio (London)' : 'On Location'}</li>
                  <li className="flex items-center gap-2"><Calendar size={14} /> {state.date ? new Date(state.date).toDateString() : 'Date TBD (After Deposit)'}</li>
               </ul>
            </div>
            <div>
               <h4 className="font-bold text-gray-900 mb-2">Creative & Rights</h4>
               <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2 capitalize"><Check size={14} /> Vibe: {state.vibe || 'Not selected'}</li>
                  <li className="flex items-center gap-2 capitalize"><Shield size={14} /> {state.usageRights} Rights</li>
               </ul>
            </div>
         </div>

         {/* AI Insight Summary */}
         {(state.aiAnalysis || state.shotList.length > 0) && (
            <div className="bg-purple-50 rounded-lg p-5 border border-purple-100 flex flex-col md:flex-row gap-6 shadow-sm relative">
               {state.shotList.length > 0 && (
                  <button 
                     onClick={handleDownloadPDF} 
                     className="absolute top-4 right-4 text-purple-600 hover:text-purple-800 p-1" 
                     title="Download Call Sheet"
                  >
                     <FileText size={18} />
                  </button>
               )}
               
               {state.aiAnalysis && (
                  <div className="flex-1">
                     <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="text-purple-600" size={16} />
                        <h4 className="text-xs font-bold uppercase tracking-widest text-purple-800">Vision Analysis</h4>
                     </div>
                     <p className="text-xs text-purple-900 leading-relaxed italic mb-3">
                        "{state.aiAnalysis.suggestion}"
                     </p>
                     <div className="flex gap-1.5">
                        {state.aiAnalysis.colors.slice(0, 5).map((c: string, i: number) => (
                           <div key={i} className="w-5 h-5 rounded-full border border-black/10 shadow-sm" style={{ backgroundColor: c }} title={c}></div>
                        ))}
                     </div>
                  </div>
               )}
               
               {state.shotList.length > 0 && (
                  <div className={`flex-1 ${state.aiAnalysis ? 'border-l border-purple-200 pl-0 md:pl-6 pt-4 md:pt-0' : ''}`}>
                     <div className="flex items-center gap-2 mb-2">
                        <Layers className="text-purple-600" size={16} />
                        <h4 className="text-xs font-bold uppercase tracking-widest text-purple-800">Shot List</h4>
                     </div>
                     <p className="text-xs text-purple-900 leading-relaxed">
                        <span className="font-bold">{state.shotList.length} unique shots</span> generated by Gemini 3 Pro. Includes detailed lighting diagrams and prop requirements.
                     </p>
                  </div>
               )}
            </div>
         )}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
         <h4 className="font-bold text-gray-900 mb-4">Payment Summary</h4>
         <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Total Project Value</span>
            <span className="font-medium">${state.totalPrice}</span>
         </div>
         <div className="flex justify-between items-center text-lg font-bold border-t border-gray-100 pt-4 mt-2">
            <span>Due Now (50% Deposit)</span>
            <span>${state.deposit}</span>
         </div>
      </div>

      <div className="flex justify-between pt-8 border-t border-gray-100">
        <Button variant="secondary" onClick={prevStep}>Back</Button>
        <Button onClick={handleBookClick} isLoading={isSubmitting} className="px-8">
            {user ? `Pay Deposit $${state.deposit}` : 'Log In to Book'}
        </Button>
      </div>
    </div>
  );
};
