
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, X } from 'lucide-react';

export const WholesaleHeader: React.FC<{ title?: string }> = ({ title = "Wholesale" }) => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md z-40 border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
         <div className="flex items-center gap-3">
            <Link to="/" className="font-serif text-xl font-bold">FashionOS.</Link>
            <div className="h-6 w-px bg-gray-300"></div>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{title}</span>
         </div>
         <div className="flex items-center gap-4">
            <Link to="/wholesale/showroom" className="text-sm font-medium hover:text-purple-600 transition-colors">Showroom</Link>
            <Link to="/" className="p-2 hover:bg-gray-100 rounded-full">
               <X size={20} />
            </Link>
         </div>
      </div>
    </header>
  );
};
