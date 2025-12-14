
import React from 'react';
import { Package as PackageIcon, Monitor, RefreshCcw, MessageCircle, Layers, Film, Camera, Zap } from 'lucide-react';

export const VideoTypes: React.FC = () => {
  const videoTypes = [
    { title: "Product Overview", icon: Film, desc: "Showcase features, materials, and fit in high definition 4K." },
    { title: "Unboxing Experience", icon: PackageIcon, desc: "Capture the excitement of packaging and first impressions." },
    { title: "How-To / Setup", icon: Layers, desc: "Step-by-step guides that reduce support tickets." },
    { title: "Brand Explainer", icon: Monitor, desc: "Convey your mission and values in 60 seconds or less." },
    { title: "Lifestyle Story", icon: Camera, desc: "Products in action: real world context and emotion." },
    { title: "Comparison", icon: Zap, desc: "Side-by-side performance tests against competitors." },
    { title: "Testimonial & UGC", icon: MessageCircle, desc: "Authentic social proof from real users and influencers." },
    { title: "360° Product Spin", icon: RefreshCcw, desc: "Interactive rotation for complete visual clarity." },
  ];

  return (
    <section className="py-32 px-6 bg-[#FAF8F5]" id="types">
       <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-20">
             <h2 className="font-serif text-4xl md:text-5xl mb-4">The 8 Core Video Types</h2>
             <p className="text-gray-500 max-w-2xl mx-auto">Essential formats for modern fashion and lifestyle brands.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {videoTypes.map((type, idx) => (
                <div key={idx} className="bg-white p-8 rounded-sm shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-default">
                   <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors">
                      <type.icon size={20} strokeWidth={1.5} />
                   </div>
                   <h3 className="font-bold text-lg mb-3 font-serif">{type.title}</h3>
                   <p className="text-sm text-gray-500 leading-relaxed font-light">{type.desc}</p>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
};
