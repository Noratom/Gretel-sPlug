export type Category = 
  | 'All' 
  | 'Dresses & Gowns' 
  | 'Suits & Sets' 
  | 'Silk & Loungewear' 
  | 'Special Occasion' 
  | 'Jackets & Coats';

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
  craftingTime: string; // e.g. "5 - 7 Days"
  mainImage: string;
  galleryImages: string[];
  fabrics: FabricOption[];
  isFeatured?: boolean;
  isNewArrival?: boolean;
  details: string[];
}

export interface CustomMeasurements {
  bust: string;
  underBust: string;
  waist: string;
  highHip: string;
  hipFull: string;
  shoulderWidth: string;
  backWidth: string;
  frontLength: string;
  backLength: string;
  sleeveLength: string;
  armhole: string;
  bicep: string;
  wrist: string;
  neck: string;
  waistToHip: string;
  waistToKnee: string;
  waistToAnkle: string;
  crotchLength: string;
  outseamLength: string;
  inseamLength: string;
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

export interface CustomDesignRequestState {
  photoPreview?: string;
  description: string;
  fabricPreference: string;
  sizeMode: SizeMode;
  standardSize: string;
  measurements: CustomMeasurements;
  budgetRange: string;
  neededDate: string;
  clientName: string;
  clientPhone: string;
}
