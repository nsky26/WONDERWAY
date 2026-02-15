// Destination details page
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

import { Destination } from '../../models/destination.model';
import { selectSelectedDestination } from '../../store/destinations/destinations.selectors';

@Component({
  selector: 'app-destination-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './destination-details.component.html',
  styleUrls: ['./destination-details.component.css']
})
export class DestinationDetailsComponent implements OnInit {
  destination$: Observable<Destination | null>;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.destination$ = this.store.select(selectSelectedDestination);
  }

  ngOnInit() {
    // Check if destination is loaded
    this.destination$.subscribe(destination => {
      if (!destination) {
        // Redirect to destinations if no destination selected
        this.router.navigate(['/destinations']);
      }
    });
  }

  bookNow(destination: Destination) {
    this.router.navigate(['/booking'], { 
      queryParams: { destinationId: destination.id } 
    });
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }
}
