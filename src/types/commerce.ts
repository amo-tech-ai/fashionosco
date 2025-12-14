
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type PaymentMethod = 'card' | 'bank_transfer' | 'apple_pay';

export interface Invoice {
  id: string;
  campaignId?: string;
  userId: string;
  number: string; // INV-2025-001
  amount: number;
  currency: string;
  status: PaymentStatus;
  date: string;
  dueDate: string;
  description: string;
  items: Array<{ description: string; amount: number }>;
  pdfUrl?: string;
}

export interface Transaction {
  id: string;
  invoiceId: string;
  amount: number;
  date: string;
  method: PaymentMethod;
  last4?: string;
  brand?: string; // Visa, Mastercard
}
