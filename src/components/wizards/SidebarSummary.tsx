
import React from 'react';
import { useShootWizard } from '../../contexts/ShootWizardContext';
import { ShoppingBag } from 'lucide-react';

export const SidebarSummary: React.FC = () => {
  const { state } = useShootWizard();

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm sticky top-32">
      <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
         <ShoppingBag size={18} />
         <h3 className="font-serif text-lg font-bold">Booking Summary</h3>
      </div>
      
      <div className="space-y-4 text-sm">
         <div className="flex justify-between">
            <span className="text-gray-500">Shoot Type</span>
            <span className="font-medium capitalize">{state.shootType || '-'}</span>
         </div>
         <div className="flex justify-between">
            <span className="text-gray-500">Items</span>
            <span className="font-medium">{state.numberOfItems}</span>
         </div>
         {state.modelNeeded && (
            <div className="flex justify-between">
               <span className="text-gray-500">Model</span>
               <span className="font-medium text-green-600">Included</span>
            </div>
         )}
         {state.stylingNeeded === 'stylist' && (
            <div className="flex justify-between">
               <span className="text-gray-500">Stylist</span>
               <span className="font-medium text-green-600">Included</span>
            </div>
         )}
         
         <div className="border-t border-gray-100 pt-4 mt-4">
            <div className="flex justify-between items-end">
               <span className="text-gray-500 font-bold">Estimated Total</span>
               <span className="font-serif text-2xl font-bold">${state.totalPrice}</span>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-400">
               <span>Deposit Due</span>
               <span>${state.deposit}</span>
            </div>
         </div>
      </div>
    </div>
  );
};
