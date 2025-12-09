
import React from 'react';
import { 
  ArrowUpRight, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Camera, 
  MoreHorizontal, 
  Sparkles,
  Calendar,
  MessageSquare
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
           <h1 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] leading-tight">Summer 2025 Campaign</h1>
           <div className="flex items-center gap-2 mt-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#166534] text-xs font-medium border border-[#DCFCE7]">Active</span>
              <span className="text-sm text-[#6B7280]">• Last updated 2 hours ago</span>
           </div>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border border-[#E5E5E5] rounded-lg text-sm font-medium text-[#1A1A1A] hover:bg-[#F7F7F5] transition-colors shadow-sm">
            Share View
          </button>
          <button className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors shadow-sm flex items-center">
            <Camera size={16} className="mr-2" />
            New Shot
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Shots', value: '32', sub: '12 Planned', icon: Camera, trend: null },
          { label: 'Completed', value: '18', sub: '56% Progress', icon: CheckCircle, trend: '+4 today' },
          { label: 'Time Remaining', value: '4 Days', sub: 'Due Oct 24', icon: Clock, trend: 'On Schedule' },
          { label: 'Budget', value: '$12.4k', sub: 'of $15k allocated', icon: ArrowUpRight, trend: 'On Track' }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-[#E5E5E5] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
               <div className="w-10 h-10 bg-[#F7F7F5] rounded-xl flex items-center justify-center text-[#1A1A1A]">
                  <item.icon size={20} strokeWidth={1.5} />
               </div>
               {item.trend && (
                 <span className={`text-xs font-medium px-2 py-1 rounded-full ${item.trend.includes('Schedule') || item.trend.includes('Track') ? 'bg-[#F3E8FF] text-[#6B21A8]' : 'bg-[#DCFCE7] text-[#166534]'}`}>
                    {item.trend}
                 </span>
               )}
            </div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] mb-1">{item.label}</dt>
            <dd className="font-serif text-3xl text-[#1A1A1A] mb-1">{item.value}</dd>
            <p className="text-xs text-[#9CA3AF] font-medium">{item.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Activity & Actions */}
        <div className="lg:col-span-2 space-y-8">
           
           {/* Next Best Action Bar */}
           <div className="bg-[#1A1A1A] text-white p-5 rounded-xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white">
                    <Sparkles size={20} />
                 </div>
                 <div>
                    <h3 className="font-medium text-sm">Action Required</h3>
                    <p className="text-white/70 text-xs">Approve 4 retouched images from "Beach Scene"</p>
                 </div>
              </div>
              <button className="px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest rounded hover:bg-gray-100 transition-colors w-full sm:w-auto text-center">
                 Review Now
              </button>
           </div>

           {/* Activity Feed */}
           <div className="bg-white border border-[#E5E5E5] rounded-2xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="font-serif text-xl text-[#1A1A1A]">Campaign Activity</h3>
                 <button className="text-[#6B7280] hover:text-[#1A1A1A] transition-colors">
                    <MoreHorizontal size={20} />
                 </button>
              </div>
              
              <div className="relative border-l border-[#E5E5E5] ml-3 space-y-8">
                 {[
                    { user: "Sarah J.", action: "uploaded 12 new assets", target: "Look 04", time: "2h ago", type: "upload" },
                    { user: "Mike T.", action: "requested review", target: "Hero Video Cut 1", time: "4h ago", type: "review" },
                    { user: "AI Copilot", action: "generated 5 caption variations", target: "Social Teasers", time: "6h ago", type: "ai" },
                    { user: "System", action: "completed batch export", target: "Ecom_Set_A", time: "12h ago", type: "system" }
                 ].map((activity, i) => (
                    <div key={i} className="pl-8 relative group">
                       <div className={`absolute -left-1.5 top-1 w-3 h-3 rounded-full border-2 border-white ${
                          activity.type === 'ai' ? 'bg-[#A855F7]' : 
                          activity.type === 'review' ? 'bg-[#F59E0B]' : 'bg-[#1A1A1A]'
                       } shadow-sm`}></div>
                       <div className="flex justify-between items-start">
                          <div>
                             <p className="text-sm text-[#1A1A1A]">
                                <span className="font-semibold">{activity.user}</span> {activity.action} <span className="font-medium text-[#6B7280]">for {activity.target}</span>
                             </p>
                             {activity.type === 'ai' && (
                                <div className="mt-2 p-3 bg-[#F3E8FF] rounded-lg border border-[#E9D5FF]">
                                   <div className="flex gap-2 items-start">
                                      <Sparkles size={14} className="text-[#6B21A8] mt-0.5" />
                                      <p className="text-xs text-[#6B21A8] leading-relaxed">
                                         "Discover the essence of summer with our new collection..."
                                      </p>
                                   </div>
                                </div>
                             )}
                          </div>
                          <span className="text-xs text-[#9CA3AF] whitespace-nowrap ml-4">{activity.time}</span>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Deliverables Table (Simplified) */}
           <div className="bg-white border border-[#E5E5E5] rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-[#E5E5E5] flex justify-between items-center">
                 <h3 className="font-serif text-xl text-[#1A1A1A]">Deliverables</h3>
                 <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">View All</span>
              </div>
              <div className="divide-y divide-[#E5E5E5]">
                 {[
                    { name: "Campaign_Lookbook.pdf", size: "24 MB", status: "Ready", type: "PDF" },
                    { name: "Social_Reels_V2.mp4", size: "145 MB", status: "In Progress", type: "Video" },
                    { name: "Web_Banners_Q3.zip", size: "45 MB", status: "Review", type: "ZIP" }
                 ].map((file, i) => (
                    <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-[#F7F7F5] transition-colors cursor-pointer group">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-[#F7F7F5] rounded-lg flex items-center justify-center text-[#6B7280] group-hover:bg-white group-hover:shadow-sm transition-all">
                             <CheckCircle size={18} />
                          </div>
                          <div>
                             <p className="text-sm font-medium text-[#1A1A1A]">{file.name}</p>
                             <p className="text-xs text-[#9CA3AF]">{file.type} • {file.size}</p>
                          </div>
                       </div>
                       <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          file.status === 'Ready' ? 'bg-[#DCFCE7] text-[#166534] border-[#DCFCE7]' :
                          file.status === 'Review' ? 'bg-[#FEF3C7] text-[#92400E] border-[#FEF3C7]' :
                          'bg-[#F3F4F6] text-[#6B7280] border-[#E5E7EB]'
                       }`}>
                          {file.status}
                       </span>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Right Column: AI & Team */}
        <div className="space-y-8">
           
           {/* Team Panel */}
           <div className="bg-white border border-[#E5E5E5] rounded-2xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="font-serif text-lg text-[#1A1A1A]">Team Access</h3>
                 <button className="text-xs font-bold uppercase tracking-widest text-[#1A1A1A] hover:text-[#6B7280]">Manage</button>
              </div>
              <div className="flex -space-x-2 overflow-hidden mb-6">
                 {[1,2,3,4].map((i) => (
                    <img 
                       key={i}
                       className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                       src={`https://images.unsplash.com/photo-${i === 1 ? '1534528741775-53994a69daeb' : i === 2 ? '1506794778202-cad84cf45f1d' : i === 3 ? '1507003211169-0a1dd7228f2d' : '1517841905240-472988babdf9'}?q=80&w=100&auto=format&fit=crop`}
                       alt=""
                    />
                 ))}
                 <div className="h-10 w-10 rounded-full bg-[#F7F7F5] border border-white flex items-center justify-center text-xs font-medium text-[#6B7280] ring-2 ring-white">
                    +2
                 </div>
              </div>
              <div className="space-y-3">
                 <div className="flex items-center gap-3 text-sm text-[#6B7280]">
                    <div className="w-2 h-2 rounded-full bg-[#22C55E]"></div>
                    3 Members Online
                 </div>
                 <div className="flex items-center gap-3 text-sm text-[#6B7280]">
                    <Calendar size={14} />
                    Shoot Day: Oct 28
                 </div>
              </div>
           </div>

           {/* AI Insight Card */}
           <div className="bg-gradient-to-br from-[#F3E8FF] to-white border border-[#E9D5FF] rounded-2xl shadow-sm p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E9D5FF] rounded-full blur-3xl opacity-50 -mr-10 -mt-10 pointer-events-none"></div>
              
              <div className="flex items-center gap-2 mb-4 relative z-10">
                 <Sparkles size={18} className="text-[#A855F7]" />
                 <span className="text-xs font-bold uppercase tracking-widest text-[#6B21A8]">AI Insight</span>
              </div>
              
              <h4 className="font-serif text-lg text-[#1A1A1A] mb-2 relative z-10">Production Alert</h4>
              <p className="text-sm text-[#4A4F5B] mb-4 leading-relaxed relative z-10">
                 Rain is predicted for your outdoor shoot location next Tuesday. Would you like to check studio availability as a backup?
              </p>
              
              <div className="flex gap-2 relative z-10">
                 <button className="flex-1 bg-white border border-[#E9D5FF] text-[#6B21A8] py-2 rounded-lg text-xs font-bold hover:bg-[#F3E8FF] transition-colors">Check Studio</button>
                 <button className="flex-1 bg-transparent text-[#6B7280] py-2 text-xs font-medium hover:text-[#1A1A1A]">Dismiss</button>
              </div>
           </div>

           {/* Storage */}
           <div className="bg-white border border-[#E5E5E5] rounded-2xl shadow-sm p-6">
               <h3 className="font-serif text-lg text-[#1A1A1A] mb-4">Storage Usage</h3>
               <div className="w-full bg-[#F7F7F5] rounded-full h-2 mb-4">
                  <div className="bg-[#1A1A1A] h-2 rounded-full" style={{ width: '75%' }}></div>
               </div>
               <div className="flex justify-between text-xs text-[#6B7280] font-medium">
                  <span>750GB Used</span>
                  <span>1TB Total</span>
               </div>
           </div>
        </div>
      </div>
    </div>
  );
};
