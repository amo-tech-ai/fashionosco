
import React from 'react';
import { Sparkles, PenTool, Layout as LayoutIcon, Video, MessageSquare } from 'lucide-react';

export const ServicesAI: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-slate-50">
       <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-16">
             <h2 className="font-serif text-4xl mb-4">Fashion Intelligence</h2>
             <p className="text-gray-500">Accelerate your workflow with our proprietary AI tools.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
             {[
                { icon: Sparkles, title: "Photo Enhancer", sub: "Upscale & clean" },
                { icon: PenTool, title: "Copywriter", sub: "Descriptions & captions" },
                { icon: LayoutIcon, title: "Moodboards", sub: "Concept generation" },
                { icon: Video, title: "Storyboard", sub: "Video pre-viz" },
                { icon: MessageSquare, title: "Social Vars", sub: "Multi-platform resize" }
             ].map((tool, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-purple-100 hover:border-purple-200 transition-all group">
                   <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform">
                      <tool.icon size={20} />
                   </div>
                   <h3 className="font-bold text-sm mb-1">{tool.title}</h3>
                   <p className="text-xs text-gray-400">{tool.sub}</p>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
};
