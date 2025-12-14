
import React, { useState, useEffect } from 'react';
import { WholesaleHeader } from '../../components/wholesale/WholesaleHeader';
import { CartItem } from '../../types/wholesale';
import { ShoppingBag, Filter, ArrowRight, Minus, Plus, Sparkles, FileText, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '../../components/ToastProvider';
import { analyzeCart, MerchandisingAnalysis } from '../../services/ai/merchandising';
import { generatePurchaseOrderPDF } from '../../services/pdf/purchaseOrder';
import { Product } from '../../types/products';

export const WholesaleShowroom: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [analysis, setAnalysis] = useState<MerchandisingAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const { addToast } = useToast();

  useEffect(() => {
    // Connect to Global Inventory
    const loadInventory = () => {
       const saved = localStorage.getItem('studio_inventory');
       let inventory: Product[] = [];

       if (saved) {
          inventory = JSON.parse(saved);
       } else {
          // Pre-seed if empty (Demo Experience)
          inventory = [
            { id: 101, name: "Silk Evening Gown", sku: "DRS-001", price: "450", wholesalePrice: 180, moq: 4, casePack: 1, status: "Ready", category: "Dresses", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2820&auto=format&fit=crop" },
            { id: 102, name: "Leather Tote Bag", sku: "ACC-023", price: "295", wholesalePrice: 120, moq: 5, casePack: 1, status: "Ready", category: "Accessories", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=2835&auto=format&fit=crop" },
            { id: 103, name: "Gold Plated Cuff", sku: "JWL-105", price: "120", wholesalePrice: 45, moq: 10, casePack: 5, status: "Ready", category: "Jewelry", img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2940&auto=format&fit=crop" },
            { id: 104, name: "Summer Sandals", sku: "SHS-009", price: "180", wholesalePrice: 75, moq: 8, casePack: 2, status: "Ready", category: "Footwear", img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2960&auto=format&fit=crop" },
            { id: 105, name: "Linen Blazer", sku: "OUT-044", price: "320", wholesalePrice: 140, moq: 6, casePack: 1, status: "Ready", category: "Outerwear", img: "https://images.unsplash.com/photo-1550614000-4b9519e02d48?q=80&w=2788&auto=format&fit=crop" },
          ];
          localStorage.setItem('studio_inventory', JSON.stringify(inventory));
       }

       // Filter only items that have wholesale price set
       const readyForB2B = inventory.filter((p: Product) => p.wholesalePrice && p.wholesalePrice > 0);
       setProducts(readyForB2B);
    };
    loadInventory();
  }, []);

  // Auto-analyze cart when it changes significantly
  useEffect(() => {
    const timer = setTimeout(() => {
      if (cart.length > 0) {
        runAnalysis();
      } else {
        setAnalysis(null);
      }
    }, 2000); 
    return () => clearTimeout(timer);
  }, [cart]);

  const addToCart = (product: Product) => {
    const existing = cart.find(c => c.id === String(product.id));
    const casePack = product.casePack || 1;
    const moq = product.moq || 1;

    if (existing) {
      updateQuantity(String(product.id), existing.quantity + casePack);
    } else {
      // Map to CartItem type
      const newItem: CartItem = {
         id: String(product.id),
         name: product.name,
         sku: product.sku,
         wholesalePrice: product.wholesalePrice || 0,
         rrp: parseFloat(product.price.replace('$','')) || 0,
         moq: moq,
         casePack: casePack,
         image: product.img,
         category: product.category || 'Apparel',
         stock: 100, // Mock stock
         quantity: Math.max(moq, casePack)
      };
      setCart([...cart, newItem]);
      addToast(`Added ${product.name}`, "success");
    }
  };

  const updateQuantity = (id: string, qty: number) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: qty } : item));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.wholesalePrice * item.quantity), 0);

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    const result = await analyzeCart(cart, cartTotal);
    setAnalysis(result);
    setIsAnalyzing(false);
  };

  const handleCreateOrder = () => {
    generatePurchaseOrderPDF(cart, cartTotal);
    addToast("Purchase Order generated! Check your downloads.", "success");
  };

  const filteredProducts = activeCategory === 'All' ? products : products.filter(p => p.category === activeCategory);
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category || 'Other')))];

  return (
    <div className="min-h-screen bg-[#FDFCFB] pt-20 flex">
      <WholesaleHeader title="Digital Showroom" />
      
      <main className="flex-1 p-8 overflow-y-auto h-[calc(100vh-80px)]">
         <div className="max-w-[1200px] mx-auto">
            
            {/* Collection Header */}
            <div className="mb-12">
               <h1 className="font-serif text-4xl mb-4 text-[#1A1A1A]">SS25 Collection</h1>
               <p className="text-gray-500 max-w-2xl font-light text-lg">
                  Explore our latest drops available for immediate wholesale order.
               </p>
               <div className="flex flex-wrap gap-2 mt-6">
                  {categories.map(cat => (
                     <button 
                        key={cat} 
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-widest transition-colors ${activeCategory === cat ? 'bg-black text-white border-black' : 'border-gray-200 hover:bg-gray-100'}`}
                     >
                        {cat}
                     </button>
                  ))}
               </div>
            </div>

            {/* Product Grid */}
            {products.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                    <ShoppingBag size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="text-lg">Showroom is empty.</p>
                    <p className="text-sm">Go to Products Dashboard to add items with Wholesale pricing.</p>
                </div>
            ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
                  {filteredProducts.map(p => (
                     <div key={p.id} className="group">
                        <div className="aspect-[3/4] bg-gray-100 rounded-sm overflow-hidden mb-4 relative cursor-pointer">
                           <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                           <button 
                              onClick={() => addToCart(p)}
                              className="absolute bottom-4 right-4 bg-white text-black px-6 py-3 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all shadow-lg hover:bg-black hover:text-white"
                           >
                              Add to Order
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
            )}
         </div>
      </main>

      {/* Smart Cart Sidebar */}
      <div className="w-96 bg-white border-l border-gray-100 h-[calc(100vh-80px)] fixed right-0 top-20 flex flex-col shadow-2xl z-30">
         <div className="p-6 border-b border-gray-100 bg-gray-50">
            <h3 className="font-serif text-xl">Draft Order</h3>
            <p className="text-xs text-gray-500 mt-1">Minimum Order: $2,000</p>
         </div>
         
         <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* AI Merchandiser Block */}
            {cart.length > 0 && (
               <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-xl p-4 animate-in fade-in slide-in-from-right-4">
                  <div className="flex items-center justify-between mb-3">
                     <div className="flex items-center gap-2 text-purple-700 font-bold text-xs uppercase tracking-widest">
                        {isAnalyzing ? <Loader2 className="animate-spin" size={12} /> : <Sparkles size={12} />}
                        AI Merchandiser
                     </div>
                     {analysis && (
                        <span className={`text-xs font-bold ${analysis.score > 80 ? 'text-green-600' : 'text-orange-500'}`}>
                           Health: {analysis.score}%
                        </span>
                     )}
                  </div>
                  
                  {analysis ? (
                     <div className="space-y-3">
                        <p className="text-xs text-gray-600 leading-relaxed">{analysis.summary}</p>
                        {analysis.suggestions.map((s, i) => (
                           <div key={i} className={`text-[10px] p-2 rounded border ${s.type === 'opportunity' ? 'bg-green-50 border-green-100 text-green-800' : 'bg-orange-50 border-orange-100 text-orange-800'}`}>
                              <strong>{s.type.toUpperCase()}:</strong> {s.message}
                           </div>
                        ))}
                     </div>
                  ) : (
                     <p className="text-xs text-gray-400 italic">Add items to get AI recommendations...</p>
                  )}
               </div>
            )}

            {cart.length === 0 ? (
               <div className="text-center text-gray-400 mt-10">
                  <ShoppingBag size={32} className="mx-auto mb-3 opacity-30" />
                  <p className="text-sm">Your assortment is empty.</p>
               </div>
            ) : (
               cart.map(item => (
                  <div key={item.id} className="flex gap-4">
                     <div className="w-16 h-20 bg-gray-100 shrink-0">
                        <img src={item.image} className="w-full h-full object-cover" />
                     </div>
                     <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.name}</h4>
                        <p className="text-xs text-gray-500 mb-2">${item.wholesalePrice}</p>
                        <div className="flex items-center gap-3">
                           <button onClick={() => updateQuantity(item.id, Math.max(item.moq, item.quantity - item.casePack))} className="p-1 hover:bg-gray-100 rounded"><Minus size={12}/></button>
                           <span className="text-sm font-mono">{item.quantity}</span>
                           <button onClick={() => updateQuantity(item.id, item.quantity + item.casePack)} className="p-1 hover:bg-gray-100 rounded"><Plus size={12}/></button>
                        </div>
                        {item.quantity < item.moq && (
                           <p className="text-[10px] text-red-500 mt-1">MOQ: {item.moq}</p>
                        )}
                     </div>
                  </div>
               ))
            )}
         </div>

         <div className="p-6 border-t border-gray-100 bg-white space-y-4">
            <div className="flex justify-between items-end">
               <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Total (Excl. Tax)</span>
               <span className="font-serif text-2xl">${cartTotal.toLocaleString()}</span>
            </div>
            
            <button 
               onClick={handleCreateOrder}
               className="w-full bg-black text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
               disabled={cartTotal < 2000}
            >
               {cartTotal < 2000 ? `Add $${(2000 - cartTotal).toLocaleString()} to Checkout` : <><FileText size={16} /> Create Purchase Order</>}
            </button>
         </div>
      </div>
    </div>
  );
};
