// Destination model interface
export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  price: number;
  rating: number;
  reviews: number;
  isPopular: boolean;
  highlights: string[];
  bestTimeToVisit: string;
  duration: string;
  category: string;
}
