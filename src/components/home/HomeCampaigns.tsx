
import React from 'react';
import { ArrowRight } from 'lucide-react';

export const HomeCampaigns: React.FC = () => {
  return (
    <section className="bg-gray-50 py-24 px-6">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex justify-between items-end mb-12 border-b border-gray-200 pb-4">
           <div>
              <span className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-2 block">Featured Work</span>
              <h2 className="font-serif text-4xl font-medium">Latest Campaigns</h2>
           </div>
           <span className="text-xs tracking-widest uppercase hidden md:block">Swipe to Explore</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {/* Card 1 */}
           <div className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-200 mb-4 shadow-md group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500 rounded-sm">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                <img src="https://images.unsplash.com/photo-1529139574466-a302d2053990?q=80&w=2788&auto=format&fit=crop" alt="Summer Editorial" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out" />
                <div className="absolute bottom-6 left-6 z-20 text-white">
                   <p className="text-xs font-bold uppercase tracking-widest mb-1 opacity-80">Campaign</p>
                   <h3 className="font-serif text-2xl drop-shadow-md">Summer Editorial '25</h3>
                </div>
              </div>
           </div>
           {/* Card 2 */}
           <div className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-200 mb-4 shadow-md group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500 rounded-sm">
                <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2940&auto=format&fit=crop" alt="Milan Fashion Week" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out" />
                <div className="absolute bottom-6 left-6 z-20 text-white drop-shadow-md">
                   <p className="text-xs font-bold uppercase tracking-widest mb-1 opacity-80">Runway</p>
                   <h3 className="font-serif text-2xl drop-shadow-md">Milan Fashion Week</h3>
                </div>
              </div>
           </div>
           {/* Card 3 */}
           <div className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-200 mb-4 shadow-md group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500 rounded-sm">
                <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2940&auto=format&fit=crop" alt="Lookbook" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out" />
                <div className="absolute bottom-6 left-6 z-20 text-white drop-shadow-md">
                   <p className="text-xs font-bold uppercase tracking-widest mb-1 opacity-80">Lookbook</p>
                   <h3 className="font-serif text-2xl drop-shadow-md">Urban Streetwear</h3>
                </div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <ArrowRight className="w-5 h-5 text-black" />
                </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};
