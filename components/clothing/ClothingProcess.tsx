import React from 'react';
import { Box, Palette, Aperture, Camera, Wand2, Download } from 'lucide-react';

export const ClothingProcess: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-gradient-to-b from-white to-gray-50 overflow-hidden relative reveal-on-scroll">
       <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="text-center mb-20">
             <span className="text-xs font-bold tracking-widest uppercase text-purple-500 mb-2 block">Our Workflow</span>
             <h2 className="font-serif text-4xl md:text-5xl">Product Photography Process</h2>
          </div>

          {/* Visual Flowchart */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
             {/* Connector Line (Desktop) */}
             <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gray-200 -z-10"></div>
             
             {[
                { icon: Box, title: "Intake", desc: "Receiving & organizing" },
                { icon: Palette, title: "Creative", desc: "Direction & Mood" },
                { icon: Aperture, title: "Setup", desc: "Lighting & Prep" },
                { icon: Camera, title: "Shooting", desc: "High-res capture" },
                { icon: Wand2, title: "Retouch", desc: "Post-production" },
                { icon: Download, title: "Delivery", desc: "Final export" }
             ].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center text-center group">
                   <div className="w-24 h-24 bg-white border border-gray-100 rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:border-purple-200 group-hover:scale-110 transition-all duration-300 relative z-10">
                      <step.icon className="w-8 h-8 text-gray-600 group-hover:text-purple-600 transition-colors" strokeWidth={1.5} />
                   </div>
                   <h3 className="font-serif text-xl mb-2">{step.title}</h3>
                   <p className="text-xs text-gray-500 uppercase tracking-widest">{step.desc}</p>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
};