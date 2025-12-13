
import React, { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { ButtonVariant } from '../types';
import { Play, ArrowRight, Package as PackageIcon, Monitor, Smartphone, RefreshCcw, MessageCircle, Layers, Film, Camera, CheckCircle, Instagram, Facebook, Youtube, Globe, Tv, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { VideoGenerator } from '../components/video/VideoGenerator';

export const VideoProduction: React.FC = () => {
  const navigate = useNavigate();
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const videoTypes = [
    { title: "Product Overview", icon: Film, desc: "Showcase features, materials, and fit in high definition 4K." },
    { title: "Unboxing Experience", icon: PackageIcon, desc: "Capture the excitement of packaging and first impressions." },
    { title: "How-To / Setup", icon: Layers, desc: "Step-by-step guides that reduce support tickets." },
    { title: "Brand Explainer", icon: Monitor, desc: "Convey your mission and values in 60 seconds or less." },
    { title: "Lifestyle Story", icon: Camera, desc: "Products in action: real world context and emotion." },
    { title: "Comparison", icon: Zap, desc: "Side-by-side performance tests against competitors." },
    { title: "Testimonial & UGC", icon: MessageCircle, desc: "Authentic social proof from real users and influencers." },
    { title: "360° Product Spin", icon: RefreshCcw, desc: "Interactive rotation for complete visual clarity." },
  ];

  return (
    <div className="bg-[#FAF8F5] text-[#111111] font-sans selection:bg-black selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-24 px-6 min-h-[90vh] flex items-center overflow-hidden">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Text */}
          <div className="space-y-8 animate-in slide-in-from-bottom-10 duration-1000 z-10">
            <h1 className="font-serif text-6xl md:text-8xl leading-[0.9] tracking-tight text-[#111111]">
              FashionOS <br/>
              <span className="italic font-light text-gray-400">Video.</span>
            </h1>
            <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-600 max-w-md border-l-2 border-black pl-6">
              Cinematic, conversion-driven video creative for fashion, beauty, and ecommerce brands.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Book Video Project
              </Button>
              <Button variant={ButtonVariant.SECONDARY} className="bg-transparent border-black text-black hover:bg-black hover:text-white">
                View Recent Work
              </Button>
            </div>
          </div>

          {/* Right: Collage */}
          <div className="relative h-[600px] hidden lg:block">
            {/* Main Hero Frame */}
            <div 
              className="absolute top-0 right-0 w-[400px] aspect-[9/16] shadow-2xl z-10 overflow-hidden rounded-sm group"
              style={{ transform: `translateY(${offsetY * 0.05}px)` }}
            >
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Fashion Film Model" />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center border border-white/40">
                   <Play className="fill-white text-white ml-1" />
                </div>
              </div>
            </div>
            
            {/* Secondary Frame */}
            <div 
              className="absolute top-20 left-10 w-[300px] aspect-video shadow-xl z-20 border-4 border-[#FAF8F5] overflow-hidden rounded-sm group"
              style={{ transform: `translateY(${offsetY * -0.05}px)` }}
            >
              <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2942&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Cinematic Set" />
            </div>

            {/* Accent Frame */}
            <div 
              className="absolute bottom-10 right-[350px] w-[220px] aspect-square shadow-lg z-30 overflow-hidden rounded-sm group"
              style={{ transform: `translateY(${offsetY * 0.08}px)` }}
            >
               <img src="https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=2835&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="Abstract Texture" />
            </div>
          </div>
        </div>
      </section>

      {/* NEW: AI VIDEO GENERATOR SECTION */}
      <section className="py-24 px-6 bg-white">
         <div className="max-w-[1440px] mx-auto">
            <div className="mb-12 text-center">
               <span className="text-xs font-bold tracking-widest uppercase text-purple-600">New Feature</span>
               <h2 className="font-serif text-4xl mt-3">Instant Motion Concepts</h2>
               <p className="text-gray-500 mt-4 max-w-lg mx-auto">
                  Visualize your video ideas instantly using our Veo-powered generator. Perfect for storyboarding and creative direction.
               </p>
            </div>
            <VideoGenerator />
         </div>
      </section>

      {/* 2. CONCEPT TO COMPLETION */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="space-y-8 animate-in slide-in-from-left duration-1000">
             <span className="text-xs font-bold tracking-widest uppercase text-gray-400">End-to-End Production</span>
             <h2 className="font-serif text-5xl md:text-6xl text-[#111111] leading-tight">Concept to Completion.</h2>
             <p className="text-xl text-gray-500 font-light leading-relaxed">
                We produce high-impact video content designed for clarity, emotion, and conversion. Our team manages everything — scripting, set design, filming, editing, and delivery.
             </p>
             <ul className="space-y-4 pt-4">
                {['Storyboarding & Scripting', 'Casting & Location Scouting', '4K Cinema Camera Production', 'Color Grading & Sound Design'].map((item, i) => (
                   <li key={i} className="flex items-center text-sm font-medium text-gray-700">
                      <CheckCircle className="w-4 h-4 mr-3 text-black" />
                      {item}
                   </li>
                ))}
             </ul>
             <div className="pt-6">
                <Button variant={ButtonVariant.SECONDARY} onClick={() => document.getElementById('types')?.scrollIntoView({ behavior: 'smooth' })}>Explore Services</Button>
             </div>
          </div>

          <div className="relative h-[600px] w-full overflow-hidden rounded-sm group">
             <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div>
             <img src="https://images.unsplash.com/photo-1579632652768-6cb9dcf85912?q=80&w=2786&auto=format&fit=crop" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000" alt="Production Set" />
             <div className="absolute bottom-8 left-8 z-20">
                <p className="text-white font-mono text-xs uppercase tracking-widest bg-black/50 backdrop-blur px-3 py-1 inline-block">Shot on RED Komodo</p>
             </div>
          </div>
        </div>
      </section>

      {/* 3. CORE VIDEO TYPES GRID */}
      <section className="py-32 px-6 bg-[#FAF8F5]" id="types">
         <div className="max-w-[1440px] mx-auto">
            <div className="text-center mb-20">
               <h2 className="font-serif text-4xl md:text-5xl mb-4">The 8 Core Video Types</h2>
               <p className="text-gray-500 max-w-2xl mx-auto">Essential formats for modern fashion and lifestyle brands.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {videoTypes.map((type, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-sm shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-default">
                     <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors">
                        <type.icon size={20} strokeWidth={1.5} />
                     </div>
                     <h3 className="font-bold text-lg mb-3 font-serif">{type.title}</h3>
                     <p className="text-sm text-gray-500 leading-relaxed font-light">{type.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 4. PLATFORM OPTIMIZATION */}
      <section className="py-20 px-6 bg-[#F5F3EF] border-y border-gray-200">
         <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
               <h3 className="font-serif text-2xl mb-2">Optimized for Every Platform.</h3>
               <p className="text-sm text-gray-500">Our videos are crafted to perform across major ecommerce, retail, and social channels.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-gray-400">
               <div className="flex items-center gap-2 hover:text-black transition-colors"><Instagram size={20} /><span className="text-xs font-bold uppercase tracking-widest">Instagram</span></div>
               <div className="flex items-center gap-2 hover:text-black transition-colors"><Globe size={20} /><span className="text-xs font-bold uppercase tracking-widest">Shopify</span></div>
               <div className="flex items-center gap-2 hover:text-black transition-colors"><Tv size={20} /><span className="text-xs font-bold uppercase tracking-widest">TikTok</span></div>
               <div className="flex items-center gap-2 hover:text-black transition-colors"><Youtube size={20} /><span className="text-xs font-bold uppercase tracking-widest">YouTube</span></div>
               <div className="flex items-center gap-2 hover:text-black transition-colors"><Facebook size={20} /><span className="text-xs font-bold uppercase tracking-widest">Meta</span></div>
            </div>
         </div>
      </section>

      {/* 5. BEHIND THE SCENES HERO */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden group">
         <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed transition-transform duration-[3s] group-hover:scale-105"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2942&auto=format&fit=crop')" }}
         ></div>
         <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-700"></div>
         
         <div className="relative z-10 text-center text-white space-y-8 px-6">
            <h2 className="font-serif text-5xl md:text-7xl leading-tight animate-in slide-in-from-bottom-8 duration-1000">Behind the Scenes.</h2>
            <p className="text-xl font-light text-gray-200 max-w-xl mx-auto animate-in slide-in-from-bottom-8 duration-1000 delay-200">
               A look into our production craft — lighting, motion, styling, and story.
            </p>
            <div className="pt-4 animate-in slide-in-from-bottom-8 duration-1000 delay-400">
               <Button className="bg-white text-black hover:bg-white/90 border-none px-8 py-4 text-xs font-bold uppercase tracking-widest">
                  <Play className="w-4 h-4 mr-2 fill-black inline-block" /> Watch BTS Reel
               </Button>
            </div>
         </div>
      </section>

      {/* 6. RECENT WORK PORTFOLIO */}
      <section className="py-32 px-6 bg-white">
         <div className="max-w-[1440px] mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-center mb-16">Recent Productions.</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {[
                  { title: "Summer Campaign", tag: "Fashion Film", img: "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=2946&auto=format&fit=crop" },
                  { title: "Glow Serum Launch", tag: "Beauty Product", img: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=2880&auto=format&fit=crop" },
                  { title: "Urban Collection", tag: "Social Reels", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2940&auto=format&fit=crop" },
                  { title: "Activewear Tech", tag: "Explainer", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2820&auto=format&fit=crop" },
                  { title: "Luxury Handbags", tag: "360 Spin", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=2835&auto=format&fit=crop" },
                  { title: "Skincare Routine", tag: "How-To", img: "https://images.unsplash.com/photo-1556228722-dca88997a3f0?q=80&w=2787&auto=format&fit=crop" }
               ].map((item, i) => (
                  <div key={i} className="group cursor-pointer">
                     <div className="aspect-[4/5] bg-gray-100 overflow-hidden rounded-sm relative mb-4">
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                           <Play className="text-white w-12 h-12 fill-white opacity-80" />
                        </div>
                        <img src={item.img} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" alt={item.title} />
                     </div>
                     <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">{item.tag}</span>
                     <h3 className="font-serif text-xl">{item.title}</h3>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 7. BRAND LOGOS */}
      <section className="py-24 px-6 bg-[#FAF8F5] border-t border-gray-100">
         <div className="max-w-[1440px] mx-auto">
            <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24 opacity-60 text-center text-[#111111]">
               <h3 className="text-2xl font-serif font-bold tracking-widest">CHANEL</h3>
               <h3 className="text-2xl font-serif font-black tracking-widest">GUCCI</h3>
               <h3 className="text-2xl font-sans font-bold tracking-[0.2em]">PRADA</h3>
               <h3 className="text-2xl font-serif font-bold tracking-widest">DIOR</h3>
               <h3 className="text-2xl font-sans font-light tracking-[0.3em]">VERSACE</h3>
               <h3 className="text-2xl font-serif italic font-bold">Burberry</h3>
            </div>
         </div>
      </section>

      {/* 8. TESTIMONIAL */}
      <section className="py-24 px-6 bg-white">
         <div className="max-w-4xl mx-auto text-center border-y border-gray-100 py-16">
            <h2 className="font-serif text-3xl md:text-4xl leading-relaxed italic text-gray-800 mb-8">
               “The videos exceeded our expectations — stunning craftsmanship and flawless execution. The FashionOS team truly understands luxury aesthetics.”
            </h2>
            <div className="flex flex-col items-center">
               <p className="font-bold text-sm tracking-widest uppercase mb-1">Elena Costa</p>
               <p className="text-gray-500 text-xs uppercase tracking-widest">Creative Director, L'Aura Milano</p>
            </div>
         </div>
      </section>

      {/* 9. CONTACT FORM */}
      <section className="py-32 px-6 bg-[#FAF8F5]" id="contact">
         <div className="max-w-xl mx-auto space-y-12">
            <div className="text-center space-y-4">
               <h2 className="font-serif text-5xl md:text-6xl text-[#111111]">Start Your Project.</h2>
               <p className="text-gray-500 font-light text-lg">Tell us about your vision. We'll handle the rest.</p>
            </div>
            
            <form className="space-y-6 bg-white p-8 md:p-12 shadow-sm rounded-sm">
               <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-gray-200 py-3 focus:outline-none focus:border-black transition-colors" placeholder="Full Name" />
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email</label>
                  <input type="email" className="w-full bg-transparent border-b border-gray-200 py-3 focus:outline-none focus:border-black transition-colors" placeholder="work@email.com" />
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Brand</label>
                  <input type="text" className="w-full bg-transparent border-b border-gray-200 py-3 focus:outline-none focus:border-black transition-colors" placeholder="Company Name" />
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Message</label>
                  <textarea rows={4} className="w-full bg-transparent border-b border-gray-200 py-3 focus:outline-none focus:border-black transition-colors" placeholder="Describe your project needs..."></textarea>
               </div>
               
               <div className="pt-8">
                  <Button className="w-full bg-black text-white hover:bg-gray-800 border-none py-4 text-xs font-bold uppercase tracking-widest">Start Custom Brief</Button>
                  <p className="text-center text-xs text-gray-400 mt-4">We usually respond within 24 hours.</p>
               </div>
            </form>
         </div>
      </section>

    </div>
  );
};
