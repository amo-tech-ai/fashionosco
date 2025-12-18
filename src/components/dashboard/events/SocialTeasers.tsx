import React, { useState, useEffect } from 'react';
import { 
  Clapperboard, 
  Sparkles, 
  Play, 
  Download, 
  Loader2, 
  Share2, 
  AlertCircle, 
  CheckCircle2, 
  Video, 
  Smartphone, 
  Monitor,
  Key
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { useActiveCampaign } from '../../../contexts/ActiveCampaignContext';
import { TimelineItem } from '../../../types/event-tools';
import { Button } from '../../Button';
import { useToast } from '../../ToastProvider';
import { VideoAspectRatio } from '../../../types/video';

const LOADING_MESSAGES = [
  "Analyzing segment visual potential...",
  "Directing AI cinematography...",
  "Calibrating lens depth for SS25 aesthetics...",
  "Rendering cinematic highlights...",
  "Applying high-fashion color grade...",
  "Finalizing editorial frame sequence..."
];

export const SocialTeasers: React.FC = () => {
  const { activeCampaign } = useActiveCampaign();
  const { addToast } = useToast();
  const [selectedSegment, setSelectedSegment] = useState<TimelineItem | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0]);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<VideoAspectRatio>('9:16');

  // Cycle loading messages
  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setLoadingMsg(prev => {
          const idx = LOADING_MESSAGES.indexOf(prev);
          return LOADING_MESSAGES[(idx + 1) % LOADING_MESSAGES.length];
        });
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  const timeline: TimelineItem[] = activeCampaign?.data?.timeline || [];

  const handleGenerate = async () => {
    if (!selectedSegment) {
      addToast("Please select an event segment first.", "error");
      return;
    }

    try {
      // 1. Mandatory API Key Check for Veo
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        addToast("Premium feature: Please select a paid API key to use Veo.", "info");
        await window.aistudio.openSelectKey();
        // Proceeding assuming success as per instructions
      }

      setIsGenerating(true);
      setGeneratedVideo(null);

      // 2. Initialize AI with user-selected key
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const prompt = `A cinematic, high-fashion high-fidelity video teaser for an event called "${activeCampaign?.title}". Specifically showing: ${selectedSegment.title}. The vibe is ${activeCampaign?.data?.vibe || 'luxury editorial'}. ${selectedSegment.description}. 4k resolution, slow motion, professional lighting.`;

      // 3. Trigger Generation
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: aspectRatio
        }
      });

      // 4. Polling Loop
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      
      if (!downloadLink) throw new Error("Video generation failed to return a URI.");

      // 5. Fetch Final MP4
      const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
      if (!response.ok) throw new Error("Failed to download generated teaser.");
      
      const blob = await response.blob();
      const videoUrl = URL.createObjectURL(blob);
      
      setGeneratedVideo(videoUrl);
      addToast("Teaser generated successfully!", "success");

    } catch (error: any) {
      console.error("Veo Generation Error:", error);
      if (error.message?.includes("Requested entity was not found")) {
        addToast("API Key error. Please re-select your key.", "error");
        await window.aistudio.openSelectKey();
      } else {
        addToast("Failed to generate teaser. Please ensure you have a valid GCP billing project.", "error");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="bg-white border border-gray-200 rounded-3xl p-8 relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <h2 className="font-serif text-3xl mb-3">AI Social Teasers</h2>
          <p className="text-gray-500 text-lg font-light leading-relaxed mb-8">
            Transform your "Run of Show" segments into cinematic social content. Drive engagement and RSVP momentum with Veo-powered video generation.
          </p>
          <div className="flex items-center gap-3 p-4 bg-purple-50 border border-purple-100 rounded-2xl mb-8">
            <Key size={18} className="text-purple-600" />
            <div className="text-xs text-purple-900 leading-relaxed">
              This feature uses <strong>Veo 3.1 Fast</strong> and requires a <strong>paid GCP API key</strong>. 
              <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="underline ml-1 font-bold">Learn about billing</a>.
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-50/50 to-transparent pointer-events-none"></div>
        <Video className="absolute bottom-8 right-8 text-purple-100" size={140} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Segment Selector */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6">1. Select Event Segment</h3>
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {timeline.length === 0 ? (
                <div className="text-center py-10 text-gray-400 text-sm italic">
                  Generate a "Run of Show" first to create teasers.
                </div>
              ) : (
                timeline.map((segment) => (
                  <div 
                    key={segment.id}
                    onClick={() => !isGenerating && setSelectedSegment(segment)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer group ${
                      selectedSegment?.id === segment.id 
                      ? 'border-purple-600 bg-purple-50 shadow-md' 
                      : 'border-gray-100 hover:border-purple-300 bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{segment.time}</span>
                      <span className="text-[10px] px-2 py-0.5 bg-gray-100 rounded text-gray-500 uppercase">{segment.category}</span>
                    </div>
                    <h4 className={`font-bold text-sm ${selectedSegment?.id === segment.id ? 'text-purple-900' : 'text-gray-900'}`}>
                      {segment.title}
                    </h4>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">2. Configuration</h3>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setAspectRatio('9:16')}
                className={`flex items-center justify-center gap-2 p-4 rounded-xl border transition-all ${aspectRatio === '9:16' ? 'border-black bg-black text-white' : 'border-gray-100 hover:bg-gray-50'}`}
              >
                <Smartphone size={18} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Portrait (9:16)</span>
              </button>
              <button 
                onClick={() => setAspectRatio('16:9')}
                className={`flex items-center justify-center gap-2 p-4 rounded-xl border transition-all ${aspectRatio === '16:9' ? 'border-black bg-black text-white' : 'border-gray-100 hover:bg-gray-50'}`}
              >
                <Monitor size={18} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Landscape (16:9)</span>
              </button>
            </div>
            
            <Button 
              onClick={handleGenerate} 
              isLoading={isGenerating}
              disabled={!selectedSegment || isGenerating}
              className="w-full mt-6 py-4 bg-[#111111] text-white hover:bg-black rounded-xl"
            >
              <Sparkles size={16} className="mr-2" /> Generate Cinematic Teaser
            </Button>
          </div>
        </div>

        {/* Right: Preview Area */}
        <div className="lg:col-span-7">
          <div className="bg-[#111111] rounded-[2rem] h-full min-h-[600px] flex flex-col items-center justify-center relative overflow-hidden group shadow-2xl">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
            
            {isGenerating ? (
              <div className="text-center space-y-8 z-10 animate-in fade-in zoom-in-95 duration-700">
                <div className="relative inline-block">
                  <div className="w-24 h-24 rounded-full border-4 border-white/10 border-t-purple-500 animate-spin"></div>
                  <Sparkles className="absolute inset-0 m-auto text-purple-400 animate-pulse" size={32} />
                </div>
                <div className="space-y-2">
                   <h3 className="font-serif text-2xl text-white">Veo is generating...</h3>
                   <p className="text-gray-400 text-sm font-mono tracking-widest uppercase animate-pulse">
                     {loadingMsg}
                   </p>
                </div>
              </div>
            ) : generatedVideo ? (
              <div className="w-full h-full flex flex-col animate-in fade-in duration-1000">
                 <video 
                    src={generatedVideo} 
                    controls 
                    autoPlay 
                    loop 
                    className={`w-full h-full object-contain ${aspectRatio === '9:16' ? 'max-w-md mx-auto' : ''}`}
                 />
                 <div className="absolute bottom-8 inset-x-0 flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => window.open(generatedVideo)}
                      className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition-all shadow-xl"
                    >
                       <Download size={16} /> Download
                    </button>
                    <button className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-all shadow-xl">
                       <Share2 size={16} /> Share to Reels
                    </button>
                 </div>
              </div>
            ) : (
              <div className="text-center space-y-4 z-10 opacity-40">
                <Clapperboard size={64} className="mx-auto text-white" strokeWidth={1} />
                <p className="text-gray-400 font-light max-w-xs mx-auto">
                  Select a segment from your Run of Show to visualize it with AI cinematic production.
                </p>
              </div>
            )}

            {/* AI Watermark */}
            <div className="absolute top-8 right-8 flex items-center gap-2 opacity-50">
               <div className="w-2 h-2 rounded-full bg-purple-500"></div>
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">FashionOS | Veo Engine</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};