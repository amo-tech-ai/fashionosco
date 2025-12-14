
import React from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Button';
import { ButtonVariant } from '../../types';

export const HomeDirectory: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-gray-50 px-6">
       <div className="max-w-[1440px] mx-auto">
          <div className="lg:flex lg:justify-between lg:items-start mb-12">
             <div className="max-w-lg">
                <span className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-2 block">The Network</span>
                <h2 className="font-serif text-4xl font-medium mb-4">Fashion Directory.</h2>
                <p className="text-gray-500">We curate a network of the best photographers, stylists, models, and MUAs in the industry. Find your next collaborator.</p>
             </div>
             <div className="mt-8 lg:mt-0 flex flex-col space-y-4">
                <div className="flex space-x-2">
                   <div className="relative">
                      <input type="text" placeholder="Search talent, services, or cities..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-sm text-sm w-64 focus:outline-none focus:border-black" />
                      <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                   </div>
                   <button className="bg-black text-white px-4 py-2 text-xs font-bold uppercase tracking-widest">Search</button>
                </div>
                <div className="flex space-x-2 text-[10px] uppercase font-bold text-gray-400">
                   <span className="border border-gray-200 px-2 py-1 bg-white cursor-pointer hover:border-black hover:text-black transition-colors">Photographers</span>
                   <span className="border border-gray-200 px-2 py-1 bg-white cursor-pointer hover:border-black hover:text-black transition-colors">Stylists</span>
                   <span className="border border-gray-200 px-2 py-1 bg-white cursor-pointer hover:border-black hover:text-black transition-colors">Models</span>
                   <span className="border border-gray-200 px-2 py-1 bg-white cursor-pointer hover:border-black hover:text-black transition-colors">MUAs</span>
                   <span className="border border-gray-200 px-2 py-1 bg-white cursor-pointer hover:border-black hover:text-black transition-colors">Paris</span>
                   <span className="border border-gray-200 px-2 py-1 bg-white cursor-pointer hover:border-black hover:text-black transition-colors">NYC</span>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
                { name: 'Elena Rodriguez', role: 'Photographer', loc: 'Paris, FR', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop', tags: ['Editorial', 'Film'] },
                { name: 'Marcus Chen', role: 'Stylist', loc: 'New York, USA', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2787&auto=format&fit=crop', tags: ['Runway', 'Personal'] },
                { name: 'Sarah Jenkins', role: 'Model', loc: 'London, UK', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2550&auto=format&fit=crop', tags: ['Commercial', 'High Fashion'] },
             ].map((profile, idx) => (
                <div key={idx} className="bg-white group cursor-pointer border border-transparent hover:border-gray-200 transition-all hover:shadow-lg">
                   <div className="aspect-[3/4] overflow-hidden relative">
                      <img src={profile.img} alt={profile.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                      <div className="absolute top-4 left-4">
                         <span className="bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-widest px-2 py-1">{profile.role}</span>
                      </div>
                   </div>
                   <div className="p-6">
                      <h3 className="font-serif text-xl mb-1">{profile.name}</h3>
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-4 flex items-center">
                         <span className="text-yellow-400 mr-1">★★★★★</span> (24)
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                         {profile.tags.map(tag => (
                            <span key={tag} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-sm">{tag}</span>
                         ))}
                      </div>
                   </div>
                </div>
             ))}
          </div>
          
          <div className="mt-12 text-center">
             <Button variant={ButtonVariant.SECONDARY} onClick={() => navigate('/directory')}>Browse Full Directory</Button>
          </div>
       </div>
    </section>
  );
};
