
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Grid, 
  List, 
  Filter, 
  MoreHorizontal, 
  Plus, 
  AlertCircle,
  CheckCircle,
  Tag
} from 'lucide-react';
import { Button } from '../components/Button';
import { useToast } from '../components/ToastProvider';

interface Product {
  id: number;
  name: string;
  sku: string;
  price: string;
  status: 'Ready' | 'Missing Info' | 'In Transit';
  img: string;
}

export const Products: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [products, setProducts] = useState<Product[]>([]);
  const { addToast } = useToast();

  // Load / Initialize Data
  useEffect(() => {
    const saved = localStorage.getItem('studio_inventory');
    if (saved) {
      try {
        setProducts(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load inventory", e);
      }
    } else {
      // Default Mock Data
      setProducts([
        { id: 1, name: "Silk Evening Gown", sku: "DRS-001", price: "$450", status: "Ready", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2820&auto=format&fit=crop" },
        { id: 2, name: "Leather Tote Bag", sku: "ACC-023", price: "$295", status: "Missing Info", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=2835&auto=format&fit=crop" },
        { id: 3, name: "Gold Plated Cuff", sku: "JWL-105", price: "$120", status: "Ready", img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2940&auto=format&fit=crop" },
        { id: 4, name: "Summer Sandals", sku: "SHS-009", price: "$180", status: "Ready", img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2960&auto=format&fit=crop" },
        { id: 5, name: "Linen Blazer", sku: "OUT-044", price: "$320", status: "In Transit", img: "https://images.unsplash.com/photo-1550614000-4b9519e02d48?q=80&w=2788&auto=format&fit=crop" },
        { id: 6, name: "Pleated Skirt", sku: "BTM-012", price: "$150", status: "Ready", img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=2784&auto=format&fit=crop" },
      ]);
    }
  }, []);

  // Save changes
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('studio_inventory', JSON.stringify(products));
    }
  }, [products]);

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: Date.now(),
      name: "New Inventory Item",
      sku: `SKU-${Math.floor(Math.random() * 1000)}`,
      price: "$0.00",
      status: "In Transit",
      img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=2835&auto=format&fit=crop" // Placeholder
    };
    setProducts([newProduct, ...products]);
    addToast("New product added to inventory", "success");
  };

  const handleDelete = (id: number) => {
    if(confirm('Delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
      addToast("Product removed", "info");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h1 className="font-serif text-3xl text-[#1A1A1A]">Products</h1>
           <p className="text-sm text-[#6B7280]">Manage inventory for upcoming shoots.</p>
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto">
           <div className="relative flex-1 md:w-64">
              <Search size={16} className="absolute left-3 top-2.5 text-[#9CA3AF]" />
              <input 
                 type="text" 
                 placeholder="Search SKU or Name..." 
                 className="w-full pl-10 pr-4 py-2 bg-white border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] transition-shadow" 
              />
           </div>
           <div className="flex bg-white border border-[#E5E5E5] rounded-lg p-1">
              <button 
                 onClick={() => setViewMode('grid')}
                 className={`p-1.5 rounded transition-all ${viewMode === 'grid' ? 'bg-[#F7F7F5] text-[#1A1A1A] shadow-sm' : 'text-[#9CA3AF] hover:text-[#6B7280]'}`}
              >
                 <Grid size={16} />
              </button>
              <button 
                 onClick={() => setViewMode('list')}
                 className={`p-1.5 rounded transition-all ${viewMode === 'list' ? 'bg-[#F7F7F5] text-[#1A1A1A] shadow-sm' : 'text-[#9CA3AF] hover:text-[#6B7280]'}`}
              >
                 <List size={16} />
              </button>
           </div>
           <Button onClick={handleAddProduct} className="py-2 px-4 text-xs h-[38px] bg-[#1A1A1A] text-white">
              <Plus size={16} className="mr-2" /> Add Product
           </Button>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
         {['All Products', 'Ready to Shoot', 'Missing Info', 'Archived'].map((filter, i) => (
            <button 
               key={i} 
               className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors whitespace-nowrap ${
                  i === 0 
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' 
                  : 'bg-white text-[#6B7280] border-[#E5E5E5] hover:border-[#9CA3AF]'
               }`}
            >
               {filter}
            </button>
         ))}
      </div>

      {/* CONTENT: GRID VIEW */}
      {viewMode === 'grid' && (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
               <div key={product.id} className="group bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative">
                  <div className="relative aspect-[3/4] bg-[#F7F7F5] overflow-hidden">
                     <img src={product.img} className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-700" alt={product.name} />
                     <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleDelete(product.id)} className="p-2 bg-white/90 backdrop-blur rounded-full shadow-sm hover:bg-red-500 hover:text-white transition-colors">
                           <MoreHorizontal size={16} />
                        </button>
                     </div>
                     <div className="absolute top-3 left-3">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm ${
                           product.status === 'Ready' ? 'bg-[#DCFCE7]/90 text-[#166534]' :
                           product.status === 'Missing Info' ? 'bg-[#FEE2E2]/90 text-[#991B1B]' :
                           'bg-[#FEF3C7]/90 text-[#92400E]'
                        }`}>
                           {product.status}
                        </span>
                     </div>
                  </div>
                  <div className="p-5">
                     <h3 className="font-serif text-lg text-[#1A1A1A] mb-1 truncate">{product.name}</h3>
                     <div className="flex justify-between items-center text-xs text-[#6B7280]">
                        <span className="font-mono">{product.sku}</span>
                        <span className="font-medium text-[#1A1A1A]">{product.price}</span>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      )}

      {/* CONTENT: LIST VIEW */}
      {viewMode === 'list' && (
         <div className="bg-white border border-[#E5E5E5] rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-[#E5E5E5] bg-[#F7F7F5]/50">
                     <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Product</th>
                     <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-[#6B7280]">SKU</th>
                     <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Category</th>
                     <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Status</th>
                     <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Price</th>
                     <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-[#6B7280] text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-[#E5E5E5]">
                  {products.map((product) => (
                     <tr key={product.id} className="group hover:bg-[#F7F7F5] transition-colors">
                        <td className="py-4 px-6">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-lg bg-[#F7F7F5] border border-[#E5E5E5] overflow-hidden">
                                 <img src={product.img} className="w-full h-full object-cover" alt="" />
                              </div>
                              <span className="font-medium text-sm text-[#1A1A1A]">{product.name}</span>
                           </div>
                        </td>
                        <td className="py-4 px-6 font-mono text-xs text-[#6B7280]">{product.sku}</td>
                        <td className="py-4 px-6 text-sm text-[#4A4F5B]">Apparel</td>
                        <td className="py-4 px-6">
                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              product.status === 'Ready' ? 'bg-[#DCFCE7] text-[#166534]' :
                              product.status === 'Missing Info' ? 'bg-[#FEE2E2] text-[#991B1B]' :
                              'bg-[#FEF3C7] text-[#92400E]'
                           }`}>
                              {product.status === 'Ready' && <CheckCircle size={10} className="mr-1" />}
                              {product.status === 'Missing Info' && <AlertCircle size={10} className="mr-1" />}
                              {product.status}
                           </span>
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-[#1A1A1A]">{product.price}</td>
                        <td className="py-4 px-6 text-right">
                           <button onClick={() => handleDelete(product.id)} className="p-2 rounded hover:bg-white text-[#9CA3AF] hover:text-red-500 transition-colors">
                              <MoreHorizontal size={16} />
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      )}

      {/* BULK ACTION BAR (Floating) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#1A1A1A] text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-6 z-50 animate-in slide-in-from-bottom-4 duration-500">
         <span className="text-xs font-bold uppercase tracking-widest">{products.length} Items Total</span>
         <div className="h-4 w-px bg-white/20"></div>
         <div className="flex gap-4">
            <button className="text-xs font-medium hover:text-[#E5D7A4] transition-colors">Edit</button>
            <button className="text-xs font-medium hover:text-[#E5D7A4] transition-colors">Move to Shoot</button>
            <button className="text-xs font-medium text-red-400 hover:text-red-300 transition-colors">Delete</button>
         </div>
      </div>

    </div>
  );
};
