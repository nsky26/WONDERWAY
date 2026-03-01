// AI-Powered Multi-currency support service with real-time rates
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  country: string;
}

export interface ExchangeRateResponse {
  base: string;
  rates: { [key: string]: number };
  timestamp: number;
}

export interface CountryInfo {
  country: string;
  currency: string;
  timezone: string;
  ip: string;
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private currentCurrencySubject = new BehaviorSubject<string>('USD');
  public currentCurrency$ = this.currentCurrencySubject.asObservable();

  private exchangeRatesSubject = new BehaviorSubject<{ [key: string]: number }>({});
  public exchangeRates$ = this.exchangeRatesSubject.asObservable();

  private lastUpdateSubject = new BehaviorSubject<Date | null>(null);
  public lastUpdate$ = this.lastUpdateSubject.asObservable();

  // Available currencies with country mapping
  public currencies: Currency[] = [
    { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸', country: 'United States' },
    { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺', country: 'European Union' },
    { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧', country: 'United Kingdom' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳', country: 'India' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵', country: 'Japan' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳', country: 'China' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺', country: 'Australia' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦', country: 'Canada' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭', country: 'Switzerland' },
    { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪', country: 'United Arab Emirates' },
    { code: 'SAR', name: 'Saudi Riyal', symbol: 'ر.س', flag: '🇸🇦', country: 'Saudi Arabia' },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬', country: 'Singapore' },
    { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰', country: 'Hong Kong' },
    { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿', country: 'New Zealand' },
    { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷', country: 'South Korea' },
    { code: 'MXN', name: 'Mexican Peso', symbol: 'Mex$', flag: '🇲🇽', country: 'Mexico' },
    { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷', country: 'Brazil' },
    { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦', country: 'South Africa' },
    { code: 'THB', name: 'Thai Baht', symbol: '฿', flag: '🇹🇭', country: 'Thailand' },
    { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', flag: '🇮🇩', country: 'Indonesia' }
  ];

  // Country to currency mapping for AI detection
  private countryToCurrency: { [key: string]: string } = {
    'US': 'USD', 'United States': 'USD', 'USA': 'USD',
    'GB': 'GBP', 'United Kingdom': 'GBP', 'UK': 'GBP',
    'IN': 'INR', 'India': 'INR',
    'JP': 'JPY', 'Japan': 'JPY',
    'CN': 'CNY', 'China': 'CNY',
    'AU': 'AUD', 'Australia': 'AUD',
    'CA': 'CAD', 'Canada': 'CAD',
    'CH': 'CHF', 'Switzerland': 'CHF',
    'AE': 'AED', 'United Arab Emirates': 'AED', 'UAE': 'AED',
    'SA': 'SAR', 'Saudi Arabia': 'SAR',
    'SG': 'SGD', 'Singapore': 'SGD',
    'HK': 'HKD', 'Hong Kong': 'HKD',
    'NZ': 'NZD', 'New Zealand': 'NZD',
    'KR': 'KRW', 'South Korea': 'KRW',
    'MX': 'MXN', 'Mexico': 'MXN',
    'BR': 'BRL', 'Brazil': 'BRL',
    'ZA': 'ZAR', 'South Africa': 'ZAR',
    'TH': 'THB', 'Thailand': 'THB',
    'ID': 'IDR', 'Indonesia': 'IDR',
    // European countries using EUR
    'DE': 'EUR', 'Germany': 'EUR',
    'FR': 'EUR', 'France': 'EUR',
    'IT': 'EUR', 'Italy': 'EUR',
    'ES': 'EUR', 'Spain': 'EUR',
    'NL': 'EUR', 'Netherlands': 'EUR',
    'BE': 'EUR', 'Belgium': 'EUR',
    'AT': 'EUR', 'Austria': 'EUR',
    'PT': 'EUR', 'Portugal': 'EUR',
    'IE': 'EUR', 'Ireland': 'EUR',
    'GR': 'EUR', 'Greece': 'EUR'
  };

  // Default exchange rates (fallback)
  private exchangeRates: { [key: string]: number } = {
    'USD': 1.00,
    'EUR': 0.92,
    'GBP': 0.79,
    'INR': 83.12,
    'JPY': 149.50,
    'CNY': 7.24,
    'AUD': 1.52,
    'CAD': 1.36,
    'CHF': 0.88,
    'AED': 3.67,
    'SAR': 3.75,
    'SGD': 1.35,
    'HKD': 7.83,
    'NZD': 1.64,
    'KRW': 1320.50,
    'MXN': 17.15,
    'BRL': 4.98,
    'ZAR': 18.75,
    'THB': 35.20,
    'IDR': 15650.00
  };

  constructor() {
    // Load saved currency from localStorage
    const savedCurrency = localStorage.getItem('selectedCurrency');
    if (savedCurrency) {
      this.currentCurrencySubject.next(savedCurrency);
    } else {
      // AI-powered auto-detection
      this.detectUserCurrencyAI();
    }

    // Initialize exchange rates
    this.exchangeRatesSubject.next(this.exchangeRates);

    // Update exchange rates on initialization
    this.updateExchangeRates();

    // Set up periodic updates (every 6 hours)
    setInterval(() => {
      this.updateExchangeRates();
    }, 6 * 60 * 60 * 1000);
  }

  /**
   * AI-powered currency detection based on multiple factors
   */
  private async detectUserCurrencyAI(): Promise<void> {
    try {
      // Method 1: Try IP-based geolocation (most accurate)
      const ipCurrency = await this.detectByIP();
      if (ipCurrency) {
        this.setCurrentCurrency(ipCurrency);
        console.log('✅ Currency detected by IP:', ipCurrency);
        return;
      }
    } catch (error) {
      console.log('IP detection failed, trying other methods...');
    }

    // Method 2: Browser language/locale
    const localeCurrency = this.detectByLocale();
    if (localeCurrency) {
      this.setCurrentCurrency(localeCurrency);
      console.log('✅ Currency detected by locale:', localeCurrency);
      return;
    }

    // Method 3: Timezone-based detection
    const timezoneCurrency = this.detectByTimezone();
    if (timezoneCurrency) {
      this.setCurrentCurrency(timezoneCurrency);
      console.log('✅ Currency detected by timezone:', timezoneCurrency);
      return;
    }

    // Default to USD if all methods fail
    this.setCurrentCurrency('USD');
    console.log('ℹ️ Using default currency: USD');
  }

  /**
   * Detect currency by IP geolocation (most accurate)
   */
  private async detectByIP(): Promise<string | null> {
    try {
      // Using ipapi.co for free IP geolocation
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      if (data.country_code) {
        const currency = this.countryToCurrency[data.country_code];
        if (currency) {
          // Store country info for future use
          localStorage.setItem('userCountry', data.country_name);
          localStorage.setItem('userCountryCode', data.country_code);
          return currency;
        }
      }
    } catch (error) {
      console.error('IP detection error:', error);
    }
    return null;
  }

  /**
   * Detect currency by browser locale
   */
  private detectByLocale(): string | null {
    const userLang = navigator.language.toLowerCase();
    
    // Map common locales to currencies
    const localeMap: { [key: string]: string } = {
      'en-us': 'USD',
      'en-gb': 'GBP',
      'en-au': 'AUD',
      'en-ca': 'CAD',
      'en-nz': 'NZD',
      'en-in': 'INR',
      'hi': 'INR',
      'hi-in': 'INR',
      'ja': 'JPY',
      'ja-jp': 'JPY',
      'zh': 'CNY',
      'zh-cn': 'CNY',
      'ko': 'KRW',
      'ko-kr': 'KRW',
      'th': 'THB',
      'th-th': 'THB',
      'id': 'IDR',
      'id-id': 'IDR',
      'ar-ae': 'AED',
      'ar-sa': 'SAR',
      'de': 'EUR',
      'fr': 'EUR',
      'es': 'EUR',
      'it': 'EUR',
      'pt': 'EUR',
      'nl': 'EUR'
    };

    return localeMap[userLang] || null;
  }

  /**
   * Detect currency by timezone
   */
  private detectByTimezone(): string | null {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Map timezones to currencies
    const timezoneMap: { [key: string]: string } = {
      'America/New_York': 'USD',
      'America/Chicago': 'USD',
      'America/Los_Angeles': 'USD',
      'America/Toronto': 'CAD',
      'America/Mexico_City': 'MXN',
      'America/Sao_Paulo': 'BRL',
      'Europe/London': 'GBP',
      'Europe/Paris': 'EUR',
      'Europe/Berlin': 'EUR',
      'Europe/Rome': 'EUR',
      'Europe/Madrid': 'EUR',
      'Asia/Kolkata': 'INR',
      'Asia/Tokyo': 'JPY',
      'Asia/Shanghai': 'CNY',
      'Asia/Hong_Kong': 'HKD',
      'Asia/Singapore': 'SGD',
      'Asia/Seoul': 'KRW',
      'Asia/Bangkok': 'THB',
      'Asia/Jakarta': 'IDR',
      'Asia/Dubai': 'AED',
      'Asia/Riyadh': 'SAR',
      'Australia/Sydney': 'AUD',
      'Pacific/Auckland': 'NZD',
      'Africa/Johannesburg': 'ZAR'
    };

    return timezoneMap[timezone] || null;
  }

  getCurrentCurrency(): string {
    return this.currentCurrencySubject.value;
  }

  setCurrentCurrency(currencyCode: string): void {
    this.currentCurrencySubject.next(currencyCode);
    localStorage.setItem('selectedCurrency', currencyCode);
  }

  getCurrencySymbol(code?: string): string {
    const currencyCode = code || this.getCurrentCurrency();
    return this.currencies.find(c => c.code === currencyCode)?.symbol || '$';
  }

  getCurrencyName(code?: string): string {
    const currencyCode = code || this.getCurrentCurrency();
    return this.currencies.find(c => c.code === currencyCode)?.name || 'USD';
  }

  getCurrencyCountry(code?: string): string {
    const currencyCode = code || this.getCurrentCurrency();
    return this.currencies.find(c => c.code === currencyCode)?.country || 'United States';
  }

  /**
   * Convert price from USD to target currency
   */
  convertPrice(priceInUSD: number, toCurrency?: string): number {
    const targetCurrency = toCurrency || this.getCurrentCurrency();
    const rate = this.exchangeRates[targetCurrency] || 1;
    return Math.round(priceInUSD * rate * 100) / 100; // Round to 2 decimal places
  }

  /**
   * Convert between any two currencies
   */
  convertBetweenCurrencies(amount: number, fromCurrency: string, toCurrency: string): number {
    // Convert to USD first, then to target currency
    const amountInUSD = amount / (this.exchangeRates[fromCurrency] || 1);
    const convertedAmount = amountInUSD * (this.exchangeRates[toCurrency] || 1);
    return Math.round(convertedAmount * 100) / 100;
  }

  /**
   * Format price with currency symbol and proper formatting
   */
  formatPrice(priceInUSD: number, toCurrency?: string, showCode: boolean = false): string {
    const targetCurrency = toCurrency || this.getCurrentCurrency();
    const convertedPrice = this.convertPrice(priceInUSD, targetCurrency);
    const symbol = this.getCurrencySymbol(targetCurrency);
    
    // Format with thousands separator and decimal places
    let formatted: string;
    
    // Special formatting for currencies without decimal places
    if (['JPY', 'KRW', 'IDR'].includes(targetCurrency)) {
      formatted = Math.round(convertedPrice).toLocaleString('en-US');
    } else {
      formatted = convertedPrice.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
    
    // Add currency code if requested
    const code = showCode ? ` ${targetCurrency}` : '';
    
    return `${symbol}${formatted}${code}`;
  }

  /**
   * Get exchange rate between two currencies
   */
  getExchangeRate(fromCurrency: string, toCurrency: string): number {
    const fromRate = this.exchangeRates[fromCurrency] || 1;
    const toRate = this.exchangeRates[toCurrency] || 1;
    return toRate / fromRate;
  }

  /**
   * Calculate price comparison across multiple currencies
   */
  getPriceComparison(priceInUSD: number, currencies: string[]): { [key: string]: string } {
    const comparison: { [key: string]: string } = {};
    currencies.forEach(currency => {
      comparison[currency] = this.formatPrice(priceInUSD, currency, true);
    });
    return comparison;
  }

  /**
   * Update exchange rates from API
   */
  async updateExchangeRates(): Promise<void> {
    try {
      // Using exchangerate-api.com (free tier: 1500 requests/month)
      // Alternative: api.exchangerate.host (free, no API key needed)
      const response = await fetch('https://api.exchangerate.host/latest?base=USD');
      const data = await response.json();
      
      if (data.success && data.rates) {
        this.exchangeRates = data.rates;
        this.exchangeRatesSubject.next(this.exchangeRates);
        this.lastUpdateSubject.next(new Date());
        
        // Save to localStorage for offline use
        localStorage.setItem('exchangeRates', JSON.stringify(this.exchangeRates));
        localStorage.setItem('exchangeRatesTimestamp', new Date().toISOString());
        
        console.log('✅ Exchange rates updated successfully');
      }
    } catch (error) {
      console.error('❌ Failed to update exchange rates:', error);
      
      // Try to load from localStorage as fallback
      const savedRates = localStorage.getItem('exchangeRates');
      if (savedRates) {
        this.exchangeRates = JSON.parse(savedRates);
        this.exchangeRatesSubject.next(this.exchangeRates);
        console.log('ℹ️ Using cached exchange rates');
      }
    }
  }

  /**
   * Get last update time
   */
  getLastUpdateTime(): Date | null {
    const timestamp = localStorage.getItem('exchangeRatesTimestamp');
    return timestamp ? new Date(timestamp) : null;
  }

  /**
   * Check if rates need update (older than 6 hours)
   */
  needsUpdate(): boolean {
    const lastUpdate = this.getLastUpdateTime();
    if (!lastUpdate) return true;
    
    const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000);
    return lastUpdate < sixHoursAgo;
  }

  /**
   * Get currency by country code
   */
  getCurrencyByCountry(countryCode: string): string {
    return this.countryToCurrency[countryCode] || 'USD';
  }

  /**
   * Get all supported currencies
   */
  getAllCurrencies(): Currency[] {
    return this.currencies;
  }

  /**
   * Check if currency is supported
   */
  isCurrencySupported(code: string): boolean {
    return this.currencies.some(c => c.code === code);
  }

  /**
   * Get popular currencies (most commonly used)
   */
  getPopularCurrencies(): Currency[] {
    const popularCodes = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'CNY', 'AUD', 'CAD'];
    return this.currencies.filter(c => popularCodes.includes(c.code));
  }

  /**
   * Smart price suggestion based on user's currency
   * Suggests rounded prices that look good in local currency
   */
  suggestLocalPrice(priceInUSD: number): number {
    const converted = this.convertPrice(priceInUSD);
    const currency = this.getCurrentCurrency();
    
    // Round to nice numbers based on currency
    if (['JPY', 'KRW', 'IDR'].includes(currency)) {
      // Round to nearest 1000
      return Math.round(converted / 1000) * 1000;
    } else if (currency === 'INR') {
      // Round to nearest 100
      return Math.round(converted / 100) * 100;
    } else {
      // Round to nearest 10
      return Math.round(converted / 10) * 10;
    }
  }

  /**
   * Get currency trend (if rates are going up or down)
   * Requires historical data - placeholder for now
   */
  getCurrencyTrend(currencyCode: string): 'up' | 'down' | 'stable' {
    // In production, compare with historical rates
    // For now, return stable
    return 'stable';
  }

  /**
   * Format price range
   */
  formatPriceRange(minPriceUSD: number, maxPriceUSD: number, toCurrency?: string): string {
    const min = this.formatPrice(minPriceUSD, toCurrency);
    const max = this.formatPrice(maxPriceUSD, toCurrency);
    return `${min} - ${max}`;
  }

  /**
   * Calculate savings in user's currency
   */
  calculateSavings(originalPrice: number, discountedPrice: number): string {
    const savings = originalPrice - discountedPrice;
    return this.formatPrice(savings);
  }

  /**
   * Get currency info for display
   */
  getCurrencyInfo(code?: string): Currency | undefined {
    const currencyCode = code || this.getCurrentCurrency();
    return this.currencies.find(c => c.code === currencyCode);
  }
}
