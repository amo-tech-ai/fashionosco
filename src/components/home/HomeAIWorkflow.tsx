
import React from 'react';
import { Upload, ArrowRight, Wand2, Layers, Download } from 'lucide-react';

export const HomeAIWorkflow: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-slate-900 text-white">
       <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-16">
             <h2 className="font-serif text-3xl md:text-4xl mb-6">AI Processing Pipeline</h2>
             <p className="text-slate-400">Automated enhancement at enterprise scale.</p>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8">
             {/* Step 1 */}
             <div className="w-full md:w-64 bg-slate-800/50 p-6 rounded-xl border border-slate-700 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center mb-4">
                   <Upload size={20} className="text-blue-400" />
                </div>
                <h4 className="font-bold text-sm">Upload RAW</h4>
             </div>

             <ArrowRight className="hidden md:block text-slate-600 rotate-90 md:rotate-0" />
             <div className="md:hidden h-8 w-px bg-slate-700"></div>

             {/* Step 2 */}
             <div className="w-full md:w-64 bg-slate-800/50 p-6 rounded-xl border border-slate-700 flex flex-col items-center text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-purple-500/10 animate-pulse"></div>
                <div className="w-12 h-12 bg-purple-900/50 rounded-full flex items-center justify-center mb-4 relative z-10">
                   <Wand2 size={20} className="text-purple-400" />
                </div>
                <h4 className="font-bold text-sm relative z-10">AI Enhance</h4>
             </div>

             <ArrowRight className="hidden md:block text-slate-600 rotate-90 md:rotate-0" />
             <div className="md:hidden h-8 w-px bg-slate-700"></div>

             {/* Step 3 */}
             <div className="w-full md:w-64 bg-slate-800/50 p-6 rounded-xl border border-slate-700 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center mb-4">
                   <Layers size={20} className="text-pink-400" />
                </div>
                <h4 className="font-bold text-sm">Apply Style</h4>
             </div>

             <ArrowRight className="hidden md:block text-slate-600 rotate-90 md:rotate-0" />
             <div className="md:hidden h-8 w-px bg-slate-700"></div>

             {/* Step 4 */}
             <div className="w-full md:w-64 bg-slate-800/50 p-6 rounded-xl border border-slate-700 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center mb-4">
                   <Download size={20} className="text-green-400" />
                </div>
                <h4 className="font-bold text-sm">Export HD</h4>
             </div>
          </div>
       </div>
    </section>
  );
};
