
import React, { useEffect, useState } from 'react';
import { Search, GripVertical, Package, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AssetsSidebar: React.FC = () => {
  const navigate = useNavigate();
  const [assets, setAssets] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Load inventory from Products page storage
    const loadInventory = () => {
      try {
        const saved = localStorage.getItem('studio_inventory');
        if (saved) {
          setAssets(JSON.parse(saved));
        }
      } catch (e) {
        console.error("Failed to load inventory", e);
      }
    };

    loadInventory();
    
    // Listen for updates
    window.addEventListener('storage', loadInventory);
    return () => window.removeEventListener('storage', loadInventory);
  }, []);

  const filteredAssets = assets.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full md:w-64 flex flex-col bg-white border border-[#E5E5E5] rounded-2xl shadow-sm overflow-hidden flex-shrink-0">
      <div className="p-4 border-b border-[#E5E5E5]">
        <div className="flex justify-between items-center mb-4">
           <h2 className="font-serif text-lg text-[#1A1A1A]">Wardrobe</h2>
           <button 
             onClick={() => navigate('/dashboard/products')}
             className="text-[10px] uppercase font-bold text-[#6B7280] hover:text-black tracking-widest flex items-center"
           >
             Manage <ArrowRight size={10} className="ml-1" />
           </button>
        </div>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-2.5 text-[#9CA3AF]" />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search SKU..." 
            className="w-full bg-[#F7F7F5] border border-transparent rounded-lg py-2 pl-9 pr-3 text-xs focus:outline-none focus:border-[#E5E5E5] focus:bg-white transition-all"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {filteredAssets.length === 0 ? (
          <div className="text-center py-8 px-4 text-gray-400">
            <Package size={24} className="mx-auto mb-2 opacity-50" />
            <p className="text-xs">No assets found.</p>
            <button 
               onClick={() => navigate('/dashboard/products')}
               className="mt-2 text-xs text-blue-600 hover:underline"
            >
               Add Products
            </button>
          </div>
        ) : (
          filteredAssets.map((item) => (
            <div key={item.id} className="flex items-center p-2 hover:bg-[#F7F7F5] rounded-lg cursor-grab active:cursor-grabbing group transition-colors">
              <div className="w-10 h-10 bg-[#F7F7F5] rounded border border-[#E5E5E5] overflow-hidden flex-shrink-0">
                <img 
                  src={item.img} 
                  className="w-full h-full object-cover" 
                  alt={item.name} 
                />
              </div>
              <div className="ml-3 min-w-0 flex-1">
                <p className="text-xs font-medium text-[#1A1A1A] truncate">{item.name}</p>
                <p className="text-[10px] text-[#9CA3AF] truncate">{item.sku}</p>
              </div>
              <GripVertical size={14} className="ml-auto text-[#D1D5DB] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
