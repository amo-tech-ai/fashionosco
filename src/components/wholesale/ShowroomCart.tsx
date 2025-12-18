
import React from 'react';
import { ShoppingBag, Minus, Plus, Sparkles, Loader2, FileText } from 'lucide-react';
import { CartItem } from '../../types/wholesale';
import { MerchandisingAnalysis } from '../../services/ai/merchandising';

interface ShowroomCartProps {
  cart: CartItem[];
  cartTotal: number;
  analysis: MerchandisingAnalysis | null;
  isAnalyzing: boolean;
  isOrdering: boolean;
  onUpdateQuantity: (id: string, qty: number) => void;
  onCreateOrder: () => void;
}

export const ShowroomCart: React.FC<ShowroomCartProps> = ({
  cart,
  cartTotal,
  analysis,
  isAnalyzing,
  isOrdering,
  onUpdateQuantity,
  onCreateOrder
}) => {
  return (
    <div className="w-96 bg-white border-l border-gray-100 h-[calc(100vh-80px)] fixed right-0 top-20 flex flex-col shadow-2xl z-30">
      <div className="p-6 border-b border-gray-100 bg-gray-50">
        <h3 className="font-serif text-xl">Draft Order</h3>
        <p className="text-xs text-gray-500 mt-1">Minimum Order: $2,000</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6 hide-scrollbar">
        {cart.length > 0 && (
          <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-xl p-4">
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
               <p className="text-xs text-gray-400 italic">Analyzing assortment context...</p>
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
                    <img src={item.image} className="w-full h-full object-cover" alt="" />
                 </div>
                 <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{item.name}</h4>
                    <p className="text-xs text-gray-500 mb-2">${item.wholesalePrice}</p>
                    <div className="flex items-center gap-3">
                       <button 
                        onClick={() => onUpdateQuantity(item.id, Math.max(item.moq, item.quantity - item.casePack))} 
                        className="p-1 hover:bg-gray-100 rounded"
                        aria-label="Decrease quantity"
                       >
                         <Minus size={12}/>
                       </button>
                       <span className="text-sm font-mono">{item.quantity}</span>
                       <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity + item.casePack)} 
                        className="p-1 hover:bg-gray-100 rounded"
                        aria-label="Increase quantity"
                       >
                         <Plus size={12}/>
                       </button>
                    </div>
                 </div>
              </div>
           ))
        )}
      </div>

      <div className="p-6 border-t border-gray-100 bg-white space-y-4 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
        <div className="flex justify-between items-end">
           <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Total (Excl. Tax)</span>
           <span className="font-serif text-2xl font-bold text-[#1A1A1A]">${cartTotal.toLocaleString()}</span>
        </div>
        
        <button 
           onClick={onCreateOrder}
           className="w-full bg-[#1A1A1A] text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-black disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 rounded-xl"
           disabled={cartTotal < 2000 || isOrdering}
        >
           {isOrdering ? (
              <><Loader2 className="animate-spin" size={16} /> Processing PO...</>
           ) : cartTotal < 2000 ? (
              `Add $${(2000 - cartTotal).toLocaleString()} to Checkout`
           ) : (
              <><FileText size={16} /> Finalize Purchase Order</>
           )}
        </button>
      </div>
    </div>
  );
};
