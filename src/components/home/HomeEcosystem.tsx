
import React from 'react';
import { Search, Calendar, Camera, Wand2, Share2 } from 'lucide-react';

export const HomeEcosystem: React.FC = () => {
  return (
    <section className="py-32 px-6 relative overflow-hidden bg-slate-50">
      {/* Soft Ambient Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
         <div className="absolute top-1/4 left-1/3 w-[800px] h-[800px] bg-purple-100 rounded-full blur-[120px] opacity-60 mix-blend-multiply animate-pulse"></div>
         <div className="absolute bottom-1/4 right-1/3 w-[600px] h-[600px] bg-blue-100 rounded-full blur-[100px] opacity-50 mix-blend-multiply" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="text-center mb-24">
          <span className="text-xs font-bold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-3 block">Seamless Creation</span>
          <h2 className="font-serif text-4xl md:text-6xl font-medium mb-6">The FashionOS <br/>Ecosystem.</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light">
             A unified workflow connecting world-class talent with next-generation AI tools.
          </p>
        </div>

        <div className="relative">
          {/* Animated Connector Line (SVG) */}
          <svg className="absolute top-[80px] left-0 w-full h-20 hidden lg:block z-0 pointer-events-none overflow-visible">
             <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                   <stop offset="0%" stopColor="#e9d5ff" stopOpacity="0" />
                   <stop offset="50%" stopColor="#a855f7" />
                   <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
             </defs>
             <path d="M 0,40 Q 250,90 500,40 T 1000,40 T 1500,40" fill="none" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="10 10" className="animate-[dash_30s_linear_infinite]" />
          </svg>
          <style>{`
             @keyframes dash {
                to { stroke-dashoffset: -1000; }
             }
          `}</style>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
            {[
              { icon: Search, title: "Browse", desc: "Curated Talent", color: "from-pink-500 to-rose-500" },
              { icon: Calendar, title: "Book", desc: "Direct Scheduling", color: "from-rose-500 to-orange-500" },
              { icon: Camera, title: "Produce", desc: "Digital Capture", color: "from-orange-500 to-amber-500" },
              { icon: Wand2, title: "Enhance", desc: "AI Processing", color: "from-purple-600 to-indigo-600", glow: true },
              { icon: Share2, title: "Publish", desc: "Global Reach", color: "from-blue-500 to-cyan-500" }
            ].map((step, idx) => (
              <div key={idx} className="group relative flex flex-col items-center">
                 {/* 3D Glassmorphic Card */}
                 <div className={`w-full aspect-[4/5] bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl shadow-xl flex flex-col items-center justify-center p-6 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:bg-white/60 ${step.glow ? 'ring-2 ring-purple-300 shadow-purple-200' : ''}`}>
                    
                    {/* Icon Container with Gradient */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg mb-8 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                       <step.icon size={28} strokeWidth={1.5} />
                    </div>
                    
                    <h3 className="font-serif text-xl font-medium mb-2">{step.title}</h3>
                    <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">{step.desc}</p>
                    
                    {/* Step Number */}
                    <div className="absolute top-4 right-4 text-xs font-bold text-gray-300">0{idx + 1}</div>
                 </div>
                 
                 {/* Mobile connector */}
                 {idx < 4 && <div className="md:hidden h-8 w-0.5 bg-gray-300 my-2"></div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
