
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
  getAll: async (): Promise<WholesaleOrder[]> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session && import.meta.env.VITE_SUPABASE_ANON_KEY) {
        const { data, error } = await supabase
          .from('shoots')
          .select('*')
          .eq('client_id', session.user.id)
          .order('created_at', { ascending: false });

        if (!error && data) {
           return data
            .filter(d => d.brief_data?.isWholesaleOrder)
            .map(d => ({
                id: d.id,
                buyerName: d.brief_data.buyerName || 'Retail Partner',
                items: d.brief_data.items || [],
                total: d.total_price || 0,
                status: mapDbStatusToWholesale(d.status),
                date: d.created_at
            }));
        }
      }
    } catch (e) {
      console.warn("Order fetch fallback active");
    }

    const local = localStorage.getItem(STORAGE_KEY);
    return local ? JSON.parse(local) : [];
  },

  create: async (cart: CartItem[], total: number, buyerName: string = "Showroom Buyer"): Promise<WholesaleOrder> => {
    // BUSINESS LOGIC: Enforce $2k Floor
    if (total < 2000) {
        throw new Error("Wholesale minimum order value ($2,000) not met.");
    }

    // BUSINESS LOGIC: Validate MOQs and Case Packs
    for (const item of cart) {
        if (item.quantity < item.moq) {
            throw new Error(`Minimum Order Quantity not met for SKU: ${item.sku}. Required: ${item.moq}`);
        }
        if (item.quantity % item.casePack !== 0) {
            throw new Error(`Invalid quantity for SKU: ${item.sku}. Must be in multiples of ${item.casePack} (Case Pack).`);
        }
    }

    const newOrder: WholesaleOrder = {
      id: `PO-${Date.now().toString().slice(-6)}`,
      buyerName,
      items: cart,
      total,
      status: 'Pending',
      date: new Date().toISOString()
    };

    try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session && import.meta.env.VITE_SUPABASE_ANON_KEY) {
            await supabase.from('shoots').insert({
                title: `Wholesale: ${buyerName}`,
                shoot_type: 'custom',
                status: 'planning',
                total_price: total,
                client_id: session.user.id,
                brief_data: {
                    isWholesaleOrder: true,
                    buyerName,
                    items: cart,
                    poNumber: newOrder.id
                }
            });
        }
    } catch(e) {
        console.warn('Sync failed. Persistent local recovery active.');
    }

    const existing = await OrderService.getAll();
    localStorage.setItem(STORAGE_KEY, JSON.stringify([newOrder, ...existing]));
    window.dispatchEvent(new Event('ordersUpdated'));

    return newOrder;
  },

  updateStatus: async (id: string, status: WholesaleOrder['status']): Promise<void> => {
      try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session && import.meta.env.VITE_SUPABASE_ANON_KEY) {
              await supabase
                .from('shoots')
                .update({ status: mapWholesaleToDbStatus(status) })
                .eq('id', id);
          }
      } catch (e) {}
      
      window.dispatchEvent(new Event('ordersUpdated'));
  }
};

const mapDbStatusToWholesale = (status: string): WholesaleOrder['status'] => {
    if (status === 'completed') return 'Shipped';
    if (status === 'pre_production') return 'Approved';
    return 'Pending';
};

const mapWholesaleToDbStatus = (status: WholesaleOrder['status']): string => {
    if (status === 'Shipped') return 'completed';
    if (status === 'Approved') return 'pre_production';
    return 'planning';
};
