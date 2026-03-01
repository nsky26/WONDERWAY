// Smart recommendations service
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Destination } from '../models/destination.model';

export interface UserPreferences {
  favoriteCategories: string[];
  priceRange: { min: number; max: number };
  preferredRegions: string[];
  viewedDestinations: string[];
  bookedDestinations: string[];
}

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {
  private userPreferences: UserPreferences = {
    favoriteCategories: [],
    priceRange: { min: 0, max: 10000 },
    preferredRegions: [],
    viewedDestinations: [],
    bookedDestinations: []
  };

  constructor() {
    this.loadUserPreferences();
  }

  private loadUserPreferences(): void {
    const saved = localStorage.getItem('userPreferences');
    if (saved) {
      this.userPreferences = JSON.parse(saved);
    }
  }

  private saveUserPreferences(): void {
    localStorage.setItem('userPreferences', JSON.stringify(this.userPreferences));
  }

  // Track user behavior
  trackDestinationView(destinationId: string): void {
    if (!this.userPreferences.viewedDestinations.includes(destinationId)) {
      this.userPreferences.viewedDestinations.push(destinationId);
      // Keep only last 50 views
      if (this.userPreferences.viewedDestinations.length > 50) {
        this.userPreferences.viewedDestinations.shift();
      }
      this.saveUserPreferences();
    }
  }

  trackDestinationBooking(destinationId: string): void {
    if (!this.userPreferences.bookedDestinations.includes(destinationId)) {
      this.userPreferences.bookedDestinations.push(destinationId);
      this.saveUserPreferences();
    }
  }

  trackCategoryInterest(category: string): void {
    const index = this.userPreferences.favoriteCategories.indexOf(category);
    if (index === -1) {
      this.userPreferences.favoriteCategories.push(category);
    } else {
      // Move to front (most recent)
      this.userPreferences.favoriteCategories.splice(index, 1);
      this.userPreferences.favoriteCategories.unshift(category);
    }
    // Keep only top 5 categories
    if (this.userPreferences.favoriteCategories.length > 5) {
      this.userPreferences.favoriteCategories.pop();
    }
    this.saveUserPreferences();
  }

  trackRegionInterest(region: string): void {
    if (!this.userPreferences.preferredRegions.includes(region)) {
      this.userPreferences.preferredRegions.push(region);
      this.saveUserPreferences();
    }
  }

  // Get personalized recommendations
  getPersonalizedRecommendations(
    allDestinations: Destination[],
    count: number = 6
  ): Destination[] {
    const scored = allDestinations.map(dest => ({
      destination: dest,
      score: this.calculateRecommendationScore(dest)
    }));

    // Sort by score and return top N
    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, count)
      .map(item => item.destination);
  }

  private calculateRecommendationScore(destination: Destination): number {
    let score = 0;

    // Category match (highest weight)
    if (this.userPreferences.favoriteCategories.includes(destination.category)) {
      const categoryIndex = this.userPreferences.favoriteCategories.indexOf(destination.category);
      score += (5 - categoryIndex) * 20; // 100, 80, 60, 40, 20 points
    }

    // Region match
    if (this.userPreferences.preferredRegions.includes(destination.region)) {
      score += 30;
    }

    // Price range match
    if (destination.price >= this.userPreferences.priceRange.min &&
        destination.price <= this.userPreferences.priceRange.max) {
      score += 25;
    }

    // Rating boost
    score += destination.rating * 10;

    // Popular destinations get a boost
    if (destination.isPopular) {
      score += 15;
    }

    // New destinations get a small boost
    if (destination.isNew) {
      score += 10;
    }

    // Discount boost
    if (destination.discount && destination.discount > 0) {
      score += destination.discount / 2; // Up to 20 points for 40% discount
    }

    // Penalize already viewed destinations
    if (this.userPreferences.viewedDestinations.includes(destination.id)) {
      score -= 20;
    }

    // Penalize already booked destinations
    if (this.userPreferences.bookedDestinations.includes(destination.id)) {
      score -= 50;
    }

    return score;
  }

  // Get similar destinations based on a specific destination
  getSimilarDestinations(
    currentDestination: Destination,
    allDestinations: Destination[],
    count: number = 3
  ): Destination[] {
    const scored = allDestinations
      .filter(dest => dest.id !== currentDestination.id)
      .map(dest => ({
        destination: dest,
        score: this.calculateSimilarityScore(currentDestination, dest)
      }));

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, count)
      .map(item => item.destination);
  }

  private calculateSimilarityScore(
    reference: Destination,
    candidate: Destination
  ): number {
    let score = 0;

    // Same category (highest weight)
    if (reference.category === candidate.category) {
      score += 50;
    }

    // Same region
    if (reference.region === candidate.region) {
      score += 30;
    }

    // Similar price range (within 30%)
    const priceDiff = Math.abs(reference.price - candidate.price);
    const priceRatio = priceDiff / reference.price;
    if (priceRatio < 0.3) {
      score += 25 * (1 - priceRatio);
    }

    // Similar rating (within 0.5)
    const ratingDiff = Math.abs(reference.rating - candidate.rating);
    if (ratingDiff < 0.5) {
      score += 20 * (1 - ratingDiff);
    }

    // Same country
    if (reference.country === candidate.country) {
      score += 15;
    }

    // Popular destinations get a boost
    if (candidate.isPopular) {
      score += 10;
    }

    return score;
  }

  // Get trending destinations
  getTrendingDestinations(
    allDestinations: Destination[],
    count: number = 6
  ): Destination[] {
    return allDestinations
      .filter(dest => dest.isTrending)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, count);
  }

  // Get destinations by season
  getSeasonalRecommendations(
    allDestinations: Destination[],
    month: string,
    count: number = 6
  ): Destination[] {
    return allDestinations
      .filter(dest => dest.bestTimeToVisit.toLowerCase().includes(month.toLowerCase()))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, count);
  }

  // Get budget-friendly destinations
  getBudgetFriendlyDestinations(
    allDestinations: Destination[],
    maxPrice: number,
    count: number = 6
  ): Destination[] {
    return allDestinations
      .filter(dest => dest.price <= maxPrice)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, count);
  }

  // Get luxury destinations
  getLuxuryDestinations(
    allDestinations: Destination[],
    minPrice: number,
    count: number = 6
  ): Destination[] {
    return allDestinations
      .filter(dest => dest.price >= minPrice)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, count);
  }

  // Clear user preferences (for testing or logout)
  clearPreferences(): void {
    this.userPreferences = {
      favoriteCategories: [],
      priceRange: { min: 0, max: 10000 },
      preferredRegions: [],
      viewedDestinations: [],
      bookedDestinations: []
    };
    localStorage.removeItem('userPreferences');
  }
}
