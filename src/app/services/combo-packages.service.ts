// Service for managing combo travel packages
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ComboPackage } from '../models/destination.model';

@Injectable({
  providedIn: 'root'
})
export class ComboPackagesService {
  
  private comboPackages: ComboPackage[] = [
    {
      id: 'combo-1',
      name: 'Golden Triangle Tour',
      destinations: ['Delhi', 'Agra', 'Jaipur'],
      totalDuration: '7 days',
      originalPrice: 2100,
      comboPrice: 1499,
      savings: 601,
      includes: ['Hotels', 'Transport', 'Guided Tours', 'Breakfast'],
      description: 'Experience India\'s most iconic destinations in one amazing journey'
    },
    {
      id: 'combo-2',
      name: 'Kerala Backwaters & Beaches',
      destinations: ['Kochi', 'Alleppey', 'Kovalam'],
      totalDuration: '6 days',
      originalPrice: 1800,
      comboPrice: 1299,
      savings: 501,
      includes: ['Houseboat Stay', 'Beach Resort', 'Ayurvedic Spa', 'All Meals'],
      description: 'Relax in Kerala\'s serene backwaters and pristine beaches'
    },
    {
      id: 'combo-3',
      name: 'Himalayan Adventure',
      destinations: ['Manali', 'Shimla', 'Dharamshala'],
      totalDuration: '8 days',
      originalPrice: 2400,
      comboPrice: 1699,
      savings: 701,
      includes: ['Mountain Hotels', 'Adventure Activities', 'Trekking Guide', 'Meals'],
      description: 'Explore the majestic Himalayas with thrilling adventures'
    },
    {
      id: 'combo-4',
      name: 'European Highlights',
      destinations: ['Paris', 'Rome', 'Barcelona'],
      totalDuration: '10 days',
      originalPrice: 4500,
      comboPrice: 3299,
      savings: 1201,
      includes: ['4-Star Hotels', 'Inter-city Trains', 'City Tours', 'Breakfast'],
      description: 'Discover Europe\'s most beautiful cities in one trip'
    },
    {
      id: 'combo-5',
      name: 'Southeast Asia Explorer',
      destinations: ['Bangkok', 'Singapore', 'Bali'],
      totalDuration: '12 days',
      originalPrice: 3900,
      comboPrice: 2799,
      savings: 1101,
      includes: ['Luxury Hotels', 'Flights', 'Island Tours', 'All Meals'],
      description: 'Experience the best of Southeast Asia\'s culture and beaches'
    },
    {
      id: 'combo-6',
      name: 'Rajasthan Royal Tour',
      destinations: ['Jaipur', 'Udaipur', 'Jodhpur', 'Jaisalmer'],
      totalDuration: '9 days',
      originalPrice: 2700,
      comboPrice: 1899,
      savings: 801,
      includes: ['Heritage Hotels', 'Desert Safari', 'Palace Tours', 'Cultural Shows'],
      description: 'Live like royalty in Rajasthan\'s magnificent palaces'
    },
    {
      id: 'combo-7',
      name: 'South India Temple Trail',
      destinations: ['Chennai', 'Madurai', 'Kanyakumari', 'Rameshwaram'],
      totalDuration: '7 days',
      originalPrice: 1900,
      comboPrice: 1399,
      savings: 501,
      includes: ['Hotels', 'Temple Guides', 'Transport', 'Breakfast'],
      description: 'Spiritual journey through South India\'s ancient temples'
    },
    {
      id: 'combo-8',
      name: 'Middle East Luxury',
      destinations: ['Dubai', 'Abu Dhabi', 'Doha'],
      totalDuration: '8 days',
      originalPrice: 5200,
      comboPrice: 3899,
      savings: 1301,
      includes: ['5-Star Hotels', 'Desert Safari', 'Burj Khalifa', 'Luxury Dining'],
      description: 'Experience luxury and opulence in the Middle East'
    },
    {
      id: 'combo-9',
      name: 'Goa & Mumbai Getaway',
      destinations: ['Mumbai', 'Goa'],
      totalDuration: '6 days',
      originalPrice: 1600,
      comboPrice: 1199,
      savings: 401,
      includes: ['Beach Resorts', 'City Hotels', 'Water Sports', 'Nightlife Tours'],
      description: 'City excitement meets beach relaxation'
    },
    {
      id: 'combo-10',
      name: 'North East Discovery',
      destinations: ['Guwahati', 'Shillong', 'Kaziranga'],
      totalDuration: '7 days',
      originalPrice: 2100,
      comboPrice: 1599,
      savings: 501,
      includes: ['Hotels', 'Wildlife Safari', 'Trekking', 'Local Cuisine'],
      description: 'Explore India\'s unexplored paradise in the Northeast'
    }
  ];

  constructor() {}

  // Get all combo packages
  getComboPackages(): Observable<ComboPackage[]> {
    return of(this.comboPackages);
  }

  // Get combo package by ID
  getComboPackageById(id: string): Observable<ComboPackage | undefined> {
    const combo = this.comboPackages.find(c => c.id === id);
    return of(combo);
  }

  // Get popular combo packages (first 6)
  getPopularCombos(): Observable<ComboPackage[]> {
    return of(this.comboPackages.slice(0, 6));
  }
}
