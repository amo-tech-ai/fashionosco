
import React from 'react';

export const EcommerceSlider: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
       <div className="max-w-[1440px] mx-auto mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <div className="relative group">
                <div className="absolute -inset-4 bg-[#F6E9E4] rounded-sm -z-10 rotate-2 group-hover:rotate-1 transition-transform duration-500"></div>
                <img src="https://images.unsplash.com/photo-1556228720-19de77ee542e?q=80&w=2787&auto=format&fit=crop" className="w-full h-[600px] object-cover rounded-sm shadow-xl" alt="Creative Ecom" />
             </div>
             <div className="space-y-8">
                <h2 className="font-serif text-5xl md:text-6xl text-[#111111]">We ♥ ecom.</h2>
                <p className="text-gray-600 text-lg leading-relaxed font-light">
                   Our skilled photography and production team has been specialising in delivering digital imagery for years. We know what it takes, there's nothing we haven't shot.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed font-light">
                   We are market leaders in eCommerce Product photography, fashion photography, clothing and jewellery photography and our team reflects that.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed font-light">
                   From account handlers to our photographers and retouchers we never compromise on quality. Our friendly team will ensure your experience with us is smooth, efficient and above all successful. Always meeting (and exceeding) your expectations.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed font-light italic">
                   We let the quality of our images do the talking for us.
                </p>
             </div>
          </div>
       </div>

       <div className="w-full overflow-x-auto hide-scrollbar flex snap-x snap-mandatory">
           {[
             "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2940&auto=format&fit=crop",
             "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2899&auto=format&fit=crop",
             "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2820&auto=format&fit=crop",
             "https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=2835&auto=format&fit=crop",
             "https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=2787&auto=format&fit=crop"
           ].map((src, i) => (
              <div key={i} className="min-w-[80vw] md:min-w-[40vw] h-[500px] relative snap-center border-r border-white">
                 <img src={src} className="w-full h-full object-cover" alt="Slider Image" />
                 <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors"></div>
              </div>
           ))}
       </div>
    </section>
  );
};
