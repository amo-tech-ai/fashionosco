
import React, { useState } from 'react';
import { BrandAuditResult, BrandInput } from '../../../../types/brand';
import { Target, AlertTriangle, TrendingUp, Share2, ArrowRight, Save, Edit2, ShoppingBag, Globe, Instagram, Palette, CheckCircle } from 'lucide-react';
import { Button } from '../../../Button';
import { CompetitorGraph } from '../CompetitorGraph';
import { BrandService } from '../../../../services/data/brands';
import { useToast } from '../../../ToastProvider';
import { useNavigate } from 'react-router-dom';

interface BrandReportProps {
  initialResult: BrandAuditResult;
  input: BrandInput;
}

export const BrandReport: React.FC<BrandReportProps> = ({ initialResult, input }) => {
  const [result, setResult] = useState(initialResult);
  const [isEditing, setIsEditing] = useState(false);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      await BrandService.save({
        ...input,
        // Exclude large files from local storage/db save to prevent bloat
        lookbookFiles: [], 
        auditResult: result,
        lastAuditedAt: new Date().toISOString()
      });
      setIsEditing(false);
      addToast("Brand profile saved to ecosystem.", "success");
    } catch (e) {
      addToast("Failed to save changes.", "error");
    }
  };

  const handleEditChange = (field: string, value: any) => {
    setResult(prev => ({
      ...prev,
      brand_profile: {
        ...prev.brand_profile,
        [field]: value
      }
    }));
  };

  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-700 pb-12">
      
      {/* Header Summary */}
      <div className="text-center relative max-w-3xl mx-auto">
         <div className="absolute top-0 right-0">
            {isEditing ? (
               <Button onClick={handleSave} className="h-8 text-xs px-4 bg-green-600 border-green-600 hover:bg-green-700 text-white">
                  <Save size={12} className="mr-2" /> Save Profile
               </Button>
            ) : (
               <button onClick={() => setIsEditing(true)} className="text-gray-400 hover:text-black transition-colors p-2" title="Edit Profile">
                  <Edit2 size={16} />
               </button>
            )}
         </div>

         <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6 border border-green-100">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            Audit Complete
         </div>
         
         <h2 className="font-serif text-4xl md:text-6xl text-[#1A1A1A] mb-6 leading-tight">
            {input.brandName}
         </h2>
         
         {isEditing ? (
            <textarea 
               value={result.brand_profile.vibe_description}
               onChange={(e) => handleEditChange('vibe_description', e.target.value)}
               className="w-full p-4 border border-gray-300 rounded-lg font-light text-lg text-center focus:outline-none focus:border-black bg-white shadow-inner"
               rows={3}
            />
         ) : (
            <p className="text-xl text-gray-500 font-light leading-relaxed">
                "{result.brand_profile.vibe_description}"
            </p>
         )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
         
         {/* Left: Identity Card */}
         <div className="lg:col-span-5 space-y-6">
            {/* The Black Card */}
            <div className="bg-[#111111] text-white p-8 rounded-2xl shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-purple-500/20 to-blue-500/10 rounded-full blur-[60px] group-hover:bg-purple-500/30 transition-colors duration-1000"></div>
               
               <div className="relative z-10 space-y-8">
                  <div className="flex justify-between items-start">
                     <div>
                        <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Category</div>
                        {isEditing ? (
                           <input 
                              value={result.brand_profile.category}
                              onChange={(e) => handleEditChange('category', e.target.value)}
                              className="text-white text-lg font-medium bg-transparent border-b border-gray-700 w-full focus:outline-none"
                           />
                        ) : (
                           <div className="text-xl font-medium">{result.brand_profile.category}</div>
                        )}
                     </div>
                     <div className="text-right">
                        <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Health Score</div>
                        <div className="text-4xl font-serif">{result.audit_score}</div>
                     </div>
                  </div>

                  {/* Visual DNA Section */}
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                     <div className="flex justify-between items-center mb-3">
                        <span className="text-xs text-gray-300 flex items-center gap-2">
                           <Palette size={12} /> Visual DNA
                        </span>
                        {result.brand_profile.visual_archetype && (
                           <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-200">
                              {result.brand_profile.visual_archetype}
                           </span>
                        )}
                     </div>
                     
                     {/* Palette */}
                     {result.brand_profile.palette && (
                        <div className="flex gap-2 mb-4">
                           {result.brand_profile.palette.map((color, i) => (
                              <div key={i} className="w-8 h-8 rounded-full border border-white/10 shadow-sm relative group/color" style={{ backgroundColor: color }}>
                                 <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] bg-black px-1 rounded opacity-0 group-hover/color:opacity-100 transition-opacity whitespace-nowrap">{color}</span>
                              </div>
                           ))}
                        </div>
                     )}

                     <div className="mt-2">
                        <div className="flex justify-between text-xs mb-2 text-gray-300">
                           <span>Visual Consistency</span>
                           <span>{result.visual_consistency_score || result.content_health}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-1">
                           <div className="bg-purple-400 h-1 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" style={{ width: `${result.visual_consistency_score || result.content_health}%` }}></div>
                        </div>
                     </div>
                  </div>

                  <div className="flex gap-2 text-gray-400">
                     <a href={input.websiteUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Globe size={16} /></a>
                     <a href={`https://instagram.com/${input.instagramHandle.replace('@','')}`} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Instagram size={16} /></a>
                  </div>
               </div>
            </div>

            {/* Positioning Details */}
            <div className="bg-white border border-gray-200 p-8 rounded-2xl">
               <h4 className="font-bold text-xs uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                  <Target size={14} /> Market Coordinates
               </h4>
               <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-gray-50 pb-4">
                     <span className="text-sm text-gray-500">Price Tier</span>
                     <span className="font-medium text-sm bg-gray-100 px-3 py-1 rounded-full">{result.brand_profile.price_positioning}</span>
                  </div>
                  <div>
                     <span className="text-sm text-gray-500 block mb-2">Target Audience</span>
                     <span className="font-medium text-sm leading-relaxed">{result.brand_profile.target_audience}</span>
                  </div>
                  <div>
                     <span className="text-sm text-gray-500 block mb-3">Aesthetic Keywords</span>
                     <div className="flex flex-wrap gap-2">
                        {result.brand_profile.aesthetic_keywords.map((k, i) => (
                           <span key={i} className="px-2 py-1 bg-gray-50 border border-gray-100 rounded-md text-[10px] uppercase font-bold text-gray-600">{k}</span>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Right: Strategic Advice */}
         <div className="lg:col-span-7 space-y-8">
            
            <CompetitorGraph competitors={result.competitors} myBrandName={input.brandName} />

            <div className="space-y-4">
               <h3 className="font-serif text-2xl text-[#1A1A1A]">Strategic Opportunities</h3>
               <div className="grid gap-4">
                  {result.strategic_advice.map((advice, i) => (
                     <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-black transition-all group shadow-sm hover:shadow-md">
                        <div className="flex justify-between items-start mb-3">
                           <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${advice.impact === 'High' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                                 {advice.impact === 'High' ? <AlertTriangle size={18} /> : <TrendingUp size={18} />}
                              </div>
                              <h4 className="font-bold text-lg text-gray-900">{advice.title}</h4>
                           </div>
                           <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${advice.impact === 'High' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                              {advice.impact} Impact
                           </span>
                        </div>
                        <p className="text-gray-600 leading-relaxed text-sm ml-12">{advice.description}</p>
                     </div>
                  ))}
               </div>
            </div>

            <div className="bg-[#FAF8F5] p-8 rounded-xl border border-[#E5D7A4] relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#E5D7A4] opacity-20 rounded-full blur-2xl -mr-10 -mt-10"></div>
               <h4 className="font-serif text-xl mb-2 text-[#8A7A4A] relative z-10">Identified Market Gap</h4>
               <p className="text-gray-700 italic relative z-10">"{result.market_gap}"</p>
            </div>

            <div className="flex gap-4 pt-4">
               <Button onClick={() => navigate('/dashboard')} className="flex-1 justify-center py-4 bg-black text-white hover:bg-gray-800">
                  Go to Dashboard
               </Button>
               <Button variant="secondary" onClick={() => navigate('/shoot-wizard')} className="flex-1 justify-center py-4 border-gray-200 text-gray-600 hover:text-black hover:border-black">
                  <ShoppingBag size={16} className="mr-2" /> Book Matching Shoot
               </Button>
            </div>
         </div>
      </div>
    </div>
  );
};
