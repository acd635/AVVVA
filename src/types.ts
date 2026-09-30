export type Language = 'KA' | 'EN' | 'RU';

export type Category = 'all' | 'rings' | 'necklaces' | 'earrings' | 'bracelets' | 'pendants' | 'sets' | 'hats' | 'other';

export type GemstoneType = 'all' | 'diamond' | 'sapphire' | 'emerald' | 'ruby' | 'pearl' | 'enamel';

export type MetalType = '18k-gold' | '18k-white-gold' | 'rose-gold' | 'platinum' | 'silver' | 'alloy';

export interface Product {
  id: string;
  titleKA: string;
  titleEN: string;
  titleRU?: string;
  category: Category;
  metalType: MetalType;
  mainGemstone: GemstoneType;
  gemstoneCarat?: string;
  purity: string; // e.g. "18K Gold (750)"
  priceUSD: number;
  priceGEL: number;
  rating: number;
  reviewsCount: number;
  isSignatureProduct?: boolean; // Highlighted for AVA special creations from prompt photos
  isNewRelease?: boolean;
  isBestSeller?: boolean;
  images: {
    primary: string;
    secondary?: string;
    modelDisplay?: string;
  };
  descriptionKA: string;
  descriptionEN: string;
  descriptionRU?: string;
  specifications: {
    weightGrams: string;
    gemstoneDetails: string;
    cutQuality: string;
    clarity: string;
    certificateNumber: string;
    hallmark: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedRingSize?: string;
  selectedMetal?: MetalType;
  customEngraving?: string;
}

export interface CustomJewelryRequest {
  metal: MetalType;
  gemstone: GemstoneType;
  style: string;
  estimatedBudget: string;
  customerName: string;
  phone: string;
  email: string;
  notes: string;
  preferredDate?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  textKA: string;
  textEN: string;
  verifiedPurchase: boolean;
  productName: string;
}
