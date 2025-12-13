
import React from 'react';
import { Camera, CheckCircle, Clock, ArrowUpRight, Wand2, Users, Calendar, Ticket } from 'lucide-react';

interface KPIGridProps {
  campaign: any;
}

export const KPIGrid: React.FC<KPIGridProps> = ({ campaign }) => {
  const isEvent = campaign?.type === 'event';
  const budget = campaign ? `$${campaign.totalPrice?.toLocaleString()}` : '$12.4k';
  
  // Calculate Progress
  let progressValue = '15%';
  let progressSub = 'Planning';
  let progressTrend = 'Started';
  let ProgressIcon = CheckCircle;

  if (campaign) {
     if (!isEvent && campaign.galleryStats && campaign.galleryStats.retouching > 0) {
        progressValue = '75%';
        progressSub = 'Post-Production';
        progressTrend = `${campaign.galleryStats.retouching} Retouching`;
        ProgressIcon = Wand2;
     } else if (!isEvent && campaign.shotList && campaign.shotList.length > 0) {
        progressValue = '25%';
        progressSub = 'Production Ready';
     } else if (isEvent) {
        // Event Logic
        progressValue = `${campaign.progress || 10}%`;
        progressSub = campaign.status || 'Planning';
     }
  } else {
     progressValue = '56%';
  }

  // Define Stats Array based on Type
  const stats = isEvent ? [
    // EVENT STATS
    { label: 'Guests', value: campaign?.guestCount || 0, sub: 'Estimated Capacity', icon: Users, trend: null },
    { label: 'Status', value: progressSub, sub: 'Production Timeline', icon: Calendar, trend: 'On Track' },
    { label: 'RSVP', value: '0', sub: 'Invites Pending', icon: Ticket, trend: 'Not Sent' },
    { label: 'Budget', value: budget, sub: '50% Deposit Paid', icon: ArrowUpRight, trend: 'On Track' }
  ] : [
    // SHOOT STATS
    { label: 'Total Shots', value: campaign ? (campaign.shotList?.length || campaign.numberOfItems * 2) : 32, sub: campaign ? 'Confirmed' : 'Planned', icon: Camera, trend: null },
    { label: 'Progress', value: progressValue, sub: progressSub, icon: ProgressIcon, trend: progressTrend },
    { label: 'Turnaround', value: campaign?.turnaround === 'rush' ? 'Rush (48h)' : campaign?.turnaround === 'extended' ? '14 Days' : 'Standard', sub: 'Estimated Delivery', icon: Clock, trend: 'On Schedule' },
    { label: 'Budget', value: budget, sub: '50% Deposit Paid', icon: ArrowUpRight, trend: 'On Track' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((item, idx) => (
        <div key={idx} className="bg-white p-6 rounded-2xl border border-[#E5E5E5] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 bg-[#F7F7F5] rounded-xl flex items-center justify-center text-[#1A1A1A]">
              <item.icon size={20} strokeWidth={1.5} />
            </div>
            {item.trend && (
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${item.trend.includes('Retouching') ? 'bg-purple-50 text-purple-700' : item.trend.includes('Schedule') || item.trend.includes('Track') ? 'bg-[#F3E8FF] text-[#6B21A8]' : 'bg-[#DCFCE7] text-[#166534]'}`}>
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
  );
};
