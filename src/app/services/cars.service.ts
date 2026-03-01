// Cars service - manages car rental search and booking
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Car {
  id: string;
  model: string;
  brand: string;
  type: string;
  seats: number;
  transmission: 'Manual' | 'Automatic';
  fuelType: string;
  pricePerDay: number;
  available: boolean;
  features: string[];
  imageUrl: string;
  rating: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  
  searchCars(location: string, date: string): Observable<Car[]> {
    const mockCars: Car[] = [
      {
        id: 'CAR001',
        model: 'Swift Dzire',
        brand: 'Maruti Suzuki',
        type: 'Sedan',
        seats: 5,
        transmission: 'Manual',
        fuelType: 'Petrol',
        pricePerDay: 1800,
        available: true,
        features: ['AC', 'Music System', 'GPS'],
        imageUrl: 'https://picsum.photos/seed/swift-dzire/400/300',
        rating: 4.3
      },
      {
        id: 'CAR002',
        model: 'Innova Crysta',
        brand: 'Toyota',
        type: 'SUV',
        seats: 7,
        transmission: 'Automatic',
        fuelType: 'Diesel',
        pricePerDay: 3500,
        available: true,
        features: ['AC', 'Music System', 'GPS', 'Leather Seats'],
        imageUrl: 'https://picsum.photos/seed/innova-crysta/400/300',
        rating: 4.7
      },
      {
        id: 'CAR003',
        model: 'City',
        brand: 'Honda',
        type: 'Sedan',
        seats: 5,
        transmission: 'Automatic',
        fuelType: 'Petrol',
        pricePerDay: 2500,
        available: true,
        features: ['AC', 'Music System', 'GPS', 'Sunroof'],
        imageUrl: 'https://picsum.photos/seed/honda-city/400/300',
        rating: 4.5
      },
      {
        id: 'CAR004',
        model: 'Ertiga',
        brand: 'Maruti Suzuki',
        type: 'MUV',
        seats: 7,
        transmission: 'Manual',
        fuelType: 'Petrol',
        pricePerDay: 2200,
        available: true,
        features: ['AC', 'Music System', 'GPS'],
        imageUrl: 'https://picsum.photos/seed/ertiga/400/300',
        rating: 4.2
      },
      {
        id: 'CAR005',
        model: 'Creta',
        brand: 'Hyundai',
        type: 'SUV',
        seats: 5,
        transmission: 'Automatic',
        fuelType: 'Diesel',
        pricePerDay: 3200,
        available: true,
        features: ['AC', 'Music System', 'GPS', 'Sunroof', 'Leather Seats'],
        imageUrl: 'https://picsum.photos/seed/creta/400/300',
        rating: 4.6
      }
    ];

    return of(mockCars).pipe(delay(800));
  }
}
