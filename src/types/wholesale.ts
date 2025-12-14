
export interface BuyerApplication {
  storeName: string;
  website: string;
  instagram: string;
  location: string;
  contactName: string;
  email: string;
}

export interface VettingResult {
  risk_score: number;
  aesthetic_tier: "Luxury" | "Contemporary" | "Mass Market" | "Discount";
  is_physical_store_verified: boolean;
  brands_stocked: string[];
  verdict: "Approve" | "Manual Review" | "Reject";
  reasoning: string;
}

export interface WholesaleProduct {
  id: string;
  name: string;
  sku: string;
  wholesalePrice: number;
  rrp: number;
  moq: number; // Minimum Order Quantity
  casePack: number; // e.g. sold in packs of 6
  image: string;
  category: string;
  stock: number;
}

export interface CartItem extends WholesaleProduct {
  quantity: number;
}
