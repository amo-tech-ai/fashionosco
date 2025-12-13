
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../Button';
import { Sparkles, Copy, MessageSquare, Image as ImageIcon, X, Upload, Lightbulb, ChevronDown, ChevronUp, History, RotateCcw, Trash2 } from 'lucide-react';
import { generateCaptions, Caption, saveToHistory, getHistory, HistoryItem, clearHistory, deleteHistoryItem } from '../../services/ai/caption';
import { useToast } from '../ToastProvider';

export const InstagramCaptionGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [brandName, setBrandName] = useState('');
  const [cta, setCta] = useState('Link in Bio');
  const [tone, setTone] = useState('High Fashion');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [captions, setCaptions] = useState<Caption[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [expandedInsight, setExpandedInsight] = useState<number | null>(null);
  
  const [showHistory, setShowHistory] = useState(false);
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addToast } = useToast();

  const tones = ['High Fashion', 'Streetwear', 'Sustainable', 'Minimalist', 'Playful Gen-Z', 'Professional'];
  const ctas = ['Link in Bio', 'Shop Now', 'Read More', 'DM for Details', 'Save for Later'];

  useEffect(() => {
    setHistoryItems(getHistory());
  }, [showHistory]); // Refresh when opening history

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleGenerate = async () => {
    if (!topic && !image) {
      addToast("Please provide a topic or upload an image.", "error");
      return;
    }
    
    setIsGenerating(true);
    setCaptions([]); 
    setExpandedInsight(null);
    
    try {
      const results = await generateCaptions({
        topic: topic || "A beautiful fashion photo",
        tone,
        image,
        brandName,
        cta
      });
      setCaptions(results);
      
      // Save to History
      saveToHistory({
        topic: topic || "Untitled Generation",
        tone,
        brandName,
        hasImage: !!image
      }, results);
      
      // Update local history state immediately if it's open
      setHistoryItems(getHistory());

      addToast("Captions generated successfully", "success");
    } catch (error) {
      console.error(error);
      addToast("Failed to generate captions. Please try again.", "error");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    addToast("Caption copied to clipboard", "success");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const toggleInsight = (index: number) => {
    setExpandedInsight(expandedInsight === index ? null : index);
  };

  const loadFromHistory = (item: HistoryItem) => {
    setTopic(item.topic);
    setTone(item.tone);
    setBrandName(item.brandName);
    setCaptions(item.captions);
    setShowHistory(false);
    setImage(null); // Clear image as we don't persist it
    setImagePreview(null);
    addToast("Loaded from history", "info");
  };

  const handleClearHistory = () => {
    if (confirm('Clear all history?')) {
      clearHistory();
      setHistoryItems([]);
    }
  };

  const handleDeleteItem = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteHistoryItem(id);
    setHistoryItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="bg-[#111111] text-white border border-white/10 rounded-2xl relative overflow-hidden" id="ai-caption-tool">
      <div className="p-6 md:p-8">
        <div className="text-center mb-10 space-y-4 relative">
          <h2 className="font-serif text-3xl md:text-4xl">Fashion Caption Architect.</h2>
          <p className="text-gray-400 font-light max-w-xl mx-auto text-sm">
            Upload your look. Let our AI analyze the fit, fabric, and vibe to craft the perfect caption for your brand.
          </p>
          
          <button 
            onClick={() => setShowHistory(true)}
            className="absolute right-0 top-0 text-gray-400 hover:text-white transition-colors p-2"
            title="View History"
          >
            <History size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Input Area */}
          <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6 backdrop-blur-sm">
            
            {/* Image Upload */}
            <div>
               <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                  Visual Context (Optional)
               </label>
               {imagePreview ? (
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden group border border-white/20">
                     <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                     <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button onClick={removeImage} className="bg-red-500/80 text-white p-2 rounded-full hover:bg-red-600 transition-colors">
                           <X size={18} />
                        </button>
                     </div>
                  </div>
               ) : (
                  <div 
                     onClick={() => fileInputRef.current?.click()}
                     className="w-full aspect-video border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center hover:bg-white/5 hover:border-purple-500/50 transition-all cursor-pointer group"
                  >
                     <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Upload size={20} className="text-gray-400 group-hover:text-purple-400" />
                     </div>
                     <span className="text-xs text-gray-400 font-medium">Upload Image for Vision Analysis</span>
                  </div>
               )}
               <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  accept="image/*" 
                  className="hidden" 
               />
            </div>

            {/* Topic Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                Topic / Context
              </label>
              <textarea 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Launching our new silk evening gown collection..."
                className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors h-24 resize-none text-sm leading-relaxed"
              />
            </div>

            {/* Brand & CTA */}
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Brand Name</label>
                  <input 
                     type="text" 
                     value={brandName}
                     onChange={(e) => setBrandName(e.target.value)}
                     placeholder="e.g. Vogue"
                     className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500"
                  />
               </div>
               <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Call to Action</label>
                  <select 
                     value={cta}
                     onChange={(e) => setCta(e.target.value)}
                     className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-purple-500"
                  >
                     {ctas.map(c => <option key={c} value={c} className="bg-gray-900">{c}</option>)}
                  </select>
               </div>
            </div>

            {/* Tone Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                Brand Tone
              </label>
              <div className="flex flex-wrap gap-2">
                {tones.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border ${
                      tone === t 
                      ? 'bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-900/50' 
                      : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:bg-white/5'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <Button 
              onClick={handleGenerate} 
              isLoading={isGenerating} 
              disabled={( !topic && !image ) || isGenerating}
              className="w-full bg-white text-black hover:bg-gray-200 border-none"
            >
              {isGenerating ? 'Analyzing & Writing...' : 'Generate Captions'}
            </Button>
          </div>

          {/* Results Area */}
          <div className="lg:col-span-7 space-y-6">
            {isGenerating ? (
               // Skeleton Loading
               [1, 2, 3].map((i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4 animate-pulse">
                     <div className="flex justify-between">
                        <div className="h-4 bg-white/10 rounded w-1/4"></div>
                        <div className="h-4 bg-white/10 rounded w-8"></div>
                     </div>
                     <div className="space-y-2">
                        <div className="h-3 bg-white/5 rounded w-full"></div>
                        <div className="h-3 bg-white/5 rounded w-5/6"></div>
                        <div className="h-3 bg-white/5 rounded w-4/6"></div>
                     </div>
                  </div>
               ))
            ) : captions.length > 0 ? (
               // Results
               captions.map((caption, idx) => (
                  <div key={idx} className="bg-[#1A1A1A] border border-white/10 rounded-xl hover:border-purple-500/30 transition-all duration-300 group animate-in slide-in-from-bottom-4 overflow-hidden" style={{ animationDelay: `${idx * 150}ms` }}>
                     {/* Header */}
                     <div className="p-6 pb-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                        <div className="flex items-center gap-3">
                           <div className="bg-purple-900/40 text-purple-300 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-purple-500/20">
                              {caption.archetype || `Option 0${idx + 1}`}
                           </div>
                        </div>
                        <button 
                           onClick={() => copyToClipboard(`${caption.hook}\n\n${caption.body}\n\n${caption.hashtags}`, idx)}
                           className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-full hover:bg-white/10"
                        >
                           {copiedIndex === idx ? <span className="text-green-400">Copied!</span> : <><Copy size={12} /> Copy</>}
                        </button>
                     </div>

                     {/* Body */}
                     <div className="p-6 space-y-4">
                        <div>
                           <h3 className="font-serif text-lg text-white leading-snug">{caption.hook}</h3>
                        </div>
                        <div>
                           <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{caption.body}</p>
                        </div>
                        <div>
                           <p className="text-purple-400 text-xs font-medium break-words leading-relaxed opacity-80">{caption.hashtags}</p>
                        </div>
                     </div>

                     {/* AI Insight Footer */}
                     {caption.reasoning && (
                        <div className="bg-purple-900/10 border-t border-white/5">
                           <button 
                              onClick={() => toggleInsight(idx)}
                              className="w-full flex items-center justify-between px-6 py-3 text-xs font-bold uppercase tracking-widest text-purple-300 hover:bg-purple-900/20 transition-colors"
                           >
                              <div className="flex items-center gap-2">
                                 <Lightbulb size={12} />
                                 Why this works
                              </div>
                              {expandedInsight === idx ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                           </button>
                           {expandedInsight === idx && (
                              <div className="px-6 pb-4 pt-0 animate-in slide-in-from-top-2">
                                 <p className="text-xs text-gray-400 leading-relaxed italic border-l-2 border-purple-500/30 pl-3">
                                    "{caption.reasoning}"
                                 </p>
                              </div>
                           )}
                        </div>
                     )}
                  </div>
               ))
            ) : (
               // Empty State
               <div className="h-full min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl text-gray-500 bg-white/5">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                     <MessageSquare size={24} className="opacity-50" />
                  </div>
                  <p className="text-sm font-medium">Your AI-generated captions will appear here.</p>
                  <p className="text-xs text-gray-600 mt-2 max-w-xs text-center">We'll analyze your image and inputs to create engaging, on-brand copy.</p>
               </div>
            )}
          </div>

        </div>
      </div>

      {/* History Slide-over */}
      {showHistory && (
        <>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity" onClick={() => setShowHistory(false)}></div>
          <div className="absolute top-0 right-0 h-full w-full md:w-[400px] bg-[#1A1A1A] border-l border-white/10 z-50 shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h3 className="font-serif text-xl">Generation History</h3>
              <div className="flex items-center gap-2">
                <button onClick={handleClearHistory} className="text-gray-500 hover:text-red-400 p-2" title="Clear All">
                  <Trash2 size={18} />
                </button>
                <button onClick={() => setShowHistory(false)} className="text-gray-400 hover:text-white p-2">
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {historyItems.length === 0 ? (
                <div className="text-center text-gray-500 mt-20">
                  <History size={48} className="mx-auto mb-4 opacity-20" />
                  <p className="text-sm">No history yet.</p>
                </div>
              ) : (
                historyItems.map((item) => (
                  <div key={item.id} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-purple-500/30 transition-colors group cursor-pointer relative" onClick={() => loadFromHistory(item)}>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] text-gray-500 font-mono">{new Date(item.timestamp).toLocaleDateString()}</span>
                      <button 
                        onClick={(e) => handleDeleteItem(e, item.id)}
                        className="text-gray-600 hover:text-red-400 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Delete"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                        <h4 className="font-bold text-sm text-white mb-1 line-clamp-1">{item.topic}</h4>
                        {item.hasImage && <ImageIcon size={12} className="text-purple-400 shrink-0" />}
                    </div>
                    <p className="text-xs text-gray-400 mb-3">{item.brandName} • {item.tone}</p>
                    <div className="flex items-center text-purple-400 text-xs font-bold uppercase tracking-widest gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <RotateCcw size={12} /> Load
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
