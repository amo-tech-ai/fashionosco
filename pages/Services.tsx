import React, { useState } from 'react';
import { Button } from '../components/Button';
import { ButtonVariant } from '../types';
import { Camera, Video, ShoppingBag, Instagram, Monitor, Sparkles, ArrowRight, Check, Play, Globe, Cpu, PenTool, Layout as LayoutIcon, MessageSquare } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Services: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const navigate = useNavigate();

  // 1. Defined Service Categories (6 items)
  // Updated links to point to the actual new pages
  const servicesList = [
    { icon: Monitor, title: "Web Design", desc: "Identity & UX", link: "/services" },
    { icon: Camera, title: "Photography", desc: "Campaign & Editorial", link: "/services/product-photography" },
    { icon: Video, title: "Video Production", desc: "Commercial & Reels", link: "/services" },
    { icon: ShoppingBag, title: "E-Commerce", desc: "CRO & Listings", link: "/services/ecommerce" },
    { icon: Instagram, title: "Social Media", desc: "Strategy & Content", link: "/services" },
    { icon: Sparkles, title: "AI Creative", desc: "Enhancement & GenAI", link: "/services" },
  ];

  const portfolioItems = [
    { cat: "Photo", img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2788&auto=format&fit=crop" },
    { cat: "Web", img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf7d?q=80&w=2938&auto=format&fit=crop" },
    { cat: "Video", img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2942&auto=format&fit=crop" },
    { cat: "AI", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2865&auto=format&fit=crop" },
    { cat: "Ecommerce", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2899&auto=format&fit=crop" },
    { cat: "Social", img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2874&auto=format&fit=crop" },
  ];

  return (
    <div className="bg-white">
      
      {/* 1. HERO SECTION - Cinematic & Editorial */}
      <section className="relative pt-24 pb-32 px-6 overflow-hidden">
        {/* Abstract Background Accent */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden z-0 pointer-events-none">
           <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-50/50 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-5 space-y-8">
            <h1 className="font-serif text-6xl md:text-7xl leading-[1.1]">
              Creative Services Built for <br/> <span className="italic text-purple-600">Modern Fashion.</span>
            </h1>
            <p className="text-xl text-gray-500 font-light max-w-lg leading-relaxed">
              We blend high-fashion aesthetics with digital performance and AI-powered efficiency to elevate your brand.
            </p>
            <div className="flex gap-4 pt-4">
              <Button>View Portfolio</Button>
              <Button variant={ButtonVariant.SECONDARY}>Get a Quote</Button>
            </div>
          </div>
          
          <div className="lg:col-span-7 h-[600px] hidden lg:flex gap-6 items-start justify-end">
             {/* Scroll Sequence Simulation / Parallax Layout */}
             <div className="w-1/3 pt-12 space-y-6 animate-in slide-in-from-bottom-10 duration-1000">
                <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2940&auto=format&fit=crop" className="w-full h-[300px] object-cover rounded-sm shadow-lg hover:shadow-xl transition-all" />
                <div className="p-4 bg-gray-50 rounded-sm">
                   <p className="font-serif italic text-lg">"Visionary."</p>
                </div>
             </div>
             <div className="w-1/3 space-y-6 animate-in slide-in-from-bottom-20 duration-1000 delay-200">
                <img src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=2940&auto=format&fit=crop" className="w-full h-[400px] object-cover rounded-sm shadow-lg hover:shadow-xl transition-all" />
             </div>
             <div className="w-1/3 pt-24 space-y-6 animate-in slide-in-from-bottom-10 duration-1000 delay-300">
                <img src="https://images.unsplash.com/photo-1550614000-4b9519e02d48?q=80&w=2788&auto=format&fit=crop" className="w-full h-[250px] object-cover rounded-sm shadow-lg hover:shadow-xl transition-all" />
                <div className="aspect-square bg-black text-white p-6 flex flex-col justify-between rounded-sm">
                   <Sparkles className="w-6 h-6" />
                   <p className="text-xs uppercase tracking-widest font-bold">AI Powered</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES CATEGORY GRID */}
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

      {/* 3. INDIVIDUAL SERVICE SECTIONS (Alternating Blocks) */}
      <div className="space-y-0">
        
        {/* Block 1: Web Design */}
        <section className="py-24 px-6 bg-gray-50">
           <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="order-2 lg:order-1 relative">
                 <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
                 <img src="https://images.unsplash.com/photo-1467232004584-a241de8bcf7d?q=80&w=2938&auto=format&fit=crop" className="w-full h-[600px] object-cover rounded-sm shadow-2xl relative z-10" />
              </div>
              <div className="order-1 lg:order-2">
                 <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-6">
                    <Monitor />
                 </div>
                 <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">01. Web Design</span>
                 <h2 className="font-serif text-4xl md:text-5xl mb-6">Digital Flagships & <br/>Brand Experiences.</h2>
                 <p className="text-gray-500 leading-relaxed text-lg mb-8">
                    Your website is your global runway. We design immersive, high-converting digital experiences that reflect the quality of your collection.
                 </p>
                 <ul className="space-y-4 mb-10">
                    {['Custom Shopify & Headless Builds', 'Interactive Lookbooks', 'Brand Identity Systems', 'Conversion Rate Optimization (CRO)'].map(item => (
                       <li key={item} className="flex items-center text-sm font-medium"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>{item}</li>
                    ))}
                 </ul>
                 <Button>View Web Projects</Button>
              </div>
           </div>
        </section>

        {/* Block 2: Photography */}
        <section className="py-24 px-6 bg-white">
           <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                 <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 mb-6">
                    <Camera />
                 </div>
                 <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">02. Photography</span>
                 <h2 className="font-serif text-4xl md:text-5xl mb-6">Campaigns That <br/>Define Seasons.</h2>
                 <p className="text-gray-500 leading-relaxed text-lg mb-8">
                    From high-concept editorial shoots to high-volume e-commerce, our studios in Paris and NYC capture the essence of your brand.
                 </p>
                 <div className="space-y-3 mb-10">
                    <div 
                      onClick={() => navigate('/services/product-photography')}
                      className="flex items-center p-4 border border-gray-100 rounded-sm hover:border-purple-200 cursor-pointer transition-colors group"
                    >
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3"></div>
                      <span className="font-bold text-sm">Product Photography</span>
                      <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div 
                      onClick={() => navigate('/services/clothing-photography')}
                      className="flex items-center p-4 border border-gray-100 rounded-sm hover:border-purple-200 cursor-pointer transition-colors group"
                    >
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3"></div>
                      <span className="font-bold text-sm">Clothing Photography</span>
                      <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div 
                      onClick={() => navigate('/services/creative-still-life')}
                      className="flex items-center p-4 border border-gray-100 rounded-sm hover:border-purple-200 cursor-pointer transition-colors group"
                    >
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3"></div>
                      <span className="font-bold text-sm">Creative Still Life</span>
                      <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                 </div>
                 <div className="flex gap-4">
                   <Button variant={ButtonVariant.SECONDARY} onClick={() => navigate('/services/product-photography')}>Book Product Shoot</Button>
                   <Button variant={ButtonVariant.GHOST} onClick={() => navigate('/services/creative-still-life')}>View Still Life &rarr;</Button>
                 </div>
              </div>
              <div className="relative">
                 <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-100 rounded-full blur-3xl opacity-50"></div>
                 <img src="https://images.unsplash.com/photo-1550614000-4b9519e02d48?q=80&w=2788&auto=format&fit=crop" className="w-full h-[600px] object-cover rounded-sm shadow-2xl relative z-10" />
              </div>
           </div>
        </section>

        {/* Block 3: Video Production */}
        <section className="py-24 px-6 bg-gray-50">
           <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="order-2 lg:order-1 relative group cursor-pointer">
                 <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors z-20 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm">
                       <Play className="w-8 h-8 ml-1" />
                    </div>
                 </div>
                 <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2942&auto=format&fit=crop" className="w-full h-[600px] object-cover rounded-sm shadow-2xl relative z-10" />
              </div>
              <div className="order-1 lg:order-2">
                 <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-600 mb-6">
                    <Video />
                 </div>
                 <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">03. Video Production</span>
                 <h2 className="font-serif text-4xl md:text-5xl mb-6">Cinematic Motion & <br/>Social Reels.</h2>
                 <p className="text-gray-500 leading-relaxed text-lg mb-8">
                    Motion is the new standard. We produce runway coverage, brand films, and social-first vertical video that stops the scroll.
                 </p>
                 <ul className="space-y-4 mb-10">
                    {['4K Commercial Production', 'Social-First Vertical Edits', 'Runway & Event Coverage', 'Storyboarding & Scripting'].map(item => (
                       <li key={item} className="flex items-center text-sm font-medium"><div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3"></div>{item}</li>
                    ))}
                 </ul>
                 <Button>View Showreel</Button>
              </div>
           </div>
        </section>

        {/* Block 4: E-Commerce */}
        <section className="py-24 px-6 bg-white">
           <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                 <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-6">
                    <ShoppingBag />
                 </div>
                 <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">04. E-Commerce Services</span>
                 <h2 className="font-serif text-4xl md:text-5xl mb-6">Optimized for <br/>Conversion.</h2>
                 <p className="text-gray-500 leading-relaxed text-lg mb-8">
                    We don't just take photos; we build product pages that sell. From Amazon A+ content to Shopify PDP optimization.
                 </p>
                 <ul className="space-y-4 mb-10">
                    {['Marketplace Listing Optimization', 'PDP Layout Design', 'Rich Media Content', 'Catalog Management'].map(item => (
                       <li key={item} className="flex items-center text-sm font-medium"><div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div>{item}</li>
                    ))}
                 </ul>
                 <Button variant={ButtonVariant.SECONDARY} onClick={() => navigate('/services/ecommerce')}>View Ecommerce Packages</Button>
              </div>
              <div className="relative">
                 <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2899&auto=format&fit=crop" className="w-full h-[600px] object-cover rounded-sm shadow-2xl relative z-10" />
              </div>
           </div>
        </section>

        {/* Block 5: Social Media */}
        <section className="py-24 px-6 bg-gray-50">
           <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="order-2 lg:order-1 relative">
                 <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2874&auto=format&fit=crop" className="w-full h-[600px] object-cover rounded-sm shadow-2xl relative z-10" />
              </div>
              <div className="order-1 lg:order-2">
                 <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center text-pink-600 mb-6">
                    <Instagram />
                 </div>
                 <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">05. Social Media</span>
                 <h2 className="font-serif text-4xl md:text-5xl mb-6">Strategy meets <br/>Aesthetics.</h2>
                 <p className="text-gray-500 leading-relaxed text-lg mb-8">
                    Building community through curated content calendars, influencer partnerships, and data-driven growth strategies.
                 </p>
                 <ul className="space-y-4 mb-10">
                    {['Content Strategy & Creation', 'Community Management', 'Influencer Seeding', 'Paid Social Ad Creative'].map(item => (
                       <li key={item} className="flex items-center text-sm font-medium"><div className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-3"></div>{item}</li>
                    ))}
                 </ul>
                 <Button>Start Growing</Button>
              </div>
           </div>
        </section>

        {/* Block 6: AI Creative */}
        <section className="py-24 px-6 bg-white">
           <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                 <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mb-6">
                    <Sparkles />
                 </div>
                 <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">06. AI Creative Services</span>
                 <h2 className="font-serif text-4xl md:text-5xl mb-6">Next-Gen <br/>Fashion Tech.</h2>
                 <p className="text-gray-500 leading-relaxed text-lg mb-8">
                    Leverage generative AI to scale your asset production, visualize concepts instantly, and automate repetitive creative tasks.
                 </p>
                 <ul className="space-y-4 mb-10">
                    {['AI-Enhanced Retouching', 'Generative Backgrounds', 'Virtual Try-On Integration', 'Automated Copywriting'].map(item => (
                       <li key={item} className="flex items-center text-sm font-medium"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-3"></div>{item}</li>
                    ))}
                 </ul>
                 <Button variant={ButtonVariant.SECONDARY}>Explore AI Tools</Button>
              </div>
              <div className="relative">
                 <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 z-20 rounded-sm"></div>
                 <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2865&auto=format&fit=crop" className="w-full h-[600px] object-cover rounded-sm shadow-2xl relative z-10" />
              </div>
           </div>
        </section>

      </div>

      {/* 4. PROCESS FLOW (Flowchart) */}
      <section className="py-32 bg-gray-900 text-white px-6">
         <div className="max-w-[1440px] mx-auto">
            <div className="text-center mb-20">
               <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">Our Workflow</span>
               <h2 className="font-serif text-4xl mt-2">From Concept to Campaign</h2>
            </div>
            
            <div className="relative">
               {/* Connecting Line (Desktop) */}
               <div className="hidden lg:block absolute top-[20%] left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
               
               <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                  {[
                     { step: "01", title: "Explore", desc: "Browse our services and portfolio." },
                     { step: "02", title: "Book", desc: "Schedule a consultation call." },
                     { step: "03", title: "Plan", desc: "Pre-production & creative brief." },
                     { step: "04", title: "Create", desc: "Shoot day or digital build." },
                     { step: "05", title: "Deliver", desc: "AI enhancement & final export." }
                  ].map((s, i) => (
                     <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                        <div className="w-4 h-4 bg-gray-900 border-2 border-gray-500 rounded-full mb-8 group-hover:bg-white group-hover:border-white transition-colors duration-300"></div>
                        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 w-full group-hover:-translate-y-2 transition-transform duration-300">
                           <span className="text-4xl font-serif text-gray-600 mb-2 block group-hover:text-white transition-colors">{s.step}</span>
                           <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                           <p className="text-sm text-gray-400">{s.desc}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* 5. PORTFOLIO SHOWCASE */}
      <section className="py-24 px-6 max-w-[1440px] mx-auto">
         <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
               <h2 className="font-serif text-4xl mb-6">Selected Works</h2>
               <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-widest">
                  {['All', 'Photo', 'Video', 'Web', 'Ecommerce', 'AI'].map(f => (
                     <button 
                        key={f} 
                        onClick={() => setActiveFilter(f)}
                        className={`px-3 py-1 rounded-full border transition-colors ${activeFilter === f ? 'bg-black text-white border-black' : 'border-gray-200 text-gray-500 hover:border-black hover:text-black'}`}
                     >
                        {f}
                     </button>
                  ))}
               </div>
            </div>
         </div>

         <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {portfolioItems.map((item, i) => (
               <div key={i} className="relative group overflow-hidden rounded-sm break-inside-avoid cursor-pointer">
                  <img src={item.img} className="w-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-100 group-hover:brightness-75" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <Button variant={ButtonVariant.SECONDARY} className="bg-transparent text-white border-white hover:bg-white hover:text-black">View Project</Button>
                  </div>
                  <div className="absolute top-4 left-4">
                     <span className="bg-black/50 backdrop-blur text-white px-2 py-1 text-[10px] uppercase font-bold rounded-sm">{item.cat}</span>
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* 6. AI SERVICES MINI SECTION (Tech Fusion) */}
      <section className="py-24 px-6 bg-slate-50">
         <div className="max-w-[1440px] mx-auto">
            <div className="text-center mb-16">
               <h2 className="font-serif text-4xl mb-4">Fashion Intelligence</h2>
               <p className="text-gray-500">Accelerate your workflow with our proprietary AI tools.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
               {[
                  { icon: Sparkles, title: "Photo Enhancer", sub: "Upscale & clean" },
                  { icon: PenTool, title: "Copywriter", sub: "Descriptions & captions" },
                  { icon: LayoutIcon, title: "Moodboards", sub: "Concept generation" },
                  { icon: Video, title: "Storyboard", sub: "Video pre-viz" },
                  { icon: MessageSquare, title: "Social Vars", sub: "Multi-platform resize" }
               ].map((tool, i) => (
                  <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-purple-100 hover:border-purple-200 transition-all group">
                     <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform">
                        <tool.icon size={20} />
                     </div>
                     <h3 className="font-bold text-sm mb-1">{tool.title}</h3>
                     <p className="text-xs text-gray-400">{tool.sub}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 7. TESTIMONIALS (Dark Luxe) */}
      <section className="py-24 px-6 bg-black text-white">
         <div className="max-w-4xl mx-auto text-center relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-900/20 rounded-full blur-[100px]"></div>
            <div className="relative z-10">
               <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-gray-700 mb-8">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop" className="w-full h-full object-cover" />
               </div>
               <h3 className="font-serif text-3xl md:text-4xl leading-normal mb-8 italic">
                  "FashionOS transformed our e-commerce pipeline. We launched our campaign 2 weeks early with assets that looked better than ever."
               </h3>
               <div>
                  <p className="font-bold text-sm tracking-widest uppercase mb-1">Sophia Laurent</p>
                  <p className="text-gray-500 text-xs uppercase tracking-widest">CMO, Maison Rouge</p>
               </div>
            </div>
         </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="py-32 px-6 bg-white text-center">
         <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="font-serif text-5xl font-medium">Ready to Elevate Your <br/>Creative Production?</h2>
            <p className="text-xl text-gray-500 font-light">Join the future of fashion content creation.</p>
            <div className="flex justify-center gap-4">
               <Button>Book Consultation</Button>
               <Button variant={ButtonVariant.SECONDARY}>Contact Team</Button>
            </div>
         </div>
      </section>
    </div>
  );
};