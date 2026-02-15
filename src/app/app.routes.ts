// Application routes configuration
import { Routes } from '@angular/router';

// Lazy-loaded route imports
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'destinations',
    loadComponent: () => import('./pages/destinations/destinations.component').then(m => m.DestinationsComponent)
  },
  {
    path: 'destinations/:id',
    loadComponent: () => import('./pages/destination-details/destination-details.component').then(m => m.DestinationDetailsComponent)
  },
  {
    path: 'booking',
    loadComponent: () => import('./pages/booking/booking.component').then(m => m.BookingComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
