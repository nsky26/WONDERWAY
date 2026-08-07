import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { PdfGeneratorService } from '../../services/pdf-generator.service';
import { AuthService } from '../../services/auth.service';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-bookings.html',
  styleUrls: ['./my-bookings.css']
})
export class MyBookingsComponent implements OnInit {
  bookings: any[] = [];
  filteredBookings: any[] = [];
  activeFilter = 'all';
  filters = ['all', 'flight', 'hotel', 'bus', 'car', 'package'];

  constructor(
    public router: Router, 
    private pdfService: PdfGeneratorService, 
    public auth: AuthService,
    public currencyService: CurrencyService
  ) {}

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    try {
      if (typeof window !== 'undefined') {
        this.bookings = JSON.parse(localStorage.getItem('wonderway_bookings') || '[]');
        this.bookings.sort((a, b) => new Date(b.createdAt || Date.now()).getTime() - new Date(a.createdAt || Date.now()).getTime());
        this.applyFilter(this.activeFilter);
      }
    } catch {
      this.bookings = [];
      this.filteredBookings = [];
    }
  }

  applyFilter(filter: string) {
    this.activeFilter = filter;
    this.filteredBookings = filter === 'all'
      ? this.bookings
      : this.bookings.filter(b => b.bookingType === filter);
  }

  deleteBooking(id: string) {
    if (confirm('Are you sure you want to cancel and remove this booking?')) {
      this.bookings = this.bookings.filter(b => b.id !== id && b.bookingId !== id);
      if (typeof window !== 'undefined') {
        localStorage.setItem('wonderway_bookings', JSON.stringify(this.bookings));
      }
      this.applyFilter(this.activeFilter);
    }
  }

  downloadPDF(booking: any) {
    const rawType = booking.bookingType || 'Booking';
    const type = rawType.charAt(0).toUpperCase() + rawType.slice(1);
    this.pdfService.generateBookingPDF(booking, type);
  }

  getTypeIcon(type: string): string {
    const icons: { [key: string]: string } = {
      flight: '✈️', hotel: '🏨', bus: '🚌', car: '🚗', package: '📦', cruise: '🚢'
    };
    return icons[type] || '🎫';
  }

  getTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      flight: 'Flight', hotel: 'Hotel', bus: 'Bus', car: 'Car Rental', package: 'Package', cruise: 'Cruise'
    };
    return labels[type] || type;
  }

  countByType(type: string): number {
    if (type === 'all') return this.bookings.length;
    return this.bookings.filter(b => b.bookingType === type).length;
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '—';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch {
      return dateStr;
    }
  }

  formatPrice(price: number): string {
    return this.currencyService.formatPrice(price);
  }
}
