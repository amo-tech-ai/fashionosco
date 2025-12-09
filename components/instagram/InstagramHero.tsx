
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../Button';
import { ButtonVariant } from '../../types';
import { Play } from 'lucide-react';

export const InstagramHero: React.FC = () => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative pt-32 pb-24 px-6 min-h-[90vh] flex items-center overflow-hidden bg-[#FDFCFB]">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[50vw] h-[80vh] bg-gradient-to-b from-purple-50/50 to-blue-50/30 rounded-bl-[100px] -z-10 blur-3xl opacity-60"></div>

      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Content */}
        <div className="space-y-8 z-10">
          <div className="overflow-hidden">
            <h1 className="font-serif text-5xl md:text-7xl leading-[1.1] text-rich-black animate-in slide-in-from-bottom-8 duration-700">
              Instagram Content That <br/>
              <span className="italic font-light text-gray-500">Drives Reach,</span><br/>
              Trust & Sales.
            </h1>
          </div>
          
          <p className="text-xl text-gray-600 font-light leading-relaxed max-w-md animate-in slide-in-from-bottom-8 duration-700 delay-100">
            High-impact visuals that stop the scroll, grow your brand, and convert viewers into buyers.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4 animate-in slide-in-from-bottom-8 duration-700 delay-200">
            <Button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Start Your Instagram Project</Button>
            <Button variant={ButtonVariant.GHOST} onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}>View Portfolio</Button>
          </div>

          {/* Glassmorphism Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/40 backdrop-blur-md border border-white/60 rounded-full shadow-sm animate-in fade-in duration-1000 delay-500">
            <div className="flex -space-x-2">
               {[1,2,3].map(i => (
                 <div key={i} className="w-6 h-6 rounded-full bg-gray-200 border border-white"></div>
               ))}
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-600">+40% Engagement Avg.</span>
          </div>
        </div>

        {/* Right: Parallax Collage */}
        <div className="relative h-[600px] hidden lg:block perspective-[1000px]">
          {/* Back Image */}
          <div 
            className="absolute top-0 right-10 w-[320px] aspect-[4/5] shadow-2xl rounded-sm z-10 transition-transform duration-1000 ease-out"
            style={{ transform: `translateY(${offsetY * 0.05}px) rotate(-2deg)` }}
          >
            <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2874&auto=format&fit=crop" className="w-full h-full object-cover rounded-sm" alt="Lifestyle" />
          </div>

          {/* Middle Image */}
          <div 
            className="absolute top-20 left-10 w-[280px] aspect-[4/5] shadow-xl rounded-sm z-20 border-4 border-white transition-transform duration-1000 ease-out"
            style={{ transform: `translateY(${offsetY * -0.03}px) rotate(3deg)` }}
          >
            <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2820&auto=format&fit=crop" className="w-full h-full object-cover rounded-sm" alt="Fashion" />
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

          {/* Front Image (Video Preview) */}
          <div 
            className="absolute bottom-10 right-1/2 translate-x-12 w-[240px] aspect-[9/16] shadow-2xl rounded-xl z-30 border-4 border-black bg-black overflow-hidden transition-transform duration-1000 ease-out hover:scale-105"
            style={{ transform: `translateY(${offsetY * 0.08}px)` }}
          >
             <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop" className="w-full h-full object-cover opacity-90" alt="Reel" />
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center border border-white/30">
                   <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
