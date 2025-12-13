
import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import { Search, TrendingUp, AlertTriangle, CheckCircle2, RefreshCw, Star, History, Trash2, X, RotateCcw } from 'lucide-react';
import { auditProfile, AuditResult, AuditHistoryItem, saveAuditHistory, getAuditHistory, clearAuditHistory, deleteAuditHistoryItem } from '../../services/ai/audit';
import { useToast } from '../ToastProvider';

export const InstagramProfileAuditor: React.FC = () => {
  const [bio, setBio] = useState('');
  const [niche, setNiche] = useState('');
  const [audience, setAudience] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  
  const [showHistory, setShowHistory] = useState(false);
  const [historyItems, setHistoryItems] = useState<AuditHistoryItem[]>([]);
  
  const { addToast } = useToast();

  useEffect(() => {
    setHistoryItems(getAuditHistory());
  }, [showHistory]);

  const handleAudit = async () => {
    if (!bio || !niche) {
      addToast("Please enter your Bio and Niche.", "error");
      return;
    }

    setIsAuditing(true);
    try {
      const data = await auditProfile({ bio, niche, audience });
      setResult(data);
      saveAuditHistory({ bio, niche, audience }, data);
      addToast("Audit complete!", "success");
    } catch (err) {
      addToast("Failed to audit profile.", "error");
    } finally {
      setIsAuditing(false);
    }
  };

  const loadFromHistory = (item: AuditHistoryItem) => {
    setBio(item.params.bio);
    setNiche(item.params.niche);
    setAudience(item.params.audience);
    setResult(item.result);
    setShowHistory(false);
    addToast("Loaded audit from history", "info");
  };

  const handleClearHistory = () => {
    if (confirm('Clear all audit history?')) {
      clearAuditHistory();
      setHistoryItems([]);
    }
  };

  const handleDeleteItem = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteAuditHistoryItem(id);
    setHistoryItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <section className="py-12 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 relative overflow-hidden">
      
      {/* Header / Toolbar */}
      <div className="absolute top-4 right-4 z-20">
        <button 
          onClick={() => setShowHistory(true)}
          className="text-gray-400 hover:text-white transition-colors p-2"
          title="View Audit History"
        >
          <History size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 lg:px-12">
        
        {/* Input Side */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-serif text-2xl text-white">Profile Audit</h3>
            <p className="text-gray-400 text-sm font-light">Get a ruthless, AI-powered critique of your Instagram bio and strategy.</p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Current Bio</label>
            <textarea 
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Paste your Instagram bio here..."
              className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors h-32 resize-none text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Niche</label>
              <input 
                type="text" 
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder="e.g. Sustainable Fashion"
                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Target Audience</label>
              <input 
                type="text" 
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="e.g. Gen Z Women"
                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <Button 
            onClick={handleAudit} 
            isLoading={isAuditing}
            className="w-full bg-white text-black hover:bg-gray-200 border-none"
          >
            {isAuditing ? 'Analyzing Trends...' : 'Audit My Profile'}
          </Button>
        </div>

        {/* Result Side */}
        <div className="relative min-h-[400px]">
          {!result ? (
            <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl text-gray-500 bg-white/5">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <Search size={24} className="opacity-50" />
              </div>
              <p className="text-sm font-medium">Results will appear here.</p>
            </div>
          ) : (
            <div className="h-full flex flex-col gap-6 animate-in slide-in-from-right-4">
              {/* Score Header */}
              <div className="flex items-center justify-between bg-[#1A1A1A] border border-white/10 p-6 rounded-2xl">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-1">Brand Health Score</span>
                  <div className="text-5xl font-serif text-white">{result.score}<span className="text-xl text-gray-500">/100</span></div>
                </div>
                <div className="text-right">
                  <div className="inline-block px-3 py-1 bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-widest rounded-full mb-2">
                    {result.archetype}
                  </div>
                  <p className="text-xs text-gray-400 max-w-[200px]">{result.summary}</p>
                </div>
              </div>

              {/* Grid Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                <div className="bg-green-900/10 border border-green-500/20 p-5 rounded-xl">
                  <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-green-400 mb-3">
                    <CheckCircle2 size={14} /> Strengths
                  </h4>
                  <ul className="space-y-2">
                    {result.strengths.map((s, i) => (
                      <li key={i} className="text-sm text-gray-300 leading-snug">• {s}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-900/10 border border-red-500/20 p-5 rounded-xl">
                  <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-400 mb-3">
                    <AlertTriangle size={14} /> Weaknesses
                  </h4>
                  <ul className="space-y-2">
                    {result.weaknesses.map((s, i) => (
                      <li key={i} className="text-sm text-gray-300 leading-snug">• {s}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Plan */}
              <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                 <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-purple-300 mb-4">
                    <TrendingUp size={14} /> Viral Opportunities
                 </h4>
                 <div className="flex flex-wrap gap-2 mb-6">
                    {result.opportunities.map((op, i) => (
                       <span key={i} className="bg-purple-500/10 border border-purple-500/20 text-purple-200 text-xs px-2 py-1 rounded">
                          {op}
                       </span>
                    ))}
                 </div>
                 
                 <div className="pt-4 border-t border-white/10">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Optimized Bio Suggestion</p>
                    <div className="bg-black/40 p-3 rounded border border-white/5 text-sm text-white font-mono">
                       {result.bioFix}
                    </div>
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
              <h3 className="font-serif text-xl">Audit History</h3>
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
                  <p className="text-sm">No audits yet.</p>
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
                    <h4 className="font-bold text-sm text-white mb-1 line-clamp-1">{item.params.niche || 'General'}</h4>
                    <p className="text-xs text-gray-400 mb-3 line-clamp-2">{item.params.bio || 'No bio'}</p>
                    <div className="flex items-center justify-between mt-2">
                        <div className="text-xl font-serif text-purple-400">{item.result.score}/100</div>
                        <div className="flex items-center text-purple-400 text-xs font-bold uppercase tracking-widest gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <RotateCcw size={12} /> Load
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
