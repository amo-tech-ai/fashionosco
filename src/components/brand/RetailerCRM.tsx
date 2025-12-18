import React, { useState, useEffect, useCallback } from 'react';
import { Loader2, Users as UsersIcon, ShoppingBag } from 'lucide-react';
import { useToast } from '../ToastProvider';
import { RetailerService, RetailerApp } from '../../services/data/retailers';
import { OrderService, WholesaleOrder } from '../../services/data/orders';
import { RetailerAppCard } from './crm/RetailerAppCard';
import { WholesaleOrderCard } from './crm/WholesaleOrderCard';

export const RetailerCRM: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'applications' | 'orders'>('applications');
  const [apps, setApps] = useState<RetailerApp[]>([]);
  const [orders, setOrders] = useState<WholesaleOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [appData, orderData] = await Promise.all([
        RetailerService.getAll(),
        OrderService.getAll()
      ]);
      setApps(appData);
      setOrders(orderData);
    } catch (e) {
      addToast("Failed to sync CRM data.", "error");
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    loadData();
    window.addEventListener('ordersUpdated', loadData);
    return () => window.removeEventListener('ordersUpdated', loadData);
  }, [loadData]);

  const handleUpdateStatus = async (id: string, newStatus: RetailerApp['status']) => {
    setApps(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
    await RetailerService.updateStatus(id, newStatus);
    addToast(`Retailer ${newStatus}`, "success");
  };

  const handleProcessOrder = async (order: WholesaleOrder) => {
    const nextStatusMap: Record<string, WholesaleOrder['status']> = {
      'Pending': 'Approved',
      'Approved': 'Shipped'
    };
    const nextStatus = nextStatusMap[order.status];
    if (!nextStatus) return;

    setOrders(prev => prev.map(o => o.id === order.id ? { ...o, status: nextStatus } : o));
    await OrderService.updateStatus(order.id, nextStatus);
    addToast(`Order ${nextStatus}`, "success");
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center p-20 gap-4">
      <Loader2 className="animate-spin text-gray-300" size={32} />
      <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Synchronizing B2B Pipeline...</span>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 pb-20">
      <div className="bg-white border border-gray-200 rounded-[2.5rem] p-8 shadow-sm">
         
         <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
            <div>
              <h3 className="font-serif text-3xl text-black">Relationship Manager</h3>
              <p className="text-sm text-gray-500 mt-1">Vetting and fulfillment command center for global retailers.</p>
            </div>
            
            <div className="flex bg-gray-100 p-1.5 rounded-2xl">
                <button 
                    onClick={() => setActiveTab('applications')}
                    className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'applications' ? 'bg-white shadow-md text-black' : 'text-gray-500 hover:text-black'}`}
                >
                    Vetting ({apps.filter(a => a.status === 'Pending').length})
                </button>
                <button 
                    onClick={() => setActiveTab('orders')}
                    className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'orders' ? 'bg-white shadow-md text-black' : 'text-gray-500 hover:text-black'}`}
                >
                    Fulfillment ({orders.filter(o => o.status !== 'Shipped').length})
                </button>
            </div>
         </div>

         <div className="space-y-4 min-h-[400px]">
            {activeTab === 'applications' ? (
                apps.length === 0 ? (
                   <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-3xl h-full flex flex-col items-center justify-center">
                      <UsersIcon size={48} className="mb-4 text-gray-200" />
                      <p className="text-sm text-gray-400 italic">No vetting requests in queue.</p>
                   </div>
                ) : (
                   apps.map((app) => (
                      <RetailerAppCard key={app.id} app={app} onUpdateStatus={handleUpdateStatus} />
                   ))
                )
            ) : (
                orders.length === 0 ? (
                   <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-3xl h-full flex flex-col items-center justify-center">
                      <ShoppingBag size={48} className="mb-4 text-gray-200" />
                      <p className="text-sm text-gray-400 italic">No wholesale orders in fulfillment.</p>
                   </div>
                ) : (
                   orders.map(order => (
                      <WholesaleOrderCard key={order.id} order={order} onProcess={handleProcessOrder} />
                   ))
                )
            )}
         </div>
      </div>
    </div>
  );
};