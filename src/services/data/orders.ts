
import { CartItem } from '../../types/wholesale';
import { supabase } from '../../lib/supabase';

export interface WholesaleOrder {
  id: string;
  buyerName: string;
  items: CartItem[];
  total: number;
  status: 'Draft' | 'Pending' | 'Approved' | 'Shipped';
  date: string;
}

const STORAGE_KEY = 'fashionos_wholesale_orders';

export const OrderService = {
  // Get all orders (simulated for the brand view)
  getAll: async (): Promise<WholesaleOrder[]> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session && import.meta.env.VITE_SUPABASE_ANON_KEY) {
        // In a real schema, this would fetch from 'orders' table
        // For now, we simulate the hybrid fallback to ensure demo continuity
      }
    } catch (e) {
      // Fallback
    }

    const local = localStorage.getItem(STORAGE_KEY);
    return local ? JSON.parse(local) : [];
  },

  // Create a new order (called by Buyer)
  create: async (cart: CartItem[], total: number, buyerName: string = "Showroom Buyer"): Promise<WholesaleOrder> => {
    const newOrder: WholesaleOrder = {
      id: `PO-${Date.now().toString().slice(-6)}`,
      buyerName,
      items: cart,
      total,
      status: 'Pending',
      date: new Date().toISOString()
    };

    // 1. Save Local (Immediate UI Update)
    const existing = await OrderService.getAll();
    const updated = [newOrder, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // 2. Trigger Event for UI update across tabs/components
    window.dispatchEvent(new Event('ordersUpdated'));

    // 3. Try DB Sync (if auth)
    try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session && import.meta.env.VITE_SUPABASE_ANON_KEY) {
            // DB logic would go here: await supabase.from('orders').insert(...)
        }
    } catch(e) {
        console.warn('Order persisted locally only (Demo Mode)');
    }

    return newOrder;
  },

  updateStatus: async (id: string, status: WholesaleOrder['status']): Promise<void> => {
      const orders = await OrderService.getAll();
      const updated = orders.map(o => o.id === id ? { ...o, status } : o);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event('ordersUpdated'));
  }
};
