
import React from 'react';
import { Camera, Scissors, ShoppingBag, Video, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HomeServices: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="py-32 px-6 max-w-[1440px] mx-auto">
      <div className="flex justify-between items-end mb-16">
         <div>
            <span className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-2 block">What We Do</span>
            <h2 className="font-serif text-4xl font-medium">Creative Services</h2>
         </div>
         <a href="/services" className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-600">View All Services</a>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200">
         {[
            { icon: Camera, title: "Campaigns", desc: "Editorial-quality campaigns for new launches and seasonal stories." },
            { icon: Scissors, title: "Runway", desc: "On-the-ground coverage that captures energy, details, and atmosphere." },
            { icon: ShoppingBag, title: "Ecommerce", desc: "High-volume, consistent imagery optimized for online sales." },
            { icon: Video, title: "Video & Social", desc: "Short-form video, reels, and behind-the-scenes content for social." },
         ].map((service, idx) => (
            <div 
               key={idx} 
               onClick={() => navigate('/services')}
               className="bg-white p-10 hover:bg-gray-50 transition-colors group h-full flex flex-col justify-between cursor-pointer"
            >
               <div>
                  <div className="w-10 h-10 mb-6 text-gray-400 group-hover:text-black transition-colors">
                     <service.icon strokeWidth={1.5} />
                  </div>
                  <h3 className="font-bold text-lg mb-3">{service.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-8">{service.desc}</p>
               </div>
               <div className="flex items-center text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                  View Details <ArrowRight className="w-3 h-3 ml-2" />
               </div>
            </div>
         ))}
      </div>
    </section>
  );
};
