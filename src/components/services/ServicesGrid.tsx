
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Video, ShoppingBag, Instagram, Monitor, Sparkles } from 'lucide-react';

export const ServicesGrid: React.FC = () => {
  const navigate = useNavigate();
  
  const servicesList = [
    { icon: Monitor, title: "Web Design", desc: "Identity & UX", link: "/services" },
    { icon: Camera, title: "Photography", desc: "Campaign & Editorial", link: "/services/product-photography" },
    { icon: Video, title: "Video Production", desc: "Commercial & Reels", link: "/services/video-production" },
    { icon: ShoppingBag, title: "E-Commerce", desc: "CRO & Listings", link: "/services/ecommerce" },
    { icon: Instagram, title: "Social Media", desc: "Strategy & Content", link: "/services/instagram" },
    { icon: Sparkles, title: "AI Creative", desc: "Enhancement & GenAI", link: "/services" },
  ];

  return (
    <section className="px-6 pb-32">
      <div className="max-w-[1440px] mx-auto">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
           {servicesList.map((s, i) => (
             <div 
                key={i} 
                onClick={() => navigate(s.link)}
                className="group p-8 border border-gray-100 rounded-lg bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
             >
               <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors">
                 <s.icon size={20} />
               </div>
               <h3 className="font-bold text-base mb-2">{s.title}</h3>
               <p className="text-xs text-gray-500 uppercase tracking-widest">{s.desc}</p>
             </div>
           ))}
         </div>
      </div>
    </section>
  );
};
