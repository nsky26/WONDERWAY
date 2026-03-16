import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { PdfGeneratorService } from '../../services/pdf-generator.service';
import { AuthService } from '../../services/auth.service';

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

  constructor(public router: Router, private pdfService: PdfGeneratorService, private auth: AuthService) {}

  ngOnInit() {
    if (!this.auth.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadBookings();
  }

  loadBookings() {
    try {
      this.bookings = JSON.parse(localStorage.getItem('wonderway_bookings') || '[]');
      this.bookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      this.applyFilter(this.activeFilter);
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
    this.bookings = this.bookings.filter(b => b.id !== id && b.bookingId !== id);
    localStorage.setItem('wonderway_bookings', JSON.stringify(this.bookings));
    this.applyFilter(this.activeFilter);
  }

  downloadPDF(booking: any) {
    const type = booking.bookingType?.charAt(0).toUpperCase() + booking.bookingType?.slice(1) || 'Booking';
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
    return this.bookings.filter(b => b.bookingType === type).length;
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }
}
