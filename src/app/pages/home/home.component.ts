// WonderWay Home Component - Complete Redesign
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

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
    FormsModule,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('destinationsScroll') destinationsScroll!: ElementRef;

  // Theme
  isDarkMode = true;

  // Booking tabs
  bookingTabs = ['Flights', 'Hotels', 'Packages', 'Cars', 'Cruises'];
  activeTab = 'Flights';

  // Booking form
  bookingForm = {
    from: '',
    to: '',
    date: '',
    travelers: 1
  };

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

    // Get observables
    this.destinations$ = this.destinationsService.getPopularDestinations();
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

  // Search booking
  searchBooking(): void {
    console.log('Searching:', this.activeTab, this.bookingForm);
    this.router.navigate(['/destinations'], {
      queryParams: {
        type: this.activeTab.toLowerCase(),
        from: this.bookingForm.from,
        to: this.bookingForm.to
      }
    });
  }

  // View destination details
  viewDestination(destination: Destination): void {
    this.store.dispatch(DestinationsActions.selectDestination({ destination }));
    this.router.navigate(['/destinations', destination.id]);
  }

  // Get stars for rating
  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }
}
