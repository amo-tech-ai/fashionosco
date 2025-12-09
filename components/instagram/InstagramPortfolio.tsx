
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const InstagramPortfolio: React.FC = () => {
  const images = [
    "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=2787&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=2787&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2940&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=2787&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1571781348782-95c4a1e50666?q=80&w=2938&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555664424-778a69fdb3b8?q=80&w=2864&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1594234568858-a5c9f50f3b9e?q=80&w=2835&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=2864&auto=format&fit=crop"
  ];

  return (
    <section className="py-32 px-6 bg-white reveal-on-scroll" id="portfolio">
       <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-16">
             <h2 className="font-serif text-4xl md:text-5xl mb-4">See the Results.</h2>
             <p className="text-gray-500 font-light">Recent work for fashion and lifestyle brands.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {images.map((src, i) => (
                <div key={i} className="group relative aspect-[4/5] overflow-hidden rounded-lg cursor-pointer bg-gray-100">
                   <img src={src} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out" loading="lazy" />
                   <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                         <ArrowUpRight className="w-5 h-5 text-black" />
                      </div>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
};
