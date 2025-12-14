
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Button';
import { ButtonVariant } from '../../types';
import { Monitor, Camera, Video, ShoppingBag, Instagram, Sparkles, ArrowRight, Play } from 'lucide-react';

export const ServicesList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-0">
        {/* Block 1: Web Design */}
        <section className="py-24 px-6 bg-gray-50">
           <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="order-2 lg:order-1 relative">
                 <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
                 <img src="https://images.unsplash.com/photo-1467232004584-a241de8bcf7d?q=80&w=2938&auto=format&fit=crop" className="w-full h-[600px] object-cover rounded-sm shadow-2xl relative z-10" alt="Web Design" />
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
                    <div onClick={() => navigate('/services/product-photography')} className="flex items-center p-4 border border-gray-100 rounded-sm hover:border-purple-200 cursor-pointer transition-colors group">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3"></div>
                      <span className="font-bold text-sm">Product Photography</span>
                      <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div onClick={() => navigate('/services/clothing-photography')} className="flex items-center p-4 border border-gray-100 rounded-sm hover:border-purple-200 cursor-pointer transition-colors group">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3"></div>
                      <span className="font-bold text-sm">Clothing Photography</span>
                      <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div onClick={() => navigate('/services/creative-still-life')} className="flex items-center p-4 border border-gray-100 rounded-sm hover:border-purple-200 cursor-pointer transition-colors group">
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
                 <img src="https://images.unsplash.com/photo-1550614000-4b9519e02d48?q=80&w=2788&auto=format&fit=crop" className="w-full h-[600px] object-cover rounded-sm shadow-2xl relative z-10" alt="Photography" />
              </div>
           </div>
        </section>

        {/* Block 3: Video Production */}
        <section className="py-24 px-6 bg-gray-50">
           <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="order-2 lg:order-1 relative group cursor-pointer" onClick={() => navigate('/services/video-production')}>
                 <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors z-20 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm group-hover:scale-110 transition-transform">
                       <Play className="w-8 h-8 ml-1" />
                    </div>
                 </div>
                 <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2942&auto=format&fit=crop" className="w-full h-[600px] object-cover rounded-sm shadow-2xl relative z-10" alt="Video" />
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
                 <Button onClick={() => navigate('/services/video-production')}>View Showreel</Button>
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
                 <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2899&auto=format&fit=crop" className="w-full h-[600px] object-cover rounded-sm shadow-2xl relative z-10" alt="Ecommerce" />
              </div>
           </div>
        </section>

        {/* Block 5: Social Media */}
        <section className="py-24 px-6 bg-gray-50">
           <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="order-2 lg:order-1 relative cursor-pointer" onClick={() => navigate('/services/instagram')}>
                 <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2874&auto=format&fit=crop" className="w-full h-[600px] object-cover rounded-sm shadow-2xl relative z-10 hover:brightness-90 transition-all" alt="Social Media" />
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
                 <Button onClick={() => navigate('/services/instagram')}>Start Growing</Button>
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
                 <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2865&auto=format&fit=crop" className="w-full h-[600px] object-cover rounded-sm shadow-2xl relative z-10" alt="AI Creative" />
              </div>
           </div>
        </section>
    </div>
  );
};
