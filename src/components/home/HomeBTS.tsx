
import React from 'react';
import { Play } from 'lucide-react';

export const HomeBTS: React.FC = () => {
  return (
    <section className="relative h-[80vh] bg-fixed bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2942&auto=format&fit=crop')" }}>
       <div className="absolute inset-0 bg-black/40"></div>
       <div className="relative z-10 text-center text-white">
           <div className="w-20 h-20 rounded-full border-2 border-white flex items-center justify-center mx-auto mb-8 cursor-pointer hover:bg-white hover:text-black transition-colors duration-300">
              <Play className="w-8 h-8 ml-1" fill="currentColor" />
           </div>
           <h2 className="font-serif text-5xl md:text-7xl mb-4">Behind the scenes.</h2>
           <p className="text-xl max-w-md mx-auto opacity-90">Take a peek at how we plan, light, and shoot your campaigns.</p>
           <div className="mt-8">
             <button className="bg-white text-black px-8 py-3 text-xs font-bold uppercase tracking-widest">Watch The Studio Tour</button>
           </div>
       </div>
    </section>
  );
};
