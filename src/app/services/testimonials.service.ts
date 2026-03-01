// Service for managing testimonials data
import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Testimonial } from '../models/testimonial.model';

@Injectable({
  providedIn: 'root'
})
export class TestimonialsService {
  
  // Mock data for testimonials
  private mockTestimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      location: 'New York, USA',
      rating: 5,
      comment: 'Amazing experience! The booking process was smooth and the trip to Bali exceeded all expectations. WonderWay made everything so easy.',
      imageUrl: 'https://i.pravatar.cc/150?img=1',
      date: '2026-01-15',
      destination: 'Bali'
    },
    {
      id: '2',
      name: 'Michael Chen',
      location: 'Singapore',
      rating: 5,
      comment: 'Best travel platform I\'ve used! Great deals, excellent customer service, and hassle-free booking. Highly recommended for anyone planning a trip.',
      imageUrl: 'https://i.pravatar.cc/150?img=13',
      date: '2026-01-20',
      destination: 'Paris'
    },
    {
      id: '3',
      name: 'Emma Williams',
      location: 'London, UK',
      rating: 4,
      comment: 'Wonderful honeymoon package to Maldives. The resort was stunning and everything was perfectly organized. Thank you WonderWay!',
      imageUrl: 'https://i.pravatar.cc/150?img=5',
      date: '2026-02-01',
      destination: 'Maldives'
    },
    {
      id: '4',
      name: 'David Martinez',
      location: 'Madrid, Spain',
      rating: 5,
      comment: 'Tokyo trip was incredible! From flights to hotels, everything was top-notch. Will definitely book again through WonderWay.',
      imageUrl: 'https://i.pravatar.cc/150?img=12',
      date: '2026-02-05',
      destination: 'Tokyo'
    },
    {
      id: '5',
      name: 'Lisa Anderson',
      location: 'Sydney, Australia',
      rating: 5,
      comment: 'Santorini was a dream come true! The sunset views, the food, the hospitality - everything was perfect. Great service from start to finish.',
      imageUrl: 'https://i.pravatar.cc/150?img=9',
      date: '2026-02-10',
      destination: 'Santorini'
    }
  ];

  constructor() { }

  // Get all testimonials with simulated delay
  getTestimonials(): Observable<Testimonial[]> {
    return of(this.mockTestimonials).pipe(delay(500));
  }
}
