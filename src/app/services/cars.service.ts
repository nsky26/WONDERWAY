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
      },
      {
        id: 'CAR006',
        model: 'Fortuner',
        brand: 'Toyota',
        type: 'SUV',
        seats: 7,
        transmission: 'Automatic',
        fuelType: 'Diesel',
        pricePerDay: 4500,
        available: true,
        features: ['AC', 'Music System', 'GPS', 'Leather Seats', '4WD', 'Sunroof'],
        imageUrl: 'https://picsum.photos/seed/fortuner/400/300',
        rating: 4.8
      },
      {
        id: 'CAR007',
        model: 'Baleno',
        brand: 'Maruti Suzuki',
        type: 'Hatchback',
        seats: 5,
        transmission: 'Manual',
        fuelType: 'Petrol',
        pricePerDay: 1500,
        available: true,
        features: ['AC', 'Music System', 'GPS'],
        imageUrl: 'https://picsum.photos/seed/baleno/400/300',
        rating: 4.1
      },
      {
        id: 'CAR008',
        model: 'XUV700',
        brand: 'Mahindra',
        type: 'SUV',
        seats: 7,
        transmission: 'Automatic',
        fuelType: 'Diesel',
        pricePerDay: 3800,
        available: true,
        features: ['AC', 'Music System', 'GPS', 'Sunroof', 'Leather Seats', 'ADAS'],
        imageUrl: 'https://picsum.photos/seed/xuv700/400/300',
        rating: 4.5
      },
      {
        id: 'CAR009',
        model: 'Thar',
        brand: 'Mahindra',
        type: 'SUV',
        seats: 4,
        transmission: 'Manual',
        fuelType: 'Diesel',
        pricePerDay: 3000,
        available: true,
        features: ['AC', 'Music System', 'GPS', '4WD', 'Convertible'],
        imageUrl: 'https://picsum.photos/seed/thar/400/300',
        rating: 4.4
      },
      {
        id: 'CAR010',
        model: 'Verna',
        brand: 'Hyundai',
        type: 'Sedan',
        seats: 5,
        transmission: 'Automatic',
        fuelType: 'Petrol',
        pricePerDay: 2800,
        available: true,
        features: ['AC', 'Music System', 'GPS', 'Sunroof', 'Ventilated Seats'],
        imageUrl: 'https://picsum.photos/seed/verna/400/300',
        rating: 4.3
      },
      {
        id: 'CAR011',
        model: 'Scorpio-N',
        brand: 'Mahindra',
        type: 'SUV',
        seats: 7,
        transmission: 'Manual',
        fuelType: 'Diesel',
        pricePerDay: 3500,
        available: true,
        features: ['AC', 'Music System', 'GPS', 'Sunroof', '4WD'],
        imageUrl: 'https://picsum.photos/seed/scorpio/400/300',
        rating: 4.6
      },
      {
        id: 'CAR012',
        model: 'i20',
        brand: 'Hyundai',
        type: 'Hatchback',
        seats: 5,
        transmission: 'Manual',
        fuelType: 'Petrol',
        pricePerDay: 1400,
        available: true,
        features: ['AC', 'Music System', 'GPS'],
        imageUrl: 'https://picsum.photos/seed/i20/400/300',
        rating: 4.2
      }
    ];

    return of(mockCars).pipe(delay(150));
  }
}
