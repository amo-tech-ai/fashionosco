
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const HomeMarketplace: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="py-24 px-6 max-w-[1440px] mx-auto">
       <div className="text-center mb-16">
           <span className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-2 block">Packages</span>
           <h2 className="font-serif text-4xl font-medium">Fashion Marketplace.</h2>
           <p className="text-gray-500 mt-4 max-w-xl mx-auto">Ready-made packages for emerging and established brands.</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative group overflow-hidden rounded-lg aspect-square">
             <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2874&auto=format&fit=crop" alt="Lookbook" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
                <h3 className="font-serif text-2xl mb-1">Lookbook Starter</h3>
                <p className="text-sm text-gray-300 mb-4">$2,500</p>
                <button onClick={() => navigate('/marketplace')} className="bg-white text-black py-2 px-4 text-xs font-bold uppercase tracking-widest opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">View Package</button>
             </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg aspect-square">
             <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2940&auto=format&fit=crop" alt="Campaign" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
                <h3 className="font-serif text-2xl mb-1">Campaign Launch</h3>
                <p className="text-sm text-gray-300 mb-4">$5,800</p>
                <button onClick={() => navigate('/marketplace')} className="bg-white text-black py-2 px-4 text-xs font-bold uppercase tracking-widest opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">View Package</button>
             </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg aspect-square">
             <img src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=2942&auto=format&fit=crop" alt="Ecommerce" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
                <h3 className="font-serif text-2xl mb-1">Ecommerce Scale</h3>
                <p className="text-sm text-gray-300 mb-4">Custom Quote</p>
                <button onClick={() => navigate('/marketplace')} className="bg-white text-black py-2 px-4 text-xs font-bold uppercase tracking-widest opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">View Package</button>
             </div>
          </div>
       </div>
    </section>
  );
};
