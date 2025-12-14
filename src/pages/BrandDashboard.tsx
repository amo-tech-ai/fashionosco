
import React, { useState } from 'react';
import { BrandPulse } from '../components/brand/BrandPulse';
import { MarketIntel } from '../components/brand/MarketIntel';
import { PricingCalculator } from '../components/brand/PricingCalculator';
import { Products } from './Products';
import { LayoutDashboard, Globe, DollarSign, Package } from 'lucide-react';

export const BrandDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pulse' | 'inventory' | 'market' | 'pricing'>('pulse');

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A] p-6 md:p-10 font-sans">
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
                  { id: 'inventory', label: 'Digital Showroom', icon: Package },
                  { id: 'market', label: 'Market Intel', icon: Globe },
                  { id: 'pricing', label: 'Pricing Strategy', icon: DollarSign }
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
            {activeTab === 'market' && <MarketIntel />}
            {activeTab === 'pricing' && <PricingCalculator />}
         </div>

      </div>
    </div>
  );
};
