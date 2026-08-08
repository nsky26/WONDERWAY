import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  icon?: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  // Using Angular Signals for modern reactive state
  public toastsSignal = signal<ToastMessage[]>([]);

  show(message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info', icon?: string, duration = 3500): void {
    const id = Math.random().toString(36).substring(2, 9);
    const defaultIcons = {
      success: '✅',
      info: 'ℹ️',
      warning: '⚠️',
      error: '❌'
    };

    const newToast: ToastMessage = {
      id,
      message,
      type,
      icon: icon || defaultIcons[type],
      duration
    };

    this.toastsSignal.update(current => [...current, newToast]);

    setTimeout(() => {
      this.remove(id);
    }, duration);
  }

  success(message: string, icon = '🎉'): void {
    this.show(message, 'success', icon);
  }

  info(message: string, icon = '🌐'): void {
    this.show(message, 'info', icon);
  }

  warning(message: string, icon = '⚠️'): void {
    this.show(message, 'warning', icon);
  }

  error(message: string, icon = '❌'): void {
    this.show(message, 'error', icon);
  }

  remove(id: string): void {
    this.toastsSignal.update(current => current.filter(t => t.id !== id));
  }
}
