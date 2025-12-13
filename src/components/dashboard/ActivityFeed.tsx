
import React from 'react';
import { MoreHorizontal, Sparkles, Image as ImageIcon, CheckCircle2 } from 'lucide-react';

interface ActivityFeedProps {
  campaign: any;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ campaign }) => {
  const suggestion = campaign?.aiAnalysis?.suggestion || "AI Analysis pending...";
  const palette = campaign?.aiAnalysis?.colors || ['#F3E8FF', '#A855F7', '#1A1A1A'];
  
  // Dynamic Activity Feed Logic
  const activityFeed = [];

  if (campaign) {
     // Recent: Retouching
     if (campaign.galleryStats && campaign.galleryStats.retouching > 0) {
        activityFeed.push({
           user: "Creative Director", 
           action: "approved for retouching", 
           target: `${campaign.galleryStats.retouching} images`, 
           time: "Just now", 
           type: "review"
        });
     }

     // Wizard Completion
     activityFeed.push({ 
        user: "System", 
        action: "Campaign confirmed", 
        target: campaign.shootType, 
        time: "Today", 
        type: "system" 
     });

     // AI Generation
     if (campaign.shotList?.length > 0) {
        activityFeed.push({ 
           user: "AI Copilot", 
           action: "generated shot list", 
           target: `${campaign.shotList.length} shots`, 
           time: "Today", 
           type: "ai" 
        });
     }

     // Moodboard
     if (campaign.moodBoardImages?.length > 0) {
        activityFeed.push({ 
           user: "Creative", 
           action: "uploaded moodboard", 
           target: `${campaign.moodBoardImages.length} assets`, 
           time: "Today", 
           type: "upload" 
        });
     }
  } else {
     // Fallback Demo Data
     activityFeed.push(
        { user: "System", action: "Welcome to FashionOS", target: "Dashboard", time: "Just now", type: "system" },
        { user: "Sarah J.", action: "uploaded 12 new assets", target: "Look 04", time: "2h ago", type: "upload" },
        { user: "Mike T.", action: "requested review", target: "Hero Video Cut 1", time: "4h ago", type: "review" },
        { user: "AI Copilot", action: "generated 5 caption variations", target: "Social Teasers", time: "6h ago", type: "ai" }
     );
  }

  return (
    <div className="bg-white border border-[#E5E5E5] rounded-2xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-serif text-xl text-[#1A1A1A]">Campaign Activity</h3>
        <button className="text-[#6B7280] hover:text-[#1A1A1A] transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>
      
      <div className="relative border-l border-[#E5E5E5] ml-3 space-y-8">
        {activityFeed.map((activity, i) => (
          <div key={i} className="pl-8 relative group">
            <div className={`absolute -left-1.5 top-1 w-3 h-3 rounded-full border-2 border-white ${
              activity.type === 'ai' ? 'bg-[#A855F7]' : 
              activity.type === 'review' ? 'bg-[#F59E0B]' : 
              activity.type === 'upload' ? 'bg-blue-500' : 'bg-[#1A1A1A]'
            } shadow-sm`}></div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-[#1A1A1A]">
                  <span className="font-semibold">{activity.user}</span> {activity.action} <span className="font-medium text-[#6B7280]">for {activity.target}</span>
                </p>
                
                {activity.type === 'ai' && i === 0 && campaign && (
                  <div className="mt-2 p-3 bg-[#F3E8FF] rounded-lg border border-[#E9D5FF] animate-in fade-in">
                    <div className="flex gap-2 items-start">
                      <Sparkles size={14} className="text-[#6B21A8] mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-[#6B21A8] leading-relaxed italic mb-2">
                          "{suggestion}"
                        </p>
                        <div className="flex gap-1">
                          {palette.slice(0, 5).map((c: string, idx: number) => (
                            <div key={idx} className="w-3 h-3 rounded-full border border-black/10" style={{backgroundColor: c}}></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activity.type === 'review' && (
                   <div className="mt-2 flex gap-2">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs rounded border border-green-100">
                         <CheckCircle2 size={10} /> In Progress
                      </span>
                   </div>
                )}
              </div>
              <span className="text-xs text-[#9CA3AF] whitespace-nowrap ml-4">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
