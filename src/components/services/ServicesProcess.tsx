
import React from 'react';

export const ServicesProcess: React.FC = () => {
  return (
    <section className="py-32 bg-gray-900 text-white px-6">
       <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-20">
             <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">Our Workflow</span>
             <h2 className="font-serif text-4xl mt-2">From Concept to Campaign</h2>
          </div>
          
          <div className="relative">
             <div className="hidden lg:block absolute top-[20%] left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
             
             <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                {[
                   { step: "01", title: "Explore", desc: "Browse our services and portfolio." },
                   { step: "02", title: "Book", desc: "Schedule a consultation call." },
                   { step: "03", title: "Plan", desc: "Pre-production & creative brief." },
                   { step: "04", title: "Create", desc: "Shoot day or digital build." },
                   { step: "05", title: "Deliver", desc: "AI enhancement & final export." }
                ].map((s, i) => (
                   <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                      <div className="w-4 h-4 bg-gray-900 border-2 border-gray-500 rounded-full mb-8 group-hover:bg-white group-hover:border-white transition-colors duration-300"></div>
                      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 w-full group-hover:-translate-y-2 transition-transform duration-300">
                         <span className="text-4xl font-serif text-gray-600 mb-2 block group-hover:text-white transition-colors">{s.step}</span>
                         <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                         <p className="text-sm text-gray-400">{s.desc}</p>
                      </div>
                   </div>
                ))}
             </div>
          </div>
       </div>
    </section>
  );
};
