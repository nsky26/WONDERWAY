// Flights service - manages flight search and booking
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  availableSeats: number;
  class: 'Economy' | 'Business' | 'First';
  stops: number;
}

@Injectable({
  providedIn: 'root'
})
export class FlightsService {
  
  searchFlights(from: string, to: string, date: string): Observable<Flight[]> {
    // Simulate API call with mock data
    const mockFlights: Flight[] = [
      {
        id: 'FL001',
        airline: 'Air India',
        flightNumber: 'AI-202',
        from: from || 'Hyderabad',
        to: to || 'Bangalore',
        departureTime: '06:00 AM',
        arrivalTime: '07:15 AM',
        duration: '1h 15m',
        price: 3500,
        availableSeats: 45,
        class: 'Economy',
        stops: 0
      },
      {
        id: 'FL002',
        airline: 'IndiGo',
        flightNumber: '6E-345',
        from: from || 'Hyderabad',
        to: to || 'Bangalore',
        departureTime: '09:30 AM',
        arrivalTime: '10:45 AM',
        duration: '1h 15m',
        price: 3200,
        availableSeats: 32,
        class: 'Economy',
        stops: 0
      },
      {
        id: 'FL003',
        airline: 'SpiceJet',
        flightNumber: 'SG-128',
        from: from || 'Hyderabad',
        to: to || 'Bangalore',
        departureTime: '12:00 PM',
        arrivalTime: '01:15 PM',
        duration: '1h 15m',
        price: 2900,
        availableSeats: 28,
        class: 'Economy',
        stops: 0
      },
      {
        id: 'FL004',
        airline: 'Vistara',
        flightNumber: 'UK-876',
        from: from || 'Hyderabad',
        to: to || 'Bangalore',
        departureTime: '03:45 PM',
        arrivalTime: '05:00 PM',
        duration: '1h 15m',
        price: 4200,
        availableSeats: 18,
        class: 'Business',
        stops: 0
      },
      {
        id: 'FL005',
        airline: 'Air Asia',
        flightNumber: 'I5-567',
        from: from || 'Hyderabad',
        to: to || 'Bangalore',
        departureTime: '06:30 PM',
        arrivalTime: '07:45 PM',
        duration: '1h 15m',
        price: 2700,
        availableSeats: 52,
        class: 'Economy',
        stops: 0
      }
    ];

    return of(mockFlights).pipe(delay(800));
  }
}
