
import React, { useState, useEffect } from 'react';
import { Check, X, AlertTriangle, Globe, MapPin, Building, Search, Loader2, ShoppingBag, FileText, ChevronRight } from 'lucide-react';
import { useToast } from '../ToastProvider';
import { RetailerService, RetailerApp } from '../../services/data/retailers';
import { OrderService, WholesaleOrder } from '../../services/data/orders';

export const RetailerCRM: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'applications' | 'orders'>('applications');
  const [apps, setApps] = useState<RetailerApp[]>([]);
  const [orders, setOrders] = useState<WholesaleOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    loadData();
    
    // Listen for new orders (e.g. from Showroom)
    window.addEventListener('ordersUpdated', loadData);
    return () => window.removeEventListener('ordersUpdated', loadData);
  }, []);

  const loadData = async () => {
    const appData = await RetailerService.getAll();
    const orderData = await OrderService.getAll();
    
    // Fallback Mock Data for Apps if empty
    if (appData.length === 0) {
        const mocks: RetailerApp[] = [
            { 
              id: '1', storeName: 'Le Marais Boutique', website: 'lemarais.co', location: 'Paris, France', 
              status: 'Pending', risk_score: 12, aesthetic_tier: 'Contemporary', verdict: 'Approve', date: new Date().toISOString() 
            },
            { 
              id: '2', storeName: 'Fast Fashion Outlet', website: 'cheapchic.com', location: 'Online', 
              status: 'Rejected', risk_score: 85, aesthetic_tier: 'Discount', verdict: 'Reject', date: new Date(Date.now() - 86400000).toISOString() 
            }
        ];
        setApps(mocks);
    } else {
        setApps(appData);
    }

    setOrders(orderData);
    setLoading(false);
  };

  const updateStatus = async (id: string, newStatus: RetailerApp['status']) => {
    setApps(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
    await RetailerService.updateStatus(id, newStatus);
    addToast(`Application ${newStatus}`, "success");
  };

  const updateOrderStatus = async (id: string, newStatus: WholesaleOrder['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
    await OrderService.updateStatus(id, newStatus);
    addToast(`Order marked as ${newStatus}`, "success");
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-gray-400" /></div>;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
         
         <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h3 className="font-serif text-2xl">Retailer Management</h3>
            
            <div className="flex bg-gray-100 p-1 rounded-lg">
                <button 
                    onClick={() => setActiveTab('applications')}
                    className={`px-4 py-2 rounded-md text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'applications' ? 'bg-white shadow-sm text-black' : 'text-gray-500'}`}
                >
                    Applications
                </button>
                <button 
                    onClick={() => setActiveTab('orders')}
                    className={`px-4 py-2 rounded-md text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'orders' ? 'bg-white shadow-sm text-black' : 'text-gray-500'}`}
                >
                    Wholesale Orders
                </button>
            </div>
         </div>

         {activeTab === 'applications' && (
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
         )}

         {activeTab === 'orders' && (
             <div className="space-y-4">
                {orders.length === 0 ? (
                   <div className="text-center text-gray-400 py-12">
                      <ShoppingBag size={32} className="mx-auto mb-2 opacity-50" />
                      <p>No active wholesale orders.</p>
                   </div>
                ) : (
                   orders.map(order => (
                      <div key={order.id} className="border border-gray-100 rounded-xl p-5 hover:shadow-md transition-all bg-white flex flex-col md:flex-row justify-between items-center gap-4">
                         <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                               <h4 className="font-mono text-lg font-bold text-[#1A1A1A]">{order.id}</h4>
                               <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                                  order.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                  order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-gray-100 text-gray-600'
                               }`}>{order.status}</span>
                            </div>
                            <div className="text-sm text-gray-500">
                               {order.buyerName} • {new Date(order.date).toLocaleDateString()}
                            </div>
                         </div>

                         <div className="flex items-center gap-8">
                            <div>
                               <span className="block text-[10px] font-bold text-gray-400 uppercase">Items</span>
                               <span className="font-medium text-lg">{order.items.reduce((acc, i) => acc + i.quantity, 0)}</span>
                            </div>
                            <div className="text-right">
                               <span className="block text-[10px] font-bold text-gray-400 uppercase">Total</span>
                               <span className="font-serif text-2xl">${order.total.toLocaleString()}</span>
                            </div>
                         </div>

                         {order.status === 'Pending' && (
                            <button 
                                onClick={() => updateOrderStatus(order.id, 'Approved')}
                                className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
                            >
                               <FileText size={14} /> Approve PO
                            </button>
                         )}
                         {order.status === 'Approved' && (
                            <button className="flex items-center gap-2 border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors">
                               View Invoice <ChevronRight size={14} />
                            </button>
                         )}
                      </div>
                   ))
                )}
             </div>
         )}

      </div>
    </div>
  );
};
