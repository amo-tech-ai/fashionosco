
import React, { useEffect, useRef } from 'react';
import { Button } from '../Button';
import { ButtonVariant } from '../../types';
import { Play } from 'lucide-react';

export const InstagramHero: React.FC = () => {
  const backRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    
    // State variables for Lerp
    let currentScrollY = window.scrollY;
    let targetScrollY = window.scrollY;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const onScroll = () => {
      targetScrollY = window.scrollY;
    };

    const onMouseMove = (e: MouseEvent) => {
      // Normalize mouse position (-1 to 1)
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const updateParallax = () => {
      // Linear Interpolation (Lerp) for smoothness (0.08 = weight)
      const ease = 0.08;
      currentScrollY += (targetScrollY - currentScrollY) * ease;
      currentMouseX += (targetMouseX - currentMouseX) * ease;
      currentMouseY += (targetMouseY - currentMouseY) * ease;

      if (backRef.current) {
        // Back layer: Slow scroll, subtle mouse movement
        backRef.current.style.transform = `translate3d(${currentMouseX * -10}px, ${currentScrollY * 0.05 + currentMouseY * -10}px, 0) rotate(-2deg)`;
      }
      if (midRef.current) {
        // Mid layer: Medium scroll, moderate mouse movement
        midRef.current.style.transform = `translate3d(${currentMouseX * -20}px, ${currentScrollY * -0.03 + currentMouseY * -20}px, 0) rotate(3deg)`;
      }
      if (frontRef.current) {
        // Front layer: Fast scroll, strong mouse movement for depth
        frontRef.current.style.transform = `translate3d(${currentMouseX * -30}px, ${currentScrollY * 0.08 + currentMouseY * -30}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove);
    updateParallax();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative pt-32 pb-24 px-6 min-h-[90vh] flex items-center overflow-hidden bg-[#FDFCFB] instagram-hero">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[50vw] h-[80vh] bg-gradient-to-b from-purple-50/50 to-blue-50/30 rounded-bl-[100px] -z-10 blur-3xl opacity-60"></div>

      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Content */}
        <div className="space-y-8 z-10">
          <div className="overflow-hidden">
            <h1 className="font-serif text-5xl md:text-7xl leading-[1.1] text-primary animate-in slide-in-from-bottom-8 duration-700">
              Instagram Content That <br/>
              <span className="italic font-light text-gray-500">Drives Reach,</span><br/>
              Trust & Sales.
            </h1>
          </div>
          
          <p className="text-xl text-gray-600 font-light leading-relaxed max-w-md animate-in slide-in-from-bottom-8 duration-700 delay-100">
            High-impact visuals that stop the scroll, grow your brand, and convert viewers into buyers.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4 animate-in slide-in-from-bottom-8 duration-700 delay-200">
            <Button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Start Your Instagram Project</Button>
            <Button variant={ButtonVariant.GHOST} onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}>View Portfolio</Button>
          </div>

          {/* Glassmorphism Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/40 backdrop-blur-md border border-white/60 rounded-full shadow-sm animate-in fade-in duration-1000 delay-500 hover:bg-white/60 transition-colors cursor-default">
            <div className="flex -space-x-2">
               {[1,2,3].map(i => (
                 <div key={i} className="w-6 h-6 rounded-full bg-gray-200 border border-white overflow-hidden">
                    <img src={`https://images.unsplash.com/photo-${i === 1 ? '1534528741775-53994a69daeb' : i === 2 ? '1506794778202-cad84cf45f1d' : '1507003211169-0a1dd7228f2d'}?q=80&w=100&auto=format&fit=crop`} className="w-full h-full object-cover" alt="Profile" />
                 </div>
               ))}
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-600">+40% Engagement Avg.</span>
          </div>
        </div>

        {/* Right: Parallax Collage */}
        <div className="relative h-[600px] hidden lg:block perspective-[1000px] pointer-events-none">
          {/* Back Image */}
          <div 
            ref={backRef}
            className="absolute top-0 right-10 w-[320px] aspect-[4/5] shadow-2xl rounded-sm z-10 will-change-transform"
          >
            <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2874&auto=format&fit=crop" className="w-full h-full object-cover rounded-sm" alt="Lifestyle" />
          </div>

          {/* Middle Image */}
          <div 
            ref={midRef}
            className="absolute top-20 left-10 w-[280px] aspect-[4/5] shadow-xl rounded-sm z-20 border-4 border-white will-change-transform"
          >
            <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2820&auto=format&fit=crop" className="w-full h-full object-cover rounded-sm" alt="Fashion" />
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

          {/* Front Image (Video Preview) */}
          <div 
            ref={frontRef}
            className="absolute bottom-10 right-1/2 translate-x-12 w-[240px] aspect-[9/16] shadow-2xl rounded-xl z-30 border-4 border-black bg-black overflow-hidden will-change-transform"
          >
             <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop" className="w-full h-full object-cover opacity-90" alt="Reel" />
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center border border-white/30 animate-pulse">
                   <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
