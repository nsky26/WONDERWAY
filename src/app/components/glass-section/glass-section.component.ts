// Reusable Glass Section Container Component
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-glass-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="glass-section" [class.dark-bg]="darkBg">
      <div class="container">
        <div class="section-header" *ngIf="title">
          <h2 class="section-title">{{ title }}</h2>
          <p class="section-subtitle" *ngIf="subtitle">{{ subtitle }}</p>
        </div>
        <ng-content></ng-content>
      </div>
    </section>
  `,
  styles: [`
    .glass-section {
      padding: 5rem 0;
      position: relative;
    }

    .glass-section.dark-bg {
      background: rgba(0, 0, 0, 0.15);
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .section-header {
      text-align: center;
      margin-bottom: 4rem;
      animation: fadeInUp 0.8s ease-out;
    }

    .section-title {
      font-size: 3rem;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 1rem;
      letter-spacing: -1px;
      text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
      position: relative;
      display: inline-block;
    }

    .section-title::after {
      content: '';
      position: absolute;
      bottom: -12px;
      left: 50%;
      transform: translateX(-50%);
      width: 100px;
      height: 4px;
      background: linear-gradient(90deg, transparent, #64ffda, transparent);
      border-radius: 2px;
      box-shadow: 0 0 20px rgba(100, 255, 218, 0.5);
    }

    .section-subtitle {
      font-size: 1.2rem;
      color: rgba(255, 255, 255, 0.7);
      margin-top: 1.5rem;
      font-weight: 400;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `]
})
export class GlassSectionComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() darkBg: boolean = false;
}
