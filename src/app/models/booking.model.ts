// booking.model.ts

export type BookingType =
  | 'flight'
  | 'hotel'
  | 'package'
  | 'bus'
  | 'car'
  | 'cruise'
  | 'villa'
  | 'train';

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'cancelled';

export interface Booking {
  id: string;
  destinationId?: string; // optional because bus/car may not use destinationId
  destinationName: string;

  customerName: string;
  email: string;
  phone: string;

  checkInDate: string;
  checkOutDate: string;

  guests: number;

  totalPrice: number;

  bookingType: BookingType;
  status: BookingStatus;

  createdAt: string;
}
