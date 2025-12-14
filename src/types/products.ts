
export interface Product {
  id: string | number;
  name: string;
  sku: string;
  price: string; // Retail Price (RRP)
  status: 'Ready' | 'Missing Info' | 'In Transit';
  img: string;
  category?: string;
  description?: string;
  
  // B2B Specifics
  wholesalePrice?: number;
  moq?: number; // Minimum Order Quantity
  casePack?: number;
  stockLevel?: number;
}
