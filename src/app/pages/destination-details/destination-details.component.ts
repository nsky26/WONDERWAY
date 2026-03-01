// Destination details page
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Destination } from '../../models/destination.model';
import { DestinationsService } from '../../services/destinations.service';
import * as DestinationsActions from '../../store/destinations/destinations.actions';
import { selectSelectedDestination } from '../../store/destinations/destinations.selectors';

@Component({
  selector: 'app-destination-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './destination-details.component.html',
  styleUrls: ['./destination-details.component.css']
})
export class DestinationDetailsComponent implements OnInit, OnDestroy {
  destination$: Observable<Destination | null>;
  destination: Destination | null = null;
  showScrollToBook = false;
  showAllReviews = false; // Toggle for showing all reviews
  displayedReviews: any[] = []; // Reviews to display
  similarDestinations: Destination[] = []; // Similar destinations based on category
  expandedArticles: Set<number> = new Set(); // Track which articles are expanded
  actualReviewCount = 12; // Actual number of reviews we have

  // Expanded customer testimonials with more realistic, detailed reviews
  testimonials = [
    {
      name: 'Sarah Johnson',
      avatar: '👩',
      rating: 5,
      date: 'March 2024',
      location: 'New York, USA',
      comment: 'Absolutely amazing experience! The destination exceeded all my expectations. The local guides were knowledgeable and friendly. We visited all the major attractions and even discovered some hidden gems. The hotel was spotless and the staff went above and beyond to make our stay comfortable. Highly recommend booking through WonderWay!',
      verified: true,
      helpful: 45
    },
    {
      name: 'Michael Chen',
      avatar: '👨',
      rating: 5,
      date: 'February 2024',
      location: 'Singapore',
      comment: 'Perfect trip from start to finish. WonderWay made everything seamless - from booking to the actual trip. The itinerary was well-planned with enough free time to explore on our own. The food experiences were incredible, we tried so many local dishes. Transportation was smooth and guides were punctual. Worth every dollar!',
      verified: true,
      helpful: 38
    },
    {
      name: 'Emma Williams',
      avatar: '👩',
      rating: 4,
      date: 'January 2024',
      location: 'London, UK',
      comment: 'Great destination with beautiful sights. The accommodations were comfortable and centrally located. The food was delicious and we loved trying the local cuisine. Only minor issue was some attractions were crowded, but that\'s expected during peak season. Would definitely visit again and recommend to friends!',
      verified: true,
      helpful: 29
    },
    {
      name: 'David Martinez',
      avatar: '👨',
      rating: 5,
      date: 'December 2023',
      location: 'Madrid, Spain',
      comment: 'One of the best trips I\'ve ever taken! The cultural experiences were authentic and immersive. We participated in local festivals and traditions which was unforgettable. The scenery was breathtaking - every corner was photo-worthy. Our guide shared fascinating historical stories. Worth every penny and more!',
      verified: true,
      helpful: 52
    },
    {
      name: 'Priya Sharma',
      avatar: '👩',
      rating: 5,
      date: 'November 2023',
      location: 'Mumbai, India',
      comment: 'Fantastic family vacation! We traveled with our two kids and everything was family-friendly. The activities were engaging for all ages. Hotel had great amenities including a pool and kids club. The tour guides were patient and made learning fun for the children. Safety was never a concern. Will definitely book again!',
      verified: true,
      helpful: 41
    },
    {
      name: 'James Wilson',
      avatar: '👨',
      rating: 4,
      date: 'October 2023',
      location: 'Toronto, Canada',
      comment: 'Really enjoyed this trip! The destination has so much to offer - from historical sites to natural beauty. We did a mix of guided tours and self-exploration. The local markets were vibrant and shopping was great. Food scene is diverse with options for all dietary preferences. Minor hiccup with weather but overall excellent experience.',
      verified: true,
      helpful: 33
    },
    {
      name: 'Lisa Anderson',
      avatar: '👩',
      rating: 5,
      date: 'September 2023',
      location: 'Sydney, Australia',
      comment: 'Exceeded expectations in every way! The attention to detail in planning was evident. Every day was perfectly balanced between activities and relaxation. The sunset views were spectacular. We made friends with other travelers and locals. The cultural insights from our guide enriched the experience. Can\'t wait to return!',
      verified: true,
      helpful: 47
    },
    {
      name: 'Robert Taylor',
      avatar: '👨',
      rating: 5,
      date: 'August 2023',
      location: 'Chicago, USA',
      comment: 'Best vacation ever! My wife and I celebrated our anniversary here and it was magical. The romantic dinner arrangements were perfect. The spa services at the hotel were top-notch. We enjoyed both adventure activities and peaceful moments. The photography opportunities were endless. Highly recommend for couples!',
      verified: true,
      helpful: 36
    },
    {
      name: 'Yuki Tanaka',
      avatar: '👩',
      rating: 4,
      date: 'July 2023',
      location: 'Tokyo, Japan',
      comment: 'Wonderful experience overall! The destination is beautiful and well-maintained. We appreciated the cleanliness and organization. The local transportation system was easy to navigate. Food was delicious with many vegetarian options. Only wish we had more time to explore everything. Planning to come back next year!',
      verified: true,
      helpful: 28
    },
    {
      name: 'Ahmed Hassan',
      avatar: '👨',
      rating: 5,
      date: 'June 2023',
      location: 'Dubai, UAE',
      comment: 'Outstanding trip! The luxury accommodations were impressive. Every detail was taken care of. The private tours gave us exclusive access to special locations. The cuisine was world-class. Our concierge was available 24/7 and very helpful. This is how travel should be - stress-free and memorable. Worth the premium price!',
      verified: true,
      helpful: 44
    },
    {
      name: 'Maria Garcia',
      avatar: '👩',
      rating: 5,
      date: 'May 2023',
      location: 'Barcelona, Spain',
      comment: 'Incredible adventure! As a solo female traveler, I felt completely safe. Met wonderful people and made lasting friendships. The group tours were fun and well-organized. The destination has amazing nightlife and cultural events. The local people were warm and welcoming. This trip boosted my confidence to travel more!',
      verified: true,
      helpful: 39
    },
    {
      name: 'Thomas Brown',
      avatar: '👨',
      rating: 4,
      date: 'April 2023',
      location: 'Berlin, Germany',
      comment: 'Very good trip with minor room for improvement. The historical sites were fascinating and well-preserved. Our guide was knowledgeable about local history. The hotel location was convenient. Food tours were a highlight. Only suggestion would be to include more free time in the itinerary. Overall, a solid experience!',
      verified: true,
      helpful: 25
    }
  ];

  // Trusted vendors with detailed information
  vendors = [
    {
      name: 'Premium Tours & Travel',
      logo: '🏢',
      rating: 4.8,
      reviews: 2450,
      speciality: 'Luxury Tours',
      verified: true,
      description: 'Leading luxury travel company offering premium experiences with personalized service, exclusive access to top attractions, and world-class accommodations.',
      established: '2008',
      services: [
        'VIP Airport Transfers',
        'Luxury Hotel Bookings',
        'Private Guided Tours',
        'Exclusive Dining Experiences',
        'Concierge Services',
        'Custom Itinerary Planning'
      ],
      contact: {
        phone: '+91-98765-11111',
        email: 'info@premiumtours.com',
        website: 'www.premiumtours.com',
        address: 'Premium Plaza, Business District'
      },
      achievements: [
        '🏆 Best Luxury Tour Operator 2023',
        '⭐ 5-Star Service Rating',
        '🌟 10,000+ Happy Customers',
        '✈️ 50+ Destinations Covered'
      ]
    },
    {
      name: 'Adventure Seekers Co.',
      logo: '🎒',
      rating: 4.7,
      reviews: 1890,
      speciality: 'Adventure Activities',
      verified: true,
      description: 'Thrill-seekers paradise offering exciting adventure activities, trekking expeditions, water sports, and outdoor experiences with certified instructors and safety equipment.',
      established: '2015',
      services: [
        'Trekking & Hiking',
        'Rock Climbing',
        'Water Sports',
        'Paragliding',
        'Wildlife Safaris',
        'Camping Expeditions'
      ],
      contact: {
        phone: '+91-98765-22222',
        email: 'adventures@seekers.com',
        website: 'www.adventureseekers.com',
        address: 'Adventure Hub, Mountain View'
      },
      achievements: [
        '🏔️ 500+ Successful Expeditions',
        '🛡️ 100% Safety Record',
        '👥 Expert Certified Guides',
        '🌍 Eco-Friendly Adventures'
      ]
    },
    {
      name: 'Local Heritage Guides',
      logo: '🗺️',
      rating: 4.9,
      reviews: 3120,
      speciality: 'Cultural Tours',
      verified: true,
      description: 'Expert local guides with deep knowledge of history, culture, and traditions. Offering authentic cultural experiences, heritage walks, and storytelling tours.',
      established: '2010',
      services: [
        'Heritage Walking Tours',
        'Cultural Workshops',
        'Historical Site Visits',
        'Local Food Tours',
        'Traditional Art & Craft',
        'Festival Experiences'
      ],
      contact: {
        phone: '+91-98765-33333',
        email: 'info@heritageguides.com',
        website: 'www.localheritageguides.com',
        address: 'Heritage Center, Old Town'
      },
      achievements: [
        '📚 Government Certified Guides',
        '🎭 Authentic Cultural Experiences',
        '🏛️ 100+ Heritage Sites Covered',
        '⭐ Highest Customer Satisfaction'
      ]
    },
    {
      name: 'Comfort Stay Hotels',
      logo: '🏨',
      rating: 4.6,
      reviews: 5670,
      speciality: 'Accommodations',
      verified: true,
      description: 'Premium hotel chain offering comfortable stays with modern amenities, excellent service, and convenient locations. Perfect for business and leisure travelers.',
      established: '2005',
      services: [
        'Luxury Rooms & Suites',
        '24/7 Room Service',
        'Swimming Pool & Spa',
        'Multi-Cuisine Restaurant',
        'Business Center',
        'Free WiFi & Parking'
      ],
      contact: {
        phone: '+91-98765-44444',
        email: 'reservations@comfortstay.com',
        website: 'www.comfortstayhotels.com',
        address: 'Multiple Locations Nationwide'
      },
      achievements: [
        '🏨 50+ Properties Nationwide',
        '⭐ 4.6 Average Rating',
        '🛎️ Award-Winning Service',
        '💎 Premium Amenities'
      ]
    }
  ];

  // Selected vendor for modal
  selectedVendor: any = null;

  // Hotels & Accommodations - 12 hotels (4 five-star, 4 four-star, 4 three-star)
  hotels = [
    // 5-Star Luxury Hotels
    {
      id: 'hotel-1',
      name: 'Grand Palace Hotel',
      icon: '🏨',
      rating: 4.8,
      reviewsCount: 1250,
      category: '5-Star Luxury',
      pricePerNight: 15000,
      description: 'Experience unparalleled luxury at Grand Palace Hotel, featuring opulent rooms, world-class dining, and exceptional service in the heart of the city.',
      amenities: ['Free WiFi', 'Swimming Pool', 'Spa & Wellness', 'Restaurant', 'Room Service', 'Gym', 'Parking'],
      phone: '+91-98765-11111',
      email: 'reservations@grandpalace.com',
      website: 'www.grandpalacehotel.com',
      address: 'City Center, Premium District',
      images: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop'
    },
    {
      id: 'hotel-2',
      name: 'Royal Regency Resort',
      icon: '🏨',
      rating: 4.9,
      reviewsCount: 980,
      category: '5-Star Luxury',
      pricePerNight: 18000,
      description: 'Indulge in beachfront luxury with stunning ocean views, infinity pool, private beach access, and personalized butler service at Royal Regency Resort.',
      amenities: ['Free WiFi', 'Infinity Pool', 'Spa', 'Fine Dining', 'Butler Service', 'Golf Course', 'Valet Parking'],
      phone: '+91-98765-11112',
      email: 'bookings@royalregency.com',
      website: 'www.royalregency.com',
      address: 'Beachfront, Luxury Zone',
      images: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop'
    },
    {
      id: 'hotel-3',
      name: 'Imperial Suites',
      icon: '🏨',
      rating: 4.7,
      reviewsCount: 1100,
      category: '5-Star Luxury',
      pricePerNight: 16500,
      description: 'Sophisticated elegance meets modern comfort at Imperial Suites. Enjoy spacious suites, rooftop pool, and panoramic city views in the business district.',
      amenities: ['Free WiFi', 'Rooftop Pool', 'Spa', 'Multi-Cuisine Restaurant', 'Concierge', 'Gym', 'Parking'],
      phone: '+91-98765-11113',
      email: 'info@imperialsuites.com',
      website: 'www.imperialsuites.com',
      address: 'Downtown, Business District',
      images: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop'
    },
    {
      id: 'hotel-4',
      name: 'Platinum Grand',
      icon: '🏨',
      rating: 4.8,
      reviewsCount: 890,
      category: '5-Star Luxury',
      pricePerNight: 17000,
      description: 'Perched on a hilltop with breathtaking scenic views, Platinum Grand offers luxury accommodations, gourmet dining, and a world-class spa experience.',
      amenities: ['Free WiFi', 'Luxury Spa', 'Pool', 'Gourmet Restaurant', 'Bar', 'Fitness Center', 'Valet'],
      phone: '+91-98765-11114',
      email: 'reservations@platinumgrand.com',
      website: 'www.platinumgrand.com',
      address: 'Hilltop, Scenic View',
      images: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop'
    },
    // 4-Star Hotels
    {
      id: 'hotel-5',
      name: 'Comfort Inn & Suites',
      icon: '🏨',
      rating: 4.5,
      reviewsCount: 890,
      category: '4-Star',
      pricePerNight: 8000,
      description: 'Perfect for business and leisure travelers, Comfort Inn & Suites offers modern amenities, complimentary breakfast, and convenient airport access.',
      amenities: ['Free WiFi', 'Breakfast Included', 'Restaurant', 'Room Service', 'Parking', 'Business Center'],
      phone: '+91-98765-22222',
      email: 'bookings@comfortinn.com',
      website: 'www.comfortinn.com',
      address: 'Near Airport, Business District',
      images: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop'
    },
    {
      id: 'hotel-6',
      name: 'City View Hotel',
      icon: '🏨',
      rating: 4.4,
      reviewsCount: 750,
      category: '4-Star',
      pricePerNight: 7500,
      description: 'Located in the heart of the shopping district, City View Hotel provides comfortable rooms, excellent dining, and easy access to major attractions.',
      amenities: ['Free WiFi', 'Restaurant', 'Pool', 'Gym', 'Room Service', 'Parking'],
      phone: '+91-98765-22223',
      email: 'info@cityviewhotel.com',
      website: 'www.cityviewhotel.com',
      address: 'City Center, Shopping District',
      images: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop'
    },
    {
      id: 'hotel-7',
      name: 'Garden Plaza Hotel',
      icon: '🏨',
      rating: 4.6,
      reviewsCount: 820,
      category: '4-Star',
      pricePerNight: 8500,
      description: 'Escape to tranquility at Garden Plaza Hotel, surrounded by lush gardens. Features spa services, pool, and serene garden views for a peaceful stay.',
      amenities: ['Free WiFi', 'Garden View', 'Restaurant', 'Spa', 'Pool', 'Parking'],
      phone: '+91-98765-22224',
      email: 'reservations@gardenplaza.com',
      website: 'www.gardenplaza.com',
      address: 'Garden District, Peaceful Area',
      images: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop'
    },
    {
      id: 'hotel-8',
      name: 'Metro Stay Hotel',
      icon: '🏨',
      rating: 4.3,
      reviewsCount: 680,
      category: '4-Star',
      pricePerNight: 7000,
      description: 'Conveniently located near metro station, Metro Stay Hotel offers comfortable accommodations, business facilities, and easy city connectivity.',
      amenities: ['Free WiFi', 'Breakfast', 'Restaurant', 'Gym', 'Business Center', 'Parking'],
      phone: '+91-98765-22225',
      email: 'bookings@metrostay.com',
      website: 'www.metrostay.com',
      address: 'Metro Station, Central Location',
      images: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=300&fit=crop'
    },
    // 3-Star Budget Hotels
    {
      id: 'hotel-9',
      name: 'Budget Stay Lodge',
      icon: '🏨',
      rating: 4.2,
      reviewsCount: 560,
      category: '3-Star Budget',
      pricePerNight: 3500,
      description: 'Affordable and comfortable accommodations for budget-conscious travelers. Clean rooms, essential amenities, and friendly service near bus stand.',
      amenities: ['Free WiFi', 'AC Rooms', 'TV', 'Hot Water', 'Parking'],
      phone: '+91-98765-33333',
      email: 'info@budgetstay.com',
      website: 'www.budgetstaylodge.com',
      address: 'City Outskirts, Near Bus Stand',
      images: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=400&h=300&fit=crop'
    },
    {
      id: 'hotel-10',
      name: 'Traveler Inn',
      icon: '🏨',
      rating: 4.1,
      reviewsCount: 490,
      category: '3-Star Budget',
      pricePerNight: 3000,
      description: 'Ideal for backpackers and budget travelers, Traveler Inn offers basic comfort, complimentary breakfast, and convenient railway station location.',
      amenities: ['Free WiFi', 'AC', 'TV', 'Breakfast', 'Parking'],
      phone: '+91-98765-33334',
      email: 'contact@travelerinn.com',
      website: 'www.travelerinn.com',
      address: 'Railway Station Area',
      images: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop'
    },
    {
      id: 'hotel-11',
      name: 'Cozy Corner Hotel',
      icon: '🏨',
      rating: 4.0,
      reviewsCount: 420,
      category: '3-Star Budget',
      pricePerNight: 2800,
      description: 'A cozy budget hotel in the old town market area. Perfect for travelers seeking authentic local experience with comfortable rooms and room service.',
      amenities: ['Free WiFi', 'AC Rooms', 'TV', 'Room Service', 'Parking'],
      phone: '+91-98765-33335',
      email: 'info@cozycorner.com',
      website: 'www.cozycornerhotel.com',
      address: 'Old Town, Market Area',
      images: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop'
    },
    {
      id: 'hotel-12',
      name: 'Smart Stay Inn',
      icon: '🏨',
      rating: 4.2,
      reviewsCount: 510,
      category: '3-Star Budget',
      pricePerNight: 3200,
      description: 'Smart and efficient budget accommodation near highway. Offers clean rooms, breakfast, and easy access for travelers on the move.',
      amenities: ['Free WiFi', 'AC', 'TV', 'Hot Water', 'Breakfast', 'Parking'],
      phone: '+91-98765-33336',
      email: 'bookings@smartstay.com',
      website: 'www.smartstayinn.com',
      address: 'Near Highway, Easy Access',
      images: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=400&h=300&fit=crop'
    }
  ];

  // Restaurants & Dining - 8 restaurants
  restaurants = [
    {
      id: 'rest-1',
      name: 'Royal Spice Kitchen',
      icon: '🍽️',
      rating: 4.7,
      reviewsCount: 890,
      cuisine: 'Indian & Continental',
      priceRange: '₹₹₹',
      avgCostForTwo: 1500,
      description: 'Indulge in authentic Indian flavors and continental delights at Royal Spice Kitchen. Known for signature butter chicken, aromatic biryani, and delectable desserts.',
      specialties: ['Butter Chicken', 'Biryani', 'Tandoori', 'Pasta', 'Desserts'],
      phone: '+91-98765-77777',
      email: 'reservations@royalspice.com',
      website: 'www.royalspicekitchen.com',
      address: 'Main Market, City Center',
      timings: '11:00 AM - 11:00 PM',
      images: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop'
    },
    {
      id: 'rest-2',
      name: 'Coastal Breeze Seafood',
      icon: '🦞',
      rating: 4.6,
      reviewsCount: 650,
      cuisine: 'Seafood & Coastal',
      priceRange: '₹₹',
      avgCostForTwo: 1200,
      description: 'Fresh catch daily! Coastal Breeze Seafood serves the finest seafood dishes with authentic coastal flavors. Perfect for seafood lovers seeking ocean-fresh delicacies.',
      specialties: ['Fish Curry', 'Prawn Masala', 'Crab Dishes', 'Lobster', 'Fish Fry'],
      phone: '+91-98765-88888',
      email: 'info@coastalbreeze.com',
      website: 'www.coastalbreeze.com',
      address: 'Beach Road, Waterfront',
      timings: '12:00 PM - 10:30 PM',
      images: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop'
    },
    {
      id: 'rest-3',
      name: 'Street Food Paradise',
      icon: '🌮',
      rating: 4.4,
      reviewsCount: 1200,
      cuisine: 'Street Food & Snacks',
      priceRange: '₹',
      avgCostForTwo: 400,
      description: 'Experience authentic street food flavors in a hygienic setting. Street Food Paradise offers popular local snacks, chaat, and quick bites loved by locals and tourists alike.',
      specialties: ['Chaat', 'Pav Bhaji', 'Vada Pav', 'Dosa', 'Momos'],
      phone: '+91-98765-99999',
      email: 'contact@streetfoodparadise.com',
      website: 'www.streetfoodparadise.com',
      address: 'Food Street, Old Town',
      timings: '10:00 AM - 11:00 PM',
      images: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop'
    },
    {
      id: 'rest-4',
      name: 'The Grill House',
      icon: '🥩',
      rating: 4.8,
      reviewsCount: 720,
      cuisine: 'BBQ & Grills',
      priceRange: '₹₹₹',
      avgCostForTwo: 1800,
      description: 'Premium BBQ and grills cooked to perfection. The Grill House specializes in juicy steaks, tender ribs, and gourmet burgers in an upscale dining atmosphere.',
      specialties: ['Steaks', 'BBQ Ribs', 'Grilled Chicken', 'Kebabs', 'Burgers'],
      phone: '+91-98765-77778',
      email: 'reservations@grillhouse.com',
      website: 'www.thegrillhouse.com',
      address: 'Premium Plaza, Downtown',
      timings: '12:00 PM - 11:30 PM',
      images: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop'
    },
    {
      id: 'rest-5',
      name: 'Vegetarian Delight',
      icon: '🥗',
      rating: 4.5,
      reviewsCount: 580,
      cuisine: 'Pure Vegetarian',
      priceRange: '₹₹',
      avgCostForTwo: 800,
      description: 'Pure vegetarian paradise offering diverse Indian and Chinese cuisines. Vegetarian Delight serves wholesome meals with fresh ingredients and authentic flavors.',
      specialties: ['Paneer Dishes', 'Dal Makhani', 'Thali', 'South Indian', 'Chinese'],
      phone: '+91-98765-77779',
      email: 'info@vegdelight.com',
      website: 'www.vegetariandelight.com',
      address: 'Temple Road, Vegetarian Zone',
      timings: '11:00 AM - 10:00 PM',
      images: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop'
    },
    {
      id: 'rest-6',
      name: 'Pizza & Pasta Corner',
      icon: '🍕',
      rating: 4.3,
      reviewsCount: 890,
      cuisine: 'Italian',
      priceRange: '₹₹',
      avgCostForTwo: 1000,
      description: 'Authentic Italian cuisine with wood-fired pizzas and handmade pasta. Pizza & Pasta Corner brings the taste of Italy with traditional recipes and fresh ingredients.',
      specialties: ['Wood-fired Pizza', 'Pasta', 'Lasagna', 'Risotto', 'Tiramisu'],
      phone: '+91-98765-77780',
      email: 'orders@pizzapasta.com',
      website: 'www.pizzapastacorner.com',
      address: 'Mall Road, Shopping Complex',
      timings: '11:30 AM - 11:00 PM',
      images: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop'
    },
    {
      id: 'rest-7',
      name: 'Asian Wok',
      icon: '🍜',
      rating: 4.6,
      reviewsCount: 670,
      cuisine: 'Chinese & Asian',
      priceRange: '₹₹',
      avgCostForTwo: 900,
      description: 'Pan-Asian flavors under one roof. Asian Wok serves delicious Chinese, Thai, and Japanese dishes with authentic spices and cooking techniques.',
      specialties: ['Noodles', 'Fried Rice', 'Dim Sum', 'Thai Curry', 'Sushi'],
      phone: '+91-98765-77781',
      email: 'info@asianwok.com',
      website: 'www.asianwok.com',
      address: 'China Town, Asian Quarter',
      timings: '12:00 PM - 10:30 PM',
      images: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&h=300&fit=crop'
    },
    {
      id: 'rest-8',
      name: 'Cafe Mocha',
      icon: '☕',
      rating: 4.4,
      reviewsCount: 950,
      cuisine: 'Cafe & Bakery',
      priceRange: '₹',
      avgCostForTwo: 600,
      description: 'Cozy cafe perfect for coffee lovers and light bites. Cafe Mocha offers artisan coffee, fresh pastries, sandwiches, and a relaxing ambiance for work or leisure.',
      specialties: ['Coffee', 'Sandwiches', 'Pastries', 'Cakes', 'Smoothies'],
      phone: '+91-98765-77782',
      email: 'hello@cafemocha.com',
      website: 'www.cafemocha.com',
      address: 'Book Street, Cafe District',
      timings: '8:00 AM - 10:00 PM',
      images: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop'
    }
  ];

  selectedHotel: any = null;
  selectedRestaurant: any = null;
  
  // Local Photographers - 9 photographers (removed recommendation text)
  photographers = [
    {
      id: 'photo-1',
      name: 'Rahul Photography',
      icon: '📸',
      rating: 4.9,
      reviewsCount: 320,
      specialization: 'Travel & Landscape',
      experience: '8 years',
      pricePerHour: 2500,
      pricePerDay: 15000,
      description: 'Professional travel photographer capturing stunning landscapes and candid moments. Specializes in natural lighting and composition.',
      services: ['Travel Photography', 'Landscape Shots', 'Portrait Sessions', 'Drone Photography', 'Photo Editing'],
      portfolio: 'www.rahulphotography.com',
      phone: '+91-98765-44444',
      email: 'rahul@photography.com',
      whatsapp: '+91-98765-44444',
      images: 'https://picsum.photos/seed/photo1/400/300'
    },
    {
      id: 'photo-2',
      name: 'Priya Lens Studio',
      icon: '📷',
      rating: 4.8,
      reviewsCount: 280,
      specialization: 'Wedding & Events',
      experience: '6 years',
      pricePerHour: 3000,
      pricePerDay: 18000,
      description: 'Creative photographer specializing in events, weddings, and cultural celebrations with artistic flair.',
      services: ['Event Photography', 'Wedding Shoots', 'Cultural Events', 'Video Coverage', 'Album Design'],
      portfolio: 'www.priyalens.com',
      phone: '+91-98765-55555',
      email: 'priya@lensstudio.com',
      whatsapp: '+91-98765-55555',
      images: 'https://picsum.photos/seed/photo2/400/300'
    },
    {
      id: 'photo-3',
      name: 'Snapshot Memories',
      icon: '📸',
      rating: 4.7,
      reviewsCount: 195,
      specialization: 'Family & Group',
      experience: '5 years',
      pricePerHour: 2000,
      pricePerDay: 12000,
      description: 'Friendly photographer perfect for family trips and group tours. Creates warm, natural family portraits.',
      services: ['Family Portraits', 'Group Photos', 'Candid Shots', 'Photo Prints', 'Digital Albums'],
      portfolio: 'www.snapshotmemories.com',
      phone: '+91-98765-66666',
      email: 'info@snapshotmemories.com',
      whatsapp: '+91-98765-66666',
      images: 'https://picsum.photos/seed/photo3/400/300'
    },
    {
      id: 'photo-4',
      name: 'Vikram Visual Arts',
      icon: '📷',
      rating: 4.9,
      reviewsCount: 410,
      specialization: 'Wildlife & Nature',
      experience: '10 years',
      pricePerHour: 3500,
      pricePerDay: 20000,
      description: 'Award-winning wildlife photographer with expertise in capturing rare moments in nature and wildlife.',
      services: ['Wildlife Photography', 'Nature Shots', 'Bird Photography', 'Macro Photography', 'Safari Tours'],
      portfolio: 'www.vikramvisuals.com',
      phone: '+91-98765-77777',
      email: 'vikram@visualarts.com',
      whatsapp: '+91-98765-77777',
      images: 'https://picsum.photos/seed/photo4/400/300'
    },
    {
      id: 'photo-5',
      name: 'Anjali Captures',
      icon: '📸',
      rating: 4.6,
      reviewsCount: 230,
      specialization: 'Street & Documentary',
      experience: '7 years',
      pricePerHour: 2200,
      pricePerDay: 13000,
      description: 'Documentary-style photographer capturing authentic street life, local culture, and candid moments.',
      services: ['Street Photography', 'Documentary', 'Cultural Stories', 'Black & White', 'Photo Essays'],
      portfolio: 'www.anjalicaptures.com',
      phone: '+91-98765-88888',
      email: 'anjali@captures.com',
      whatsapp: '+91-98765-88888',
      images: 'https://picsum.photos/seed/photo5/400/300'
    },
    {
      id: 'photo-6',
      name: 'Arjun Photo Studio',
      icon: '📷',
      rating: 4.8,
      reviewsCount: 350,
      specialization: 'Portrait & Fashion',
      experience: '9 years',
      pricePerHour: 2800,
      pricePerDay: 16000,
      description: 'Professional portrait and fashion photographer with studio and outdoor expertise. Creative lighting specialist.',
      services: ['Portrait Photography', 'Fashion Shoots', 'Studio Sessions', 'Outdoor Portraits', 'Retouching'],
      portfolio: 'www.arjunphotostudio.com',
      phone: '+91-98765-99999',
      email: 'arjun@photostudio.com',
      whatsapp: '+91-98765-99999',
      images: 'https://picsum.photos/seed/photo6/400/300'
    },
    {
      id: 'photo-7',
      name: 'Meera Moments',
      icon: '📸',
      rating: 4.7,
      reviewsCount: 265,
      specialization: 'Food & Product',
      experience: '6 years',
      pricePerHour: 2400,
      pricePerDay: 14000,
      description: 'Specialized in food photography, product shots, and commercial photography with attention to detail.',
      services: ['Food Photography', 'Product Shots', 'Commercial', 'Menu Photography', 'Styling'],
      portfolio: 'www.meeramoments.com',
      phone: '+91-98765-11112',
      email: 'meera@moments.com',
      whatsapp: '+91-98765-11112',
      images: 'https://picsum.photos/seed/photo7/400/300'
    },
    {
      id: 'photo-8',
      name: 'Karan Kreative',
      icon: '📷',
      rating: 4.9,
      reviewsCount: 390,
      specialization: 'Architecture & Real Estate',
      experience: '11 years',
      pricePerHour: 3200,
      pricePerDay: 19000,
      description: 'Expert in architectural photography, real estate, and interior design photography with technical precision.',
      services: ['Architecture Photography', 'Real Estate', 'Interior Design', 'Aerial Shots', 'Virtual Tours'],
      portfolio: 'www.karankreative.com',
      phone: '+91-98765-22223',
      email: 'karan@kreative.com',
      whatsapp: '+91-98765-22223',
      images: 'https://picsum.photos/seed/photo8/400/300'
    },
    {
      id: 'photo-9',
      name: 'Sanjay Shots',
      icon: '📸',
      rating: 4.5,
      reviewsCount: 180,
      specialization: 'Sports & Action',
      experience: '5 years',
      pricePerHour: 2600,
      pricePerDay: 15500,
      description: 'Dynamic sports and action photographer capturing high-energy moments with fast shutter speeds.',
      services: ['Sports Photography', 'Action Shots', 'Event Coverage', 'Adventure Sports', 'Motion Capture'],
      portfolio: 'www.sanjayshots.com',
      phone: '+91-98765-33334',
      email: 'sanjay@shots.com',
      whatsapp: '+91-98765-33334',
      images: 'https://picsum.photos/seed/photo9/400/300'
    }
  ];

  selectedPhotographer: any = null;

  // Travel articles
  articles = [
    {
      title: 'Top 10 Must-Visit Attractions',
      image: 'https://picsum.photos/seed/article1/400/250',
      excerpt: 'Discover the most iconic landmarks and hidden gems that make this destination truly special.',
      fullContent: 'This destination offers an incredible array of attractions that cater to every type of traveler. From ancient historical sites that tell stories of civilizations past, to modern architectural marvels that showcase contemporary design, there\'s something for everyone. The local museums house priceless artifacts and interactive exhibits that bring history to life. Don\'t miss the vibrant markets where you can experience authentic local culture, taste traditional foods, and find unique souvenirs. The natural landscapes surrounding the area provide breathtaking views and outdoor activities. Whether you\'re interested in art, history, nature, or adventure, these top attractions will make your visit unforgettable.',
      readTime: '5 min read',
      date: 'March 15, 2024'
    },
    {
      title: 'Best Time to Visit: A Complete Guide',
      image: 'https://picsum.photos/seed/article2/400/250',
      excerpt: 'Learn about the perfect seasons, weather patterns, and local festivals to plan your ideal trip.',
      fullContent: 'Timing your visit can make all the difference in your travel experience. The peak season offers the best weather and all attractions are fully operational, but it also means larger crowds and higher prices. The shoulder seasons provide a perfect balance - pleasant weather, fewer tourists, and better deals on accommodations. During local festivals and cultural celebrations, you\'ll witness authentic traditions and vibrant celebrations that offer unique insights into the local culture. Consider the climate patterns, rainfall, and temperature variations throughout the year. Each season has its own charm and advantages, so choose based on your preferences for weather, activities, and budget.',
      readTime: '7 min read',
      date: 'March 10, 2024'
    },
    {
      title: 'Local Cuisine: A Food Lover\'s Paradise',
      image: 'https://picsum.photos/seed/article3/400/250',
      excerpt: 'Explore the authentic flavors and must-try dishes that define the local culinary scene.',
      fullContent: 'The culinary landscape here is a delightful journey through flavors, traditions, and innovation. Start your day with traditional breakfast dishes that locals have enjoyed for generations. Street food vendors offer authentic snacks that are both delicious and affordable. Fine dining restaurants showcase modern interpretations of classic recipes using locally-sourced ingredients. Don\'t miss the signature dishes that define this region\'s cuisine - each tells a story of cultural heritage and culinary evolution. Food markets are treasure troves of fresh produce, spices, and specialty items. Take a cooking class to learn the secrets behind these amazing flavors and bring a taste of your travels home with you.',
      readTime: '6 min read',
      date: 'March 5, 2024'
    },
    {
      title: 'Budget Travel Tips and Tricks',
      image: 'https://picsum.photos/seed/article4/400/250',
      excerpt: 'Save money without compromising on experiences with these insider tips from seasoned travelers.',
      fullContent: 'Traveling on a budget doesn\'t mean sacrificing quality experiences. Start by booking accommodations in local neighborhoods rather than tourist hotspots - you\'ll save money and experience authentic local life. Use public transportation which is often efficient, affordable, and gives you a real feel for the city. Eat where locals eat - small family-run restaurants offer delicious meals at fraction of tourist restaurant prices. Many attractions offer free admission on certain days or discounted tickets during off-peak hours. Consider purchasing city passes that bundle multiple attractions and transportation. Book tours and activities directly with local operators rather than through hotel concierges. With smart planning and these insider tips, you can have an amazing trip without breaking the bank.',
      readTime: '8 min read',
      date: 'February 28, 2024'
    }
  ];

  // Tourist Guide Companies - Organized by company
  guideCompanies = [
    {
      id: 'company-1',
      name: 'Local Heritage Guides',
      icon: '🏛️',
      specialization: 'Heritage & Cultural Tours',
      description: 'Expert guides specializing in historical sites, monuments, and cultural experiences. Government certified with deep knowledge of local heritage.',
      rating: 4.9,
      reviewsCount: 450,
      established: '2010',
      guides: [
        {
          id: 'guide-1',
          name: 'Rajesh Kumar',
          photo: '👨‍🦱',
          experience: '12 years',
          languages: ['English', 'Hindi', 'Spanish'],
          rating: 4.9,
          reviewsCount: 156,
          pricePerDay: 2500,
          phone: '+91-98765-43210',
          email: 'rajesh@heritaguides.com',
          whatsapp: '+91-98765-43210',
          availability: 'Available',
          bio: 'Certified heritage tour guide with extensive knowledge of historical monuments and cultural traditions.',
          certifications: ['Government Certified Guide', 'Heritage Expert', 'Language Proficiency']
        },
        {
          id: 'guide-2',
          name: 'Amit Patel',
          photo: '👨',
          experience: '10 years',
          languages: ['English', 'Hindi', 'Gujarati'],
          rating: 4.8,
          reviewsCount: 132,
          pricePerDay: 2300,
          phone: '+91-98765-43213',
          email: 'amit@heritaguides.com',
          whatsapp: '+91-98765-43213',
          availability: 'Available',
          bio: 'Passionate about sharing stories of ancient architecture and local traditions.',
          certifications: ['Government Certified', 'History Specialist']
        }
      ]
    },
    {
      id: 'company-2',
      name: 'Adventure Seekers Co.',
      icon: '🏔️',
      specialization: 'Adventure & Nature Tours',
      description: 'Thrill-seekers and nature enthusiasts offering trekking, wildlife tours, and outdoor adventures. Safety-certified with emergency response training.',
      rating: 4.8,
      reviewsCount: 380,
      established: '2015',
      guides: [
        {
          id: 'guide-3',
          name: 'Priya Sharma',
          photo: '👩',
          experience: '8 years',
          languages: ['English', 'Hindi', 'French'],
          rating: 4.8,
          reviewsCount: 98,
          pricePerDay: 2800,
          phone: '+91-98765-43211',
          email: 'priya@adventureseekers.com',
          whatsapp: '+91-98765-43211',
          availability: 'Available',
          bio: 'Adventure enthusiast specializing in trekking, wildlife tours, and outdoor activities.',
          certifications: ['Adventure Guide Certified', 'Wildlife Expert', 'Mountain Safety', 'First Aid']
        },
        {
          id: 'guide-4',
          name: 'Vikram Singh',
          photo: '👨‍🦰',
          experience: '9 years',
          languages: ['English', 'Hindi', 'Punjabi'],
          rating: 4.9,
          reviewsCount: 145,
          pricePerDay: 3000,
          phone: '+91-98765-43214',
          email: 'vikram@adventureseekers.com',
          whatsapp: '+91-98765-43214',
          availability: 'Limited',
          bio: 'Expert mountaineer and trekking guide with extensive experience in Himalayan expeditions.',
          certifications: ['Mountain Guide', 'Rescue Operations', 'Wilderness First Responder']
        }
      ]
    },
    {
      id: 'company-3',
      name: 'Premium Tours & Travels',
      icon: '⭐',
      specialization: 'Luxury & VIP Tours',
      description: 'Premium travel experiences with luxury vehicles, exclusive access, and personalized itineraries. Perfect for discerning travelers seeking comfort and style.',
      rating: 4.9,
      reviewsCount: 520,
      established: '2008',
      guides: [
        {
          id: 'guide-5',
          name: 'Mohammed Ali',
          photo: '👨',
          experience: '15 years',
          languages: ['English', 'Hindi', 'Arabic', 'Urdu'],
          rating: 4.9,
          reviewsCount: 203,
          pricePerDay: 3500,
          phone: '+91-98765-43212',
          email: 'mohammed@premiumtours.com',
          whatsapp: '+91-98765-43212',
          availability: 'Limited',
          bio: 'Luxury tour specialist with connections to exclusive venues and premium experiences.',
          certifications: ['VIP Tour Specialist', 'Luxury Hospitality', 'Concierge Services']
        },
        {
          id: 'guide-6',
          name: 'Kavita Reddy',
          photo: '👩‍💼',
          experience: '11 years',
          languages: ['English', 'Hindi', 'Telugu', 'Tamil'],
          rating: 4.9,
          reviewsCount: 178,
          pricePerDay: 3200,
          phone: '+91-98765-43215',
          email: 'kavita@premiumtours.com',
          whatsapp: '+91-98765-43215',
          availability: 'Available',
          bio: 'Premium tour coordinator specializing in customized luxury experiences and fine dining tours.',
          certifications: ['Luxury Travel Specialist', 'Wine & Dine Expert']
        }
      ]
    }
  ];

  // Transportation Providers - Organized by company
  transportProviders = [
    {
      id: 'provider-1',
      name: 'RideEasy Rentals',
      icon: '🏍️',
      specialization: 'Bikes & Scooters',
      description: 'Self-drive bike and scooter rentals with comprehensive insurance and 24/7 roadside assistance. Perfect for solo travelers and couples.',
      rating: 4.7,
      reviewsCount: 890,
      established: '2016',
      contact: '+91-98765-11111',
      email: 'info@rideeasy.com',
      packages: [
        {
          id: 'pkg-bike-1',
          type: 'Bike',
          vehicleName: 'Royal Enfield Classic 350',
          capacity: '2 persons',
          pricePerDay: 1200,
          pricePerKm: 8,
          features: ['Helmet Included', 'Insurance', '24/7 Support', 'GPS Tracker'],
          imageUrl: '🏍️',
          fuelType: 'Petrol',
          availability: true,
          includesDriver: false,
          insurance: true
        },
        {
          id: 'pkg-bike-2',
          type: 'Scooter',
          vehicleName: 'Honda Activa 6G',
          capacity: '2 persons',
          pricePerDay: 600,
          pricePerKm: 5,
          features: ['Helmet Included', 'Insurance', 'Fuel Efficient'],
          imageUrl: '🛵',
          fuelType: 'Petrol',
          availability: true,
          includesDriver: false,
          insurance: true
        }
      ]
    },
    {
      id: 'provider-2',
      name: 'DriveComfort Cabs',
      icon: '🚗',
      specialization: 'Cars & Sedans',
      description: 'Professional chauffeur-driven cars with experienced drivers. Comfortable, safe, and reliable transportation for families and small groups.',
      rating: 4.8,
      reviewsCount: 1250,
      established: '2012',
      contact: '+91-98765-22222',
      email: 'bookings@drivecomfort.com',
      packages: [
        {
          id: 'pkg-car-1',
          type: 'Car',
          vehicleName: 'Toyota Innova Crysta',
          capacity: '7 persons',
          pricePerDay: 3500,
          pricePerKm: 15,
          features: ['AC', 'Music System', 'GPS', 'Spacious', 'Comfortable Seats'],
          imageUrl: '🚗',
          fuelType: 'Diesel',
          availability: true,
          includesDriver: true,
          insurance: true
        },
        {
          id: 'pkg-car-2',
          type: 'Sedan',
          vehicleName: 'Maruti Swift Dzire',
          capacity: '4 persons',
          pricePerDay: 2000,
          pricePerKm: 10,
          features: ['AC', 'Music System', 'GPS', 'Fuel Efficient'],
          imageUrl: '🚙',
          fuelType: 'Petrol',
          availability: true,
          includesDriver: true,
          insurance: true
        }
      ]
    },
    {
      id: 'provider-3',
      name: 'Adventure Wheels',
      icon: '🚙',
      specialization: 'SUVs & Off-Road',
      description: 'Rugged SUVs and jeeps for adventure trips and off-road experiences. 4WD vehicles with experienced drivers for challenging terrains.',
      rating: 4.9,
      reviewsCount: 670,
      established: '2014',
      contact: '+91-98765-33333',
      email: 'adventures@adventurewheels.com',
      packages: [
        {
          id: 'pkg-suv-1',
          type: 'SUV',
          vehicleName: 'Mahindra Scorpio',
          capacity: '7 persons',
          pricePerDay: 4000,
          pricePerKm: 18,
          features: ['AC', '4WD', 'Music System', 'GPS', 'Rugged', 'Off-road Capable'],
          imageUrl: '🚙',
          fuelType: 'Diesel',
          availability: true,
          includesDriver: true,
          insurance: true
        },
        {
          id: 'pkg-jeep-1',
          type: 'Jeep',
          vehicleName: 'Mahindra Thar',
          capacity: '4 persons',
          pricePerDay: 3800,
          pricePerKm: 16,
          features: ['AC', '4WD', 'Off-road', 'Adventure Ready', 'GPS'],
          imageUrl: '🚙',
          fuelType: 'Diesel',
          availability: true,
          includesDriver: true,
          insurance: true
        }
      ]
    },
    {
      id: 'provider-4',
      name: 'GroupTravel Services',
      icon: '🚐',
      specialization: 'Large Groups',
      description: 'Tempo travellers and buses for large groups and family trips. Spacious, comfortable, and perfect for group tours with luggage space.',
      rating: 4.6,
      reviewsCount: 540,
      established: '2013',
      contact: '+91-98765-44444',
      email: 'groups@grouptravelservices.com',
      packages: [
        {
          id: 'pkg-tempo-1',
          type: 'Tempo Traveller',
          vehicleName: 'Force Tempo Traveller',
          capacity: '12-14 persons',
          pricePerDay: 5500,
          pricePerKm: 22,
          features: ['AC', 'Push Back Seats', 'Music System', 'Spacious', 'Luggage Space'],
          imageUrl: '🚐',
          fuelType: 'Diesel',
          availability: true,
          includesDriver: true,
          insurance: true
        }
      ]
    },
    {
      id: 'provider-5',
      name: 'Luxury Rides',
      icon: '✨',
      specialization: 'Premium Vehicles',
      description: 'Luxury and premium vehicles for special occasions and VIP travel. Professional chauffeurs, premium amenities, and exceptional service.',
      rating: 4.9,
      reviewsCount: 320,
      established: '2017',
      contact: '+91-98765-55555',
      email: 'vip@luxuryrides.com',
      packages: [
        {
          id: 'pkg-luxury-1',
          type: 'Luxury Car',
          vehicleName: 'Mercedes E-Class',
          capacity: '4 persons',
          pricePerDay: 8000,
          pricePerKm: 30,
          features: ['Premium AC', 'Leather Seats', 'Premium Sound', 'GPS', 'Luxury Experience'],
          imageUrl: '🚗',
          fuelType: 'Petrol',
          availability: true,
          includesDriver: true,
          insurance: true
        }
      ]
    }
  ];

  // Selected company and guide
  selectedCompany: any = null;
  selectedGuide: any = null;
  selectedProvider: any = null;
  selectedPackage: any = null;
  
  // FAQ expanded state
  expandedFAQs: Set<number> = new Set();

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private destinationsService: DestinationsService
  ) {
    this.destination$ = this.store.select(selectSelectedDestination);
  }

  ngOnInit() {
    // Get destination ID from route params
    this.route.params.subscribe(params => {
      const destinationId = params['id'];
      
      if (destinationId) {
        // Load destination from service
        this.destinationsService.getDestinationById(destinationId).subscribe(destination => {
          if (destination) {
            this.destination = destination;
            // Dispatch action to update store
            this.store.dispatch(DestinationsActions.selectDestination({ destination }));
            // Load similar destinations
            this.loadSimilarDestinations(destination);
          } else {
            // Destination not found, redirect to destinations page
            this.router.navigate(['/destinations']);
          }
        });
      }
    });

    // Also subscribe to store for updates
    this.destination$.subscribe(destination => {
      if (destination) {
        this.destination = destination;
      }
    });

    // Initialize displayed reviews (show first 4)
    this.displayedReviews = this.testimonials.slice(0, 4);

    // Scroll listener for scroll-to-book button
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  loadSimilarDestinations(currentDestination: Destination) {
    // Load destinations from the same category or region
    this.destinationsService.getDestinations().subscribe(destinations => {
      this.similarDestinations = destinations
        .filter(d => 
          d.id !== currentDestination.id && 
          (d.category === currentDestination.category || d.region === currentDestination.region)
        )
        .slice(0, 3); // Get top 3 similar destinations
    });
  }

  toggleReviews() {
    this.showAllReviews = !this.showAllReviews;
    if (this.showAllReviews) {
      this.displayedReviews = this.testimonials;
    } else {
      this.displayedReviews = this.testimonials.slice(0, 4);
      // Scroll to reviews section
      setTimeout(() => {
        const reviewsSection = document.querySelector('.reviews-grid-modern');
        if (reviewsSection) {
          reviewsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }

  onScroll() {
    this.showScrollToBook = window.pageYOffset > 800;
  }

  scrollToBooking() {
    const bookingCard = document.querySelector('.booking-card');
    if (bookingCard) {
      bookingCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  bookNow(destination: Destination) {
    this.router.navigate(['/booking'], { 
      queryParams: { 
        destinationId: destination.id,
        destinationName: destination.name,
        price: destination.price
      } 
    });
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getSafeBackgroundImage(imageUrl: string): string {
    // Return a safe background image URL with fallback
    if (!imageUrl) {
      return 'url(https://picsum.photos/seed/hero-fallback/1600/900)';
    }
    return `url(${imageUrl})`;
  }

  onImageError(event: any) {
    // Use a reliable Picsum fallback image
    event.target.src = 'https://picsum.photos/seed/travel-fallback/800/600';
  }

  viewDestination(destination: Destination) {
    // Navigate to the destination details page
    this.router.navigate(['/destinations', destination.id]);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getMapUrl(name: string, country: string): SafeResourceUrl {
    const query = encodeURIComponent(`${name}, ${country}`);
    const url = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${query}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScroll.bind(this));
  }

  toggleArticle(index: number) {
    if (this.expandedArticles.has(index)) {
      this.expandedArticles.delete(index);
    } else {
      this.expandedArticles.add(index);
    }
  }

  isArticleExpanded(index: number): boolean {
    return this.expandedArticles.has(index);
  }

  selectGuide(guide: any) {
    this.selectedGuide = guide;
  }

  closeGuideDetails() {
    this.selectedGuide = null;
  }

  selectPackage(pkg: any) {
    this.selectedPackage = pkg;
  }

  closePackageDetails() {
    this.selectedPackage = null;
  }

  selectCompany(company: any) {
    this.selectedCompany = company;
  }

  closeCompanyDetails() {
    this.selectedCompany = null;
  }

  selectProvider(provider: any) {
    this.selectedProvider = provider;
  }

  closeProviderDetails() {
    this.selectedProvider = null;
  }

  toggleFAQ(index: number) {
    if (this.expandedFAQs.has(index)) {
      this.expandedFAQs.delete(index);
    } else {
      this.expandedFAQs.add(index);
    }
  }

  isFAQExpanded(index: number): boolean {
    return this.expandedFAQs.has(index);
  }

  contactGuide(guide: any, method: 'phone' | 'email' | 'whatsapp') {
    if (method === 'phone') {
      window.location.href = `tel:${guide.phone}`;
    } else if (method === 'email') {
      window.location.href = `mailto:${guide.email}`;
    } else if (method === 'whatsapp' && guide.whatsapp) {
      window.open(`https://wa.me/${guide.whatsapp.replace(/[^0-9]/g, '')}`, '_blank');
    }
  }

  contactProvider(contact: string, method: 'phone' | 'email') {
    if (method === 'phone') {
      window.location.href = `tel:${contact}`;
    } else if (method === 'email') {
      window.location.href = `mailto:${contact}`;
    }
  }

  bookPackage(pkg: any) {
    // Navigate to booking page with package details
    this.router.navigate(['/booking'], {
      queryParams: {
        destinationId: this.destination?.id,
        destinationName: this.destination?.name,
        packageType: pkg.type,
        packageId: pkg.id,
        packagePrice: pkg.pricePerDay
      }
    });
  }

  selectVendor(vendor: any) {
    this.selectedVendor = vendor;
  }

  closeVendorDetails() {
    this.selectedVendor = null;
  }

  contactVendor(contact: any, method: 'phone' | 'email' | 'website') {
    if (method === 'phone') {
      window.location.href = `tel:${contact.phone}`;
    } else if (method === 'email') {
      window.location.href = `mailto:${contact.email}`;
    } else if (method === 'website') {
      window.open(`https://${contact.website}`, '_blank');
    }
  }

  selectHotel(hotel: any) {
    this.selectedHotel = hotel;
  }

  closeHotelDetails() {
    this.selectedHotel = null;
  }

  selectRestaurant(restaurant: any) {
    this.selectedRestaurant = restaurant;
  }

  closeRestaurantDetails() {
    this.selectedRestaurant = null;
  }

  selectPhotographer(photographer: any) {
    this.selectedPhotographer = photographer;
  }

  closePhotographerDetails() {
    this.selectedPhotographer = null;
  }

  contactPhotographer(photographer: any, method: 'phone' | 'email' | 'whatsapp' | 'portfolio') {
    if (method === 'phone') {
      window.location.href = `tel:${photographer.phone}`;
    } else if (method === 'email') {
      window.location.href = `mailto:${photographer.email}`;
    } else if (method === 'whatsapp') {
      window.open(`https://wa.me/${photographer.whatsapp.replace(/[^0-9]/g, '')}`, '_blank');
    } else if (method === 'portfolio') {
      window.open(`https://${photographer.portfolio}`, '_blank');
    }
  }
}
