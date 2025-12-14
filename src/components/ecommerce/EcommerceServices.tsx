
import React from 'react';
import { Camera, Shirt, Star, Video, ShoppingBag, Watch } from 'lucide-react';

export const EcommerceServices: React.FC = () => {
  const services = [
    { 
      title: "Packshot Photography.", 
      desc: "Mainly used for brochures and online catalogues, we can supply your product shots beautifully on a white (or single-coloured) background. Even if you think these are 'simple' shots, we always take the care and attention required to get the best out of your products.", 
      icon: Camera, 
      img: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=2787&auto=format&fit=crop" 
    },
    { 
      title: "On-Model Fashion.", 
      desc: "Our E-Commerce fashion photography is a good choice if you want more engagement and an uplift in sales. We find that on-model photography alongside invisible mannequins or flat-styled clothing shots makes a positive difference in conversions. We can supply models from our partner model agencies.", 
      icon: Shirt, 
      img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2820&auto=format&fit=crop" 
    },
    { 
      title: "Creative | Still Life", 
      desc: "Our creative still life photography provides you with bespoke visuals tailored to your brand. We often work with brand art directors but also able to assist and create mood boards and direction for those brands that need a little more help. Stylists are also available for more complex sets if required.", 
      icon: Star, 
      img: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?q=80&w=2836&auto=format&fit=crop" 
    },
    { 
      title: "Videography.", 
      desc: "Our videographers can create beautiful moving images of your products. Adding moving images to your eCommerce site enables the customer to experience your products in more detail, and it is certainly a route that adds real value and sets you apart from your competitors.", 
      icon: Video, 
      img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2942&auto=format&fit=crop" 
    },
    { 
      title: "eCommerce Apparel.", 
      desc: "Clothing Photography — be it ghost mannequins, flat lays, or accessories—we create images that are both technically proficient and beautifully styled. We ensure that you'll always get eye-catching clothing imagery.", 
      icon: ShoppingBag, 
      img: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2940&auto=format&fit=crop" 
    },
    { 
      title: "eCommerce Jewellery.", 
      desc: "Professional Jewellery photography is something we love doing and pride ourselves on. Our in-house specialist jewellery photographer has the techniques and skills to supply striking commercial images to showcase your jewellery.", 
      icon: Watch, 
      img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2940&auto=format&fit=crop" 
    },
  ];

  return (
    <section className="py-32 px-6 bg-[#F7F5F3]">
       <div className="max-w-[1440px] mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl text-center mb-16">Our Ecommerce Services.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {services.map((service, idx) => (
                <div key={idx} className="bg-white p-8 group hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 flex flex-col h-full">
                   <div className="aspect-[4/3] overflow-hidden mb-6 bg-gray-100 rounded-sm">
                      <img src={service.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={service.title} />
                   </div>
                   <div className="mb-4">
                      <service.icon className="w-6 h-6 text-[#111111]" strokeWidth={1.5} />
                   </div>
                   <h3 className="font-serif text-2xl mb-3 font-medium">{service.title}</h3>
                   <p className="text-sm text-gray-500 leading-relaxed font-light flex-grow">{service.desc}</p>
                   <div className="pt-6 mt-auto">
                      <span className="text-xs font-bold uppercase tracking-widest border-b border-gray-200 pb-1 group-hover:border-black transition-colors">Learn More</span>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
};
