import React from 'react';
import { Button } from '../components/Button';
import { ButtonVariant } from '../types';

export const Services: React.FC = () => {
  return (
    <div className="max-w-[1440px] mx-auto px-6 py-20">
      <div className="max-w-3xl mb-16">
        <h2 className="font-serif text-5xl md:text-6xl text-black mb-6">
          Our Services
        </h2>
        <p className="text-xl text-gray-500 font-light">
          Bespoke solutions for every stage of your fashion brand's journey.
        </p>
      </div>

      <div className="space-y-12">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col md:flex-row border border-gray-100 shadow-sm hover:shadow-lg transition-shadow bg-white overflow-hidden">
            <div className="md:w-1/3 bg-gray-100 relative h-64 md:h-auto">
               <img 
                 src={`https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop`} 
                 className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                 alt="Service"
               />
            </div>
            <div className="p-8 md:p-12 md:w-2/3 flex flex-col justify-center">
               <div className="flex justify-between items-start mb-6">
                 <div>
                    <h3 className="text-2xl font-serif mb-2">Service Package 0{i}</h3>
                    <p className="text-sm text-gray-500 uppercase tracking-widest">Enterprise Solution</p>
                 </div>
                 <span className="text-xl font-serif">$2,000+</span>
               </div>
               
               <p className="text-gray-600 mb-8 leading-relaxed max-w-xl">
                 Comprehensive analysis, creative direction, and full-scale production implementation. Includes casting, location scouting, and post-production retouching.
               </p>

               <div className="grid grid-cols-2 gap-6 mb-8 border-t border-gray-100 pt-6">
                 <div>
                    <h4 className="font-bold text-xs uppercase tracking-widest mb-1">Timeline</h4>
                    <p className="text-sm text-gray-500">2-4 Weeks</p>
                 </div>
                 <div>
                    <h4 className="font-bold text-xs uppercase tracking-widest mb-1">Deliverables</h4>
                    <p className="text-sm text-gray-500">20 High-Res Images</p>
                 </div>
               </div>

               <div>
                 <Button variant={ButtonVariant.SECONDARY}>View Full Details</Button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};