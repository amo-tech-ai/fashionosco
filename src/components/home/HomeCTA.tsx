
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Button';
import { ArrowRight, Check, Sparkles } from 'lucide-react';

export const HomeCTA: React.FC = () => {
  const navigate = useNavigate();
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    // Desktop-only parallax effect
    const handleScroll = () => {
      if (window.innerWidth >= 1024) {
        // Subtle movement relative to scroll
        setOffsetY(window.scrollY * 0.05);
      } else {
        setOffsetY(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="bg-[#FAF8F5] py-24 lg:py-32 px-6 overflow-hidden">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left Column: Content (Desktop Order 1, Mobile Order 3) */}
        <div className="order-3 lg:order-1 space-y-8 animate-in slide-in-from-bottom-8 duration-700">
           {/* Header */}
           <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full shadow-sm">
                 <Sparkles size={12} className="text-purple-600" />
                 <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">AI-Powered</span>
              </div>
              
              <h2 className="font-serif text-5xl md:text-6xl text-[#1A1A1A] leading-[1.1]">
                 Create Your <br/>FashionOS Profile.
              </h2>
              
              <p className="text-xl text-gray-500 font-light leading-relaxed max-w-lg">
                 Turn your links into an AI-powered brand audit and a professional fashion profile in seconds.
              </p>
           </div>

           {/* Value Props */}
           <div className="space-y-4">
              {[
                 "Get discovered by events, sponsors, and collaborators",
                 "See your brand's strengths and gaps instantly",
                 "Manage everything from one premium dashboard"
              ].map((item, i) => (
                 <div key={i} className="flex items-start gap-4 group cursor-default">
                    <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                       <Check size={14} className="text-white" />
                    </div>
                    <span className="text-gray-600 text-sm md:text-base font-light">{item}</span>
                 </div>
              ))}
           </div>

           <div className="pt-4 flex items-center gap-3 text-xs text-gray-400 font-bold uppercase tracking-widest">
              <span>Free to start</span>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span>Takes less than 5 minutes</span>
           </div>
        </div>

        {/* Right Column: Visuals (Desktop Order 2, Mobile Order 1 & 2) */}
        <div className="order-1 lg:order-2 relative">
           
           {/* Image Container */}
           <div className="relative z-0 mb-[-40px] ml-auto w-full max-w-lg lg:w-[90%]">
              <div 
                 className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative"
                 style={{ 
                    transform: `translateY(${offsetY}px)`,
                    transition: 'transform 0.1s linear'
                 }}
              >
                 <img 
                    src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=2946&auto=format&fit=crop" 
                    alt="Fashion Runway Model" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]"
                 />
                 
                 {/* Abstract AI Overlay */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 via-transparent to-blue-900/10 mix-blend-overlay pointer-events-none"></div>
                 
                 {/* Subtle Text */}
                 <div className="absolute bottom-8 left-8 text-white/80 font-mono text-[10px] tracking-[0.2em] uppercase opacity-90">
                    FashionOS · Intelligence
                 </div>
              </div>
           </div>

           {/* CTA Card */}
           <div className="relative z-10 bg-white p-8 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 max-w-sm mr-auto lg:ml-[-40px] lg:mt-0 mt-[-60px] animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
              <div className="space-y-6">
                 <div>
                    <h3 className="font-serif text-2xl mb-2 text-[#1A1A1A]">Ready to launch?</h3>
                    <p className="text-gray-500 text-sm">Join the network of modern fashion brands.</p>
                 </div>
                 
                 <Button 
                    onClick={() => navigate('/create-profile')} 
                    className="w-full justify-center py-4 text-sm group bg-black text-white hover:bg-gray-900 border-none"
                 >
                    Create Profile 
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                 </Button>

                 <div className="text-center">
                    <button 
                       onClick={() => navigate('/directory')}
                       className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
                    >
                       View Example Profile →
                    </button>
                 </div>
              </div>
           </div>

        </div>

      </div>
    </section>
  );
};
