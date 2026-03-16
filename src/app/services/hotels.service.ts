// Hotels service - manages hotel search and booking
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Hotel {
  id: string;
  name: string;
  location: string;
  city: string;
  rating: number;
  pricePerNight: number;
  amenities: string[];
  roomType: string;
  availableRooms: number;
  imageUrl: string;
  distance: string;
}

@Injectable({
  providedIn: 'root'
})
export class HotelsService {
  
  private hotelDatabase: { [key: string]: Hotel[] } = {
    'Bangalore': [
      { id: 'HTL001', name: 'Taj Bangalore', location: 'MG Road', city: 'Bangalore', rating: 4.8, pricePerNight: 8500, amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Bar', 'Room Service'], roomType: 'Deluxe Room', availableRooms: 5, imageUrl: 'https://picsum.photos/seed/taj-bangalore/400/300', distance: '2 km from city center' },
      { id: 'HTL002', name: 'ITC Gardenia', location: 'Residency Road', city: 'Bangalore', rating: 4.7, pricePerNight: 7800, amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Business Center'], roomType: 'Executive Room', availableRooms: 8, imageUrl: 'https://picsum.photos/seed/itc-gardenia/400/300', distance: '1.5 km from city center' },
      { id: 'HTL003', name: 'The Oberoi', location: 'MG Road', city: 'Bangalore', rating: 4.9, pricePerNight: 12000, amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Bar', 'Concierge', 'Valet'], roomType: 'Premier Room', availableRooms: 3, imageUrl: 'https://picsum.photos/seed/oberoi-bangalore/400/300', distance: '1 km from city center' },
      { id: 'HTL004', name: 'Lemon Tree Hotel', location: 'Electronic City', city: 'Bangalore', rating: 4.2, pricePerNight: 3500, amenities: ['WiFi', 'Restaurant', 'Gym', 'Parking'], roomType: 'Standard Room', availableRooms: 15, imageUrl: 'https://picsum.photos/seed/lemon-tree/400/300', distance: '8 km from city center' },
      { id: 'HTL005', name: 'Radisson Blu', location: 'Marathahalli', city: 'Bangalore', rating: 4.5, pricePerNight: 5500, amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Bar', 'Spa'], roomType: 'Superior Room', availableRooms: 10, imageUrl: 'https://picsum.photos/seed/radisson-blu/400/300', distance: '5 km from city center' }
    ],
    'Hyderabad': [
      { id: 'HTL101', name: 'Taj Falaknuma Palace', location: 'Falaknuma', city: 'Hyderabad', rating: 4.9, pricePerNight: 15000, amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Bar', 'Heritage Property'], roomType: 'Royal Suite', availableRooms: 3, imageUrl: 'https://picsum.photos/seed/taj-falaknuma/400/300', distance: '5 km from city center' },
      { id: 'HTL102', name: 'ITC Kakatiya', location: 'Begumpet', city: 'Hyderabad', rating: 4.7, pricePerNight: 7500, amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Business Center'], roomType: 'Executive Room', availableRooms: 10, imageUrl: 'https://picsum.photos/seed/itc-kakatiya/400/300', distance: '3 km from city center' },
      { id: 'HTL103', name: 'Novotel Hyderabad', location: 'HITEC City', city: 'Hyderabad', rating: 4.5, pricePerNight: 6000, amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Bar'], roomType: 'Superior Room', availableRooms: 12, imageUrl: 'https://picsum.photos/seed/novotel-hyd/400/300', distance: '8 km from city center' },
      { id: 'HTL104', name: 'Lemon Tree Hotel', location: 'Gachibowli', city: 'Hyderabad', rating: 4.2, pricePerNight: 3800, amenities: ['WiFi', 'Restaurant', 'Gym', 'Parking'], roomType: 'Standard Room', availableRooms: 18, imageUrl: 'https://picsum.photos/seed/lemon-tree-hyd/400/300', distance: '10 km from city center' }
    ],
    'Mumbai': [
      { id: 'HTL201', name: 'Taj Mahal Palace', location: 'Colaba', city: 'Mumbai', rating: 4.9, pricePerNight: 18000, amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Bar', 'Heritage Property', 'Sea View'], roomType: 'Luxury Suite', availableRooms: 4, imageUrl: 'https://picsum.photos/seed/taj-mumbai/400/300', distance: '1 km from Gateway of India' },
      { id: 'HTL202', name: 'The Oberoi Mumbai', location: 'Nariman Point', city: 'Mumbai', rating: 4.8, pricePerNight: 14000, amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Bar', 'Sea View'], roomType: 'Premier Room', availableRooms: 6, imageUrl: 'https://picsum.photos/seed/oberoi-mumbai/400/300', distance: '2 km from city center' },
      { id: 'HTL203', name: 'ITC Grand Central', location: 'Parel', city: 'Mumbai', rating: 4.6, pricePerNight: 8500, amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant'], roomType: 'Executive Room', availableRooms: 10, imageUrl: 'https://picsum.photos/seed/itc-mumbai/400/300', distance: '5 km from city center' },
      { id: 'HTL204', name: 'Treebo Trend', location: 'Andheri', city: 'Mumbai', rating: 4.1, pricePerNight: 2800, amenities: ['WiFi', 'Breakfast', 'Parking'], roomType: 'Standard Room', availableRooms: 20, imageUrl: 'https://picsum.photos/seed/treebo-mumbai/400/300', distance: '12 km from city center' }
    ],
    'Delhi': [
      { id: 'HTL301', name: 'The Leela Palace', location: 'Chanakyapuri', city: 'Delhi', rating: 4.9, pricePerNight: 16000, amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Bar', 'Concierge'], roomType: 'Royal Suite', availableRooms: 5, imageUrl: 'https://picsum.photos/seed/leela-delhi/400/300', distance: '3 km from city center' },
      { id: 'HTL302', name: 'ITC Maurya', location: 'Diplomatic Enclave', city: 'Delhi', rating: 4.8, pricePerNight: 12000, amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Business Center'], roomType: 'Executive Room', availableRooms: 8, imageUrl: 'https://picsum.photos/seed/itc-maurya/400/300', distance: '4 km from city center' },
      { id: 'HTL303', name: 'Radisson Blu', location: 'Dwarka', city: 'Delhi', rating: 4.5, pricePerNight: 6500, amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant'], roomType: 'Superior Room', availableRooms: 12, imageUrl: 'https://picsum.photos/seed/radisson-delhi/400/300', distance: '8 km from airport' },
      { id: 'HTL304', name: 'Lemon Tree Premier', location: 'Aerocity', city: 'Delhi', rating: 4.3, pricePerNight: 4500, amenities: ['WiFi', 'Restaurant', 'Gym', 'Parking'], roomType: 'Standard Room', availableRooms: 15, imageUrl: 'https://picsum.photos/seed/lemon-delhi/400/300', distance: '2 km from airport' }
    ],
    'Goa': [
      { id: 'HTL401', name: 'Taj Exotica', location: 'Benaulim', city: 'Goa', rating: 4.8, pricePerNight: 12000, amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Bar', 'Beach Access'], roomType: 'Beach Villa', availableRooms: 6, imageUrl: 'https://picsum.photos/seed/taj-goa/400/300', distance: '100m from beach' },
      { id: 'HTL402', name: 'Alila Diwa', location: 'Majorda', city: 'Goa', rating: 4.7, pricePerNight: 10000, amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Beach Access'], roomType: 'Deluxe Room', availableRooms: 8, imageUrl: 'https://picsum.photos/seed/alila-goa/400/300', distance: '200m from beach' },
      { id: 'HTL403', name: 'Novotel Goa', location: 'Candolim', city: 'Goa', rating: 4.5, pricePerNight: 7500, amenities: ['WiFi', 'Pool', 'Restaurant', 'Bar', 'Beach Access'], roomType: 'Superior Room', availableRooms: 10, imageUrl: 'https://picsum.photos/seed/novotel-goa/400/300', distance: '300m from beach' },
      { id: 'HTL404', name: 'Treebo Trend', location: 'Calangute', city: 'Goa', rating: 4.2, pricePerNight: 3200, amenities: ['WiFi', 'Pool', 'Breakfast'], roomType: 'Standard Room', availableRooms: 15, imageUrl: 'https://picsum.photos/seed/treebo-goa/400/300', distance: '500m from beach' }
    ]
  };
  
  searchHotels(city: string, checkIn: string, checkOut: string): Observable<Hotel[]> {
    // Normalize city name
    const normalize = (s: string) => s.trim().toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
    const normCity = normalize(city);

    let hotels = this.hotelDatabase[normCity] || [];
    
    // If no hotels found for city, return generic hotels
    if (hotels.length === 0) {
      hotels = [
        { id: 'HTL999', name: `${normCity} Grand Hotel`, location: 'City Center', city: normCity, rating: 4.5, pricePerNight: 5000, amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant'], roomType: 'Deluxe Room', availableRooms: 10, imageUrl: 'https://picsum.photos/seed/hotel-generic/400/300', distance: '2 km from city center' },
        { id: 'HTL998', name: `${normCity} Comfort Inn`, location: 'Downtown', city: normCity, rating: 4.2, pricePerNight: 3500, amenities: ['WiFi', 'Restaurant', 'Parking'], roomType: 'Standard Room', availableRooms: 15, imageUrl: 'https://picsum.photos/seed/hotel-generic2/400/300', distance: '3 km from city center' },
        { id: 'HTL997', name: `${normCity} Heritage Resort`, location: 'Old Town', city: normCity, rating: 4.7, pricePerNight: 7500, amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Bar'], roomType: 'Premium Room', availableRooms: 6, imageUrl: 'https://picsum.photos/seed/hotel-generic3/400/300', distance: '1 km from city center' },
        { id: 'HTL996', name: `${normCity} Budget Stay`, location: 'Near Station', city: normCity, rating: 4.0, pricePerNight: 2200, amenities: ['WiFi', 'AC', 'Parking'], roomType: 'Standard Room', availableRooms: 20, imageUrl: 'https://picsum.photos/seed/hotel-generic4/400/300', distance: '5 km from city center' }
      ];
    }
    
    return of(hotels).pipe(delay(800));
  }
}
