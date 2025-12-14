
import React from 'react';
import { Instagram, Facebook, Youtube, Globe, Tv } from 'lucide-react';

export const VideoPlatforms: React.FC = () => {
  return (
    <section className="py-20 px-6 bg-[#F5F3EF] border-y border-gray-200">
       <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
             <h3 className="font-serif text-2xl mb-2">Optimized for Every Platform.</h3>
             <p className="text-sm text-gray-500">Our videos are crafted to perform across major ecommerce, retail, and social channels.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-gray-400">
             <div className="flex items-center gap-2 hover:text-black transition-colors"><Instagram size={20} /><span className="text-xs font-bold uppercase tracking-widest">Instagram</span></div>
             <div className="flex items-center gap-2 hover:text-black transition-colors"><Globe size={20} /><span className="text-xs font-bold uppercase tracking-widest">Shopify</span></div>
             <div className="flex items-center gap-2 hover:text-black transition-colors"><Tv size={20} /><span className="text-xs font-bold uppercase tracking-widest">TikTok</span></div>
             <div className="flex items-center gap-2 hover:text-black transition-colors"><Youtube size={20} /><span className="text-xs font-bold uppercase tracking-widest">YouTube</span></div>
             <div className="flex items-center gap-2 hover:text-black transition-colors"><Facebook size={20} /><span className="text-xs font-bold uppercase tracking-widest">Meta</span></div>
          </div>
       </div>
    </section>
  );
};
