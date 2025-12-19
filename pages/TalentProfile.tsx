import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Stakeholder, StakeholderService } from '../services/data/stakeholders';
import { Button } from '../components/Button';
import { ButtonVariant } from '../types';
import { MapPin, Star, Instagram, Globe, ArrowLeft, Check, Share2, Mail, Sparkles, Loader2, ExternalLink, Zap } from 'lucide-react';
import { useToast } from '../components/ToastProvider';
import { GoogleGenAI } from '@google/genai';

export const TalentProfile: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [talent, setTalent] = useState<Stakeholder | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEnriching, setIsEnriching] = useState(false);
  const [dossier, setDossier] = useState<any>(null);

  useEffect(() => {
    const loadTalent = async () => {
      setLoading(true);
      const allTalent = await StakeholderService.getAll();
      const found = allTalent.find(t => t.id === id);
      setTalent(found || null);
      setLoading(false);
    };
    loadTalent();
  }, [id]);

  const handleEnrich = async () => {
    if (!talent) return;
    setIsEnriching(true);
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `
      Conduct a deep-intel search on ${talent.name}, a professional ${talent.role}.
      Synthesize a PR Dossier including:
      1. Current industry influence tier (VIP/Press/Buyer).
      2. Recent 3 news mentions or editorial contributions.
      3. Strategic Approach: How should a luxury brand director approach this person for an SS25 preview? 
      4. Ground all claims in real Search results. Output JSON.
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          thinkingConfig: { thinkingBudget: 1024 }
        }
      });
      setDossier(JSON.parse(response.text || '{}'));
      addToast("Dossier Enriched with Market Intel", "success");
    } catch (e) {
      addToast("Intelligence link unstable.", "error");
    } finally {
      setIsEnriching(false);
    }
  };

  const handleBook = () => {
    localStorage.removeItem('wizard_state');
    navigate('/shoot-wizard', { 
        state: { 
            prefill: { 
                modelNeeded: talent?.role === 'Model', 
                stylingNeeded: talent?.role === 'Stylist' ? 'stylist' : null,
                preferredTalent: talent?.name,
                shootType: 'custom'
            } 
        } 
    });
  };

  if (loading) return <div className="min-h-screen pt-24 flex justify-center"><Loader2 className="animate-spin text-black" /></div>;
  if (!talent) return <div className="min-h-screen pt-24 text-center text-gray-500">Talent not found.</div>;

  return (
    <div className="bg-white min-h-screen pt-20">
      <div className="max-w-[1440px] mx-auto px-6 py-6 flex items-center justify-between">
        <button onClick={() => navigate('/directory')} className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors">
           <ArrowLeft size={16} /> Back to Directory
        </button>
        <button 
          onClick={handleEnrich} 
          disabled={isEnriching}
          className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-full text-xs font-bold uppercase tracking-widest border border-purple-100 hover:bg-purple-100 transition-all"
        >
          {isEnriching ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />} 
          {dossier ? 'Refresh Dossier' : 'Enrich Dossier'}
        </button>
      </div>

      <div className="relative bg-[#F9F9F9] border-y border-gray-100 overflow-hidden">
         <div className="max-w-[1440px] mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row items-start md:items-center gap-10">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-xl flex-shrink-0">
               <img src={talent.img} alt={talent.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 space-y-4">
               <div>
                  <div className="flex items-center gap-3 mb-2">
                     <span className="bg-black text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">{talent.role}</span>
                     {talent.rating >= 4.8 && <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1"><Check size={10} /> Verified Pro</span>}
                  </div>
                  <h1 className="font-serif text-4xl md:text-5xl text-[#1A1A1A]">{talent.name}</h1>
               </div>
               
               <div className="flex flex-wrap gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2"><MapPin size={16} /> {talent.location}</div>
                  <div className="flex items-center gap-2"><Star size={16} className="text-yellow-500 fill-yellow-500" /> {talent.rating} ({talent.reviews} reviews)</div>
                  <div className="font-medium text-black">{talent.rate}</div>
               </div>

               <p className="max-w-2xl text-gray-600 leading-relaxed">
                  {talent.bio || `${talent.name} is a professional ${talent.role.toLowerCase()} based in ${talent.location}, specializing in high-end editorial and commercial projects.`}
               </p>
            </div>

            <div className="flex flex-col gap-3 w-full md:w-auto">
               <Button onClick={handleBook} className="px-8 py-4 w-full md:w-auto text-center justify-center">Book Now</Button>
               <Button variant={ButtonVariant.SECONDARY} onClick={() => addToast("Added to shortlist", "success")} className="px-8 py-4 w-full md:w-auto justify-center">Save to Shortlist</Button>
            </div>
         </div>
         {isEnriching && (
           <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] z-10 flex items-center justify-center">
              <div className="bg-white p-8 rounded-3xl shadow-2xl border border-purple-100 flex flex-col items-center gap-4">
                 <Loader2 size={32} className="animate-spin text-purple-600" />
                 <p className="font-serif text-xl">Chief Researcher conducting market audit...</p>
              </div>
           </div>
         )}
      </div>

      <div className="max-w-[1440px] mx-auto px-6 py-20">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
               <h2 className="font-serif text-3xl mb-10">Selected Work</h2>
               <div className="columns-1 md:columns-2 gap-8 space-y-8">
                  {[1,2,3,4].map((i) => (
                     <div key={i} className="break-inside-avoid relative group overflow-hidden rounded-3xl cursor-pointer bg-gray-100 border border-gray-100 shadow-sm">
                        <img 
                           src={`https://images.unsplash.com/photo-${i % 2 === 0 ? '1534528741775-53994a69daeb' : '1506794778202-cad84cf45f1d'}?q=80&w=800&auto=format&fit=crop&random=${i}`} 
                           alt="Portfolio Item" 
                           className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" 
                        />
                     </div>
                  ))}
               </div>
            </div>

            <div className="lg:col-span-4 space-y-8">
               {dossier ? (
                  <div className="bg-[#FAF9F6] border border-purple-100 p-8 rounded-[2.5rem] animate-in slide-in-from-right-4 duration-500">
                     <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-purple-600 text-white rounded-lg">
                           <Zap size={18} fill="white" />
                        </div>
                        <h3 className="font-serif text-xl font-bold">PR Dossier</h3>
                     </div>
                     
                     <div className="space-y-8">
                        <div>
                           <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Influence Tier</span>
                           <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">{dossier.influence_tier || 'Elite'}</span>
                        </div>

                        <div>
                           <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-4">Strategic Approach</span>
                           <p className="text-sm text-gray-700 leading-relaxed italic border-l-2 border-purple-200 pl-4">
                              "{dossier.strategic_approach}"
                           </p>
                        </div>

                        <div>
                           <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-4">Recent Milestones</span>
                           <div className="space-y-3">
                              {dossier.recent_news?.map((news: string, i: number) => (
                                 <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
                                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 shrink-0"></div>
                                    {news}
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>
               ) : (
                  <div className="bg-gray-50 border border-dashed border-gray-200 p-10 rounded-[2.5rem] text-center">
                     <Sparkles size={32} className="text-gray-200 mx-auto mb-4" />
                     <p className="text-sm text-gray-400">Unlock AI-powered PR dossier for deep client context.</p>
                     <button onClick={handleEnrich} className="mt-4 text-xs font-bold uppercase tracking-widest text-purple-600 hover:text-purple-800">
                        Run Intelligence Agent
                     </button>
                  </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
};