
import React, { useState, useEffect, useMemo } from 'react';
import { WholesaleLayout } from './WholesaleLayout';
import { ShowroomProductGrid } from '../../components/wholesale/ShowroomProductGrid';
import { ShowroomCart } from '../../components/wholesale/ShowroomCart';
import { CartItem } from '../../types/wholesale';
import { ShoppingBag } from 'lucide-react';
import { useToast } from '../../components/ToastProvider';
import { analyzeCart, MerchandisingAnalysis } from '../../services/ai/merchandising';
import { generatePurchaseOrderPDF } from '../../services/pdf/purchaseOrder';
import { Product } from '../../types/products';
import { OrderService } from '../../services/data/orders';

export const WholesaleShowroom: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [analysis, setAnalysis] = useState<MerchandisingAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isOrdering, setIsOrdering] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem('studio_inventory');
    const inventory: Product[] = saved ? JSON.parse(saved) : [];
    const readyForB2B = inventory.filter((p: Product) => p.wholesalePrice && p.wholesalePrice > 0);
    setProducts(readyForB2B);
  }, []);

  const cartTotal = useMemo(() => 
    cart.reduce((sum, item) => sum + (item.wholesalePrice * item.quantity), 0)
  , [cart]);

  const categories = useMemo(() => 
    ['All', ...Array.from(new Set(products.map(p => p.category || 'Other')))]
  , [products]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (cart.length > 0) {
        runAnalysis();
      } else {
        setAnalysis(null);
      }
    }, 2000); 
    return () => clearTimeout(timer);
  }, [cart, cartTotal]);

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeCart(cart, cartTotal);
      setAnalysis(result);
    } catch (error) {
      console.error("Merchandising analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const addToCart = (product: Product) => {
    const existing = cart.find(c => c.id === String(product.id));
    const casePack = product.casePack || 1;
    const moq = product.moq || 1;

    if (existing) {
      setCart(prev => prev.map(item => item.id === String(product.id) 
        ? { ...item, quantity: item.quantity + casePack } 
        : item
      ));
    } else {
      const newItem: CartItem = {
         id: String(product.id),
         name: product.name,
         sku: product.sku,
         wholesalePrice: product.wholesalePrice || 0,
         rrp: parseFloat(product.price.toString().replace('$','')) || 0,
         moq: moq,
         casePack: casePack,
         image: product.img,
         category: product.category || 'Apparel',
         stock: 100,
         quantity: Math.max(moq, casePack)
      };
      setCart(prev => [...prev, newItem]);
      addToast(`Added ${product.name} to assortment`, "success");
    }
  };

  const updateQuantity = (id: string, qty: number) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: qty } : item));
  };

  const handleCreateOrder = async () => {
    setIsOrdering(true);
    try {
        generatePurchaseOrderPDF(cart, cartTotal);
        await OrderService.create(cart, cartTotal, "Retail Partner");
        addToast("Purchase Order submitted successfully.", "success");
        setCart([]);
        setAnalysis(null);
    } catch (e) {
        addToast("Submission error. Please try again.", "error");
    } finally {
        setIsOrdering(false);
    }
  };

  return (
    <WholesaleLayout title="Digital Showroom">
      <main className="flex-1 p-8 overflow-y-auto h-[calc(100vh-80px)] hide-scrollbar">
         <div className="max-w-[1200px] mx-auto">
            <div className="mb-12">
               <h1 className="font-serif text-4xl mb-4 text-[#1A1A1A]">SS25 Collection</h1>
               <p className="text-gray-500 max-w-2xl font-light text-lg leading-relaxed">
                  Explore our curated seasonal assortment. Minimum order value of $2,000 required for wholesale terms.
               </p>
               <div className="flex flex-wrap gap-2 mt-8">
                  {categories.map(cat => (
                     <button 
                        key={cat} 
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-2.5 rounded-full border text-xs font-bold uppercase tracking-widest transition-all ${
                          activeCategory === cat ? 'bg-black text-white border-black shadow-lg' : 'bg-white border-gray-100 text-gray-500 hover:border-black'
                        }`}
                     >
                        {cat}
                     </button>
                  ))}
               </div>
            </div>

            {products.length === 0 ? (
                <div className="text-center py-24 text-gray-400">
                    <ShoppingBag size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="text-lg">No products configured for wholesale.</p>
                    <p className="text-sm">Set wholesale prices in the Products dashboard.</p>
                </div>
            ) : (
               <ShowroomProductGrid 
                  products={products} 
                  activeCategory={activeCategory} 
                  onAddToCart={addToCart} 
               />
            )}
         </div>
      </main>

      <ShowroomCart 
         cart={cart}
         cartTotal={cartTotal}
         analysis={analysis}
         isAnalyzing={isAnalyzing}
         isOrdering={isOrdering}
         onUpdateQuantity={updateQuantity}
         onCreateOrder={handleCreateOrder}
      />
    </WholesaleLayout>
  );
};
