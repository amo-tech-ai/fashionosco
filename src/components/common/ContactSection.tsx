
import React from 'react';
import { Button } from '../Button';

interface ContactSectionProps {
  title?: string;
  subtitle?: string;
  dark?: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ 
  title = "Get in Touch.", 
  subtitle = "Ready to start your project? Send us a message.",
  dark = false
}) => {
  const bgClass = dark ? "bg-[#111111] text-white" : "bg-[#F7F5F3] text-[#111111]";
  const inputClass = dark 
    ? "bg-transparent border-gray-700 text-white focus:border-white placeholder-gray-500" 
    : "bg-transparent border-gray-300 text-black focus:border-black placeholder-gray-400";

  return (
    <section className={`py-32 px-6 ${bgClass}`} id="contact">
       <div className="max-w-xl mx-auto space-y-12">
          <div className="text-center space-y-4">
             <h2 className="font-serif text-5xl md:text-6xl">{title}</h2>
             <p className={`font-light text-lg ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{subtitle}</p>
          </div>
          
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
             <div className="space-y-2">
                <label className={`text-xs font-bold uppercase tracking-widest ${dark ? 'text-gray-500' : 'text-gray-400'}`}>Name</label>
                <input type="text" className={`w-full border-b py-3 focus:outline-none transition-colors ${inputClass}`} placeholder="Full Name" />
             </div>
             <div className="space-y-2">
                <label className={`text-xs font-bold uppercase tracking-widest ${dark ? 'text-gray-500' : 'text-gray-400'}`}>Email</label>
                <input type="email" className={`w-full border-b py-3 focus:outline-none transition-colors ${inputClass}`} placeholder="work@email.com" />
             </div>
             <div className="space-y-2">
                <label className={`text-xs font-bold uppercase tracking-widest ${dark ? 'text-gray-500' : 'text-gray-400'}`}>Details</label>
                <textarea rows={4} className={`w-full border-b py-3 focus:outline-none transition-colors ${inputClass}`} placeholder="Tell us about your project..."></textarea>
             </div>
             
             <div className="pt-8">
                <Button className={`w-full py-4 text-xs font-bold uppercase tracking-widest ${dark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'} border-none`}>
                   Send Message
                </Button>
             </div>
          </form>
       </div>
    </section>
  );
};
