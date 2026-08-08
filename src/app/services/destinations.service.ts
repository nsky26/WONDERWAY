// Service for managing destination data
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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

  private getRealDestinationImage(name: string, country: string, category: string): string {
    const normName = name.toLowerCase().trim();

    // Curated High-Definition Unsplash Images for Iconic Places
    const exactImageMap: { [key: string]: string } = {
      'paris': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
      'london': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
      'tokyo': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
      'new york': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80',
      'rome': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
      'agra': 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
      'taj mahal': 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
      'dubai': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
      'goa': 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
      'jaipur': 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
      'bali': 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
      'sydney': 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80',
      'singapore': 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
      'maldives': 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
      'venice': 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=1200&q=80',
      'barcelona': 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=80',
      'switzerland': 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
      'cairo': 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=80',
      'srinagar': 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80',
      'kashmir': 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80',
      'kerala': 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
      'ladakh': 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
      'varanasi': 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
      'udaipur': 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=1200&q=80',
      'manali': 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
      'bangkok': 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80',
      'amsterdam': 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=1200&q=80',
      'santorini': 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
      'rio de janeiro': 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=80',
      'mumbai': 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
      'delhi': 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80',
      'bangalore': 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
      'hyderabad': 'https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=1200&q=80',
      'chennai': 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
      'kolkata': 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1200&q=80'
    };

    if (exactImageMap[normName]) return exactImageMap[normName];

    // Category fallback high quality travel photos
    const categoryImages: { [key: string]: string[] } = {
      'Beach': [
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80'
      ],
      'Heritage': [
        'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
      ],
      'Nature': [
        'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80'
      ],
      'Adventure': [
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
      ],
      'Spiritual': [
        'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
      ],
      'City': [
        'https://images.unsplash.com/photo-1477959858617-67f30ac4ce78?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
      ]
    };

    const pool = categoryImages[category] || categoryImages['City'];
    const hash = normName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return pool[hash % pool.length];
  }

  private generateDestinations(): void {
    let id = 1;

    const getBestTimeToVisit = (country: string, category: string, index: number): string => {
      if (country === 'India') {
        if (category === 'Beach') return 'October to March';
        if (category === 'Nature' || category === 'Adventure') return 'March to June';
        if (category === 'Heritage' || category === 'Spiritual') return 'October to March';
        return 'Year-round';
      }
      return 'April to October';
    };

    // Generate Indian destinations (250+)
    indianCities.forEach((city, index) => {
      const state = indianStates[city] || 'India';
      const categories = ['Heritage', 'Nature', 'Adventure', 'Spiritual', 'Beach', 'City'];
      const category = categories[index % categories.length];
      
      const imageUrl = this.getRealDestinationImage(city, 'India', category);
      const overallRating = Math.round((4.3 + (index % 6) * 0.1) * 10) / 10;
      const bestTime = getBestTimeToVisit('India', category, index);
      
      this.mockDestinations.push({
        id: `nat-${id++}`,
        name: city,
        country: 'India',
        region: 'National',
        description: `Explore the beauty of ${city} in ${state}. Experience rich culture, heritage, and natural wonders.`,
        shortDescription: `${category} destination in ${state}`,
        imageUrl: imageUrl,
        price: 299 + (index % 10) * 50,
        rating: overallRating,
        reviews: 800 + (index % 20) * 150,
        detailedRatings: {
          overall: overallRating,
          hotel: 4.5,
          place: 4.6,
          comfort: 4.4,
          travel: 4.3,
          guestService: 4.5,
          communication: 4.4
        },
        isPopular: index < 20,
        isNew: index < 10,
        isTrending: index >= 10 && index < 25,
        discount: index < 15 ? 15 : undefined,
        highlights: ['Local culture', 'Great food', 'Beautiful scenery', 'Historical sites'],
        bestTimeToVisit: bestTime,
        duration: '3-5 days',
        category: category
      });
    });

    // Generate International destinations (300+)
    internationalDestinations.forEach((dest, index) => {
      const categories = ['City & Culture', 'Beach & Luxury', 'Adventure', 'Heritage', 'Nature'];
      const category = categories[index % categories.length];
      
      const imageUrl = this.getRealDestinationImage(dest.name, dest.country, category);
      const overallRating = Math.round((4.5 + (index % 5) * 0.1) * 10) / 10;
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
        reviews: 1200 + (index % 30) * 200,
        detailedRatings: {
          overall: overallRating,
          hotel: 4.7,
          place: 4.8,
          comfort: 4.6,
          travel: 4.5,
          guestService: 4.7,
          communication: 4.6
        },
        isPopular: index < 30,
        isNew: index < 15,
        isTrending: index >= 15 && index < 40,
        discount: index < 20 ? 20 : undefined,
        highlights: ['World-class attractions', 'Rich culture', 'Great cuisine', 'Iconic landmarks'],
        bestTimeToVisit: bestTime,
        duration: '5-7 days',
        category: category
      });
    });
  }

  getDestinations(): Observable<Destination[]> {
    return of(this.mockDestinations);
  }

  getDestinationById(id: string): Observable<Destination | undefined> {
    const dest = this.mockDestinations.find(d => d.id === id);
    return of(dest);
  }

  searchDestinations(query: string): Observable<Destination[]> {
    const q = query.toLowerCase().trim();
    if (!q) return of(this.mockDestinations);
    
    const filtered = this.mockDestinations.filter(d => 
      d.name.toLowerCase().includes(q) ||
      d.country.toLowerCase().includes(q) ||
      d.category.toLowerCase().includes(q)
    );
    return of(filtered);
  }

  filterDestinations(region?: string, category?: string, minPrice?: number, maxPrice?: number): Observable<Destination[]> {
    let filtered = this.mockDestinations;

    if (region && region !== 'All') {
      filtered = filtered.filter(d => d.region === region);
    }

    if (category && category !== 'All') {
      filtered = filtered.filter(d => d.category === category);
    }

    if (minPrice !== undefined) {
      filtered = filtered.filter(d => d.price >= minPrice);
    }

    if (maxPrice !== undefined) {
      filtered = filtered.filter(d => d.price <= maxPrice);
    }

    return of(filtered);
  }

  getTrendingDestinations(): Observable<Destination[]> {
    return of(this.mockDestinations.filter(d => d.isTrending));
  }

  getPopularDestinations(): Observable<Destination[]> {
    return of(this.mockDestinations.filter(d => d.isPopular));
  }

  getNewDestinations(): Observable<Destination[]> {
    return of(this.mockDestinations.filter(d => d.isNew));
  }

  getFeaturedDestinations(): Observable<Destination[]> {
    return of(this.mockDestinations.slice(0, 8));
  }
}
