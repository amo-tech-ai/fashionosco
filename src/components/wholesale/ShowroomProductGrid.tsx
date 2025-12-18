
import React from 'react';
import { Product } from '../../types/products';

interface ShowroomProductGridProps {
  products: Product[];
  activeCategory: string;
  onAddToCart: (p: Product) => void;
}

export const ShowroomProductGrid: React.FC<ShowroomProductGridProps> = ({ products, activeCategory, onAddToCart }) => {
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
      {filteredProducts.map(p => (
        <div key={p.id} className="group animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="aspect-[3/4] bg-gray-100 rounded-sm overflow-hidden mb-4 relative cursor-pointer">
             <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
             <button 
                onClick={() => onAddToCart(p)}
                className="absolute bottom-4 right-4 bg-white text-black px-6 py-3 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all shadow-lg hover:bg-black hover:text-white"
             >
                Add to Assortment
             </button>
          </div>
          <div className="flex justify-between items-start">
             <div>
                <h3 className="font-serif text-lg leading-tight truncate max-w-[200px]">{p.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{p.sku} • Case: {p.casePack || 1}</p>
             </div>
             <div className="text-right">
                <div className="font-bold text-lg">${p.wholesalePrice}</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-widest">WSP</div>
             </div>
          </div>
        </div>
      ))}
    </div>
  );
};
