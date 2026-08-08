// Enhanced Buses service with comprehensive route database
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
  
  private busDatabase: { [key: string]: Bus[] } = {
    'Hyderabad-Bangalore': [
      { id: 'BUS001', operator: 'VRL Travels', busType: 'AC Sleeper', from: 'Hyderabad', to: 'Bangalore', departureTime: '08:00 PM', arrivalTime: '06:00 AM', duration: '10h', price: 1200, availableSeats: 15, amenities: ['WiFi', 'Charging Point', 'Water Bottle', 'Blanket'], rating: 4.5 },
      { id: 'BUS002', operator: 'Orange Travels', busType: 'Volvo Multi-Axle', from: 'Hyderabad', to: 'Bangalore', departureTime: '09:30 PM', arrivalTime: '07:30 AM', duration: '10h', price: 1400, availableSeats: 8, amenities: ['WiFi', 'Charging Point', 'Snacks', 'Blanket', 'Pillow'], rating: 4.7 },
      { id: 'BUS003', operator: 'SRS Travels', busType: 'AC Seater', from: 'Hyderabad', to: 'Bangalore', departureTime: '06:00 AM', arrivalTime: '04:00 PM', duration: '10h', price: 800, availableSeats: 22, amenities: ['Charging Point', 'Water Bottle'], rating: 4.2 },
      { id: 'BUS004', operator: 'Jabbar Travels', busType: 'Volvo AC Sleeper', from: 'Hyderabad', to: 'Bangalore', departureTime: '10:00 PM', arrivalTime: '08:00 AM', duration: '10h', price: 1350, availableSeats: 12, amenities: ['WiFi', 'Charging Point', 'Water Bottle', 'Blanket'], rating: 4.6 }
    ],
    'Vijayawada-Bangalore': [
      { id: 'BUS101', operator: 'VRL Travels', busType: 'AC Sleeper', from: 'Vijayawada', to: 'Bangalore', departureTime: '07:00 PM', arrivalTime: '06:00 AM', duration: '11h', price: 1300, availableSeats: 18, amenities: ['WiFi', 'Charging Point', 'Water Bottle', 'Blanket'], rating: 4.6 },
      { id: 'BUS102', operator: 'Orange Travels', busType: 'Volvo Multi-Axle', from: 'Vijayawada', to: 'Bangalore', departureTime: '08:30 PM', arrivalTime: '07:30 AM', duration: '11h', price: 1500, availableSeats: 10, amenities: ['WiFi', 'Charging Point', 'Snacks', 'Blanket', 'Pillow'], rating: 4.8 },
      { id: 'BUS103', operator: 'SRS Travels', busType: 'AC Seater', from: 'Vijayawada', to: 'Bangalore', departureTime: '05:00 AM', arrivalTime: '04:00 PM', duration: '11h', price: 900, availableSeats: 25, amenities: ['Charging Point', 'Water Bottle'], rating: 4.3 }
    ],
    'Mumbai-Pune': [
      { id: 'BUS201', operator: 'Shivneri', busType: 'AC Seater', from: 'Mumbai', to: 'Pune', departureTime: '06:00 AM', arrivalTime: '09:30 AM', duration: '3h 30m', price: 400, availableSeats: 30, amenities: ['AC', 'Comfortable Seats'], rating: 4.4 },
      { id: 'BUS202', operator: 'VRL Travels', busType: 'AC Sleeper', from: 'Mumbai', to: 'Pune', departureTime: '11:00 PM', arrivalTime: '02:30 AM', duration: '3h 30m', price: 600, availableSeats: 20, amenities: ['WiFi', 'Charging Point', 'Blanket'], rating: 4.5 },
      { id: 'BUS203', operator: 'Orange Travels', busType: 'Volvo AC', from: 'Mumbai', to: 'Pune', departureTime: '02:00 PM', arrivalTime: '05:30 PM', duration: '3h 30m', price: 500, availableSeats: 25, amenities: ['WiFi', 'Charging Point'], rating: 4.6 }
    ],
    'Chennai-Bangalore': [
      { id: 'BUS301', operator: 'KPN Travels', busType: 'AC Sleeper', from: 'Chennai', to: 'Bangalore', departureTime: '09:00 PM', arrivalTime: '05:00 AM', duration: '8h', price: 1100, availableSeats: 16, amenities: ['WiFi', 'Charging Point', 'Water Bottle', 'Blanket'], rating: 4.5 },
      { id: 'BUS302', operator: 'SRS Travels', busType: 'Volvo Multi-Axle', from: 'Chennai', to: 'Bangalore', departureTime: '10:30 PM', arrivalTime: '06:30 AM', duration: '8h', price: 1300, availableSeats: 12, amenities: ['WiFi', 'Charging Point', 'Snacks', 'Blanket'], rating: 4.7 },
      { id: 'BUS303', operator: 'VRL Travels', busType: 'AC Seater', from: 'Chennai', to: 'Bangalore', departureTime: '06:30 AM', arrivalTime: '02:30 PM', duration: '8h', price: 750, availableSeats: 28, amenities: ['Charging Point', 'Water Bottle'], rating: 4.3 }
    ]
  };
  
  searchBuses(from: string, to: string, date: string): Observable<Bus[]> {
    const routeKey = `${from}-${to}`;
    let buses = this.busDatabase[routeKey] || [];
    
    // Try reverse route
    if (buses.length === 0) {
      const reverseKey = `${to}-${from}`;
      const reverseBuses = this.busDatabase[reverseKey];
      if (reverseBuses) {
        buses = reverseBuses.map(b => ({
          ...b,
          id: b.id + '-R',
          from: to,
          to: from,
          departureTime: b.arrivalTime,
          arrivalTime: b.departureTime
        }));
      }
    }
    
    // Generic buses if no match
    if (buses.length === 0) {
      buses = [
        { id: 'BUS999', operator: 'VRL Travels', busType: 'AC Sleeper', from, to, departureTime: '09:00 PM', arrivalTime: '07:00 AM', duration: '10h', price: 1200, availableSeats: 15, amenities: ['WiFi', 'Charging Point', 'Blanket'], rating: 4.5 },
        { id: 'BUS998', operator: 'Orange Travels', busType: 'Volvo AC', from, to, departureTime: '10:30 PM', arrivalTime: '08:30 AM', duration: '10h', price: 1400, availableSeats: 10, amenities: ['WiFi', 'Charging Point', 'Snacks', 'Blanket'], rating: 4.6 }
      ];
    }
    
    return of(buses).pipe(delay(150));
  }
}
