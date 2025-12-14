
import { Invoice, Transaction } from '../../types/commerce';
import { supabase } from '../../lib/supabase';

const INVOICES_KEY = 'fashionos_invoices';
const TRANSACTIONS_KEY = 'fashionos_transactions';

export const PaymentService = {
  // Get all invoices for user
  getInvoices: async (): Promise<Invoice[]> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session && import.meta.env.VITE_SUPABASE_ANON_KEY) {
        // Fetch from 'shoot_payments' or 'payments' table
        const { data, error } = await supabase
          .from('shoot_payments')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data) {
          return data.map((p: any) => ({
            id: p.id,
            userId: session.user.id,
            number: `INV-${p.created_at.substring(0,4)}-${p.id.substring(0,4).toUpperCase()}`,
            amount: p.amount,
            currency: 'USD',
            status: p.status,
            date: p.created_at,
            dueDate: p.created_at,
            description: 'Shoot Deposit', // Context could be stored in jsonb
            items: [{ description: 'Service Payment', amount: p.amount }]
          }));
        }
      }
    } catch (e) {
      // Fallback
    }

    const data = localStorage.getItem(INVOICES_KEY);
    return data ? JSON.parse(data) : [];
  },

  // Process a payment
  processPayment: async (amount: number, description: string, campaignId?: string): Promise<{ success: boolean; invoice: Invoice }> => {
    // Simulate API latency for UX
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      campaignId,
      userId: 'current-user',
      number: `INV-2025-${Math.floor(Math.random() * 10000)}`,
      amount,
      currency: 'USD',
      status: 'paid',
      date: new Date().toISOString(),
      dueDate: new Date().toISOString(),
      description,
      items: [{ description: 'Deposit Payment', amount }]
    };

    // 1. Try DB Save
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session && import.meta.env.VITE_SUPABASE_ANON_KEY) {
         await supabase.from('shoot_payments').insert({
            user_id: session.user.id,
            shoot_id: campaignId, // If linking to existing shoot
            amount: amount,
            status: 'paid',
            provider_payment_id: `txn_${Date.now()}`
         });
      }
    } catch (e) {
      console.warn("Payment saved locally only");
    }

    // 2. Local Save (Always for instant UI update)
    const invoices = await PaymentService.getInvoices();
    // Filter out duplicates if we fetched from DB previously
    const updatedInvoices = [newInvoice, ...invoices.filter(i => i.id !== newInvoice.id)];
    localStorage.setItem(INVOICES_KEY, JSON.stringify(updatedInvoices));

    return { success: true, invoice: newInvoice };
  }
};
