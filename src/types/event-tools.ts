
export interface TimelineItem {
  id: string;
  time: string;
  duration: string;
  title: string;
  description: string;
  category: 'logistics' | 'runway' | 'hospitality' | 'media';
  status: 'pending' | 'confirmed' | 'live';
  // Technical Cues for Production Desk
  audioCue?: string;
  lightingCue?: string;
  stageCue?: string;
  departmentNotes?: string;
}

export interface Guest {
  id: string;
  name: string;
  email: string;
  category: 'VIP' | 'Press' | 'Buyer' | 'Influencer' | 'General';
  status: 'Invited' | 'Confirmed' | 'Declined' | 'Waitlist';
  plusOne: boolean;
  assignedSeat?: string; // e.g. "A-12"
  notes?: string;
}

export interface EventData {
  timeline: TimelineItem[];
  guests: Guest[];
  seatingChart?: any;
}
