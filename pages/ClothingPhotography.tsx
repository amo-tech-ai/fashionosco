
import React, { useEffect } from 'react';
import { Button } from '../components/Button';
import { ClothingHero } from '../components/clothing/ClothingHero';
import { ClothingCategories } from '../components/clothing/ClothingCategories';
import { ClothingWhyChooseUs } from '../components/clothing/ClothingWhyChooseUs';
import { ClothingProcess } from '../components/clothing/ClothingProcess';
import { ClothingFAQ } from '../components/clothing/ClothingFAQ';
import { ClothingBTS } from '../components/clothing/ClothingBTS';
import { useNavigate } from 'react-router-dom';

export const ClothingPhotography: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll Observer for Entrance Animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    // Timeout ensures DOM is populated if imported components render synchronously
    setTimeout(() => {
        const elements = document.querySelectorAll('.reveal-on-scroll');
        elements.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#F7F5F3] text-[#111111] font-sans selection:bg-[#E5D7A4] selection:text-black">
      
      {/* SECTION 1: HERO */}
      <ClothingHero onContactClick={scrollToContact} />

      {/* SECTION 2: BRAND TRUST */}
      <section className="py-24 px-6 bg-white border-t border-gray-100 reveal-on-scroll">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div className="space-y-6">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#E5D7A4]">Heritage & Expertise</span>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                 20+ Years of Clothing Photography. Trusted by Leading Fashion Brands.
              </h2>
           </div>
           <div>
              <p className="text-lg text-gray-600 font-light leading-relaxed mb-6">
                 At Blend Studios, we specialise in premium clothing and accessory photography tailored to the needs of fashion and retail brands. Whether you need ghost mannequin images, styled flats, or creative content for campaigns, our experienced team delivers results that elevate your product, producing images that sell.
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                 With over 20 years in the industry, we've built trusted relationships with leading names including Selfridges, Hobbs, Lululemon, Oner Active, Burberry, and The North Face. Clients choose us not just for our elevated imagery, but for our reliable, friendly service, streamlined workflows, and our right-first-time attitude.
              </p>
           </div>
        </div>
      </section>

      {/* SECTION 3: CATEGORY GRID */}
      <ClothingCategories />

      {/* SECTION 4: WHY CHOOSE US */}
      <ClothingWhyChooseUs />

      {/* SECTION 5: FEATURED IMAGE BLOCK */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-gray-900 group reveal-on-scroll">
         {/* Parallax Background */}
         <div className="absolute inset-0 bg-fixed bg-center bg-cover scale-105 group-hover:scale-110 transition-transform duration-[3s]" 
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2940&auto=format&fit=crop')" }}>
         </div>
         
         {/* Overlay */}
         <div className="absolute inset-0 bg-black/30 transition-opacity group-hover:bg-black/40"></div>
         
         {/* Animated Content */}
         <div className="relative z-10 text-center text-white px-6 max-w-5xl space-y-8">
            <div className="overflow-hidden">
               <h2 className="font-serif text-6xl md:text-8xl leading-none animate-in slide-in-from-bottom-10 fade-in duration-1000 ease-out">
                  Details that <span className="italic font-light text-[#E5D7A4]">Define.</span>
               </h2>
            </div>
            <p className="text-xl md:text-2xl font-light text-gray-200 max-w-2xl mx-auto animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-300">
               Capture the texture, drape, and quality of your collection with high-fidelity editorial imagery.
            </p>
            <div className="animate-in slide-in-from-bottom-6 fade-in duration-1000 delay-500 pt-4">
               <Button className="bg-white text-black border-none hover:bg-[#E5D7A4] px-10 py-4 text-xs font-bold uppercase tracking-widest transition-colors">
                  View Lookbooks
               </Button>
            </div>
         </div>
      </section>

      {/* SECTION 6: TESTIMONIALS */}
      <section className="py-24 px-6 bg-[#F6E9E4] reveal-on-scroll">
         <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl leading-normal mb-8 text-gray-800 italic">
               "Top-notch studio with a brilliant owner and attentive team who we have a great relationship with and who always makes us feel very welcome and fulfil all our production requirements on our many and varied shoots. I would recommend them to anyone looking to do a photoshoot in London."
            </h2>
            <div className="flex flex-col items-center">
               <p className="font-bold text-sm tracking-widest uppercase mb-1">Rachel Jones</p>
               <p className="text-gray-500 text-xs uppercase tracking-widest">Senior Producer</p>
            </div>
         </div>
      </section>

      {/* SECTION 7: PROCESS FLOWCHART */}
      <ClothingProcess />

      {/* SECTION 8: FAQ ACCORDION */}
      <ClothingFAQ />

      {/* SECTION 9: LOGO STRIP */}
      <section className="py-20 px-6 bg-white border-t border-gray-100 reveal-on-scroll">
         <div className="max-w-[1440px] mx-auto">
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale">
               {/* Using text placeholders for brands to avoid broken image links, styled to look like logos */}
               <h3 className="text-2xl font-serif font-bold tracking-tighter">SELFRIDGES</h3>
               <h3 className="text-xl font-sans font-black tracking-widest">THE NORTH FACE</h3>
               <h3 className="text-2xl font-serif italic">Burberry</h3>
               <h3 className="text-xl font-mono font-bold">ASOS</h3>
               <h3 className="text-xl font-sans font-bold tracking-[0.3em]">DUNE</h3>
               <h3 className="text-2xl font-serif font-bold">Hobbs</h3>
            </div>
         </div>
      </section>

      {/* SECTION 10: INVISIBLE MANNEQUIN HERO */}
      <section className="py-32 px-6 bg-[#111111] text-white relative overflow-hidden reveal-on-scroll">
         <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2874&auto=format&fit=crop')] bg-cover bg-center"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-[#111111]"></div>
         
         <div className="max-w-[1440px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
               <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#E5D7A4]">The Technique</span>
               <h2 className="font-serif text-5xl md:text-7xl">Invisible Mannequin.<br/>The Process.</h2>
               <p className="text-gray-400 text-lg leading-relaxed font-light">
                  We use a specialised technique to photograph your clothes on a mannequin, then seamlessly remove it in post-production. This reveals the true shape, fit, and lining of the garment without the distraction of a model or plastic form.
               </p>
               <Button className="bg-white text-black hover:bg-gray-200 border-none">Watch The Process</Button>
            </div>
            {/* Visual simulation of the process */}
            <div className="relative h-[600px] bg-gray-800/50 rounded-sm border border-gray-700 flex items-center justify-center overflow-hidden group">
               <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2820&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-20 transition-opacity duration-700" alt="Raw" />
               <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2820&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100" alt="Processed" style={{filter: 'contrast(1.2) brightness(1.1)'}} />
               <div className="z-20 border border-white/30 px-6 py-2 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest">
                  Hover to See Post-Production
               </div>
            </div>
         </div>
      </section>

      {/* SECTION 11: BEHIND THE SCENES */}
      <ClothingBTS />

      {/* SECTION 12: FINAL CTA */}
      <section className="py-32 px-6 bg-[#111111] text-white text-center reveal-on-scroll" id="contact">
         <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="font-serif text-5xl md:text-6xl">Ready to Start?</h2>
            <p className="text-gray-400 font-light text-lg">
               Get a quote for your next clothing photography project.
            </p>
            <div className="pt-8">
               <Button className="bg-white text-black hover:bg-gray-200 border-none px-10 py-4 text-sm">Request Quote</Button>
            </div>
         </div>
      </section>

    </div>
  );
};