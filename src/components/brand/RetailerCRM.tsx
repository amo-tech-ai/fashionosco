
import React, { useState, useEffect } from 'react';
/* Added Users as UsersIcon to imports to fix error on line 87 */
import { Check, X, AlertTriangle, Globe, MapPin, Building, Search, Loader2, ShoppingBag, FileText, ChevronRight, Sparkles, Users as UsersIcon } from 'lucide-react';
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
    setLoading(true);
    try {
      const appData = await RetailerService.getAll();
      const orderData = await OrderService.getAll();
      
      setApps(appData);
      setOrders(orderData);
    } catch (e) {
      addToast("Failed to sync CRM data.", "error");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: RetailerApp['status']) => {
    setApps(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
    await RetailerService.updateStatus(id, newStatus);
    addToast(`Retailer ${newStatus}`, "success");
  };

  const updateOrderStatus = async (id: string, newStatus: WholesaleOrder['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
    await OrderService.updateStatus(id, newStatus);
    addToast(`Order ${newStatus}`, "success");
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center p-20 gap-4">
      <Loader2 className="animate-spin text-gray-300" size={32} />
      <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Syncing Stakeholder Data...</span>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="bg-white border border-gray-200 rounded-[2.5rem] p-8 shadow-sm">
         
         <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
            <div>
              <h3 className="font-serif text-3xl text-black">Stakeholder Relationship Manager</h3>
              <p className="text-sm text-gray-500 mt-1">Manage vetting requests and B2B fulfillment pipelines.</p>
            </div>
            
            <div className="flex bg-gray-100 p-1.5 rounded-2xl">
                <button 
                    onClick={() => setActiveTab('applications')}
                    className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'applications' ? 'bg-white shadow-md text-black' : 'text-gray-500 hover:text-black'}`}
                >
                    Applications
                </button>
                <button 
                    onClick={() => setActiveTab('orders')}
                    className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'orders' ? 'bg-white shadow-md text-black' : 'text-gray-500 hover:text-black'}`}
                >
                    Orders
                </button>
            </div>
         </div>

         {activeTab === 'applications' && (
             <div className="space-y-4">
                {apps.length === 0 ? (
                   <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-3xl">
                      {/* Fixed: UsersIcon is now correctly imported from lucide-react */}
                      <UsersIcon size={48} className="mx-auto mb-4 text-gray-200" />
                      <p className="text-sm text-gray-400 italic">No retailer vetting requests in queue.</p>
                   </div>
                ) : (
                   apps.map((app) => (
                      <div key={app.id} className="border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all bg-white group">
                         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex-1">
                               <div className="flex items-center gap-3 mb-2">
                                  <h4 className="font-bold text-xl">{app.storeName}</h4>
                                  <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded ${
                                     app.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                     app.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                     'bg-yellow-50 text-yellow-700 border border-yellow-100'
                                  }`}>{app.status}</span>
                               </div>
                               <div className="flex items-center gap-6 text-sm text-gray-400 font-light">
                                  <span className="flex items-center gap-1.5"><MapPin size={14}/> {app.location}</span>
                                  <span className="flex items-center gap-1.5"><Globe size={14}/> {app.website}</span>
                                  <span className="font-mono text-[10px]">{new Date(app.date).toLocaleDateString()}</span>
                               </div>
                            </div>

                            <div className="flex items-center gap-8 bg-[#FDFCFB] px-6 py-4 rounded-2xl border border-gray-100 shadow-inner">
                               <div className="text-center">
                                  <span className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Risk Score</span>
                                  <span className={`text-2xl font-bold ${app.risk_score > 50 ? 'text-red-500' : 'text-green-600'}`}>{app.risk_score}</span>
                               </div>
                               <div className="h-10 w-px bg-gray-200"></div>
                               <div className="text-center">
                                  <span className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Tier Match</span>
                                  <span className="text-sm font-bold text-gray-800">{app.aesthetic_tier}</span>
                               </div>
                            </div>

                            {app.status === 'Pending' && (
                               <div className="flex gap-2">
                                  <button 
                                     onClick={() => updateStatus(app.id, 'Rejected')}
                                     className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-xl hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all"
                                     title="Reject"
                                  >
                                     <X size={20} />
                                  </button>
                                  <button 
                                     onClick={() => updateStatus(app.id, 'Approved')}
                                     className="w-12 h-12 flex items-center justify-center bg-black text-white rounded-xl hover:bg-gray-800 transition-all shadow-xl shadow-black/10"
                                     title="Approve"
                                  >
                                     <Check size={20} />
                                  </button>
                               </div>
                            )}
                         </div>
                         
                         <div className="mt-6 pt-6 border-t border-gray-50 flex items-start gap-3">
                            <Sparkles className="text-purple-600 shrink-0 mt-0.5" size={14} />
                            <p className="text-xs text-gray-500 leading-relaxed italic">
                               AI Assessment: {app.verdict === 'Reject' 
                                 ? "High risk detected. Portfolio analysis indicates low alignment with core brand values." 
                                 : "Aesthetic profile matches contemporary luxury tier. Recommended for Net-60 terms."}
                            </p>
                         </div>
                      </div>
                   ))
                )}
             </div>
         )}

         {activeTab === 'orders' && (
             <div className="space-y-4">
                {orders.length === 0 ? (
                   <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-3xl">
                      <ShoppingBag size={48} className="mx-auto mb-4 text-gray-200" />
                      <p className="text-sm text-gray-400 italic">No fulfillment requests in pipeline.</p>
                   </div>
                ) : (
                   orders.map(order => (
                      <div key={order.id} className="border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all bg-white flex flex-col md:flex-row justify-between items-center gap-8">
                         <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                               <h4 className="font-mono text-lg font-bold text-[#1A1A1A]">{order.id}</h4>
                               <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded ${
                                  order.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                  order.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border border-yellow-100' :
                                  'bg-blue-50 text-blue-700 border border-blue-100'
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

                         <div className="flex gap-3">
                            {order.status === 'Pending' && (
                                <button 
                                    onClick={() => updateOrderStatus(order.id, 'Approved')}
                                    className="flex items-center gap-2 bg-black text-white px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl shadow-black/10 active:scale-95"
                                >
                                <FileText size={16} /> Approve PO
                                </button>
                            )}
                            <button className="flex items-center gap-2 border border-gray-200 text-gray-600 px-6 py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-50 transition-all">
                                View Details <ChevronRight size={14} />
                            </button>
                         </div>
                      </div>
                   ))
                )}
             </div>
         )}

      </div>
    </div>
  );
};
