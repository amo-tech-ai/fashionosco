
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Grid, 
  List, 
  MoreHorizontal, 
  Plus, 
  AlertCircle,
  CheckCircle,
  Sparkles,
  FileText,
  Trash2
} from 'lucide-react';
import { Button } from '../components/Button';
import { useToast } from '../components/ToastProvider';
import { MagicImportModal } from '../components/products/MagicImportModal';
import { ParsedProduct } from '../services/ai/productParser';
import { Product } from '../types/products';
import { generateLineSheetPDF } from '../services/pdf/lineSheet';
import { BrandService } from '../services/data/brands';

export const Products: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [products, setProducts] = useState<Product[]>([]);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set());
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
        { id: 1, name: "Silk Evening Gown", sku: "DRS-001", price: "450", wholesalePrice: 180, moq: 4, casePack: 1, status: "Ready", category: "Dresses", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2820&auto=format&fit=crop" },
        { id: 2, name: "Leather Tote Bag", sku: "ACC-023", price: "295", wholesalePrice: 120, moq: 5, casePack: 1, status: "Missing Info", category: "Accessories", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=2835&auto=format&fit=crop" },
        { id: 3, name: "Gold Plated Cuff", sku: "JWL-105", price: "120", wholesalePrice: 45, moq: 10, casePack: 5, status: "Ready", category: "Jewelry", img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2940&auto=format&fit=crop" },
        { id: 4, name: "Summer Sandals", sku: "SHS-009", price: "180", wholesalePrice: 75, moq: 8, casePack: 2, status: "Ready", category: "Footwear", img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2960&auto=format&fit=crop" },
        { id: 5, name: "Linen Blazer", sku: "OUT-044", price: "320", wholesalePrice: 140, moq: 6, casePack: 1, status: "In Transit", category: "Outerwear", img: "https://images.unsplash.com/photo-1550614000-4b9519e02d48?q=80&w=2788&auto=format&fit=crop" },
      ]);
    }
  }, []);

  // Save changes
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('studio_inventory', JSON.stringify(products));
    }
  }, [products]);

  const toggleSelection = (id: string | number) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
  };

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: Date.now(),
      name: "New Inventory Item",
      sku: `SKU-${Math.floor(Math.random() * 1000)}`,
      price: "0.00",
      wholesalePrice: 0,
      moq: 1,
      casePack: 1,
      status: "In Transit",
      category: "Uncategorized",
      img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=2835&auto=format&fit=crop" 
    };
    setProducts([newProduct, ...products]);
    setEditingId(newProduct.id);
    addToast("New product added to inventory", "success");
  };

  const handleMagicImport = (parsedItems: ParsedProduct[]) => {
    const newProducts: Product[] = parsedItems.map((p, i) => ({
        id: `imported-${Date.now()}-${i}`,
        name: p.name,
        sku: p.sku,
        price: p.price.replace('$', ''),
        wholesalePrice: Math.round(parseFloat(p.price.replace('$', '')) * 0.4), // Auto-calc WSP
        moq: 5,
        casePack: 1,
        status: p.status === 'Ready' ? 'Ready' : 'Missing Info',
        category: p.category,
        description: p.description,
        img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2820&auto=format&fit=crop" 
    }));
    
    setProducts([...newProducts, ...products]);
    addToast(`Successfully imported ${newProducts.length} items from line sheet.`, "success");
  };

  const handleUpdate = (id: string|number, field: keyof Product, value: any) => {
     setProducts(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleDelete = (id: number | string) => {
    if(confirm('Delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
      setSelectedIds(prev => { const n = new Set(prev); n.delete(id); return n; });
      addToast("Product removed", "info");
    }
  };

  const handleExportLineSheet = async () => {
    const selectedProducts = products.filter(p => selectedIds.has(p.id));
    if (selectedProducts.length === 0) {
      addToast("Select products to export first.", "error");
      return;
    }
    
    addToast("Generating PDF Line Sheet...", "info");
    const brandProfile = await BrandService.get();
    await generateLineSheetPDF(selectedProducts, brandProfile);
    addToast("Line Sheet Downloaded", "success");
    setSelectedIds(new Set());
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      
      <MagicImportModal 
         isOpen={isImportModalOpen} 
         onClose={() => setIsImportModalOpen(false)} 
         onImport={handleMagicImport}
      />

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h1 className="font-serif text-3xl text-[#1A1A1A]">Products</h1>
           <p className="text-sm text-gray-500">Manage inventory for Showroom and Shoots.</p>
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
           <Button onClick={() => setIsImportModalOpen(true)} variant="secondary" className="py-2 px-4 text-xs h-[38px] border-purple-200 text-purple-700 bg-purple-50 hover:bg-purple-100">
              <Sparkles size={14} className="mr-2" /> Magic Import
           </Button>
           <Button onClick={handleAddProduct} className="py-2 px-4 text-xs h-[38px] bg-[#1A1A1A] text-white">
              <Plus size={16} className="mr-2" /> Add Product
           </Button>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
         {['All Products', 'Ready to Shoot', 'Wholesale Ready', 'Missing Info'].map((filter, i) => (
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
               <div 
                  key={product.id} 
                  className={`group bg-white rounded-2xl border overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative flex flex-col ${selectedIds.has(product.id) ? 'border-purple-500 ring-1 ring-purple-500' : 'border-[#E5E5E5]'}`}
                  onClick={() => toggleSelection(product.id)}
               >
                  <div className="relative aspect-[3/4] bg-[#F7F7F5] overflow-hidden">
                     <img src={product.img} className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-700" alt={product.name} />
                     
                     <div className="absolute top-3 left-3 flex gap-2">
                        {selectedIds.has(product.id) ? (
                           <div className="bg-purple-600 text-white p-1 rounded-full shadow-sm">
                              <CheckCircle size={14} />
                           </div>
                        ) : (
                           <div className="w-6 h-6 rounded-full border-2 border-white/50 bg-black/10"></div>
                        )}
                     </div>

                     <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                           onClick={(e) => { e.stopPropagation(); handleDelete(product.id); }} 
                           className="p-2 bg-white/90 backdrop-blur rounded-full shadow-sm hover:bg-red-500 hover:text-white transition-colors"
                        >
                           <Trash2 size={16} />
                        </button>
                     </div>
                  </div>
                  
                  {editingId === product.id ? (
                     <div className="p-5 flex-1 space-y-3 bg-gray-50" onClick={e => e.stopPropagation()}>
                        <input 
                           value={product.name} 
                           onChange={e => handleUpdate(product.id, 'name', e.target.value)}
                           className="w-full text-sm font-bold border-b border-gray-300 bg-transparent focus:outline-none"
                        />
                        <div className="grid grid-cols-2 gap-2">
                           <input 
                              value={product.wholesalePrice} 
                              onChange={e => handleUpdate(product.id, 'wholesalePrice', e.target.value)}
                              placeholder="WSP"
                              className="w-full text-xs border rounded p-1"
                           />
                           <input 
                              value={product.price} 
                              onChange={e => handleUpdate(product.id, 'price', e.target.value)}
                              placeholder="RRP"
                              className="w-full text-xs border rounded p-1"
                           />
                        </div>
                        <Button onClick={() => setEditingId(null)} className="w-full h-8 text-xs">Save</Button>
                     </div>
                  ) : (
                     <div className="p-5 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-1">
                           <h3 className="font-serif text-lg text-[#1A1A1A] truncate leading-tight flex-1">{product.name}</h3>
                           <button onClick={(e) => { e.stopPropagation(); setEditingId(product.id); }} className="text-gray-400 hover:text-black">
                              <MoreHorizontal size={16} />
                           </button>
                        </div>
                        <p className="text-xs text-gray-500 mb-4">{product.category} • {product.sku}</p>
                        
                        <div className="mt-auto grid grid-cols-2 gap-2 pt-4 border-t border-gray-100">
                           <div>
                              <span className="block text-[10px] text-gray-400 uppercase tracking-widest font-bold">WSP</span>
                              <span className="font-medium text-[#1A1A1A]">${product.wholesalePrice || '-'}</span>
                           </div>
                           <div className="text-right">
                              <span className="block text-[10px] text-gray-400 uppercase tracking-widest font-bold">RRP</span>
                              <span className="font-medium text-gray-600">${product.price}</span>
                           </div>
                        </div>
                     </div>
                  )}
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
                     <th className="w-12 py-4 px-6"></th>
                     <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Product</th>
                     <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-[#6B7280]">SKU</th>
                     <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Category</th>
                     <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Status</th>
                     <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-[#6B7280]">WSP / RRP</th>
                     <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-[#6B7280]">B2B Logic</th>
                     <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-[#6B7280] text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-[#E5E5E5]">
                  {products.map((product) => (
                     <tr 
                        key={product.id} 
                        className={`group hover:bg-[#F7F7F5] transition-colors cursor-pointer ${selectedIds.has(product.id) ? 'bg-purple-50 hover:bg-purple-50' : ''}`}
                        onClick={() => toggleSelection(product.id)}
                     >
                        <td className="px-6 py-4">
                           <div className={`w-4 h-4 border rounded ${selectedIds.has(product.id) ? 'bg-purple-600 border-purple-600' : 'border-gray-300'}`}></div>
                        </td>
                        <td className="py-4 px-6">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-lg bg-[#F7F7F5] border border-[#E5E5E5] overflow-hidden">
                                 <img src={product.img} className="w-full h-full object-cover" alt="" />
                              </div>
                              <span className="font-medium text-sm text-[#1A1A1A]">{product.name}</span>
                           </div>
                        </td>
                        <td className="py-4 px-6 font-mono text-xs text-[#6B7280]">{product.sku}</td>
                        <td className="py-4 px-6 text-sm text-[#4A4F5B]">{product.category}</td>
                        <td className="py-4 px-6">
                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              product.status === 'Ready' ? 'bg-[#DCFCE7] text-[#166534]' :
                              product.status === 'Missing Info' ? 'bg-[#FEE2E2] text-[#991B1B]' :
                              'bg-[#FEF3C7] text-[#92400E]'
                           }`}>
                              {product.status}
                           </span>
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-[#1A1A1A]">
                           ${product.wholesalePrice} <span className="text-gray-400">/ ${product.price}</span>
                        </td>
                        <td className="py-4 px-6 text-xs text-gray-500">
                           <div className="flex items-center gap-2">
                              <span className="bg-white border border-gray-200 px-2 py-1 rounded">MOQ: {product.moq}</span>
                              <span className="bg-white border border-gray-200 px-2 py-1 rounded">Pack: {product.casePack}</span>
                           </div>
                        </td>
                        <td className="py-4 px-6 text-right">
                           <button 
                              onClick={(e) => { e.stopPropagation(); handleDelete(product.id); }} 
                              className="p-2 rounded hover:bg-white text-[#9CA3AF] hover:text-red-500 transition-colors"
                           >
                              <Trash2 size={16} />
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      )}

      {/* BULK ACTION BAR */}
      {selectedIds.size > 0 && (
         <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#1A1A1A] text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-6 z-50 animate-in slide-in-from-bottom-4 duration-500">
            <span className="text-xs font-bold uppercase tracking-widest">{selectedIds.size} Items Selected</span>
            <div className="h-4 w-px bg-white/20"></div>
            <div className="flex gap-4">
               <button 
                  onClick={handleExportLineSheet}
                  className="text-xs font-medium hover:text-[#E5D7A4] transition-colors flex items-center gap-2"
               >
                  <FileText size={14} /> Export Line Sheet
               </button>
               <button className="text-xs font-medium hover:text-[#E5D7A4] transition-colors">Move to Shoot</button>
               <button 
                  onClick={() => {
                     selectedIds.forEach(id => handleDelete(id));
                     setSelectedIds(new Set());
                  }}
                  className="text-xs font-medium text-red-400 hover:text-red-300 transition-colors"
               >
                  Delete
               </button>
            </div>
         </div>
      )}

    </div>
  );
};
