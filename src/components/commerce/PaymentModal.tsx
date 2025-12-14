
import React, { useState } from 'react';
import { X, Lock, CreditCard, ShieldCheck, Loader2 } from 'lucide-react';
import { Button } from '../Button';
import { PaymentService } from '../../services/data/payments';
import { useToast } from '../ToastProvider';

interface PaymentModalProps {
  amount: number;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (invoiceId: string) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ amount, description, isOpen, onClose, onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const { addToast } = useToast();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate Processing
      const result = await PaymentService.processPayment(amount, description);
      if (result.success) {
        addToast("Payment successful!", "success");
        onSuccess(result.invoice.id);
        onClose();
      }
    } catch (error) {
      addToast("Payment failed. Please try again.", "error");
    } finally {
      setIsProcessing(false);
    }
  };

  // Basic formatting helpers
  const formatCard = (val: string) => val.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
  const formatExpiry = (val: string) => val.replace(/\D/g, '').replace(/(.{2})/, '$1/').trim().slice(0, 5);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative z-10 animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="bg-gray-50 p-6 border-b border-gray-100 flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg text-gray-900">Secure Payment</h3>
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
              <Lock size={10} /> 256-bit SSL Encrypted
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-serif font-bold text-gray-900">${amount.toLocaleString()}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Total Due</div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6 bg-blue-50 border border-blue-100 p-3 rounded-lg flex items-start gap-3">
             <ShieldCheck className="text-blue-600 shrink-0 mt-0.5" size={16} />
             <p className="text-xs text-blue-800 leading-relaxed">
                You are paying a 50% deposit for <strong>{description}</strong>. The remaining balance is due upon asset delivery.
             </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
             <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Card Information</label>
                <div className="relative">
                   <CreditCard className="absolute left-3 top-3 text-gray-400" size={18} />
                   <input 
                      type="text" 
                      placeholder="0000 0000 0000 0000"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCard(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black font-mono text-sm transition-colors"
                      required
                   />
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Expiry</label>
                   <input 
                      type="text" 
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black font-mono text-sm transition-colors"
                      required
                   />
                </div>
                <div>
                   <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">CVC</label>
                   <input 
                      type="text" 
                      placeholder="123"
                      maxLength={4}
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black font-mono text-sm transition-colors"
                      required
                   />
                </div>
             </div>

             <div className="pt-4">
                <Button 
                   type="submit" 
                   disabled={isProcessing} 
                   className="w-full justify-center py-4 bg-black text-white hover:bg-gray-800"
                >
                   {isProcessing ? (
                      <span className="flex items-center gap-2">
                         <Loader2 className="animate-spin" size={16} /> Processing...
                      </span>
                   ) : (
                      `Pay $${amount.toLocaleString()}`
                   )}
                </Button>
                <button 
                   type="button"
                   onClick={onClose}
                   className="w-full text-center text-xs text-gray-400 mt-4 hover:text-gray-600"
                >
                   Cancel Transaction
                </button>
             </div>
          </form>
        </div>
      </div>
    </div>
  );
};
