
import React from 'react';
import { TrendingUp, Users, ShoppingBag, AlertCircle, ArrowUpRight } from 'lucide-react';

export const BrandPulse: React.FC = () => {
  const metrics = [
    { label: "Total Sales", value: "$42,500", trend: "+12%", icon: ShoppingBag, color: "bg-blue-50 text-blue-600" },
    { label: "Active Retailers", value: "24", trend: "+2", icon: Users, color: "bg-purple-50 text-purple-600" },
    { label: "Avg. Sell-Through", value: "68%", trend: "+5%", icon: TrendingUp, color: "bg-green-50 text-green-600" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${m.color}`}>
                <m.icon size={20} />
              </div>
              <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                <ArrowUpRight size={12} className="mr-1" /> {m.trend}
              </span>
            </div>
            <div className="text-3xl font-serif font-bold text-[#1A1A1A]">{m.value}</div>
            <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-1">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6">
           <h3 className="font-serif text-xl mb-6">Brand Notifications</h3>
           <div className="space-y-6">
              {[
                 { title: "New Wholesale Order", desc: "Boutique 'Le Marais' requested 40 units of Silk Blouse.", time: "2h ago", type: "order" },
                 { title: "Production Alert", desc: "Fabric shipment for 'Summer Linen' delayed by 2 days.", time: "5h ago", type: "alert" },
                 { title: "Press Mention", desc: "Vogue.com featured 'Oversized Trench' in 'Top 10 Coats'.", time: "1d ago", type: "press" }
              ].map((item, i) => (
                 <div key={i} className="flex gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${item.type === 'alert' ? 'bg-red-500' : item.type === 'order' ? 'bg-green-500' : 'bg-purple-500'}`}></div>
                    <div>
                       <h4 className="font-bold text-sm text-[#1A1A1A]">{item.title}</h4>
                       <p className="text-sm text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                       <span className="text-xs text-gray-400 mt-2 block">{item.time}</span>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* AI Insight Side */}
        <div className="space-y-6">
           <div className="bg-gradient-to-br from-[#F3E8FF] to-white border border-[#E9D5FF] rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                 <AlertCircle size={18} className="text-purple-600" />
                 <span className="text-xs font-bold uppercase tracking-widest text-purple-800">AI Opportunity</span>
              </div>
              <p className="text-sm text-purple-900 leading-relaxed font-medium mb-4">
                 Search volume for <strong>"Wide Leg Linen Trousers"</strong> is up 200% this week. You have 2 matching SKUs in inventory.
              </p>
              <button className="w-full bg-white text-purple-700 text-xs font-bold uppercase tracking-widest py-3 rounded-lg border border-purple-200 hover:bg-purple-50 transition-colors">
                 Promote to Homepage
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};
