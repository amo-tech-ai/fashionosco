
import React, { useState, useEffect } from 'react';
import { Check, X, AlertTriangle, Globe, MapPin, Building, Search } from 'lucide-react';
import { useToast } from '../ToastProvider';

interface RetailerApp {
  id: string;
  storeName: string;
  website: string;
  location: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  risk_score: number;
  aesthetic_tier: string;
  verdict: string;
  date: string;
}

export const RetailerCRM: React.FC = () => {
  const [apps, setApps] = useState<RetailerApp[]>([]);
  const { addToast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem('retailer_applications');
    if (saved) {
      setApps(JSON.parse(saved));
    } else {
      // Mock Data
      setApps([
        { 
          id: '1', storeName: 'Le Marais Boutique', website: 'lemarais.co', location: 'Paris, France', 
          status: 'Pending', risk_score: 12, aesthetic_tier: 'Contemporary', verdict: 'Approve', date: new Date().toISOString() 
        },
        { 
          id: '2', storeName: 'Fast Fashion Outlet', website: 'cheapchic.com', location: 'Online', 
          status: 'Rejected', risk_score: 85, aesthetic_tier: 'Discount', verdict: 'Reject', date: new Date(Date.now() - 86400000).toISOString() 
        }
      ]);
    }
  }, []);

  const updateStatus = (id: string, newStatus: RetailerApp['status']) => {
    const updated = apps.map(app => app.id === id ? { ...app, status: newStatus } : app);
    setApps(updated);
    localStorage.setItem('retailer_applications', JSON.stringify(updated));
    addToast(`Application ${newStatus}`, "success");
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
         <div className="flex justify-between items-center mb-6">
            <h3 className="font-serif text-2xl">Retailer Applications</h3>
            <div className="relative">
               <input placeholder="Search..." className="pl-8 pr-4 py-2 bg-gray-50 rounded-lg text-sm border border-transparent focus:bg-white focus:border-gray-200 outline-none transition-colors" />
               <Search className="absolute left-2.5 top-2.5 text-gray-400" size={14} />
            </div>
         </div>

         <div className="space-y-4">
            {apps.length === 0 ? (
               <p className="text-center text-gray-400 py-12">No pending applications.</p>
            ) : (
               apps.map((app) => (
                  <div key={app.id} className="border border-gray-100 rounded-xl p-5 hover:shadow-md transition-all bg-white group">
                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                           <div className="flex items-center gap-3 mb-1">
                              <h4 className="font-bold text-lg">{app.storeName}</h4>
                              <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                                 app.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                 app.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                 'bg-yellow-100 text-yellow-700'
                              }`}>{app.status}</span>
                           </div>
                           <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span className="flex items-center gap-1"><MapPin size={12}/> {app.location}</span>
                              <span className="flex items-center gap-1"><Globe size={12}/> {app.website}</span>
                           </div>
                        </div>

                        {/* AI Insight Pill */}
                        <div className="flex items-center gap-6 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
                           <div className="text-center">
                              <span className="block text-[10px] font-bold text-gray-400 uppercase">Risk Score</span>
                              <span className={`text-xl font-bold ${app.risk_score > 50 ? 'text-red-500' : 'text-green-500'}`}>{app.risk_score}</span>
                           </div>
                           <div className="h-8 w-px bg-gray-200"></div>
                           <div className="text-center">
                              <span className="block text-[10px] font-bold text-gray-400 uppercase">Tier</span>
                              <span className="text-sm font-medium">{app.aesthetic_tier}</span>
                           </div>
                        </div>

                        {/* Actions */}
                        {app.status === 'Pending' && (
                           <div className="flex gap-2">
                              <button 
                                 onClick={() => updateStatus(app.id, 'Rejected')}
                                 className="p-2 border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
                                 title="Reject"
                              >
                                 <X size={20} />
                              </button>
                              <button 
                                 onClick={() => updateStatus(app.id, 'Approved')}
                                 className="p-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                                 title="Approve"
                              >
                                 <Check size={20} />
                              </button>
                           </div>
                        )}
                     </div>
                     
                     {/* Suggestion based on verdict */}
                     {app.verdict === 'Reject' && app.status === 'Pending' && (
                        <div className="mt-4 flex items-center gap-2 text-xs text-red-600 bg-red-50 p-2 rounded">
                           <AlertTriangle size={14} />
                           <span>AI Recommendation: High risk detected. Verify website ownership before approving.</span>
                        </div>
                     )}
                  </div>
               ))
            )}
         </div>
      </div>
    </div>
  );
};
