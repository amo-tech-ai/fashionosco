
export type EventType = "runway" | "presentation" | "dinner" | "party" | "pop-up";
export type VenueType = "industrial" | "historical" | "modern" | "outdoor" | "custom";
export type ProductionLevel = "turnkey" | "collaborative" | "venue-only";

export interface EventWizardState {
  step: number;
  eventType: EventType | null;
  eventName: string;
  guestCount: number;
  date: Date | null;
  venueType: VenueType | null;
  productionLevel: ProductionLevel;
  budget: number;
  // Logistics
  catering: boolean;
  security: boolean;
  avLighting: boolean;
  livestream: boolean;
  // Metadata
  totalPrice: number;
  deposit: number;
}

export const EVENT_TYPES = [
  { id: "runway", name: "Runway Show", icon: "👠", basePrice: 15000, desc: "Full catwalk production with lighting & seating." },
  { id: "presentation", name: "Presentation", icon: "🖼️", basePrice: 8000, desc: "Static models, immersive set design." },
  { id: "dinner", name: "VIP Dinner", icon: "🍽️", basePrice: 5000, desc: "Seated dinner for press & influencers." },
  { id: "party", name: "After Party", icon: "🍸", basePrice: 10000, desc: "DJ, bar, and atmosphere." },
  { id: "pop-up", name: "Pop-Up Store", icon: "🛍️", basePrice: 12000, desc: "Retail activation structure." },
] as const;
