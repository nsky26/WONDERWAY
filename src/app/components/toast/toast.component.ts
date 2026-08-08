import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, ToastMessage } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      <div 
        *ngFor="let toast of toastService.toastsSignal()" 
        class="toast-item" 
        [ngClass]="toast.type"
        (click)="toastService.remove(toast.id)"
      >
        <span class="toast-icon">{{ toast.icon }}</span>
        <span class="toast-message">{{ toast.message }}</span>
        <button class="toast-close" aria-label="Close toast">&times;</button>
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 400px;
      pointer-events: none;
    }
    .toast-item {
      pointer-events: auto;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 18px;
      border-radius: 12px;
      background: rgba(15, 23, 42, 0.92);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(100, 255, 218, 0.2);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 15px rgba(100, 255, 218, 0.15);
      color: #f8fafc;
      font-size: 0.95rem;
      font-weight: 500;
      cursor: pointer;
      animation: toastIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      transition: all 0.25s ease;
    }
    .toast-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 35px rgba(0, 0, 0, 0.5), 0 0 20px rgba(100, 255, 218, 0.25);
    }
    .toast-item.success {
      border-left: 4px solid #34d399;
    }
    .toast-item.info {
      border-left: 4px solid #38bdf8;
    }
    .toast-item.warning {
      border-left: 4px solid #fbbf24;
    }
    .toast-item.error {
      border-left: 4px solid #f87171;
    }
    .toast-icon {
      font-size: 1.25rem;
    }
    .toast-message {
      flex: 1;
      line-height: 1.4;
    }
    .toast-close {
      background: none;
      border: none;
      color: #94a3b8;
      font-size: 1.2rem;
      cursor: pointer;
      padding: 0;
      line-height: 1;
      transition: color 0.2s ease;
    }
    .toast-close:hover {
      color: #ffffff;
    }
    @keyframes toastIn {
      from {
        opacity: 0;
        transform: translateY(20px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
  `]
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}
}
