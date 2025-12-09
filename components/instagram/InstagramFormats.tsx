
import React from 'react';
import { Grid, Layers, Film, Image as ImageIcon, ShoppingBag, Check } from 'lucide-react';

export const InstagramFormats: React.FC = () => {
  const formats = [
    { icon: Grid, label: "Single Posts" },
    { icon: Layers, label: "Carousels" },
    { icon: Film, label: "Reels" },
    { icon: ImageIcon, label: "Stories" },
    { icon: ShoppingBag, label: "Shop Photos" }
  ];

  const features = [
    "Optimized crop ratios (4:5, 9:16)",
    "Mobile-first color grading",
    "Trend-aware creative direction",
    "Compression-safe delivery"
  ];

  return (
    <section className="py-24 px-6 bg-white border-b border-gray-100 reveal-on-scroll">
       <div className="max-w-[1440px] mx-auto text-center space-y-12">
          
          <h2 className="font-serif text-3xl text-primary">Built for Every Format.</h2>

          {/* Format Pills */}
          <div className="flex flex-wrap justify-center gap-4">
             {formats.map((fmt, i) => (
                <div key={i} className="flex items-center gap-3 px-6 py-3 rounded-full border border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all duration-300 cursor-default group">
                   <fmt.icon size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                   <span className="text-sm font-bold uppercase tracking-widest">{fmt.label}</span>
                </div>
             ))}
          </div>

          {/* Checks */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 pt-8 border-t border-gray-100 max-w-4xl mx-auto">
             {features.map((feat, i) => (
                <div key={i} className="flex items-center gap-3">
                   <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <Check size={12} strokeWidth={3} />
                   </div>
                   <span className="text-sm font-medium text-gray-600">{feat}</span>
                </div>
             ))}
          </div>

       </div>
    </section>
  );
};
