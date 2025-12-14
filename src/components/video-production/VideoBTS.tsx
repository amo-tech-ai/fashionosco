
import React from 'react';
import { Button } from '../Button';
import { Play } from 'lucide-react';

export const VideoBTS: React.FC = () => {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden group">
       <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed transition-transform duration-[3s] group-hover:scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2942&auto=format&fit=crop')" }}
       ></div>
       <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-700"></div>
       
       <div className="relative z-10 text-center text-white space-y-8 px-6">
          <h2 className="font-serif text-5xl md:text-7xl leading-tight animate-in slide-in-from-bottom-8 duration-1000">Behind the Scenes.</h2>
          <p className="text-xl font-light text-gray-200 max-w-xl mx-auto animate-in slide-in-from-bottom-8 duration-1000 delay-200">
             A look into our production craft — lighting, motion, styling, and story.
          </p>
          <div className="pt-4 animate-in slide-in-from-bottom-8 duration-1000 delay-400">
             <Button className="bg-white text-black hover:bg-white/90 border-none px-8 py-4 text-xs font-bold uppercase tracking-widest">
                <Play className="w-4 h-4 mr-2 fill-black inline-block" /> Watch BTS Reel
             </Button>
          </div>
       </div>
    </section>
  );
};
