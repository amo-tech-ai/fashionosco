import React, { useState, useEffect } from 'react';
import { Layers, CheckCircle2, AlertTriangle, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { generateProductionWorkflow, ProductionTask } from '../../../services/ai/tasks';
import { useActiveCampaign } from '../../../contexts/ActiveCampaignContext';

export const ProductionTaskBoard: React.FC = () => {
  const { activeCampaign } = useActiveCampaign();
  const [tasks, setTasks] = useState<ProductionTask[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!activeCampaign) return;
    setLoading(true);
    try {
      const data = await generateProductionWorkflow(activeCampaign.title + " " + activeCampaign.data?.vibe);
      setTasks(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeCampaign && tasks.length === 0) {
      handleGenerate();
    }
  }, [activeCampaign?.id]);

  const phases = ['Concept', 'Sourcing', 'Production', 'Logistics'];

  if (loading) return (
    <div className="p-20 text-center space-y-6">
      <Loader2 className="w-10 h-10 animate-spin text-black mx-auto" />
      <p className="font-serif text-xl">Decomposing Brief into Critical Workflow...</p>
    </div>
  );

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center px-2">
         <div>
            <h3 className="font-serif text-3xl">Task Orchestration</h3>
            <p className="text-gray-500 text-sm mt-1">AI-identified load-bearing tasks and cross-phase dependencies.</p>
         </div>
         <button onClick={handleGenerate} className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all">
            <Sparkles size={14} /> Regenerate Workflow
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {phases.map(phase => (
            <div key={phase} className="space-y-6">
               <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{phase} Phase</h4>
               </div>
               <div className="space-y-4">
                  {tasks.filter(t => t.phase === phase).map(task => (
                    <div key={task.id} className={`p-6 rounded-3xl border transition-all hover:shadow-xl group relative ${task.is_load_bearing ? 'bg-white border-purple-200' : 'bg-white border-gray-100'}`}>
                       {task.is_load_bearing && (
                         <div className="absolute -top-2 -left-2 bg-purple-600 text-white p-1 rounded-lg shadow-lg">
                            <Layers size={12} />
                         </div>
                       )}
                       <div className="flex justify-between items-start mb-4">
                          <h5 className="font-bold text-sm text-gray-900 leading-snug">{task.title}</h5>
                          <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded ${task.priority === 'high' ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-400'}`}>
                             {task.priority}
                          </span>
                       </div>
                       <p className="text-[11px] text-gray-500 leading-relaxed mb-6">{task.description}</p>
                       
                       <div className="space-y-2">
                          {task.sub_checklist.map((sub, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-[10px] text-gray-400 font-medium">
                               <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                               {sub}
                            </div>
                          ))}
                       </div>

                       <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-[9px] font-bold text-gray-300">Deps: {task.dependencies.length}</span>
                          <button className="text-[9px] font-black uppercase text-black flex items-center gap-1">Manage <ArrowRight size={10}/></button>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         ))}
      </div>
    </div>
  );
};