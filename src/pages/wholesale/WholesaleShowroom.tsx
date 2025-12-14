
import React, { useState, useEffect } from 'react';
import { WholesaleHeader } from '../../components/wholesale/WholesaleHeader';
import { WholesaleProduct, CartItem } from '../../types/wholesale';
import { ShoppingBag, Filter, ArrowRight, Minus, Plus, Sparkles, FileText, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '../../components/ToastProvider';
import { analyzeCart, MerchandisingAnalysis } from '../../services/ai/merchandising';
import { generatePurchaseOrderPDF } from '../../services/pdf/purchaseOrder';

export const WholesaleShowroom: React.FC = () => {
  const [products, setProducts] = useState<WholesaleProduct[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [analysis, setAnalysis] = useState<MerchandisingAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    // Load products
    setProducts([
      { id: '1', name: 'Silk Charmeuse Dress', sku: 'DRS-001', wholesalePrice: 180, rrp: 450, moq: 4, casePack: 2, image: 'https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=2787&auto=format&fit=crop', category: 'Dresses', stock: 120 },
      { id: '2', name: 'Oversized Linen Blazer', sku: 'OUT-022', wholesalePrice: 145, rrp: 360, moq: 4, casePack: 1, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=2836&auto=format&fit=crop', category: 'Outerwear', stock: 85 },
      { id: '3', name: 'Pleated Wool Trouser', sku: 'BTM-105', wholesalePrice: 110, rrp: 275, moq: 6, casePack: 2, image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2788&auto=format&fit=crop', category: 'Bottoms', stock: 200 },
      { id: '4', name: 'Cashmere Knit Sweater', sku: 'KNT-009', wholesalePrice: 160, rrp: 395, moq: 5, casePack: 1, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=2864&auto=format&fit=crop', category: 'Knitwear', stock: 90 },
    ]);
  }, []);

  // Auto-analyze cart when it changes significantly
  useEffect(() => {
    const timer = setTimeout(() => {
      if (cart.length > 0) {
        runAnalysis();
      } else {
        setAnalysis(null);
      }
    }, 2000); // Debounce analysis
    return () => clearTimeout(timer);
  }, [cart]);

  const addToCart = (product: WholesaleProduct) => {
    const existing = cart.find(c => c.id === product.id);
    if (existing) {
      updateQuantity(product.id, existing.quantity + product.casePack);
    } else {
      setCart([...cart, { ...product, quantity: Math.max(product.moq, product.casePack) }]);
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
    // In a real app, this would also POST to the backend
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] pt-20 flex">
      <WholesaleHeader title="Digital Showroom" />
      
      <main className="flex-1 p-8 overflow-y-auto h-[calc(100vh-80px)]">
         <div className="max-w-[1200px] mx-auto">
            
            {/* Collection Header */}
            <div className="mb-12">
               <h1 className="font-serif text-4xl mb-4 text-[#1A1A1A]">SS25: Desert Haze</h1>
               <p className="text-gray-500 max-w-2xl font-light text-lg">
                  Inspired by the muted tones of the Mojave at dusk. Natural fibers, relaxed tailoring, and effortless transitions from day to night.
               </p>
               <div className="flex gap-2 mt-6">
                  {['All', 'Dresses', 'Outerwear', 'Knitwear'].map(cat => (
                     <button key={cat} className="px-4 py-2 rounded-full border border-gray-200 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                        {cat}
                     </button>
                  ))}
               </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
               {products.map(p => (
                  <div key={p.id} className="group">
                     <div className="aspect-[3/4] bg-gray-100 rounded-sm overflow-hidden mb-4 relative cursor-pointer">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
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
                           <h3 className="font-serif text-lg leading-tight">{p.name}</h3>
                           <p className="text-xs text-gray-500 mt-1">{p.sku} • Case Pack: {p.casePack}</p>
                        </div>
                        <div className="text-right">
                           <div className="font-bold text-lg">${p.wholesalePrice}</div>
                           <div className="text-[10px] text-gray-400 uppercase tracking-widest">WSP</div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
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
