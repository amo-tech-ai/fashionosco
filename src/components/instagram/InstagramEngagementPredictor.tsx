
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../Button';
import { Upload, Zap, TrendingUp, AlertCircle, X, Image as ImageIcon, Gauge, History, Trash2, RotateCcw } from 'lucide-react';
import { predictEngagement, PredictionResult, PredictionHistoryItem, savePredictionHistory, getPredictionHistory, clearPredictionHistory, deletePredictionHistoryItem } from '../../services/ai/predict';
import { useToast } from '../ToastProvider';

export const InstagramEngagementPredictor: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [niche, setNiche] = useState('Fashion & Lifestyle');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  
  const [showHistory, setShowHistory] = useState(false);
  const [historyItems, setHistoryItems] = useState<PredictionHistoryItem[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addToast } = useToast();

  useEffect(() => {
    setHistoryItems(getPredictionHistory());
  }, [showHistory]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setResult(null); // Reset result on new upload
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    setResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAnalyze = async () => {
    if (!image) {
      addToast("Please upload an image to analyze.", "error");
      return;
    }

    setIsAnalyzing(true);
    try {
      const data = await predictEngagement({ image, caption, niche });
      setResult(data);
      savePredictionHistory({ caption, niche }, data);
      addToast("Analysis complete", "success");
    } catch (err) {
      addToast("Failed to analyze image.", "error");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const loadFromHistory = (item: PredictionHistoryItem) => {
    setCaption(item.caption || '');
    setNiche(item.niche || 'Fashion & Lifestyle');
    setResult(item.result);
    setShowHistory(false);
    // Note: We cannot restore the image File object from localStorage
    setImage(null);
    setImagePreview(null);
    addToast("Loaded analysis from history", "info");
  };

  const handleClearHistory = () => {
    if (confirm('Clear all prediction history?')) {
      clearPredictionHistory();
      setHistoryItems([]);
    }
  };

  const handleDeleteItem = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deletePredictionHistoryItem(id);
    setHistoryItems(prev => prev.filter(item => item.id !== id));
  };

  // Helper to determine score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <section className="py-12 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 relative overflow-hidden">
      
      {/* Header / Toolbar */}
      <div className="absolute top-4 right-4 z-20">
        <button 
          onClick={() => setShowHistory(true)}
          className="text-gray-400 hover:text-white transition-colors p-2"
          title="View Prediction History"
        >
          <History size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-6 lg:px-12">
        
        {/* Left: Inputs */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <h3 className="font-serif text-2xl text-white">Viral Scorer</h3>
            <p className="text-gray-400 text-sm font-light">
               Upload your content before you post. AI validates your visual hook against real-time trends.
            </p>
          </div>

          {/* Image Uploader */}
          <div>
             <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Content Preview</label>
             {imagePreview ? (
                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden group border border-white/20 bg-black/50">
                   <img src={imagePreview} className="w-full h-full object-contain" alt="Preview" />
                   <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button onClick={removeImage} className="bg-red-500/80 text-white p-2 rounded-full hover:bg-red-600 transition-colors">
                         <X size={18} />
                      </button>
                   </div>
                </div>
             ) : (
                <div 
                   onClick={() => fileInputRef.current?.click()}
                   className="w-full aspect-[4/5] border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center hover:bg-white/5 hover:border-purple-500/50 transition-all cursor-pointer group"
                >
                   <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <ImageIcon size={24} className="text-gray-400 group-hover:text-purple-400" />
                   </div>
                   <span className="text-sm text-gray-400 font-medium">Upload Post (4:5 or 9:16)</span>
                </div>
             )}
             <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
          </div>

          {/* Metadata */}
          <div className="space-y-4">
             <div>
               <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Planned Caption (Optional)</label>
               <textarea 
                 value={caption}
                 onChange={(e) => setCaption(e.target.value)}
                 placeholder="Enter your caption here..."
                 className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 text-sm h-20 resize-none"
               />
             </div>
             <div>
               <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Target Niche</label>
               <select 
                  value={niche} 
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-purple-500"
               >
                  <option className="bg-gray-900" value="Fashion & Lifestyle">Fashion & Lifestyle</option>
                  <option className="bg-gray-900" value="Beauty & Skincare">Beauty & Skincare</option>
                  <option className="bg-gray-900" value="Streetwear">Streetwear</option>
                  <option className="bg-gray-900" value="Luxury Goods">Luxury Goods</option>
               </select>
             </div>
          </div>

          <Button 
            onClick={handleAnalyze} 
            isLoading={isAnalyzing}
            disabled={!image || isAnalyzing}
            className="w-full bg-white text-black hover:bg-gray-200 border-none"
          >
            {isAnalyzing ? 'Analyzing Trends...' : 'Predict Performance'}
          </Button>
        </div>

        {/* Right: Results */}
        <div className="lg:col-span-7 flex flex-col justify-center min-h-[400px]">
           {!result ? (
              <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl text-gray-500 bg-white/5 p-12 text-center">
                 <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 animate-pulse">
                    <Gauge size={32} className="opacity-50" />
                 </div>
                 <h4 className="text-lg font-medium text-gray-400 mb-2">Ready to Score</h4>
                 <p className="text-sm text-gray-600 max-w-xs">Upload your content to compare it against millions of data points and current visual trends.</p>
              </div>
           ) : (
              <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
                 
                 {/* Score Card */}
                 <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 blur-3xl rounded-full"></div>
                    
                    <div className="relative">
                       <svg className="w-32 h-32 transform -rotate-90">
                          <circle cx="64" cy="64" r="60" stroke="#333" strokeWidth="8" fill="none" />
                          <circle 
                             cx="64" cy="64" r="60" 
                             stroke="currentColor" 
                             strokeWidth="8" 
                             fill="none" 
                             className={getScoreColor(result.score)}
                             strokeDasharray={377} 
                             strokeDashoffset={377 - (377 * result.score) / 100}
                             strokeLinecap="round"
                          />
                       </svg>
                       <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className={`text-3xl font-bold ${getScoreColor(result.score)}`}>{result.score}</span>
                          <span className="text-[10px] uppercase tracking-widest text-gray-500">Score</span>
                       </div>
                    </div>

                    <div className="flex-1 text-center md:text-left space-y-2">
                       <h3 className="text-xl font-bold text-white">{result.verdict}</h3>
                       <p className="text-sm text-gray-400 leading-relaxed">{result.visualAnalysis}</p>
                    </div>
                 </div>

                 {/* Trend Analysis */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-purple-900/10 border border-purple-500/20 p-5 rounded-xl">
                       <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-purple-400 mb-3">
                          <TrendingUp size={14} /> Trend Alignment
                       </h4>
                       <p className="text-sm text-gray-300 leading-relaxed">{result.trendAlignment}</p>
                    </div>
                    <div className="bg-blue-900/10 border border-blue-500/20 p-5 rounded-xl">
                       <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">
                          <Zap size={14} /> Improvements
                       </h4>
                       <ul className="space-y-2">
                          {result.improvements.map((imp, i) => (
                             <li key={i} className="text-sm text-gray-300 leading-snug flex items-start gap-2">
                                <span className="mt-1.5 w-1 h-1 bg-blue-400 rounded-full shrink-0"></span>
                                {imp}
                             </li>
                          ))}
                       </ul>
                    </div>
                 </div>

              </div>
           )}
        </div>
      </div>

      {/* History Slide-over */}
      {showHistory && (
        <>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity" onClick={() => setShowHistory(false)}></div>
          <div className="absolute top-0 right-0 h-full w-full md:w-[400px] bg-[#1A1A1A] border-l border-white/10 z-50 shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h3 className="font-serif text-xl">Prediction History</h3>
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
                    <div className="flex justify-between items-center mb-1">
                        <h4 className="font-bold text-sm text-white line-clamp-1">{item.niche || 'General'}</h4>
                    </div>
                    {item.caption && <p className="text-xs text-gray-400 mb-3 line-clamp-2 italic">"{item.caption}"</p>}
                    
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                        <div className={`text-xl font-serif font-bold ${getScoreColor(item.result.score)}`}>{item.result.score}</div>
                        <div className="flex items-center text-purple-400 text-xs font-bold uppercase tracking-widest gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <RotateCcw size={12} /> View Result
                        </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
};
