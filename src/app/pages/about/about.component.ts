// About page component
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PageHeaderComponent } from '../../components/page-header/page-header.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PageHeaderComponent
  ],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  // Expandable sections state
  showFullMission = false;
  showFullStory = false;

  toggleMission() {
    this.showFullMission = !this.showFullMission;
  }

  toggleStory() {
    this.showFullStory = !this.showFullStory;
  }
}
