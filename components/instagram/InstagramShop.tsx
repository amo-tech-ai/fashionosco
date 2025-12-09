
import React from 'react';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';

export const InstagramShop: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-[#F7F5F3] overflow-hidden reveal-on-scroll">
       <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left: Content */}
          <div className="space-y-8">
             <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4">
                <ShoppingBag className="w-8 h-8 text-black" strokeWidth={1.5} />
             </div>
             <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                Content That Fuels <br/>
                Instagram Shops.
             </h2>
             <div className="space-y-4">
                {[
                   "Increase product page engagement",
                   "Improve tap-through rates",
                   "Reduce buyer hesitation",
                   "Drive more saves and shares",
                   "Strengthen brand identity"
                ].map((item, i) => (
                   <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-lg border border-transparent hover:border-gray-200 transition-colors">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-600 font-light">{item}</span>
                   </div>
                ))}
             </div>
          </div>

          {/* Right: Phone Mockup */}
          <div className="relative flex justify-center">
             {/* Decorative Blob */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-purple-200 to-blue-200 rounded-full blur-[100px] opacity-60"></div>

             <div className="relative w-[300px] h-[600px] bg-black rounded-[40px] border-8 border-gray-800 shadow-2xl overflow-hidden ring-1 ring-gray-700">
                {/* Status Bar */}
                <div className="h-8 bg-black w-full flex justify-between px-6 items-center">
                   <div className="text-[10px] text-white font-bold">9:41</div>
                   <div className="flex gap-1">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                   </div>
                </div>
                
                {/* Shop UI Header */}
                <div className="bg-white p-4 border-b border-gray-100 flex justify-between items-center z-10 relative">
                   <span className="font-bold text-sm">Shop</span>
                   <ShoppingBag size={16} />
                </div>

                {/* Feed (Animated) */}
                <div className="bg-white h-full overflow-hidden relative">
                   <div className="grid grid-cols-2 gap-1 p-1 animate-[moveUp_10s_linear_infinite]">
                      {[1,2,3,4,5,6,7,8].map((i) => (
                         <div key={i} className="aspect-square bg-gray-100 relative group">
                            <img src={`https://images.unsplash.com/photo-${i % 2 === 0 ? '1515886657613-9f3515b0c78f' : '1523381210434-271e8be1f52b'}?q=80&w=400&auto=format&fit=crop`} className="w-full h-full object-cover" />
                            <div className="absolute top-2 right-2 bg-white/90 p-1 rounded-sm shadow-sm">
                               <ShoppingBag size={10} />
                            </div>
                         </div>
                      ))}
                   </div>
                </div>
                
                {/* Bottom Bar */}
                <div className="absolute bottom-0 w-full h-16 bg-white border-t border-gray-100 flex justify-around items-center px-4">
                   <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                   <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                   <div className="w-8 h-8 bg-black rounded-lg"></div>
                   <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                   <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                </div>
             </div>
          </div>
       </div>

       <style>{`
          @keyframes moveUp {
             0% { transform: translateY(0); }
             100% { transform: translateY(-50%); }
          }
       `}</style>
    </section>
  );
};
