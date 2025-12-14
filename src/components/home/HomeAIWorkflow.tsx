
import React from 'react';
import { Upload, Wand2, Layers, Download } from 'lucide-react';

export const HomeAIWorkflow: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-slate-900 text-white relative overflow-hidden">
       {/* Background Grid */}
       <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

       <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="text-center mb-20">
             <span className="text-xs font-bold tracking-widest text-purple-400 uppercase mb-2 block">The Engine</span>
             <h2 className="font-serif text-3xl md:text-5xl mb-6">AI Processing Pipeline</h2>
             <p className="text-slate-400 max-w-lg mx-auto">Automated enhancement at enterprise scale. From raw capture to campaign-ready asset in seconds.</p>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
             
             {/* Step 1 */}
             <div className="group relative w-full md:w-64">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-20 group-hover:opacity-100 transition duration-500 blur"></div>
                <div className="relative bg-slate-900 p-8 rounded-xl border border-slate-800 flex flex-col items-center text-center h-full hover:bg-slate-800/50 transition-colors">
                   <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-blue-900/20">
                      <Upload size={28} className="text-blue-400 group-hover:-translate-y-1 transition-transform duration-300" />
                   </div>
                   <h4 className="font-bold text-lg mb-2">Upload RAW</h4>
                   <p className="text-xs text-slate-500">Secure ingestion of high-res assets.</p>
                </div>
             </div>

             {/* Connector 1 */}
             <div className="hidden md:flex flex-col items-center justify-center w-16 text-slate-700 relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-800"></div>
                <div className="w-2 h-2 bg-slate-600 rounded-full z-10 animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
             </div>
             <div className="md:hidden h-12 w-0.5 bg-gradient-to-b from-slate-800 to-purple-900/50"></div>

             {/* Step 2 */}
             <div className="group relative w-full md:w-64">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-40 group-hover:opacity-100 transition duration-500 blur animate-pulse"></div>
                <div className="relative bg-slate-900 p-8 rounded-xl border border-slate-800 flex flex-col items-center text-center h-full hover:bg-slate-800/50 transition-colors">
                   <div className="w-16 h-16 bg-purple-900/30 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-purple-900/40">
                      <Wand2 size={28} className="text-purple-400 group-hover:rotate-12 transition-transform duration-300" />
                   </div>
                   <h4 className="font-bold text-lg mb-2 text-white">AI Enhance</h4>
                   <p className="text-xs text-slate-500">Upscaling & defect removal.</p>
                </div>
             </div>

             {/* Connector 2 */}
             <div className="hidden md:flex flex-col items-center justify-center w-16 text-slate-700 relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-800"></div>
                 <div className="w-2 h-2 bg-slate-600 rounded-full z-10 animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite] delay-300"></div>
             </div>
             <div className="md:hidden h-12 w-0.5 bg-gradient-to-b from-purple-900/50 to-pink-900/50"></div>

             {/* Step 3 */}
             <div className="group relative w-full md:w-64">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl opacity-20 group-hover:opacity-100 transition duration-500 blur"></div>
                <div className="relative bg-slate-900 p-8 rounded-xl border border-slate-800 flex flex-col items-center text-center h-full hover:bg-slate-800/50 transition-colors">
                   <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-pink-900/20">
                      <Layers size={28} className="text-pink-400 group-hover:rotate-12 transition-transform duration-300" />
                   </div>
                   <h4 className="font-bold text-lg mb-2">Style Transfer</h4>
                   <p className="text-xs text-slate-500">Color grading & mood matching.</p>
                </div>
             </div>

             {/* Connector 3 */}
             <div className="hidden md:flex flex-col items-center justify-center w-16 text-slate-700 relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-800"></div>
                 <div className="w-2 h-2 bg-slate-600 rounded-full z-10 animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite] delay-700"></div>
             </div>
             <div className="md:hidden h-12 w-0.5 bg-gradient-to-b from-pink-900/50 to-green-900/50"></div>

             {/* Step 4 */}
             <div className="group relative w-full md:w-64">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-20 group-hover:opacity-100 transition duration-500 blur"></div>
                <div className="relative bg-slate-900 p-8 rounded-xl border border-slate-800 flex flex-col items-center text-center h-full hover:bg-slate-800/50 transition-colors">
                   <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-green-900/20">
                      <Download size={28} className="text-green-400 group-hover:translate-y-1 transition-transform duration-300" />
                   </div>
                   <h4 className="font-bold text-lg mb-2">Export HD</h4>
                   <p className="text-xs text-slate-500">Multi-format delivery.</p>
                </div>
             </div>
          </div>
       </div>
    </section>
  );
};
