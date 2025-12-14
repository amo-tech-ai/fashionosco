
import { Invoice, Transaction } from '../../types/commerce';

// Mock Data Storage
const INVOICES_KEY = 'fashionos_invoices';
const TRANSACTIONS_KEY = 'fashionos_transactions';

export const PaymentService = {
  // Get all invoices for user
  getInvoices: async (): Promise<Invoice[]> => {
    const data = localStorage.getItem(INVOICES_KEY);
    return data ? JSON.parse(data) : [];
  },

  // Process a payment (Simulated)
  processPayment: async (amount: number, description: string, campaignId?: string): Promise<{ success: boolean; invoice: Invoice }> => {
    // Simulate API latency
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      campaignId,
      userId: 'current-user', // In real app, get from Auth Context
      number: `INV-2025-${Math.floor(Math.random() * 10000)}`,
      amount,
      currency: 'USD',
      status: 'paid',
      date: new Date().toISOString(),
      dueDate: new Date().toISOString(), // Paid immediately
      description,
      items: [{ description: 'Deposit Payment', amount }]
    };

    const newTransaction: Transaction = {
      id: `txn-${Date.now()}`,
      invoiceId: newInvoice.id,
      amount,
      date: new Date().toISOString(),
      method: 'card',
      last4: '4242',
      brand: 'Visa'
    };

    // Save
    const invoices = await PaymentService.getInvoices();
    localStorage.setItem(INVOICES_KEY, JSON.stringify([newInvoice, ...invoices]));

    const transactions = JSON.parse(localStorage.getItem(TRANSACTIONS_KEY) || '[]');
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify([newTransaction, ...transactions]));

    return { success: true, invoice: newInvoice };
  }
};
