// Service for managing destination data
import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Destination } from '../models/destination.model';
import { indianCities, indianStates } from '../data/indian-cities';
import { internationalDestinations } from '../data/international-cities';

@Injectable({
  providedIn: 'root'
})
export class DestinationsService {
  
  private mockDestinations: Destination[] = [];

  constructor() {
    this.generateDestinations();
  }

  private generateDestinations(): void {
    let id = 1;

    // Helper function to generate unique image ID from string
    const getImageId = (str: string, index: number): number => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash = hash & hash; // Convert to 32bit integer
      }
      // Ensure positive number between 1-1000
      return Math.abs(hash % 1000) + 1 + (index * 3);
    };

    // Smart function to determine best time to visit based on location and category
    const getBestTimeToVisit = (country: string, category: string, index: number): string => {
      // India-specific timing based on regions and categories
      if (country === 'India') {
        // Beach destinations - avoid monsoon
        if (category === 'Beach') {
          const beachSeasons = [
            'October to March',
            'November to February',
            'December to March',
            'October to April'
          ];
          return beachSeasons[index % beachSeasons.length];
        }
        
        // Hill stations and mountain destinations - summer and autumn
        if (category === 'Nature' || category === 'Adventure') {
          const mountainSeasons = [
            'March to June',
            'April to October',
            'May to September',
            'September to November',
            'October to March'
          ];
          return mountainSeasons[index % mountainSeasons.length];
        }
        
        // Heritage and spiritual - avoid extreme summer
        if (category === 'Heritage' || category === 'Spiritual') {
          const heritageSeasons = [
            'October to March',
            'November to February',
            'September to March',
            'October to April',
            'Year-round'
          ];
          return heritageSeasons[index % heritageSeasons.length];
        }
        
        // City destinations - mostly year-round with preferences
        if (category === 'City') {
          const citySeasons = [
            'October to March',
            'November to February',
            'Year-round',
            'September to April'
          ];
          return citySeasons[index % citySeasons.length];
        }
      }
      
      // International destinations - varied by region
      // European destinations
      if (['France', 'Germany', 'Italy', 'Spain', 'United Kingdom', 'Netherlands', 
           'Belgium', 'Austria', 'Switzerland', 'Greece', 'Portugal', 'Ireland'].includes(country)) {
        const europeanSeasons = [
          'April to October',
          'May to September',
          'June to August',
          'April to September',
          'May to October',
          'Year-round'
        ];
        return europeanSeasons[index % europeanSeasons.length];
      }
      
      // Southeast Asian destinations
      if (['Thailand', 'Vietnam', 'Indonesia', 'Malaysia', 'Singapore', 'Philippines',
           'Cambodia', 'Laos', 'Myanmar'].includes(country)) {
        const seAsiaSeasons = [
          'November to March',
          'December to April',
          'November to February',
          'October to March',
          'Year-round'
        ];
        return seAsiaSeasons[index % seAsiaSeasons.length];
      }
      
      // Middle Eastern destinations
      if (['United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Oman', 'Jordan', 'Egypt'].includes(country)) {
        const middleEastSeasons = [
          'November to March',
          'October to April',
          'December to February',
          'November to April'
        ];
        return middleEastSeasons[index % middleEastSeasons.length];
      }
      
      // East Asian destinations
      if (['Japan', 'China', 'South Korea', 'Taiwan', 'Hong Kong'].includes(country)) {
        const eastAsiaSeasons = [
          'March to May',
          'September to November',
          'April to June',
          'October to December',
          'March to November'
        ];
        return eastAsiaSeasons[index % eastAsiaSeasons.length];
      }
      
      // Australian and New Zealand
      if (['Australia', 'New Zealand'].includes(country)) {
        const oceaniaSeasons = [
          'September to March',
          'November to February',
          'October to April',
          'December to March',
          'Year-round'
        ];
        return oceaniaSeasons[index % oceaniaSeasons.length];
      }
      
      // North American destinations
      if (['United States', 'Canada', 'Mexico'].includes(country)) {
        const northAmericaSeasons = [
          'April to October',
          'May to September',
          'June to August',
          'March to November',
          'Year-round'
        ];
        return northAmericaSeasons[index % northAmericaSeasons.length];
      }
      
      // South American destinations
      if (['Brazil', 'Argentina', 'Chile', 'Peru', 'Colombia', 'Ecuador'].includes(country)) {
        const southAmericaSeasons = [
          'December to March',
          'November to April',
          'September to March',
          'October to April',
          'Year-round'
        ];
        return southAmericaSeasons[index % southAmericaSeasons.length];
      }
      
      // African destinations
      if (['South Africa', 'Kenya', 'Tanzania', 'Morocco', 'Egypt', 'Mauritius'].includes(country)) {
        const africaSeasons = [
          'May to October',
          'June to September',
          'April to October',
          'May to September',
          'Year-round'
        ];
        return africaSeasons[index % africaSeasons.length];
      }
      
      // Caribbean and tropical islands
      if (['Maldives', 'Seychelles', 'Fiji', 'Bali'].includes(country)) {
        const tropicalSeasons = [
          'November to April',
          'December to March',
          'November to March',
          'Year-round'
        ];
        return tropicalSeasons[index % tropicalSeasons.length];
      }
      
      // Default for other destinations
      const defaultSeasons = [
        'Year-round',
        'March to November',
        'April to October',
        'May to September',
        'October to March'
      ];
      return defaultSeasons[index % defaultSeasons.length];
    };

    // Generate Indian destinations (250+)
    indianCities.forEach((city, index) => {
      const state = indianStates[city] || 'India';
      const categories = ['Heritage', 'Nature', 'Adventure', 'Spiritual', 'Beach', 'City'];
      const category = categories[Math.floor(Math.random() * categories.length)];
      
      // Use Picsum Photos - reliable and always works
      // Generate unique seed based on city name for consistent images
      const seed = city.toLowerCase().replace(/\s+/g, '-');
      const imageUrl = `https://picsum.photos/seed/${seed}-${index}/800/600`;
      
      const overallRating = Math.round((4.3 + Math.random() * 0.6) * 10) / 10;
      
      // Get smart best time to visit
      const bestTime = getBestTimeToVisit('India', category, index);
      
      this.mockDestinations.push({
        id: `nat-${id++}`,
        name: city,
        country: 'India',
        region: 'National',
        description: `Explore the beauty of ${city} in ${state}. Experience rich culture, heritage, and natural wonders.`,
        shortDescription: `${category} destination in ${state}`,
        imageUrl: imageUrl,
        price: 299 + Math.floor(Math.random() * 600),
        rating: overallRating,
        reviews: Math.floor(Math.random() * 5000) + 500,
        detailedRatings: {
          overall: overallRating,
          hotel: Math.round((4.0 + Math.random() * 0.9) * 10) / 10,
          place: Math.round((4.2 + Math.random() * 0.7) * 10) / 10,
          comfort: Math.round((4.1 + Math.random() * 0.8) * 10) / 10,
          travel: Math.round((4.0 + Math.random() * 0.9) * 10) / 10,
          guestService: Math.round((4.3 + Math.random() * 0.6) * 10) / 10,
          communication: Math.round((4.2 + Math.random() * 0.7) * 10) / 10
        },
        isPopular: index < 20,
        isNew: index < 10,
        isTrending: index >= 10 && index < 25,
        discount: index < 15 ? Math.floor(Math.random() * 30) + 10 : undefined,
        highlights: ['Local culture', 'Great food', 'Beautiful scenery', 'Historical sites'],
        bestTimeToVisit: bestTime,
        duration: '3-5 days',
        category: category
      });
    });

    // Generate International destinations (300+)
    internationalDestinations.forEach((dest, index) => {
      const categories = ['City & Culture', 'Beach & Luxury', 'Adventure', 'Heritage', 'Nature'];
      const category = categories[Math.floor(Math.random() * categories.length)];
      
      // Use Picsum Photos - reliable and always works
      // Generate unique seed based on destination name for consistent images
      const seed = dest.name.toLowerCase().replace(/\s+/g, '-');
      const imageUrl = `https://picsum.photos/seed/${seed}-${dest.country}-${index}/800/600`;
      
      const overallRating = Math.round((4.5 + Math.random() * 0.4) * 10) / 10;
      
      // Get smart best time to visit based on country
      const bestTime = getBestTimeToVisit(dest.country, category, index);
      
      this.mockDestinations.push({
        id: `int-${id++}`,
        name: dest.name,
        country: dest.country,
        region: 'International',
        description: `Discover the wonders of ${dest.name} in ${dest.country}. World-class attractions and unforgettable experiences await.`,
        shortDescription: `Amazing ${category.toLowerCase()} in ${dest.country}`,
        imageUrl: imageUrl,
        price: dest.price,
        rating: overallRating,
        reviews: Math.floor(Math.random() * 8000) + 1000,
        detailedRatings: {
          overall: overallRating,
          hotel: Math.round((4.3 + Math.random() * 0.6) * 10) / 10,
          place: Math.round((4.4 + Math.random() * 0.5) * 10) / 10,
          comfort: Math.round((4.3 + Math.random() * 0.6) * 10) / 10,
          travel: Math.round((4.2 + Math.random() * 0.7) * 10) / 10,
          guestService: Math.round((4.4 + Math.random() * 0.5) * 10) / 10,
          communication: Math.round((4.3 + Math.random() * 0.6) * 10) / 10
        },
        isPopular: index < 30,
        isNew: index < 15,
        isTrending: index >= 15 && index < 40,
        discount: index < 20 ? Math.floor(Math.random() * 35) + 15 : undefined,
        highlights: ['World-class attractions', 'Rich culture', 'Great cuisine', 'Iconic landmarks'],
        bestTimeToVisit: bestTime,
        duration: '5-7 days',
        category: category
      });
    });
  }

  // Get all destinations - NO DELAY
  getDestinations(): Observable<Destination[]> {
    return of(this.mockDestinations);
  }

  // Get destination by ID
  getDestinationById(id: string): Observable<Destination | undefined> {
    const destination = this.mockDestinations.find(d => d.id === id);
    return of(destination);
  }

  // Get popular destinations
  getPopularDestinations(): Observable<Destination[]> {
    const popular = this.mockDestinations.filter(d => d.isPopular);
    return of(popular);
  }

  // Get trending destinations
  getTrendingDestinations(): Observable<Destination[]> {
    const trending = this.mockDestinations.filter(d => d.isTrending);
    return of(trending);
  }

  // Get destinations by region
  getDestinationsByRegion(region: 'National' | 'International'): Observable<Destination[]> {
    const filtered = this.mockDestinations.filter(d => d.region === region);
    return of(filtered).pipe(delay(300));
  }

  // Search destinations
  searchDestinations(query: string): Observable<Destination[]> {
    const lowerQuery = query.toLowerCase();
    const filtered = this.mockDestinations.filter(d => 
      d.name.toLowerCase().includes(lowerQuery) ||
      d.country.toLowerCase().includes(lowerQuery) ||
      d.category.toLowerCase().includes(lowerQuery)
    );
    return of(filtered).pipe(delay(300));
  }
}
