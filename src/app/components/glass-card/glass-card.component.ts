// Reusable Glass Card Component
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-glass-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="glass-card" [class.clickable]="clickable" [class.hover-glow]="hoverGlow">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .glass-card {
      background: rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 20px;
      padding: 1.5rem;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
      position: relative;
      overflow: hidden;
    }

    .glass-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    }

    .glass-card.clickable {
      cursor: pointer;
    }

    .glass-card.clickable:hover {
      transform: translateY(-8px) scale(1.02);
      background: rgba(255, 255, 255, 0.12);
      border-color: rgba(100, 255, 218, 0.4);
      box-shadow: 0 12px 48px rgba(0, 0, 0, 0.3);
    }

    .glass-card.hover-glow:hover {
      box-shadow: 0 12px 48px rgba(100, 255, 218, 0.3),
                  0 0 40px rgba(100, 255, 218, 0.2);
    }
  `]
})
export class GlassCardComponent {
  @Input() clickable: boolean = false;
  @Input() hoverGlow: boolean = false;
}
