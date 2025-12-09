
import React from 'react';
import { Button } from '../Button';

export const InstagramContact: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-white" id="contact">
       <div className="max-w-xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100 reveal-on-scroll">
          <div className="text-center mb-10">
             <h2 className="font-serif text-4xl mb-2">Let's Create Content That Sells.</h2>
             <p className="text-gray-500 font-light">Tell us about your brand and goals.</p>
          </div>

          <form className="space-y-6">
             <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Name</label>
                <input type="text" className="w-full bg-gray-50 border-b border-gray-200 p-3 rounded-t-sm focus:outline-none focus:border-black transition-colors" placeholder="Jane Doe" />
             </div>
             <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email</label>
                <input type="email" className="w-full bg-gray-50 border-b border-gray-200 p-3 rounded-t-sm focus:outline-none focus:border-black transition-colors" placeholder="jane@brand.com" />
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                   <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Instagram</label>
                   <input type="text" className="w-full bg-gray-50 border-b border-gray-200 p-3 rounded-t-sm focus:outline-none focus:border-black transition-colors" placeholder="@brand" />
                </div>
                <div className="space-y-1">
                   <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Website</label>
                   <input type="text" className="w-full bg-gray-50 border-b border-gray-200 p-3 rounded-t-sm focus:outline-none focus:border-black transition-colors" placeholder="brand.com" />
                </div>
             </div>
             <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Message</label>
                <textarea rows={4} className="w-full bg-gray-50 border-b border-gray-200 p-3 rounded-t-sm focus:outline-none focus:border-black transition-colors" placeholder="I need help with..."></textarea>
             </div>

             <div className="pt-4">
                <Button className="w-full py-4 text-xs font-bold uppercase tracking-widest">Start My Instagram Project</Button>
             </div>
          </form>
       </div>
    </section>
  );
};
