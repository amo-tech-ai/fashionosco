import React, { useState } from 'react';
import { 
  Building2, 
  Sparkles, 
  Palette, 
  Maximize2, 
  Download, 
  Loader2, 
  Layers, 
  Compass,
  ArrowRight,
  Monitor
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { useActiveCampaign } from '../../../contexts/ActiveCampaignContext';
import { Button } from '../../Button';
import { useToast } from '../../ToastProvider';

const VENUE_STYLES = [
  { id: 'industrial', label: 'Industrial Warehouse', desc: 'Raw concrete, high ceilings, exposed piping.', img: 'https://images.unsplash.com/photo-1512100356956-c1b47f4b8a21?q=80&w=400&auto=format&fit=crop' },
  { id: 'modern', label: 'Modern Gallery', desc: 'White cube, minimalist, clean lines, recessed lighting.', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=400&auto=format&fit=crop' },
  { id: 'historical', label: 'Historical Palace', desc: 'Ornate moldings, gold leaf, marble floors, crystal.', img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=400&auto=format&fit=crop' },
  { id: 'outdoor', label: 'Architectural Garden', desc: 'Brutalist structures meeting lush organic greenery.', img: 'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?q=80&w=400&auto=format&fit=crop' }
];

export const VenueVisualizer: React.FC = () => {
  const { activeCampaign } = useActiveCampaign();
  const { addToast } = useToast();
  const [selectedStyle, setSelectedStyle] = useState(VENUE_STYLES[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  // Extract palette from campaign data or use luxury defaults
  const palette = activeCampaign?.data?.palette || ['#000000', '#FFFFFF', '#8E8E8E'];
  const keywords = activeCampaign?.data?.aesthetic_keywords || ['luxury', 'minimalist'];

  const handleVisualize = async () => {
    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const prompt = `A photorealistic, high-end interior architectural render of a fashion event in a ${selectedStyle.label} setting. The space is decorated with a luxury fashion aesthetic. The color palette used for the decor, lighting, and furniture is strictly ${palette.join(', ')}. The visual vibe is ${keywords.join(', ')}. ${selectedStyle.desc} 8k resolution, cinematic lighting, sharp focus, professional interior photography style, wide angle lens.`;

      const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '16:9'
        },
      });

      const bytes = response.generatedImages[0].image.imageBytes;
      const base64String = btoa(
        new Uint8Array(bytes).reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
      
      setGeneratedImage(`data:image/jpeg;base64,${base64String}`);
      addToast("Venue visualization ready.", "success");

    } catch (error) {
      console.error("Imagen Error:", error);
      addToast("Visualization failed. Ensure GCP billing is active.", "error");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="bg-white border border-gray-200 rounded-3xl p-8 relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <h2 className="font-serif text-3xl mb-3">Visual Venue Twin</h2>
          <p className="text-gray-500 text-lg font-light leading-relaxed mb-8">
            Project your brand's DNA into potential event spaces. We use <strong>Imagen 4.0</strong> to render photorealistic interior concepts based on your campaign's unique palette.
          </p>
          
          <div className="flex items-center gap-6 p-4 bg-[#FAF9F6] rounded-2xl border border-gray-100">
             <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Applied Palette</span>
                <div className="flex gap-2">
                   {palette.map((color, i) => (
                      <div key={i} className="w-6 h-6 rounded-full border border-black/10 shadow-sm" style={{ backgroundColor: color }} />
                   ))}
                </div>
             </div>
             <div className="h-10 w-px bg-gray-200"></div>
             <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Style Filter</span>
                <div className="text-xs font-bold uppercase tracking-widest text-black">{selectedStyle.label}</div>
             </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50/50 to-transparent pointer-events-none"></div>
        <Building2 className="absolute bottom-8 right-8 text-blue-100" size={140} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Selection Sidebar */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6">1. Choose Venue Architecture</h3>
              <div className="grid grid-cols-1 gap-3">
                 {VENUE_STYLES.map((style) => (
                    <div 
                       key={style.id}
                       onClick={() => !isGenerating && setSelectedStyle(style)}
                       className={`p-3 rounded-xl border transition-all cursor-pointer flex gap-4 items-center group ${selectedStyle.id === style.id ? 'border-black bg-gray-50' : 'border-gray-100 hover:border-gray-300'}`}
                    >
                       <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                          <img src={style.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt={style.label} />
                       </div>
                       <div className="min-w-0">
                          <h4 className="font-bold text-sm text-gray-900 truncate">{style.label}</h4>
                          <p className="text-[10px] text-gray-500 leading-snug line-clamp-2">{style.desc}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           <Button 
              onClick={handleVisualize} 
              isLoading={isGenerating}
              disabled={isGenerating}
              className="w-full py-6 bg-black text-white hover:bg-gray-900 rounded-2xl shadow-xl"
           >
              <Sparkles size={16} className="mr-2" /> Generate Interior Twin
           </Button>
        </div>

        {/* Preview Canvas */}
        <div className="lg:col-span-8">
           <div className="bg-[#111111] rounded-[2.5rem] h-full min-h-[500px] flex flex-col items-center justify-center relative overflow-hidden group shadow-2xl">
              
              {isGenerating ? (
                 <div className="text-center space-y-8 z-10 animate-in fade-in zoom-in-95 duration-700">
                    <div className="relative inline-block">
                       <div className="w-32 h-32 rounded-full border border-white/5 border-t-blue-500 animate-[spin_3s_linear_infinite]"></div>
                       <div className="absolute inset-4 rounded-full border border-white/5 border-b-purple-500 animate-[spin_2s_linear_infinite_reverse]"></div>
                       <Compass className="absolute inset-0 m-auto text-blue-400 animate-pulse" size={40} />
                    </div>
                    <div className="space-y-2">
                       <h3 className="font-serif text-2xl text-white">Imagen is rendering...</h3>
                       <p className="text-gray-500 text-xs font-mono tracking-widest uppercase animate-pulse">Calculating architectural shadows & material nodes</p>
                    </div>
                 </div>
              ) : generatedImage ? (
                 <div className="w-full h-full relative animate-in fade-in duration-1000">
                    <img src={generatedImage} className="w-full h-full object-cover" alt="Venue Visualization" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                    
                    <div className="absolute bottom-8 inset-x-0 flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                       <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-100 shadow-xl transition-all">
                          <Download size={16} /> Save Concept
                       </button>
                       <button className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/20 shadow-xl transition-all">
                          <Maximize2 size={16} /> Fullscreen
                       </button>
                    </div>
                    
                    {/* Metadata Overlay */}
                    <div className="absolute top-8 left-8 bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
                       <div className="text-[8px] font-black uppercase tracking-[0.3em] text-blue-400 mb-2">Technical Specs</div>
                       <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                          <span className="text-[9px] text-gray-400 uppercase">Architecture</span>
                          <span className="text-[9px] text-white uppercase font-bold">{selectedStyle.id}</span>
                          <span className="text-[9px] text-gray-400 uppercase">Engine</span>
                          <span className="text-[9px] text-white uppercase font-bold">Imagen 4.0</span>
                       </div>
                    </div>
                 </div>
              ) : (
                 <div className="text-center space-y-6 z-10 p-12">
                    <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-white/10">
                       <Monitor size={32} className="text-gray-600" strokeWidth={1} />
                    </div>
                    <div className="max-w-xs mx-auto">
                       <p className="text-gray-400 font-light leading-relaxed">
                          Select a venue style and click <strong>Generate</strong> to see a bespoke photorealistic interior render for your event.
                       </p>
                    </div>
                 </div>
              )}

              {/* Watermark */}
              <div className="absolute top-8 right-8 flex items-center gap-2 opacity-30">
                 <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">FashionOS | Studio Twin</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};