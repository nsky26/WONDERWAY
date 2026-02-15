// Service for managing destination data
import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Destination } from '../models/destination.model';

@Injectable({
  providedIn: 'root'
})
export class DestinationsService {
  
  // Mock data for destinations
  private mockDestinations: Destination[] = [
    {
      id: '1',
      name: 'Bali',
      country: 'Indonesia',
      description: 'Experience the magic of Bali with its stunning beaches, ancient temples, and vibrant culture. From the rice terraces of Ubud to the beaches of Seminyak, Bali offers a perfect blend of relaxation and adventure.',
      shortDescription: 'Tropical paradise with beaches and temples',
      imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
      price: 1299,
      rating: 4.8,
      reviews: 2456,
      isPopular: true,
      highlights: ['Beautiful beaches', 'Ancient temples', 'Rice terraces', 'Surfing'],
      bestTimeToVisit: 'April to October',
      duration: '7-10 days',
      category: 'Beach & Culture'
    },
    {
      id: '2',
      name: 'Paris',
      country: 'France',
      description: 'The City of Light awaits with its iconic landmarks, world-class museums, and romantic atmosphere. Explore the Eiffel Tower, Louvre Museum, and charming cafes along the Seine.',
      shortDescription: 'City of romance and culture',
      imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
      price: 1899,
      rating: 4.9,
      reviews: 3821,
      isPopular: true,
      highlights: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame', 'French cuisine'],
      bestTimeToVisit: 'April to June, September to October',
      duration: '5-7 days',
      category: 'City & Culture'
    },
    {
      id: '3',
      name: 'Maldives',
      country: 'Maldives',
      description: 'Discover paradise in the Maldives with crystal-clear waters, overwater bungalows, and pristine white sand beaches. Perfect for honeymooners and luxury travelers.',
      shortDescription: 'Luxury island paradise',
      imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800',
      price: 2499,
      rating: 4.9,
      reviews: 1876,
      isPopular: true,
      highlights: ['Overwater villas', 'Snorkeling', 'Diving', 'Luxury resorts'],
      bestTimeToVisit: 'November to April',
      duration: '5-7 days',
      category: 'Beach & Luxury'
    },
    {
      id: '4',
      name: 'Tokyo',
      country: 'Japan',
      description: 'Experience the perfect blend of ancient tradition and cutting-edge technology in Tokyo. From serene temples to bustling streets, Tokyo offers endless discoveries.',
      shortDescription: 'Modern metropolis meets tradition',
      imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
      price: 1699,
      rating: 4.7,
      reviews: 2934,
      isPopular: true,
      highlights: ['Cherry blossoms', 'Temples', 'Technology', 'Japanese cuisine'],
      bestTimeToVisit: 'March to May, September to November',
      duration: '7-10 days',
      category: 'City & Culture'
    },
    {
      id: '5',
      name: 'Santorini',
      country: 'Greece',
      description: 'Fall in love with Santorini\'s iconic white-washed buildings, blue-domed churches, and breathtaking sunsets. This Greek island is a dream destination.',
      shortDescription: 'Stunning sunsets and white villages',
      imageUrl: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800',
      price: 1599,
      rating: 4.8,
      reviews: 2145,
      isPopular: true,
      highlights: ['Sunset views', 'White villages', 'Wine tasting', 'Volcanic beaches'],
      bestTimeToVisit: 'April to November',
      duration: '4-6 days',
      category: 'Beach & Romance'
    },
    {
      id: '6',
      name: 'Dubai',
      country: 'UAE',
      description: 'Experience luxury and innovation in Dubai with its towering skyscrapers, world-class shopping, and desert adventures. A city that never stops amazing.',
      shortDescription: 'Luxury and modern architecture',
      imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
      price: 1799,
      rating: 4.6,
      reviews: 3156,
      isPopular: true,
      highlights: ['Burj Khalifa', 'Desert safari', 'Shopping malls', 'Luxury hotels'],
      bestTimeToVisit: 'November to March',
      duration: '4-6 days',
      category: 'City & Luxury'
    }
  ];

  constructor() { }

  // Get all destinations with simulated delay
  getDestinations(): Observable<Destination[]> {
    return of(this.mockDestinations).pipe(delay(500));
  }

  // Get destination by ID
  getDestinationById(id: string): Observable<Destination | undefined> {
    const destination = this.mockDestinations.find(d => d.id === id);
    return of(destination).pipe(delay(300));
  }

  // Get popular destinations
  getPopularDestinations(): Observable<Destination[]> {
    const popular = this.mockDestinations.filter(d => d.isPopular);
    return of(popular).pipe(delay(500));
  }
}
