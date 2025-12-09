
import { Shot, MoodBoardAnalysis } from './ai';

export type ShootType = "campaign" | "product" | "runway" | "lookbook" | "video" | "custom";
export type LocationType = "studio" | "on-location" | "client-venue";
export type VibeType = "minimalist" | "editorial" | "bold" | "dark" | "natural";
export type ModelSelectionType = "portfolio" | "studio-books";
export type StylingType = "own-wardrobe" | "stylist";
export type ResolutionType = "web" | "print";
export type TurnaroundType = "rush" | "standard" | "extended";
export type RetouchingLevel = "basic" | "advanced" | "high-end";
export type UsageRights = "editorial" | "commercial" | "unlimited";

export interface ShootWizardState {
  step: number;
  shootType: ShootType | null;
  numberOfItems: number;
  estimatedDuration: string;
  location: LocationType;
  date: Date | null;
  timeSlot: string | null;
  moodBoardImages: File[]; // In a real app, these would be URLs after upload
  vibe: VibeType | null;
  referenceBrands: string; // comma separated
  modelNeeded: boolean;
  modelSelection: ModelSelectionType | null;
  stylingNeeded: StylingType | null;
  hairMakeup: boolean;
  finalImagesCount: number;
  formats: string[];
  resolution: ResolutionType;
  turnaround: TurnaroundType;
  retouchingLevel: RetouchingLevel | null;
  videoAddOn: boolean;
  usageRights: UsageRights;
  totalPrice: number;
  deposit: number;
  // AI Generated Data
  shotList: Shot[];
  aiAnalysis: MoodBoardAnalysis | null;
}

export const SHOOT_TYPES = [
  {
    id: "campaign",
    name: "Campaign Shoot",
    description: "Brand storytelling, editorial content",
    icon: "🎬",
    startingPrice: 2500
  },
  {
    id: "product",
    name: "Product Shoot",
    description: "E-commerce, catalog photography",
    icon: "📦",
    startingPrice: 1500
  },
  {
    id: "runway",
    name: "Runway Coverage",
    description: "Fashion show photography",
    icon: "👗",
    startingPrice: 2000
  },
  {
    id: "lookbook",
    name: "Lookbook",
    description: "Collection showcase",
    icon: "📸",
    startingPrice: 2200
  },
  {
    id: "video",
    name: "Video & Social",
    description: "Instagram Reels, TikTok content",
    icon: "🎥",
    startingPrice: 1500
  },
  {
    id: "custom",
    name: "Custom Shoot",
    description: "Build from scratch",
    icon: "✨",
    startingPrice: 0
  }
] as const;

export const PRICING = {
  baseRates: {
    halfDay: 1500,
    fullDay: 2500
  },
  addOns: {
    model: 800,
    stylist: 700,
    hairMakeup: 700,
    videoAddOn: 500,
    retouching: {
      basic: 0,
      advanced: 20, // per image
      highEnd: 50 // per image
    }
  },
  turnaround: {
    rush: 1.3, // 30% markup
    standard: 1.0,
    extended: 0.9 // 10% discount
  }
};
