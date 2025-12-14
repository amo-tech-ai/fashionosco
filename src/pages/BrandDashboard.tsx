
import React, { useState } from 'react';
import { BrandPulse } from '../components/brand/BrandPulse';
import { MarketIntel } from '../components/brand/MarketIntel';
import { PricingCalculator } from '../components/brand/PricingCalculator';
import { Products } from './Products';
import { StrategyCopilot } from '../components/brand/StrategyCopilot';
import { LayoutDashboard, Globe, DollarSign, Package, ShoppingCart } from 'lucide-react';

export const BrandDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pulse' | 'inventory' | 'market' | 'pricing' | 'orders'>('pulse');

  // Mock Orders Component (Inline for simplicity)
  const WholesaleOrders = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
       <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h3 className="font-serif text-2xl mb-6">Inbound Wholesale Orders</h3>
          <table className="w-full text-left">
             <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                   <th className="p-4 text-xs font-bold uppercase tracking-widest text-gray-500">PO #</th>
                   <th className="p-4 text-xs font-bold uppercase tracking-widest text-gray-500">Buyer</th>
                   <th className="p-4 text-xs font-bold uppercase tracking-widest text-gray-500">Date</th>
                   <th className="p-4 text-xs font-bold uppercase tracking-widest text-gray-500">Total</th>
                   <th className="p-4 text-xs font-bold uppercase tracking-widest text-gray-500">Status</th>
                   <th className="p-4 text-xs font-bold uppercase tracking-widest text-gray-500">Action</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50">
                   <td className="p-4 font-mono text-sm">PO-18392</td>
                   <td className="p-4 font-medium">Le Marais Boutique</td>
                   <td className="p-4 text-sm text-gray-500">Oct 24, 2025</td>
                   <td className="p-4 font-medium">$4,250</td>
                   <td className="p-4"><span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded font-bold uppercase">Draft</span></td>
                   <td className="p-4"><button className="text-xs font-bold underline">Review</button></td>
                </tr>
                <tr className="hover:bg-gray-50">
                   <td className="p-4 font-mono text-sm">PO-18391</td>
                   <td className="p-4 font-medium">Selfridges Co.</td>
                   <td className="p-4 text-sm text-gray-500">Oct 22, 2025</td>
                   <td className="p-4 font-medium">$12,800</td>
                   <td className="p-4"><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-bold uppercase">Approved</span></td>
                   <td className="p-4"><button className="text-xs font-bold underline">Invoice</button></td>
                </tr>
             </tbody>
          </table>
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A] p-6 md:p-10 font-sans relative">
      <StrategyCopilot />
      
      <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-500">
         
         {/* Header */}
         <div className="flex flex-col md:flex-row justify-between items-end pb-6 border-b border-gray-200">
            <div>
               <h1 className="font-serif text-4xl mb-2">Brand Command Center</h1>
               <p className="text-gray-500 text-sm">Manage your collection, analyze the market, and optimize margins.</p>
            </div>
            
            {/* Tabs */}
            <div className="flex gap-2 bg-white p-1.5 rounded-xl border border-gray-200 shadow-sm mt-4 md:mt-0 overflow-x-auto max-w-full">
               {[
                  { id: 'pulse', label: 'Overview', icon: LayoutDashboard },
                  { id: 'inventory', label: 'Inventory', icon: Package },
                  { id: 'orders', label: 'Orders', icon: ShoppingCart },
                  { id: 'market', label: 'Market Intel', icon: Globe },
                  { id: 'pricing', label: 'Pricing', icon: DollarSign }
               ].map((tab) => (
                  <button
                     key={tab.id}
                     onClick={() => setActiveTab(tab.id as any)}
                     className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                        activeTab === tab.id 
                        ? 'bg-[#1A1A1A] text-white shadow-md' 
                        : 'text-gray-500 hover:bg-gray-50 hover:text-black'
                     }`}
                  >
                     <tab.icon size={14} /> {tab.label}
                  </button>
               ))}
            </div>
         </div>

         {/* Content Area */}
         <div className="min-h-[600px]">
            {activeTab === 'pulse' && <BrandPulse />}
            {activeTab === 'inventory' && <Products />}
            {activeTab === 'orders' && <WholesaleOrders />}
            {activeTab === 'market' && <MarketIntel />}
            {activeTab === 'pricing' && <PricingCalculator />}
         </div>

      </div>
    </div>
  );
};
