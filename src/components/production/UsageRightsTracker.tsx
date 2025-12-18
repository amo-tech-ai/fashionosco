import React from 'react';
import { ShieldCheck, AlertTriangle, Clock, RefreshCw } from 'lucide-react';
import { UsageRight } from '../../types/production';

interface UsageRightsTrackerProps {
  rights: UsageRight[];
}

export const UsageRightsTracker: React.FC<UsageRightsTrackerProps> = ({ rights }) => {
  const expiringCount = rights.filter(r => r.status === 'expiring').length;

  return (
    <div className="space-y-6">
      {/* AI Alert Card */}
      {expiringCount > 0 && (
        <div className="bg-red-50 border border-red-100 p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600">
                <AlertTriangle size={24} />
             </div>
             <div>
                <h4 className="font-bold text-red-900">Rights Expiry Alert</h4>
                <p className="text-sm text-red-800/80">{expiringCount} high-value assets expire in 30 days.</p>
             </div>
          </div>
          <button className="px-6 py-3 bg-red-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-red-700 transition-all flex items-center gap-2">
             <RefreshCw size={14} /> Renew Global Usage
          </button>
        </div>
      )}

      {/* Asset Table */}
      <div className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm">
         <table className="w-full text-left">
            <thead className="bg-[#FAF9F6] border-b border-gray-50">
               <tr>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Asset</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Rights Tier</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Expires</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">Status</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
               {rights.map((item) => (
                  <tr key={item.id} className="group hover:bg-gray-50/50 transition-colors">
                     <td className="px-8 py-4">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-100">
                              <img src={item.thumbnail} className="w-full h-full object-cover" alt="" />
                           </div>
                           <span className="font-bold text-sm text-gray-900">{item.assetName}</span>
                        </div>
                     </td>
                     <td className="px-8 py-4">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-widest flex items-center gap-2">
                           <ShieldCheck size={14} className="text-blue-500" />
                           {item.tier}
                        </span>
                     </td>
                     <td className="px-8 py-4 font-mono text-xs text-gray-400">
                        {item.expiryDate}
                     </td>
                     <td className="px-8 py-4 text-right">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                           item.status === 'active' ? 'bg-green-50 text-green-600' :
                           item.status === 'expiring' ? 'bg-orange-50 text-orange-600' :
                           'bg-red-50 text-red-600'
                        }`}>
                           {item.status}
                        </span>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
    </div>
  );
};