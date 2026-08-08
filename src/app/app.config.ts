// Application configuration with NgRx store and routing
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

// Import the routes defined in app.routes.ts
import { routes } from './app.routes';

// Import reducers
import { destinationsReducer } from './store/destinations/destinations.reducer';
import { offersReducer } from './store/offers/offers.reducer';
import { testimonialsReducer } from './store/testimonials/testimonials.reducer';
import { bookingsReducer } from './store/bookings/bookings.reducer';

// Import services
import { DestinationsService } from './services/destinations.service';
import { OffersService } from './services/offers.service';
import { TestimonialsService } from './services/testimonials.service';
import { BookingsService } from './services/bookings.service';

// Export configuration to enable routing and state management
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes, withInMemoryScrolling({
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled'
    })),
    provideStore({
      destinations: destinationsReducer,
      offers: offersReducer,
      testimonials: testimonialsReducer,
      bookings: bookingsReducer
    }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false
    }),
    DestinationsService,
    OffersService,
    TestimonialsService,
    BookingsService
  ]
};
