
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Button';
import { ButtonVariant } from '../../types';

export const HomeEcommerce: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-32 bg-slate-900 text-white px-6">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
             <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">Ecommerce Product Photography.</h2>
             <p className="text-slate-400 text-lg mb-8 max-w-md">Clean, high-fidelity product photography increases conversion and reduces returns. We provide styling, shooting, and retouching optimized for Shopify, Amazon, and luxury marketplaces.</p>
             <div className="space-y-6">
                <div className="flex items-start">
                   <div className="mt-1 mr-4">
                      <div className="w-5 h-5 rounded-full border border-slate-600 flex items-center justify-center">
                         <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                   </div>
                   <div>
                      <h4 className="font-bold text-sm">Consistent Lighting & Styling</h4>
                      <p className="text-xs text-slate-500 mt-1">Ensure your collection looks cohesive on the grid.</p>
                   </div>
                </div>
                <div className="flex items-start">
                   <div className="mt-1 mr-4">
                      <div className="w-5 h-5 rounded-full border border-slate-600 flex items-center justify-center">
                         <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                   </div>
                   <div>
                      <h4 className="font-bold text-sm">On-Model, Flat-Lay, or Ghost Mannequin</h4>
                      <p className="text-xs text-slate-500 mt-1">Versatile shooting styles to match your brand guidelines.</p>
                   </div>
                </div>
             </div>
             <div className="mt-10">
                <Button variant={ButtonVariant.SECONDARY} onClick={() => navigate('/services/ecommerce')} className="bg-white text-black border-none hover:bg-slate-200">View Ecommerce Packages</Button>
             </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2940&auto=format&fit=crop" alt="Shoe Product" className="rounded-lg opacity-80 hover:opacity-100 transition-opacity duration-500" />
             <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2899&auto=format&fit=crop" alt="Watch Product" className="rounded-lg mt-12 opacity-80 hover:opacity-100 transition-opacity duration-500" />
          </div>
      </div>
    </section>
  );
};
