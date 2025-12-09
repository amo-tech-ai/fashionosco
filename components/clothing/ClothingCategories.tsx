import React from 'react';
import { Shirt, Layers, Camera, Aperture, Box, ArrowRight } from 'lucide-react';

export const ClothingCategories: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-[#F7F5F3]">
      <div className="max-w-[1440px] mx-auto space-y-24">
         
         {/* 1. Ghost Mannequin */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center group reveal-on-scroll" style={{ transitionDelay: '100ms' }}>
            {/* Interactive Card: Lift + Glow */}
            <div className="order-2 lg:order-1 relative overflow-hidden rounded-sm shadow-xl hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 ease-out cursor-pointer bg-white">
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
            <div className="relative overflow-hidden rounded-sm shadow-xl hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 ease-out cursor-pointer bg-white">
               <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2940&auto=format&fit=crop" className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-[1.5s]" alt="Clothing Flats" />
            </div>
         </div>

         {/* 3. Apparel Still Life */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center group reveal-on-scroll" style={{ transitionDelay: '300ms' }}>
            <div className="order-2 lg:order-1 relative overflow-hidden rounded-sm shadow-xl hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 ease-out cursor-pointer bg-white">
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
            <div className="relative overflow-hidden rounded-sm shadow-xl hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 ease-out cursor-pointer bg-white">
               <img src="https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=3072&auto=format&fit=crop" className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-[1.5s]" alt="Detail Shot" />
            </div>
         </div>

          {/* 5. Accessories */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center group reveal-on-scroll" style={{ transitionDelay: '500ms' }}>
            <div className="order-2 lg:order-1 relative overflow-hidden rounded-sm shadow-xl hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 ease-out cursor-pointer bg-white">
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
  );
};