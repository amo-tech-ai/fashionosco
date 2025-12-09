
import React from 'react';

export const InstagramPhotography: React.FC = () => {
  const cards = [
    { title: "Product Photography", desc: "Clean, high-fidelity shots.", img: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=2787&auto=format&fit=crop" },
    { title: "Lifestyle Photography", desc: "Products in the real world.", img: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=2787&auto=format&fit=crop" },
    { title: "Lookbook Shoots", desc: "Editorial seasonal collections.", img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2940&auto=format&fit=crop" },
    { title: "Styled Flatlays", desc: "Curated overhead compositions.", img: "https://images.unsplash.com/photo-1505312894-463287661858?q=80&w=2835&auto=format&fit=crop" },
    { title: "Influencer-Style UGC", desc: "Authentic, native-feel content.", img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2874&auto=format&fit=crop" },
    { title: "Model Photography", desc: "Diverse talent for your brand.", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop" },
  ];

  return (
    <section className="py-32 px-6 bg-[#FDFCFB] reveal-on-scroll">
      <div className="max-w-[1440px] mx-auto">
         <div className="mb-16">
            <h2 className="font-serif text-4xl mb-4">Instagram Photography</h2>
            <p className="text-gray-500 font-light">Stunning stills designed for the grid.</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, idx) => (
               <div key={idx} className="group bg-white p-4 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-gray-100/50">
                  <div className="aspect-square rounded-xl overflow-hidden mb-6 bg-gray-100">
                     <img src={card.img} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" alt={card.title} />
                  </div>
                  <div className="px-2 pb-2">
                     <h3 className="font-serif text-xl mb-1 group-hover:text-purple-900 transition-colors">{card.title}</h3>
                     <p className="text-sm text-gray-400 font-light">{card.desc}</p>
                  </div>
               </div>
            ))}
         </div>
      </div>
    </section>
  );
};
