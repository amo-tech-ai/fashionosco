
import React, { useState } from 'react';
import { 
  GripVertical, 
  Image as ImageIcon, 
  Video, 
  Sparkles, 
  Plus, 
  MoreHorizontal,
  Search,
  Filter,
  Film
} from 'lucide-react';
import { Button } from '../components/Button';

interface Shot {
  id: string;
  name: string;
  type: 'Photo' | 'Video' | 'GIF' | 'Macro';
  status: 'Draft' | 'Approved' | 'Shot';
  model: string;
  outfit: string;
}

export const ShotList: React.FC = () => {
  const [shots] = useState<Shot[]>([
    { id: '1', name: 'Hero Shot - Beach', type: 'Photo', status: 'Approved', model: 'Sarah J', outfit: 'Look 01' },
    { id: '2', name: 'Detail - Texture', type: 'Macro', status: 'Draft', model: '-', outfit: 'Look 01' },
    { id: '3', name: 'Walking Motion', type: 'Video', status: 'Draft', model: 'Sarah J', outfit: 'Look 02' },
    { id: '4', name: 'Accessories Flatlay', type: 'Photo', status: 'Shot', model: '-', outfit: 'N/A' },
  ]);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-6 animate-in fade-in duration-500">
      
      {/* LEFT SIDEBAR: ASSETS */}
      <div className="w-full md:w-64 flex flex-col bg-white border border-[#E5E5E5] rounded-2xl shadow-sm overflow-hidden flex-shrink-0">
         <div className="p-4 border-b border-[#E5E5E5]">
            <h2 className="font-serif text-lg text-[#1A1A1A] mb-4">Assets</h2>
            <div className="relative">
               <Search size={14} className="absolute left-3 top-2.5 text-[#9CA3AF]" />
               <input 
                 type="text" 
                 placeholder="Search wardrobe..." 
                 className="w-full bg-[#F7F7F5] border border-transparent rounded-lg py-2 pl-9 pr-3 text-xs focus:outline-none focus:border-[#E5E5E5] focus:bg-white transition-all"
               />
            </div>
         </div>
         <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {[1,2,3,4,5].map((i) => (
               <div key={i} className="flex items-center p-2 hover:bg-[#F7F7F5] rounded-lg cursor-grab active:cursor-grabbing group transition-colors">
                  <div className="w-10 h-10 bg-[#F7F7F5] rounded border border-[#E5E5E5] overflow-hidden flex-shrink-0">
                     <img src={`https://images.unsplash.com/photo-${i % 2 === 0 ? '1515886657613-9f3515b0c78f' : '1523381210434-271e8be1f52b'}?q=80&w=100&auto=format&fit=crop`} className="w-full h-full object-cover" alt="Asset" />
                  </div>
                  <div className="ml-3 min-w-0">
                     <p className="text-xs font-medium text-[#1A1A1A] truncate">Summer Dress {i}</p>
                     <p className="text-[10px] text-[#9CA3AF]">SKU-10{i}</p>
                  </div>
                  <GripVertical size={14} className="ml-auto text-[#D1D5DB] opacity-0 group-hover:opacity-100 transition-opacity" />
               </div>
            ))}
         </div>
      </div>

      {/* CENTER: SHOT CANVAS */}
      <div className="flex-1 flex flex-col min-h-0">
         <div className="flex justify-between items-center mb-6">
            <div>
               <h1 className="font-serif text-3xl text-[#1A1A1A]">Shot List</h1>
               <p className="text-sm text-[#6B7280]">Summer 2025 Campaign • 32 Shots</p>
            </div>
            <div className="flex space-x-3">
               <button className="p-2 text-[#6B7280] hover:bg-white rounded-lg transition-colors border border-transparent hover:border-[#E5E5E5]">
                  <Filter size={18} />
               </button>
               <Button className="py-2 px-4 text-xs h-9 bg-[#1A1A1A] text-white">
                  <Plus size={14} className="mr-2" /> Add Shot
               </Button>
            </div>
         </div>

         <div className="flex-1 overflow-y-auto space-y-6 pr-2">
            {/* Group: Scene 1 */}
            <div>
               <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">Scene 01: Beach Exterior</h3>
                  <div className="h-px flex-1 bg-[#E5E5E5] mx-4"></div>
                  <span className="text-xs text-[#9CA3AF]">4 Shots</span>
               </div>
               
               <div className="grid grid-cols-1 gap-4">
                  {shots.map((shot) => (
                     <div key={shot.id} className="bg-white border border-[#E5E5E5] rounded-xl p-4 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 group flex gap-4 items-center">
                        <div className="cursor-grab active:cursor-grabbing text-[#E5E5E5] hover:text-[#9CA3AF] transition-colors p-1">
                           <GripVertical size={18} />
                        </div>
                        
                        {/* Thumbnail */}
                        <div className="w-16 h-16 bg-[#F7F7F5] rounded-lg border border-[#E5E5E5] flex items-center justify-center text-[#9CA3AF] flex-shrink-0">
                           {shot.type === 'Video' ? <Video size={20} /> : <ImageIcon size={20} />}
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                           <div className="md:col-span-2">
                              <div className="flex items-center gap-2 mb-1">
                                 <h4 className="text-sm font-semibold text-[#1A1A1A]">{shot.name}</h4>
                                 <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${
                                    shot.type === 'Video' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                                    'bg-blue-50 text-blue-700 border-blue-100'
                                 }`}>
                                    {shot.type}
                                 </span>
                              </div>
                              <p className="text-xs text-[#6B7280]">Model: {shot.model} • Outfit: {shot.outfit}</p>
                           </div>
                           
                           <div>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                 shot.status === 'Approved' ? 'bg-[#DCFCE7] text-[#166534]' :
                                 shot.status === 'Shot' ? 'bg-[#DBEAFE] text-[#1E40AF]' :
                                 'bg-[#F3F4F6] text-[#6B7280]'
                              }`}>
                                 {shot.status}
                              </span>
                           </div>

                           <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-2 hover:bg-[#F7F7F5] rounded-full text-[#6B7280] transition-colors">
                                 <MoreHorizontal size={16} />
                              </button>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>

      {/* RIGHT SIDEBAR: AI COPILOT */}
      <div className="w-full md:w-72 bg-gradient-to-b from-[#FFFFFF] to-[#F7F7F5] border-l border-[#E5E5E5] p-6 hidden lg:flex flex-col rounded-l-2xl -mr-6 shadow-sm">
         <div className="flex items-center gap-2 mb-6 text-[#6B21A8]">
            <Sparkles size={18} />
            <h3 className="font-serif text-lg font-medium text-[#1A1A1A]">AI Copilot</h3>
         </div>

         <div className="space-y-4">
            <div className="bg-[#F3E8FF] border border-[#E9D5FF] rounded-xl p-4">
               <h4 className="text-xs font-bold uppercase tracking-widest text-[#6B21A8] mb-2">Suggestion</h4>
               <p className="text-sm text-[#4A4F5B] leading-relaxed mb-3">
                  Based on the "Beach Exterior" scene, consider adding a <span className="font-semibold text-[#6B21A8]">GIF movement shot</span> of the dress fabric in the wind.
               </p>
               <button className="w-full bg-white text-[#6B21A8] py-2 rounded-lg text-xs font-bold border border-[#E9D5FF] hover:bg-[#FAF5FF] transition-colors shadow-sm">
                  Add to List
               </button>
            </div>

            <div className="bg-white border border-[#E5E5E5] rounded-xl p-4 shadow-sm">
               <h4 className="text-xs font-bold uppercase tracking-widest text-[#6B7280] mb-2">Shot Coverage</h4>
               <div className="space-y-3">
                  <div>
                     <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#1A1A1A]">Video Content</span>
                        <span className="text-[#6B7280]">15%</span>
                     </div>
                     <div className="w-full bg-[#F7F7F5] rounded-full h-1.5">
                        <div className="bg-[#1A1A1A] h-1.5 rounded-full" style={{ width: '15%' }}></div>
                     </div>
                  </div>
                  <div>
                     <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#1A1A1A]">Product Details</span>
                        <span className="text-[#6B7280]">40%</span>
                     </div>
                     <div className="w-full bg-[#F7F7F5] rounded-full h-1.5">
                        <div className="bg-[#1A1A1A] h-1.5 rounded-full" style={{ width: '40%' }}></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         
         <div className="mt-auto">
            <div className="bg-white border border-[#E5E5E5] p-3 rounded-lg shadow-sm">
                <input type="text" placeholder="Ask AI to generate shots..." className="w-full text-xs border-none focus:outline-none placeholder-[#9CA3AF]" />
            </div>
         </div>
      </div>

    </div>
  );
};
