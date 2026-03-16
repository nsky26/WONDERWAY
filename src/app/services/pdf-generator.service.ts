// PDF Generator Service - Premium Booking Confirmation PDFs
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';

@Injectable({ providedIn: 'root' })
export class PdfGeneratorService {

  private readonly C = {
    teal:       [0,  185, 165]  as [number,number,number],
    tealDark:   [0,  140, 125]  as [number,number,number],
    tealFaint:  [230,250,248]   as [number,number,number],
    navy:       [15,  20,  50]  as [number,number,number],
    navyMid:    [30,  38,  80]  as [number,number,number],
    navyLight:  [55,  65, 110]  as [number,number,number],
    white:      [255,255,255]   as [number,number,number],
    offWhite:   [248,250,253]   as [number,number,number],
    grey:       [110,120,140]   as [number,number,number],
    greyLight:  [215,220,232]   as [number,number,number],
    greyFaint:  [240,243,248]   as [number,number,number],
    green:      [16, 185, 100]  as [number,number,number],
    greenFaint: [220,248,235]   as [number,number,number],
    gold:       [255,185,  0]   as [number,number,number],
    orange:     [255,120,  0]   as [number,number,number],
    black:      [25,  25,  35]  as [number,number,number],
    red:        [220,  50,  50] as [number,number,number],
  };

  generateBookingPDF(bookingData: any, bookingType: string): void {
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const W = 210;

    this.drawPageBackground(doc, W);
    let y = this.drawHeader(doc, W);
    y = this.drawBookingBanner(doc, bookingData, bookingType, W, y);
    y = this.drawCustomerSection(doc, bookingData, W, y);
    y = this.drawServiceSection(doc, bookingData, bookingType, W, y);
    y = this.drawPassengersSection(doc, bookingData, W, y);
    this.drawPricingSection(doc, bookingData, W, y);
    this.drawFooter(doc, W);

    const safeType = bookingType.replace(/[^a-zA-Z0-9]/g, '');
    doc.save(`WonderWay_${safeType}_${bookingData.bookingId || Date.now()}.pdf`);
  }

  // ── Page Background ──────────────────────────────────────────────────────────
  private drawPageBackground(doc: jsPDF, W: number): void {
    const H = 297;
    doc.setFillColor(...this.C.offWhite);
    doc.rect(0, 0, W, H, 'F');

    // Subtle diagonal stripe pattern (top-right corner accent)
    doc.setFillColor(...this.C.tealFaint);
    doc.rect(W - 60, 0, 60, 60, 'F');
    doc.setFillColor(...this.C.offWhite);
    // Cut the corner with a triangle effect using a white triangle
    doc.setFillColor(248, 250, 253);
    // Draw a simple diagonal by layering
    for (let i = 0; i < 60; i += 4) {
      doc.setFillColor(248 - i * 0.3, 250 - i * 0.3, 253 - i * 0.2);
      doc.rect(W - 60 + i, 0, 4, 60 - i, 'F');
    }

    // Left side accent bar (very subtle)
    doc.setFillColor(...this.C.tealFaint);
    doc.rect(0, 0, 3, H, 'F');
  }

  // ── Header ──────────────────────────────────────────────────────────────────
  private drawHeader(doc: jsPDF, W: number): number {
    const H_HDR = 42;

    // Main header background
    doc.setFillColor(...this.C.navy);
    doc.rect(0, 0, W, H_HDR, 'F');

    // Teal gradient-like accent at bottom of header
    doc.setFillColor(...this.C.teal);
    doc.rect(0, H_HDR - 3, W, 3, 'F');

    // Decorative circles in header (top-right)
    doc.setFillColor(...this.C.navyMid);
    doc.circle(W - 15, 5, 22, 'F');
    doc.setFillColor(...this.C.navyLight);
    doc.circle(W - 5, 15, 14, 'F');

    // Logo: WonderWay
    doc.setTextColor(...this.C.teal);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('WonderWay', 12, 18);

    // Tagline
    doc.setTextColor(180, 195, 220);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('Your Journey, Our Passion', 12, 25);

    // Teal dot separator
    doc.setFillColor(...this.C.teal);
    doc.circle(12, 31, 1, 'F');
    doc.circle(16, 31, 1, 'F');
    doc.circle(20, 31, 1, 'F');

    // Right: BOOKING CONFIRMATION label
    doc.setTextColor(...this.C.white);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('BOOKING CONFIRMATION', W - 12, 16, { align: 'right' });

    // Issued date
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(180, 195, 220);
    const issued = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
    doc.text(`Issued: ${issued}`, W - 12, 24, { align: 'right' });

    // Ref number
    doc.setFontSize(7.5);
    doc.setTextColor(...this.C.teal);
    doc.text('wonderway.com', W - 12, 31, { align: 'right' });

    return H_HDR + 8;
  }

  // ── Booking Banner ───────────────────────────────────────────────────────────
  private drawBookingBanner(doc: jsPDF, data: any, type: string, W: number, y: number): number {
    const BH = 32;
    const typeColors: Record<string, [number,number,number]> = {
      Flight: this.C.teal,
      Hotel:  [100, 80, 200],
      Bus:    [255, 140, 0],
      Car:    [50, 150, 255],
    };
    const accentColor = typeColors[type] || this.C.teal;

    // Card background
    doc.setFillColor(...this.C.navy);
    this.rr(doc, 10, y, W - 20, BH, 4, 'F');

    // Left accent stripe
    doc.setFillColor(...accentColor);
    this.rr(doc, 10, y, 6, BH, 3, 'F');
    doc.setFillColor(...this.C.navy);
    doc.rect(13, y, 3, BH, 'F'); // square off right side of stripe

    // Booking ID label + value
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...accentColor);
    doc.text('BOOKING ID', 22, y + 9);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...this.C.white);
    doc.text(data.bookingId || 'N/A', 22, y + 20);

    // Booking date below ID
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(160, 175, 200);
    const bDate = data.createdAt ? new Date(data.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '';
    doc.text(`Booked: ${bDate}`, 22, y + 27);

    // Centre: type badge
    const cx = W / 2;
    doc.setFillColor(...accentColor);
    this.rr(doc, cx - 24, y + 7, 48, 18, 3, 'F');
    doc.setTextColor(...this.C.navy);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    const typeLabel = type.toUpperCase();
    doc.text(typeLabel, cx, y + 18, { align: 'center' });

    // Right: CONFIRMED badge
    doc.setFillColor(...this.C.green);
    this.rr(doc, W - 52, y + 7, 38, 18, 3, 'F');
    doc.setTextColor(...this.C.white);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.text('CONFIRMED', W - 33, y + 18, { align: 'center' });

    return y + BH + 10;
  }

  // ── Customer Section ─────────────────────────────────────────────────────────
  private drawCustomerSection(doc: jsPDF, data: any, W: number, y: number): number {
    this.sectionTitle(doc, 'Customer Details', '👤', 10, y);
    y += 11;

    const CH = 30;
    this.card(doc, 10, y, W - 20, CH);

    // Three columns
    const colW = (W - 20) / 3;
    // Col 1: Name
    this.kvBlock(doc, 'FULL NAME', data.customerName || '—', 16, y + 7, colW - 6);
    // Col 2: Email
    this.kvBlock(doc, 'EMAIL ADDRESS', data.email || '—', 16 + colW, y + 7, colW - 6);
    // Col 3: Phone
    this.kvBlock(doc, 'PHONE NUMBER', data.phone || '—', 16 + colW * 2, y + 7, colW - 6);

    // Vertical dividers
    doc.setDrawColor(...this.C.greyLight);
    doc.setLineWidth(0.3);
    doc.line(10 + colW, y + 5, 10 + colW, y + CH - 5);
    doc.line(10 + colW * 2, y + 5, 10 + colW * 2, y + CH - 5);

    return y + CH + 10;
  }

  // ── Service Section ──────────────────────────────────────────────────────────
  private drawServiceSection(doc: jsPDF, data: any, type: string, W: number, y: number): number {
    const icons: Record<string, string> = { Flight: '✈', Hotel: '🏨', Bus: '🚌', Car: '🚗' };
    this.sectionTitle(doc, `${type} Details`, icons[type] || '📋', 10, y);
    y += 11;

    switch (type) {
      case 'Flight': return this.drawFlightCard(doc, data, W, y);
      case 'Hotel':  return this.drawHotelCard(doc, data, W, y);
      case 'Bus':    return this.drawBusCard(doc, data, W, y);
      case 'Car':    return this.drawCarCard(doc, data, W, y);
      default:       return this.drawGenericCard(doc, data, W, y);
    }
  }

  private drawFlightCard(doc: jsPDF, data: any, W: number, y: number): number {
    const item = data.selectedItem || {};
    const CH = 58;
    this.card(doc, 10, y, W - 20, CH);

    const fromCity = item.from || data.from || '—';
    const toCity   = item.to   || data.to   || '—';
    const midX = W / 2;

    // Route row
    // From city
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...this.C.navy);
    doc.text(fromCity, midX - 35, y + 16, { align: 'right' });

    // To city
    doc.text(toCity, midX + 35, y + 16, { align: 'left' });

    // Dashed line
    doc.setDrawColor(...this.C.greyLight);
    doc.setLineWidth(0.5);
    this.dashedLine(doc, midX - 28, y + 12, midX + 28, y + 12, 2, 2);

    // Plane icon on line
    doc.setFillColor(...this.C.teal);
    this.rr(doc, midX - 7, y + 8, 14, 8, 2, 'F');
    doc.setTextColor(...this.C.white);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('✈', midX, y + 14, { align: 'center' });

    // Duration + stops below line
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...this.C.grey);
    doc.text(item.duration || '', midX, y + 22, { align: 'center' });
    const stopsLabel = item.stops === 0 ? 'Non-stop' : `${item.stops} stop(s)`;
    doc.setFontSize(7);
    doc.setTextColor(item.stops === 0 ? this.C.green[0] : this.C.orange[0],
                     item.stops === 0 ? this.C.green[1] : this.C.orange[1],
                     item.stops === 0 ? this.C.green[2] : this.C.orange[2]);
    doc.text(stopsLabel, midX, y + 27, { align: 'center' });

    // Separator line
    doc.setDrawColor(...this.C.greyLight);
    doc.setLineWidth(0.3);
    doc.line(16, y + 31, W - 16, y + 31);

    // 4-column details
    const col = (W - 20) / 4;
    this.kvBlock(doc, 'AIRLINE', item.airline || '—', 16, y + 37, col - 4);
    this.kvBlock(doc, 'FLIGHT NO.', item.flightNumber || '—', 16 + col, y + 37, col - 4);
    this.kvBlock(doc, 'DEPARTURE', item.departureTime || '—', 16 + col * 2, y + 37, col - 4);
    this.kvBlock(doc, 'ARRIVAL', item.arrivalTime || '—', 16 + col * 3, y + 37, col - 4);

    // Class badge
    if (item.class) {
      const classColor = item.class === 'Business' ? this.C.gold : item.class === 'First' ? this.C.orange : this.C.teal;
      doc.setFillColor(...classColor);
      this.rr(doc, W - 42, y + 4, 28, 8, 2, 'F');
      doc.setTextColor(...this.C.navy);
      doc.setFontSize(6.5);
      doc.setFont('helvetica', 'bold');
      doc.text(item.class.toUpperCase(), W - 28, y + 9.5, { align: 'center' });
    }

    // Travel date
    if (data.checkInDate || data.date) {
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...this.C.grey);
      doc.text(`Travel Date: ${this.fmtDate(data.checkInDate || data.date)}`, 16, y + 27);
    }

    return y + CH + 10;
  }

  private drawHotelCard(doc: jsPDF, data: any, W: number, y: number): number {
    const item = data.selectedItem || {};
    const CH = 60;
    this.card(doc, 10, y, W - 20, CH);

    // Hotel name
    doc.setFontSize(15);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...this.C.navy);
    doc.text(item.name || data.destinationName || '—', 16, y + 12);

    // Star rating
    const stars = Math.min(5, Math.round(item.rating || 0));
    doc.setFontSize(11);
    doc.setTextColor(...this.C.gold);
    doc.text('★'.repeat(stars) + '☆'.repeat(5 - stars), 16, y + 21);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...this.C.grey);
    doc.text(`(${item.rating || '—'}/5)`, 16 + stars * 5.5 + 5, y + 21);

    // Location
    doc.setFontSize(8.5);
    doc.setTextColor(...this.C.grey);
    doc.text(`📍 ${item.location || ''}${item.city ? ', ' + item.city : ''}`, 16, y + 29);

    // Distance
    if (item.distance) {
      doc.setFontSize(7.5);
      doc.setTextColor(...this.C.teal);
      doc.text(item.distance, 16, y + 35);
    }

    // Amenities (up to 5)
    if (item.amenities?.length) {
      const shown = item.amenities.slice(0, 5);
      let ax = 16;
      shown.forEach((a: string) => {
        const tw = doc.getTextWidth(a) + 6;
        doc.setFillColor(...this.C.tealFaint);
        this.rr(doc, ax, y + 37, tw, 7, 1.5, 'F');
        doc.setTextColor(...this.C.tealDark);
        doc.setFontSize(6.5);
        doc.setFont('helvetica', 'bold');
        doc.text(a, ax + tw / 2, y + 42.5, { align: 'center' });
        ax += tw + 3;
      });
    }

    // Separator
    doc.setDrawColor(...this.C.greyLight);
    doc.setLineWidth(0.3);
    doc.line(16, y + 46, W - 16, y + 46);

    // 4-column dates
    const col = (W - 20) / 4;
    this.kvBlock(doc, 'CHECK-IN', this.fmtDate(data.checkInDate), 16, y + 51, col - 4);
    this.kvBlock(doc, 'CHECK-OUT', this.fmtDate(data.checkOutDate), 16 + col, y + 51, col - 4);
    this.kvBlock(doc, 'NIGHTS', String(this.calcNights(data.checkInDate, data.checkOutDate)), 16 + col * 2, y + 51, col - 4);
    this.kvBlock(doc, 'ROOM TYPE', item.roomType || 'Standard', 16 + col * 3, y + 51, col - 4);

    return y + CH + 10;
  }

  private drawBusCard(doc: jsPDF, data: any, W: number, y: number): number {
    const item = data.selectedItem || {};
    const CH = 58;
    this.card(doc, 10, y, W - 20, CH);

    const fromCity = item.from || data.from || '—';
    const toCity   = item.to   || data.to   || '—';
    const midX = W / 2;

    // Route
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...this.C.navy);
    doc.text(fromCity, midX - 35, y + 16, { align: 'right' });
    doc.text(toCity, midX + 35, y + 16, { align: 'left' });

    // Dashed line
    doc.setDrawColor(...this.C.greyLight);
    doc.setLineWidth(0.5);
    this.dashedLine(doc, midX - 28, y + 12, midX + 28, y + 12, 2, 2);

    // Bus icon on line
    doc.setFillColor(...this.C.orange);
    this.rr(doc, midX - 7, y + 8, 14, 8, 2, 'F');
    doc.setTextColor(...this.C.white);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('🚌', midX, y + 14, { align: 'center' });

    // Duration
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...this.C.grey);
    doc.text(item.duration || '', midX, y + 22, { align: 'center' });

    // Travel date
    if (data.checkInDate || data.date) {
      doc.setFontSize(7.5);
      doc.setTextColor(...this.C.grey);
      doc.text(`Travel Date: ${this.fmtDate(data.checkInDate || data.date)}`, 16, y + 27);
    }

    // Separator
    doc.setDrawColor(...this.C.greyLight);
    doc.setLineWidth(0.3);
    doc.line(16, y + 31, W - 16, y + 31);

    // 4-column details
    const col = (W - 20) / 4;
    this.kvBlock(doc, 'OPERATOR', item.operator || '—', 16, y + 37, col - 4);
    this.kvBlock(doc, 'BUS TYPE', item.busType || '—', 16 + col, y + 37, col - 4);
    this.kvBlock(doc, 'DEPARTURE', item.departureTime || '—', 16 + col * 2, y + 37, col - 4);
    this.kvBlock(doc, 'ARRIVAL', item.arrivalTime || '—', 16 + col * 3, y + 37, col - 4);

    // Bus type badge
    if (item.busType) {
      doc.setFillColor(...this.C.orange);
      this.rr(doc, W - 42, y + 4, 28, 8, 2, 'F');
      doc.setTextColor(...this.C.white);
      doc.setFontSize(6.5);
      doc.setFont('helvetica', 'bold');
      doc.text(item.busType.toUpperCase().substring(0, 10), W - 28, y + 9.5, { align: 'center' });
    }

    return y + CH + 10;
  }

  private drawCarCard(doc: jsPDF, data: any, W: number, y: number): number {
    const item = data.selectedItem || {};
    const CH = 58;
    this.card(doc, 10, y, W - 20, CH);

    // Car name
    const carName = `${item.brand || ''} ${item.model || data.destinationName || '—'}`.trim();
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...this.C.navy);
    doc.text(carName, 16, y + 13);

    // Specs line
    const specs = [item.type, item.seats ? `${item.seats} Seater` : '', item.transmission, item.fuelType]
      .filter(Boolean).join('  •  ');
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...this.C.grey);
    doc.text(specs, 16, y + 21);

    // Spec badges
    const badges = [item.type, item.transmission, item.fuelType].filter(Boolean);
    let bx = 16;
    badges.forEach((b: string) => {
      const tw = doc.getTextWidth(b) + 6;
      doc.setFillColor(50, 150, 255);
      this.rr(doc, bx, y + 24, tw, 7, 1.5, 'F');
      doc.setTextColor(...this.C.white);
      doc.setFontSize(6.5);
      doc.setFont('helvetica', 'bold');
      doc.text(b, bx + tw / 2, y + 29.5, { align: 'center' });
      bx += tw + 3;
    });

    // Separator
    doc.setDrawColor(...this.C.greyLight);
    doc.setLineWidth(0.3);
    doc.line(16, y + 34, W - 16, y + 34);

    // 4-column details
    const col = (W - 20) / 4;
    this.kvBlock(doc, 'PICK-UP DATE', this.fmtDate(data.checkInDate), 16, y + 40, col - 4);
    this.kvBlock(doc, 'RETURN DATE', this.fmtDate(data.checkOutDate), 16 + col, y + 40, col - 4);
    this.kvBlock(doc, 'RENTAL DAYS', String(this.calcNights(data.checkInDate, data.checkOutDate)), 16 + col * 2, y + 40, col - 4);
    this.kvBlock(doc, 'PICK-UP CITY', data.from || data.to || '—', 16 + col * 3, y + 40, col - 4);

    // Price per day
    if (item.pricePerDay) {
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...this.C.grey);
      doc.text(`₹${item.pricePerDay.toLocaleString('en-IN')}/day`, W - 16, y + 13, { align: 'right' });
    }

    return y + CH + 10;
  }

  private drawGenericCard(doc: jsPDF, data: any, W: number, y: number): number {
    const CH = 30;
    this.card(doc, 10, y, W - 20, CH);
    const col = (W - 20) / 3;
    this.kvBlock(doc, 'SERVICE', data.destinationName || '—', 16, y + 8, col - 4);
    this.kvBlock(doc, 'START DATE', this.fmtDate(data.checkInDate), 16 + col, y + 8, col - 4);
    this.kvBlock(doc, 'END DATE', this.fmtDate(data.checkOutDate), 16 + col * 2, y + 8, col - 4);
    return y + CH + 10;
  }

  // ── Passengers Section ───────────────────────────────────────────────────────
  private drawPassengersSection(doc: jsPDF, data: any, W: number, y: number): number {
    const guests: any[] = data.guestDetails || [];
    if (!guests.length) return y;

    this.sectionTitle(doc, 'Passengers / Guests', '👥', 10, y);
    y += 11;

    const ROW_H = 9;
    const TABLE_H = 12 + guests.length * ROW_H + 4;
    this.card(doc, 10, y, W - 20, TABLE_H);

    // Table header
    doc.setFillColor(...this.C.navy);
    doc.rect(10, y, W - 20, 12, 'F');

    const cols = [16, 50, 110, 145, 170];
    const headers = ['#', 'PASSENGER NAME', 'AGE', 'TYPE', 'STATUS'];
    doc.setTextColor(...this.C.white);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    headers.forEach((h, i) => doc.text(h, cols[i], y + 8.5));

    // Rows
    guests.forEach((g: any, i: number) => {
      const ry = y + 12 + i * ROW_H;
      // Alternating row bg
      if (i % 2 === 0) {
        doc.setFillColor(...this.C.greyFaint);
        doc.rect(10, ry, W - 20, ROW_H, 'F');
      }

      doc.setTextColor(...this.C.black);
      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'normal');
      doc.text(String(i + 1), cols[0], ry + 6.5);
      doc.text(g.name || '—', cols[1], ry + 6.5);
      doc.text(String(g.age || '—'), cols[2], ry + 6.5);

      // Type badge
      const isAdult = g.type === 'adult';
      const badgeColor: [number,number,number] = isAdult ? this.C.teal : [200, 100, 220];
      doc.setFillColor(...badgeColor);
      this.rr(doc, cols[3] - 1, ry + 1.5, 22, 6, 1.5, 'F');
      doc.setTextColor(...this.C.white);
      doc.setFontSize(6.5);
      doc.setFont('helvetica', 'bold');
      doc.text(isAdult ? 'ADULT' : 'CHILD', cols[3] + 10, ry + 6, { align: 'center' });

      // Status badge
      doc.setFillColor(...this.C.greenFaint);
      this.rr(doc, cols[4] - 1, ry + 1.5, 26, 6, 1.5, 'F');
      doc.setTextColor(...this.C.green);
      doc.setFontSize(6.5);
      doc.setFont('helvetica', 'bold');
      doc.text('CONFIRMED', cols[4] + 12, ry + 6, { align: 'center' });
    });

    // Summary row
    const adults = guests.filter((g: any) => g.type === 'adult').length;
    const children = guests.filter((g: any) => g.type === 'child').length;
    const sy = y + TABLE_H - 1;
    doc.setFillColor(...this.C.tealFaint);
    doc.rect(10, sy - 5, W - 20, 6, 'F');
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...this.C.tealDark);
    doc.text(`Total: ${guests.length} passenger(s)  —  ${adults} Adult(s)  •  ${children} Child(ren)`, 16, sy);

    return y + TABLE_H + 10;
  }

  // ── Pricing Section ──────────────────────────────────────────────────────────
  private drawPricingSection(doc: jsPDF, data: any, W: number, y: number): void {
    this.sectionTitle(doc, 'Payment Summary', '💳', 10, y);
    y += 11;

    const CH = 42;
    this.card(doc, 10, y, W - 20, CH);

    const total = data.totalPrice || 0;
    const base  = Math.round(total * 0.82);
    const gst   = Math.round(total * 0.12);
    const conv  = total - base - gst;

    // Left: breakdown table
    const rows = [
      { label: 'Base Fare / Rate', value: base },
      { label: 'GST (12%)',        value: gst  },
      { label: 'Convenience Fee',  value: conv },
    ];

    rows.forEach((r, i) => {
      const ry = y + 8 + i * 9;
      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...this.C.grey);
      doc.text(r.label, 16, ry);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...this.C.black);
      doc.text(`₹${r.value.toLocaleString('en-IN')}`, 90, ry, { align: 'right' });
    });

    // Divider
    doc.setDrawColor(...this.C.greyLight);
    doc.setLineWidth(0.4);
    doc.line(16, y + 34, 90, y + 34);

    // Total
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...this.C.grey);
    doc.text('TOTAL AMOUNT', 16, y + 40);
    doc.setFontSize(15);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...this.C.navy);
    doc.text(`₹${total.toLocaleString('en-IN')}`, 90, y + 40, { align: 'right' });

    // Right: payment status box
    doc.setFillColor(...this.C.green);
    this.rr(doc, W - 78, y + 5, 64, 32, 4, 'F');

    // Inner white box
    doc.setFillColor(255, 255, 255);
    this.rr(doc, W - 76, y + 7, 60, 28, 3, 'F');

    doc.setTextColor(...this.C.green);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    doc.text('PAYMENT STATUS', W - 46, y + 14, { align: 'center' });

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('✔ PAID', W - 46, y + 26, { align: 'center' });

    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...this.C.grey);
    doc.text('Online Payment', W - 46, y + 32, { align: 'center' });
  }

  // ── Footer ───────────────────────────────────────────────────────────────────
  private drawFooter(doc: jsPDF, W: number): void {
    const H = 297;
    const FH = 32;
    const fy = H - FH;

    // Footer background
    doc.setFillColor(...this.C.navy);
    doc.rect(0, fy, W, FH, 'F');

    // Teal top border
    doc.setFillColor(...this.C.teal);
    doc.rect(0, fy, W, 2, 'F');

    // Decorative dots
    [20, 40, 60].forEach(x => {
      doc.setFillColor(...this.C.navyMid);
      doc.circle(x, fy + 16, 8, 'F');
    });

    // Thank you message
    doc.setTextColor(...this.C.teal);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Thank you for choosing WonderWay!', W / 2, fy + 10, { align: 'center' });

    // Contact info
    doc.setTextColor(180, 195, 220);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.text('support@wonderway.com  |  1800-123-4567 (Toll Free)  |  www.wonderway.com', W / 2, fy + 18, { align: 'center' });

    // Legal note
    doc.setTextColor(...this.C.navyLight);
    doc.setFontSize(6.5);
    doc.text('This is a computer-generated document. No signature required. Subject to terms & conditions.', W / 2, fy + 25, { align: 'center' });
  }

  // ── Helpers ──────────────────────────────────────────────────────────────────
  private sectionTitle(doc: jsPDF, title: string, icon: string, x: number, y: number): void {
    // Accent bar
    doc.setFillColor(...this.C.teal);
    doc.rect(x, y, 3, 8, 'F');
    doc.setTextColor(...this.C.navy);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(`${icon}  ${title}`, x + 6, y + 7);
    // Underline
    doc.setDrawColor(...this.C.greyLight);
    doc.setLineWidth(0.3);
    doc.line(x, y + 9, x + 190, y + 9);
  }

  private card(doc: jsPDF, x: number, y: number, w: number, h: number): void {
    // Shadow effect (offset rect)
    doc.setFillColor(210, 215, 225);
    this.rr(doc, x + 1.5, y + 1.5, w, h, 4, 'F');
    // Card
    doc.setFillColor(...this.C.white);
    doc.setDrawColor(...this.C.greyLight);
    doc.setLineWidth(0.3);
    this.rr(doc, x, y, w, h, 4, 'FD');
  }

  private kvBlock(doc: jsPDF, label: string, value: string, x: number, y: number, maxW: number): void {
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...this.C.grey);
    doc.text(label, x, y);
    doc.setFontSize(9.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...this.C.black);
    // Truncate if too long
    const truncated = doc.getTextWidth(value) > maxW
      ? value.substring(0, Math.floor(value.length * maxW / doc.getTextWidth(value)) - 1) + '…'
      : value;
    doc.text(truncated || '—', x, y + 6);
  }

  private rr(doc: jsPDF, x: number, y: number, w: number, h: number, r: number, style: string): void {
    doc.roundedRect(x, y, w, h, r, r, style as any);
  }

  private dashedLine(doc: jsPDF, x1: number, y1: number, x2: number, y2: number, dashLen: number, gapLen: number): void {
    const total = x2 - x1;
    let cx = x1;
    while (cx < x2) {
      const end = Math.min(cx + dashLen, x2);
      doc.line(cx, y1, end, y1);
      cx += dashLen + gapLen;
    }
  }

  private fmtDate(d: string): string {
    if (!d) return '—';
    try {
      return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch { return d; }
  }

  private calcNights(checkIn: string, checkOut: string): number {
    const s = new Date(checkIn), e = new Date(checkOut);
    return Math.max(1, Math.ceil((e.getTime() - s.getTime()) / 86400000));
  }
}
