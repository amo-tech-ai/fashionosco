
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShootWizard } from '../../../contexts/ShootWizardContext';
import { Button } from '../../Button';
import { Check, Calendar, MapPin, Package, Clock, Shield, Sparkles, Layers, FileText, AlertTriangle } from 'lucide-react';
import { useToast } from '../../ToastProvider';
import { generateCallSheetPDF } from '../../../services/pdf/callSheet';
import { filesToBase64Strings, compressBase64Image } from '../../../utils/fileHelpers';

export const ReviewConfirmStep: React.FC = () => {
  const { state, prevStep, resetWizard } = useShootWizard();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
        // 1. Process Images for Persistence
        let savedImages: string[] = [];
        if (state.moodBoardImages.length > 0) {
            // Compress heavily for LocalStorage (max 4 images, low quality)
            const filesToSave = state.moodBoardImages.slice(0, 4);
            const rawBase64s = await filesToBase64Strings(filesToSave);
            savedImages = await Promise.all(rawBase64s.map(img => compressBase64Image(img, 600)));
        }

        // 2. Prepare Booking Data
        const bookingData = {
            ...state,
            id: `CAM-${Date.now().toString().slice(-6)}`,
            status: 'Active',
            lastUpdated: new Date().toISOString(),
            progress: 15,
            moodBoardImages: savedImages
        };

        // 3. Attempt Persistence with Fallback
        try {
            const serialized = JSON.stringify(bookingData);
            // Check approximate size (UTF-16 char is 2 bytes)
            const sizeInBytes = serialized.length * 2; 
            
            // If > 4.5MB, strip images to avoid quota limit (typically 5MB)
            if (sizeInBytes > 4.5 * 1024 * 1024) {
               throw new Error("Payload too large");
            }
            
            localStorage.setItem('active_campaign', serialized);
        } catch (e) {
            console.warn("Storage limit reached or error, saving without images", e);
            // Fallback: save without images
            const { moodBoardImages, ...rest } = bookingData;
            localStorage.setItem('active_campaign', JSON.stringify(rest));
            addToast("Campaign saved (Images excluded due to browser storage limits)", "info");
        }
        
        // 4. Simulate Network & Cleanup
        await new Promise(resolve => setTimeout(resolve, 1000));
        localStorage.removeItem('wizard_state');
        setIsSuccess(true);
        addToast("Booking request submitted successfully!", "success");

    } catch (error) {
        console.error("Booking failed", error);
        addToast("Failed to submit booking. Please try again.", "error");
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
              Your shoot has been reserved. Our production team has received your AI-generated brief and will contact you shortly.
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
        <Button onClick={handleSubmit} isLoading={isSubmitting} className="px-8">Pay Deposit & Book</Button>
      </div>
    </div>
  );
};
