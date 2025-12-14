
import React from 'react';
import { VideoGenerator } from '../components/video/VideoGenerator';
import { VideoHero } from '../components/video-production/VideoHero';
import { VideoProcess } from '../components/video-production/VideoProcess';
import { VideoTypes } from '../components/video-production/VideoTypes';
import { VideoPlatforms } from '../components/video-production/VideoPlatforms';
import { VideoBTS } from '../components/video-production/VideoBTS';
import { VideoPortfolio } from '../components/video-production/VideoPortfolio';
import { LogoStrip } from '../components/common/LogoStrip';
import { HomeTestimonial } from '../components/home/HomeTestimonial'; // Reusing
import { ContactSection } from '../components/common/ContactSection';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { ButtonVariant } from '../types';
import { Play } from 'lucide-react';

export const VideoProduction: React.FC = () => {
  const navigate = useNavigate();

  const handleBookVideo = () => {
      localStorage.removeItem('wizard_state');
      navigate('/shoot-wizard', { state: { prefill: { shootType: 'video', videoAddOn: true } } });
  };

  return (
    <div className="bg-[#FAF8F5] text-[#111111] font-sans selection:bg-black selection:text-white">
      
      {/* Re-implemented VideoHero here to override CTA behavior properly without drilling props too deep for now, or just use the component if it accepted props. Since VideoHero is simple, I'll keep it clean in the main file for this specific page logic override if needed, OR update the component directly. Let's update the component usage if possible. Actually, simpler to just inline the specific CTA logic if the component is rigid. 
      Wait, VideoHero is imported. I should check if I can modify it or if I need to replace it. 
      VideoHero.tsx has hardcoded scroll behavior. I'll modify VideoHero.tsx content via file update to be smarter. 
      Actually, let's just replace the component usage with inline JSX for full control over the 'Book Video Project' button which is the requirement. 
      */}
      <section className="relative pt-32 pb-24 px-6 min-h-[90vh] flex items-center overflow-hidden">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8 animate-in slide-in-from-bottom-10 duration-1000 z-10">
            <h1 className="font-serif text-6xl md:text-8xl leading-[0.9] tracking-tight text-[#111111]">
              FashionOS <br/>
              <span className="italic font-light text-gray-400">Video.</span>
            </h1>
            <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-600 max-w-md border-l-2 border-black pl-6">
              Cinematic, conversion-driven video creative for fashion, beauty, and ecommerce brands.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button onClick={handleBookVideo}>
                Book Video Project
              </Button>
              <Button variant={ButtonVariant.SECONDARY} className="bg-transparent border-black text-black hover:bg-black hover:text-white" onClick={() => document.getElementById('recent-work')?.scrollIntoView({ behavior: 'smooth' })}>
                View Recent Work
              </Button>
            </div>
          </div>

          <div className="relative h-[600px] hidden lg:block">
            <div className="absolute top-0 right-0 w-[400px] aspect-[9/16] shadow-2xl z-10 overflow-hidden rounded-sm group">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Fashion Film Model" />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center border border-white/40">
                   <Play className="fill-white text-white ml-1" />
                </div>
              </div>
            </div>
            
            <div className="absolute top-20 left-10 w-[300px] aspect-video shadow-xl z-20 border-4 border-[#FAF8F5] overflow-hidden rounded-sm group">
              <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2942&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Cinematic Set" />
            </div>

            <div className="absolute bottom-10 right-[350px] w-[220px] aspect-square shadow-lg z-30 overflow-hidden rounded-sm group">
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

      <VideoProcess />
      <VideoTypes />
      <VideoPlatforms />
      <VideoBTS />
      <div id="recent-work"><VideoPortfolio /></div>
      <LogoStrip />
      <HomeTestimonial />
      <ContactSection title="Start Your Project." subtitle="Tell us about your vision. We'll handle the rest." />
    </div>
  );
};
