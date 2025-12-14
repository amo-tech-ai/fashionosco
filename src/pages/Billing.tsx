
import React, { useEffect, useState } from 'react';
import { PaymentService } from '../services/data/payments';
import { Invoice } from '../types/commerce';
import { Download, FileText, CheckCircle, Clock, Search } from 'lucide-react';
import { useToast } from '../components/ToastProvider';

export const Billing: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const { addToast } = useToast();

  useEffect(() => {
    PaymentService.getInvoices().then(setInvoices);
  }, []);

  const handleDownload = (id: string) => {
    addToast("Downloading invoice PDF...", "info");
    // In a real app, this would trigger a PDF generation or download URL
  };

  const totalSpent = invoices.reduce((acc, inv) => acc + inv.amount, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
         <div>
            <h1 className="font-serif text-3xl text-[#1A1A1A]">Billing & Invoices</h1>
            <p className="text-sm text-gray-500">Manage payments and download receipts.</p>
         </div>
         <div className="bg-white px-6 py-3 rounded-xl border border-gray-200 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block">Total Spend</span>
            <span className="text-2xl font-serif text-[#1A1A1A]">${totalSpent.toLocaleString()}</span>
         </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
         <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-sm text-gray-700">Payment History</h3>
            <div className="relative">
               <input 
                  type="text" 
                  placeholder="Search invoice..." 
                  className="pl-8 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-black"
               />
               <Search size={14} className="absolute left-2.5 top-2.5 text-gray-400" />
            </div>
         </div>

         {invoices.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
               <FileText size={48} className="mx-auto mb-4 opacity-20" />
               <p className="text-sm">No invoices found. Book a shoot to generate your first invoice.</p>
            </div>
         ) : (
            <table className="w-full text-left">
               <thead className="bg-gray-50/50 border-b border-gray-100">
                  <tr>
                     <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Invoice</th>
                     <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Date</th>
                     <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Description</th>
                     <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Amount</th>
                     <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Status</th>
                     <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500 text-right">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                  {invoices.map((inv) => (
                     <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-mono text-sm text-gray-600">{inv.number}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{new Date(inv.date).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{inv.description}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">${inv.amount.toLocaleString()}</td>
                        <td className="px-6 py-4">
                           {inv.status === 'paid' ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700">
                                 <CheckCircle size={12} /> Paid
                              </span>
                           ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-yellow-50 text-yellow-700">
                                 <Clock size={12} /> Pending
                              </span>
                           )}
                        </td>
                        <td className="px-6 py-4 text-right">
                           <button 
                              onClick={() => handleDownload(inv.id)}
                              className="text-gray-400 hover:text-black transition-colors"
                              title="Download PDF"
                           >
                              <Download size={16} />
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         )}
      </div>
    </div>
  );
};
