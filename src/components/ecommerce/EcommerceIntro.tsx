
import React from 'react';

export const EcommerceIntro: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-[#F7F5F3]">
       <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-8 sticky top-32 self-start">
             <h2 className="font-serif text-5xl md:text-6xl text-[#111111]">Catapult your sales.</h2>
             <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-light">
                <p>Professional <strong>Ecommerce photography</strong> has been at the forefront of Blend Studios' services for years.</p>
                <p>Working out of our central London studio we create imagery and videography for many top brands which recently includes <strong>TK Maxx, Burberrys, ASOS, The North Face</strong> and <strong>Tescos</strong>.</p>
                <p>We understand the importance of delivering high quality, cost-effective ecom photography and videography for your brand.</p>
                <p>Like you, we also set our standards very high. If you require polished commercial photography that will increase engagement and conversions, add value and help you sell your products <a href="#contact" className="text-black border-b border-black font-medium hover:text-gray-600 transition-colors">contact us today</a>.</p>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             {[
                "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=2784&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=2836&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1550614000-4b9519e02d48?q=80&w=2788&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=2864&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=2787&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2960&auto=format&fit=crop"
             ].map((src, idx) => (
                <div key={idx} className={`relative overflow-hidden rounded-sm bg-white shadow-sm hover:shadow-md transition-all duration-300 group ${idx % 3 === 0 ? 'col-span-2 aspect-[2/1]' : 'col-span-1 aspect-square'}`}>
                   <img src={src} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Product Example" />
                </div>
             ))}
          </div>
       </div>
    </section>
  );
};
