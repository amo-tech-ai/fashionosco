
import React from 'react';
import { Sparkles, Zap, Layers, ShoppingBag } from 'lucide-react';

export const InstagramFeatures: React.FC = () => {
  const features = [
    { icon: Sparkles, title: "Expert Direction", desc: "Art direction included" },
    { icon: Layers, title: "Brand Consistency", desc: "Your visual identity" },
    { icon: Zap, title: "Fast Delivery", desc: "Ready in 3-5 days" },
    { icon: ShoppingBag, title: "Ecommerce Ready", desc: "Optimized for sales" }
  ];

  return (
    <section className="py-24 px-6 bg-[#FDFCFB] border-t border-gray-100 reveal-on-scroll">
       <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feat, i) => (
             <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-4 group-hover:border-black transition-colors">
                   <feat.icon size={20} className="text-gray-600 group-hover:text-black" strokeWidth={1.5} />
                </div>
                <h4 className="font-bold text-sm uppercase tracking-widest mb-1">{feat.title}</h4>
                <p className="text-xs text-gray-500 font-light">{feat.desc}</p>
             </div>
          ))}
       </div>
    </section>
  );
};
