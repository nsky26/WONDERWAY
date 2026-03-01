import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="page-header">
      <!-- Animated Travel Background -->
      <div class="travel-background">
        <div class="plane">✈️</div>
        <div class="cloud cloud-1">☁️</div>
        <div class="cloud cloud-2">☁️</div>
      </div>
      
      <div class="container">
        <h1 class="header-title">{{ title }}</h1>
        <p *ngIf="subtitle" class="header-subtitle">{{ subtitle }}</p>
      </div>
    </section>
  `,
  styles: [`
    .page-header {
      min-height: 30vh;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem 2rem 1.5rem;
      overflow: hidden;
      background: linear-gradient(135deg, #0a192f 0%, #1a365d 50%, #0f2847 100%);
    }

    /* Animated Travel Background */
    .travel-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      pointer-events: none;
      opacity: 0.5;
    }

    .plane {
      position: absolute;
      font-size: 2rem;
      animation: flyAcross 20s linear infinite;
      top: 25%;
      filter: drop-shadow(0 0 8px rgba(100, 255, 218, 0.5));
    }

    @keyframes flyAcross {
      0% { left: -10%; transform: rotate(-15deg); }
      100% { left: 110%; transform: rotate(-15deg); }
    }

    .cloud {
      position: absolute;
      font-size: 2.5rem;
      opacity: 0.3;
      animation: floatCloud 30s linear infinite;
    }

    .cloud-1 {
      top: 20%;
      animation-duration: 25s;
    }

    .cloud-2 {
      top: 50%;
      animation-duration: 35s;
      animation-delay: 5s;
    }

    @keyframes floatCloud {
      0% { left: -10%; }
      100% { left: 110%; }
    }

    .container {
      position: relative;
      z-index: 10;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      text-align: center;
      animation: fadeInUp 0.6s ease-out;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(15px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .header-title {
      font-size: 2.5rem;
      font-weight: 900;
      color: #ffffff;
      margin-bottom: 0.6rem;
      letter-spacing: -1px;
      text-shadow: 0 0 25px rgba(100, 255, 218, 0.4);
    }

    .header-subtitle {
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.85);
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.5;
    }

    @media (max-width: 768px) {
      .page-header {
        min-height: 20vh;
        padding: 1.5rem 1rem 1rem;
      }

      .header-title {
        font-size: 1.8rem;
      }

      .header-subtitle {
        font-size: 0.9rem;
      }

      .plane {
        font-size: 1.5rem;
      }

      .cloud {
        font-size: 2rem;
      }
    }
  `]
})
export class PageHeaderComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
}
