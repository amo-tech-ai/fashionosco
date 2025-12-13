
import React, { useEffect, useState } from 'react';
import { InstagramHero } from '../components/instagram/InstagramHero';
import { InstagramValue } from '../components/instagram/InstagramValue';
import { InstagramPhotography } from '../components/instagram/InstagramPhotography';
import { InstagramVideo } from '../components/instagram/InstagramVideo';
import { InstagramFormats } from '../components/instagram/InstagramFormats';
import { InstagramShop } from '../components/instagram/InstagramShop';
import { InstagramPortfolio } from '../components/instagram/InstagramPortfolio';
import { InstagramFeatures } from '../components/instagram/InstagramFeatures';
import { InstagramTestimonial } from '../components/instagram/InstagramTestimonial';
import { InstagramContact } from '../components/instagram/InstagramContact';
import { InstagramCaptionGenerator } from '../components/instagram/InstagramCaptionGenerator';
import { InstagramProfileAuditor } from '../components/instagram/InstagramProfileAuditor';
import { InstagramEngagementPredictor } from '../components/instagram/InstagramEngagementPredictor';
import { Sparkles, BarChart, Gauge } from 'lucide-react';

export const InstagramServices: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'caption' | 'audit' | 'predict'>('caption');

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

  return (
    <div className="bg-white text-gray-900 font-sans selection:bg-black selection:text-white overflow-x-hidden">
      <InstagramHero />
      
      {/* AI Tool Suite Section */}
      <section className="py-24 px-6 bg-[#111111] text-white" id="ai-tools">
         <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
               <span className="text-xs font-bold tracking-widest uppercase text-purple-400">FashionOS Intelligence</span>
               <h2 className="font-serif text-3xl md:text-4xl mt-3">AI Growth Suite</h2>
            </div>

            {/* Tab Switcher */}
            <div className="flex justify-center mb-12">
               <div className="bg-white/10 p-1 rounded-full flex backdrop-blur-md border border-white/10 overflow-x-auto max-w-full">
                  <button 
                     onClick={() => setActiveTab('caption')}
                     className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                        activeTab === 'caption' ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'
                     }`}
                  >
                     <Sparkles size={14} /> Caption Gen
                  </button>
                  <button 
                     onClick={() => setActiveTab('predict')}
                     className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                        activeTab === 'predict' ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'
                     }`}
                  >
                     <Gauge size={14} /> Viral Scorer
                  </button>
                  <button 
                     onClick={() => setActiveTab('audit')}
                     className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                        activeTab === 'audit' ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'
                     }`}
                  >
                     <BarChart size={14} /> Profile Audit
                  </button>
               </div>
            </div>

            {/* Tool Content */}
            <div className="min-h-[600px]">
               {activeTab === 'caption' && <InstagramCaptionGenerator />}
               {activeTab === 'predict' && <InstagramEngagementPredictor />}
               {activeTab === 'audit' && <InstagramProfileAuditor />}
            </div>
         </div>
      </section>

      <InstagramValue />
      <InstagramPhotography />
      <InstagramVideo />
      <InstagramFormats />
      <InstagramShop />
      <InstagramPortfolio />
      <InstagramFeatures />
      <InstagramTestimonial />
      <InstagramContact />
    </div>
  );
};
