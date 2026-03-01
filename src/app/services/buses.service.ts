// Buses service - manages bus search and booking
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Bus {
  id: string;
  operator: string;
  busType: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  availableSeats: number;
  amenities: string[];
  rating: number;
}

@Injectable({
  providedIn: 'root'
})
export class BusesService {
  
  searchBuses(from: string, to: string, date: string): Observable<Bus[]> {
    const mockBuses: Bus[] = [
      {
        id: 'BUS001',
        operator: 'VRL Travels',
        busType: 'AC Sleeper',
        from: from || 'Hyderabad',
        to: to || 'Bangalore',
        departureTime: '08:00 PM',
        arrivalTime: '06:00 AM',
        duration: '10h',
        price: 1200,
        availableSeats: 15,
        amenities: ['WiFi', 'Charging Point', 'Water Bottle', 'Blanket'],
        rating: 4.5
      },
      {
        id: 'BUS002',
        operator: 'Orange Travels',
        busType: 'Volvo Multi-Axle',
        from: from || 'Hyderabad',
        to: to || 'Bangalore',
        departureTime: '09:30 PM',
        arrivalTime: '07:30 AM',
        duration: '10h',
        price: 1400,
        availableSeats: 8,
        amenities: ['WiFi', 'Charging Point', 'Snacks', 'Blanket', 'Pillow'],
        rating: 4.7
      },
      {
        id: 'BUS003',
        operator: 'SRS Travels',
        busType: 'AC Seater',
        from: from || 'Hyderabad',
        to: to || 'Bangalore',
        departureTime: '06:00 AM',
        arrivalTime: '04:00 PM',
        duration: '10h',
        price: 800,
        availableSeats: 22,
        amenities: ['Charging Point', 'Water Bottle'],
        rating: 4.2
      },
      {
        id: 'BUS004',
        operator: 'Jabbar Travels',
        busType: 'Volvo AC Sleeper',
        from: from || 'Hyderabad',
        to: to || 'Bangalore',
        departureTime: '10:00 PM',
        arrivalTime: '08:00 AM',
        duration: '10h',
        price: 1350,
        availableSeats: 12,
        amenities: ['WiFi', 'Charging Point', 'Water Bottle', 'Blanket'],
        rating: 4.6
      },
      {
        id: 'BUS005',
        operator: 'Kaveri Travels',
        busType: 'AC Semi-Sleeper',
        from: from || 'Hyderabad',
        to: to || 'Bangalore',
        departureTime: '11:00 PM',
        arrivalTime: '09:00 AM',
        duration: '10h',
        price: 950,
        availableSeats: 18,
        amenities: ['Charging Point', 'Water Bottle', 'Blanket'],
        rating: 4.3
      }
    ];

    return of(mockBuses).pipe(delay(800));
  }
}
