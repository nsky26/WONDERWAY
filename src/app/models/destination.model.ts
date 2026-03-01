// Destination model interface
export interface Destination {
  id: string;
  name: string;
  country: string;
  region: 'National' | 'International';
  description: string;
  shortDescription: string;
  imageUrl: string;
  price: number;
  rating: number;
  reviews: number;
  detailedRatings?: DetailedRatings; // Detailed rating breakdown
  isPopular: boolean;
  isNew?: boolean; // New destinations
  isTrending?: boolean; // Trending destinations
  discount?: number; // Discount percentage
  highlights: string[];
  bestTimeToVisit: string;
  duration: string;
  category: string;
  comboPackage?: ComboPackage; // Combo trip package
  touristGuides?: TouristGuide[]; // Available tourist guides
  travelPackages?: TravelPackage[]; // Transportation packages
}

// Tourist Guide information
export interface TouristGuide {
  id: string;
  name: string;
  photo: string;
  experience: string; // e.g., "8 years"
  languages: string[]; // Languages spoken
  specialization: string; // e.g., "Heritage Tours", "Adventure Tours"
  rating: number;
  reviewsCount: number;
  pricePerDay: number;
  phone: string;
  email: string;
  whatsapp?: string;
  availability: 'Available' | 'Busy' | 'Limited';
  bio: string;
  certifications?: string[];
}

// Travel Package for transportation
export interface TravelPackage {
  id: string;
  type: 'Bike' | 'Car' | 'SUV' | 'Jeep' | 'Tempo Traveller' | 'Bus' | 'Luxury Car';
  vehicleName: string; // e.g., "Royal Enfield", "Toyota Innova"
  capacity: string; // e.g., "2 persons", "7 persons"
  pricePerDay: number;
  pricePerKm?: number;
  features: string[]; // e.g., "AC", "Music System", "GPS"
  imageUrl: string;
  fuelType?: string; // "Petrol", "Diesel", "Electric"
  availability: boolean;
  provider: string; // Company/provider name
  providerContact: string;
  includesDriver: boolean;
  insurance: boolean;
}

// Detailed ratings for different aspects
export interface DetailedRatings {
  overall: number;
  hotel: number;
  place: number;
  comfort: number;
  travel: number;
  guestService: number;
  communication: number;
}

// Combo Package for multi-destination trips
export interface ComboPackage {
  id: string;
  name: string;
  destinations: string[]; // Array of destination names
  totalDuration: string;
  originalPrice: number;
  comboPrice: number;
  savings: number;
  includes: string[];
  description: string;
}
