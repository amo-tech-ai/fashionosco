
import React from 'react';

interface LogoStripProps {
  dark?: boolean;
}

export const LogoStrip: React.FC<LogoStripProps> = ({ dark = false }) => {
  const bgClass = dark ? "bg-[#111111] text-white" : "bg-[#F7F5F3] text-[#111111]";
  
  return (
    <section className={`py-24 px-6 ${bgClass} border-t ${dark ? 'border-gray-800' : 'border-gray-100'}`}>
       <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 text-center">
             <h3 className="text-2xl font-serif font-bold tracking-widest">CHANEL</h3>
             <h3 className="text-2xl font-serif font-black tracking-widest">GUCCI</h3>
             <h3 className="text-2xl font-sans font-bold tracking-[0.2em]">PRADA</h3>
             <h3 className="text-2xl font-serif font-bold tracking-widest">DIOR</h3>
             <h3 className="text-2xl font-sans font-light tracking-[0.3em]">VERSACE</h3>
             <h3 className="text-2xl font-serif italic font-bold">Burberry</h3>
             <h3 className="text-xl font-mono font-bold">ASOS</h3>
          </div>
       </div>
    </section>
  );
};
