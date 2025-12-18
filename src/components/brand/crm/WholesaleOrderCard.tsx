import React, { useCallback } from 'react';
import { FileText, Truck, ChevronRight } from 'lucide-react';
import { WholesaleOrder } from '../../../services/data/orders';

interface WholesaleOrderCardProps {
  order: WholesaleOrder;
  onProcess: (order: WholesaleOrder) => void;
}

export const WholesaleOrderCard: React.FC<WholesaleOrderCardProps> = ({ order, onProcess }) => {
  const handleProcess = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onProcess(order);
  }, [order, onProcess]);

  return (
    <div className="border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all bg-white flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
       {order.status === 'Shipped' && <div className="absolute inset-0 bg-white/60 z-10 pointer-events-none"></div>}
       <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
             <h4 className="font-mono text-lg font-bold text-[#1A1A1A]">{order.id}</h4>
             <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded ${
                order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                order.status === 'Approved' ? 'bg-green-100 text-green-700' :
                'bg-yellow-50 text-yellow-700 border border-yellow-100'
             }`}>{order.status}</span>
          </div>
          <div className="text-sm text-gray-400 font-light">
             {order.buyerName} • {new Date(order.date).toLocaleDateString()}
          </div>
       </div>

       <div className="flex items-center gap-12 bg-gray-50/50 px-8 py-4 rounded-2xl border border-gray-50 shadow-inner">
          <div className="text-center">
             <span className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Items</span>
             <span className="font-bold text-xl">{order.items.reduce((acc, i) => acc + i.quantity, 0)}</span>
          </div>
          <div className="text-right">
             <span className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Value</span>
             <span className="font-serif text-3xl font-bold text-black">${order.total.toLocaleString()}</span>
          </div>
       </div>

       <div className="flex gap-3 z-20">
          {order.status !== 'Shipped' && (
              <button 
                  onClick={handleProcess}
                  className="flex items-center gap-3 bg-black text-white px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl shadow-black/10 active:scale-95"
              >
              {order.status === 'Pending' ? <><FileText size={16} /> Approve PO</> : <><Truck size={16} /> Ship Order</>}
              </button>
          )}
          <button className="flex items-center gap-2 border border-gray-200 text-gray-600 px-6 py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-50 transition-all">
              View PO <ChevronRight size={14} />
          </button>
       </div>
    </div>
  );
};