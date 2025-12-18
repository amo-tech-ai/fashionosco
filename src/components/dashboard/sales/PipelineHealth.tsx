import React from 'react';
import { TrendingUp, AlertCircle, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { Deal, DealHealth } from '../../../types/sales';

const MOCK_DEALS: Deal[] = [
  {
    id: '1',
    clientName: 'Maison Margiela',
    projectType: 'FW26 Campaign',
    value: 45000,
    health: 'high',
    closingProbability: 88,
    daysInPipeline: 12,
    momentumData: [10, 25, 45, 50, 80, 85, 90],
    aiReasoning: 'Consistent high engagement from procurement. Budget alignment confirmed.',
    lastTouch: '2h ago'
  },
  {
    id: '2',
    clientName: 'Jacquemus',
    projectType: 'Social-First Lookbook',
    value: 12000,
    health: 'at-risk',
    closingProbability: 35,
    daysInPipeline: 45,
    momentumData: [80, 70, 40, 30, 25, 20, 15],
    aiReasoning: 'Communication gap detected (>14 days). Competitor matching current aesthetic.',
    lastTouch: '14d ago'
  },
  {
    id: '3',
    clientName: 'A-Cold-Wall*',
    projectType: 'Experimental Video',
    value: 28000,
    health: 'high',
    closingProbability: 72,
    daysInPipeline: 8,
    momentumData: [5, 10, 20, 35, 60, 65, 75],
    aiReasoning: 'Rapid intent parsing. Creative brief accepted with zero revisions.',
    lastTouch: '5h ago'
  }
];

const Sparkline = ({ data, health }: { data: number[], health: DealHealth }) => {
  const max = Math.max(...data);
  const width = 100;
  const height = 30;
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - (val / max) * height;
    return `${x},${y}`;
  }).join(' ');

  const color = health === 'high' ? '#A855F7' : health === 'at-risk' ? '#EF4444' : '#6B7280';

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
};

const DealCard = ({ deal }: { deal: Deal }) => (
  <div className="luxury-card p-6 flex flex-col gap-6 bg-white group hover:border-black transition-all">
    <div className="flex justify-between items-start">
      <div>
        <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">{deal.projectType}</h4>
        <h3 className="font-serif text-xl text-black">{deal.clientName}</h3>
      </div>
      <div className="text-right">
        <div className="text-lg font-medium text-black">${deal.value.toLocaleString()}</div>
        <div className={`text-[10px] font-black uppercase tracking-tighter ${deal.health === 'high' ? 'text-purple-600' : 'text-red-500'}`}>
          {deal.closingProbability}% Probability
        </div>
      </div>
    </div>

    <div className="flex items-center justify-between py-4 border-y border-gray-50">
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Engagement Momentum</span>
        <Sparkline data={deal.momentumData} health={deal.health} />
      </div>
      <div className="text-right flex flex-col gap-1">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pipeline Age</span>
        <div className="text-xs font-medium text-black">{deal.daysInPipeline} Days</div>
      </div>
    </div>

    <div className="bg-gray-50/50 p-3 rounded-xl relative overflow-hidden">
      <div className="flex items-start gap-2 relative z-10">
        <Sparkles size={12} className="text-purple-400 shrink-0 mt-0.5" />
        <p className="text-[11px] text-gray-600 leading-relaxed italic">"{deal.aiReasoning}"</p>
      </div>
      <div className="absolute top-0 right-0 w-16 h-16 bg-purple-100/20 blur-2xl rounded-full"></div>
    </div>

    <div className="flex justify-between items-center mt-2">
      <span className="text-[10px] text-gray-400 flex items-center gap-1">
        <Clock size={10} /> Last touch: {deal.lastTouch}
      </span>
      <button className="text-[10px] font-black uppercase tracking-widest text-black flex items-center gap-1 group-hover:gap-2 transition-all">
        Deep Audit <ArrowRight size={12} />
      </button>
    </div>
  </div>
);

export const PipelineHealth: React.FC = () => {
  const categories = [
    { title: "Likely to Close", icon: TrendingUp, color: "text-purple-600", deals: MOCK_DEALS.filter(d => d.health === 'high') },
    { title: "At Risk", icon: AlertCircle, color: "text-red-500", deals: MOCK_DEALS.filter(d => d.health === 'at-risk') },
    { title: "Developing", icon: Clock, color: "text-gray-400", deals: MOCK_DEALS.filter(d => d.health === 'medium') }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      <div className="flex justify-between items-end">
        <div>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-purple-600 mb-2 block">Revenue Velocity</span>
          <h2 className="font-serif text-5xl text-black">Pipeline Health.</h2>
        </div>
        <div className="flex gap-4">
           <div className="text-right">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Pipeline</span>
              <div className="text-2xl font-serif">$1.2M</div>
           </div>
           <div className="w-px bg-gray-100 h-10"></div>
           <div className="text-right">
              <span className="text-[10px] font-black uppercase tracking-widest text-purple-600">Weighted Forecast</span>
              <div className="text-2xl font-serif text-purple-600">$840k</div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
        {categories.map((cat, i) => (
          <div key={i} className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <cat.icon className={cat.color} size={18} />
                <h3 className="text-xs font-black uppercase tracking-widest text-black">{cat.title}</h3>
              </div>
              <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
                {cat.deals.length}
              </span>
            </div>
            
            <div className="space-y-6">
              {cat.deals.length > 0 ? (
                cat.deals.map(deal => <DealCard key={deal.id} deal={deal} />)
              ) : (
                <div className="p-12 text-center border-2 border-dashed border-gray-50 rounded-3xl">
                   <p className="text-xs text-gray-300 font-medium">No deals in this cluster</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};