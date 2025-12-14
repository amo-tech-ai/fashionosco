
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Button';
import { ButtonVariant } from '../../types';

export const HomeHero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative pt-12 pb-24 md:pt-24 md:pb-32 px-6 overflow-hidden">
      {/* Film Grain Texture Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
      
      {/* Abstract Floating Shapes */}
      <div className="absolute top-20 left-10 w-64 h-64 border border-gray-200 rounded-full opacity-20 animate-[spin_10s_linear_infinite] pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 border border-gray-100 rounded-full opacity-30 pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left: Text */}
        <div className="lg:col-span-5 space-y-8 relative z-10 animate-in slide-in-from-bottom-10 duration-1000">
          <span className="text-xs font-bold tracking-widest uppercase text-gray-500">FashionOS Studio</span>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.1] font-medium text-black">
            Exceptional fashion imagery. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Every time.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-md">
            Runway, campaigns, ecommerce, and editorial — we help fashion brands look as premium as they feel.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Button onClick={() => navigate('/services')}>Book a Discovery Call</Button>
            <Button variant={ButtonVariant.SECONDARY} onClick={() => navigate('/services')}>Explore Directory</Button>
          </div>
          <div className="pt-8 text-xs text-gray-400 space-y-1">
            <p>• Runway & backstage coverage</p>
            <p>• Ecommerce & lookbooks</p>
            <p>• Campaigns, video & social content</p>
          </div>
        </div>

        {/* Right: Editorial Collage with Entry Animation */}
        <div className="lg:col-span-7 relative h-[600px] hidden md:block animate-in fade-in duration-1000 delay-300">
           <div className="absolute top-0 right-0 w-2/3 h-4/5 overflow-hidden rounded-sm shadow-xl hover:shadow-2xl transition-shadow duration-500 group">
             <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2788&auto=format&fit=crop" alt="Fashion Editorial" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]" />
           </div>
           <div className="absolute bottom-0 left-12 w-1/2 h-3/5 overflow-hidden rounded-sm shadow-xl z-20 border-4 border-white group">
             <img src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=2946&auto=format&fit=crop" alt="Runway Model" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]" />
           </div>
           <div className="absolute top-20 left-0 w-1/3 h-1/3 overflow-hidden rounded-sm shadow-lg z-10 grayscale hover:grayscale-0 transition-all duration-500 group">
              <img src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=2940&auto=format&fit=crop" alt="Fashion Detail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]" />
           </div>
        </div>
      </div>
    </section>
  );
};
