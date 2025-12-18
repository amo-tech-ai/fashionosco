import React, { useState } from 'react';
import { QrCode, CheckCircle2, Package, AlertCircle, Sparkles, X, Camera } from 'lucide-react';
import { ProductSample } from '../../types/production';

interface SampleTrackerProps {
  samples: ProductSample[];
  onUpdateStatus: (id: string, status: ProductSample['status']) => void;
}

export const SampleTracker: React.FC<SampleTrackerProps> = ({ samples, onUpdateStatus }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [activeScanId, setActiveScanId] = useState<string | null>(null);

  const stats = {
    total: samples.length,
    shot: samples.filter(s => s.status === 'shot').length,
    pending: samples.filter(s => s.status !== 'shot' && s.status !== 'returned').length,
    returned: samples.filter(s => s.status === 'returned').length
  };

  const heroPending = samples.filter(s => s.isHero && s.status !== 'shot');

  const handleSimulatedScan = (id: string) => {
    setActiveScanId(id);
    setIsScanning(true);
    // Simulate API delay for "Syncing with OS"
    setTimeout(() => {
      onUpdateStatus(id, 'shot');
      setIsScanning(false);
      setActiveScanId(null);
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* High-Contrast Status Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total SKUs', value: stats.total, color: 'text-gray-900' },
          { label: 'Captured', value: stats.shot, color: 'text-green-600' },
          { label: 'Pending', value: stats.pending, color: 'text-orange-500' },
          { label: 'Returned', value: stats.returned, color: 'text-blue-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">{stat.label}</span>
            <span className={`text-3xl font-serif font-bold ${stat.color}`}>{stat.value}</span>
          </div>
        ))}
      </div>

      {/* AI Hero Priority Alert */}
      {heroPending.length > 0 && (
        <div className="bg-orange-50 border border-orange-100 p-5 rounded-2xl flex items-center justify-between gap-4 animate-in slide-in-from-top-4">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 shrink-0">
                <AlertCircle size={20} className="animate-pulse" />
             </div>
             <div>
                <p className="text-xs font-bold text-orange-900 uppercase tracking-widest">AI Capture Priority</p>
                <p className="text-sm text-orange-800/80 font-light">{heroPending.length} hero items are currently pending capture.</p>
             </div>
          </div>
          <button className="text-xs font-bold text-orange-600 underline uppercase tracking-widest">View List</button>
        </div>
      )}

      {/* Sample List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {samples.map((sample) => (
          <div 
            key={sample.id} 
            className={`luxury-card p-5 flex items-center gap-5 transition-all duration-500 relative overflow-hidden ${
              sample.status === 'shot' ? 'bg-green-50/20 border-green-100' : 'bg-white'
            }`}
          >
            {isScanning && activeScanId === sample.id && (
              <div className="absolute inset-0 bg-white/90 z-20 flex items-center justify-center gap-2 animate-in fade-in">
                <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-purple-600">Syncing SKU...</span>
              </div>
            )}

            <div className="w-20 h-24 bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-100 relative">
               <img src={sample.image} className="w-full h-full object-cover" alt={sample.name} />
               {sample.isHero && (
                  <div className="absolute top-1 right-1 bg-black text-white p-1 rounded-lg">
                     <Sparkles size={10} fill="currentColor" />
                  </div>
               )}
            </div>
            
            <div className="flex-1 min-w-0">
               <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-sm truncate">{sample.name}</h4>
                  {sample.status === 'shot' && <CheckCircle2 size={14} className="text-green-600" />}
               </div>
               <p className="text-[10px] text-gray-400 font-mono mb-4">{sample.sku}</p>
               
               <div className="flex gap-2">
                  <button 
                    onClick={() => handleSimulatedScan(sample.id)}
                    disabled={sample.status === 'shot'}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                      sample.status === 'shot' ? 'bg-green-600 text-white shadow-lg' : 'bg-gray-100 text-gray-500 hover:bg-black hover:text-white'
                    }`}
                  >
                    <QrCode size={14} /> {sample.status === 'shot' ? 'Captured ✓' : 'Scan SKU'}
                  </button>
                  <button className="p-2 bg-gray-50 text-gray-300 rounded-xl hover:text-black transition-all">
                     <Camera size={14} />
                  </button>
               </div>
            </div>

            <div className={`text-[9px] font-black uppercase tracking-widest self-start pt-1 ${
               sample.status === 'shot' ? 'text-green-600' : 
               sample.status === 'returned' ? 'text-blue-600' : 
               'text-gray-300'
            }`}>
               {sample.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};