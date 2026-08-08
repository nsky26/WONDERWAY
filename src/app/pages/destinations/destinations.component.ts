// Destinations listing page
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { PageHeaderComponent } from '../../components/page-header/page-header.component';

import { Destination } from '../../models/destination.model';
import { DestinationsService } from '../../services/destinations.service';
import { CurrencyService } from '../../services/currency.service';
import * as DestinationsActions from '../../store/destinations/destinations.actions';

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css']
})
export class DestinationsComponent implements OnInit, OnDestroy {
  allDestinations: Destination[] = [];
  filteredDestinations: Destination[] = [];
  loading = true;
  
  // Scroll behavior
  searchBarVisible = true;
  showScrollToTop = false;
  private lastScrollTop = 0;
  
  // Filter panel state
  filtersOpen = false;
  
  // Filter options
  selectedRegion: 'All' | 'National' | 'International' = 'All';
  selectedCategory: string = 'All';
  selectedPriceRange: string = 'All';
  selectedRating: number = 0;
  selectedMonth: string = 'All';
  sortBy: string = 'popular';
  searchQuery: string = '';
  
  // Special feature filters
  showPopularOnly = false;
  showNewOnly = false;
  showTrendingOnly = false;
  showDiscountOnly = false;
  
  // Available filter options
  categories: string[] = ['All', 'Heritage', 'Nature', 'Adventure', 'Spiritual', 'Beach', 'City', 'City & Culture', 'Beach & Luxury'];
  priceRanges = [
    { label: 'All Prices', value: 'All', min: 0, max: Infinity },
    { label: 'Under $500', value: 'under500', min: 0, max: 500 },
    { label: '$500 - $1000', value: '500-1000', min: 500, max: 1000 },
    { label: '$1000 - $1500', value: '1000-1500', min: 1000, max: 1500 },
    { label: 'Above $1500', value: 'above1500', min: 1500, max: Infinity }
  ];
  
  months = [
    { label: 'All Months', value: 'All' },
    { label: 'January', value: 'January' },
    { label: 'February', value: 'February' },
    { label: 'March', value: 'March' },
    { label: 'April', value: 'April' },
    { label: 'May', value: 'May' },
    { label: 'June', value: 'June' },
    { label: 'July', value: 'July' },
    { label: 'August', value: 'August' },
    { label: 'September', value: 'September' },
    { label: 'October', value: 'October' },
    { label: 'November', value: 'November' },
    { label: 'December', value: 'December' }
  ];
  
  // Chatbot properties
  chatbotOpen = false;
  chatInput = '';
  chatMessages: Array<{type: 'user' | 'bot', text: string, time: string}> = [];
  chatSuggestions = [
    '🏖️ Best beach destinations',
    '🏔️ Mountain adventures',
    '💰 Budget-friendly trips',
    '⭐ Top rated places',
    '🎯 Recommend for me'
  ];

  constructor(
    private store: Store,
    private router: Router,
    private destinationsService: DestinationsService,
    public currencyService: CurrencyService
  ) {}

  @HostListener('window:scroll')
  onWindowScroll() {
    if (typeof window === 'undefined') return;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Show scroll to top button after scrolling 300px
    this.showScrollToTop = scrollTop > 300;
    
    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }

  scrollToTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  scrollToFilters() {
    if (typeof document !== 'undefined') {
      const filtersElement = document.querySelector('.filters-sidebar');
      if (filtersElement) {
        filtersElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  toggleFilters() {
    this.filtersOpen = !this.filtersOpen;
  }

  closeFilters() {
    this.filtersOpen = false;
  }

  ngOnInit() {
    this.loadDestinations();
    this.initializeChatbot();
  }

  initializeChatbot() {
    this.chatMessages.push({
      type: 'bot',
      text: 'Hello! I\'m your WonderWay travel assistant. I can help you find perfect destinations, get best deals, plan your trip, and recommend based on preferences. What are you looking for today?',
      time: this.getCurrentTime()
    });
  }

  toggleChatbot() {
    this.chatbotOpen = !this.chatbotOpen;
  }

  sendMessage() {
    if (!this.chatInput.trim()) return;

    this.chatMessages.push({
      type: 'user',
      text: this.chatInput,
      time: this.getCurrentTime()
    });

    const response = this.getBotResponse(this.chatInput);
    
    setTimeout(() => {
      this.chatMessages.push({
        type: 'bot',
        text: response,
        time: this.getCurrentTime()
      });
      this.scrollChatToBottom();
    }, 500);

    this.chatInput = '';
  }

  useSuggestion(suggestion: string) {
    this.chatInput = suggestion;
    this.sendMessage();
  }

  getBotResponse(input: string): string {
    const lowerInput = input.toLowerCase();
    
    // Personalized recommendations
    if (lowerInput.includes('recommend') || lowerInput.includes('suggest')) {
      const topDestinations = this.filteredDestinations.slice(0, 3);
      if (topDestinations.length > 0) {
        let response = '🎯 Based on current filters, I recommend:\n\n';
        topDestinations.forEach((d, i) => {
          response += `${i + 1}. ${d.name}, ${d.country}\n   ⭐ ${d.rating} | 💰 $${d.price} | ${d.category}\n\n`;
        });
        response += 'Would you like more details about any of these?';
        return response;
      }
    }

    // Beach destinations
    if (lowerInput.includes('beach')) {
      this.selectedCategory = 'Beach';
      this.applyFilters();
      return `🏖️ Found ${this.filteredDestinations.length} amazing beach destinations!\n\nI've filtered the results for you. Check out the beautiful coastal paradises available!`;
    }

    // Mountain/Adventure
    if (lowerInput.includes('mountain') || lowerInput.includes('adventure')) {
      this.selectedCategory = 'Adventure';
      this.applyFilters();
      return `🏔️ Found ${this.filteredDestinations.length} thrilling mountain destinations!\n\nPerfect for adventure seekers! I've filtered the results for you.`;
    }

    // Budget friendly
    if (lowerInput.includes('budget') || lowerInput.includes('cheap') || lowerInput.includes('affordable')) {
      this.selectedPriceRange = 'under500';
      this.applyFilters();
      return `💰 Found ${this.filteredDestinations.length} budget-friendly destinations under $500!\n\nGreat value trips that won't break the bank. Check them out!`;
    }

    // Top rated
    if (lowerInput.includes('top rated') || lowerInput.includes('best') || lowerInput.includes('highest rated')) {
      this.selectedRating = 4.5;
      this.sortBy = 'rating';
      this.applyFilters();
      return `⭐ Found ${this.filteredDestinations.length} top-rated destinations (4.5+ stars)!\n\nThese are our highest-rated places loved by travelers!`;
    }

    // Popular destinations
    if (lowerInput.includes('popular') || lowerInput.includes('trending')) {
      this.showPopularOnly = true;
      this.applyFilters();
      return `🔥 Found ${this.filteredDestinations.length} popular destinations!\n\nThese are the most visited and loved places right now!`;
    }

    // Specific destination search
    const destination = this.allDestinations.find(d => 
      lowerInput.includes(d.name.toLowerCase())
    );

    if (destination) {
      return `✈️ ${destination.name}, ${destination.country}\n\n` +
             `${destination.description}\n\n` +
             `💰 Starting from $${destination.price}\n` +
             `⭐ Rating: ${destination.rating}/5 (${destination.reviews} reviews)\n` +
             `⏱️ Duration: ${destination.duration}\n` +
             `🏷️ Category: ${destination.category}\n\n` +
             `Click on the destination card to view full details and book!`;
    }

    // International vs National
    if (lowerInput.includes('international')) {
      this.selectedRegion = 'International';
      this.applyFilters();
      return `🌍 Found ${this.filteredDestinations.length} international destinations!\n\nExplore amazing places around the world!`;
    }

    if (lowerInput.includes('india') || lowerInput.includes('national') || lowerInput.includes('domestic')) {
      this.selectedRegion = 'National';
      this.applyFilters();
      return `🇮🇳 Found ${this.filteredDestinations.length} destinations across India!\n\nDiscover the incredible diversity of India!`;
    }

    // Price information
    if (lowerInput.includes('price') || lowerInput.includes('cost')) {
      return '💰 Our destinations range from:\n\n' +
             '💵 Budget: Under $500\n' +
             '💳 Mid-range: $500 - $1,000\n' +
             '💎 Premium: $1,000 - $1,500\n' +
             '👑 Luxury: Above $1,500\n\n' +
             'Use the price filter on the left to find destinations in your budget!';
    }

    // Booking help
    if (lowerInput.includes('book') || lowerInput.includes('reserve')) {
      return '📅 To book a destination:\n\n' +
             '1️⃣ Browse and find your perfect destination\n' +
             '2️⃣ Click "View Details" to see full information\n' +
             '3️⃣ Click "Book Now" on the details page\n' +
             '4️⃣ Fill in your travel details\n' +
             '5️⃣ Confirm your booking!\n\n' +
             'Need help choosing? Just ask me!';
    }

    // Default helpful response
    return '🤖 I\'m here to help you find the perfect destination!\n\n' +
           'Try asking me:\n' +
           '• "Recommend beach destinations"\n' +
           '• "Show budget-friendly trips"\n' +
           '• "Top rated places"\n' +
           '• "Tell me about [destination name]"\n' +
           '• "Best time to visit India"\n\n' +
           'Or use the quick suggestions below!';
  }

  getCurrentTime(): string {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }

  scrollChatToBottom() {
    setTimeout(() => {
      if (typeof document !== 'undefined') {
        const chatContainer = document.querySelector('.chatbot-messages');
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      }
    }, 100);
  }

  loadDestinations() {
    this.loading = true;
    this.destinationsService.getDestinations().subscribe({
      next: (destinations) => {
        this.allDestinations = destinations;
        this.store.dispatch(DestinationsActions.loadDestinationsSuccess({ destinations }));
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('❌ Error loading destinations:', error);
        this.loading = false;
      }
    });
  }

  applyFilters() {
    let filtered = [...this.allDestinations];

    // STEP 1: Sort alphabetically FIRST (primary sort)
    filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));

    // STEP 2: Apply all filters
    if (this.selectedRegion !== 'All') {
      filtered = filtered.filter(d => d.region === this.selectedRegion);
    }

    if (this.selectedCategory !== 'All') {
      filtered = filtered.filter(d => d.category === this.selectedCategory);
    }

    if (this.selectedPriceRange !== 'All') {
      const range = this.priceRanges.find(r => r.value === this.selectedPriceRange);
      if (range) {
        filtered = filtered.filter(d => d.price >= range.min && d.price < range.max);
      }
    }

    if (this.selectedRating > 0) {
      filtered = filtered.filter(d => d.rating >= this.selectedRating);
    }

    // Month-based filtering
    if (this.selectedMonth !== 'All') {
      filtered = filtered.filter(d => {
        // Check if bestTimeToVisit contains the selected month
        return d.bestTimeToVisit.toLowerCase().includes(this.selectedMonth.toLowerCase());
      });
    }

    // Special feature filters
    if (this.showPopularOnly) {
      filtered = filtered.filter(d => d.isPopular);
    }
    if (this.showNewOnly) {
      filtered = filtered.filter(d => d.isNew);
    }
    if (this.showTrendingOnly) {
      filtered = filtered.filter(d => d.isTrending);
    }
    if (this.showDiscountOnly) {
      filtered = filtered.filter(d => d.discount && d.discount > 0);
    }

    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(d =>
        d.name.toLowerCase().includes(query) ||
        d.country.toLowerCase().includes(query) ||
        d.category.toLowerCase().includes(query) ||
        d.region.toLowerCase().includes(query)
      );
    }

    // STEP 3: Apply secondary sort based on user selection (if not 'name')
    // If sortBy is 'name', we already sorted alphabetically above
    if (this.sortBy !== 'name') {
      filtered = this.sortDestinations(filtered);
    }
    
    this.filteredDestinations = filtered;
  }

  sortDestinations(destinations: Destination[]): Destination[] {
    // Create a copy to avoid mutating the input
    const sorted = [...destinations];
    
    switch (this.sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => {
          const priceDiff = a.price - b.price;
          // If prices are equal, maintain alphabetical order
          return priceDiff !== 0 ? priceDiff : a.name.localeCompare(b.name);
        });
      case 'price-high':
        return sorted.sort((a, b) => {
          const priceDiff = b.price - a.price;
          return priceDiff !== 0 ? priceDiff : a.name.localeCompare(b.name);
        });
      case 'rating':
        return sorted.sort((a, b) => {
          const ratingDiff = b.rating - a.rating;
          return ratingDiff !== 0 ? ratingDiff : a.name.localeCompare(b.name);
        });
      case 'name':
        // Already sorted alphabetically in applyFilters
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'newest':
        return sorted.sort((a, b) => {
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return a.name.localeCompare(b.name);
        });
      case 'popular':
      default:
        return sorted.sort((a, b) => {
          if (a.isPopular && !b.isPopular) return -1;
          if (!a.isPopular && b.isPopular) return 1;
          const ratingDiff = b.rating - a.rating;
          return ratingDiff !== 0 ? ratingDiff : a.name.localeCompare(b.name);
        });
    }
  }

  // Helper methods for filter counts
  getRegionCount(region: string): number {
    return this.allDestinations.filter(d => d.region === region).length;
  }

  getCategoryCount(category: string): number {
    return this.allDestinations.filter(d => d.category === category).length;
  }

  onRegionChange(region: 'All' | 'National' | 'International') {
    this.selectedRegion = region;
    this.applyFilters();
  }

  onCategoryChange() {
    this.applyFilters();
  }

  onPriceRangeChange() {
    this.applyFilters();
  }

  onRatingChange() {
    this.applyFilters();
  }

  onSortChange() {
    this.applyFilters();
  }

  onSearchChange() {
    this.applyFilters();
  }

  clearSearch() {
    this.searchQuery = '';
    this.applyFilters();
  }

  clearAllFilters() {
    this.selectedRegion = 'All';
    this.selectedCategory = 'All';
    this.selectedPriceRange = 'All';
    this.selectedRating = 0;
    this.selectedMonth = 'All';
    this.sortBy = 'popular';
    this.searchQuery = '';
    this.showPopularOnly = false;
    this.showNewOnly = false;
    this.showTrendingOnly = false;
    this.showDiscountOnly = false;
    this.applyFilters();
  }

  getActiveFiltersCount(): number {
    let count = 0;
    if (this.selectedCategory !== 'All') count++;
    if (this.selectedPriceRange !== 'All') count++;
    if (this.selectedRating > 0) count++;
    if (this.selectedMonth !== 'All') count++;
    if (this.sortBy !== 'popular') count++;
    return count;
  }

  viewDestination(destination: Destination) {
    this.store.dispatch(DestinationsActions.selectDestination({ destination }));
    this.router.navigate(['/destinations', destination.id]);
  }

  bookDestination(event: Event, destination: Destination) {
    event.stopPropagation();
    this.store.dispatch(DestinationsActions.selectDestination({ destination }));
    this.router.navigate(['/booking'], {
      queryParams: {
        destinationId: destination.id,
        destinationName: destination.name,
        price: destination.price
      }
    });
  }

  formatPrice(price: number): string {
    return this.currencyService.formatPrice(price);
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  trackByDestinationId(index: number, destination: Destination): string {
    return destination.id;
  }

  onImageError(event: any) {
    // Use a reliable Picsum fallback image
    event.target.src = 'https://picsum.photos/seed/travel-fallback/800/600';
  }

  ngOnDestroy() {
    // Cleanup if needed
  }
}
