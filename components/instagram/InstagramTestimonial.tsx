
import React from 'react';

export const InstagramTestimonial: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-gradient-to-r from-purple-50 via-white to-blue-50 reveal-on-scroll">
       <div className="max-w-4xl mx-auto text-center relative">
          {/* Glass Bubble */}
          <div className="relative z-10 bg-white/40 backdrop-blur-xl border border-white/60 p-12 md:p-16 rounded-3xl shadow-xl">
             <span className="text-6xl text-purple-200 font-serif leading-none absolute top-8 left-8">“</span>
             <h3 className="font-serif text-3xl md:text-4xl leading-relaxed text-gray-800 mb-8 italic relative z-10">
                Our Instagram engagement increased by 40% after switching to FashionOS content. It's night and day.
             </h3>
             <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mb-3 overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" />
                </div>
                <p className="font-bold text-sm tracking-widest uppercase text-black">Elena R.</p>
                <p className="text-gray-500 text-xs uppercase tracking-widest">Founder, The Modern Edit</p>
             </div>
          </div>
       </div>
    </section>
  );
};
