import React, { useState, useEffect, useMemo } from 'react';
import { useShootWizard } from '../../../contexts/ShootWizardContext';
import { Button } from '../../Button';
import { User, Scissors, CheckCircle, Star, Sparkles, Loader2, ExternalLink, ArrowRight, Calendar, AlertCircle } from 'lucide-react';
import { Stakeholder, StakeholderService } from '../../../services/data/stakeholders';
import { analyzeCastingFit, CastingFit } from '../../../services/ai/casting';
import { useToast } from '../../ToastProvider';

export const TalentStylingStep: React.FC = () => {
  const { state, updateField, nextStep, prevStep } = useShootWizard();
  const { addToast } = useToast();
  
  const [recommendations, setRecommendations] = useState<(Stakeholder & CastingFit & { isAvailable: boolean })[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(true);

  useEffect(() => {
    const loadAndMatchTalent = async () => {
      // Requirements: Need vibe context to calculate fit
      if (!state.vibe && !state.aiAnalysis) return;
      
      setIsAnalyzing(true);
      try {
        const talentList = await StakeholderService.getAll();
        const vibeContext = state.brandVibeContext || state.vibe || 'minimalist';
        const fits = await analyzeCastingFit(vibeContext, talentList);
        
        // Merge data and perform availability check
        const merged = await Promise.all(
          fits.map(async (fit) => {
            const details = talentList.find(t => t.id === fit.id);
            if (!details) return null;

            // Check if available on the specific campaign date
            const isAvailable = await StakeholderService.checkAvailability(details.id, state.date);

            return { ...details, ...fit, isAvailable };
          })
        );
          
        const validResults = merged
          .filter((t): t is (Stakeholder & CastingFit & { isAvailable: boolean }) => t !== null)
          .sort((a, b) => b.fitScore - a.fitScore);
          
        setRecommendations(validResults);
      } catch (e) {
        console.error("Casting error:", e);
        addToast("Error syncing with talent network.", "error");
      } finally {
        setIsAnalyzing(false);
      }
    };

    loadAndMatchTalent();
  }, [state.vibe, state.brandVibeContext, state.date, addToast]);

  // Filter logic based on user preferences and role requirements
  const filteredTalent = useMemo(() => {
    let list = [...recommendations];
    
    if (showOnlyAvailable) {
      list = list.filter(t => t.isAvailable);
    }

    // Sort: Preferred roles (Models/Stylists) based on wizard selections
    return list.sort((a, b) => {
      const aIsRequired = (state.modelNeeded && a.role === 'Model') || (state.stylingNeeded === 'stylist' && a.role === 'Stylist');
      const bIsRequired = (state.modelNeeded && b.role === 'Model') || (state.stylingNeeded === 'stylist' && b.role === 'Stylist');
      
      if (aIsRequired && !bIsRequired) return -1;
      if (!aIsRequired && bIsRequired) return 1;
      return b.fitScore - a.fitScore;
    });
  }, [recommendations, showOnlyAvailable, state.modelNeeded, state.stylingNeeded]);

  const handleSelectTalent = (talent: Stakeholder & { isAvailable: boolean }) => {
    if (!talent.isAvailable && state.date) {
       addToast(`${talent.name} is not available on your selected date.`, "error");
       return;
    }
    
    updateField('preferredTalent', talent.name);
    
    // Auto-enable requirements if they select specific talent
    if (talent.role === 'Model') updateField('modelNeeded', true);
    if (talent.role === 'Stylist') updateField('stylingNeeded', 'stylist');
    
    addToast(`${talent.name} added to production brief.`, "success");
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="flex-1">
          <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-2">Talent & Styling.</h2>
          <p className="text-gray-500 font-light">
            {state.date 
              ? `Scanning availability for ${new Date(state.date).toLocaleDateString()}...` 
              : "Select professionals to join your production crew."}
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
           <button 
             onClick={() => setShowOnlyAvailable(true)}
             className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${showOnlyAvailable ? 'bg-black text-white shadow-md' : 'text-gray-400 hover:text-black'}`}
           >
             Available
           </button>
           <button 
             onClick={() => setShowOnlyAvailable(false)}
             className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${!showOnlyAvailable ? 'bg-black text-white shadow-md' : 'text-gray-400 hover:text-black'}`}
           >
             Show All
           </button>
        </div>
      </div>
      
      {/* Selection Summary Banner */}
      {state.preferredTalent && (
         <div className="bg-purple-50 border border-purple-100 p-5 rounded-2xl flex items-center justify-between animate-in slide-in-from-top-2 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                 <Star size={20} fill="currentColor" />
              </div>
              <div>
                 <h4 className="font-bold text-purple-900 text-sm">Talent Requested</h4>
                 <p className="text-xs text-purple-700">Booking request active for <strong>{state.preferredTalent}</strong>.</p>
              </div>
            </div>
            <button 
              onClick={() => updateField('preferredTalent', undefined)}
              className="text-[10px] font-black uppercase tracking-widest text-purple-400 hover:text-purple-600 transition-colors bg-white px-3 py-1.5 rounded-full border border-purple-100"
            >
              Clear
            </button>
         </div>
      )}

      {/* Recommended Professionals Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
           <div className="flex items-center gap-2">
              <div className="bg-black text-white p-1.5 rounded-lg">
                 <Sparkles size={14} className="text-purple-300" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#111111]">
                 Aesthetic & Schedule Match
              </span>
           </div>
           {isAnalyzing && (
              <div className="flex items-center gap-2">
                <Loader2 size={14} className="animate-spin text-purple-600" />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Checking Calendars...</span>
              </div>
           )}
        </div>

        {isAnalyzing ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-40 bg-white rounded-2xl border border-gray-100 animate-pulse"></div>
            ))}
          </div>
        ) : filteredTalent.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTalent.slice(0, 6).map((talent) => (
              <div 
                key={talent.id} 
                className={`p-4 bg-white border rounded-2xl transition-all duration-300 group hover:shadow-xl relative overflow-hidden flex gap-4 items-center ${state.preferredTalent === talent.name ? 'border-purple-600 ring-1 ring-purple-600' : 'border-gray-100'}`}
              >
                {/* Fit Score Badge */}
                <div className="absolute top-0 right-0 bg-[#0A0A0A] text-white px-3 py-1 rounded-bl-xl text-[10px] font-black tracking-widest flex items-center gap-1.5">
                  <Star size={10} className="text-yellow-400" fill="currentColor" /> {talent.fitScore}%
                </div>

                <div className="w-20 h-28 rounded-xl overflow-hidden shadow-sm shrink-0 border border-gray-50 bg-gray-100">
                  <img src={talent.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={talent.name} />
                </div>
                
                <div className="flex-1 min-w-0 pr-12">
                  <div className="flex flex-col mb-1.5">
                    <div className="flex items-center gap-2">
                       <h4 className="font-bold text-sm text-gray-900 truncate">{talent.name}</h4>
                       {!talent.isAvailable && state.date && (
                          <div className="p-0.5 bg-red-50 rounded" title="Conflict">
                             <AlertCircle size={10} className="text-red-500" />
                          </div>
                       )}
                    </div>
                    <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">{talent.role}</span>
                  </div>
                  
                  <p className="text-[10px] text-gray-500 italic line-clamp-2 leading-relaxed mb-3">"{talent.reasoning}"</p>
                  
                  <div className="mb-3">
                     {talent.isAvailable ? (
                        <div className="flex items-center gap-1.5 text-[9px] font-bold text-green-600 uppercase tracking-widest">
                           <CheckCircle size={10} /> Available
                        </div>
                     ) : (
                        <div className="flex items-center gap-1.5 text-[9px] font-bold text-red-500 uppercase tracking-widest">
                           <Calendar size={10} /> Conflicting Event
                        </div>
                     )}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleSelectTalent(talent)}
                      disabled={!talent.isAvailable && !!state.date}
                      className={`text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-1 ${
                        !talent.isAvailable && !!state.date 
                          ? 'text-gray-300 cursor-not-allowed' 
                          : state.preferredTalent === talent.name 
                            ? 'text-purple-600' 
                            : 'text-black hover:text-purple-600'
                      }`}
                    >
                      {state.preferredTalent === talent.name ? 'Confirmed ✓' : 'Select Professional'}
                    </button>
                    <a 
                      href={talent.website || `https://instagram.com/${talent.instagram?.replace('@','')}`} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-[10px] font-bold text-gray-400 hover:text-black transition-colors flex items-center gap-1"
                    >
                      Ref <ExternalLink size={10} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-16 text-center bg-gray-50 rounded-[2rem] border border-gray-100">
             <p className="text-sm text-gray-400 italic">No professionals found matching the current search criteria.</p>
             <button onClick={() => setShowOnlyAvailable(false)} className="text-xs font-bold text-black uppercase tracking-widest mt-4 border-b border-black">Search All Talent</button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
         
         {/* Standard Model Selection */}
         <div className={`p-8 rounded-[2rem] border transition-all duration-300 ${state.modelNeeded ? 'border-black bg-gray-50 ring-1 ring-black' : 'border-gray-200 bg-white shadow-sm'}`}>
            <div className="flex justify-between items-start mb-6">
               <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-gray-100 shadow-sm">
                     <User size={20} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-xl font-bold">Standard Model</h3>
               </div>
               <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input 
                     type="checkbox" 
                     id="model-toggle" 
                     checked={state.modelNeeded}
                     onChange={(e) => updateField('modelNeeded', e.target.checked)}
                     className="hidden"
                  />
                  <label 
                    htmlFor="model-toggle" 
                    className={`block w-12 h-6 rounded-full cursor-pointer transition-colors ${state.modelNeeded ? 'bg-black' : 'bg-gray-200'}`}
                  >
                    <div className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${state.modelNeeded ? 'translate-x-7' : 'translate-x-1'}`}></div>
                  </label>
               </div>
            </div>
            
            <p className="text-sm text-gray-500 font-light mb-8 leading-relaxed">Access our directory of agency-signed models. Full logistics and rights handling included.</p>
            
            {state.modelNeeded && (
               <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                  <div className="p-4 bg-white border border-gray-100 rounded-xl flex items-center justify-between cursor-pointer hover:border-black transition-all" onClick={() => updateField('modelSelection', 'portfolio')}>
                     <span className="text-xs font-bold uppercase tracking-widest">Select Category</span>
                     <ArrowRight size={14} className="text-gray-300" />
                  </div>
               </div>
            )}
         </div>

         {/* Standard Styling Selection */}
         <div className={`p-8 rounded-[2rem] border transition-all duration-300 ${state.stylingNeeded === 'stylist' ? 'border-black bg-gray-50 ring-1 ring-black' : 'border-gray-200 bg-white shadow-sm'}`}>
            <div className="flex justify-between items-start mb-6">
               <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-gray-100 shadow-sm">
                     <Scissors size={20} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-xl font-bold">Wardrobe Stylist</h3>
               </div>
               <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input 
                     type="checkbox" 
                     id="stylist-toggle" 
                     checked={state.stylingNeeded === 'stylist'}
                     onChange={(e) => updateField('stylingNeeded', e.target.checked ? 'stylist' : 'own-wardrobe')}
                     className="hidden"
                  />
                  <label 
                    htmlFor="stylist-toggle" 
                    className={`block w-12 h-6 rounded-full cursor-pointer transition-colors ${state.stylingNeeded === 'stylist' ? 'bg-black' : 'bg-gray-200'}`}
                  >
                    <div className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${state.stylingNeeded === 'stylist' ? 'translate-x-7' : 'translate-x-1'}`}></div>
                  </label>
               </div>
            </div>
            
            <p className="text-sm text-gray-500 font-light mb-8 leading-relaxed">Professional steaming, pinning, and layout coordination for a polished seasonal finish.</p>
            
            {state.stylingNeeded === 'stylist' && (
               <div className="p-4 bg-purple-50 text-purple-700 text-xs rounded-xl animate-in fade-in flex items-center gap-3 border border-purple-100">
                  <CheckCircle size={16} /> <span className="font-bold uppercase tracking-widest">Consultant Added (+$700)</span>
               </div>
            )}
         </div>

      </div>

      <div className="flex justify-between pt-8 border-t border-gray-100">
        <Button variant="secondary" onClick={prevStep} className="px-8">Back</Button>
        <Button onClick={nextStep} className="px-10">Continue</Button>
      </div>
    </div>
  );
};