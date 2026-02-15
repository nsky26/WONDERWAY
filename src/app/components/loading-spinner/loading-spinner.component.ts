// Infinity style loading spinner
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="spinner-container">
      <div class="infinity-loader"></div>
      <p>Loading...</p>
    </div>
  `,
  styles: [`
    .spinner-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem;
    }

    /* Infinity Loader */
    .infinity-loader {
      position: relative;
      width: 120px;
      height: 60px;
    }

    .infinity-loader::before,
    .infinity-loader::after {
      content: "";
      position: absolute;
      top: 0;
      width: 60px;
      height: 60px;
      border: 6px solid #1a5f4f;
      border-radius: 50%;
      animation: infinity-spin 1.2s linear infinite;
    }

    .infinity-loader::after {
      left: 60px;
      animation-delay: -0.6s;
    }

    @keyframes infinity-spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    p {
      margin-top: 1.2rem;
      color: #555;
      font-weight: 500;
    }
  `]
})
export class LoadingSpinnerComponent {}
