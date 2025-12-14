
import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '../Button';
import { ButtonVariant } from '../../types';

export const ServicesHero: React.FC = () => {
  return (
    <section className="relative pt-24 pb-32 px-6 overflow-hidden">
      {/* Abstract Background Accent */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden z-0 pointer-events-none">
         <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-50/50 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        <div className="lg:col-span-5 space-y-8">
          <h1 className="font-serif text-6xl md:text-7xl leading-[1.1]">
            Creative Services Built for <br/> <span className="italic text-purple-600">Modern Fashion.</span>
          </h1>
          <p className="text-xl text-gray-500 font-light max-w-lg leading-relaxed">
            We blend high-fashion aesthetics with digital performance and AI-powered efficiency to elevate your brand.
          </p>
          <div className="flex gap-4 pt-4">
            <Button>View Portfolio</Button>
            <Button variant={ButtonVariant.SECONDARY}>Get a Quote</Button>
          </div>
        </div>
        
        <div className="lg:col-span-7 h-[600px] hidden lg:flex gap-6 items-start justify-end">
           <div className="w-1/3 pt-12 space-y-6 animate-in slide-in-from-bottom-10 duration-1000">
              <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2940&auto=format&fit=crop" className="w-full h-[300px] object-cover rounded-sm shadow-lg hover:shadow-xl transition-all" alt="Editorial" />
              <div className="p-4 bg-gray-50 rounded-sm">
                 <p className="font-serif italic text-lg">"Visionary."</p>
              </div>
           </div>
           <div className="w-1/3 space-y-6 animate-in slide-in-from-bottom-20 duration-1000 delay-200">
              <img src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=2940&auto=format&fit=crop" className="w-full h-[400px] object-cover rounded-sm shadow-lg hover:shadow-xl transition-all" alt="Fashion" />
           </div>
           <div className="w-1/3 pt-24 space-y-6 animate-in slide-in-from-bottom-10 duration-1000 delay-300">
              <img src="https://images.unsplash.com/photo-1550614000-4b9519e02d48?q=80&w=2788&auto=format&fit=crop" className="w-full h-[250px] object-cover rounded-sm shadow-lg hover:shadow-xl transition-all" alt="Detail" />
              <div className="aspect-square bg-black text-white p-6 flex flex-col justify-between rounded-sm">
                 <Sparkles className="w-6 h-6" />
                 <p className="text-xs uppercase tracking-widest font-bold">AI Powered</p>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};
