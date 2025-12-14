
import React from 'react';
import { Button } from '../Button';
import { ButtonVariant } from '../../types';
import { CheckCircle } from 'lucide-react';

export const VideoProcess: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        <div className="space-y-8 animate-in slide-in-from-left duration-1000">
           <span className="text-xs font-bold tracking-widest uppercase text-gray-400">End-to-End Production</span>
           <h2 className="font-serif text-5xl md:text-6xl text-[#111111] leading-tight">Concept to Completion.</h2>
           <p className="text-xl text-gray-500 font-light leading-relaxed">
              We produce high-impact video content designed for clarity, emotion, and conversion. Our team manages everything — scripting, set design, filming, editing, and delivery.
           </p>
           <ul className="space-y-4 pt-4">
              {['Storyboarding & Scripting', 'Casting & Location Scouting', '4K Cinema Camera Production', 'Color Grading & Sound Design'].map((item, i) => (
                 <li key={i} className="flex items-center text-sm font-medium text-gray-700">
                    <CheckCircle className="w-4 h-4 mr-3 text-black" />
                    {item}
                 </li>
              ))}
           </ul>
           <div className="pt-6">
              <Button variant={ButtonVariant.SECONDARY} onClick={() => document.getElementById('types')?.scrollIntoView({ behavior: 'smooth' })}>Explore Services</Button>
           </div>
        </div>

        <div className="relative h-[600px] w-full overflow-hidden rounded-sm group">
           <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div>
           <img src="https://images.unsplash.com/photo-1579632652768-6cb9dcf85912?q=80&w=2786&auto=format&fit=crop" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000" alt="Production Set" />
           <div className="absolute bottom-8 left-8 z-20">
              <p className="text-white font-mono text-xs uppercase tracking-widest bg-black/50 backdrop-blur px-3 py-1 inline-block">Shot on RED Komodo</p>
           </div>
        </div>
      </div>
    </section>
  );
};
