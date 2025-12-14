
import React from 'react';
import { Star, ArrowRight } from 'lucide-react';

export const HomeHeritage: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-[1440px] mx-auto">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5 relative">
                 <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2820&auto=format&fit=crop" alt="Fashion Heritage" className="w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
              <div className="lg:col-span-7 flex flex-col justify-center pl-0 lg:pl-12">
                 <span className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-4">Our Heritage</span>
                 <h2 className="font-serif text-5xl md:text-6xl mb-8 text-black">
                    20+ years in the <br />fashion industry.
                 </h2>
                 <p className="text-xl text-gray-600 mb-8 max-w-2xl font-light">
                    From boutique labels to Fortune 500 brands, we've mastered the art of capturing fashion that sells. Our extensive portfolio includes work for fashion houses, beauty brands, jewelry designers, and lifestyle companies across the globe.
                 </p>
                 <ul className="space-y-4 mb-10">
                    {[
                       'Global runway coverage',
                       'Campaigns for independent labels',
                       'Ecommerce & catalog production',
                       'Creative consultation'
                    ].map((item, idx) => (
                       <li key={idx} className="flex items-center text-sm font-medium">
                          <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-3 text-xs">
                             <Star className="w-3 h-3" />
                          </span>
                          {item}
                       </li>
                    ))}
                 </ul>
                 <div className="flex items-center space-x-2 text-xs font-bold tracking-widest uppercase cursor-pointer group">
                    <span>See Client Stories</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
                 </div>
              </div>
           </div>
      </div>
    </section>
  );
};
