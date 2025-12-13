
import React, { useState } from 'react';
import { Button } from '../Button';
import { Sparkles, Video, Loader2, Play } from 'lucide-react';
import { generateVideoPreview } from '../../services/ai/video';
import { useToast } from '../ToastProvider';

export const VideoGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const { addToast } = useToast();

  const handleGenerate = async () => {
    // Check for API Key selection (Client-side check requirement from system prompt)
    // Assuming window.aistudio exists in the environment where this runs, or we skip if strictly local dev
    if (typeof window !== 'undefined' && (window as any).aistudio) {
        const hasKey = await (window as any).aistudio.hasSelectedApiKey();
        if (!hasKey) {
            await (window as any).aistudio.openSelectKey();
            // Race condition mitigation as per instructions
        }
    }

    if (!prompt) {
      addToast("Please enter a prompt.", "error");
      return;
    }

    setIsGenerating(true);
    try {
      const url = await generateVideoPreview(prompt, aspectRatio);
      setVideoUrl(url);
      addToast("Video preview generated!", "success");
    } catch (e) {
      addToast("Failed to generate video.", "error");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-[#111111] text-white rounded-2xl border border-white/10 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 blur-[100px] pointer-events-none"></div>
      
      <div className="p-8">
        <div className="flex items-center gap-3 mb-6">
           <div className="bg-white/10 p-2 rounded-lg">
              <Video className="text-purple-400" size={24} />
           </div>
           <div>
              <h3 className="font-serif text-2xl">AI Concept Video</h3>
              <p className="text-gray-400 text-xs">Powered by Veo</p>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="space-y-6">
              <div>
                 <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Prompt</label>
                 <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the motion: A model in a red silk dress walking on a beach at sunset, cinematic lighting..." 
                    className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-purple-500 outline-none h-32 resize-none"
                 />
              </div>
              
              <div>
                 <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Format</label>
                 <div className="flex gap-4">
                    <button 
                       onClick={() => setAspectRatio('16:9')}
                       className={`flex-1 py-3 rounded-lg border text-xs font-bold uppercase tracking-widest transition-all ${aspectRatio === '16:9' ? 'bg-white text-black border-white' : 'bg-transparent text-gray-500 border-white/10 hover:border-white/30'}`}
                    >
                       Landscape (16:9)
                    </button>
                    <button 
                       onClick={() => setAspectRatio('9:16')}
                       className={`flex-1 py-3 rounded-lg border text-xs font-bold uppercase tracking-widest transition-all ${aspectRatio === '9:16' ? 'bg-white text-black border-white' : 'bg-transparent text-gray-500 border-white/10 hover:border-white/30'}`}
                    >
                       Portrait (9:16)
                    </button>
                 </div>
              </div>

              <Button 
                 onClick={handleGenerate} 
                 isLoading={isGenerating}
                 className="w-full bg-purple-600 border-purple-600 hover:bg-purple-700 text-white"
              >
                 <Sparkles size={16} className="mr-2" /> Generate Preview
              </Button>
           </div>

           <div className="bg-black/50 border border-white/10 rounded-xl flex items-center justify-center min-h-[300px] relative overflow-hidden">
              {isGenerating ? (
                 <div className="text-center space-y-4">
                    <Loader2 className="w-10 h-10 text-purple-500 animate-spin mx-auto" />
                    <p className="text-sm text-gray-400 animate-pulse">Veo is dreaming...</p>
                 </div>
              ) : videoUrl ? (
                 <video 
                    src={videoUrl} 
                    controls 
                    autoPlay 
                    loop 
                    className="w-full h-full object-contain"
                 />
              ) : (
                 <div className="text-center text-gray-600">
                    <Play size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="text-sm">Video preview will appear here.</p>
                 </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};
