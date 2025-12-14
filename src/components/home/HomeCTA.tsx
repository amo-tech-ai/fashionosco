
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Button';

export const HomeCTA: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gray-100 py-32 px-6">
       <div className="max-w-4xl mx-auto bg-white p-12 md:p-20 shadow-2xl relative overflow-hidden">
           {/* Decorative */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
           
           <div className="relative z-10 text-center">
              <span className="text-xs font-bold tracking-widest uppercase text-blue-600 mb-4 block">Bespoke Production</span>
              <h2 className="font-serif text-4xl md:text-5xl mb-6">Need something a <br/>little more creative?</h2>
              <p className="text-gray-500 mb-10 max-w-lg mx-auto leading-relaxed">
                 Have a complex vision? We love the unusual. Bring us your wildest briefs for multi-day productions, exotic locations, or set builds.
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-6 items-center">
                 <ul className="text-left text-sm space-y-2 mb-6 md:mb-0 md:mr-12">
                    <li className="flex items-center"><div className="w-1.5 h-1.5 bg-black rounded-full mr-2"></div> Full campaign development</li>
                    <li className="flex items-center"><div className="w-1.5 h-1.5 bg-black rounded-full mr-2"></div> Concept, casting, and location scouting</li>
                    <li className="flex items-center"><div className="w-1.5 h-1.5 bg-black rounded-full mr-2"></div> Multi-day, multi-location productions</li>
                 </ul>
                 <Button onClick={() => navigate('/shoot-wizard')}>Start a Custom Brief</Button>
              </div>
           </div>
       </div>
    </section>
  );
};
