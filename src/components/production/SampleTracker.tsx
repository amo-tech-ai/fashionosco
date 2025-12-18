
import React, { useState, useRef } from 'react';
import { QrCode, CheckCircle2, Package, AlertCircle, Sparkles, X, Camera, RefreshCw } from 'lucide-react';
import { ProductSample } from '../../types/production';
import { useToast } from '../ToastProvider';

interface SampleTrackerProps {
  samples: ProductSample[];
  onUpdateStatus: (id: string, status: ProductSample['status']) => void;
}

export const SampleTracker: React.FC<SampleTrackerProps> = ({ samples, onUpdateStatus }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { addToast } = useToast();

  const stats = {
    total: samples.length,
    shot: samples.filter(s => s.status === 'shot').length,
    pending: samples.filter(s => s.status !== 'shot' && s.status !== 'returned').length,
    returned: samples.filter(s => s.status === 'returned').length
  };

  const handleStartScan = async () => {
    setIsCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      addToast("Optical Engine Initialized.", "info");
      
      // Simulate a scan after 3 seconds
      setTimeout(() => {
        const pending = samples.find(s => s.status === 'on-set');
        if (pending) {
          onUpdateStatus(pending.id, 'shot');
          addToast(`SKU Verified: ${pending.sku}`, "success");
        }
        handleStopScan();
      }, 3000);

    } catch (err) {
      addToast("Camera access denied.", "error");
      setIsCameraActive(false);
    }
  };

  const handleStopScan = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach(track => track.stop());
    setIsCameraActive(false);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Set Scanning Interface */}
      {isCameraActive && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-6">
           <div className="w-full max-w-md aspect-[3/4] bg-gray-900 rounded-[3rem] border-4 border-white/20 relative overflow-hidden shadow-2xl">
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
              <div className="absolute inset-0 border-[40px] border-black/40 pointer-events-none">
                 <div className="w-full h-full border-2 border-purple-500 rounded-2xl relative">
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.8)] animate-[moveDown_2s_infinite]"></div>
                 </div>
              </div>
              <div className="absolute bottom-8 inset-x-0 text-center">
                 <span className="bg-black/60 backdrop-blur px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-white animate-pulse">
                    Scanning for FashionOS Tags...
                 </span>
              </div>
           </div>
           <button 
            onClick={handleStopScan}
            className="mt-8 w-16 h-16 bg-white text-black rounded-full flex items-center justify-center shadow-2xl"
           >
             <X size={24} />
           </button>
        </div>
      )}

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

      <div className="flex justify-between items-center">
         <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Inventory Ledger</h3>
         <button 
           onClick={handleStartScan}
           className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-purple-700 shadow-lg shadow-purple-900/20 transition-all"
         >
           <QrCode size={14} /> Open Scanner
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {samples.map((sample) => (
          <div 
            key={sample.id} 
            className={`luxury-card p-5 flex items-center gap-5 transition-all duration-500 relative overflow-hidden ${
              sample.status === 'shot' ? 'bg-green-50/20 border-green-100' : 'bg-white'
            }`}
          >
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
                    onClick={() => onUpdateStatus(sample.id, 'shot')}
                    disabled={sample.status === 'shot'}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      sample.status === 'shot' ? 'bg-green-600 text-white shadow-lg' : 'bg-gray-100 text-gray-400 hover:text-black'
                    }`}
                  >
                    {sample.status === 'shot' ? 'Verified ✓' : 'Verify Capture'}
                  </button>
               </div>
            </div>
          </div>
        ))}
      </div>
      
      <style>{`
        @keyframes moveDown {
          from { transform: translateY(-100%); }
          to { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
};
