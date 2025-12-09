
import React from 'react';
import { BarChart2, Heart, Smartphone, Video, ShoppingBag } from 'lucide-react';

export const InstagramValue: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-white reveal-on-scroll">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left: Stats */}
        <div className="space-y-8">
           <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400">The Power of Visuals</span>
           <h2 className="font-serif text-4xl mb-8">Why invest in premium <br/>content?</h2>
           
           <div className="space-y-6">
              {[
                 { icon: Video, text: "Reels deliver up to 3× higher reach than static posts." },
                 { icon: Heart, text: "High-quality visuals boost purchase intent by 58%." },
                 { icon: Smartphone, text: "70% of shoppers use Instagram to discover new products." },
                 { icon: BarChart2, text: "Video posts generate 49% more interactions." },
                 { icon: ShoppingBag, text: "Instagram Shops improve conversions by up to 30%." }
              ].map((stat, i) => (
                 <div key={i} className="flex items-start group">
                    <div className="mt-1 mr-4 p-2 bg-gray-50 rounded-full group-hover:bg-black group-hover:text-white transition-colors duration-300">
                       <stat.icon size={16} />
                    </div>
                    <p className="text-gray-600 font-light text-lg leading-relaxed">{stat.text}</p>
                 </div>
              ))}
           </div>
        </div>

        {/* Right: Card */}
        <div className="relative bg-[#F7F5F3] p-10 rounded-2xl overflow-hidden group hover:shadow-xl transition-shadow duration-500">
           <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full blur-[80px] opacity-50 -mr-16 -mt-16"></div>
           
           <h3 className="font-serif text-3xl mb-6 relative z-10">Better Content = <br/>Better Results.</h3>
           <p className="text-gray-500 mb-8 relative z-10 leading-relaxed">
              In a crowded feed, mediocrity is invisible. We create scroll-stopping assets that elevate your brand perception and drive tangible business results.
           </p>

           <div className="grid grid-cols-2 gap-4 relative z-10">
              <div className="space-y-2">
                 <div className="aspect-[4/5] bg-gray-200 rounded-lg overflow-hidden grayscale opacity-60">
                    <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2820&auto=format&fit=crop" className="w-full h-full object-cover" />
                 </div>
                 <p className="text-xs uppercase tracking-widest text-gray-400 font-bold text-center">Before</p>
              </div>
              <div className="space-y-2 relative -mt-4">
                 <div className="aspect-[4/5] bg-gray-200 rounded-lg overflow-hidden shadow-lg border-2 border-white transform scale-105">
                    <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2820&auto=format&fit=crop" className="w-full h-full object-cover" />
                 </div>
                 <p className="text-xs uppercase tracking-widest text-black font-bold text-center">FashionOS</p>
                 <div className="absolute top-4 right-4 bg-green-400 text-white text-[10px] font-bold px-2 py-1 rounded-full">+140% Reach</div>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
};
