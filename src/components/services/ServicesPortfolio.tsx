
import React, { useState } from 'react';
import { Button } from '../Button';
import { ButtonVariant } from '../../types';

export const ServicesPortfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const portfolioItems = [
    { cat: "Photo", img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2788&auto=format&fit=crop" },
    { cat: "Web", img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf7d?q=80&w=2938&auto=format&fit=crop" },
    { cat: "Video", img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2942&auto=format&fit=crop" },
    { cat: "AI", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2865&auto=format&fit=crop" },
    { cat: "Ecommerce", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2899&auto=format&fit=crop" },
    { cat: "Social", img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2874&auto=format&fit=crop" },
  ];

  return (
    <section className="py-24 px-6 max-w-[1440px] mx-auto">
       <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
             <h2 className="font-serif text-4xl mb-6">Selected Works</h2>
             <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-widest">
                {['All', 'Photo', 'Video', 'Web', 'Ecommerce', 'AI'].map(f => (
                   <button 
                      key={f} 
                      onClick={() => setActiveFilter(f)}
                      className={`px-3 py-1 rounded-full border transition-colors ${activeFilter === f ? 'bg-black text-white border-black' : 'border-gray-200 text-gray-500 hover:border-black hover:text-black'}`}
                   >
                      {f}
                   </button>
                ))}
             </div>
          </div>
       </div>

       <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {portfolioItems.map((item, i) => (
             <div key={i} className="relative group overflow-hidden rounded-sm break-inside-avoid cursor-pointer">
                <img src={item.img} className="w-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-100 group-hover:brightness-75" alt="Portfolio" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <Button variant={ButtonVariant.SECONDARY} className="bg-transparent text-white border-white hover:bg-white hover:text-black">View Project</Button>
                </div>
                <div className="absolute top-4 left-4">
                   <span className="bg-black/50 backdrop-blur text-white px-2 py-1 text-[10px] uppercase font-bold rounded-sm">{item.cat}</span>
                </div>
             </div>
          ))}
       </div>
    </section>
  );
};
