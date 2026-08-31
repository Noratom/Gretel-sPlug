export type Category = 
  | 'All' 
  | 'Gowns & Evening Wear' 
  | 'Bespoke Suits & Sets' 
  | 'Silk Luxury' 
  | 'Red Carpet & Couture' 
  | 'Custom Outerwear';

export interface FabricOption {
  id: string;
  name: string;
  texture: string;
  colorHex: string;
  image?: string;
}

export interface BespokeDesign {
  id: string;
  title: string;
  category: Category;
  tagline: string;
  description: string;
  basePriceUSD: number;
  priceRange: string;
  craftingTime: string; // e.g. "5 - 7 Business Days"
  mainImage: string;
  galleryImages: string[];
  fabrics: FabricOption[];
  isFeatured?: boolean;
  isNewArrival?: boolean;
  details: string[];
}

export interface CustomMeasurements {
  bustChest: string;
  waist: string;
  hips: string;
  shoulderWidth: string;
  sleeveLength: string;
  totalHeight: string;
  desiredOutfitLength: string;
  additionalNotes: string;
}

export type SizeMode = 'standard' | 'custom';

export interface BespokeOrderState {
  design: BespokeDesign | null;
  selectedFabric: FabricOption | null;
  sizeMode: SizeMode;
  standardSize: string; // 'XS', 'S', 'M', 'L', 'XL', 'Custom'
  measurements: CustomMeasurements;
  clientName: string;
  clientPhone: string;
  fittingDatePreference: string;
}
