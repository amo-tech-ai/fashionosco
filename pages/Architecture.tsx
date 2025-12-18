
import React from 'react';
import { 
  Home, 
  Layers, 
  Zap, 
  FileText, 
  CreditCard, 
  LayoutDashboard, 
  ArrowRight, 
  Sparkles, 
  Camera, 
  Calendar, 
  Globe,
  Database,
  Search,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const NodeCard = ({ icon: Icon, route, title, purpose, primaryCta, secondaryCta }: any) => (
  <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-[#F7F7F5] rounded-full -mr-16 -mt-16 group-hover:bg-purple-50 transition-colors duration-500"></div>
    
    <div className="relative z-10 flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
        <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <Icon size={22} strokeWidth={1.5} />
        </div>
        <span className="font-mono text-[10px] text-gray-400 font-bold uppercase tracking-widest bg-gray-50 px-2 py-1 rounded border border-gray-100">{route}</span>
      </div>
      
      <h3 className="font-serif text-2xl mb-2 text-[#1A1A1A]">{title}</h3>
      <p className="text-sm text-gray-500 font-light leading-relaxed mb-10 flex-1">{purpose}</p>
      
      <div className="space-y-3 pt-6 border-t border-gray-50">
        <button className="w-full flex items-center justify-between text-[11px] font-black uppercase tracking-[0.2em] text-black group/btn">
          {primaryCta} <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
        <button className="w-full text-left text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors">
          {secondaryCta}
        </button>
      </div>
    </div>
  </div>
);

const WorkflowNode = ({ title, active }: { title: string, active?: boolean }) => (
  <div className={`
    px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all duration-500
    ${active 
      ? 'bg-black text-white border-black shadow-lg shadow-black/10 scale-105' 
      : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300'
    }
    flex items-center gap-2
  `}>
    {active && <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>}
    {title}
  </div>
);

const AIIndicator = ({ text }: { text: string }) => (
  <div className="flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-600 rounded-full border border-purple-100 text-[9px] font-black uppercase tracking-widest animate-pulse">
    <Sparkles size={10} fill="currentColor" /> {text}
  </div>
);

export const Architecture: React.FC = () => {
  return (
    <div className="bg-[#FCFBFA] min-h-screen pt-24 pb-32 selection:bg-black selection:text-white">
      
      {/* 1. Page Header */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 text-center mb-24">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-white border border-gray-100 rounded-full shadow-sm">
           <Layers size={14} className="text-gray-400" />
           <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Blueprint v2.2</span>
        </div>
        <h1 className="font-serif text-5xl md:text-7xl mb-6 text-[#1A1A1A]">System Architecture <br/>& Flow Routing.</h1>
        <p className="text-xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
          Visual map of how creative intent becomes executed fashion production. Designed for high-fidelity conversion and zero-dead-ends navigation.
        </p>
      </section>

      {/* 2. Core Route Cards (Nodes) */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NodeCard 
            icon={Home} route="/" title="Home" 
            purpose="Editorial entry point focused on brand storytelling and top-of-funnel trust building."
            primaryCta="Start AI Brief" secondaryCta="Explore Services"
          />
          <NodeCard 
            icon={Layers} route="/services" title="Services" 
            purpose="Capability discovery through bento-grid grids and detailed vertical specific landers."
            primaryCta="Start AI Brief" secondaryCta="View Case Studies"
          />
          <NodeCard 
            icon={Zap} route="/wizard" title="AI Brief Wizard" 
            purpose="Structured intake utilizing Gemini 3 Pro for creative qualification and scope definition."
            primaryCta="Generate Proposal" secondaryCta="Save Draft"
          />
          <NodeCard 
            icon={FileText} route="/proposal" title="Proposal Preview" 
            purpose="Dynamic output showing pricing, scope, and AI-predicted timelines for client approval."
            primaryCta="Secure Slot" secondaryCta="Download PDF"
          />
          <NodeCard 
            icon={CreditCard} route="/booking" title="Booking & Payment" 
            purpose="Conversion milestone. 50% deposit processing via Stripe and calendar commitment."
            primaryCta="Pay & Confirm" secondaryCta="Reschedule"
          />
          <NodeCard 
            icon={LayoutDashboard} route="/dashboard" title="Dashboard" 
            purpose="Recursive operational loop. Multi-player project management and asset delivery."
            primaryCta="View Active Project" secondaryCta="Message Team"
          />
        </div>
      </section>

      {/* 3. Conversion Flow (Visual Strip) */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 mb-40">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl mb-2">Primary Conversion Flow</h2>
          <p className="text-gray-400 uppercase tracking-widest text-[10px] font-bold">The journey from guest to active partner</p>
        </div>
        
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-[40px] left-[10%] right-[10%] h-0.5 bg-gray-100 hidden lg:block -z-10"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4 relative">
             {[
               { label: 'Home / Services', sub: 'Interest', icon: Search, color: 'bg-blue-500' },
               { label: 'AI Wizard', sub: 'Qualification', icon: Sparkles, color: 'bg-purple-500' },
               { label: 'Proposal', sub: 'Value', icon: FileText, color: 'bg-orange-500' },
               { label: 'Booking', sub: 'Conversion', icon: CreditCard, color: 'bg-green-500' },
               { label: 'Dashboard', sub: 'Execution', icon: LayoutDashboard, color: 'bg-black' }
             ].map((step, i) => (
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

      {/* 4. Workflow Expansions (Visual Nodes) */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 mb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Vertical 1: Shoot */}
          <div className="space-y-10">
             <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
                <Camera className="text-gray-400" size={24} />
                <h3 className="font-serif text-3xl">Shoot Workflow</h3>
             </div>
             
             <div className="relative pl-8 space-y-6">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-100"></div>
                
                <div className="flex items-center gap-6">
                   <WorkflowNode title="AI Brief" />
                   <AIIndicator text="Moodboard Analysis" />
                </div>
                <div className="flex items-center gap-6">
                   <WorkflowNode title="Shoot Wizard" active />
                   <AIIndicator text="Shot List Generation" />
                </div>
                <div className="flex items-center gap-6">
                   <WorkflowNode title="Production" />
                   <span className="text-[9px] text-gray-400 uppercase font-bold tracking-widest">Call Sheet PDF</span>
                </div>
                <div className="flex items-center gap-6">
                   <WorkflowNode title="Gallery Review" />
                   <AIIndicator text="Asset Optimization" />
                </div>
                <div className="flex items-center gap-6">
                   <WorkflowNode title="Delivery" />
                   <span className="text-[9px] text-gray-400 uppercase font-bold tracking-widest">Final Archive</span>
                </div>
             </div>
          </div>

          {/* Vertical 2: Event */}
          <div className="space-y-10">
             <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
                <Calendar className="text-gray-400" size={24} />
                <h3 className="font-serif text-3xl">Event Workflow</h3>
             </div>
             
             <div className="relative pl-8 space-y-6">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-100"></div>
                
                <div className="flex items-center gap-6">
                   <WorkflowNode title="Event Wizard" />
                   <AIIndicator text="Venue Matching" />
                </div>
                <div className="flex items-center gap-6">
                   <WorkflowNode title="Guest Management" active />
                   <span className="text-[9px] text-gray-400 uppercase font-bold tracking-widest">RSVP Sync</span>
                </div>
                <div className="flex items-center gap-6">
                   <WorkflowNode title="Sponsor Deck" />
                   <AIIndicator text="Sponsor Matching" />
                </div>
                <div className="flex items-center gap-6">
                   <WorkflowNode title="Command Center" />
                   <AIIndicator text="Risk Sentinel" />
                </div>
                <div className="flex items-center gap-6">
                   <WorkflowNode title="Live Ops" />
                   <span className="text-[9px] text-gray-400 uppercase font-bold tracking-widest">Showtime Timeline</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 5. User Journey Overlay */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="bg-[#111111] text-white rounded-[40px] p-12 md:p-20 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] -mr-300 -mt-300"></div>
           
           <div className="max-w-2xl mb-20">
              <h2 className="font-serif text-4xl md:text-6xl mb-6">User Journeys.</h2>
              <p className="text-gray-400 font-light text-lg">Mapped paths through the OS based on user persona and lifecycle state.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-6">
                 <div className="text-xs font-black uppercase tracking-[0.3em] text-blue-400">Path 01</div>
                 <h4 className="font-serif text-2xl">First-Time Brand</h4>
                 <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                       <CheckCircle2 size={16} className="text-blue-400" /> Marketing Discovery
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                       <CheckCircle2 size={16} className="text-blue-400" /> AI Brief Generation
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                       <CheckCircle2 size={16} className="text-blue-400" /> Proposal & Pricing
                    </div>
                    <div className="flex items-center gap-3 text-sm text-white font-bold">
                       <ArrowRight size={16} /> Secure Booking
                    </div>
                 </div>
              </div>

              <div className="space-y-6">
                 <div className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">Path 02</div>
                 <h4 className="font-serif text-2xl">Returning Client</h4>
                 <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                       <CheckCircle2 size={16} className="text-purple-400" /> Dashboard Overview
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                       <CheckCircle2 size={16} className="text-purple-400" /> AI Omni-Assistant
                    </div>
                    <div className="flex items-center gap-3 text-sm text-white font-bold">
                       <ArrowRight size={16} /> New Project Spawn
                    </div>
                 </div>
              </div>

              <div className="space-y-6">
                 <div className="text-xs font-black uppercase tracking-[0.3em] text-red-400">Path 03</div>
                 <h4 className="font-serif text-2xl">Producer / Pro</h4>
                 <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                       <CheckCircle2 size={16} className="text-red-400" /> Command Center
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                       <CheckCircle2 size={16} className="text-red-400" /> Live Adjustments
                    </div>
                    <div className="flex items-center gap-3 text-sm text-white font-bold">
                       <ArrowRight size={16} /> Asset Delivery
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 6. Footer Call to Build */}
      <section className="mt-32 text-center py-20 bg-white border-t border-gray-100">
         <h3 className="font-serif text-2xl mb-8">Architecture verified for Production Readiness.</h3>
         <div className="flex justify-center gap-8 text-gray-400">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"><Database size={14}/> SQL Core</div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"><Sparkles size={14}/> Gemini AI</div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"><Globe size={14}/> Edge Ready</div>
         </div>
      </section>

    </div>
  );
};
