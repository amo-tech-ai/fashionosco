
import React from 'react';
import { EcommerceHero } from '../components/ecommerce/EcommerceHero';
import { EcommerceIntro } from '../components/ecommerce/EcommerceIntro';
import { EcommerceSlider } from '../components/ecommerce/EcommerceSlider';
import { EcommerceServices } from '../components/ecommerce/EcommerceServices';
import { EcommerceWorkflow } from '../components/ecommerce/EcommerceWorkflow';
import { EcommerceFAQ } from '../components/ecommerce/EcommerceFAQ';
import { ContactSection } from '../components/common/ContactSection';
import { LogoStrip } from '../components/common/LogoStrip';
import { ClothingBTS } from '../components/clothing/ClothingBTS'; // Reusing BTS component

export const EcommercePhotography: React.FC = () => {
  return (
    <div className="bg-[#F7F5F3] text-[#111111] font-sans selection:bg-[#E5D7A4] selection:text-black">
      <EcommerceHero />
      <EcommerceIntro />
      <EcommerceSlider />
      <EcommerceServices />
      
      {/* 20+ Years Section - Kept inline as it's simple/specific */}
      <section className="py-32 px-6 bg-white">
         <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
               <h2 className="font-serif text-5xl md:text-6xl text-[#111111] leading-tight mb-8">
                  With over 20 years of industry experience, our experienced team has shot for top brands and independents, always following your guidelines or helping you shape them.
               </h2>
               <div className="h-1 w-24 bg-[#E5D7A4]"></div>
            </div>
            <div className="order-1 lg:order-2 relative h-[700px]">
               <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="Experience" />
               <div className="absolute bottom-10 left-10 bg-white p-6 shadow-xl max-w-xs hidden md:block">
                  <p className="font-serif text-xl italic">"The standard they set is simply unmatched in London."</p>
               </div>
            </div>
         </div>
      </section>

      <LogoStrip dark />
      <EcommerceWorkflow />
      
      {/* Studio Profile */}
      <section className="py-32 px-6 bg-black text-white text-center">
         <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="font-serif text-5xl md:text-6xl">London's <br/>premier <br/>photography <br/>studio.</h2>
            <p className="text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
               Our North London Photography Studio is fully kitted out with the latest photographic and videography equipment ready for any eCommerce project — large or small.  There is no additional requirement to hire in equipment or freelance resource. We are a full-service studio and have a team of full-time staff from production, e-commerce photographers and retouchers. We believe it's how we are able to offer consistency, every time.
            </p>
         </div>
      </section>

      <EcommerceFAQ />
      <ContactSection title="Get in Touch." subtitle="Ready to elevate your product imagery? Let's discuss your next campaign." />
      <ClothingBTS />
    </div>
  );
};
