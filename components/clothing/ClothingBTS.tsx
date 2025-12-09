import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight, Instagram } from 'lucide-react';

export const ClothingBTS: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const images = [
    "https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=2787&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1520692867807-631586529738?q=80&w=2787&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1472506229562-67891c3da632?q=80&w=2938&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2942&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1516961642265-531546e84af2?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1485322551179-963c5054291b?q=80&w=800&auto=format&fit=crop"
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      // Scroll by width of one card approx (350px) plus gap
      const scrollAmount = 350 + 24; 
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-24 px-6 bg-[#F7F5F3] reveal-on-scroll">
       <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
             <div>
                <h2 className="font-serif text-3xl md:text-4xl mb-2">Behind the Scenes.</h2>
                <p className="text-gray-500 font-light">
                   A glimpse into our production process and studio life.
                </p>
             </div>
             
             <div className="flex items-center gap-6">
                <a href="#" className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
                   <Instagram size={16} /> @FashionOS_Studio
                </a>
                <div className="flex gap-2">
                   <button 
                      onClick={() => scroll('left')}
                      className="w-12 h-12 border border-gray-200 bg-white rounded-full flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-300 shadow-sm"
                      aria-label="Scroll left"
                   >
                      <ArrowLeft size={18} />
                   </button>
                   <button 
                      onClick={() => scroll('right')}
                      className="w-12 h-12 border border-gray-200 bg-white rounded-full flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-300 shadow-sm"
                      aria-label="Scroll right"
                   >
                      <ArrowRight size={18} />
                   </button>
                </div>
             </div>
          </div>

          <div 
             ref={scrollRef}
             className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 -mx-6 px-6 md:mx-0 md:px-0 hide-scrollbar"
          >
             {images.map((src, i) => (
                <div 
                   key={i} 
                   className="min-w-[280px] md:min-w-[350px] aspect-square relative group overflow-hidden cursor-pointer snap-start rounded-sm bg-gray-200 flex-shrink-0"
                >
                   <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur text-black px-6 py-3 text-xs font-bold uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                         View Post
                      </div>
                   </div>
                   <img 
                      src={src} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[800ms] ease-out" 
                      alt={`Behind the Scenes ${i + 1}`} 
                      loading="lazy"
                   />
                </div>
             ))}
          </div>
       </div>
    </section>
  );
};