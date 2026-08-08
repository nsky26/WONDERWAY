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
      { id: 'HTL001', name: 'Taj Bangalore', location: 'MG Road', city: 'Bangalore', rating: 4.8, pricePerNight: 8500, amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Bar', 'Room Service'], roomType: 'Deluxe Room', availableRooms: 5, imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop', distance: '2 km from city center' },
      { id: 'HTL002', name: 'ITC Gardenia', location: 'Residency Road', city: 'Bangalore', rating: 4.7, pricePerNight: 7800, amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Business Center'], roomType: 'Executive Room', availableRooms: 8, imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop', distance: '1.5 km from city center' },
      { id: 'HTL003', name: 'The Oberoi', location: 'MG Road', city: 'Bangalore', rating: 4.9, pricePerNight: 12000, amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Bar', 'Concierge', 'Valet'], roomType: 'Premier Room', availableRooms: 3, imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop', distance: '1 km from city center' },
      { id: 'HTL004', name: 'Lemon Tree Hotel', location: 'Electronic City', city: 'Bangalore', rating: 4.2, pricePerNight: 3500, amenities: ['WiFi', 'Restaurant', 'Gym', 'Parking'], roomType: 'Standard Room', availableRooms: 15, imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&h=300&fit=crop', distance: '8 km from city center' },
      { id: 'HTL005', name: 'Radisson Blu', location: 'Marathahalli', city: 'Bangalore', rating: 4.5, pricePerNight: 5500, amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Bar', 'Spa'], roomType: 'Superior Room', availableRooms: 10, imageUrl: 'https://images.unsplash.com/photo-1571896429818-0e7b8d2b1a4a?w=400&h=300&fit=crop', distance: '5 km from city center' }
    ],
    'Hyderabad': [
      { id: 'HTL101', name: 'Taj Falaknuma Palace', location: 'Falaknuma', city: 'Hyderabad', rating: 4.9, pricePerNight: 15000, amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Bar', 'Heritage Property'], roomType: 'Royal Suite', availableRooms: 3, imageUrl: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&h=300&fit=crop', distance: '5 km from city center' },
      { id: 'HTL102', name: 'ITC Kakatiya', location: 'Begumpet', city: 'Hyderabad', rating: 4.7, pricePerNight: 7500, amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Business Center'], roomType: 'Executive Room', availableRooms: 10, imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop', distance: '3 km from city center' },
      { id: 'HTL103', name: 'Novotel Hyderabad', location: 'HITEC City', city: 'Hyderabad', rating: 4.5, pricePerNight: 6000, amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Bar'], roomType: 'Superior Room', availableRooms: 12, imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c7fe5fbc?w=400&h=300&fit=crop', distance: '8 km from city center' },
      { id: 'HTL104', name: 'Lemon Tree Hotel', location: 'Gachibowli', city: 'Hyderabad', rating: 4.2, pricePerNight: 3800, amenities: ['WiFi', 'Restaurant', 'Gym', 'Parking'], roomType: 'Standard Room', availableRooms: 18, imageUrl: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=400&h=300&fit=crop', distance: '10 km from city center' }
    ],
    'Mumbai': [
      { id: 'HTL201', name: 'Taj Mahal Palace', location: 'Colaba', city: 'Mumbai', rating: 4.9, pricePerNight: 18000, amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Bar', 'Heritage Property', 'Sea View'], roomType: 'Luxury Suite', availableRooms: 4, imageUrl: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&h=300&fit=crop', distance: '1 km from Gateway of India' },
      { id: 'HTL202', name: 'The Oberoi Mumbai', location: 'Nariman Point', city: 'Mumbai', rating: 4.8, pricePerNight: 14000, amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Bar', 'Sea View'], roomType: 'Premier Room', availableRooms: 6, imageUrl: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop', distance: '2 km from city center' },
      { id: 'HTL203', name: 'ITC Grand Central', location: 'Parel', city: 'Mumbai', rating: 4.6, pricePerNight: 8500, amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant'], roomType: 'Executive Room', availableRooms: 10, imageUrl: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=400&h=300&fit=crop', distance: '5 km from city center' },
      { id: 'HTL204', name: 'Treebo Trend', location: 'Andheri', city: 'Mumbai', rating: 4.1, pricePerNight: 2800, amenities: ['WiFi', 'Breakfast', 'Parking'], roomType: 'Standard Room', availableRooms: 20, imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop', distance: '12 km from city center' }
    ],
    'Delhi': [
      { id: 'HTL301', name: 'The Leela Palace', location: 'Chanakyapuri', city: 'Delhi', rating: 4.9, pricePerNight: 16000, amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Bar', 'Concierge'], roomType: 'Royal Suite', availableRooms: 5, imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop', distance: '3 km from city center' },
      { id: 'HTL302', name: 'ITC Maurya', location: 'Diplomatic Enclave', city: 'Delhi', rating: 4.8, pricePerNight: 12000, amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Business Center'], roomType: 'Executive Room', availableRooms: 8, imageUrl: 'https://images.unsplash.com/photo-1590490360182-c7d3d6d9a1df?w=400&h=300&fit=crop', distance: '4 km from city center' },
      { id: 'HTL303', name: 'Radisson Blu', location: 'Dwarka', city: 'Delhi', rating: 4.5, pricePerNight: 6500, amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant'], roomType: 'Superior Room', availableRooms: 12, imageUrl: 'https://images.unsplash.com/photo-1615460549969-36fa19521a4f?w=400&h=300&fit=crop', distance: '8 km from airport' },
      { id: 'HTL304', name: 'Lemon Tree Premier', location: 'Aerocity', city: 'Delhi', rating: 4.3, pricePerNight: 4500, amenities: ['WiFi', 'Restaurant', 'Gym', 'Parking'], roomType: 'Standard Room', availableRooms: 15, imageUrl: 'https://images.unsplash.com/photo-1595576508838-758a06e5e8a2?w=400&h=300&fit=crop', distance: '2 km from airport' }
    ],
    'Goa': [
      { id: 'HTL401', name: 'Taj Exotica', location: 'Benaulim', city: 'Goa', rating: 4.8, pricePerNight: 12000, amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Bar', 'Beach Access'], roomType: 'Beach Villa', availableRooms: 6, imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop', distance: '100m from beach' },
      { id: 'HTL402', name: 'Alila Diwa', location: 'Majorda', city: 'Goa', rating: 4.7, pricePerNight: 10000, amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Beach Access'], roomType: 'Deluxe Room', availableRooms: 8, imageUrl: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400&h=300&fit=crop', distance: '200m from beach' },
      { id: 'HTL403', name: 'Novotel Goa', location: 'Candolim', city: 'Goa', rating: 4.5, pricePerNight: 7500, amenities: ['WiFi', 'Pool', 'Restaurant', 'Bar', 'Beach Access'], roomType: 'Superior Room', availableRooms: 10, imageUrl: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop', distance: '300m from beach' },
      { id: 'HTL404', name: 'Treebo Trend', location: 'Calangute', city: 'Goa', rating: 4.2, pricePerNight: 3200, amenities: ['WiFi', 'Pool', 'Breakfast'], roomType: 'Standard Room', availableRooms: 15, imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop', distance: '500m from beach' }
    ],
    'Chennai': [
      { id: 'HTL501', name: 'Taj Coromandel', location: 'Nungambakkam', city: 'Chennai', rating: 4.8, pricePerNight: 9000, amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Bar'], roomType: 'Luxury Room', availableRooms: 8, imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop', distance: '2 km from city center' },
      { id: 'HTL502', name: 'ITC Grand Chola', location: 'Mount Road', city: 'Chennai', rating: 4.9, pricePerNight: 11000, amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Bar', 'Heritage Property'], roomType: 'Premium Room', availableRooms: 6, imageUrl: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&h=300&fit=crop', distance: '1 km from city center' },
      { id: 'HTL503', name: 'Leela Palace', location: 'MRC Nagar', city: 'Chennai', rating: 4.7, pricePerNight: 8500, amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant'], roomType: 'Deluxe Room', availableRooms: 10, imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop', distance: '3 km from city center' },
      { id: 'HTL504', name: 'Hyatt Regency', location: 'Anna Salai', city: 'Chennai', rating: 4.5, pricePerNight: 6000, amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Bar'], roomType: 'Superior Room', availableRooms: 12, imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c7fe5fbc?w=400&h=300&fit=crop', distance: '4 km from city center' }
    ],
    'Kolkata': [
      { id: 'HTL601', name: 'Taj Bengal', location: 'Alipore', city: 'Kolkata', rating: 4.8, pricePerNight: 9500, amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Bar'], roomType: 'Luxury Room', availableRooms: 7, imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop', distance: '2 km from city center' },
      { id: 'HTL602', name: 'The Oberoi Grand', location: 'Chowringhee', city: 'Kolkata', rating: 4.7, pricePerNight: 8000, amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Heritage Property'], roomType: 'Premier Room', availableRooms: 9, imageUrl: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=400&h=300&fit=crop', distance: '500m from city center' },
      { id: 'HTL603', name: 'ITC Royal Bengal', location: 'Science City', city: 'Kolkata', rating: 4.9, pricePerNight: 12000, amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Bar'], roomType: 'Royal Suite', availableRooms: 5, imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop', distance: '3 km from city center' },
      { id: 'HTL604', name: 'JW Marriott', location: 'Salt Lake', city: 'Kolkata', rating: 4.6, pricePerNight: 7000, amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Bar'], roomType: 'Deluxe Room', availableRooms: 11, imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop', distance: '5 km from city center' }
    ],
    'Jaipur': [
      { id: 'HTL701', name: 'Rambagh Palace', location: 'Bhawani Singh Road', city: 'Jaipur', rating: 4.9, pricePerNight: 18000, amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Bar', 'Heritage Property'], roomType: 'Royal Suite', availableRooms: 4, imageUrl: 'https://images.unsplash.com/photo-1590490360182-c7d3d6d9a1df?w=400&h=300&fit=crop', distance: '1 km from city center' },
      { id: 'HTL702', name: 'Taj Jai Mahal Palace', location: 'Civil Lines', city: 'Jaipur', rating: 4.8, pricePerNight: 14000, amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Heritage Property'], roomType: 'Palace Room', availableRooms: 6, imageUrl: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&h=300&fit=crop', distance: '2 km from city center' },
      { id: 'HTL703', name: 'ITC Rajputana', location: 'Palace Road', city: 'Jaipur', rating: 4.6, pricePerNight: 8000, amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant'], roomType: 'Executive Room', availableRooms: 10, imageUrl: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400&h=300&fit=crop', distance: '1.5 km from city center' },
      { id: 'HTL704', name: 'Hawa Mahal Hotel', location: 'Old City', city: 'Jaipur', rating: 4.3, pricePerNight: 4500, amenities: ['WiFi', 'Restaurant', 'Rooftop'], roomType: 'Standard Room', availableRooms: 15, imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&h=300&fit=crop', distance: '500m from Hawa Mahal' }
    ],
    'Udaipur': [
      { id: 'HTL801', name: 'Taj Lake Palace', location: 'Lake Pichola', city: 'Udaipur', rating: 5.0, pricePerNight: 25000, amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Bar', 'Lake View', 'Heritage Property'], roomType: 'Royal Suite', availableRooms: 3, imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop', distance: 'On the lake' },
      { id: 'HTL802', name: 'The Leela Palace', location: 'Lake Pichola', city: 'Udaipur', rating: 4.9, pricePerNight: 18000, amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Bar', 'Lake View'], roomType: 'Lake View Room', availableRooms: 5, imageUrl: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop', distance: 'Lakefront' },
      { id: 'HTL803', name: 'Oberoi Udaivilas', location: 'Lake Pichola', city: 'Udaipur', rating: 4.9, pricePerNight: 22000, amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Bar', 'Lake View'], roomType: 'Premier Room', availableRooms: 4, imageUrl: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&h=300&fit=crop', distance: 'Lakefront' },
      { id: 'HTL804', name: 'Jagat Niwas Palace', location: 'Old City', city: 'Udaipur', rating: 4.4, pricePerNight: 5500, amenities: ['WiFi', 'Restaurant', 'Lake View'], roomType: 'Heritage Room', availableRooms: 8, imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop', distance: '100m from lake' }
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
    
    return of(hotels).pipe(delay(150));
  }
}
