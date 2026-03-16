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
    path: 'flights',
    loadComponent: () => import('./pages/flights/flights').then(m => m.FlightsComponent)
  },
  {
    path: 'hotels',
    loadComponent: () => import('./pages/hotels/hotels').then(m => m.HotelsComponent)
  },
  {
    path: 'buses',
    loadComponent: () => import('./pages/buses/buses').then(m => m.BusesComponent)
  },
  {
    path: 'cars',
    loadComponent: () => import('./pages/cars/cars').then(m => m.CarsComponent)
  },
  {
    path: 'my-bookings',
    loadComponent: () => import('./pages/my-bookings/my-bookings').then(m => m.MyBookingsComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup').then(m => m.SignupComponent)
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
