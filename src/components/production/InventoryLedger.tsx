
import React from 'react';
import { ProductSample } from '../../types/production';
import { CheckCircle2, Sparkles, QrCode } from 'lucide-react';

interface InventoryLedgerProps {
  samples: ProductSample[];
  onUpdateStatus: (id: string, status: ProductSample['status']) => void;
  onOpenScanner: () => void;
}

export const InventoryLedger: React.FC<InventoryLedgerProps> = ({ samples, onUpdateStatus, onOpenScanner }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-2">
         <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">Sample Inventory</h3>
         <button 
           onClick={onOpenScanner}
           className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl shadow-black/10"
         >
           <QrCode size={14} /> Scan Rack
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {samples.map((sample) => (
          <div 
            key={sample.id} 
            className={`bg-white border p-5 rounded-3xl flex items-center gap-5 transition-all duration-500 ${
              sample.status === 'shot' ? 'border-green-100 bg-green-50/20 opacity-60' : 'border-gray-100'
            }`}
          >
            <div className="w-20 h-24 bg-gray-50 rounded-2xl overflow-hidden shrink-0 border border-gray-100 relative">
               <img src={sample.image} className="w-full h-full object-cover" alt="" />
               {sample.isHero && (
                  <div className="absolute top-1.5 right-1.5 bg-black text-white p-1 rounded-lg">
                     <Sparkles size={10} fill="currentColor" />
                  </div>
               )}
            </div>
            
            <div className="flex-1 min-w-0">
               <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-sm truncate text-gray-900">{sample.name}</h4>
                  {sample.status === 'shot' && <CheckCircle2 size={14} className="text-green-600" />}
               </div>
               <p className="text-[10px] text-gray-400 font-mono mb-4 uppercase">{sample.sku}</p>
               
               <button 
                onClick={() => onUpdateStatus(sample.id, sample.status === 'shot' ? 'on-set' : 'shot')}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  sample.status === 'shot' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-400 hover:text-black'
                }`}
               >
                 {sample.status === 'shot' ? 'Verified' : 'Verify Capture'}
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
