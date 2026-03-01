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
  
  searchHotels(city: string, checkIn: string, checkOut: string): Observable<Hotel[]> {
    const mockHotels: Hotel[] = [
      {
        id: 'HTL001',
        name: 'Taj Bangalore',
        location: 'MG Road',
        city: city || 'Bangalore',
        rating: 4.8,
        pricePerNight: 8500,
        amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Bar', 'Room Service'],
        roomType: 'Deluxe Room',
        availableRooms: 5,
        imageUrl: 'https://picsum.photos/seed/taj-bangalore/400/300',
        distance: '2 km from city center'
      },
      {
        id: 'HTL002',
        name: 'ITC Gardenia',
        location: 'Residency Road',
        city: city || 'Bangalore',
        rating: 4.7,
        pricePerNight: 7800,
        amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Business Center'],
        roomType: 'Executive Room',
        availableRooms: 8,
        imageUrl: 'https://picsum.photos/seed/itc-gardenia/400/300',
        distance: '1.5 km from city center'
      },
      {
        id: 'HTL003',
        name: 'The Oberoi',
        location: 'MG Road',
        city: city || 'Bangalore',
        rating: 4.9,
        pricePerNight: 12000,
        amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Bar', 'Concierge', 'Valet'],
        roomType: 'Premier Room',
        availableRooms: 3,
        imageUrl: 'https://picsum.photos/seed/oberoi-bangalore/400/300',
        distance: '1 km from city center'
      },
      {
        id: 'HTL004',
        name: 'Lemon Tree Hotel',
        location: 'Electronic City',
        city: city || 'Bangalore',
        rating: 4.2,
        pricePerNight: 3500,
        amenities: ['WiFi', 'Restaurant', 'Gym', 'Parking'],
        roomType: 'Standard Room',
        availableRooms: 15,
        imageUrl: 'https://picsum.photos/seed/lemon-tree/400/300',
        distance: '8 km from city center'
      },
      {
        id: 'HTL005',
        name: 'Radisson Blu',
        location: 'Marathahalli',
        city: city || 'Bangalore',
        rating: 4.5,
        pricePerNight: 5500,
        amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Bar', 'Spa'],
        roomType: 'Superior Room',
        availableRooms: 10,
        imageUrl: 'https://picsum.photos/seed/radisson-blu/400/300',
        distance: '5 km from city center'
      },
      {
        id: 'HTL006',
        name: 'Treebo Trend',
        location: 'Koramangala',
        city: city || 'Bangalore',
        rating: 4.0,
        pricePerNight: 2200,
        amenities: ['WiFi', 'Breakfast', 'Parking'],
        roomType: 'Standard Room',
        availableRooms: 20,
        imageUrl: 'https://picsum.photos/seed/treebo-trend/400/300',
        distance: '4 km from city center'
      }
    ];

    return of(mockHotels).pipe(delay(800));
  }
}
