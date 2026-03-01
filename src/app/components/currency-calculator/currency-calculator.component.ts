// AI-Powered Currency Calculator Component
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrencyService, Currency } from '../../services/currency.service';

@Component({
  selector: 'app-currency-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="calculator-container">
      <div class="calculator-header">
        <h3>💱 Currency Calculator</h3>
        <p class="calculator-subtitle">Convert prices instantly with real-time rates</p>
        <div class="last-update" *ngIf="lastUpdate">
          <span class="update-icon">🔄</span>
          <span>Last updated: {{ getTimeAgo(lastUpdate) }}</span>
        </div>
      </div>

      <div class="calculator-body">
        <!-- Amount Input -->
        <div class="input-group">
          <label>Amount</label>
          <input 
            type="number" 
            [(ngModel)]="amount" 
            (ngModelChange)="calculate()"
            placeholder="Enter amount"
            class="amount-input">
        </div>

        <!-- From Currency -->
        <div class="currency-selector">
          <label>From</label>
          <div class="select-wrapper">
            <select [(ngModel)]="fromCurrency" (ngModelChange)="calculate()" class="currency-select">
              <option *ngFor="let currency of currencies" [value]="currency.code">
                {{ currency.flag }} {{ currency.code }} - {{ currency.name }}
              </option>
            </select>
          </div>
        </div>

        <!-- Swap Button -->
        <div class="swap-container">
          <button class="btn-swap" (click)="swapCurrencies()" title="Swap currencies">
            <span class="swap-icon">⇅</span>
          </button>
        </div>

        <!-- To Currency -->
        <div class="currency-selector">
          <label>To</label>
          <div class="select-wrapper">
            <select [(ngModel)]="toCurrency" (ngModelChange)="calculate()" class="currency-select">
              <option *ngFor="let currency of currencies" [value]="currency.code">
                {{ currency.flag }} {{ currency.code }} - {{ currency.name }}
              </option>
            </select>
          </div>
        </div>

        <!-- Result -->
        <div class="result-container">
          <div class="result-label">Converted Amount</div>
          <div class="result-amount">
            {{ getFormattedResult() }}
          </div>
          <div class="exchange-rate">
            1 {{ fromCurrency }} = {{ getExchangeRate() }} {{ toCurrency }}
          </div>
        </div>

        <!-- Quick Amounts -->
        <div class="quick-amounts">
          <button 
            *ngFor="let quick of quickAmounts" 
            class="btn-quick"
            (click)="setQuickAmount(quick)">
            {{ quick }}
          </button>
        </div>

        <!-- Popular Conversions -->
        <div class="popular-conversions" *ngIf="showPopular">
          <h4>Popular Conversions</h4>
          <div class="conversion-grid">
            <div *ngFor="let conv of getPopularConversions()" class="conversion-item">
              <span class="conv-from">{{ conv.from }}</span>
              <span class="conv-arrow">→</span>
              <span class="conv-to">{{ conv.to }}</span>
              <span class="conv-rate">{{ conv.rate }}</span>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="calculator-actions">
          <button class="btn-action btn-refresh" (click)="refreshRates()">
            <span class="btn-icon">🔄</span>
            <span>Refresh Rates</span>
          </button>
          <button class="btn-action btn-toggle" (click)="togglePopular()">
            <span class="btn-icon">{{ showPopular ? '👁️' : '👁️‍🗨️' }}</span>
            <span>{{ showPopular ? 'Hide' : 'Show' }} Popular</span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .calculator-container {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 24px;
      padding: 2rem;
      max-width: 500px;
      margin: 0 auto;
    }

    .calculator-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .calculator-header h3 {
      font-size: 1.8rem;
      color: #64ffda;
      margin-bottom: 0.5rem;
      font-weight: 800;
    }

    .calculator-subtitle {
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }

    .last-update {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.4rem 1rem;
      background: rgba(100, 255, 218, 0.1);
      border-radius: 20px;
      font-size: 0.85rem;
      color: rgba(255, 255, 255, 0.6);
    }

    .update-icon {
      animation: rotate 2s linear infinite;
    }

    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    .calculator-body {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .input-group, .currency-selector {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    label {
      color: rgba(255, 255, 255, 0.8);
      font-weight: 600;
      font-size: 0.9rem;
    }

    .amount-input, .currency-select {
      padding: 1rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 12px;
      color: white;
      font-size: 1.1rem;
      transition: all 0.3s ease;
    }

    .amount-input:focus, .currency-select:focus {
      outline: none;
      border-color: #64ffda;
      background: rgba(255, 255, 255, 0.08);
    }

    .select-wrapper {
      position: relative;
    }

    .currency-select {
      width: 100%;
      cursor: pointer;
    }

    .swap-container {
      display: flex;
      justify-content: center;
      margin: -0.5rem 0;
    }

    .btn-swap {
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #64ffda, #667eea);
      border: none;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .btn-swap:hover {
      transform: rotate(180deg) scale(1.1);
      box-shadow: 0 5px 20px rgba(100, 255, 218, 0.5);
    }

    .swap-icon {
      font-size: 1.5rem;
      color: #0a0e27;
      font-weight: 900;
    }

    .result-container {
      text-align: center;
      padding: 2rem;
      background: linear-gradient(135deg, rgba(100, 255, 218, 0.1), rgba(102, 126, 234, 0.1));
      border: 2px solid rgba(100, 255, 218, 0.3);
      border-radius: 20px;
      margin-top: 1rem;
    }

    .result-label {
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.6);
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .result-amount {
      font-size: 2.5rem;
      font-weight: 900;
      color: #64ffda;
      margin-bottom: 0.5rem;
      text-shadow: 0 0 20px rgba(100, 255, 218, 0.5);
    }

    .exchange-rate {
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.7);
    }

    .quick-amounts {
      display: flex;
      gap: 0.8rem;
      flex-wrap: wrap;
      justify-content: center;
    }

    .btn-quick {
      padding: 0.6rem 1.2rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 20px;
      color: white;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 600;
    }

    .btn-quick:hover {
      background: rgba(100, 255, 218, 0.2);
      border-color: #64ffda;
      transform: translateY(-2px);
    }

    .popular-conversions {
      margin-top: 1rem;
      padding-top: 1.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .popular-conversions h4 {
      color: #64ffda;
      font-size: 1.1rem;
      margin-bottom: 1rem;
      text-align: center;
    }

    .conversion-grid {
      display: grid;
      gap: 0.8rem;
    }

    .conversion-item {
      display: grid;
      grid-template-columns: 1fr auto 1fr auto;
      align-items: center;
      gap: 0.8rem;
      padding: 0.8rem;
      background: rgba(255, 255, 255, 0.03);
      border-radius: 12px;
      font-size: 0.9rem;
    }

    .conv-from, .conv-to {
      color: white;
      font-weight: 600;
    }

    .conv-arrow {
      color: #64ffda;
    }

    .conv-rate {
      color: rgba(255, 255, 255, 0.7);
      text-align: right;
    }

    .calculator-actions {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    .btn-action {
      flex: 1;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 12px;
      color: white;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-weight: 600;
    }

    .btn-action:hover {
      background: rgba(100, 255, 218, 0.1);
      border-color: #64ffda;
      transform: translateY(-2px);
    }

    .btn-icon {
      font-size: 1.2rem;
    }

    @media (max-width: 768px) {
      .calculator-container {
        padding: 1.5rem;
      }

      .result-amount {
        font-size: 2rem;
      }

      .calculator-actions {
        flex-direction: column;
      }
    }
  `]
})
export class CurrencyCalculatorComponent implements OnInit {
  amount: number = 100;
  fromCurrency: string = 'USD';
  toCurrency: string = 'EUR';
  result: number = 0;
  currencies: Currency[] = [];
  lastUpdate: Date | null = null;
  showPopular: boolean = false;

  quickAmounts = [100, 500, 1000, 5000, 10000];

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.currencies = this.currencyService.getAllCurrencies();
    this.fromCurrency = this.currencyService.getCurrentCurrency();
    this.toCurrency = this.fromCurrency === 'USD' ? 'EUR' : 'USD';
    this.lastUpdate = this.currencyService.getLastUpdateTime();
    this.calculate();
  }

  calculate() {
    this.result = this.currencyService.convertBetweenCurrencies(
      this.amount,
      this.fromCurrency,
      this.toCurrency
    );
  }

  swapCurrencies() {
    const temp = this.fromCurrency;
    this.fromCurrency = this.toCurrency;
    this.toCurrency = temp;
    this.calculate();
  }

  setQuickAmount(amount: number) {
    this.amount = amount;
    this.calculate();
  }

  getFormattedResult(): string {
    const symbol = this.currencyService.getCurrencySymbol(this.toCurrency);
    
    // Format based on currency
    let formatted: string;
    if (['JPY', 'KRW', 'IDR'].includes(this.toCurrency)) {
      formatted = Math.round(this.result).toLocaleString('en-US');
    } else {
      formatted = this.result.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
    
    return `${symbol}${formatted}`;
  }

  getExchangeRate(): string {
    const rate = this.currencyService.getExchangeRate(this.fromCurrency, this.toCurrency);
    return rate.toFixed(4);
  }

  getPopularConversions() {
    const popular = [
      { from: 'USD', to: 'EUR' },
      { from: 'USD', to: 'GBP' },
      { from: 'USD', to: 'INR' },
      { from: 'EUR', to: 'GBP' },
      { from: 'GBP', to: 'INR' }
    ];

    return popular.map(conv => ({
      from: conv.from,
      to: conv.to,
      rate: this.currencyService.getExchangeRate(conv.from, conv.to).toFixed(4)
    }));
  }

  async refreshRates() {
    await this.currencyService.updateExchangeRates();
    this.lastUpdate = this.currencyService.getLastUpdateTime();
    this.calculate();
  }

  togglePopular() {
    this.showPopular = !this.showPopular;
  }

  getTimeAgo(date: Date): string {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  }
}
