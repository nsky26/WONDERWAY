// Destinations listing page
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';

import { Destination } from '../../models/destination.model';
import { DestinationsService } from '../../services/destinations.service';
import * as DestinationsActions from '../../store/destinations/destinations.actions';

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    FooterComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css']
})
export class DestinationsComponent implements OnInit {
  destinations$!: Observable<Destination[]>;
  loading = false;

  constructor(
    private store: Store,
    private router: Router,
    private destinationsService: DestinationsService
  ) {}

  ngOnInit() {
    this.loadDestinations();
  }

  loadDestinations() {
    this.loading = true;
    this.destinations$ = this.destinationsService.getDestinations();
    
    // Also update store
    this.destinationsService.getDestinations().subscribe(destinations => {
      this.store.dispatch(DestinationsActions.loadDestinationsSuccess({ destinations }));
      this.loading = false;
    });
  }

  viewDestination(destination: Destination) {
    this.store.dispatch(DestinationsActions.selectDestination({ destination }));
    this.router.navigate(['/destinations', destination.id]);
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }
}
