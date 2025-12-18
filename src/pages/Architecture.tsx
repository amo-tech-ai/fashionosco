
import React from 'react';
import { 
  Home, Layers, Zap, FileText, LayoutDashboard, Search, Sparkles, 
  Camera, Globe, Database, ChevronRight, Video, ShoppingBag, Building2, Play
} from 'lucide-react';
import { NodeCard } from '../components/architecture/NodeCard';
import { WorkflowNode } from '../components/architecture/WorkflowNode';
import { AIIndicator } from '../components/architecture/AIIndicator';

export const Architecture: React.FC = () => {
  const pipelineSteps = [
    { label: 'Discovery', sub: 'Signal Capture', icon: Search, color: 'bg-blue-500' },
    { label: 'Intelligence', sub: 'Aesthetic Audit', icon: Sparkles, color: 'bg-purple-500' },
    { label: 'Planning', sub: 'Shot List / ROS', icon: FileText, color: 'bg-orange-500' },
    { label: 'Execution', sub: 'Live Production', icon: Play, color: 'bg-red-600' },
    { label: 'Fulfillment', sub: 'Wholesale / Assets', icon: ShoppingBag, color: 'bg-black' }
  ];

  return (
    <div className="bg-[#FCFBFA] min-h-screen pt-24 pb-32 selection:bg-black selection:text-white">
      
      {/* 1. Page Header */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 text-center mb-24">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-white border border-gray-100 rounded-full shadow-sm">
           <Layers size={14} className="text-gray-400" />
           <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Blueprint v2.2 // Hardened Production</span>
        </div>
        <h1 className="font-serif text-5xl md:text-7xl mb-6 text-[#1A1A1A]">FashionOS <br/>Ecosystem Map.</h1>
        <p className="text-xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
          The unified operational loop. Data from the AI Brand Audit flows through the Production Desk directly into B2B Fulfillment.
        </p>
      </section>

      {/* 2. Core Route Cards */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NodeCard 
            icon={Home} route="/" title="Home" 
            purpose="Editorial entry point for brand storytelling and top-of-funnel conversion."
            primaryCta="Start AI Brief" secondaryCta="Explore Services"
          />
          <NodeCard 
            icon={ShoppingBag} route="/wholesale" title="B2B Showroom" 
            purpose="Automated retailer vetting and wholesale ordering ledger. Integrated with AI Merchandiser."
            primaryCta="Manage Orders" secondaryCta="Vet Buyers" status="Enterprise"
          />
          <NodeCard 
            icon={Zap} route="/wizard" title="Creative Wizards" 
            purpose="Multi-modal intake for Shoots, Events, and Brands using Gemini 3 Pro reasoning."
            primaryCta="Initialize Plan" secondaryCta="Save Draft"
          />
          <NodeCard 
            icon={Video} route="/video" title="AI Video Engine" 
            purpose="Cinematic teaser generation powered by Veo 3.1. High-fidelity motion previews for creative directors."
            primaryCta="Generate Motion" secondaryCta="View Reels" status="Veo 3.1"
          />
          <NodeCard 
            icon={Building2} route="/venue" title="Venue Visualizer" 
            purpose="Projecting brand palettes into architectural settings using Imagen 4.0 interior rendering."
            primaryCta="Visualize Space" secondaryCta="Map Seating" status="Imagen 4.0"
          />
          <NodeCard 
            icon={LayoutDashboard} route="/dashboard" title="Dashboard" 
            purpose="Recursive operational loop. Multi-player project management and asset delivery."
            primaryCta="View Pipeline" secondaryCta="Message Team"
          />
        </div>
      </section>

      {/* 3. Conversion Flow */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 mb-40">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl mb-2">Primary Operational Pipeline</h2>
          <p className="text-gray-400 uppercase tracking-widest text-[10px] font-bold">The journey from guest to active partner</p>
        </div>
        
        <div className="relative">
          <div className="absolute top-[40px] left-[10%] right-[10%] h-0.5 bg-gray-100 hidden lg:block -z-10"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4 relative">
             {pipelineSteps.map((step, i) => (
               <div key={i} className="flex flex-col items-center group">
                 <div className={`w-20 h-20 rounded-full ${step.color} text-white flex items-center justify-center shadow-2xl mb-6 relative group-hover:scale-110 transition-transform duration-500`}>
                    <step.icon size={24} />
                    {i < 4 && <ChevronRight className="absolute -right-4 top-1/2 -translate-y-1/2 text-gray-200 hidden lg:block" />}
                 </div>
                 <h4 className="font-serif text-lg text-black mb-1">{step.label}</h4>
                 <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{step.sub}</span>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 4. Workflow Nodes */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 mb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-10">
             <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
                <Camera className="text-gray-400" size={24} />
                <h3 className="font-serif text-3xl">Production Workflow</h3>
             </div>
             <div className="relative pl-8 space-y-6">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-100"></div>
                <div className="flex items-center gap-6"><WorkflowNode title="AI Brief" /><AIIndicator text="Vision Analysis" /></div>
                <div className="flex items-center gap-6"><WorkflowNode title="Live Console" active /><AIIndicator text="Temporal Delta" /></div>
                <div className="flex items-center gap-6"><WorkflowNode title="Inventory" /><span className="text-[9px] text-gray-400 uppercase font-bold tracking-widest">QR Verification</span></div>
                <div className="flex items-center gap-6"><WorkflowNode title="Gallery Review" /><AIIndicator text="Asset Optimization" /></div>
             </div>
          </div>

          <div className="space-y-10">
             <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
                <ShoppingBag className="text-gray-400" size={24} />
                <h3 className="font-serif text-3xl">B2B Commerce Loop</h3>
             </div>
             <div className="relative pl-8 space-y-6">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-100"></div>
                <div className="flex items-center gap-6"><WorkflowNode title="Buyer Vetting" /><AIIndicator text="Risk Scoring" /></div>
                <div className="flex items-center gap-6"><WorkflowNode title="Digital Showroom" active /><AIIndicator text="Assortment Intelligence" /></div>
                <div className="flex items-center gap-6"><WorkflowNode title="Purchase Order" /><span className="text-[9px] text-gray-400 uppercase font-bold tracking-widest">Shopify Sync</span></div>
                <div className="flex items-center gap-6"><WorkflowNode title="Fulfillment" /><AIIndicator text="Net-60 Terms" /></div>
             </div>
          </div>
        </div>
      </section>

      {/* 5. User Journey Overlay */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="bg-[#111111] text-white rounded-[40px] p-12 md:p-20 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] -mr-300 -mt-300"></div>
           <div className="max-w-2xl mb-20">
              <h2 className="font-serif text-4xl md:text-6xl mb-6">Network Intelligence.</h2>
              <p className="text-gray-400 font-light text-lg">Every node in the OS is interconnected. Data from the Brand Audit informs the Shoot Wizard, which populates the Shot List, fueling the Wholesale Showroom.</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-6">
                 <div className="text-xs font-black uppercase tracking-[0.3em] text-blue-400">Layer 01</div>
                 <h4 className="font-serif text-2xl">Perception</h4>
                 <p className="text-sm text-gray-500 font-light leading-relaxed">Gemini Vision extracts aesthetic DNA from moodboards and live sets.</p>
              </div>
              <div className="space-y-6">
                 <div className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">Layer 02</div>
                 <h4 className="font-serif text-2xl">Reasoning</h4>
                 <p className="text-sm text-gray-500 font-light leading-relaxed">Gemini Thinking plans logistics, calculates ROI, and identifies market gaps.</p>
              </div>
              <div className="space-y-6">
                 <div className="text-xs font-black uppercase tracking-[0.3em] text-red-400">Layer 03</div>
                 <h4 className="font-serif text-2xl">Execution</h4>
                 <p className="text-sm text-gray-500 font-light leading-relaxed">Autonomous agents manage the production floor and B2B fulfillment.</p>
              </div>
           </div>
        </div>
      </section>

      <section className="mt-32 text-center py-20 bg-white border-t border-gray-100">
         <h3 className="font-serif text-2xl mb-8">Architecture verified for Production v2.2</h3>
         <div className="flex justify-center gap-8 text-gray-400">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"><Database size={14}/> pgVector DB</div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"><Sparkles size={14}/> Gemini 3 Pro</div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"><Globe size={14}/> Edge Orchestration</div>
         </div>
      </section>
    </div>
  );
};
