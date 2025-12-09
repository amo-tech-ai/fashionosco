import React from 'react';
import { Button } from '../components/Button';
import { ButtonVariant } from '../types';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Camera, Scissors, ShoppingBag, Video, Play, Star, MapPin, Search, Calendar, Wand2, Share2 } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-0">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-24 md:pt-24 md:pb-32 px-6">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Text */}
          <div className="lg:col-span-5 space-y-8 relative z-10">
            <span className="text-xs font-bold tracking-widest uppercase text-gray-500">FashionOS Studio</span>
            <h1 className="font-serif text-5xl md:text-7xl leading-[1.1] font-medium text-black">
              Exceptional fashion imagery. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Every time.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-md">
              Runway, campaigns, ecommerce, and editorial — we help fashion brands look as premium as they feel.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button onClick={() => navigate('/services')}>Book a Discovery Call</Button>
              <Button variant={ButtonVariant.SECONDARY} onClick={() => navigate('/services')}>Explore Directory</Button>
            </div>
            <div className="pt-8 text-xs text-gray-400 space-y-1">
              <p>• Runway & backstage coverage</p>
              <p>• Ecommerce & lookbooks</p>
              <p>• Campaigns, video & social content</p>
            </div>
          </div>

          {/* Right: Editorial Collage */}
          <div className="lg:col-span-7 relative h-[600px] hidden md:block">
             <div className="absolute top-0 right-0 w-2/3 h-4/5 overflow-hidden rounded-sm shadow-xl hover:shadow-2xl transition-shadow duration-500">
               <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2788&auto=format&fit=crop" alt="Fashion Editorial" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
             </div>
             <div className="absolute bottom-0 left-12 w-1/2 h-3/5 overflow-hidden rounded-sm shadow-xl z-20 border-4 border-white">
               <img src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=2946&auto=format&fit=crop" alt="Runway Model" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
             </div>
             <div className="absolute top-20 left-0 w-1/3 h-1/3 overflow-hidden rounded-sm shadow-lg z-10 grayscale hover:grayscale-0 transition-all duration-500">
                <img src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=2940&auto=format&fit=crop" alt="Fashion Detail" className="w-full h-full object-cover" />
             </div>
          </div>
        </div>
      </section>

      {/* 2. LATEST CAMPAIGNS */}
      <section className="bg-gray-50 py-24 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex justify-between items-end mb-12 border-b border-gray-200 pb-4">
             <div>
                <span className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-2 block">Featured Work</span>
                <h2 className="font-serif text-4xl font-medium">Latest Campaigns</h2>
             </div>
             <span className="text-xs tracking-widest uppercase hidden md:block">Swipe to Explore</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {/* Card 1 */}
             <div className="group cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-200 mb-4">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                  <img src="https://images.unsplash.com/photo-1529139574466-a302d2053990?q=80&w=2788&auto=format&fit=crop" alt="Summer Editorial" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute bottom-6 left-6 z-20 text-white">
                     <p className="text-xs font-bold uppercase tracking-widest mb-1">Campaign</p>
                     <h3 className="font-serif text-2xl">Summer Editorial '25</h3>
                  </div>
                </div>
             </div>
             {/* Card 2 */}
             <div className="group cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-200 mb-4">
                  <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2940&auto=format&fit=crop" alt="Milan Fashion Week" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute bottom-6 left-6 z-20 text-white drop-shadow-md">
                     <p className="text-xs font-bold uppercase tracking-widest mb-1">Runway</p>
                     <h3 className="font-serif text-2xl">Milan Fashion Week</h3>
                  </div>
                </div>
             </div>
             {/* Card 3 */}
             <div className="group cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-200 mb-4">
                  <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2940&auto=format&fit=crop" alt="Lookbook" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute bottom-6 left-6 z-20 text-white drop-shadow-md">
                     <p className="text-xs font-bold uppercase tracking-widest mb-1">Lookbook</p>
                     <h3 className="font-serif text-2xl">Urban Streetwear</h3>
                  </div>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <ArrowRight className="w-5 h-5 text-black" />
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 3. STUDIO YOU CAN TRUST (Story) */}
      <section className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div className="order-2 lg:order-1 relative">
                <div className="aspect-[4/3] rounded-sm overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=2786&auto=format&fit=crop" alt="Studio Life" className="w-full h-full object-cover" />
                </div>
                {/* Floating card */}
                <div className="absolute -bottom-10 -right-10 bg-white p-8 shadow-2xl max-w-xs hidden md:block border border-gray-100">
                   <h4 className="font-serif text-xl mb-2">"A game changer for our brand identity."</h4>
                   <p className="text-xs text-gray-500 uppercase tracking-widest">— Vogue Magazine</p>
                </div>
             </div>
             <div className="order-1 lg:order-2 space-y-6">
                <h2 className="font-serif text-4xl md:text-5xl font-medium">A studio you can trust.</h2>
                <p className="text-gray-500 text-lg leading-relaxed">
                   We understand the pressures of the fashion calendar. From Fashion week deadlines to seasonal drops, agencies and designers rely on us for on-time, high-fidelity assets.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                   <div className="bg-gray-50 p-6 rounded-sm">
                      <h4 className="font-bold text-sm mb-2">On-set Creative Direction</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">Our art directors work with you to ensure every shot aligns with your campaign vision.</p>
                   </div>
                   <div className="bg-gray-50 p-6 rounded-sm">
                      <h4 className="font-bold text-sm mb-2">Rapid Retouching</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">First proofs in 24 hours. Final assets delivered ready for print and digital channels.</p>
                   </div>
                   <div className="bg-gray-50 p-6 rounded-sm">
                      <h4 className="font-bold text-sm mb-2">Brand Consistency</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">We maintain your visual identity across lookbooks, social, and ecommerce.</p>
                   </div>
                </div>
                <div className="pt-6">
                   <Button variant={ButtonVariant.SECONDARY} onClick={() => navigate('/services')}>View Studio Services</Button>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 4. HERITAGE */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1440px] mx-auto">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-5 relative">
                   <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2820&auto=format&fit=crop" alt="Fashion Heritage" className="w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="lg:col-span-7 flex flex-col justify-center pl-0 lg:pl-12">
                   <span className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-4">Our Heritage</span>
                   <h2 className="font-serif text-5xl md:text-6xl mb-8 text-black">
                      20+ years in the <br />fashion industry.
                   </h2>
                   <p className="text-xl text-gray-600 mb-8 max-w-2xl font-light">
                      From boutique labels to Fortune 500 brands, we've mastered the art of capturing fashion that sells. Our extensive portfolio includes work for fashion houses, beauty brands, jewelry designers, and lifestyle companies across the globe.
                   </p>
                   <ul className="space-y-4 mb-10">
                      {[
                         'Global runway coverage',
                         'Campaigns for independent labels',
                         'Ecommerce & catalog production',
                         'Creative consultation'
                      ].map((item, idx) => (
                         <li key={idx} className="flex items-center text-sm font-medium">
                            <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-3 text-xs">
                               <Star className="w-3 h-3" />
                            </span>
                            {item}
                         </li>
                      ))}
                   </ul>
                   <div className="flex items-center space-x-2 text-xs font-bold tracking-widest uppercase cursor-pointer group">
                      <span>See Client Stories</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
                   </div>
                </div>
             </div>
        </div>
      </section>

      {/* 5. ECOMMERCE FEATURE BLOCK */}
      <section className="py-32 bg-slate-900 text-white px-6">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
               <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">Ecommerce Product Photography.</h2>
               <p className="text-slate-400 text-lg mb-8 max-w-md">Clean, high-fidelity product photography increases conversion and reduces returns. We provide styling, shooting, and retouching optimized for Shopify, Amazon, and luxury marketplaces.</p>
               <div className="space-y-6">
                  <div className="flex items-start">
                     <div className="mt-1 mr-4">
                        <div className="w-5 h-5 rounded-full border border-slate-600 flex items-center justify-center">
                           <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                     </div>
                     <div>
                        <h4 className="font-bold text-sm">Consistent Lighting & Styling</h4>
                        <p className="text-xs text-slate-500 mt-1">Ensure your collection looks cohesive on the grid.</p>
                     </div>
                  </div>
                  <div className="flex items-start">
                     <div className="mt-1 mr-4">
                        <div className="w-5 h-5 rounded-full border border-slate-600 flex items-center justify-center">
                           <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                     </div>
                     <div>
                        <h4 className="font-bold text-sm">On-Model, Flat-Lay, or Ghost Mannequin</h4>
                        <p className="text-xs text-slate-500 mt-1">Versatile shooting styles to match your brand guidelines.</p>
                     </div>
                  </div>
               </div>
               <div className="mt-10">
                  <Button variant={ButtonVariant.SECONDARY} className="bg-white text-black border-none hover:bg-slate-200">View Ecommerce Packages</Button>
               </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2940&auto=format&fit=crop" alt="Shoe Product" className="rounded-lg opacity-80 hover:opacity-100 transition-opacity duration-500" />
               <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2899&auto=format&fit=crop" alt="Watch Product" className="rounded-lg mt-12 opacity-80 hover:opacity-100 transition-opacity duration-500" />
            </div>
        </div>
      </section>

      {/* 6. TESTIMONIAL BREAKER */}
      <section className="bg-black py-24 px-6 text-center">
         <div className="max-w-4xl mx-auto">
            <span className="text-6xl text-white font-serif">"</span>
            <h3 className="font-serif text-3xl md:text-4xl text-white leading-normal mb-8">
               We've trusted FashionOS Studio with our campaigns for 6+ years. They always deliver imagery that moves product.
            </h3>
            <div className="flex flex-col items-center">
               <p className="text-white font-bold text-sm tracking-widest uppercase mb-1">Cristina Álvarez</p>
               <p className="text-gray-500 text-xs uppercase tracking-widest">Creative Director, Atelier Eclipse</p>
               <div className="mt-8 text-xs text-gray-600 cursor-pointer hover:text-white transition-colors">See more client feedback →</div>
            </div>
         </div>
      </section>

      {/* 7. CORE SERVICES GRID */}
      <section className="py-32 px-6 max-w-[1440px] mx-auto">
        <div className="flex justify-between items-end mb-16">
           <div>
              <span className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-2 block">What We Do</span>
              <h2 className="font-serif text-4xl font-medium">Creative Services</h2>
           </div>
           <a href="#" className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-600">View All Services</a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200">
           {[
              { icon: Camera, title: "Campaigns", desc: "Editorial-quality campaigns for new launches and seasonal stories." },
              { icon: Scissors, title: "Runway", desc: "On-the-ground coverage that captures energy, details, and atmosphere." },
              { icon: ShoppingBag, title: "Ecommerce", desc: "High-volume, consistent imagery optimized for online sales." },
              { icon: Video, title: "Video & Social", desc: "Short-form video, reels, and behind-the-scenes content for social." },
           ].map((service, idx) => (
              <div key={idx} className="bg-white p-10 hover:bg-gray-50 transition-colors group h-full flex flex-col justify-between">
                 <div>
                    <div className="w-10 h-10 mb-6 text-gray-400 group-hover:text-black transition-colors">
                       <service.icon strokeWidth={1.5} />
                    </div>
                    <h3 className="font-bold text-lg mb-3">{service.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-8">{service.desc}</p>
                 </div>
                 <div className="flex items-center text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                    View Details <ArrowRight className="w-3 h-3 ml-2" />
                 </div>
              </div>
           ))}
        </div>
      </section>

      {/* 8. FASHION DIRECTORY */}
      <section className="py-24 bg-gray-50 px-6">
         <div className="max-w-[1440px] mx-auto">
            <div className="lg:flex lg:justify-between lg:items-start mb-12">
               <div className="max-w-lg">
                  <span className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-2 block">The Network</span>
                  <h2 className="font-serif text-4xl font-medium mb-4">Fashion Directory.</h2>
                  <p className="text-gray-500">We curate a network of the best photographers, stylists, models, and MUAs in the industry. Find your next collaborator.</p>
               </div>
               <div className="mt-8 lg:mt-0 flex flex-col space-y-4">
                  <div className="flex space-x-2">
                     <div className="relative">
                        <input type="text" placeholder="Search talent, services, or cities..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-sm text-sm w-64 focus:outline-none focus:border-black" />
                        <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                     </div>
                     <button className="bg-black text-white px-4 py-2 text-xs font-bold uppercase tracking-widest">Search</button>
                  </div>
                  <div className="flex space-x-2 text-[10px] uppercase font-bold text-gray-400">
                     <span className="border border-gray-200 px-2 py-1 bg-white cursor-pointer hover:border-black hover:text-black transition-colors">Photographers</span>
                     <span className="border border-gray-200 px-2 py-1 bg-white cursor-pointer hover:border-black hover:text-black transition-colors">Stylists</span>
                     <span className="border border-gray-200 px-2 py-1 bg-white cursor-pointer hover:border-black hover:text-black transition-colors">Models</span>
                     <span className="border border-gray-200 px-2 py-1 bg-white cursor-pointer hover:border-black hover:text-black transition-colors">MUAs</span>
                     <span className="border border-gray-200 px-2 py-1 bg-white cursor-pointer hover:border-black hover:text-black transition-colors">Paris</span>
                     <span className="border border-gray-200 px-2 py-1 bg-white cursor-pointer hover:border-black hover:text-black transition-colors">NYC</span>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                  { name: 'Elena Rodriguez', role: 'Photographer', loc: 'Paris, FR', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop', tags: ['Editorial', 'Film'] },
                  { name: 'Marcus Chen', role: 'Stylist', loc: 'New York, USA', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2787&auto=format&fit=crop', tags: ['Runway', 'Personal'] },
                  { name: 'Sarah Jenkins', role: 'Model', loc: 'London, UK', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2550&auto=format&fit=crop', tags: ['Commercial', 'High Fashion'] },
               ].map((profile, idx) => (
                  <div key={idx} className="bg-white group cursor-pointer border border-transparent hover:border-gray-200 transition-all hover:shadow-lg">
                     <div className="aspect-[3/4] overflow-hidden relative">
                        <img src={profile.img} alt={profile.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                        <div className="absolute top-4 left-4">
                           <span className="bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-widest px-2 py-1">{profile.role}</span>
                        </div>
                     </div>
                     <div className="p-6">
                        <h3 className="font-serif text-xl mb-1">{profile.name}</h3>
                        <p className="text-xs text-gray-500 uppercase tracking-widest mb-4 flex items-center">
                           <span className="text-yellow-400 mr-1">★★★★★</span> (24)
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                           {profile.tags.map(tag => (
                              <span key={tag} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-sm">{tag}</span>
                           ))}
                        </div>
                     </div>
                  </div>
               ))}
            </div>
            
            <div className="mt-12 text-center">
               <Button variant={ButtonVariant.SECONDARY}>Browse Full Directory</Button>
            </div>
         </div>
      </section>

      {/* 9. MARKETPLACE */}
      <section className="py-24 px-6 max-w-[1440px] mx-auto">
         <div className="text-center mb-16">
             <span className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-2 block">Packages</span>
             <h2 className="font-serif text-4xl font-medium">Fashion Marketplace.</h2>
             <p className="text-gray-500 mt-4 max-w-xl mx-auto">Ready-made packages for emerging and established brands.</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative group overflow-hidden rounded-lg aspect-square">
               <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2874&auto=format&fit=crop" alt="Lookbook" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
                  <h3 className="font-serif text-2xl mb-1">Lookbook Starter</h3>
                  <p className="text-sm text-gray-300 mb-4">$2,500</p>
                  <button className="bg-white text-black py-2 px-4 text-xs font-bold uppercase tracking-widest opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">View Package</button>
               </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg aspect-square">
               <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2940&auto=format&fit=crop" alt="Campaign" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
                  <h3 className="font-serif text-2xl mb-1">Campaign Launch</h3>
                  <p className="text-sm text-gray-300 mb-4">$5,800</p>
                  <button className="bg-white text-black py-2 px-4 text-xs font-bold uppercase tracking-widest opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">View Package</button>
               </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg aspect-square">
               <img src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=2942&auto=format&fit=crop" alt="Ecommerce" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
                  <h3 className="font-serif text-2xl mb-1">Ecommerce Scale</h3>
                  <p className="text-sm text-gray-300 mb-4">Custom Quote</p>
                  <button className="bg-white text-black py-2 px-4 text-xs font-bold uppercase tracking-widest opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">View Package</button>
               </div>
            </div>
         </div>
      </section>

      {/* 10. USER JOURNEY FLOW */}
      <section className="py-32 px-6 bg-slate-50 relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
           <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-purple-100 rounded-full blur-[120px] opacity-40 -translate-y-1/2 animate-pulse"></div>
           <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[120px] opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="text-center mb-20">
            <span className="text-xs font-bold tracking-widest uppercase text-purple-600 mb-2 block">The Workflow</span>
            <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6">From Concept to Campaign.</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light">
               A seamless, AI-integrated pathway to produce high-fidelity fashion assets at scale.
            </p>
          </div>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-10 left-[10%] w-[80%] h-0.5 z-0">
               {/* Base Line */}
               <div className="w-full h-full bg-gray-200"></div>
               {/* Animated Progress Line */}
               <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600 to-blue-500 w-full origin-left animate-[grow_3s_ease-out_infinite]"></div>
            </div>
            
            <style>{`
               @keyframes grow {
                  0% { transform: scaleX(0); opacity: 1; }
                  50% { transform: scaleX(1); opacity: 1; }
                  100% { transform: scaleX(1); opacity: 0; }
               }
            `}</style>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
              {[
                { icon: Search, title: "Browse", sub: "Curated Talent", desc: "Filter by style & rating." },
                { icon: Calendar, title: "Book", sub: "Direct Scheduling", desc: "Secure creatives instantly." },
                { icon: Camera, title: "Capture", sub: "Production", desc: "Shoot with digital tools." },
                { icon: Wand2, title: "Enhance", sub: "AI Processing", desc: "Auto-grade & retouch." },
                { icon: Share2, title: "Publish", sub: "Global Reach", desc: "Export for all channels." }
              ].map((step, idx) => (
                <div key={idx} className="group flex flex-col items-center text-center relative">
                  {/* Icon Circle */}
                  <div className="w-20 h-20 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center shadow-sm mb-8 group-hover:border-black group-hover:scale-110 transition-all duration-300 relative z-10">
                     <step.icon className="w-8 h-8 text-gray-400 group-hover:text-black transition-colors duration-300" strokeWidth={1.5} />
                     <div className="absolute -top-2 -right-2 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                        {idx + 1}
                     </div>
                  </div>
                  
                  {/* Content Card */}
                  <div className="bg-white p-6 w-full rounded-sm border border-gray-100 shadow-sm group-hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                     <h3 className="font-serif text-xl mb-1 group-hover:text-purple-600 transition-colors">{step.title}</h3>
                     <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">{step.sub}</p>
                     <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                  </div>
                  
                  {/* Mobile Arrow */}
                  {idx < 4 && (
                     <div className="md:hidden my-4 text-gray-300">
                        <ArrowRight className="w-5 h-5 rotate-90" />
                     </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 11. BEHIND THE SCENES */}
      <section className="relative h-[80vh] bg-fixed bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2942&auto=format&fit=crop')" }}>
         <div className="absolute inset-0 bg-black/40"></div>
         <div className="relative z-10 text-center text-white">
             <div className="w-20 h-20 rounded-full border-2 border-white flex items-center justify-center mx-auto mb-8 cursor-pointer hover:bg-white hover:text-black transition-colors duration-300">
                <Play className="w-8 h-8 ml-1" fill="currentColor" />
             </div>
             <h2 className="font-serif text-5xl md:text-7xl mb-4">Behind the scenes.</h2>
             <p className="text-xl max-w-md mx-auto opacity-90">Take a peek at how we plan, light, and shoot your campaigns.</p>
             <div className="mt-8">
               <button className="bg-white text-black px-8 py-3 text-xs font-bold uppercase tracking-widest">Watch The Studio Tour</button>
             </div>
         </div>
      </section>

      {/* 12. CTA / FOOTER PREVIEW */}
      <section className="bg-gray-100 py-32 px-6">
         <div className="max-w-4xl mx-auto bg-white p-12 md:p-20 shadow-2xl relative overflow-hidden">
             {/* Decorative */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
             
             <div className="relative z-10 text-center">
                <span className="text-xs font-bold tracking-widest uppercase text-blue-600 mb-4 block">Bespoke Production</span>
                <h2 className="font-serif text-4xl md:text-5xl mb-6">Need something a <br/>little more creative?</h2>
                <p className="text-gray-500 mb-10 max-w-lg mx-auto leading-relaxed">
                   Have a complex vision? We love the unusual. Bring us your wildest briefs for multi-day productions, exotic locations, or set builds.
                </p>
                <div className="flex flex-col md:flex-row justify-center gap-6 items-center">
                   <ul className="text-left text-sm space-y-2 mb-6 md:mb-0 md:mr-12">
                      <li className="flex items-center"><div className="w-1.5 h-1.5 bg-black rounded-full mr-2"></div> Full campaign development</li>
                      <li className="flex items-center"><div className="w-1.5 h-1.5 bg-black rounded-full mr-2"></div> Concept, casting, and location scouting</li>
                      <li className="flex items-center"><div className="w-1.5 h-1.5 bg-black rounded-full mr-2"></div> Multi-day, multi-location productions</li>
                   </ul>
                   <Button>Start a Custom Brief</Button>
                </div>
             </div>
         </div>
      </section>

    </div>
  );
};