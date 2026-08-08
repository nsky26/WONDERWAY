import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface MapMarker {
  id: string;
  name: string;
  category: 'landmark' | 'hotel' | 'restaurant' | 'photographer';
  lat: number;
  lng: number;
  rating?: number;
  price?: string;
  icon: string;
}

@Component({
  selector: 'app-interactive-map',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="interactive-map-card">
      <div class="map-header">
        <div class="map-title-wrap">
          <span class="map-icon">🗺️</span>
          <div>
            <h3>Interactive Exploration Map</h3>
            <p class="map-subtitle">Explore key landmarks, luxury stays, dining & local guides in {{ locationName }}</p>
          </div>
        </div>
        <div class="map-filter-pills">
          <button 
            *ngFor="let cat of categories" 
            class="pill-btn" 
            [class.active]="selectedCategory === cat.key"
            (click)="filterCategory(cat.key)"
          >
            {{ cat.icon }} {{ cat.label }}
          </button>
        </div>
      </div>

      <!-- Canvas / Graphic Map Interface -->
      <div class="map-viewport">
        <div class="grid-overlay"></div>
        <div class="radar-ping"></div>

        <!-- Render Map Markers -->
        <div 
          *ngFor="let marker of activeMarkers" 
          class="map-pin" 
          [style.top.%]="marker.lat" 
          [style.left.%]="marker.lng"
          [class.selected]="selectedMarker?.id === marker.id"
          (click)="selectMarker(marker)"
        >
          <div class="pin-badge">
            <span class="pin-icon">{{ marker.icon }}</span>
          </div>
          <div class="pin-tooltip">
            <strong>{{ marker.name }}</strong>
            <span *ngIf="marker.price" class="tooltip-price">{{ marker.price }}</span>
            <span *ngIf="marker.rating" class="tooltip-rating">⭐ {{ marker.rating }}</span>
          </div>
        </div>

        <!-- Selected Marker Detail Modal Inside Map -->
        <div *ngIf="selectedMarker" class="marker-info-card">
          <button class="close-card-btn" (click)="selectedMarker = null">&times;</button>
          <div class="card-header">
            <span class="card-icon">{{ selectedMarker.icon }}</span>
            <div>
              <h4>{{ selectedMarker.name }}</h4>
              <span class="category-badge">{{ selectedMarker.category | titlecase }}</span>
            </div>
          </div>
          <div class="card-meta" *ngIf="selectedMarker.rating || selectedMarker.price">
            <span *ngIf="selectedMarker.rating">⭐ {{ selectedMarker.rating }} / 5.0</span>
            <span *ngIf="selectedMarker.price">💰 {{ selectedMarker.price }}</span>
          </div>
          <button class="btn-navigate" (click)="getDirections(selectedMarker)">
            📍 View Details & Directions
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .interactive-map-card {
      background: rgba(15, 23, 42, 0.75);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(100, 255, 218, 0.15);
      border-radius: 20px;
      padding: 1.75rem;
      margin: 2rem 0;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    }
    .map-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    .map-title-wrap {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .map-icon {
      font-size: 2rem;
    }
    .map-title-wrap h3 {
      font-size: 1.35rem;
      color: #f8fafc;
      margin: 0;
    }
    .map-subtitle {
      color: #94a3b8;
      font-size: 0.88rem;
      margin: 2px 0 0 0;
    }
    .map-filter-pills {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .pill-btn {
      background: rgba(30, 41, 59, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #cbd5e1;
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.25s ease;
    }
    .pill-btn:hover, .pill-btn.active {
      background: linear-gradient(135deg, #64ffda 0%, #00b4d8 100%);
      color: #0b1329;
      font-weight: 600;
      border-color: transparent;
      box-shadow: 0 0 12px rgba(100, 255, 218, 0.4);
    }
    .map-viewport {
      position: relative;
      width: 100%;
      height: 380px;
      border-radius: 16px;
      overflow: hidden;
      background: radial-gradient(circle at 50% 50%, #1e293b 0%, #0f172a 100%);
      border: 1px solid rgba(100, 255, 218, 0.1);
    }
    .grid-overlay {
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(rgba(100, 255, 218, 0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(100, 255, 218, 0.04) 1px, transparent 1px);
      background-size: 30px 30px;
    }
    .radar-ping {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 150px;
      height: 150px;
      margin-top: -75px;
      margin-left: -75px;
      border-radius: 50%;
      background: rgba(100, 255, 218, 0.08);
      border: 1px solid rgba(100, 255, 218, 0.2);
      animation: ping 4s cubic-bezier(0, 0, 0.2, 1) infinite;
    }
    @keyframes ping {
      75%, 100% {
        transform: scale(2.5);
        opacity: 0;
      }
    }
    .map-pin {
      position: absolute;
      transform: translate(-50%, -50%);
      cursor: pointer;
      z-index: 10;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .pin-badge {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      border: 2px solid #64ffda;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      box-shadow: 0 4px 15px rgba(0,0,0,0.5), 0 0 10px rgba(100, 255, 218, 0.3);
    }
    .map-pin:hover .pin-badge, .map-pin.selected .pin-badge {
      transform: scale(1.2);
      border-color: #38bdf8;
      box-shadow: 0 0 20px rgba(56, 189, 248, 0.6);
    }
    .pin-tooltip {
      position: absolute;
      bottom: 44px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(15, 23, 42, 0.95);
      border: 1px solid rgba(100, 255, 218, 0.3);
      padding: 6px 12px;
      border-radius: 8px;
      white-space: nowrap;
      color: #f8fafc;
      font-size: 0.78rem;
      opacity: 0;
      visibility: hidden;
      transition: all 0.2s ease;
      box-shadow: 0 5px 15px rgba(0,0,0,0.4);
      display: flex;
      gap: 6px;
      align-items: center;
    }
    .map-pin:hover .pin-tooltip {
      opacity: 1;
      visibility: visible;
    }
    .marker-info-card {
      position: absolute;
      bottom: 16px;
      left: 16px;
      right: 16px;
      max-width: 340px;
      background: rgba(15, 23, 42, 0.95);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(100, 255, 218, 0.3);
      border-radius: 14px;
      padding: 14px;
      z-index: 20;
      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
      animation: slideUp 0.3s ease forwards;
    }
    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    .close-card-btn {
      position: absolute;
      top: 8px;
      right: 8px;
      background: none;
      border: none;
      color: #94a3b8;
      font-size: 1.2rem;
      cursor: pointer;
    }
    .card-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 8px;
    }
    .card-icon {
      font-size: 1.6rem;
    }
    .card-header h4 {
      margin: 0;
      color: #f8fafc;
      font-size: 1rem;
    }
    .category-badge {
      font-size: 0.72rem;
      color: #64ffda;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .card-meta {
      display: flex;
      gap: 12px;
      font-size: 0.82rem;
      color: #cbd5e1;
      margin-bottom: 10px;
    }
    .btn-navigate {
      width: 100%;
      background: linear-gradient(135deg, #64ffda 0%, #00b4d8 100%);
      color: #0b1329;
      border: none;
      padding: 8px;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
    }
  `]
})
export class InteractiveMapComponent implements OnInit {
  @Input() locationName: string = 'Destination';
  @Input() markers: MapMarker[] = [];

  selectedCategory: string = 'all';
  selectedMarker: MapMarker | null = null;

  categories = [
    { key: 'all', label: 'All Places', icon: '📍' },
    { key: 'landmark', label: 'Landmarks', icon: '🏛️' },
    { key: 'hotel', label: 'Hotels', icon: '🏨' },
    { key: 'restaurant', label: 'Dining', icon: '🍽️' },
    { key: 'photographer', label: 'Guides & Photos', icon: '📸' }
  ];

  ngOnInit() {
    if (!this.markers || this.markers.length === 0) {
      this.generateDefaultMarkers();
    }
  }

  generateDefaultMarkers() {
    this.markers = [
      { id: 'm1', name: 'Historic Main Monument', category: 'landmark', lat: 35, lng: 45, rating: 4.9, icon: '🏛️' },
      { id: 'm2', name: 'Grand Palace Hotel', category: 'hotel', lat: 55, lng: 30, rating: 4.8, price: '$180/night', icon: '🏨' },
      { id: 'm3', name: 'Coastal Breeze Seafood', category: 'restaurant', lat: 70, lng: 65, rating: 4.7, price: '$$$', icon: '🍽️' },
      { id: 'm4', name: 'Sunset Viewpoint', category: 'landmark', lat: 25, lng: 75, rating: 4.9, icon: '🌅' },
      { id: 'm5', name: 'Rahul Travel Photography', category: 'photographer', lat: 45, lng: 20, rating: 4.9, icon: '📸' }
    ];
  }

  get activeMarkers(): MapMarker[] {
    if (this.selectedCategory === 'all') return this.markers;
    return this.markers.filter(m => m.category === this.selectedCategory);
  }

  filterCategory(key: string) {
    this.selectedCategory = key;
    this.selectedMarker = null;
  }

  selectMarker(marker: MapMarker) {
    this.selectedMarker = marker;
  }

  getDirections(marker: MapMarker) {
    if (typeof window !== 'undefined') {
      const query = encodeURIComponent(`${marker.name} ${this.locationName}`);
      window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
    }
  }
}
