# WonderWayTech - Tourism Information and Online Booking Management System

A production-ready tourism information and online booking management system built with Angular 21 (latest version) using standalone components architecture.

## 🚀 Features

### Core Features
- **Standalone Components Architecture** - No NgModule, fully modular
- **NgRx State Management** - Centralized state with actions, reducers, and selectors
- **Lazy Loading** - Optimized route-based code splitting
- **Responsive Design** - Mobile-first approach with Flexbox and Grid
- **Swiper.js Integration** - Smooth carousels for offers and testimonials
- **Clean Professional UI** - Green + Navy theme with soft shadows

### Pages
1. **Home Page**
   - Sticky navigation bar
   - Top offer strip banner
   - Hero section with search panel (Flights/Hotels/Packages tabs)
   - Special offers carousel
   - Popular destinations grid
   - Trending routes section
   - Why choose us section
   - Testimonials carousel
   - App download section
   - Professional footer

2. **Destinations Page**
   - All destinations listing
   - Filter and search capabilities
   - Destination cards with ratings and pricing

3. **Destination Details Page**
   - Full destination information
   - Highlights and travel information
   - Booking sidebar with pricing
   - Contact support option

4. **Booking Page**
   - Comprehensive booking form
   - Real-time price calculation
   - Booking summary sidebar
   - Form validation

5. **About Page**
   - Company mission and values
   - Team members
   - Statistics
   - Call-to-action

6. **Contact Page**
   - Contact form
   - Multiple contact methods
   - Quick help FAQ

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/          # Shared components
│   │   ├── navbar/
│   │   ├── footer/
│   │   └── loading-spinner/
│   ├── pages/              # Page components
│   │   ├── home/
│   │   ├── destinations/
│   │   ├── destination-details/
│   │   ├── booking/
│   │   ├── about/
│   │   └── contact/
│   ├── models/             # TypeScript interfaces
│   │   ├── destination.model.ts
│   │   ├── offer.model.ts
│   │   ├── testimonial.model.ts
│   │   └── booking.model.ts
│   ├── services/           # Data services
│   │   ├── destinations.service.ts
│   │   ├── offers.service.ts
│   │   ├── testimonials.service.ts
│   │   └── bookings.service.ts
│   ├── store/              # NgRx state management
│   │   ├── destinations/
│   │   │   ├── destinations.actions.ts
│   │   │   ├── destinations.reducer.ts
│   │   │   ├── destinations.selectors.ts
│   │   │   └── destinations.effects.ts
│   │   ├── offers/
│   │   ├── testimonials/
│   │   └── bookings/
│   ├── app.config.ts       # App configuration with NgRx
│   ├── app.routes.ts       # Routing configuration
│   └── app.ts              # Root component
├── styles.css              # Global styles
└── index.html
```

## 🛠️ Technologies Used

- **Angular 21** - Latest version with standalone components
- **TypeScript** - Type-safe development
- **NgRx** - State management (Store, Effects, DevTools)
- **Swiper.js** - Touch-enabled carousels
- **RxJS** - Reactive programming
- **CSS Grid & Flexbox** - Modern responsive layouts
- **Angular Router** - Client-side routing with lazy loading

## 📦 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd my-frst-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm start
```

4. **Open browser**
Navigate to `http://localhost:4200/`

## 🎨 Design System

### Color Palette
- **Primary Green**: `#1a5f4f`
- **Secondary Green**: `#2c8c6f`
- **Navy Blue**: `#1a3a52`
- **Text Dark**: `#333333`
- **Text Light**: `#666666`
- **Background**: `#f8f9fa`
- **White**: `#ffffff`

### Typography
- **Font Family**: System fonts (San Francisco, Segoe UI, Roboto)
- **Headings**: Bold (700 weight)
- **Body**: Regular (400 weight)

### Spacing
- Base unit: 1rem (16px)
- Consistent spacing scale: 0.5rem, 1rem, 1.5rem, 2rem, 3rem, 4rem

## 🔄 State Management

### NgRx Store Structure

```typescript
{
  destinations: {
    destinations: Destination[],
    selectedDestination: Destination | null,
    loading: boolean,
    error: string | null
  },
  offers: {
    offers: Offer[],
    loading: boolean,
    error: string | null
  },
  testimonials: {
    testimonials: Testimonial[],
    loading: boolean,
    error: string | null
  },
  bookings: {
    bookings: Booking[],
    loading: boolean,
    error: string | null
  }
}
```

### Actions
- `loadDestinations` - Fetch all destinations
- `selectDestination` - Select a destination for details
- `loadOffers` - Fetch special offers
- `loadTestimonials` - Fetch customer testimonials
- `createBooking` - Create a new booking

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 🧪 Testing

```bash
npm test
```

## 📝 Mock Data

The application currently uses mock JSON data stored in services. To connect to a real backend:

1. Update service methods in `src/app/services/`
2. Replace mock data with HTTP calls
3. Update environment configuration

## 🔐 Security Features

- Input validation on all forms
- XSS protection (Angular built-in)
- CSRF protection ready
- Secure routing

## ♿ Accessibility

- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Screen reader friendly

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

Built by senior Angular developers following industry best practices.

## 🤝 Contributing

Contributions are welcome! Please follow the coding standards and submit pull requests.

## 📞 Support

For support, email support@wonderwaytech.com or visit our contact page.

---

**WonderWayTech** - Your trusted partner for unforgettable travel experiences.
