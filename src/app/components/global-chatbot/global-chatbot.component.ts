import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChatbotService, ChatMessage } from '../../services/chatbot.service';

@Component({
  selector: 'app-global-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <!-- Floating Trigger Launcher Button -->
    <button 
      class="chatbot-launcher-btn" 
      (click)="chatbotService.toggleChatbot()"
      [class.active]="chatbotService.isOpenSignal()"
      aria-label="Open WonderWay AI Travel Assistant"
    >
      <span class="launcher-icon" *ngIf="!chatbotService.isOpenSignal()">🤖</span>
      <span class="close-icon" *ngIf="chatbotService.isOpenSignal()">&times;</span>
      <span class="launcher-pulse" *ngIf="!chatbotService.isOpenSignal()"></span>
    </button>

    <!-- Floating Chatbot Modal Window -->
    <div class="chatbot-window" *ngIf="chatbotService.isOpenSignal()">
      <!-- Chat Header -->
      <div class="chat-header">
        <div class="chat-title-info">
          <div class="bot-avatar">🤖</div>
          <div>
            <h4>WonderWay Assistant</h4>
            <span class="online-status"><span class="status-dot"></span> 24/7 AI & Backend Ready</span>
          </div>
        </div>
        <button class="chat-close-btn" (click)="chatbotService.closeChatbot()">&times;</button>
      </div>

      <!-- Chat Messages List -->
      <div class="chat-body" #scrollContainer>
        <div 
          *ngFor="let msg of chatbotService.messagesSignal()" 
          class="message-row" 
          [class.user-row]="msg.sender === 'user'"
          [class.bot-row]="msg.sender === 'bot'"
        >
          <div class="message-bubble">
            <div class="message-text" [innerHTML]="formatMarkdown(msg.text)"></div>
            
            <!-- Direct Link Action Button -->
            <a 
              *ngIf="msg.actionLink" 
              [routerLink]="msg.actionLink" 
              (click)="chatbotService.closeChatbot()" 
              class="action-btn"
            >
              {{ msg.actionText || 'Explore Now' }} →
            </a>

            <!-- Quick Reply Chips -->
            <div class="quick-replies" *ngIf="msg.quickReplies && msg.quickReplies.length > 0">
              <button 
                *ngFor="let chip of msg.quickReplies" 
                class="chip-btn"
                (click)="onQuickReply(chip)"
              >
                {{ chip }}
              </button>
            </div>

            <span class="message-time">{{ msg.timestamp | date:'shortTime' }}</span>
          </div>
        </div>

        <!-- Typing Indicator -->
        <div class="message-row bot-row" *ngIf="chatbotService.isTypingSignal()">
          <div class="message-bubble typing-bubble">
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
          </div>
        </div>
      </div>

      <!-- Chat Input Area -->
      <div class="chat-footer">
        <input 
          type="text" 
          placeholder="Ask about flights, hotels, tickets..." 
          [(ngModel)]="userInput"
          (keyup.enter)="send()"
          class="chat-input"
        />
        <button class="send-btn" (click)="send()" [disabled]="!userInput.trim()">
          🚀
        </button>
      </div>
    </div>
  `,
  styles: [`
    .chatbot-launcher-btn {
      position: fixed;
      bottom: 24px;
      left: 24px;
      z-index: 9998;
      width: 58px;
      height: 58px;
      border-radius: 50%;
      background: linear-gradient(135deg, #00b4d8 0%, #64ffda 100%);
      border: 2px solid rgba(255, 255, 255, 0.4);
      color: #0b1329;
      font-size: 1.6rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 10px 25px rgba(0, 180, 216, 0.4), 0 0 20px rgba(100, 255, 218, 0.3);
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .chatbot-launcher-btn:hover {
      transform: scale(1.1);
      box-shadow: 0 14px 30px rgba(0, 180, 216, 0.6), 0 0 25px rgba(100, 255, 218, 0.5);
    }
    .launcher-pulse {
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      border: 2px solid #64ffda;
      animation: pulsePing 2.5s infinite;
    }
    @keyframes pulsePing {
      0% { transform: scale(1); opacity: 0.8; }
      100% { transform: scale(1.4); opacity: 0; }
    }
    .chatbot-window {
      position: fixed;
      bottom: 92px;
      left: 24px;
      z-index: 9998;
      width: 360px;
      max-width: calc(100vw - 48px);
      height: 520px;
      max-height: calc(100vh - 120px);
      background: rgba(15, 23, 42, 0.96);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(100, 255, 218, 0.25);
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(100, 255, 218, 0.15);
      overflow: hidden;
      animation: chatIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    @keyframes chatIn {
      from { opacity: 0; transform: translateY(20px) scale(0.95); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    .chat-header {
      background: linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%);
      padding: 14px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(100, 255, 218, 0.15);
    }
    .chat-title-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .bot-avatar {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: linear-gradient(135deg, #00b4d8 0%, #64ffda 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    }
    .chat-title-info h4 {
      margin: 0;
      color: #f8fafc;
      font-size: 1rem;
      font-weight: 600;
    }
    .online-status {
      font-size: 0.75rem;
      color: #64ffda;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #34d399;
      box-shadow: 0 0 8px #34d399;
    }
    .chat-close-btn {
      background: none;
      border: none;
      color: #94a3b8;
      font-size: 1.4rem;
      cursor: pointer;
    }
    .chat-body {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .message-row {
      display: flex;
    }
    .user-row {
      justify-content: flex-end;
    }
    .bot-row {
      justify-content: flex-start;
    }
    .message-bubble {
      max-width: 82%;
      padding: 12px 14px;
      border-radius: 14px;
      font-size: 0.9rem;
      line-height: 1.45;
      position: relative;
    }
    .user-row .message-bubble {
      background: linear-gradient(135deg, #00b4d8 0%, #0077b6 100%);
      color: #ffffff;
      border-bottom-right-radius: 2px;
    }
    .bot-row .message-bubble {
      background: rgba(30, 41, 59, 0.85);
      border: 1px solid rgba(100, 255, 218, 0.15);
      color: #e2e8f0;
      border-bottom-left-radius: 2px;
    }
    .message-time {
      display: block;
      font-size: 0.68rem;
      margin-top: 6px;
      opacity: 0.7;
      text-align: right;
    }
    .action-btn {
      display: inline-block;
      margin-top: 8px;
      padding: 6px 12px;
      background: linear-gradient(135deg, #64ffda 0%, #00b4d8 100%);
      color: #0b1329 !important;
      font-weight: 600;
      font-size: 0.8rem;
      border-radius: 8px;
      text-decoration: none;
    }
    .quick-replies {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 10px;
    }
    .chip-btn {
      background: rgba(100, 255, 218, 0.1);
      border: 1px solid rgba(100, 255, 218, 0.3);
      color: #64ffda;
      padding: 4px 10px;
      border-radius: 14px;
      font-size: 0.75rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .chip-btn:hover {
      background: #64ffda;
      color: #0b1329;
    }
    .typing-bubble {
      display: flex;
      gap: 4px;
      padding: 10px 14px;
    }
    .typing-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #64ffda;
      animation: typing 1.4s infinite ease-in-out both;
    }
    .typing-dot:nth-child(1) { animation-delay: 0s; }
    .typing-dot:nth-child(2) { animation-delay: 0.2s; }
    .typing-dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes typing {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1); }
    }
    .chat-footer {
      padding: 12px;
      background: rgba(15, 23, 42, 0.9);
      border-top: 1px solid rgba(100, 255, 218, 0.15);
      display: flex;
      gap: 8px;
    }
    .chat-input {
      flex: 1;
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(100, 255, 218, 0.2);
      border-radius: 10px;
      padding: 8px 12px;
      color: #f8fafc;
      font-size: 0.88rem;
      outline: none;
    }
    .chat-input:focus {
      border-color: #64ffda;
    }
    .send-btn {
      background: linear-gradient(135deg, #00b4d8 0%, #64ffda 100%);
      border: none;
      border-radius: 10px;
      width: 38px;
      height: 38px;
      color: #0b1329;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .send-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `]
})
export class GlobalChatbotComponent implements AfterViewChecked {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  userInput: string = '';

  constructor(public chatbotService: ChatbotService) {}

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      if (this.scrollContainer) {
        this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
      }
    } catch {}
  }

  send(): void {
    if (!this.userInput.trim()) return;
    const text = this.userInput;
    this.userInput = '';
    this.chatbotService.sendMessage(text);
  }

  onQuickReply(chip: string): void {
    this.chatbotService.sendMessage(chip);
  }

  formatMarkdown(text: string): string {
    if (!text) return '';
    // Basic Markdown formatting for bold text
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  }
}
