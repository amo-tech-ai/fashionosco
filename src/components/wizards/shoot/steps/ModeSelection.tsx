import React from 'react';
import { useShootWizard } from '../../../../contexts/ShootWizardContext';
import { Sparkles, ArrowRight } from 'lucide-react';

export const ModeSelection: React.FC = () => {
  const { dispatch } = useShootWizard();

  return (
    <div className="max-w-4xl mx-auto px-6 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="mb-12">
        <h1 className="text-5xl md:text-7xl mb-6 text-black">Plan your campaign.</h1>
        <p className="text-xl text-gray-500 font-light max-w-xl mx-auto">
          Choose between an AI-powered strategic workflow or a traditional manual production setup.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* AI Path */}
        <button 
          onClick={() => dispatch({ type: 'SET_MODE', mode: 'ai' })}
          className="luxury-card p-10 text-left flex flex-col group relative overflow-hidden ring-2 ring-purple-100"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
          
          <div className="relative z-10 flex-1">
            <div className="flex items-center justify-between mb-8">
              <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center shadow-2xl">
                <Sparkles size={24} className="text-purple-300" />
              </div>
              <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-[10px] font-black uppercase tracking-widest">Recommended</span>
            </div>
            
            <h3 className="text-3xl mb-4 text-black">AI Creative Partner</h3>
            <p className="text-gray-500 leading-relaxed font-light mb-12">
              We analyze your brand DNA, website, and social signals to generate a high-conversion production brief automatically.
            </p>
          </div>

          <div className="relative z-10 flex items-center justify-between text-xs font-black uppercase tracking-[0.2em] text-black pt-6 border-t border-gray-50">
            <span>Continue with Intelligence</span>
            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </div>
        </button>

        {/* Manual Path */}
        <button 
          onClick={() => dispatch({ type: 'SET_MODE', mode: 'manual' })}
          className="luxury-card p-10 text-left flex flex-col group hover:border-black"
        >
          <div className="flex-1">
            <div className="w-14 h-14 bg-gray-100 text-gray-400 rounded-2xl flex items-center justify-center mb-8">
              <ArrowRight size={24} />
            </div>
            <h3 className="text-3xl mb-4 text-black">Manual Setup</h3>
            <p className="text-gray-500 leading-relaxed font-light mb-12">
              Define your own constraints, select talent, and build your shot list from scratch without AI assistance.
            </p>
          </div>

          <div className="flex items-center justify-between text-xs font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-black pt-6 border-t border-gray-50 transition-colors">
            <span>Legacy Workflow</span>
            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </div>
        </button>
      </div>
    </div>
  );
};