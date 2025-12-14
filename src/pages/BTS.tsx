
import React from 'react';
import { Play, Instagram, MapPin, Camera } from 'lucide-react';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';

export const BTS: React.FC = () => {
  const navigate = useNavigate();

  const posts = [
    { type: 'image', src: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=2787&auto=format&fit=crop', caption: 'Set setup for Vogue.' },
    { type: 'video', src: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2942&auto=format&fit=crop', caption: 'Lighting test.' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1520692867807-631586529738?q=80&w=2787&auto=format&fit=crop', caption: 'Wardrobe chaos.' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1472506229562-67891c3da632?q=80&w=2938&auto=format&fit=crop', caption: 'Coffee break.' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?q=80&w=800&auto=format&fit=crop', caption: 'Editing suite.' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1485322551179-963c5054291b?q=80&w=800&auto=format&fit=crop', caption: 'Final checks.' },
  ];

  return (
    <div className="bg-white min-h-screen pt-20">
      
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-black text-white px-6">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605218427368-35b81a3dd716?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
         <div className="relative z-10 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-xs font-bold uppercase tracking-widest">
               <Camera size={12} /> Studio Life
            </div>
            <h1 className="font-serif text-6xl md:text-8xl">Behind the Scenes.</h1>
            <p className="max-w-xl mx-auto text-lg text-gray-300 font-light">
               The chaos, the craft, and the coffee. See how the magic happens at FashionOS.
            </p>
         </div>
      </section>

      {/* Studio Info */}
      <section className="py-20 px-6 border-b border-gray-100">
         <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
               <div className="w-16 h-16 bg-black text-white flex items-center justify-center rounded-full">
                  <MapPin size={24} />
               </div>
               <div>
                  <h3 className="font-serif text-2xl">London HQ</h3>
                  <p className="text-gray-500">Shoreditch Studios, E1</p>
               </div>
            </div>
            <div className="flex gap-4">
               <a href="#" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-purple-600 transition-colors">
                  <Instagram size={18} /> @FashionOS_Studio
               </a>
            </div>
         </div>
      </section>

      {/* Masonry Grid */}
      <section className="py-20 px-6 max-w-[1440px] mx-auto">
         <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {posts.map((post, i) => (
               <div key={i} className="break-inside-avoid relative group overflow-hidden rounded-lg cursor-pointer bg-gray-100">
                  <img src={post.src} alt={post.caption} className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" />
                  
                  {post.type === 'video' && (
                     <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center border border-white/40">
                           <Play className="fill-white text-white ml-1" />
                        </div>
                     </div>
                  )}

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                     <p className="text-white font-medium">{post.caption}</p>
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 px-6 bg-[#F7F7F5]">
         <div className="max-w-[1440px] mx-auto text-center">
            <h2 className="font-serif text-3xl mb-12">Powered by FashionOS Technology</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
               {['Gemini 3 Pro', 'Supabase', 'React', 'Vite'].map((tech, i) => (
                  <div key={i} className="text-xl font-bold uppercase tracking-widest text-gray-400">
                     {tech}
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center">
         <h2 className="font-serif text-4xl mb-6">Want to create with us?</h2>
         <Button onClick={() => navigate('/shoot-wizard')}>Book Studio Time</Button>
      </section>

    </div>
  );
};
