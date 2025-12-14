
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Search, TrendingUp, AlertTriangle, CheckCircle2, Globe, Instagram, BarChart2, History } from 'lucide-react';
import { auditProfile, AuditResult, AuditParams, saveAuditHistory } from '../services/ai/audit';
import { useToast } from '../components/ToastProvider';
import { useNavigate } from 'react-router-dom';

export const BrandAuditPage: React.FC = () => {
  const [formData, setFormData] = useState<AuditParams>({
    instagramHandle: '',
    websiteUrl: '',
    bio: '',
    niche: '',
    audience: ''
  });
  const [isAuditing, setIsAuditing] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleAudit = async () => {
    if (!formData.niche || !formData.websiteUrl) {
      addToast("Please provide at least a Website and Niche.", "error");
      return;
    }

    setIsAuditing(true);
    try {
      const data = await auditProfile(formData);
      setResult(data);
      saveAuditHistory(formData, data);
      addToast("Deep audit complete & saved!", "success");
    } catch (err) {
      addToast("Failed to audit brand.", "error");
    } finally {
      setIsAuditing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-500';
  };

  return (
    <div className="bg-white min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="text-center mb-12 relative">
           <h1 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-4">Brand Health Check.</h1>
           <p className="text-gray-500 text-lg font-light max-w-2xl mx-auto">
              Get a brutal, AI-powered critique of your digital presence. We benchmark your brand against real-time competitors and social trends.
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
           
           {/* Input Form */}
           <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                 <h3 className="font-bold text-sm uppercase tracking-widest text-gray-500 mb-6">Identity Inputs</h3>
                 
                 <div className="space-y-4">
                    <div>
                       <label className="block text-xs font-bold text-gray-400 mb-2">Website URL</label>
                       <div className="relative">
                          <Globe size={16} className="absolute left-3 top-3 text-gray-400" />
                          <input 
                             type="url"
                             value={formData.websiteUrl}
                             onChange={(e) => setFormData({...formData, websiteUrl: e.target.value})}
                             placeholder="https://brand.com"
                             className="w-full pl-10 p-3 bg-white border border-gray-200 rounded-lg text-sm focus:border-black focus:outline-none"
                          />
                       </div>
                    </div>
                    
                    <div>
                       <label className="block text-xs font-bold text-gray-400 mb-2">Instagram Handle</label>
                       <div className="relative">
                          <Instagram size={16} className="absolute left-3 top-3 text-gray-400" />
                          <input 
                             type="text"
                             value={formData.instagramHandle}
                             onChange={(e) => setFormData({...formData, instagramHandle: e.target.value})}
                             placeholder="@brand"
                             className="w-full pl-10 p-3 bg-white border border-gray-200 rounded-lg text-sm focus:border-black focus:outline-none"
                          />
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div>
                          <label className="block text-xs font-bold text-gray-400 mb-2">Niche</label>
                          <input 
                             type="text"
                             value={formData.niche}
                             onChange={(e) => setFormData({...formData, niche: e.target.value})}
                             placeholder="e.g. Luxury Swim"
                             className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm focus:border-black focus:outline-none"
                          />
                       </div>
                       <div>
                          <label className="block text-xs font-bold text-gray-400 mb-2">Target Audience</label>
                          <input 
                             type="text"
                             value={formData.audience}
                             onChange={(e) => setFormData({...formData, audience: e.target.value})}
                             placeholder="e.g. Gen Z"
                             className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm focus:border-black focus:outline-none"
                          />
                       </div>
                    </div>

                    <div>
                       <label className="block text-xs font-bold text-gray-400 mb-2">Bio (Optional)</label>
                       <textarea 
                          value={formData.bio}
                          onChange={(e) => setFormData({...formData, bio: e.target.value})}
                          placeholder="Current bio text..."
                          className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm focus:border-black focus:outline-none h-24 resize-none"
                       />
                    </div>
                 </div>

                 <div className="pt-6">
                    <Button onClick={handleAudit} isLoading={isAuditing} className="w-full justify-center py-4">
                       {isAuditing ? 'Analyzing Competitors...' : 'Run Audit'}
                    </Button>
                 </div>
              </div>
           </div>

           {/* Results Area */}
           <div>
              {!result ? (
                 <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-2xl text-gray-400 bg-gray-50 min-h-[500px]">
                    <BarChart2 size={48} className="mb-4 opacity-20" />
                    <p className="text-sm font-medium">Audit Results will appear here.</p>
                 </div>
              ) : (
                 <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                    
                    {/* Score Card */}
                    <div className="bg-[#1A1A1A] text-white p-8 rounded-2xl shadow-xl flex justify-between items-center relative overflow-hidden">
                       <div className="relative z-10">
                          <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-1">Health Score</span>
                          <div className={`text-6xl font-serif ${getScoreColor(result.score)}`}>{result.score}</div>
                       </div>
                       <div className="text-right relative z-10 max-w-[200px]">
                          <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2">
                             {result.archetype}
                          </div>
                          <p className="text-xs text-gray-400 leading-relaxed">{result.summary}</p>
                       </div>
                       
                       {/* Abstract BG */}
                       <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-600 rounded-full blur-[60px] opacity-40"></div>
                    </div>

                    {/* Competitor Insight */}
                    {result.competitorInsight && (
                        <div className="bg-blue-50 border border-blue-100 p-5 rounded-xl">
                            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-700 mb-2">
                                <Globe size={14} /> Market Context
                            </h4>
                            <p className="text-sm text-blue-900 leading-relaxed">
                                {result.competitorInsight}
                            </p>
                        </div>
                    )}

                    {/* Analysis Grid */}
                    <div className="grid grid-cols-1 gap-4">
                        <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm">
                           <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-green-600 mb-4">
                              <CheckCircle2 size={14} /> Brand Strengths
                           </h4>
                           <ul className="space-y-2">
                              {result.strengths.map((s, i) => (
                                 <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                    <span className="mt-1.5 w-1 h-1 bg-green-400 rounded-full shrink-0"></span>
                                    {s}
                                 </li>
                              ))}
                           </ul>
                        </div>
                        
                        <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm">
                           <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500 mb-4">
                              <AlertTriangle size={14} /> Critical Fixes
                           </h4>
                           <ul className="space-y-2">
                              {result.weaknesses.map((s, i) => (
                                 <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                    <span className="mt-1.5 w-1 h-1 bg-red-400 rounded-full shrink-0"></span>
                                    {s}
                                 </li>
                              ))}
                           </ul>
                        </div>

                        <div className="bg-purple-50 border border-purple-100 p-5 rounded-xl shadow-sm">
                           <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-purple-700 mb-4">
                              <TrendingUp size={14} /> Growth Opportunities
                           </h4>
                           <ul className="space-y-2">
                              {result.opportunities.map((s, i) => (
                                 <li key={i} className="text-sm text-purple-900 flex items-start gap-2">
                                    <span className="mt-1.5 w-1 h-1 bg-purple-400 rounded-full shrink-0"></span>
                                    {s}
                                 </li>
                              ))}
                           </ul>
                        </div>
                    </div>

                    {/* Bio Fix */}
                    <div className="border-t border-gray-100 pt-6">
                       <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Optimized Bio Suggestion</p>
                       <div className="bg-gray-100 p-4 rounded-lg text-sm font-mono text-gray-700 border border-gray-200">
                          {result.bioFix}
                       </div>
                    </div>
                 </div>
              )}
           </div>

        </div>
      </div>
    </div>
  );
};
