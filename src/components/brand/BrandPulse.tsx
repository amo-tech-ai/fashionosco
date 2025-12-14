
import React, { useEffect, useState } from 'react';
import { TrendingUp, Users, ShoppingBag, AlertCircle, ArrowUpRight, Loader2, ArrowRight } from 'lucide-react';
import { BrandService } from '../../services/data/brands';
import { getBrandPulse, BrandPulseData } from '../../services/ai/brandPulse';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Button';

export const BrandPulse: React.FC = () => {
  const [data, setData] = useState<BrandPulseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      const profile = await BrandService.get();
      
      if (!profile) {
         setHasProfile(false);
         setLoading(false);
         return;
      }

      setHasProfile(true);
      const pulse = await getBrandPulse(profile);
      setData(pulse);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 animate-in fade-in">
        <Loader2 className="w-8 h-8 animate-spin text-gray-300" />
      </div>
    );
  }

  // EMPTY STATE: No Brand Profile
  if (!hasProfile || !data) {
     return (
        <div className="flex flex-col items-center justify-center h-96 text-center space-y-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-10 animate-in fade-in slide-in-from-bottom-4">
           <div className="w-24 h-24 bg-gradient-to-br from-purple-50 to-blue-50 rounded-full flex items-center justify-center">
              <TrendingUp className="w-10 h-10 text-purple-600" />
           </div>
           <div className="max-w-md">
              <h3 className="font-serif text-2xl text-[#1A1A1A] mb-2">Initialize Your Brand OS</h3>
              <p className="text-gray-500 font-light mb-8">
                 We need to learn about your brand identity before we can generate strategic insights.
                 Complete the AI audit to unlock your dashboard.
              </p>
              <Button onClick={() => navigate('/create-profile')} className="px-8 py-4">
                 <span className="flex items-center gap-2">
                    Create Brand Profile <ArrowRight size={16} />
                 </span>
              </Button>
           </div>
        </div>
     );
  }

  const metrics = [
    { label: "Total Sales", value: "$42,500", trend: data.metrics.sales_trend, icon: ShoppingBag, color: "bg-blue-50 text-blue-600" },
    { label: "Active Retailers", value: data.metrics.retailers_count.toString(), trend: "+2", icon: Users, color: "bg-purple-50 text-purple-600" },
    { label: "Avg. Sell-Through", value: data.metrics.sell_through, trend: "+5%", icon: TrendingUp, color: "bg-green-50 text-green-600" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
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
              {data.notifications.map((item, i) => (
                 <div key={i} className="flex gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0 group">
                    <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${item.type === 'alert' ? 'bg-red-500' : item.type === 'order' ? 'bg-green-500' : 'bg-purple-500'}`}></div>
                    <div>
                       <h4 className="font-bold text-sm text-[#1A1A1A] group-hover:text-purple-600 transition-colors">{item.title}</h4>
                       <p className="text-sm text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                       <span className="text-xs text-gray-400 mt-2 block">{item.time}</span>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* AI Insight Side */}
        <div className="space-y-6">
           <div className="bg-gradient-to-br from-[#F3E8FF] to-white border border-[#E9D5FF] rounded-2xl p-6 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-4 relative z-10">
                 <AlertCircle size={18} className="text-purple-600" />
                 <span className="text-xs font-bold uppercase tracking-widest text-purple-800">AI Opportunity</span>
              </div>
              <h4 className="font-bold text-lg mb-2 relative z-10 text-purple-900">{data.insight.title}</h4>
              <p className="text-sm text-purple-800 leading-relaxed font-medium mb-6 relative z-10 opacity-80">
                 {data.insight.description}
              </p>
              <button className="relative z-10 w-full bg-white text-purple-700 text-xs font-bold uppercase tracking-widest py-3 rounded-lg border border-purple-200 hover:bg-purple-50 transition-colors shadow-sm">
                 {data.insight.action}
              </button>
              
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200 rounded-full blur-[50px] opacity-50"></div>
           </div>
        </div>
      </div>
    </div>
  );
};
