import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../components/Button';
import { ArrowRight, Star, Camera, Zap, BarChart, Smartphone, Play, Image as ImageIcon, Box, Palette, Aperture, Wand2, Download, Layers, Scissors, Shirt, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ClothingPhotography: React.FC = () => {
  const navigate = useNavigate();

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Parallax State
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse position (-1 to 1)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    // Scroll Observer for Animations
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

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "How does ghost mannequin photography work?",
      a: "We photograph your garment on a mannequin and then remove it in post-production. The result is a clean, 3D look that shows the fit and structure, perfect for ecommerce."
    },
    {
      q: "What's your turnaround time?",
      a: "Standard delivery is 3-5 working days from the shoot date. We also offer an express 24-hour service for urgent campaigns."
    },
    {
      q: "What's included in the price?",
      a: "Our rates include steaming/prep, professional styling, photography, basic retouching (color correction, dust removal), and file delivery."
    },
    {
      q: "Can you handle high-volume ecommerce jobs?",
      a: "Yes, our studio is equipped for high-volume workflows, processing hundreds of SKUs per day without compromising quality."
    },
    {
      q: "What if I need more retouching?",
      a: "We offer tiered retouching packages. 'High-end' retouching (creative edits, compositing) can be added as a custom requirement."
    },
    {
      q: "Can I send fewer than 24 garments?",
      a: "Yes, we have a minimum booking fee rather than a minimum item count. Contact us for a custom quote for smaller batches."
    },
    {
      q: "Do I get to review the images before final delivery?",
      a: "Absolutely. We provide a contact sheet or online gallery for approval before final high-res files are processed."
    },
    {
      q: "Do you offer styling services?",
      a: "Yes, our in-house stylists are experts in pinning, tucking, and styling garments to ensuring they look their absolute best."
    },
    {
      q: "Do I have to be on-site?",
      a: "No. You can ship your products to us. We'll handle the intake, shoot, and return shipping. Many clients work remotely with us."
    },
    {
      q: "How do I book a shoot?",
      a: "Simply use the 'Get a Quote' button above or contact our team directly to schedule a consultation."
    }
  ];

  return (
    <div className="bg-[#F7F5F3] text-[#111111] font-sans selection:bg-[#E5D7A4] selection:text-black">
      <style>{`
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-on-scroll.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* SECTION 1: HERO */}
      <section ref={heroRef} className="relative pt-32 pb-24 px-6 overflow-hidden min-h-[90vh] flex items-center">
        {/* Abstract Background Gradients */}
        <div className="absolute top-0 right-0 w-[60vw] h-[80vh] bg-gradient-to-b from-[#F6E9E4] to-[#EDE7FF] rounded-bl-[200px] opacity-60 -z-10 blur-3xl"></div>
        
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-5 space-y-8 animate-in slide-in-from-bottom-10 duration-1000">
            <h1 className="font-serif text-6xl md:text-8xl leading-[0.9] tracking-tight">
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
              <Button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Get a Quote
              </Button>
            </div>
          </div>

          {/* Hero Collage with Parallax */}
          <div className="lg:col-span-7 relative h-[600px] hidden lg:block perspective-[1000px]">
             
             {/* Image 1: Main Right (Background layer) */}
             <div 
                className="absolute top-0 right-10 w-[300px] aspect-[3/4] shadow-2xl z-20 will-change-transform"
                style={{ 
                    transform: `translate3d(${mousePos.x * -12}px, ${mousePos.y * -12 + scrollY * 0.05}px, 0)`,
                    transition: 'transform 0.2s cubic-bezier(0.2, 0, 0.2, 1)'
                }}
             >
                <div className="w-full h-full overflow-hidden hover:-translate-y-4 hover:shadow-3xl transition-all duration-700 rounded-sm bg-white p-1">
                   <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2820&auto=format&fit=crop" className="w-full h-full object-cover" alt="Fashion Editorial" />
                </div>
             </div>

             {/* Image 2: Top Left (Midground layer) */}
             <div 
                className="absolute top-20 left-10 w-[280px] aspect-[3/4] shadow-xl z-10 will-change-transform"
                style={{ 
                    transform: `translate3d(${mousePos.x * -20}px, ${mousePos.y * -20 + scrollY * 0.12}px, 0)`,
                    transition: 'transform 0.2s cubic-bezier(0.2, 0, 0.2, 1)'
                }}
             >
                <div className="w-full h-full overflow-hidden hover:-translate-y-4 hover:scale-[1.02] transition-all duration-700 rounded-sm">
                    <img src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=2705&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Clothing Texture" />
                </div>
             </div>

             {/* Image 3: Bottom Right Detail (Foreground layer) */}
             <div 
                className="absolute bottom-10 right-1/3 w-[240px] aspect-square shadow-lg z-30 will-change-transform"
                 style={{ 
                    transform: `translate3d(${mousePos.x * -35}px, ${mousePos.y * -35 + scrollY * -0.08}px, 0)`,
                    transition: 'transform 0.2s cubic-bezier(0.2, 0, 0.2, 1)'
                }}
             >
                <div className="w-full h-full overflow-hidden border-8 border-white hover:scale-105 transition-transform duration-700 rounded-sm">
                    <img src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=2864&auto=format&fit=crop" className="w-full h-full object-cover" alt="Detail Shot" />
                </div>
             </div>

          </div>
        </div>
      </section>

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
      <section className="py-32 px-6 bg-[#F7F5F3]">
        <div className="max-w-[1440px] mx-auto space-y-24">
           
           {/* 1. Ghost Mannequin */}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center group reveal-on-scroll" style={{ transitionDelay: '100ms' }}>
              <div className="order-2 lg:order-1 relative overflow-hidden rounded-sm shadow-xl hover:-translate-y-3 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 ease-out cursor-pointer">
                 <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                 <img src="https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?q=80&w=2940&auto=format&fit=crop" className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-[1.5s]" alt="Ghost Mannequin" />
              </div>
              <div className="order-1 lg:order-2 space-y-6">
                 <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                    <Shirt className="w-6 h-6 text-gray-800" strokeWidth={1} />
                 </div>
                 <h3 className="font-serif text-4xl">Ghost Mannequin.</h3>
                 <p className="text-gray-600 leading-relaxed font-light">
                    Invisible (ghost) mannequin photography creates the effect of a garment being worn by an invisible model. Each item is carefully styled and shot on a mannequin, which is then digitally removed in post-production – all included in all our rates.
                 </p>
                 <div className="pt-4">
                    <button className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-600 transition-colors flex items-center group/btn">
                       View Examples <ArrowRight className="w-3 h-3 ml-2 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
                    </button>
                 </div>
              </div>
           </div>

           {/* 2. Clothing Flats */}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center group reveal-on-scroll" style={{ transitionDelay: '200ms' }}>
              <div className="space-y-6">
                 <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                    <Layers className="w-6 h-6 text-gray-800" strokeWidth={1} />
                 </div>
                 <h3 className="font-serif text-4xl">Clothing Flats.</h3>
                 <p className="text-gray-600 leading-relaxed font-light">
                    An alternative method to invisible mannequin photography is to style your garments flat. This can be done by hanging them, which allows for natural movement to illustrate the fit of a garment (whether a loose or slim fit, for example), or on a tabletop, for a creaseless, sharp finish or controlled movement.
                 </p>
              </div>
              <div className="relative overflow-hidden rounded-sm shadow-xl hover:-translate-y-3 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 ease-out cursor-pointer">
                 <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2940&auto=format&fit=crop" className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-[1.5s]" alt="Clothing Flats" />
              </div>
           </div>

           {/* 3. Apparel Still Life */}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center group reveal-on-scroll" style={{ transitionDelay: '300ms' }}>
              <div className="order-2 lg:order-1 relative overflow-hidden rounded-sm shadow-xl hover:-translate-y-3 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 ease-out cursor-pointer">
                 <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2940&auto=format&fit=crop" className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-[1.5s]" alt="Still Life" />
              </div>
              <div className="order-1 lg:order-2 space-y-6">
                 <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                    <Camera className="w-6 h-6 text-gray-800" strokeWidth={1} />
                 </div>
                 <h3 className="font-serif text-4xl">Apparel Still Life.</h3>
                 <p className="text-gray-600 leading-relaxed font-light">
                    As well as the 'standard' e-commerce shots, we can also shoot your collection creatively. We love producing creative images, and our still life apparel photography brings an extra element of appeal to your shots. It's ideal for website banners or social media. As part of our service, we can offer Art direction, prop sourcing and styling.
                 </p>
              </div>
           </div>

           {/* 4. Details */}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center group reveal-on-scroll" style={{ transitionDelay: '400ms' }}>
              <div className="space-y-6">
                 <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                    <Aperture className="w-6 h-6 text-gray-800" strokeWidth={1} />
                 </div>
                 <h3 className="font-serif text-4xl">Details.</h3>
                 <p className="text-gray-600 leading-relaxed font-light">
                    If you are looking to really sell your collection to customers, detail shots are an essential part of your catalogue shots. Displaying a cropped, close up section of each garment, detail shots brilliantly capture features of the clothes. This could include buttons, inside pockets, fastenings and texture.
                 </p>
              </div>
              <div className="relative overflow-hidden rounded-sm shadow-xl hover:-translate-y-3 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 ease-out cursor-pointer">
                 <img src="https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=3072&auto=format&fit=crop" className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-[1.5s]" alt="Detail Shot" />
              </div>
           </div>

            {/* 5. Accessories */}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center group reveal-on-scroll" style={{ transitionDelay: '500ms' }}>
              <div className="order-2 lg:order-1 relative overflow-hidden rounded-sm shadow-xl hover:-translate-y-3 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 ease-out cursor-pointer">
                 <img src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=2835&auto=format&fit=crop" className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-[1.5s]" alt="Accessories" />
              </div>
              <div className="order-1 lg:order-2 space-y-6">
                 <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                    <Box className="w-6 h-6 text-gray-800" strokeWidth={1} />
                 </div>
                 <h3 className="font-serif text-4xl">Accessories.</h3>
                 <p className="text-gray-600 leading-relaxed font-light">
                    Of course, we shoot all manner of accessories. From hats and bags to footwear and jewellery, we shoot them by the bucket load. With everything we do, we apply the same care and attention to producing elevated premium accessory images that will help sell more than your competitors.
                 </p>
              </div>
           </div>

        </div>
      </section>

      {/* SECTION 4: WHY CHOOSE US */}
      <section className="py-32 px-6 bg-white reveal-on-scroll">
         <div className="max-w-[1440px] mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl mb-16 text-center">Why Choose Us.</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                  { title: "Specialist Fashion Studio.", desc: "We focus exclusively on fashion and apparel, from ghost mannequins to campaign-level creative. Every shoot is handled by experienced photographers who understand how to make garments sell." },
                  { title: "Consistent Quality, Every Time.", desc: "With over 15 years' experience and a 'right-first-time' culture, we deliver consistently sharp, colour-accurate, on-brand imagery. Every shot is approved by senior team members before it reaches you." },
                  { title: "Experienced, Friendly Team.", desc: "We have been doing this type of work for years and know exactly how to handle both garments and clients. Our in-house team consists of fashion specialists who ensure a smooth, efficient, and straightforward process from start to finish." },
                  { title: "In-House Retouching.", desc: "Our post-production team handles all ghosting, editing, and colour matching. We guarantee accuracy and consistency across your entire collection, and we turn any amendments around within 24 hours." },
                  { title: "Top-tier Studio Facilities.", desc: "Based in North London, our 4000 sq. ft. studios are fully equipped with industry-standard lighting and camera gear. We've designed our space for high-volume shoots with maximum flexibility." },
                  { title: "Fast Turnarounds.", desc: "We know e-commerce moves quickly. Standard delivery is five working days. Express options are also available if you need results faster." }
               ].map((item, i) => (
                  <div key={i} className="p-8 border border-gray-100 hover:border-[#E5D7A4] hover:shadow-lg transition-all duration-300 group bg-white">
                     <div className="w-2 h-2 bg-gray-200 group-hover:bg-[#E5D7A4] mb-6 rounded-full transition-colors"></div>
                     <h3 className="font-bold text-lg mb-3">{item.title}</h3>
                     <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

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
      <section className="py-32 px-6 bg-gradient-to-b from-white to-gray-50 overflow-hidden relative reveal-on-scroll">
         <div className="max-w-[1440px] mx-auto relative z-10">
            <div className="text-center mb-20">
               <span className="text-xs font-bold tracking-widest uppercase text-purple-500 mb-2 block">Our Workflow</span>
               <h2 className="font-serif text-4xl md:text-5xl">Product Photography Process</h2>
            </div>

            {/* Visual Flowchart */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
               {/* Connector Line (Desktop) */}
               <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gray-200 -z-10"></div>
               
               {[
                  { icon: Box, title: "Intake", desc: "Receiving & organizing" },
                  { icon: Palette, title: "Creative", desc: "Direction & Mood" },
                  { icon: Aperture, title: "Setup", desc: "Lighting & Prep" },
                  { icon: Camera, title: "Shooting", desc: "High-res capture" },
                  { icon: Wand2, title: "Retouch", desc: "Post-production" },
                  { icon: Download, title: "Delivery", desc: "Final export" }
               ].map((step, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center group">
                     <div className="w-24 h-24 bg-white border border-gray-100 rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:border-purple-200 group-hover:scale-110 transition-all duration-300 relative z-10">
                        <step.icon className="w-8 h-8 text-gray-600 group-hover:text-purple-600 transition-colors" strokeWidth={1.5} />
                     </div>
                     <h3 className="font-serif text-xl mb-2">{step.title}</h3>
                     <p className="text-xs text-gray-500 uppercase tracking-widest">{step.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* SECTION 8: FAQ ACCORDION */}
      <section className="py-32 px-6 bg-white max-w-[1000px] mx-auto reveal-on-scroll">
         <h2 className="font-serif text-4xl mb-12 text-center">Our Clothing Ghost Mannequin & Flats FAQs</h2>
         <div className="space-y-4">
            {faqs.map((faq, index) => (
               <div key={index} className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:border-gray-400">
                  <button 
                     onClick={() => toggleFaq(index)}
                     className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition-colors text-left"
                  >
                     <span className="font-bold text-sm md:text-base">{faq.q}</span>
                     {openFaq === index ? <Minus className="w-4 h-4 text-gray-400" /> : <Plus className="w-4 h-4 text-gray-400" />}
                  </button>
                  <div 
                     className={`overflow-hidden transition-all duration-300 ease-in-out bg-gray-50 ${openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                     <div className="p-6 pt-0 text-sm text-gray-600 leading-relaxed">
                        {faq.a}
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </section>

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

      {/* SECTION 11: BEHIND THE SCENES GRID */}
      <section className="py-24 px-6 bg-[#F7F5F3] reveal-on-scroll">
         <div className="max-w-[1440px] mx-auto">
            <div className="flex justify-between items-end mb-12">
               <h2 className="font-serif text-3xl">Behind the Scenes.</h2>
               <span className="text-xs font-bold uppercase tracking-widest text-gray-400">@FashionOS_Studio</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {[
                  "https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=2787&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1520692867807-631586529738?q=80&w=2787&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1472506229562-67891c3da632?q=80&w=2938&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2942&auto=format&fit=crop"
               ].map((src, i) => (
                  <div key={i} className="aspect-square relative group overflow-hidden cursor-pointer">
                     <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                        <span className="text-white text-xs font-bold uppercase tracking-widest">View Post</span>
                     </div>
                     <img src={src} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" alt="Studio Life" />
                  </div>
               ))}
            </div>
         </div>
      </section>

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