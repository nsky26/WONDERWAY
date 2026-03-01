// Multi-language support service
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface Translations {
  [key: string]: {
    [lang: string]: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<string>('en');
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  // Available languages
  public languages: Language[] = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  // Translation dictionary
  private translations: Translations = {
    // Navigation
    'nav.home': { en: 'Home', es: 'Inicio', fr: 'Accueil', de: 'Startseite', hi: 'होम', zh: '首页', ja: 'ホーム', ar: 'الرئيسية' },
    'nav.destinations': { en: 'Destinations', es: 'Destinos', fr: 'Destinations', de: 'Reiseziele', hi: 'गंतव्य', zh: '目的地', ja: '目的地', ar: 'الوجهات' },
    'nav.booking': { en: 'Booking', es: 'Reserva', fr: 'Réservation', de: 'Buchung', hi: 'बुकिंग', zh: '预订', ja: '予約', ar: 'الحجز' },
    'nav.about': { en: 'About', es: 'Acerca de', fr: 'À propos', de: 'Über uns', hi: 'हमारे बारे में', zh: '关于', ja: '概要', ar: 'حول' },
    'nav.contact': { en: 'Contact', es: 'Contacto', fr: 'Contact', de: 'Kontakt', hi: 'संपर्क', zh: '联系', ja: '連絡先', ar: 'اتصل' },
    
    // Common
    'common.search': { en: 'Search', es: 'Buscar', fr: 'Rechercher', de: 'Suchen', hi: 'खोजें', zh: '搜索', ja: '検索', ar: 'بحث' },
    'common.book_now': { en: 'Book Now', es: 'Reservar ahora', fr: 'Réserver maintenant', de: 'Jetzt buchen', hi: 'अभी बुक करें', zh: '立即预订', ja: '今すぐ予約', ar: 'احجز الآن' },
    'common.view_details': { en: 'View Details', es: 'Ver detalles', fr: 'Voir les détails', de: 'Details anzeigen', hi: 'विवरण देखें', zh: '查看详情', ja: '詳細を見る', ar: 'عرض التفاصيل' },
    'common.from': { en: 'From', es: 'Desde', fr: 'À partir de', de: 'Ab', hi: 'से', zh: '从', ja: 'から', ar: 'من' },
    'common.per_person': { en: 'per person', es: 'por persona', fr: 'par personne', de: 'pro Person', hi: 'प्रति व्यक्ति', zh: '每人', ja: '一人当たり', ar: 'للشخص' },
    'common.rating': { en: 'Rating', es: 'Calificación', fr: 'Évaluation', de: 'Bewertung', hi: 'रेटिंग', zh: '评分', ja: '評価', ar: 'التقييم' },
    'common.reviews': { en: 'reviews', es: 'reseñas', fr: 'avis', de: 'Bewertungen', hi: 'समीक्षाएं', zh: '评论', ja: 'レビュー', ar: 'المراجعات' },
    
    // Home page
    'home.hero_title': { en: 'Your Journey Begins Here', es: 'Tu viaje comienza aquí', fr: 'Votre voyage commence ici', de: 'Ihre Reise beginnt hier', hi: 'आपकी यात्रा यहाँ शुरू होती है', zh: '您的旅程从这里开始', ja: 'あなたの旅はここから始まります', ar: 'تبدأ رحلتك هنا' },
    'home.hero_subtitle': { en: 'Discover amazing destinations and create unforgettable memories', es: 'Descubre destinos increíbles y crea recuerdos inolvidables', fr: 'Découvrez des destinations incroyables et créez des souvenirs inoubliables', de: 'Entdecken Sie erstaunliche Reiseziele und schaffen Sie unvergessliche Erinnerungen', hi: 'अद्भुत गंतव्यों की खोज करें और अविस्मरणीय यादें बनाएं', zh: '发现令人惊叹的目的地，创造难忘的回忆', ja: '素晴らしい目的地を発見し、忘れられない思い出を作りましょう', ar: 'اكتشف وجهات مذهلة واصنع ذكريات لا تُنسى' },
    'home.popular_destinations': { en: 'Popular Destinations', es: 'Destinos populares', fr: 'Destinations populaires', de: 'Beliebte Reiseziele', hi: 'लोकप्रिय गंतव्य', zh: '热门目的地', ja: '人気の目的地', ar: 'الوجهات الشعبية' },
    'home.special_offers': { en: 'Special Offers', es: 'Ofertas especiales', fr: 'Offres spéciales', de: 'Sonderangebote', hi: 'विशेष ऑफर', zh: '特别优惠', ja: '特別オファー', ar: 'عروض خاصة' },
    
    // Filters
    'filter.sort_by': { en: 'Sort By', es: 'Ordenar por', fr: 'Trier par', de: 'Sortieren nach', hi: 'इसके अनुसार क्रमबद्ध करें', zh: '排序方式', ja: '並べ替え', ar: 'ترتيب حسب' },
    'filter.price_low_high': { en: 'Price: Low to High', es: 'Precio: Bajo a Alto', fr: 'Prix: Bas à Élevé', de: 'Preis: Niedrig bis Hoch', hi: 'मूल्य: कम से अधिक', zh: '价格：从低到高', ja: '価格：安い順', ar: 'السعر: من الأقل إلى الأعلى' },
    'filter.price_high_low': { en: 'Price: High to Low', es: 'Precio: Alto a Bajo', fr: 'Prix: Élevé à Bas', de: 'Preis: Hoch bis Niedrig', hi: 'मूल्य: अधिक से कम', zh: '价格：从高到低', ja: '価格：高い順', ar: 'السعر: من الأعلى إلى الأقل' },
    'filter.highest_rated': { en: 'Highest Rated', es: 'Mejor calificado', fr: 'Mieux noté', de: 'Am besten bewertet', hi: 'सर्वोच्च रेटेड', zh: '评分最高', ja: '評価が高い順', ar: 'الأعلى تقييماً' },
  };

  constructor() {
    // Load saved language from localStorage
    const savedLang = localStorage.getItem('selectedLanguage');
    if (savedLang) {
      this.currentLanguageSubject.next(savedLang);
    }
  }

  getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }

  setLanguage(langCode: string): void {
    this.currentLanguageSubject.next(langCode);
    localStorage.setItem('selectedLanguage', langCode);
    
    // Update HTML lang attribute
    document.documentElement.lang = langCode;
    
    // Update direction for RTL languages
    if (langCode === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }

  translate(key: string): string {
    const currentLang = this.getCurrentLanguage();
    return this.translations[key]?.[currentLang] || key;
  }

  getLanguageName(code: string): string {
    return this.languages.find(l => l.code === code)?.name || code;
  }
}
