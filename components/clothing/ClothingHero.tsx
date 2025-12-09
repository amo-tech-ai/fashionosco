import React, { useEffect, useRef } from 'react';
import { Button } from '../Button';

interface ClothingHeroProps {
  onContactClick: () => void;
}

export const ClothingHero: React.FC<ClothingHeroProps> = ({ onContactClick }) => {
  const heroRef = useRef<HTMLElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null); // Back
  const layer2Ref = useRef<HTMLDivElement>(null); // Mid
  const layer3Ref = useRef<HTMLDivElement>(null); // Front

  useEffect(() => {
    // Animation Loop Variables
    let animationFrameId: number;
    let currentScrollY = window.scrollY;
    let targetScrollY = window.scrollY;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position (-1 to 1)
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    // The Animation Loop (60fps)
    const animate = () => {
      // Linear Interpolation (Lerp) for smoothness
      const ease = 0.08; 
      
      currentScrollY += (targetScrollY - currentScrollY) * ease;
      currentMouseX += (targetMouseX - currentMouseX) * ease;
      currentMouseY += (targetMouseY - currentMouseY) * ease;

      // Apply transforms directly to DOM nodes
      if (layer1Ref.current) {
         // Back Layer: Subtle inverse movement + slight scroll parallax
         layer1Ref.current.style.transform = `translate3d(${currentMouseX * -15}px, ${currentMouseY * -15 + currentScrollY * 0.05}px, 0)`;
      }
      if (layer2Ref.current) {
         // Mid Layer: Moderate inverse movement + moderate scroll parallax
         layer2Ref.current.style.transform = `translate3d(${currentMouseX * -25}px, ${currentMouseY * -25 + currentScrollY * 0.1}px, 0)`;
      }
      if (layer3Ref.current) {
         // Front Layer: Strong inverse movement + inverse scroll parallax (creates depth)
         layer3Ref.current.style.transform = `translate3d(${currentMouseX * -40}px, ${currentMouseY * -40 + currentScrollY * -0.05}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Event Listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Start Loop
    animate();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section ref={heroRef} className="relative pt-32 pb-24 px-6 overflow-hidden min-h-[90vh] flex items-center">
      {/* Abstract Background Gradients */}
      <div className="absolute top-0 right-0 w-[60vw] h-[80vh] bg-gradient-to-b from-[#F6E9E4] to-[#EDE7FF] rounded-bl-[200px] opacity-60 -z-10 blur-3xl"></div>
      
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Text Content */}
        <div className="lg:col-span-5 space-y-8 animate-in slide-in-from-bottom-10 duration-1000">
          <h1 className="font-serif text-6xl md:text-8xl leading-[0.9] tracking-tight text-[#111111]">
            Clothing <br/>
            <span className="italic font-light text-[#555]">Photography.</span>
          </h1>
          
          <div className="flex items-center space-x-4 text-xs font-bold uppercase tracking-widest text-gray-500">
            <span>Creative</span>
            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
            <span>Pinned</span>
            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
            <span>Ghost Mannequin</span>
          </div>

          <h2 className="text-xl md:text-2xl font-light leading-relaxed text-gray-700 max-w-md border-l-2 border-[#E5D7A4] pl-6">
            Clothing and accessory photography that delivers results.
          </h2>

          <div className="pt-6">
            <Button onClick={onContactClick}>
              Get a Quote
            </Button>
          </div>
        </div>

        {/* Hero Collage with Enhanced Parallax (Refs) */}
        <div className="lg:col-span-7 relative h-[600px] hidden lg:block perspective-[1000px]">
           
           {/* Image 1: Main Right (Back Layer) */}
           <div 
              ref={layer1Ref}
              className="absolute top-0 right-10 w-[300px] aspect-[3/4] shadow-2xl z-20 will-change-transform"
           >
              <div className="w-full h-full overflow-hidden hover:-translate-y-4 hover:shadow-3xl transition-all duration-700 rounded-sm bg-white p-1">
                 <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2820&auto=format&fit=crop" className="w-full h-full object-cover" alt="Fashion Editorial" />
              </div>
           </div>

           {/* Image 2: Top Left (Mid Layer) */}
           <div 
              ref={layer2Ref}
              className="absolute top-20 left-10 w-[280px] aspect-[3/4] shadow-xl z-10 will-change-transform"
           >
              <div className="w-full h-full overflow-hidden hover:-translate-y-4 hover:scale-[1.02] transition-all duration-700 rounded-sm">
                  <img src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=2705&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Clothing Texture" />
              </div>
           </div>

           {/* Image 3: Bottom Right Detail (Front Layer) */}
           <div 
              ref={layer3Ref}
              className="absolute bottom-10 right-1/3 w-[240px] aspect-square shadow-lg z-30 will-change-transform"
           >
              <div className="w-full h-full overflow-hidden border-8 border-white hover:scale-105 transition-transform duration-700 rounded-sm">
                  <img src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=2864&auto=format&fit=crop" className="w-full h-full object-cover" alt="Detail Shot" />
              </div>
           </div>

        </div>
      </div>
    </section>
  );
};