import React, { useMemo } from 'react';
import { Stakeholder } from '../../../services/data/stakeholders';
import { Share2, Zap, Star, User } from 'lucide-react';

interface InfluenceGraphProps {
  talent: Stakeholder[];
}

export const InfluenceGraph: React.FC<InfluenceGraphProps> = ({ talent }) => {
  // Logic: Cluster talent by affinity and influence scores
  const clusters = useMemo(() => {
    const sorted = [...talent].sort((a, b) => b.rating - a.rating);
    return {
      powerNodes: sorted.slice(0, 3), // High-tier influence
      risingStars: sorted.slice(3, 8),
      collaborators: sorted.slice(8)
    };
  }, [talent]);

  return (
    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm overflow-hidden relative group">
      <div className="flex justify-between items-start mb-12">
        <div>
          <h3 className="font-serif text-3xl text-black">Influence Mapping</h3>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-purple-600 mt-1 flex items-center gap-2">
            <Zap size={12} fill="currentColor" /> Autonomous Affinity Graphing
          </p>
        </div>
        <button className="p-4 bg-gray-50 rounded-2xl hover:bg-black hover:text-white transition-all">
          <Share2 size={20} />
        </button>
      </div>

      <div className="relative h-[500px] flex items-center justify-center">
        {/* Central Brand Node */}
        <div className="w-32 h-32 bg-black rounded-full flex flex-col items-center justify-center text-white shadow-2xl relative z-10 border-4 border-white">
          <span className="font-serif text-xl font-bold italic">Brand</span>
          <span className="text-[8px] font-black uppercase tracking-widest text-gray-400 mt-1">Primary Node</span>
        </div>

        {/* Orbiting Nodes: Power Tier */}
        {clusters.powerNodes.map((node, i) => {
          const angle = (i * (360 / 3)) * (Math.PI / 180);
          const x = Math.cos(angle) * 160;
          const y = Math.sin(angle) * 160;

          return (
            <div 
              key={node.id}
              className="absolute animate-in fade-in zoom-in duration-700"
              style={{ transform: `translate(${x}px, ${y}px)` }}
            >
              <div className="flex flex-col items-center gap-2 group/node cursor-pointer">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-200 shadow-xl group-hover/node:ring-4 group-hover/node:ring-purple-100 transition-all">
                  <img src={node.img} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="bg-white px-3 py-1.5 rounded-full border border-gray-100 shadow-sm text-center">
                  <p className="text-[10px] font-bold text-gray-900 whitespace-nowrap">{node.name}</p>
                  <p className="text-[8px] text-purple-600 font-black uppercase">{node.role}</p>
                </div>
              </div>
              {/* Connector Line */}
              <div className="absolute top-1/2 left-1/2 w-[160px] h-px bg-gradient-to-r from-purple-200 to-transparent -z-10 origin-left" 
                   style={{ transform: `rotate(${angle + Math.PI}rad)` }}></div>
            </div>
          );
        })}

        {/* Outer Orbit: Rising Stars (Simplified Dots) */}
        {clusters.risingStars.map((node, i) => {
          const angle = (i * (360 / 5) + 30) * (Math.PI / 180);
          const x = Math.cos(angle) * 240;
          const y = Math.sin(angle) * 240;

          return (
            <div 
              key={node.id}
              className="absolute w-4 h-4 bg-gray-100 rounded-full border border-gray-200 hover:bg-black transition-all cursor-help peer"
              style={{ transform: `translate(${x}px, ${y}px)` }}
            >
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black text-white text-[8px] font-bold uppercase px-2 py-1 rounded opacity-0 peer-hover:opacity-100 transition-opacity whitespace-nowrap">
                {node.name} • {node.role}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-gray-50">
        <div className="space-y-1">
          <div className="text-[10px] font-black uppercase text-gray-400">Power Clusters</div>
          <p className="text-sm font-medium text-gray-900">3 Verified High-Affinities</p>
        </div>
        <div className="space-y-1">
          <div className="text-[10px] font-black uppercase text-gray-400">Pathfinder Logic</div>
          <p className="text-sm font-medium text-purple-600">Introduction Suggested via Node A</p>
        </div>
        <div className="space-y-1">
          <div className="text-[10px] font-black uppercase text-gray-400">Network Sentiment</div>
          <p className="text-sm font-medium text-green-600">Stable Growth // +12% MoM</p>
        </div>
      </div>
    </div>
  );
};