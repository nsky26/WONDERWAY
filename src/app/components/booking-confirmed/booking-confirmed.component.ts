import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-booking-confirmed',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
<div class="confirm-overlay" (click)="onClose()">
  <div class="confirm-modal" (click)="$event.stopPropagation()">
    <!-- Confetti dots -->
    <div class="confetti">
      <span *ngFor="let c of confetti" class="dot" [style.left]="c.x+'%'" [style.background]="c.color" [style.animation-delay]="c.delay+'s'"></span>
    </div>

    <div class="check-wrap">
      <div class="check-circle">
        <svg viewBox="0 0 52 52" fill="none">
          <circle cx="26" cy="26" r="25" stroke="#64ffda" stroke-width="2"/>
          <path class="check-path" d="M14 26l8 8 16-16" stroke="#64ffda" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>

    <h2 class="confirm-title">Booking Confirmed!</h2>
    <p class="confirm-sub">Your {{ bookingType }} has been booked successfully.</p>

    <div class="confirm-details" *ngIf="booking">
      <div class="detail-row">
        <span class="dl">Booking ID</span>
        <span class="dv mono">{{ booking.bookingId }}</span>
      </div>
      <div class="detail-row">
        <span class="dl">Name</span>
        <span class="dv">{{ booking.customerName }}</span>
      </div>
      <div class="detail-row" *ngIf="booking.from">
        <span class="dl">Route</span>
        <span class="dv">{{ booking.from }} → {{ booking.to }}</span>
      </div>
      <div class="detail-row" *ngIf="!booking.from && booking.to">
        <span class="dl">Destination</span>
        <span class="dv">{{ booking.to || booking.destinationName }}</span>
      </div>
      <div class="detail-row">
        <span class="dl">Date</span>
        <span class="dv">{{ booking.checkInDate | date:'mediumDate' }}</span>
      </div>
      <div class="detail-row highlight">
        <span class="dl">Total Paid</span>
        <span class="dv price">₹{{ booking.totalPrice | number }}</span>
      </div>
    </div>

    <p class="confirm-note">📄 PDF downloaded automatically · 📧 Confirmation sent to {{ booking?.email }}</p>

    <div class="confirm-actions">
      <button class="btn-pdf" (click)="onDownload()">📄 Download PDF Again</button>
      <a routerLink="/my-bookings" class="btn-bookings" (click)="onClose()">🎫 My Bookings</a>
      <button class="btn-close" (click)="onClose()">Close</button>
    </div>
  </div>
</div>
  `,
  styles: [`
.confirm-overlay {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(0,0,0,0.75);
  backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center;
  padding: 1rem;
  animation: fadeIn 0.25s ease;
}
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

.confirm-modal {
  position: relative;
  background: linear-gradient(160deg, #0d1b35 0%, #111827 100%);
  border: 1px solid rgba(100,255,218,0.2);
  border-radius: 24px;
  padding: 2.5rem 2rem;
  width: 100%; max-width: 460px;
  text-align: center;
  box-shadow: 0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(100,255,218,0.08);
  animation: slideUp 0.35s cubic-bezier(0.34,1.56,0.64,1);
  overflow: hidden;
}
@keyframes slideUp { from { opacity: 0; transform: translateY(40px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }

/* Confetti */
.confetti { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.dot {
  position: absolute; top: -10px; width: 8px; height: 8px; border-radius: 50%;
  animation: fall 2.5s ease-in forwards;
}
@keyframes fall {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(400px) rotate(720deg); opacity: 0; }
}

/* Check */
.check-wrap { display: flex; justify-content: center; margin-bottom: 1.5rem; }
.check-circle { width: 72px; height: 72px; animation: popIn 0.5s 0.1s cubic-bezier(0.34,1.56,0.64,1) both; }
@keyframes popIn { from { transform: scale(0); } to { transform: scale(1); } }
.check-circle svg { width: 100%; height: 100%; }
.check-path { stroke-dasharray: 50; stroke-dashoffset: 50; animation: drawCheck 0.5s 0.4s ease forwards; }
@keyframes drawCheck { to { stroke-dashoffset: 0; } }

.confirm-title { font-size: 1.8rem; font-weight: 900; color: #fff; margin-bottom: 0.4rem; }
.confirm-sub { color: rgba(255,255,255,0.55); font-size: 0.95rem; margin-bottom: 1.8rem; }

/* Details */
.confirm-details {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  padding: 1rem 1.2rem;
  margin-bottom: 1.2rem;
  text-align: left;
  display: flex; flex-direction: column; gap: 0.65rem;
}
.detail-row { display: flex; justify-content: space-between; align-items: center; gap: 1rem; }
.dl { font-size: 0.8rem; color: rgba(255,255,255,0.45); font-weight: 500; flex-shrink: 0; }
.dv { font-size: 0.88rem; color: rgba(255,255,255,0.85); font-weight: 600; text-align: right; }
.mono { font-family: monospace; font-size: 0.8rem; color: #64ffda; }
.detail-row.highlight { border-top: 1px solid rgba(255,255,255,0.08); padding-top: 0.65rem; margin-top: 0.1rem; }
.price { font-size: 1.1rem; color: #64ffda; font-weight: 800; }

.confirm-note { font-size: 0.78rem; color: rgba(255,255,255,0.35); margin-bottom: 1.5rem; line-height: 1.6; }

/* Actions */
.confirm-actions { display: flex; gap: 0.7rem; flex-wrap: wrap; justify-content: center; }
.btn-pdf, .btn-bookings, .btn-close {
  padding: 0.65rem 1.2rem; border-radius: 10px;
  font-size: 0.85rem; font-weight: 600; cursor: pointer;
  transition: all 0.2s ease; text-decoration: none; border: none;
}
.btn-pdf { background: rgba(100,255,218,0.12); color: #64ffda; border: 1px solid rgba(100,255,218,0.25); }
.btn-pdf:hover { background: rgba(100,255,218,0.22); }
.btn-bookings { background: linear-gradient(135deg, #64ffda, #667eea); color: #080f23; }
.btn-bookings:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(100,255,218,0.3); }
.btn-close { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.6); border: 1px solid rgba(255,255,255,0.1); }
.btn-close:hover { background: rgba(255,255,255,0.1); color: #fff; }
  `]
})
export class BookingConfirmedComponent {
  @Input() booking: any = null;
  @Input() bookingType = 'booking';
  @Output() close = new EventEmitter<void>();
  @Output() download = new EventEmitter<void>();

  confetti = Array.from({ length: 20 }, (_, i) => ({
    x: Math.random() * 100,
    color: ['#64ffda','#667eea','#f093fb','#ffd93d','#ff6b6b'][i % 5],
    delay: Math.random() * 0.8
  }));

  onClose() { this.close.emit(); }
  onDownload() { this.download.emit(); }
}
