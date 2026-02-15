// Offer model interface
export interface Offer {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  discount: number;
  originalPrice: number;
  discountedPrice: number;
  validUntil: string;
  destination: string;
  type: 'flight' | 'hotel' | 'package';
}
