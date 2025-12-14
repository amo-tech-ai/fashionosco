
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, Filter, Instagram, Globe, Check, Loader2, Sparkles } from 'lucide-react';
import { Button } from '../components/Button';
import { ButtonVariant } from '../types';
import { useToast } from '../components/ToastProvider';
import { Stakeholder, StakeholderService } from '../services/data/stakeholders';
import { useNavigate } from 'react-router-dom';

export const Directory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [talentData, setTalentData] = useState<Stakeholder[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const loadTalent = async () => {
      setLoading(true);
      try {
        const data = await StakeholderService.getAll();
        setTalentData(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadTalent();
  }, []);

  const filteredTalent = talentData.filter(t => 
    (activeFilter === 'All' || t.role === activeFilter) &&
    (t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     t.location.toLowerCase().includes(searchTerm.toLowerCase()) || 
     t.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return (
    <div className="bg-white min-h-screen pt-20">
      
      {/* Header */}
      <div className="bg-[#FAF8F5] py-20 px-6 border-b border-gray-100">
         <div className="max-w-[1440px] mx-auto text-center space-y-6">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400">The Network</span>
            <h1 className="font-serif text-5xl md:text-6xl text-[#111111]">
               Curated Fashion Talent.
            </h1>
            <p className="text-gray-500 max-w-xl mx-auto font-light text-lg">
               Connect with the world's best photographers, stylists, and creatives. Vetted for quality, reliability, and style.
            </p>
            
            <div className="max-w-2xl mx-auto mt-8 relative">
               <input 
                  type="text" 
                  placeholder="Search by name, location, or tag..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-4 pl-12 pr-4 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
               />
               <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>

            <div className="flex flex-wrap justify-center gap-2 mt-6">
               {['All', 'Photographer', 'Stylist', 'Model', 'Videographer', 'Makeup Artist', 'Art Director'].map(role => (
                  <button 
                     key={role}
                     onClick={() => setActiveFilter(role)}
                     className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                        activeFilter === role 
                        ? 'bg-black text-white' 
                        : 'bg-white border border-gray-200 text-gray-500 hover:border-black hover:text-black'
                     }`}
                  >
                     {role}
                  </button>
               ))}
            </div>
         </div>
      </div>

      {/* Grid */}
      <div className="max-w-[1440px] mx-auto px-6 py-16">
         {loading ? (
            <div className="flex justify-center py-20">
               <Loader2 className="animate-spin text-gray-400" size={32} />
            </div>
         ) : (
            <>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredTalent.map(talent => (
                     <div 
                        key={talent.id} 
                        className="group border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 bg-white cursor-pointer"
                        onClick={() => navigate(`/directory/${talent.id}`)}
                     >
                        <div className="aspect-[4/3] overflow-hidden relative">
                           <img src={talent.img} alt={talent.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                           <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm shadow-sm">
                              {talent.role}
                           </div>
                           <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                              <button className="bg-white p-2 rounded-full hover:bg-black hover:text-white transition-colors shadow-sm"><Instagram size={16} /></button>
                              <button className="bg-white p-2 rounded-full hover:bg-black hover:text-white transition-colors shadow-sm"><Globe size={16} /></button>
                           </div>
                        </div>
                        
                        <div className="p-6">
                           <div className="flex justify-between items-start mb-2">
                              <h3 className="font-serif text-xl font-bold text-[#1A1A1A] group-hover:text-purple-600 transition-colors">{talent.name}</h3>
                              <div className="flex items-center gap-1 text-xs font-bold bg-yellow-50 text-yellow-700 px-2 py-1 rounded">
                                 <Star size={12} fill="currentColor" /> {talent.rating}
                              </div>
                           </div>
                           
                           <div className="flex items-center text-gray-500 text-sm mb-4">
                              <MapPin size={14} className="mr-1" /> {talent.location}
                           </div>

                           <div className="flex flex-wrap gap-2 mb-6">
                              {talent.tags.map((tag, i) => (
                                 <span key={i} className="text-[10px] uppercase font-bold tracking-wider bg-gray-50 text-gray-600 px-2 py-1 rounded border border-gray-100">
                                    {tag}
                                 </span>
                              ))}
                           </div>

                           <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                              <span className="text-sm font-medium text-gray-900">{talent.rate}</span>
                              <Button 
                                variant={ButtonVariant.SECONDARY} 
                                className="text-xs py-2 h-auto" 
                                onClick={(e) => { e.stopPropagation(); addToast("Contact request sent.", "info"); }}
                              >
                                Quick Contact
                              </Button>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>

               {filteredTalent.length === 0 && (
                  <div className="text-center py-20 text-gray-400">
                     <Filter size={48} className="mx-auto mb-4 opacity-20" />
                     <p className="text-lg">No talent found matching your criteria.</p>
                     <button onClick={() => {setSearchTerm(''); setActiveFilter('All');}} className="text-black underline mt-2 text-sm">Clear Filters</button>
                  </div>
               )}
            </>
         )}
      </div>

      {/* CTA */}
      <section className="bg-black text-white py-20 px-6 text-center">
         <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="font-serif text-4xl">Join the Network.</h2>
            <p className="text-gray-400 font-light">Are you a creative professional? Use our AI agent to build your verified portfolio in seconds.</p>
            <Button 
                onClick={() => navigate('/talent-wizard')} 
                className="bg-white text-black hover:bg-gray-200 border-none"
            >
                <span className="flex items-center gap-2"><Sparkles size={16}/> Auto-Build Profile</span>
            </Button>
         </div>
      </section>

    </div>
  );
};
