// Image service for high-quality destination images
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  
  // Unsplash Access Key (In production, use environment variables)
  // Get your free key at: https://unsplash.com/developers
  private readonly UNSPLASH_ACCESS_KEY = 'YOUR_UNSPLASH_ACCESS_KEY';
  
  // Curated collection of travel images by destination type
  private destinationImageCollections: { [key: string]: string[] } = {
    // Beach destinations
    'Beach': [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&h=600&fit=crop'
    ],
    
    // Heritage/Historical
    'Heritage': [
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1513581166391-887a96ddeafd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop'
    ],
    
    // Nature/Mountains
    'Nature': [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop'
    ],
    
    // Adventure
    'Adventure': [
      'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&h=600&fit=crop'
    ],
    
    // City & Culture
    'City': [
      'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop'
    ],
    
    'City & Culture': [
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1431274172761-fca41d930114?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&h=600&fit=crop'
    ],
    
    // Spiritual
    'Spiritual': [
      'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1604608672516-f1b9b1a4a0e5?w=800&h=600&fit=crop'
    ],
    
    // Beach & Luxury
    'Beach & Luxury': [
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&h=600&fit=crop'
    ]
  };

  constructor() {}

  /**
   * Get a high-quality image for a destination based on category
   * @param category - Destination category
   * @param index - Index for variety
   * @returns Image URL
   */
  getDestinationImage(category: string, index: number = 0): string {
    const images = this.destinationImageCollections[category] || this.destinationImageCollections['City'];
    const imageIndex = index % images.length;
    return images[imageIndex];
  }

  /**
   * Get image URL with specific dimensions
   * @param baseUrl - Base Unsplash URL
   * @param width - Desired width
   * @param height - Desired height
   * @returns Formatted URL
   */
  getImageWithDimensions(baseUrl: string, width: number, height: number): string {
    if (baseUrl.includes('unsplash.com')) {
      // Remove existing dimensions and add new ones
      const cleanUrl = baseUrl.split('?')[0];
      return `${cleanUrl}?w=${width}&h=${height}&fit=crop&q=80`;
    }
    return baseUrl;
  }

  /**
   * Get optimized image for different screen sizes
   * @param baseUrl - Base image URL
   * @param size - Size variant (thumbnail, medium, large, hero)
   * @returns Optimized URL
   */
  getOptimizedImage(baseUrl: string, size: 'thumbnail' | 'medium' | 'large' | 'hero' = 'medium'): string {
    const dimensions = {
      thumbnail: { w: 400, h: 300 },
      medium: { w: 800, h: 600 },
      large: { w: 1200, h: 800 },
      hero: { w: 1920, h: 1080 }
    };

    const { w, h } = dimensions[size];
    return this.getImageWithDimensions(baseUrl, w, h);
  }

  /**
   * Generate srcset for responsive images
   * @param baseUrl - Base image URL
   * @returns srcset string
   */
  generateSrcSet(baseUrl: string): string {
    if (!baseUrl.includes('unsplash.com')) {
      return baseUrl;
    }

    const cleanUrl = baseUrl.split('?')[0];
    return `
      ${cleanUrl}?w=400&h=300&fit=crop&q=80 400w,
      ${cleanUrl}?w=800&h=600&fit=crop&q=80 800w,
      ${cleanUrl}?w=1200&h=800&fit=crop&q=80 1200w,
      ${cleanUrl}?w=1600&h=1000&fit=crop&q=80 1600w
    `.trim();
  }

  /**
   * Get fallback image if primary fails
   * @param category - Destination category
   * @returns Fallback image URL
   */
  getFallbackImage(category: string = 'City'): string {
    return this.getDestinationImage(category, 0);
  }

  /**
   * Preload image for better performance
   * @param url - Image URL to preload
   */
  preloadImage(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject();
      img.src = url;
    });
  }

  /**
   * Get random image from category
   * @param category - Destination category
   * @returns Random image URL
   */
  getRandomImage(category: string): string {
    const images = this.destinationImageCollections[category] || this.destinationImageCollections['City'];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  }
}
