
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Button';
import { ButtonVariant } from '../../types';

export const HomeStudioStory: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <div className="order-2 lg:order-1 relative">
              <div className="aspect-[4/3] rounded-sm overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=2786&auto=format&fit=crop" alt="Studio Life" className="w-full h-full object-cover" />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-10 -right-10 bg-white p-8 shadow-2xl max-w-xs hidden md:block border border-gray-100">
                 <h4 className="font-serif text-xl mb-2">"A game changer for our brand identity."</h4>
                 <p className="text-xs text-gray-500 uppercase tracking-widest">— Vogue Magazine</p>
              </div>
           </div>
           <div className="order-1 lg:order-2 space-y-6">
              <h2 className="font-serif text-4xl md:text-5xl font-medium">A studio you can trust.</h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                 We understand the pressures of the fashion calendar. From Fashion week deadlines to seasonal drops, agencies and designers rely on us for on-time, high-fidelity assets.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                 <div className="bg-gray-50 p-6 rounded-sm">
                    <h4 className="font-bold text-sm mb-2">On-set Creative Direction</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">Our art directors work with you to ensure every shot aligns with your campaign vision.</p>
                 </div>
                 <div className="bg-gray-50 p-6 rounded-sm">
                    <h4 className="font-bold text-sm mb-2">Rapid Retouching</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">First proofs in 24 hours. Final assets delivered ready for print and digital channels.</p>
                 </div>
                 <div className="bg-gray-50 p-6 rounded-sm">
                    <h4 className="font-bold text-sm mb-2">Brand Consistency</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">We maintain your visual identity across lookbooks, social, and ecommerce.</p>
                 </div>
              </div>
              <div className="pt-6">
                 <Button variant={ButtonVariant.SECONDARY} onClick={() => navigate('/services')}>View Studio Services</Button>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};
