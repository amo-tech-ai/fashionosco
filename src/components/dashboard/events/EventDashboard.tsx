
import React from 'react';
import { EventOverview } from './EventOverview';
import { EventTimeline } from './EventTimeline';
import { GuestList } from './GuestList';

interface EventDashboardProps {
  campaign: any;
}

export const EventDashboard: React.FC<EventDashboardProps> = ({ campaign }) => {
  return (
    <div className="space-y-8">
      <EventOverview />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 pb-10">
        <EventTimeline />
        <GuestList />
      </div>
    </div>
  );
};
