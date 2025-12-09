import React from 'react';

export const ClothingWhyChooseUs: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-white reveal-on-scroll">
       <div className="max-w-[1440px] mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl mb-16 text-center">Why Choose Us.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
                { title: "Specialist Fashion Studio.", desc: "We focus exclusively on fashion and apparel, from ghost mannequins to campaign-level creative. Every shoot is handled by experienced photographers who understand how to make garments sell." },
                { title: "Consistent Quality, Every Time.", desc: "With over 15 years' experience and a 'right-first-time' culture, we deliver consistently sharp, colour-accurate, on-brand imagery. Every shot is approved by senior team members before it reaches you." },
                { title: "Experienced, Friendly Team.", desc: "We have been doing this type of work for years and know exactly how to handle both garments and clients. Our in-house team consists of fashion specialists who ensure a smooth, efficient, and straightforward process from start to finish." },
                { title: "In-House Retouching.", desc: "Our post-production team handles all ghosting, editing, and colour matching. We guarantee accuracy and consistency across your entire collection, and we turn any amendments around within 24 hours." },
                { title: "Top-tier Studio Facilities.", desc: "Based in North London, our 4000 sq. ft. studios are fully equipped with industry-standard lighting and camera gear. We've designed our space for high-volume shoots with maximum flexibility." },
                { title: "Fast Turnarounds.", desc: "We know e-commerce moves quickly. Standard delivery is five working days. Express options are also available if you need results faster." }
             ].map((item, i) => (
                <div key={i} className="p-8 border border-gray-100 hover:border-[#E5D7A4] hover:shadow-lg transition-all duration-300 group bg-white">
                   <div className="w-2 h-2 bg-gray-200 group-hover:bg-[#E5D7A4] mb-6 rounded-full transition-colors"></div>
                   <h3 className="font-bold text-lg mb-3">{item.title}</h3>
                   <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
};