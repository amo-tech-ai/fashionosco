
import React from 'react';
import { Button } from '../components/Button';
import { ButtonVariant } from '../types';
import { Box, Palette, Aperture, Camera, Wand2, Download, CheckCircle, Clock, Layers, Zap, Star, BarChart, Smartphone, ImageIcon, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ProductPhotography: React.FC = () => {
  const navigate = useNavigate();

  const handleBookNow = () => {
      localStorage.removeItem('wizard_state');
      navigate('/shoot-wizard', { state: { prefill: { shootType: 'product', location: 'studio' } } });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white text-rich-black font-sans selection:bg-black selection:text-white">
      
      {/* SECTION 1: HERO */}
      <section className="bg-gradient-to-b from-off-white to-soft-cream pt-32 pb-24 px-6 overflow-hidden">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8 sticky top-32 animate-in slide-in-from-left duration-1000">
            <h1 className="font-serif text-6xl md:text-7xl leading-tight text-rich-black">
              Exceptional imagery.<br/>
              <span className="italic text-charcoal">Every time.</span>
            </h1>
            <div className="max-w-md space-y-6 text-charcoal/80 text-lg leading-relaxed font-light">
              <p>
                As London's primary professional product photography studio, we deliver outstanding images with an unrivalled level of service. Team Blend is regularly trusted to shoot for many of the UK's foremost brands.
              </p>
              <p>
                We understand the investment you make in your products. We match that with processes ensuring we can always deliver affordable projects without cutting corners.
              </p>
            </div>
            <div className="pt-4">
              <Button onClick={handleBookNow}>Book Product Shoot</Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-in fade-in duration-1000 delay-300">
            {/* Masonry-style grid simulation */}
            <div className="space-y-4 pt-12">
               <img src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=2787&auto=format&fit=crop" className="w-full aspect-[3/4] object-cover rounded-sm hover:scale-[1.02] transition-transform duration-700" alt="Cosmetic Bottle" />
               <img src="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=2880&auto=format&fit=crop" className="w-full aspect-square object-cover rounded-sm hover:scale-[1.02] transition-transform duration-700" alt="Tech Product" />
               <img src="https://images.unsplash.com/photo-1571781348782-95c4a1e50666?q=80&w=2938&auto=format&fit=crop" className="w-full aspect-[3/4] object-cover rounded-sm hover:scale-[1.02] transition-transform duration-700" alt="Perfume" />
            </div>
            <div className="space-y-4">
               <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2940&auto=format&fit=crop" className="w-full aspect-square object-cover rounded-sm hover:scale-[1.02] transition-transform duration-700" alt="Sneaker" />
               <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=2787&auto=format&fit=crop" className="w-full aspect-[3/4] object-cover rounded-sm hover:scale-[1.02] transition-transform duration-700" alt="Skincare" />
               <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2899&auto=format&fit=crop" className="w-full aspect-square object-cover rounded-sm hover:scale-[1.02] transition-transform duration-700" alt="Watch" />
            </div>
            <div className="space-y-4 pt-8">
               <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2940&auto=format&fit=crop" className="w-full aspect-[3/4] object-cover rounded-sm hover:scale-[1.02] transition-transform duration-700" alt="Headphones" />
               <img src="https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=3030&auto=format&fit=crop" className="w-full aspect-square object-cover rounded-sm hover:scale-[1.02] transition-transform duration-700" alt="Cream" />
               <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=2784&auto=format&fit=crop" className="w-full aspect-[3/4] object-cover rounded-sm hover:scale-[1.02] transition-transform duration-700" alt="Texture" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TRUST */}
      <section className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="animate-in slide-in-from-left duration-700">
            <h2 className="font-serif text-4xl md:text-5xl mb-8">A studio you can trust.</h2>
            <p className="text-gray-500 text-lg leading-relaxed max-w-lg mb-8">
               We offer a full content creation service, from production to delivery. We're "fully stacked", so we have in-house product photographers, stylists, art directors and top retouchers. We build up strong working relationships with our clients and we're very familiar with what clients expect from images of their products.
            </p>
            <div className="h-px w-24 bg-gold-accent"></div>
          </div>
          <div className="relative group animate-in zoom-in-95 duration-1000">
             <div className="absolute inset-0 bg-rich-black/10 group-hover:bg-transparent transition-colors z-10"></div>
             <img src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=2786&auto=format&fit=crop" className="w-full h-[600px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out" alt="Studio Equipment" />
          </div>
        </div>
      </section>

      {/* NEW SECTION: PRODUCTION PROCESS (Cinematic Flowchart) */}
      <section className="py-32 px-6 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-purple-100/30 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-blue-50/40 rounded-full blur-[120px]" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="text-center mb-24 space-y-4">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 animate-in fade-in slide-in-from-bottom-4 duration-700">Seamless Workflow</span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-rich-black animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">Our Production Process</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-500 font-light leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              From intake to final delivery, our streamlined editorial pipeline ensures consistent quality and rapid turnaround for brands of all sizes.
            </p>
          </div>

          <div className="relative">
            {/* Desktop Connector Line (SVG) */}
            <div className="hidden lg:block absolute top-[60px] left-0 w-full h-[100px] pointer-events-none z-0">
               <svg className="w-full h-full overflow-visible">
                 <defs>
                   <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                     <stop offset="0%" stopColor="#E9D5FF" stopOpacity="0.2" />
                     <stop offset="50%" stopColor="#A855F7" stopOpacity="0.8" />
                     <stop offset="100%" stopColor="#E9D5FF" stopOpacity="0.2" />
                   </linearGradient>
                   <filter id="glow">
                     <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                     <feMerge>
                       <feMergeNode in="coloredBlur"/>
                       <feMergeNode in="SourceGraphic"/>
                     </feMerge>
                   </filter>
                 </defs>
                 {/* Main Path */}
                 <path 
                   d="M 100,50 C 250,50 350,50 450,50 S 650,50 750,50 S 950,50 1050,50 S 1250,50 1340,50" 
                   fill="none" 
                   stroke="url(#flowGradient)" 
                   strokeWidth="2" 
                   strokeLinecap="round"
                   filter="url(#glow)"
                   className="opacity-50"
                 />
                 {/* Animated Dot */}
                 <circle r="4" fill="#A855F7">
                   <animateMotion 
                     dur="6s" 
                     repeatCount="indefinite" 
                     path="M 100,50 C 250,50 350,50 450,50 S 650,50 750,50 S 950,50 1050,50 S 1250,50 1340,50" 
                   />
                 </circle>
               </svg>
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-4 relative z-10">
              {[
                { icon: Box, title: "Intake", desc: "Logistics & Prep" },
                { icon: Palette, title: "Direction", desc: "Creative Brief" },
                { icon: Aperture, title: "Setup", desc: "Lighting & Set" },
                { icon: Camera, title: "Shooting", desc: "Capture Phase" },
                { icon: Wand2, title: "Retouch", desc: "Post-Production" },
                { icon: Download, title: "Delivery", desc: "Final Export" }
              ].map((step, idx) => (
                <div 
                  key={idx} 
                  className="group flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-8 fill-mode-forwards"
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  {/* Card */}
                  <div className="w-full aspect-square max-w-[180px] bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-purple-100 hover:-translate-y-2 transition-all duration-500 flex flex-col items-center justify-center p-6 relative group-hover:bg-white/80">
                    <div className={`
                      w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3
                      bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-purple-50 group-hover:to-blue-50 text-gray-600 group-hover:text-purple-600
                    `}>
                      <step.icon size={26} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-serif text-lg font-medium mb-1 group-hover:text-purple-900 transition-colors">{step.title}</h3>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold group-hover:text-purple-400 transition-colors">{step.desc}</p>
                    
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-purple-100 transition-all duration-500"></div>
                  </div>
                  
                  {/* Mobile Connector */}
                  {idx < 5 && <div className="lg:hidden h-8 w-0.5 bg-gradient-to-b from-gray-300 to-transparent my-2"></div>}
                </div>
              ))}
            </div>
          </div>

          {/* KPI / Metrics Panel */}
          <div className="mt-20">
            <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl p-8 lg:p-12 shadow-2xl">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-200/50">
                  
                  {/* Metric 1 */}
                  <div className="flex flex-col items-center justify-center px-4 animate-in fade-in zoom-in-95 duration-700 delay-500">
                     <div className="w-16 h-16 relative flex items-center justify-center mb-4">
                        <svg className="w-full h-full transform -rotate-90">
                           <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="none" className="text-gray-100" />
                           <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="none" className="text-purple-500" strokeDasharray="175" strokeDashoffset="5" strokeLinecap="round" />
                        </svg>
                        <CheckCircle className="absolute w-6 h-6 text-purple-600" />
                     </div>
                     <div className="text-3xl font-serif font-medium mb-1">99.8%</div>
                     <div className="text-xs uppercase tracking-widest text-gray-500">Quality Acceptance</div>
                  </div>

                  {/* Metric 2 */}
                  <div className="flex flex-col items-center justify-center px-4 pt-8 md:pt-0 animate-in fade-in zoom-in-95 duration-700 delay-600">
                     <div className="w-16 h-16 flex items-center justify-center mb-4 bg-blue-50 rounded-full text-blue-600">
                        <Clock size={28} />
                     </div>
                     <div className="text-3xl font-serif font-medium mb-1">24h</div>
                     <div className="text-xs uppercase tracking-widest text-gray-500">Turnaround Time</div>
                  </div>

                  {/* Metric 3 */}
                  <div className="flex flex-col items-center justify-center px-4 pt-8 md:pt-0 animate-in fade-in zoom-in-95 duration-700 delay-700">
                     <div className="w-16 h-16 flex items-center justify-center mb-4">
                        <div className="flex gap-1 items-end h-10">
                           <div className="w-2 h-4 bg-gray-200 rounded-sm"></div>
                           <div className="w-2 h-6 bg-gray-300 rounded-sm"></div>
                           <div className="w-2 h-8 bg-purple-400 rounded-sm"></div>
                           <div className="w-2 h-10 bg-purple-600 rounded-sm animate-pulse"></div>
                        </div>
                     </div>
                     <div className="text-3xl font-serif font-medium mb-1">100%</div>
                     <div className="text-xs uppercase tracking-widest text-gray-500">Brand Consistency</div>
                  </div>

                  {/* Metric 4 */}
                  <div className="flex flex-col items-center justify-center px-4 pt-8 md:pt-0 animate-in fade-in zoom-in-95 duration-700 delay-800">
                     <div className="w-16 h-16 flex items-center justify-center mb-4 bg-green-50 rounded-full text-green-600">
                        <Layers size={28} />
                     </div>
                     <div className="text-3xl font-serif font-medium mb-1">4K+</div>
                     <div className="text-xs uppercase tracking-widest text-gray-500">Asset Resolution</div>
                  </div>

               </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: IMAGE SHOWCASE STRIP */}
      <section className="py-12 bg-rich-black overflow-hidden">
        <div className="flex gap-4 md:gap-8 px-4 md:px-0 overflow-x-auto hide-scrollbar snap-x">
          {[
            "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=2835&auto=format&fit=crop", // Cosmetics
            "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=2864&auto=format&fit=crop", // Shoes
            "https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=2835&auto=format&fit=crop", // Abstract
            "https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?q=80&w=2940&auto=format&fit=crop", // Skincare
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2940&auto=format&fit=crop", // Tech
            "https://images.unsplash.com/photo-1556228720-19de77ee542e?q=80&w=2787&auto=format&fit=crop"  // Purse
          ].map((src, idx) => (
             <div key={idx} className="min-w-[280px] md:min-w-[400px] aspect-square relative group snap-center">
                <img src={src} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" alt="Product Showcase" />
             </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: HERITAGE (20+ Years) */}
      <section className="py-32 px-6 bg-soft-cream">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div className="order-2 lg:order-1 relative">
              <div className="absolute top-8 left-8 w-full h-full border-2 border-rich-black z-0 hidden md:block"></div>
              <img src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=2864&auto=format&fit=crop" className="w-full h-[600px] object-cover relative z-10 shadow-2xl" alt="Dramatic Product Shot" />
           </div>
           <div className="order-1 lg:order-2 space-y-8 animate-in slide-in-from-right duration-700">
              <span className="text-xs font-bold tracking-widest uppercase text-gold-accent">Established Expertise</span>
              <h2 className="font-serif text-5xl md:text-6xl text-rich-black">20+ years in the Industry.</h2>
              <div className="space-y-6 text-charcoal leading-relaxed font-light text-lg">
                 <p>
                    Our long-standing product photography team understands the need to take time to examine your product to work out exactly how best to light it. Unlike many other studios, we specifically and individually light your products to achieve the best results for each particular item.
                 </p>
                 <p>
                    Over many years of trading, we have continually worked with many premium brands, including ASOS, Selfridges, TK Maxx, House of Fraser and Dover Street Market. We're confident we have the experience, expertise and technical ability to provide you with high-quality product photography that can achieve your goals.
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* SECTION 5: ECOMMERCE CARDS */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
           {/* Card 1: Visual */}
           <div className="bg-off-white p-12 flex items-center justify-center min-h-[500px] group overflow-hidden relative">
              <div className="absolute inset-0 bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
              <div className="grid grid-cols-2 gap-4 rotate-3 group-hover:rotate-0 transition-transform duration-700 ease-out">
                 <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=2787&auto=format&fit=crop" className="w-40 h-64 object-cover shadow-lg rounded-sm" />
                 <img src="https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=2787&auto=format&fit=crop" className="w-40 h-64 object-cover shadow-lg rounded-sm mt-12" />
              </div>
           </div>

           {/* Card 2: Content */}
           <div className="flex flex-col justify-center space-y-8 p-4 md:p-12">
              <h3 className="font-serif text-4xl md:text-5xl text-rich-black">Ecommerce Product Photography.</h3>
              <p className="text-charcoal leading-relaxed">
                 If you require clean, high-end catalogue images for online, print, or PR purposes, consider trying our e-commerce photography service. High-quality images are not a luxury but a necessity when it comes to driving online sales. Therefore, it's crucial to select a studio that consistently delivers top-notch images — and that's exactly what we do.
              </p>
              <div>
                 <Button onClick={() => navigate('/services/ecommerce')}>Ecommerce Photography</Button>
              </div>
           </div>
        </div>
      </section>

      {/* SECTION 6: TESTIMONIALS (Black) */}
      <section className="py-32 px-6 bg-rich-black text-white text-center relative overflow-hidden">
         {/* Grain overlay */}
         <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
         
         <div className="max-w-4xl mx-auto relative z-10">
            <span className="font-serif text-8xl text-charcoal leading-none">“</span>
            <h3 className="font-serif text-3xl md:text-5xl leading-tight mb-12 -mt-8">
               I've been using Blend Studios for the past 6 years and have only ever found them to be friendly, professional and experts in creating the perfect product shots
            </h3>
            <div className="flex items-center justify-center space-x-12">
               <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-white">Alan Solomon</p>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Alban Cycle Bags</p>
               </div>
            </div>
         </div>
      </section>

      {/* SECTION 7: BENEFITS GRID */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-[1440px] mx-auto">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Left Column (Text Cards) */}
              <div className="space-y-8">
                 <div className="p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="w-12 h-12 bg-off-white rounded-full flex items-center justify-center mb-6">
                       <Zap className="text-rich-black w-6 h-6" />
                    </div>
                    <h4 className="font-serif text-2xl mb-4">Consistency</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">It's fundamental that all your photographs look consistent in quality, across all channels, every season. We take great care to produce images that always meet your high standards.</p>
                 </div>
                 <div className="p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="w-12 h-12 bg-off-white rounded-full flex items-center justify-center mb-6">
                       <Star className="text-rich-black w-6 h-6" />
                    </div>
                    <h4 className="font-serif text-2xl mb-4">Boost Brand Image</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">Using exceptional images across your marketing collateral shows your customers you don't compromise on quality. Our expert photography communicates how brilliant your products are.</p>
                 </div>
              </div>

              {/* Center Column (Phone Mockup) */}
              <div className="flex items-center justify-center py-12 md:py-0">
                 <div className="relative w-[280px] h-[580px] bg-rich-black rounded-[3rem] border-8 border-gray-800 shadow-2xl overflow-hidden">
                    <div className="absolute top-0 w-full h-full bg-white overflow-hidden flex flex-col">
                       {/* Mock UI */}
                       <div className="h-14 bg-white border-b flex items-center justify-center font-serif font-bold text-xs">FASHION OS.</div>
                       <div className="flex-1 overflow-hidden">
                          <img src="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=2880&auto=format&fit=crop" className="w-full h-2/3 object-cover" />
                          <div className="p-6">
                             <div className="h-4 w-24 bg-gray-200 mb-2"></div>
                             <div className="h-3 w-32 bg-gray-100 mb-6"></div>
                             <div className="h-10 w-full bg-black text-white flex items-center justify-center text-xs uppercase font-bold tracking-widest">Add to Bag</div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Right Column (Text Cards) */}
              <div className="space-y-8 mt-8 lg:mt-0">
                 <div className="p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="w-12 h-12 bg-off-white rounded-full flex items-center justify-center mb-6">
                       <BarChart className="text-rich-black w-6 h-6" />
                    </div>
                    <h4 className="font-serif text-2xl mb-4">Improve Sales</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">Great images have been proven to drive up sales and increase profit. Customers are naturally drawn to the content we create for our clients because it's well laid out and beautifully lit.</p>
                 </div>
                 <div className="p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="w-12 h-12 bg-off-white rounded-full flex items-center justify-center mb-6">
                       <Smartphone className="text-rich-black w-6 h-6" />
                    </div>
                    <h4 className="font-serif text-2xl mb-4">Enhance Media</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">With social media platforms bigger than ever before, it's vital you have the right content to advertise your products. Entice your audience with colourful, creative shots.</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* SECTION 8: CREATIVE STILL LIFE */}
      <section className="py-32 px-6 bg-warm-beige/30">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div className="space-y-8">
              <h2 className="font-serif text-4xl md:text-5xl text-rich-black">Need something a little more creative?</h2>
              <div className="space-y-6 text-charcoal font-light leading-relaxed">
                 <p>Looking for unique photography that's tailored to you and your brand?</p>
                 <p>At Blend, we have years of experience in creative product photography. Our lighting expertise, professional studio equipment and masterful creative direction mean your images will be delivered to a consistently high standard.</p>
                 <p>Our still life photography service gives you the freedom to style your products however you like, with the option of incorporating props and interesting backgrounds.</p>
              </div>
              <Button onClick={() => navigate('/services/creative-still-life')}>Jump to Still Life</Button>
           </div>
           <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                 <img src="https://images.unsplash.com/photo-1563170351-be82bc888aa4?q=80&w=2836&auto=format&fit=crop" className="w-full h-80 object-cover rounded-sm translate-y-8 shadow-xl" />
                 <img src="https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=2787&auto=format&fit=crop" className="w-full h-80 object-cover rounded-sm -translate-y-8 shadow-xl" />
              </div>
           </div>
        </div>
      </section>

      {/* SECTION 9: STOP MOTION / GIF */}
      <section className="py-32 px-6 bg-white">
         <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="aspect-[4/5] bg-gray-100 rounded-sm overflow-hidden group">
               <img src="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=2880&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="text-center space-y-6 px-4">
               <h3 className="font-serif text-4xl md:text-5xl">Want to really stand out?</h3>
               <p className="text-gray-500 text-sm">Nothing catches the eye quite like a moving image – and our striking GIF's cater to even the most creative of visions.</p>
               <Button onClick={() => navigate('/services/video-production')} variant={ButtonVariant.SECONDARY} className="bg-black text-white hover:bg-gray-800 border-none">Stop Motion</Button>
            </div>
            <div className="aspect-[4/5] bg-gray-100 rounded-sm overflow-hidden group relative">
               <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                     <Play className="text-white fill-white ml-1" />
                  </div>
               </div>
               <img src="https://images.unsplash.com/photo-1531297461136-82lw9b44d94l?q=80&w=2674&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-75" />
            </div>
         </div>
      </section>

      {/* SECTION 10: BEHIND THE SCENES */}
      <section className="py-24 px-6 bg-off-white">
         <div className="max-w-[1440px] mx-auto">
            <h2 className="font-serif text-3xl mb-12 border-b border-gray-200 pb-4">Behind the scenes.</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
               {[1,2,3,4,5].map((i) => (
                  <div key={i} className="aspect-square bg-gray-200 rounded-sm overflow-hidden group relative cursor-pointer">
                     <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                     <img src={`https://images.unsplash.com/photo-${i % 2 === 0 ? '1605218427368-35b81a3dd716' : '1581044777550-4cfa60707c03'}?q=80&w=800&auto=format&fit=crop`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                     <div className="absolute bottom-2 left-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ImageIcon className="text-white w-4 h-4" />
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* SECTION 11: FINAL CTA */}
      <section className="py-32 px-6 bg-rich-black text-white text-center" id="contact">
         <div className="max-w-xl mx-auto space-y-8">
            <h2 className="font-serif text-5xl md:text-6xl">Get in Touch.</h2>
            <p className="text-gray-400 font-light text-lg">
               Ready to elevate your product imagery? Let's discuss your next campaign.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
               <div className="flex-1">
                   <input type="text" placeholder="Name" className="w-full bg-charcoal border-none px-4 py-3 text-white placeholder-gray-500 focus:ring-1 focus:ring-white" />
               </div>
               <div className="flex-1">
                   <input type="email" placeholder="Email" className="w-full bg-charcoal border-none px-4 py-3 text-white placeholder-gray-500 focus:ring-1 focus:ring-white" />
               </div>
            </div>
            <textarea placeholder="Tell us about your project" rows={4} className="w-full bg-charcoal border-none px-4 py-3 text-white placeholder-gray-500 focus:ring-1 focus:ring-white"></textarea>
            
            <Button className="w-full bg-white text-black hover:bg-gray-200 border-none">Submit Enquiry</Button>
         </div>
      </section>

    </div>
  );
};
