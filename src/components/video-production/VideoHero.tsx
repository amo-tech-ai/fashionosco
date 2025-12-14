
import React, { useEffect, useState } from 'react';
import { Button } from '../Button';
import { ButtonVariant } from '../../types';
import { Play } from 'lucide-react';

export const VideoHero: React.FC = () => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative pt-32 pb-24 px-6 min-h-[90vh] flex items-center overflow-hidden">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Text */}
        <div className="space-y-8 animate-in slide-in-from-bottom-10 duration-1000 z-10">
          <h1 className="font-serif text-6xl md:text-8xl leading-[0.9] tracking-tight text-[#111111]">
            FashionOS <br/>
            <span className="italic font-light text-gray-400">Video.</span>
          </h1>
          <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-600 max-w-md border-l-2 border-black pl-6">
            Cinematic, conversion-driven video creative for fashion, beauty, and ecommerce brands.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Book Video Project
            </Button>
            <Button variant={ButtonVariant.SECONDARY} className="bg-transparent border-black text-black hover:bg-black hover:text-white">
              View Recent Work
            </Button>
          </div>
        </div>

        {/* Right: Collage */}
        <div className="relative h-[600px] hidden lg:block">
          {/* Main Hero Frame */}
          <div 
            className="absolute top-0 right-0 w-[400px] aspect-[9/16] shadow-2xl z-10 overflow-hidden rounded-sm group"
            style={{ transform: `translateY(${offsetY * 0.05}px)` }}
          >
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Fashion Film Model" />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center border border-white/40">
                 <Play className="fill-white text-white ml-1" />
              </div>
            </div>
          </div>
          
          {/* Secondary Frame */}
          <div 
            className="absolute top-20 left-10 w-[300px] aspect-video shadow-xl z-20 border-4 border-[#FAF8F5] overflow-hidden rounded-sm group"
            style={{ transform: `translateY(${offsetY * -0.05}px)` }}
          >
            <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2942&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Cinematic Set" />
          </div>

          {/* Accent Frame */}
          <div 
            className="absolute bottom-10 right-[350px] w-[220px] aspect-square shadow-lg z-30 overflow-hidden rounded-sm group"
            style={{ transform: `translateY(${offsetY * 0.08}px)` }}
          >
             <img src="https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=2835&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="Abstract Texture" />
          </div>
        </div>
      </div>
    </section>
  );
};
