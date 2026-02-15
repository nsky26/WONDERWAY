export type SearchType =
  | 'flights'
  | 'hotels'
  | 'bus'
  | 'car'
  | 'cruise'
  | 'villa';

export interface SearchForm {
  from?: string;
  to?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  rooms?: number;
}
