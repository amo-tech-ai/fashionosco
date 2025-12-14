
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

export const VideoProduction: React.FC = () => {
  return (
    <div className="bg-[#FAF8F5] text-[#111111] font-sans selection:bg-black selection:text-white">
      <VideoHero />
      
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
      <VideoPortfolio />
      <LogoStrip />
      <HomeTestimonial />
      <ContactSection title="Start Your Project." subtitle="Tell us about your vision. We'll handle the rest." />
    </div>
  );
};
