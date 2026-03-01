// Helper to generate destination data
import { Destination } from '../models/destination.model';

// Indian states and cities for national destinations
const indianDestinations = [
  // Major tourist destinations
  { name: 'Taj Mahal', city: 'Agra', state: 'Uttar Pradesh', category: 'Heritage', price: 299 },
  { name: 'Jaipur', city: 'Jaipur', state: 'Rajasthan', category: 'Heritage', price: 399 },
  { name: 'Goa Beaches', city: 'Goa', state: 'Goa', category: 'Beach', price: 499 },
  { name: 'Kerala Backwaters', city: 'Alleppey', state: 'Kerala', category: 'Nature', price: 599 },
  { name: 'Varanasi', city: 'Varanasi', state: 'Uttar Pradesh', category: 'Spiritual', price: 349 },
  { name: 'Ladakh', city: 'Leh', state: 'Ladakh', category: 'Adventure', price: 899 },
  { name: 'Udaipur', city: 'Udaipur', state: 'Rajasthan', category: 'Heritage', price: 449 },
  { name: 'Rishikesh', city: 'Rishikesh', state: 'Uttarakhand', category: 'Spiritual', price: 399 },
  { name: 'Hampi', city: 'Hampi', state: 'Karnataka', category: 'Heritage', price: 349 },
  { name: 'Andaman Islands', city: 'Port Blair', state: 'Andaman', category: 'Beach', price: 799 },
  // Add more cities
  { name: 'Mumbai', city: 'Mumbai', state: 'Maharashtra', category: 'City', price: 599 },
  { name: 'Delhi', city: 'Delhi', state: 'Delhi', category: 'Heritage', price: 499 },
  { name: 'Bangalore', city: 'Bangalore', state: 'Karnataka', category: 'City', price: 549 },
  { name: 'Kolkata', city: 'Kolkata', state: 'West Bengal', category: 'Heritage', price: 449 },
  { name: 'Chennai', city: 'Chennai', state: 'Tamil Nadu', category: 'City', price: 499 },
];

export function generateIndianDestinations(): Destination[] {
  const destinations: Destination[] = [];
  let id = 1;

  indianDestinations.forEach((dest, index) => {
    destinations.push({
      id: `nat-${id++}`,
      name: dest.name,
      country: 'India',
      region: 'National',
      description: `Explore ${dest.name} in ${dest.state}`,
      shortDescription: `${dest.category} destination in ${dest.state}`,
      imageUrl: `https://images.unsplash.com/photo-${1500000000000 + index}?w=800`,
      price: dest.price,
      rating: 4.5 + Math.random() * 0.4,
      reviews: Math.floor(Math.random() * 5000) + 1000,
      isPopular: index < 10,
      highlights: ['Local culture', 'Great food', 'Beautiful scenery'],
      bestTimeToVisit: 'October to March',
      duration: '3-5 days',
      category: dest.category
    });
  });

  return destinations;
}

// International destinations
const internationalCities = [
  { name: 'Paris', country: 'France', price: 1899 },
  { name: 'London', country: 'UK', price: 1999 },
  { name: 'New York', country: 'USA', price: 2199 },
  { name: 'Tokyo', country: 'Japan', price: 1699 },
];

export function generateInternationalDestinations(): Destination[] {
  const destinations: Destination[] = [];
  let id = 1;

  internationalCities.forEach((dest, index) => {
    destinations.push({
      id: `int-${id++}`,
      name: dest.name,
      country: dest.country,
      region: 'International',
      description: `Discover ${dest.name}`,
      shortDescription: `Amazing city in ${dest.country}`,
      imageUrl: `https://images.unsplash.com/photo-${1600000000000 + index}?w=800`,
      price: dest.price,
      rating: 4.6 + Math.random() * 0.3,
      reviews: Math.floor(Math.random() * 8000) + 2000,
      isPopular: index < 5,
      highlights: ['World-class attractions', 'Rich culture', 'Great cuisine'],
      bestTimeToVisit: 'Year-round',
      duration: '5-7 days',
      category: 'City & Culture'
    });
  });

  return destinations;
}
