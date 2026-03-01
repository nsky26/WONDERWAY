import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-success-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="success-message" *ngIf="show">
      <span class="success-icon">✓</span>
      <div>
        <h3>{{ title }}</h3>
        <p>{{ message }}</p>
      </div>
    </div>
  `,
  styles: [`
    .success-message {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.5rem;
      background: #d4edda;
      border: 2px solid #28a745;
      border-radius: 8px;
      margin-bottom: 2rem;
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .success-icon {
      width: 40px;
      height: 40px;
      background: #28a745;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 700;
      flex-shrink: 0;
    }

    .success-message h3 {
      color: #155724;
      margin-bottom: 0.3rem;
      font-size: 1.1rem;
    }

    .success-message p {
      color: #155724;
      margin: 0;
    }
  `]
})
export class SuccessMessageComponent {
  @Input() show: boolean = false;
  @Input() title: string = 'Success!';
  @Input() message: string = '';
}
