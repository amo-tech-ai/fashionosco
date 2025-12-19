import React, { useState, useEffect } from 'react';
import { useShootWizard } from '../../../contexts/ShootWizardContext';
import { Button } from '../../Button';
import { ButtonVariant } from '../../../types';
import { 
  Sparkles, 
  Layers, 
  Loader2, 
  AlertCircle, 
  GripVertical, 
  CheckCircle2, 
  Instagram, 
  ShoppingBag, 
  Video, 
  Smartphone,
  Trash2,
  ChevronDown,
  ChevronUp,
  Globe,
  Plus
} from 'lucide-react';
import { generateShotList } from '../../../services/ai/shotList';
import { Shot, DistributionChannel } from '../../../types/ai';

export const DeliverablesStep: React.FC = () => {
  const { state, updateField, nextStep, prevStep } = useShootWizard();
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedChannels, setSelectedChannels] = useState<DistributionChannel[]>(['instagram', 'website']);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const channels: { id: DistributionChannel; label: string; icon: any }[] = [
    { id: 'instagram', label: 'Instagram', icon: Instagram },
    { id: 'tiktok', label: 'TikTok', icon: Video },
    { id: 'amazon', label: 'Amazon', icon: ShoppingBag },
    { id: 'website', label: 'E-com / Web', icon: Globe },
    { id: 'pinterest', label: 'Pinterest', icon: Layers }
  ];

  const handleToggleChannel = (id: DistributionChannel) => {
    setSelectedChannels(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const shots = await generateShotList({
        shootType: state.shootType || 'campaign',
        numberOfItems: state.numberOfItems,
        vibe: state.vibe || 'editorial',
        referenceBrands: state.referenceBrands || 'Premium',
        channels: selectedChannels,
        turnaround: state.turnaround
      });
      updateField('shotList', shots);
    } catch (err) {
      setError("AI was unable to process the production logic. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePriorityCycle = (id: string) => {
    const priorities: Shot['priority'][] = ['High', 'Medium', 'Low'];
    const updated = state.shotList.map(s => {
      if (s.id === id) {
        const idx = priorities.indexOf(s.priority);
        return { ...s, priority: priorities[(idx + 1) % priorities.length] };
      }
      return s;
    });
    updateField('shotList', updated);
  };

  const handleDelete = (id: string) => {
    updateField('shotList', state.shotList.filter(s => s.id !== id));
  };

  const addNewShot = () => {
     const newShot: Shot = {
        id: `manual-${Date.now()}`,
        name: "Manual Addition",
        description: "Double click to edit details...",
        angle: "Eye Level",
        lighting: "Natural",
        format: "4:5",
        type: "Hero",
        priority: "Medium",
        channel_logic: "User added manual requirement."
     };
     updateField('shotList', [...state.shotList, newShot]);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-2">Production Plan.</h2>
          <p className="text-gray-500 font-light">Select your distribution channels and generate a strategic shot list.</p>
        </div>
        
        <div className="flex gap-2">
           <Button 
            onClick={handleGenerate} 
            isLoading={isGenerating} 
            variant={ButtonVariant.SECONDARY}
            className="border-purple-200 text-purple-700 bg-purple-50 hover:bg-purple-100 flex items-center gap-2"
           >
             <Sparkles size={14} /> {state.shotList.length > 0 ? 'Regenerate Brief' : 'Draft with AI'}
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar: Channel Mix */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6">Distribution Mix</h3>
              <div className="space-y-3">
                 {channels.map(chan => (
                    <button 
                      key={chan.id}
                      onClick={() => handleToggleChannel(chan.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                        selectedChannels.includes(chan.id) 
                        ? 'border-black bg-black text-white shadow-xl' 
                        : 'border-gray-100 text-gray-400 hover:border-gray-300 bg-[#F9F9F8]'
                      }`}
                    >
                       <div className="flex items-center gap-3">
                          <chan.icon size={18} />
                          <span className="text-sm font-bold">{chan.label}</span>
                       </div>
                       {selectedChannels.includes(chan.id) && <CheckCircle2 size={16} className="text-purple-400" />}
                    </button>
                 ))}
              </div>
           </div>

           <div className="bg-[#111] text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl group-hover:bg-purple-600/20 transition-all"></div>
              <div className="relative z-10 space-y-6">
                 <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Asset Velocity</div>
                    <div className="text-2xl font-serif">Predicted Engagement</div>
                 </div>
                 <div className="flex items-center gap-3 text-green-400 font-bold text-lg">
                    <Sparkles size={20} fill="currentColor" /> +24% Conversion Lift
                 </div>
                 <p className="text-xs text-gray-400 leading-relaxed font-light">
                    AI analysis suggests high-ratio of Reels for the current {state.vibe} aesthetic trend.
                 </p>
              </div>
           </div>
        </div>

        {/* Main Board: Shot List */}
        <div className="lg:col-span-8">
           <div className="bg-white border border-gray-100 rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col h-full min-h-[600px]">
              <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-[#FAFAFA]/50">
                 <div className="flex items-center gap-3">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Briefing Board</h3>
                    <span className="px-2 py-0.5 bg-gray-100 rounded text-[10px] font-bold text-gray-500 uppercase">{selectedChannels.join(' • ')}</span>
                 </div>
                 <button 
                  onClick={addNewShot}
                  className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-black transition-all"
                 >
                   <Plus size={20} />
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                 {isGenerating ? (
                    <div className="h-full flex flex-col items-center justify-center py-20 text-center gap-6">
                       <div className="relative">
                          <Loader2 className="w-16 h-16 animate-spin text-purple-600" />
                          <div className="absolute inset-0 flex items-center justify-center">
                             <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
                          </div>
                       </div>
                       <div>
                          <p className="text-2xl font-serif italic text-gray-900">Gemini is reasoning...</p>
                          <p className="text-xs text-gray-400 uppercase tracking-widest mt-2 animate-pulse">Balancing platform hooks & brand DNA</p>
                       </div>
                    </div>
                 ) : state.shotList.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center py-24 text-gray-300 text-center space-y-4">
                       <Layers size={64} strokeWidth={1} className="opacity-20" />
                       <p className="text-base font-medium max-w-[300px]">Select your distribution mix and click generate to begin tactical planning.</p>
                    </div>
                 ) : (
                    state.shotList.map((shot, idx) => (
                       <div 
                        key={shot.id} 
                        className={`border rounded-3xl transition-all group ${expandedId === shot.id ? 'border-black shadow-xl bg-white' : 'border-gray-100 hover:border-gray-200 bg-white'}`}
                       >
                          <div 
                            className="p-5 flex items-center gap-4 cursor-pointer"
                            onClick={() => setExpandedId(expandedId === shot.id ? null : shot.id)}
                          >
                             <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-[11px] font-black text-gray-400 group-hover:text-black transition-colors">
                                {idx + 1}
                             </div>
                             <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                   <h4 className="font-bold text-sm text-gray-900 truncate">{shot.name}</h4>
                                   <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded border ${
                                      shot.type === 'Video/Reel' ? 'bg-red-50 text-red-600 border-red-100' :
                                      shot.type === 'UGC-Style' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                      'bg-gray-50 text-gray-600 border-gray-100'
                                   }`}>{shot.type}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                   <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{shot.format}</span>
                                   <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                                   <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate">{shot.lighting}</span>
                                </div>
                             </div>
                             <div className="flex items-center gap-4">
                                <button 
                                  onClick={(e) => { e.stopPropagation(); handlePriorityCycle(shot.id); }}
                                  className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
                                    shot.priority === 'High' ? 'bg-red-600 text-white border-red-600 shadow-md' :
                                    shot.priority === 'Medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                                    'bg-gray-50 text-gray-400 border-gray-100'
                                  }`}
                                >
                                   {shot.priority}
                                </button>
                                {expandedId === shot.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                             </div>
                          </div>
                          
                          {expandedId === shot.id && (
                             <div className="px-5 pb-6 pt-2 border-t border-gray-50 animate-in slide-in-from-top-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                                   <div className="space-y-6">
                                      <div>
                                         <span className="text-[10px] font-black uppercase text-gray-400 block mb-2">Visual Directive</span>
                                         <p className="text-sm text-gray-700 leading-relaxed font-light">{shot.description}</p>
                                      </div>
                                      <div className="grid grid-cols-2 gap-4">
                                         <div>
                                            <span className="text-[9px] font-black uppercase text-gray-400 block mb-1">Angle</span>
                                            <span className="text-xs font-bold text-gray-900 bg-gray-50 px-2 py-1 rounded">{shot.angle}</span>
                                         </div>
                                         <div>
                                            <span className="text-[9px] font-black uppercase text-gray-400 block mb-1">Required Props</span>
                                            <span className="text-xs font-bold text-gray-900 bg-gray-50 px-2 py-1 rounded">{shot.props || 'None'}</span>
                                         </div>
                                      </div>
                                   </div>
                                   <div className="space-y-6">
                                      <div className="bg-purple-900 text-white p-5 rounded-[1.5rem] border border-purple-800 shadow-xl relative overflow-hidden group/logic">
                                         <Sparkles className="absolute top-4 right-4 text-purple-400/30 group-hover/logic:scale-125 transition-transform" size={40} />
                                         <span className="text-[9px] font-black uppercase text-purple-400 block mb-2 tracking-[0.2em]">Strategist Logic</span>
                                         <p className="text-xs text-purple-100 leading-relaxed font-medium relative z-10">
                                            "{shot.channel_logic}"
                                         </p>
                                      </div>
                                      <div className="flex justify-between items-center">
                                         <button 
                                            onClick={() => handleDelete(shot.id)}
                                            className="text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors flex items-center gap-1.5"
                                         >
                                            <Trash2 size={12} /> Remove from Brief
                                         </button>
                                         <button className="text-[10px] font-black uppercase tracking-widest text-blue-500 hover:text-blue-700">Duplicate</button>
                                      </div>
                                   </div>
                                </div>
                             </div>
                          )}
                       </div>
                    ))
                 )}
              </div>

              {state.shotList.length > 0 && (
                <div className="p-6 bg-[#FAFAFA] border-t border-gray-100 flex justify-between items-center">
                   <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                      <Sparkles size={12} className="text-purple-400" />
                      Brief finalized via Gemini Reasoning
                   </div>
                   <span className="text-[10px] font-bold text-gray-400 uppercase">{state.shotList.length} Assets Identified</span>
                </div>
              )}
           </div>
        </div>
      </div>

      <div className="flex justify-between pt-8 border-t border-gray-100">
        <Button variant={ButtonVariant.SECONDARY} onClick={prevStep} className="px-10">Back</Button>
        <Button onClick={nextStep} disabled={state.shotList.length === 0} className="px-12 py-4">Confirm Brief & Continue</Button>
      </div>
    </div>
  );
};
