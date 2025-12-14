
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Stakeholder, StakeholderService } from '../services/data/stakeholders';
import { Button } from '../components/Button';
import { ButtonVariant } from '../types';
import { MapPin, Star, Instagram, Globe, ArrowLeft, Check, Share2, Mail } from 'lucide-react';
import { useToast } from '../components/ToastProvider';

export const TalentProfile: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [talent, setTalent] = useState<Stakeholder | null>(null);
  const [loading, setLoading] = useState(true);

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

  const handleBook = () => {
    navigate('/shoot-wizard', { state: { prefill: { modelNeeded: talent?.role === 'Model', stylingNeeded: talent?.role === 'Stylist' ? 'stylist' : null } } });
  };

  if (loading) return <div className="min-h-screen pt-24 flex justify-center"><div className="animate-spin w-8 h-8 border-2 border-black rounded-full border-t-transparent"></div></div>;
  if (!talent) return <div className="min-h-screen pt-24 text-center">Talent not found.</div>;

  return (
    <div className="bg-white min-h-screen pt-20">
      {/* Navigation */}
      <div className="max-w-[1440px] mx-auto px-6 py-6 flex items-center">
        <button onClick={() => navigate('/directory')} className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors">
           <ArrowLeft size={16} /> Back to Directory
        </button>
      </div>

      {/* Header / Hero */}
      <div className="relative bg-[#F9F9F9] border-y border-gray-100">
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
                  {talent.bio || `${talent.name} is a professional ${talent.role.toLowerCase()} based in ${talent.location}, specializing in high-end editorial and commercial projects. Known for a distinct aesthetic and reliable delivery.`}
               </p>

               <div className="flex gap-3 pt-2">
                  {talent.instagram && <a href={`https://instagram.com/${talent.instagram.replace('@','')}`} target="_blank" rel="noreferrer" className="p-2 bg-white rounded-full border border-gray-200 hover:border-black transition-colors"><Instagram size={18} /></a>}
                  {talent.website && <a href={talent.website} target="_blank" rel="noreferrer" className="p-2 bg-white rounded-full border border-gray-200 hover:border-black transition-colors"><Globe size={18} /></a>}
               </div>
            </div>

            <div className="flex flex-col gap-3 w-full md:w-auto">
               <Button onClick={handleBook} className="px-8 py-4 w-full md:w-auto text-center justify-center">Book Now</Button>
               <Button variant={ButtonVariant.SECONDARY} onClick={() => addToast("Added to shortlist", "success")} className="px-8 py-4 w-full md:w-auto justify-center">Save to Shortlist</Button>
            </div>
         </div>
      </div>

      {/* Portfolio Grid */}
      <div className="max-w-[1440px] mx-auto px-6 py-20">
         <h2 className="font-serif text-3xl mb-10">Selected Work</h2>
         <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {[1,2,3,4,5,6].map((i) => (
               <div key={i} className="break-inside-avoid relative group overflow-hidden rounded-lg cursor-pointer bg-gray-100">
                  <img 
                     src={`https://images.unsplash.com/photo-${i % 2 === 0 ? '1534528741775-53994a69daeb' : '1506794778202-cad84cf45f1d'}?q=80&w=800&auto=format&fit=crop&random=${i}`} 
                     alt="Portfolio Item" 
                     className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
               </div>
            ))}
         </div>
      </div>

      {/* Reviews */}
      <div className="bg-[#FAF8F5] py-20 px-6">
         <div className="max-w-[1440px] mx-auto">
            <h2 className="font-serif text-3xl mb-10">Client Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                     <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                     <div>
                        <div className="font-bold text-sm">Sarah Jenkins</div>
                        <div className="text-xs text-gray-500">Art Director, Vogue</div>
                     </div>
                     <div className="ml-auto flex text-yellow-400">
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                     </div>
                  </div>
                  <p className="text-gray-600 text-sm italic">"Absolutely incredible to work with. Professional, punctual, and the creative vision was exactly what we needed for the campaign."</p>
               </div>
               <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                     <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                     <div>
                        <div className="font-bold text-sm">Mike Ross</div>
                        <div className="text-xs text-gray-500">Producer, Net-a-Porter</div>
                     </div>
                     <div className="ml-auto flex text-yellow-400">
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                     </div>
                  </div>
                  <p className="text-gray-600 text-sm italic">"Delivered assets ahead of schedule and the quality was top tier. Will definitely book again."</p>
               </div>
            </div>
         </div>
      </div>

    </div>
  );
};
