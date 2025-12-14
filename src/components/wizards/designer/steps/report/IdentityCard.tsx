
import React from 'react';
import { Palette, Globe, Instagram } from 'lucide-react';
import { BrandAuditResult, BrandInput } from '../../../../../types/brand';

interface IdentityCardProps {
  result: BrandAuditResult;
  input: BrandInput;
  isEditing: boolean;
  onEditChange: (field: string, value: any) => void;
}

export const IdentityCard: React.FC<IdentityCardProps> = ({ result, input, isEditing, onEditChange }) => {
  return (
    <div className="bg-[#111111] text-white p-8 rounded-2xl shadow-2xl relative overflow-hidden group">
       <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-purple-500/20 to-blue-500/10 rounded-full blur-[60px] group-hover:bg-purple-500/30 transition-colors duration-1000"></div>
       
       <div className="relative z-10 space-y-8">
          <div className="flex justify-between items-start">
             <div className="flex-1 mr-4">
                <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Category</div>
                {isEditing ? (
                   <input 
                      value={result.brand_profile.category}
                      onChange={(e) => onEditChange('category', e.target.value)}
                      className="text-white text-lg font-medium bg-transparent border-b border-gray-700 w-full focus:outline-none focus:border-white transition-colors"
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
  );
};
