import React from 'react';
import { Button } from '../components/Button';
import { ButtonVariant } from '../types';
import { BarChart2, Users, ShoppingBag, ArrowUpRight, Clock, Plus, Settings } from 'lucide-react';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-8">
        <div>
           <h1 className="text-3xl font-serif text-[#111111]">Studio Overview</h1>
           <p className="text-sm text-gray-400 mt-2 uppercase tracking-widest font-bold">Welcome back, Creative Director</p>
        </div>
        <div className="flex space-x-4 mt-6 md:mt-0">
          <Button variant={ButtonVariant.SECONDARY} className="text-xs">Export Report</Button>
          <Button className="text-xs bg-black text-white border-black hover:bg-gray-800">
            <Plus className="w-4 h-4 mr-2" /> New Campaign
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Active Projects', value: '12', sub: '+2 this week', icon: ShoppingBag },
          { label: 'Pending Approvals', value: '4', sub: 'Urgent attention', icon: Clock },
          { label: 'Total Revenue', value: '$124.5k', sub: '+18% vs last month', icon: BarChart2 }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group">
            <div className="flex justify-between items-start mb-6">
               <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-black group-hover:text-white transition-colors">
                  <item.icon size={18} />
               </div>
               <span className="text-xs text-green-500 font-bold flex items-center bg-green-50 px-2 py-1 rounded-full">
                  <ArrowUpRight size={12} className="mr-1" /> Trending
               </span>
            </div>
            <dt className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">{item.label}</dt>
            <dd className="text-4xl font-serif text-[#111111] mb-2">{item.value}</dd>
            <p className="text-xs text-gray-400">{item.sub}</p>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white border border-gray-100 p-8 shadow-sm">
           <div className="flex justify-between items-center mb-8">
              <h3 className="font-serif text-xl">Recent Campaigns</h3>
              <a href="#" className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-500 transition-colors">View All</a>
           </div>
           
           <div className="space-y-6">
              {[
                 { name: "Summer Solstice '25", client: "Zara", status: "In Production", date: "Due Oct 24", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2820&auto=format&fit=crop" },
                 { name: "Urban Winter", client: "North Face", status: "Review", date: "Due Oct 28", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2940&auto=format&fit=crop" },
                 { name: "Accessories Edit", client: "Selfridges", status: "Completed", date: "Delivered", img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=2864&auto=format&fit=crop" }
              ].map((project, i) => (
                 <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 p-4 -mx-4 rounded-lg transition-colors">
                    <div className="flex items-center space-x-4">
                       <div className="w-12 h-12 rounded-sm overflow-hidden">
                          <img src={project.img} className="w-full h-full object-cover" />
                       </div>
                       <div>
                          <h4 className="font-bold text-sm text-[#111111]">{project.name}</h4>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">{project.client}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <span className={`text-xs font-bold px-3 py-1 rounded-full ${project.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {project.status}
                       </span>
                       <p className="text-[10px] text-gray-400 mt-1">{project.date}</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* Quick Actions / Notifications */}
        <div className="bg-[#111111] text-white p-8 shadow-xl">
           <h3 className="font-serif text-xl mb-6">Studio Updates</h3>
           <div className="space-y-6 relative">
              <div className="absolute left-1 top-2 bottom-2 w-px bg-gray-800"></div>
              {[
                 { title: "New Equipment Arrived", time: "2h ago", type: "System" },
                 { title: "Client Feedback: Zara", time: "4h ago", type: "Alert" },
                 { title: "Server Maintenance", time: "1d ago", type: "Info" }
              ].map((notif, i) => (
                 <div key={i} className="pl-6 relative">
                    <div className="absolute left-[-2px] top-1.5 w-1.5 h-1.5 rounded-full bg-white border border-black"></div>
                    <h4 className="text-sm font-medium">{notif.title}</h4>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">{notif.time}</p>
                 </div>
              ))}
           </div>
           
           <div className="mt-12 pt-8 border-t border-gray-800">
              <h3 className="font-serif text-xl mb-4">Quick Tools</h3>
              <div className="grid grid-cols-2 gap-4">
                 <button className="bg-gray-800 hover:bg-gray-700 p-4 rounded-sm text-xs font-bold uppercase tracking-widest transition-colors text-center">
                    Upload Assets
                 </button>
                 <button className="bg-gray-800 hover:bg-gray-700 p-4 rounded-sm text-xs font-bold uppercase tracking-widest transition-colors text-center">
                    Team Schedule
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};