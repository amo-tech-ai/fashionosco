
import React from 'react';
import { Sparkles, Bot, Type, Clapperboard } from 'lucide-react';

export const HomeAIServices: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-white">
       <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
             <div>
                <span className="text-xs font-bold tracking-widest uppercase text-purple-600 mb-2 block">Intelligence</span>
                <h2 className="font-serif text-4xl md:text-5xl font-medium">FashionOS AI Suite</h2>
             </div>
             <p className="text-gray-500 max-w-sm mt-4 md:mt-0">
                Proprietary tools designed to accelerate creative direction and post-production.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {[
                { icon: Sparkles, title: "Photo Enhancer", desc: "Upscale & retouch in seconds." },
                { icon: Bot, title: "Creative Assistant", desc: "Generate concepts & moodboards." },
                { icon: Type, title: "Caption Generator", desc: "SEO-optimized social copy." },
                { icon: Clapperboard, title: "Storyboard Builder", desc: "Visualize video flows instantly." }
             ].map((tool, i) => (
                <div key={i} className="group relative p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:border-transparent transition-all overflow-hidden">
                   {/* Gradient Border Effect on Hover */}
                   <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                   <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-100 rounded-2xl pointer-events-none transition-colors"></div>
                   
                   <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-black mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10">
                      <tool.icon size={24} strokeWidth={1} />
                   </div>
                   <h3 className="font-bold text-lg mb-2 relative z-10">{tool.title}</h3>
                   <p className="text-sm text-gray-500 leading-relaxed relative z-10">{tool.desc}</p>
                   
                   {/* Decorative abstract shape */}
                   <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-100 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
};
