// Service for managing offers data
import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Offer } from '../models/offer.model';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  
  // Mock data for offers
  private mockOffers: Offer[] = [
    {
      id: '1',
      title: 'Bali Beach Escape',
      description: 'Save 40% on luxury beach resorts in Bali',
      imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600',
      discount: 40,
      originalPrice: 2199,
      discountedPrice: 1319,
      validUntil: '2026-03-31',
      destination: 'Bali, Indonesia',
      type: 'package'
    },
    {
      id: '2',
      title: 'Paris City Break',
      description: 'Exclusive 30% off on Paris hotels',
      imageUrl: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?w=600',
      discount: 30,
      originalPrice: 1599,
      discountedPrice: 1119,
      validUntil: '2026-04-15',
      destination: 'Paris, France',
      type: 'hotel'
    },
    {
      id: '3',
      title: 'Maldives Luxury Deal',
      description: 'Up to 50% off on overwater villas',
      imageUrl: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600',
      discount: 50,
      originalPrice: 3999,
      discountedPrice: 1999,
      validUntil: '2026-05-30',
      destination: 'Maldives',
      type: 'package'
    },
    {
      id: '4',
      title: 'Tokyo Flight Special',
      description: 'Round-trip flights to Tokyo at 35% off',
      imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600',
      discount: 35,
      originalPrice: 1299,
      discountedPrice: 844,
      validUntil: '2026-03-20',
      destination: 'Tokyo, Japan',
      type: 'flight'
    },
    {
      id: '5',
      title: 'Santorini Romance',
      description: 'Romantic getaway package with 45% savings',
      imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600',
      discount: 45,
      originalPrice: 2499,
      discountedPrice: 1374,
      validUntil: '2026-06-30',
      destination: 'Santorini, Greece',
      type: 'package'
    }
  ];

  constructor() { }

  // Get all offers with simulated delay
  getOffers(): Observable<Offer[]> {
    return of(this.mockOffers).pipe(delay(500));
  }

  // Get offer by ID
  getOfferById(id: string): Observable<Offer | undefined> {
    const offer = this.mockOffers.find(o => o.id === id);
    return of(offer).pipe(delay(300));
  }
}
