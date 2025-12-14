
import React, { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { ButtonVariant } from '../types';
import { ContactSection } from '../components/common/ContactSection';
import { LogoStrip } from '../components/common/LogoStrip';
import { ClothingBTS } from '../components/clothing/ClothingBTS';
import { Play } from 'lucide-react';

export const CreativeStillLife: React.FC = () => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#FAF8F5] text-[#111111] font-sans selection:bg-black selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-24 px-6 min-h-[90vh] flex items-center overflow-hidden">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-10 animate-in slide-in-from-bottom-10 duration-1000">
            <h1 className="font-serif text-6xl md:text-8xl leading-[0.9] tracking-tight text-[#111111]">
              Creative <br/>
              <span className="italic font-light text-gray-400">Still-Life.</span>
            </h1>
            <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-600 max-w-md border-l-2 border-black pl-6">
              Pushing your brand to new limits, we offer full-scale, end-to-end creative productions that deliver beautiful, eye-catching, bold, creative content.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Recent Work
              </Button>
              <Button variant={ButtonVariant.SECONDARY} className="bg-transparent border-black text-black hover:bg-black hover:text-white" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Request a Quote
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7 relative h-[600px] hidden lg:block">
            <div 
              className="absolute top-0 right-0 w-[400px] aspect-[4/5] shadow-2xl z-10 transition-transform duration-700 hover:-translate-y-2"
              style={{ transform: `translateY(${offsetY * 0.05}px)` }}
            >
              <img src="https://images.unsplash.com/photo-1615655406736-b37c4fabf923?q=80&w=2940&auto=format&fit=crop" className="w-full h-full object-cover" alt="Luxury Perfume" />
            </div>
            <div 
              className="absolute top-20 left-10 w-[250px] aspect-square shadow-xl z-20 border-8 border-[#FAF8F5] transition-transform duration-1000 delay-100 hover:-translate-y-2"
              style={{ transform: `translateY(${offsetY * -0.05}px)` }}
            >
              <img src="https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=2787&auto=format&fit=crop" className="w-full h-full object-cover" alt="Cosmetic Texture" />
            </div>
            <div 
              className="absolute bottom-0 right-[350px] w-[200px] aspect-[3/4] shadow-lg z-30 transition-transform duration-1000 delay-200 hover:-translate-y-2"
              style={{ transform: `translateY(${offsetY * 0.08}px)` }}
            >
               <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2727&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="Drink" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. UNLOCK POTENTIAL (Grid Content) */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-10 sticky top-32 self-start animate-in slide-in-from-left duration-1000">
            <h2 className="font-serif text-5xl md:text-6xl text-[#111111] leading-tight">
              Unlock your brand's full potential.
            </h2>
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-light">
              <p>
                With decades of experience, our still-life photographers are able to produce eye-catching, captivating still life imagery for your next campaign.
              </p>
              <p>
                Our reputation of producing high-quality work for our clients never waivers and we continue to produce commercial imagery for many clients in the following industries:
              </p>
              <ul className="space-y-2 font-medium text-black pt-4">
                {['Beauty, Fragrances & Cosmetic', 'Beverage', 'High-end Fashion Labels', 'Homeware'].map((item) => (
                  <li key={item} className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-black rounded-full mr-3"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <p>
                We understand that our photography plays an integral part in your marketing goals. We can deliver a standard of imagery that gets your brand noticed.
              </p>
            </div>
            <div className="pt-6">
              <Button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Request a Quote</Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
             {[
                "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=2804&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=2787&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?q=80&w=2940&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1555664424-778a69fdb3b8?q=80&w=2864&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1563170351-be82bc888aa4?q=80&w=2836&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=2784&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1616486029423-aaa478965c96?q=80&w=2940&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1594234568858-a5c9f50f3b9e?q=80&w=2835&auto=format&fit=crop"
             ].map((src, idx) => (
                <div key={idx} className={`relative overflow-hidden rounded-sm bg-gray-100 group cursor-pointer hover:shadow-xl transition-all duration-300 ${idx === 1 ? 'row-span-2' : 'aspect-square'}`}>
                   <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                   <img src={src} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out" alt="Portfolio" />
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* 3. BEYOND PACKSHOTS */}
      <section className="py-32 px-6 bg-[#111111] text-white">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div className="grid grid-cols-2 gap-8 relative">
              <div 
                 className="aspect-[3/4] overflow-hidden rounded-sm"
                 style={{ transform: `translateY(${offsetY * 0.04}px)` }}
              >
                 <img src="https://images.unsplash.com/photo-1522338242992-e1a54906a8e6?q=80&w=2788&auto=format&fit=crop" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" alt="Creative Shot 1" />
              </div>
              <div 
                 className="aspect-[3/4] overflow-hidden rounded-sm mt-24"
                 style={{ transform: `translateY(${offsetY * -0.04}px)` }}
              >
                 <img src="https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=2787&auto=format&fit=crop" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" alt="Creative Shot 2" />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-white/20 flex items-center justify-center animate-[spin_10s_linear_infinite]">
                 <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
           </div>

           <div className="space-y-8">
              <h2 className="font-serif text-5xl md:text-6xl leading-tight">Beyond packshots.</h2>
              <p className="text-gray-400 text-lg leading-relaxed font-light">
                 Our professional photography team’s combined expertise and experience goes well beyond simple packshots. Our team of creative professional still life photographers can add value to your shots with creative innovation, suitable lighting and experienced art direction.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed font-light">
                 We don't just deliver stills, we can produce video and moving image for your campaign.
              </p>
           </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-[#FAF8F5]">
         <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 space-y-8">
               <h2 className="font-serif text-5xl md:text-6xl text-[#111111]">Our Studios.</h2>
               <p className="text-gray-600 text-lg leading-relaxed font-light">
                  Located in North London, our fully-equipped studios are bright, spacious, and specifically designed for large-scale creative photography productions. We have client areas for who wish to be present, providing high-speed Wi-Fi and a comfortable breakout area for their convenience.
               </p>
            </div>
            <div className="order-1 lg:order-2 relative group overflow-hidden">
               <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div>
               <img src="https://images.unsplash.com/photo-1595514020173-66b6ab3a0422?q=80&w=2940&auto=format&fit=crop" className="w-full h-[500px] object-cover rounded-sm shadow-xl grayscale group-hover:grayscale-0 transition-all duration-700" alt="Studio Space" />
            </div>
         </div>
      </section>

      <LogoStrip dark />

      <section className="py-32 px-6 bg-gradient-to-r from-gray-900 to-black text-white overflow-hidden">
         <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8 z-10">
               <h2 className="font-serif text-5xl md:text-6xl leading-tight">
                  Add Video for <br/>
                  Maximum Impact.
               </h2>
               <p className="text-gray-400 text-lg font-light leading-relaxed max-w-md">
                  We don't just shoot stills. We create high-impact video content for ecommerce, social media reels, and campaign films.
               </p>
               <Button className="bg-white text-black hover:bg-gray-200 border-none">Explore Video</Button>
            </div>
            <div className="relative aspect-video bg-gray-800 rounded-sm overflow-hidden group cursor-pointer shadow-2xl border border-gray-700">
               <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2942&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500" alt="Video Preview" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/20">
                     <Play className="text-white fill-white ml-1 w-8 h-8" />
                  </div>
               </div>
            </div>
         </div>
      </section>

      <ContactSection />
      <ClothingBTS />
    </div>
  );
};
