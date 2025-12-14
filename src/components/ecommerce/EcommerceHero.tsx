
import React from 'react';
import { Button } from '../Button';

export const EcommerceHero: React.FC = () => {
  const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative pt-32 pb-24 px-6 min-h-[90vh] flex items-center overflow-hidden bg-white">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8 animate-in slide-in-from-left duration-1000">
           <h1 className="font-serif text-6xl md:text-7xl leading-[1.1] text-[#111111]">
              Drive Sales with our <br/>
              <span className="italic text-gray-500">Ecommerce Photography.</span>
           </h1>
           <p className="text-xl text-gray-600 font-light leading-relaxed max-w-md border-l-2 border-[#E5D7A4] pl-6">
              Achieve your marketing objectives. Creating bold, cost-effective ecommerce content.
           </p>
           <div className="pt-6">
              <Button onClick={scrollToContact}>Request a Quote</Button>
           </div>
        </div>

        <div className="relative h-[600px] hidden lg:block animate-in fade-in duration-1000 delay-300">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[500px] shadow-2xl z-10">
              <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2940&auto=format&fit=crop" className="w-full h-full object-cover" alt="Fashion Ecommerce" />
           </div>
           
           <div className="absolute top-10 right-0 w-[200px] aspect-[3/4] shadow-xl z-20 animate-[bounce_6s_infinite] hover:z-30 transition-all">
              <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2940&auto=format&fit=crop" className="w-full h-full object-cover" alt="Shoe Product" />
           </div>
           <div className="absolute bottom-20 left-0 w-[220px] aspect-square shadow-xl z-20 border-8 border-white animate-[pulse_4s_infinite]">
              <img src="https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=2787&auto=format&fit=crop" className="w-full h-full object-cover" alt="Accessories" />
           </div>
        </div>
      </div>
    </section>
  );
};
