
import React from 'react';
import { Play } from 'lucide-react';

export const VideoPortfolio: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-white">
       <div className="max-w-[1440px] mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl text-center mb-16">Recent Productions.</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[
                { title: "Summer Campaign", tag: "Fashion Film", img: "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=2946&auto=format&fit=crop" },
                { title: "Glow Serum Launch", tag: "Beauty Product", img: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=2880&auto=format&fit=crop" },
                { title: "Urban Collection", tag: "Social Reels", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2940&auto=format&fit=crop" },
                { title: "Activewear Tech", tag: "Explainer", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2820&auto=format&fit=crop" },
                { title: "Luxury Handbags", tag: "360 Spin", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=2835&auto=format&fit=crop" },
                { title: "Skincare Routine", tag: "How-To", img: "https://images.unsplash.com/photo-1556228722-dca88997a3f0?q=80&w=2787&auto=format&fit=crop" }
             ].map((item, i) => (
                <div key={i} className="group cursor-pointer">
                   <div className="aspect-[4/5] bg-gray-100 overflow-hidden rounded-sm relative mb-4">
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                         <Play className="text-white w-12 h-12 fill-white opacity-80" />
                      </div>
                      <img src={item.img} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" alt={item.title} />
                   </div>
                   <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">{item.tag}</span>
                   <h3 className="font-serif text-xl">{item.title}</h3>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
};
