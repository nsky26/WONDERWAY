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
  
  private flightDatabase: { [key: string]: Flight[] } = {
    'Hyderabad-Bangalore': [
      { id: 'FL001', airline: 'Air India', flightNumber: 'AI-202', from: 'Hyderabad', to: 'Bangalore', departureTime: '06:00 AM', arrivalTime: '07:15 AM', duration: '1h 15m', price: 3500, availableSeats: 45, class: 'Economy', stops: 0 },
      { id: 'FL002', airline: 'IndiGo', flightNumber: '6E-345', from: 'Hyderabad', to: 'Bangalore', departureTime: '09:30 AM', arrivalTime: '10:45 AM', duration: '1h 15m', price: 3200, availableSeats: 32, class: 'Economy', stops: 0 },
      { id: 'FL003', airline: 'SpiceJet', flightNumber: 'SG-128', from: 'Hyderabad', to: 'Bangalore', departureTime: '12:00 PM', arrivalTime: '01:15 PM', duration: '1h 15m', price: 2900, availableSeats: 28, class: 'Economy', stops: 0 },
      { id: 'FL004', airline: 'Vistara', flightNumber: 'UK-876', from: 'Hyderabad', to: 'Bangalore', departureTime: '03:45 PM', arrivalTime: '05:00 PM', duration: '1h 15m', price: 4200, availableSeats: 18, class: 'Business', stops: 0 },
      { id: 'FL005', airline: 'Air Asia', flightNumber: 'I5-567', from: 'Hyderabad', to: 'Bangalore', departureTime: '06:30 PM', arrivalTime: '07:45 PM', duration: '1h 15m', price: 2700, availableSeats: 52, class: 'Economy', stops: 0 }
    ],
    'Vijayawada-Bangalore': [
      { id: 'FL101', airline: 'IndiGo', flightNumber: '6E-789', from: 'Vijayawada', to: 'Bangalore', departureTime: '07:00 AM', arrivalTime: '08:30 AM', duration: '1h 30m', price: 3800, availableSeats: 40, class: 'Economy', stops: 0 },
      { id: 'FL102', airline: 'Air India', flightNumber: 'AI-456', from: 'Vijayawada', to: 'Bangalore', departureTime: '11:00 AM', arrivalTime: '12:30 PM', duration: '1h 30m', price: 4100, availableSeats: 25, class: 'Economy', stops: 0 },
      { id: 'FL103', airline: 'SpiceJet', flightNumber: 'SG-234', from: 'Vijayawada', to: 'Bangalore', departureTime: '02:00 PM', arrivalTime: '03:30 PM', duration: '1h 30m', price: 3500, availableSeats: 35, class: 'Economy', stops: 0 },
      { id: 'FL104', airline: 'Vistara', flightNumber: 'UK-567', from: 'Vijayawada', to: 'Bangalore', departureTime: '05:30 PM', arrivalTime: '07:00 PM', duration: '1h 30m', price: 4500, availableSeats: 20, class: 'Business', stops: 0 }
    ],
    'Mumbai-Delhi': [
      { id: 'FL201', airline: 'Air India', flightNumber: 'AI-101', from: 'Mumbai', to: 'Delhi', departureTime: '06:30 AM', arrivalTime: '08:45 AM', duration: '2h 15m', price: 4500, availableSeats: 50, class: 'Economy', stops: 0 },
      { id: 'FL202', airline: 'IndiGo', flightNumber: '6E-123', from: 'Mumbai', to: 'Delhi', departureTime: '10:00 AM', arrivalTime: '12:15 PM', duration: '2h 15m', price: 4200, availableSeats: 45, class: 'Economy', stops: 0 },
      { id: 'FL203', airline: 'Vistara', flightNumber: 'UK-234', from: 'Mumbai', to: 'Delhi', departureTime: '01:30 PM', arrivalTime: '03:45 PM', duration: '2h 15m', price: 5500, availableSeats: 30, class: 'Business', stops: 0 },
      { id: 'FL204', airline: 'SpiceJet', flightNumber: 'SG-456', from: 'Mumbai', to: 'Delhi', departureTime: '06:00 PM', arrivalTime: '08:15 PM', duration: '2h 15m', price: 3900, availableSeats: 55, class: 'Economy', stops: 0 }
    ],
    'Chennai-Kolkata': [
      { id: 'FL301', airline: 'IndiGo', flightNumber: '6E-890', from: 'Chennai', to: 'Kolkata', departureTime: '07:30 AM', arrivalTime: '10:00 AM', duration: '2h 30m', price: 4800, availableSeats: 38, class: 'Economy', stops: 0 },
      { id: 'FL302', airline: 'Air India', flightNumber: 'AI-678', from: 'Chennai', to: 'Kolkata', departureTime: '12:00 PM', arrivalTime: '02:30 PM', duration: '2h 30m', price: 5200, availableSeats: 28, class: 'Economy', stops: 0 },
      { id: 'FL303', airline: 'SpiceJet', flightNumber: 'SG-789', from: 'Chennai', to: 'Kolkata', departureTime: '04:00 PM', arrivalTime: '06:30 PM', duration: '2h 30m', price: 4500, availableSeats: 42, class: 'Economy', stops: 0 }
    ],
    'Pune-Goa': [
      { id: 'FL401', airline: 'IndiGo', flightNumber: '6E-456', from: 'Pune', to: 'Goa', departureTime: '08:00 AM', arrivalTime: '09:15 AM', duration: '1h 15m', price: 3200, availableSeats: 48, class: 'Economy', stops: 0 },
      { id: 'FL402', airline: 'Air India', flightNumber: 'AI-789', from: 'Pune', to: 'Goa', departureTime: '01:00 PM', arrivalTime: '02:15 PM', duration: '1h 15m', price: 3500, availableSeats: 35, class: 'Economy', stops: 0 },
      { id: 'FL403', airline: 'SpiceJet', flightNumber: 'SG-901', from: 'Pune', to: 'Goa', departureTime: '05:30 PM', arrivalTime: '06:45 PM', duration: '1h 15m', price: 2900, availableSeats: 52, class: 'Economy', stops: 0 }
    ]
  };

  searchFlights(from: string, to: string, date: string): Observable<Flight[]> {
    // Normalize city names to title case for matching
    const normalize = (s: string) => s.trim().toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
    const normFrom = normalize(from);
    const normTo = normalize(to);

    const routeKey = `${normFrom}-${normTo}`;
    let flights = this.flightDatabase[routeKey] || [];
    
    // If no exact match, try reverse route
    if (flights.length === 0) {
      const reverseKey = `${normTo}-${normFrom}`;
      const reverseFlights = this.flightDatabase[reverseKey];
      if (reverseFlights) {
        flights = reverseFlights.map(f => ({
          ...f,
          id: f.id + '-R',
          from: normTo,
          to: normFrom,
          departureTime: f.arrivalTime,
          arrivalTime: f.departureTime
        }));
      }
    }
    
    // Always return at least generic flights for any route
    if (flights.length === 0) {
      flights = [
        { id: 'FL999', airline: 'IndiGo', flightNumber: '6E-999', from: normFrom, to: normTo, departureTime: '09:00 AM', arrivalTime: '11:00 AM', duration: '2h', price: 4000, availableSeats: 40, class: 'Economy', stops: 0 },
        { id: 'FL998', airline: 'Air India', flightNumber: 'AI-998', from: normFrom, to: normTo, departureTime: '02:00 PM', arrivalTime: '04:00 PM', duration: '2h', price: 4500, availableSeats: 30, class: 'Economy', stops: 0 },
        { id: 'FL997', airline: 'SpiceJet', flightNumber: 'SG-997', from: normFrom, to: normTo, departureTime: '06:30 PM', arrivalTime: '08:30 PM', duration: '2h', price: 3800, availableSeats: 50, class: 'Economy', stops: 0 },
        { id: 'FL996', airline: 'Vistara', flightNumber: 'UK-996', from: normFrom, to: normTo, departureTime: '11:00 AM', arrivalTime: '01:00 PM', duration: '2h', price: 5200, availableSeats: 20, class: 'Business', stops: 0 }
      ];
    }
    
    return of(flights).pipe(delay(800));
  }
}
