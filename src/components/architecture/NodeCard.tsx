import React from 'react';
import { ArrowRight, LucideIcon } from 'lucide-react';

interface NodeCardProps {
  icon: LucideIcon;
  route: string;
  title: string;
  purpose: string;
  primaryCta: string;
  secondaryCta: string;
  status?: string;
}

export const NodeCard: React.FC<NodeCardProps> = ({ 
  icon: Icon, 
  route, 
  title, 
  purpose, 
  primaryCta, 
  secondaryCta, 
  status = "Live" 
}) => (
  <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-[#F7F7F5] rounded-full -mr-16 -mt-16 group-hover:bg-purple-50 transition-colors duration-500"></div>
    
    <div className="relative z-10 flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
        <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <Icon size={22} strokeWidth={1.5} />
        </div>
        <div className="flex flex-col items-end">
           <span className="font-mono text-[9px] text-gray-400 font-bold uppercase tracking-widest bg-gray-50 px-2 py-0.5 rounded border border-gray-100 mb-1">{route}</span>
           <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded ${status === 'Live' ? 'bg-green-50 text-green-600' : 'bg-purple-50 text-purple-600'}`}>{status}</span>
        </div>
      </div>
      
      <h3 className="font-serif text-2xl mb-2 text-[#1A1A1A]">{title}</h3>
      <p className="text-sm text-gray-500 font-light leading-relaxed mb-10 flex-1">{purpose}</p>
      
      <div className="space-y-3 pt-6 border-t border-gray-50">
        <button className="w-full flex items-center justify-between text-[11px] font-black uppercase tracking-[0.2em] text-black group/btn">
          {primaryCta} <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
        <button className="w-full text-left text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors">
          {secondaryCta}
        </button>
      </div>
    </div>
  </div>
);