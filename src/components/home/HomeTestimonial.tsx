
import React from 'react';

export const HomeTestimonial: React.FC = () => {
  return (
    <section className="bg-black py-24 px-6 text-center">
       <div className="max-w-4xl mx-auto">
          <span className="text-6xl text-white font-serif">"</span>
          <h3 className="font-serif text-3xl md:text-4xl text-white leading-normal mb-8">
             We've trusted FashionOS Studio with our campaigns for 6+ years. They always deliver imagery that moves product.
          </h3>
          <div className="flex flex-col items-center">
             <p className="text-white font-bold text-sm tracking-widest uppercase mb-1">Cristina Álvarez</p>
             <p className="text-gray-500 text-xs uppercase tracking-widest">Creative Director, Atelier Eclipse</p>
             <div className="mt-8 text-xs text-gray-600 cursor-pointer hover:text-white transition-colors">See more client feedback →</div>
          </div>
       </div>
    </section>
  );
};
