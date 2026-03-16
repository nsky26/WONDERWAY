// WonderWay Home Component - Complete Redesign
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Destination } from '../../models/destination.model';
import { Offer } from '../../models/offer.model';
import { Testimonial } from '../../models/testimonial.model';

import { DestinationsService } from '../../services/destinations.service';
import { OffersService } from '../../services/offers.service';
import { TestimonialsService } from '../../services/testimonials.service';

import * as DestinationsActions from '../../store/destinations/destinations.actions';
import * as OffersActions from '../../store/offers/offers.actions';
import * as TestimonialsActions from '../../store/testimonials/testimonials.actions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('destinationsScroll') destinationsScroll!: ElementRef;
  @ViewChild('offersScroll') offersScroll!: ElementRef;
  @ViewChild('destinationsLeftBtn') destinationsLeftBtn!: ElementRef;
  @ViewChild('destinationsRightBtn') destinationsRightBtn!: ElementRef;
  @ViewChild('offersLeftBtn') offersLeftBtn!: ElementRef;
  @ViewChild('offersRightBtn') offersRightBtn!: ElementRef;

  // Theme
  isDarkMode = true;

  // Booking tabs
  bookingTabs = ['Flights', 'Hotels', 'Cars', 'Buses', 'Cruises'];
  activeTab = 'Flights';

  // Booking form
  bookingForm = {
    from: '',
    to: '',
    date: this.getTodayDate(),
    checkoutDate: this.getTomorrowDate(),
    travelers: 1,
    duration: '5',
    carType: 'economy'
  };
  
  // Get today's date in YYYY-MM-DD format
  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }
  
  // Get tomorrow's date in YYYY-MM-DD format
  getTomorrowDate(): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }
  
  // Get minimum date (today)
  getMinDate(): string {
    return this.getTodayDate();
  }
  
  // Get maximum date (3 months from now)
  getMaxDate(): string {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    return maxDate.toISOString().split('T')[0];
  }

  // Data observables
  destinations$!: Observable<Destination[]>;
  offers$!: Observable<Offer[]>;
  testimonials$!: Observable<Testimonial[]>;

  // Features data
  features = [
    {
      icon: '💰',
      title: 'Best Price Guarantee',
      description: 'We offer the most competitive prices with no hidden fees'
    },
    {
      icon: '🛡️',
      title: 'Secure Booking',
      description: 'Your data is protected with industry-leading security'
    },
    {
      icon: '🌍',
      title: 'Global Coverage',
      description: 'Access to destinations worldwide with local expertise'
    },
    {
      icon: '⏰',
      title: '24/7 Support',
      description: 'Round-the-clock customer service for your peace of mind'
    },
    {
      icon: '✨',
      title: 'Premium Experience',
      description: 'Curated travel experiences for discerning travelers'
    },
    {
      icon: '🎯',
      title: 'Personalized Service',
      description: 'Tailored recommendations based on your preferences'
    }
  ];

  constructor(
    private store: Store,
    private router: Router,
    private destinationsService: DestinationsService,
    private offersService: OffersService,
    private testimonialsService: TestimonialsService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.loadTheme();
  }

  ngAfterViewInit(): void {
    this.setupAutoScroll();
  }

  // Load data from services
  loadData(): void {
    // Load destinations
    this.destinationsService.getDestinations().subscribe(destinations => {
      this.store.dispatch(DestinationsActions.loadDestinationsSuccess({ destinations }));
    });

    // Load offers
    this.offersService.getOffers().subscribe(offers => {
      this.store.dispatch(OffersActions.loadOffersSuccess({ offers }));
    });

    // Load testimonials
    this.testimonialsService.getTestimonials().subscribe(testimonials => {
      this.store.dispatch(TestimonialsActions.loadTestimonialsSuccess({ testimonials }));
    });

    // Get observables - only trending destinations
    this.destinations$ = this.destinationsService.getTrendingDestinations();
    this.offers$ = this.offersService.getOffers();
    this.testimonials$ = this.testimonialsService.getTestimonials();
  }

  // Setup auto scroll for destinations
  setupAutoScroll(): void {
    if (this.destinationsScroll) {
      const scrollTrack = this.destinationsScroll.nativeElement.querySelector('.scroll-track');
      if (scrollTrack) {
        // Clone items for infinite scroll effect
        const items = scrollTrack.innerHTML;
        scrollTrack.innerHTML += items;
      }
    }
  }

  // Theme management
  loadTheme(): void {
    if (typeof localStorage !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      this.isDarkMode = savedTheme !== 'light';
      this.applyTheme();
    }
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    }
  }

  applyTheme(): void {
    if (typeof document !== 'undefined') {
      document.body.classList.toggle('light-mode', !this.isDarkMode);
      document.body.classList.toggle('dark-mode', this.isDarkMode);
    }
  }

  // Search booking - navigate to booking page with search results
  searchBooking(): void {
    this.searchError = '';
    
    // Validate required fields based on booking type
    let isValid = false;
    
    switch (this.activeTab) {
      case 'Flights':
      case 'Buses':
        isValid = !!(this.bookingForm.from && this.bookingForm.to && this.bookingForm.date);
        if (!isValid) this.searchError = 'Please fill in departure city, destination, and date';
        break;
      case 'Hotels':
        isValid = !!(this.bookingForm.to && this.bookingForm.date && this.bookingForm.checkoutDate);
        if (!isValid) this.searchError = 'Please fill in destination, check-in, and check-out dates';
        break;
      case 'Cars':
        isValid = !!(this.bookingForm.from && this.bookingForm.date && this.bookingForm.checkoutDate);
        if (!isValid) this.searchError = 'Please fill in pick-up location and dates';
        break;
      case 'Cruises':
        isValid = !!(this.bookingForm.to && this.bookingForm.date);
        if (!isValid) this.searchError = 'Please fill in destination and date';
        break;
    }
    
    if (!isValid) return;
    
    // Navigate to appropriate page based on booking type
    const bookingType = this.activeTab.toLowerCase();
    let route = '';
    
    switch (bookingType) {
      case 'flights':
        route = '/flights';
        break;
      case 'hotels':
        route = '/hotels';
        break;
      case 'buses':
        route = '/buses';
        break;
      case 'cars':
        route = '/cars';
        break;
      case 'cruises':
        route = '/booking'; // Cruises still go to booking page
        break;
      default:
        route = '/booking';
    }
    
    this.router.navigate([route], {
      queryParams: {
        bookingType: bookingType,
        from: this.bookingForm.from || '',
        to: this.bookingForm.to || '',
        date: this.bookingForm.date || '',
        checkoutDate: this.bookingForm.checkoutDate || '',
        travelers: this.bookingForm.travelers || 1,
        duration: this.bookingForm.duration || '',
        carType: this.bookingForm.carType || ''
      }
    });
  }

  // View destination details
  viewDestination(destination: Destination): void {
    this.store.dispatch(DestinationsActions.selectDestination({ destination }));
    this.router.navigate(['/destinations', destination.id]);
  }

  // Book destination directly
  bookDestination(event: Event, destination: Destination): void {
    console.log('🎫 Book Now clicked for:', destination.name);
    
    // Stop all event propagation
    if (event) {
      event.stopPropagation();
      event.stopImmediatePropagation();
      event.preventDefault();
    }
    
    console.log('📍 Navigating to booking page...');
    console.log('📦 Destination data:', {
      id: destination.id,
      name: destination.name,
      price: destination.price
    });
    
    // Navigate directly
    this.router.navigate(['/booking'], {
      queryParams: {
        destinationId: destination.id,
        destinationName: destination.name,
        price: destination.price
      }
    }).then(
      success => console.log('✅ Navigation SUCCESS:', success),
      error => console.error('❌ Navigation FAILED:', error)
    );
  }

  // Book offer directly
  bookOffer(event: Event, offer: Offer): void {
    event.stopPropagation();
    this.router.navigate(['/booking'], {
      queryParams: {
        destinationName: offer.destination,
        price: offer.discountedPrice,
        offerType: offer.type,
        offerId: offer.id
      }
    });
  }

  // Search validation error
  searchError = '';

  // Search autocomplete
  suggestions: string[] = [];
  showSuggestions: 'from' | 'to' | null = null;

  private allCities = [
    'Hyderabad', 'Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Kolkata',
    'Pune', 'Goa', 'Jaipur', 'Agra', 'Kochi', 'Ahmedabad', 'Surat',
    'Vijayawada', 'Visakhapatnam', 'Coimbatore', 'Mysore', 'Chandigarh',
    'Bhopal', 'Indore', 'Nagpur', 'Lucknow', 'Varanasi', 'Amritsar',
    'Dubai', 'Singapore', 'Bangkok', 'London', 'Paris', 'New York', 'Tokyo'
  ];

  onCityInput(field: 'from' | 'to', value: string) {
    if (value.length < 2) { this.suggestions = []; this.showSuggestions = null; return; }
    this.suggestions = this.allCities.filter(c => c.toLowerCase().startsWith(value.toLowerCase())).slice(0, 6);
    this.showSuggestions = this.suggestions.length ? field : null;
  }

  selectSuggestion(field: 'from' | 'to', city: string) {
    if (field === 'from') this.bookingForm.from = city;
    else this.bookingForm.to = city;
    this.suggestions = [];
    this.showSuggestions = null;
  }

  closeSuggestions() {
    setTimeout(() => { this.suggestions = []; this.showSuggestions = null; }, 200);
  }

  // Get stars for rating
  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  // Scroll destinations left or right
  scrollDestinations(direction: 'left' | 'right'): void {
    const container = this.destinationsScroll?.nativeElement;
    if (container) {
      const scrollAmount = 420; // Card width + gap
      const currentScroll = container.scrollLeft;
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  }

  // Scroll offers left or right
  scrollOffers(direction: 'left' | 'right'): void {
    const container = this.offersScroll?.nativeElement;
    if (container) {
      const scrollAmount = 400; // Card width + gap
      const currentScroll = container.scrollLeft;
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  }
}
