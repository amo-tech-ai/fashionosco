
import { compressBase64Image, fileToBase64 } from '../../utils/fileHelpers';

export interface ParsedProduct {
  id?: string;
  name: string;
  sku: string;
  price: string;
  description: string;
  category: string;
  status: 'Ready' | 'Review';
}

const SUPABASE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_FUNCTION_URL || 'http://localhost:54321/functions/v1';

// Mock data for demo/fallback
const MOCK_PARSED_PRODUCTS: ParsedProduct[] = [
  {
    name: "Oversized Cashmere Blend Coat",
    sku: "FW25-CT-001",
    price: "$850",
    description: "Double-faced wool cashmere blend with drop shoulders and belted waist.",
    category: "Outerwear",
    status: "Review"
  },
  {
    name: "Silk Charmeuse Slip Dress",
    sku: "FW25-DR-012",
    price: "$420",
    description: "Bias cut midi dress in 100% silk charmeuse. Adjustable straps.",
    category: "Dresses",
    status: "Ready"
  },
  {
    name: "High-Waist Pleated Trouser",
    sku: "FW25-PN-005",
    price: "$395",
    description: "Wide leg italian wool trouser with front pleats and side tabs.",
    category: "Bottoms",
    status: "Ready"
  },
  {
    name: "Chunky Cable Knit Sweater",
    sku: "FW25-KN-008",
    price: "$550",
    description: "Hand-knit merino wool fisherman sweater. Boxy fit.",
    category: "Knitwear",
    status: "Review"
  }
];

export const parseLineSheet = async (file: File): Promise<ParsedProduct[]> => {
  try {
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!anonKey) {
      console.log('✨ Demo Mode: Generating mock product parse');
      return new Promise(resolve => setTimeout(() => resolve(MOCK_PARSED_PRODUCTS), 3000));
    }

    // 1. Prepare Image
    const rawBase64 = await fileToBase64(file);
    const compressed = await compressBase64Image(rawBase64, 1024, 0.8); // Higher quality for text reading
    const cleanBase64 = compressed.split(',')[1];

    // 2. Call AI
    const response = await fetch(`${SUPABASE_FUNCTION_URL}/parse-line-sheet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonKey}`,
      },
      body: JSON.stringify({ image: cleanBase64 }),
    });

    if (!response.ok) {
      throw new Error('Failed to parse line sheet');
    }

    const data = await response.json();
    
    // Add UI status fields
    return data.products.map((p: any) => ({
        ...p,
        status: p.price && p.sku ? 'Ready' : 'Review' // Auto-flag incomplete data
    }));

  } catch (error) {
    console.warn('AI Parse Fallback:', error);
    return MOCK_PARSED_PRODUCTS;
  }
};
