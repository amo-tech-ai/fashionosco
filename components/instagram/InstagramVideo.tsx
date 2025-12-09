
import React, { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';

export const InstagramVideo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    let animationFrameId: number;
    let isTicking = false;

    const handleScroll = () => {
       if (!isTicking) {
          animationFrameId = requestAnimationFrame(() => {
             updateActiveCard();
             isTicking = false;
          });
          isTicking = true;
       }
    };

    const updateActiveCard = () => {
       if (!containerRef.current) return;
       
       const cards = containerRef.current.querySelectorAll('.video-card');
       const viewportCenter = window.innerHeight / 2;

       let minDistance = Infinity;
       let closestIndex = -1;

       cards.forEach((card, idx) => {
          const rect = card.getBoundingClientRect();
          const cardCenter = rect.top + rect.height / 2;
          const distance = Math.abs(viewportCenter - cardCenter);

          // Threshold for "active" state
          if (distance < minDistance && distance < 450) { 
             minDistance = distance;
             closestIndex = idx;
          }
       });

       if (closestIndex !== activeIndex) {
          setActiveIndex(closestIndex);
       }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    updateActiveCard();

    return () => {
       window.removeEventListener('scroll', handleScroll);
       cancelAnimationFrame(animationFrameId);
    };
  }, [activeIndex]);

  const videos = [
    { title: "Reels Production", sub: "Trends & Audio", img: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=2774&auto=format&fit=crop" },
    { title: "Stories Video", sub: "Behind the Scenes", img: "https://images.unsplash.com/photo-1516961642265-531546e84af2?q=80&w=800&auto=format&fit=crop" },
    { title: "Product Demos", sub: "Features & Benefits", img: "https://images.unsplash.com/photo-1556228720-19de77ee542e?q=80&w=2787&auto=format&fit=crop" },
    { title: "UGC-Style", sub: "Authentic Reviews", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2940&auto=format&fit=crop" },
    { title: "Carousel Video", sub: "Seamless Swipes", img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2940&auto=format&fit=crop" },
    { title: "Ads Video", sub: "High Conversion", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop" },
  ];

  return (
    <section className="py-32 px-6 bg-[#111111] text-white overflow-hidden reveal-on-scroll instagram-video">
       <div className="max-w-[1440px] mx-auto">
          <div className="mb-16 flex justify-between items-end">
             <div>
                <h2 className="font-serif text-4xl mb-4">Instagram Video</h2>
                <p className="text-gray-400 font-light">Vertical, viral, and valuable.</p>
             </div>
             <div className="hidden md:block text-xs font-bold uppercase tracking-widest text-gray-500">
                Optimized 9:16
             </div>
          </div>

          <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {videos.map((vid, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <div 
                     key={idx} 
                     className={`video-card relative aspect-[9/16] rounded-xl overflow-hidden cursor-pointer transition-all duration-700 ease-out group ${isActive ? 'scale-100 opacity-100 ring-1 ring-purple-500/50 shadow-2xl shadow-purple-900/30' : 'scale-95 opacity-50 grayscale hover:grayscale-0'}`}
                  >
                     <img src={vid.img} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1.5s]" alt={vid.title} />
                     
                     {/* Gradient Overlay */}
                     <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-80'}`}></div>
                     
                     {/* Play Button - Pulsing when active */}
                     <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className={`w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border transition-all duration-700 ${isActive ? 'scale-110 border-white/80 animate-[pulse-scale_2s_ease-in-out_infinite]' : 'scale-90 opacity-60 border-white/20'}`}>
                           <Play className="w-6 h-6 text-white fill-white ml-1" />
                        </div>
                     </div>

                     {/* Active Video Card Overlay - Glass Panel */}
                     <div className={`absolute bottom-6 left-6 right-6 transition-all duration-700 transform ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-lg shadow-lg">
                           <h3 className="font-bold text-lg mb-1">{vid.title}</h3>
                           <p className="text-xs text-gray-300 uppercase tracking-widest">{vid.sub}</p>
                           {isActive && (
                              <div className="h-0.5 bg-white/20 mt-3 rounded-full overflow-hidden">
                                 <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-1/2 animate-[loading-bar_3s_ease-in-out_infinite]"></div>
                              </div>
                           )}
                        </div>
                     </div>
                  </div>
                );
             })}
          </div>
       </div>
    </section>
  );
};
