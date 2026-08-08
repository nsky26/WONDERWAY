import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, firstValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
  quickReplies?: string[];
  actionLink?: string;
  actionText?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  // Angular Signal for messages state
  public messagesSignal = signal<ChatMessage[]>([]);
  public isOpenSignal = signal<boolean>(false);
  public isTypingSignal = signal<boolean>(false);

  // Future Backend API URL (plug-and-play configuration)
  private backendApiUrl: string | null = null; 

  constructor(private http: HttpClient) {
    // Initial welcome message
    this.addBotMessage(
      "👋 Hello! I'm WonderWay Assistant. How can I help you today?",
      [
        '✈️ How to book flights?',
        '🏨 Find top hotels',
        '💰 Currency conversion',
        '🎫 My PDF tickets'
      ]
    );
  }

  /**
   * Set backend URL when ready to connect to Node.js/Python API
   */
  public setBackendApiUrl(url: string): void {
    this.backendApiUrl = url;
    console.log('✅ Chatbot connected to backend API endpoint:', url);
  }

  public toggleChatbot(): void {
    this.isOpenSignal.update(open => !open);
  }

  public openChatbot(): void {
    this.isOpenSignal.set(true);
  }

  public closeChatbot(): void {
    this.isOpenSignal.set(false);
  }

  public async sendMessage(userText: string): Promise<void> {
    if (!userText.trim()) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: Math.random().toString(36).substring(2, 9),
      sender: 'user',
      text: userText,
      timestamp: new Date()
    };

    this.messagesSignal.update(current => [...current, userMsg]);
    this.isTypingSignal.set(true);

    // If backend API URL is configured, call backend REST API
    if (this.backendApiUrl) {
      try {
        const response: any = await firstValueFrom(
          this.http.post(this.backendApiUrl, {
            message: userText,
            timestamp: new Date()
          }).pipe(
            catchError(err => {
              console.warn('Backend API unavailable, falling back to local AI engine:', err);
              return of(null);
            })
          )
        );

        if (response && response.reply) {
          this.isTypingSignal.set(false);
          this.addBotMessage(response.reply, response.quickReplies, response.actionLink, response.actionText);
          return;
        }
      } catch (e) {
        console.warn('Backend call failed, using fallback engine');
      }
    }

    // Smart Local AI Knowledge Engine (Fallback & Production Client Mode)
    setTimeout(() => {
      this.isTypingSignal.set(false);
      const response = this.generateLocalKnowledgeResponse(userText);
      this.addBotMessage(response.text, response.quickReplies, response.actionLink, response.actionText);
    }, 450);
  }

  private addBotMessage(text: string, quickReplies?: string[], actionLink?: string, actionText?: string): void {
    const botMsg: ChatMessage = {
      id: Math.random().toString(36).substring(2, 9),
      sender: 'bot',
      text,
      timestamp: new Date(),
      quickReplies,
      actionLink,
      actionText
    };

    this.messagesSignal.update(current => [...current, botMsg]);
  }

  /**
   * Comprehensive App Information Knowledge Base
   */
  private generateLocalKnowledgeResponse(input: string): { text: string; quickReplies?: string[]; actionLink?: string; actionText?: string } {
    const query = input.toLowerCase();

    if (query.includes('flight') || query.includes('fly') || query.includes('airline')) {
      return {
        text: "✈️ **Flights Booking**: Search routes across top airlines (IndiGo, Air India, Vistara, SpiceJet). Filter by price, class (Economy/Business), and non-stop preferences.",
        actionLink: '/flights',
        actionText: 'Search Flights Now',
        quickReplies: ['🏨 Search Hotels', '🚌 Book Buses', '🚘 Rent Cars']
      };
    }

    if (query.includes('hotel') || query.includes('stay') || query.includes('resort') || query.includes('room')) {
      return {
        text: "🏨 **Hotels & Stays**: Browse luxury resorts, boutique stays, and budget hotels with amenities like Free WiFi, Swimming Pool, and Breakfast.",
        actionLink: '/hotels',
        actionText: 'Explore Hotels',
        quickReplies: ['📍 View Destinations', '✈️ Book Flights']
      };
    }

    if (query.includes('bus') || query.includes('volvo') || query.includes('sleeper')) {
      return {
        text: "🚌 **Bus Booking**: Book AC Sleeper, Semi-Sleeper, and luxury Volvo buses with seat selection and real-time departure times.",
        actionLink: '/buses',
        actionText: 'Book Buses',
        quickReplies: ['🚘 Rent Cars', '✈️ Search Flights']
      };
    }

    if (query.includes('car') || query.includes('cab') || query.includes('drive') || query.includes('rental')) {
      return {
        text: "🚘 **Car Rentals**: Rent SUVs, Sedans, Luxury cars, or Hatchbacks with self-drive or chauffeur options.",
        actionLink: '/cars',
        actionText: 'Browse Rentals',
        quickReplies: ['✈️ Book Flights', '🏨 Search Hotels']
      };
    }

    if (query.includes('currency') || query.includes('dollar') || query.includes('rupee') || query.includes('euro') || query.includes('pound') || query.includes('price')) {
      return {
        text: "💰 **Multi-Currency Engine**: Use the dropdown in the top navbar to switch between 6 currencies (USD $, EUR €, GBP £, INR ₹, AUD A$, JPY ¥). All prices convert automatically!",
        quickReplies: ['🌐 Change Language', '🎫 View PDF Tickets']
      };
    }

    if (query.includes('language') || query.includes('spanish') || query.includes('french') || query.includes('german') || query.includes('hindi') || query.includes('arabic') || query.includes('chinese') || query.includes('japanese')) {
      return {
        text: "🌐 **8 Languages Supported**: English, Spanish (Español), French (Français), German (Deutsch), Hindi (हिन्दी), Chinese (中文), Japanese (日本語), and Arabic (العربية). Switch anytime in the header!",
        quickReplies: ['💰 Currency conversion', '📱 Contact Support']
      };
    }

    if (query.includes('ticket') || query.includes('booking') || query.includes('pdf') || query.includes('download') || query.includes('qr')) {
      return {
        text: "🎫 **PDF Tickets & QR Codes**: All your confirmed bookings are stored under 'My Bookings'. You can instantly view or download printable PDF tickets with embedded verification QR codes!",
        actionLink: '/my-bookings',
        actionText: 'Open My Bookings',
        quickReplies: ['✈️ Book Flights', '🏨 Search Hotels']
      };
    }

    if (query.includes('backend') || query.includes('api') || query.includes('connect') || query.includes('server') || query.includes('node') || query.includes('python')) {
      return {
        text: "🔌 **Backend Integration Ready**: WonderWay Assistant is architected with a REST/GraphQL backend adapter. When your backend API server is launched, simply call `chatbotService.setBackendApiUrl('https://api.yourdomain.com/chat')` to stream live responses!",
        quickReplies: ['🛠️ Architecture Info', '✈️ Book Flights']
      };
    }

    if (query.includes('about') || query.includes('wonderway') || query.includes('app') || query.includes('who')) {
      return {
        text: "🌟 **About WonderWay**: WonderWay is an AI-powered next-generation travel platform offering seamless flight, hotel, bus, and car bookings with multi-language support, real-time currency conversion, and visual maps.",
        actionLink: '/about',
        actionText: 'Learn About Us',
        quickReplies: ['📍 Explore Destinations', '✈️ Search Flights']
      };
    }

    if (query.includes('help') || query.includes('hi') || query.includes('hello') || query.includes('hey')) {
      return {
        text: "👋 Hi there! I can assist you with flights, hotels, bus & car rentals, currency conversion, downloading PDF tickets, or app info. What would you like to explore?",
        quickReplies: [
          '✈️ Book Flights',
          '🏨 Search Hotels',
          '💰 Currency conversion',
          '🎫 My PDF tickets'
        ]
      };
    }

    return {
      text: `I'm here to help with all features of **WonderWay**! You can search flights, book hotels, change currencies, or access your PDF tickets under My Bookings.`,
      quickReplies: ['✈️ Flights', '🏨 Hotels', '🎫 PDF Tickets', '🔌 Backend API Info']
    };
  }
}
