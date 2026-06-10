# WonderWay Travel Portal

WonderWay is a tourism information and online booking management system built with
Angular 21. It helps users discover destinations, search travel services, complete
bookings, download PDF confirmations, and review their saved bookings locally in
the browser.

The project uses standalone Angular components, lazy-loaded routes, NgRx state
management, responsive styling, and client-side mock data so contributors can run
and improve the app without needing a backend service.

## Features

- Travel search from the home page for flights, hotels, buses, cars, and cruises.
- Dedicated booking flows for flights, hotels, buses, and cars.
- Destination listing and destination detail pages.
- Booking forms with validation, pricing, confirmation modals, and PDF downloads.
- Local booking history through `localStorage`.
- Contact form submissions saved in `localStorage`.
- Login and signup pages for future authentication work.
- Dark and light theme support on the home page.
- NgRx store slices for destinations, offers, testimonials, and bookings.
- Lazy-loaded standalone routes for better startup performance.
- Responsive UI for desktop, tablet, and mobile screens.

## Tech Stack

- Angular 21
- TypeScript 5.9
- Angular Router
- Angular SSR
- NgRx Store, Effects, and DevTools
- RxJS
- Swiper
- jsPDF and jsPDF AutoTable
- Tailwind CSS/PostCSS tooling
- Vitest and Angular test tooling

## Getting Started

### Prerequisites

- Node.js compatible with Angular 21
- npm 11 or newer, matching the `packageManager` field in `package.json`

### Install

```bash
npm install
```

### Run Locally

```bash
npm start
```

Open `http://localhost:4200/` in your browser.

### Build

```bash
npm run build
```

Build output is created in `dist/`.

### Run Tests

```bash
npm test
```

## Available Scripts

| Script | Purpose |
| --- | --- |
| `npm start` | Runs the Angular development server. |
| `npm run build` | Creates a production build. |
| `npm run watch` | Builds continuously in development mode. |
| `npm test` | Runs the test suite. |
| `npm run serve:ssr:my-frst-app` | Serves the SSR build output. |

## App Routes

| Route | Page |
| --- | --- |
| `/` and `/home` | Home page with search, offers, destinations, and reviews |
| `/destinations` | Destination listing |
| `/destinations/:id` | Destination details |
| `/booking` | General booking flow |
| `/flights` | Flight search and booking |
| `/hotels` | Hotel search and booking |
| `/buses` | Bus search and booking |
| `/cars` | Car rental search and booking |
| `/my-bookings` | Saved local booking history |
| `/login` | Login page |
| `/signup` | Signup page |
| `/about` | About page |
| `/contact` | Contact form |

## Project Structure

```text
src/
  app/
    components/       Shared UI components
    data/             City and destination seed data
    helpers/          Data generation helpers
    models/           TypeScript interfaces
    pages/            Route-level standalone components
    services/         Mock data, booking, PDF, currency, and utility services
    store/            NgRx actions, reducers, selectors, and effects
    app.config.ts     Application providers and NgRx store registration
    app.routes.ts     Lazy-loaded route configuration
  styles/             Shared CSS utilities
  styles.css          Global styles
  main.ts             Browser bootstrap
  server.ts           SSR server entry
```

## Data And Persistence

The app currently uses local mock data and browser storage:

- Travel data is served from Angular services in `src/app/services/`.
- Destination and city seed data lives in `src/app/data/`.
- Bookings are saved under the `wonderway_bookings` localStorage key.
- Contact form submissions are saved under the `wonderway_contacts` localStorage key.
- Booking PDFs are generated client-side with jsPDF.

To connect a real backend, replace the mock service methods with HTTP calls,
add environment-specific API configuration, and keep the public models in
`src/app/models/` aligned with the API responses.

## Contributing

Contributors are welcome. This repository is open to improvements, bug fixes,
documentation updates, UI polish, tests, and new travel booking features.

### Good First Contributions

- Fix copy, accessibility labels, and responsive layout issues.
- Add or improve tests for existing page components.
- Improve form validation and error messages.
- Add filters or sorting for flights, hotels, buses, cars, or destinations.
- Improve `my-bookings` with search, cancellation, or export options.
- Replace mock data gradually with API-ready service methods.
- Clean up corrupted icon/text encoding where it appears in templates or docs.

### Development Workflow

1. Fork the repository.
2. Create a feature branch from `main`.
3. Install dependencies with `npm install`.
4. Run the app with `npm start`.
5. Make a focused change.
6. Run `npm test` and `npm run build` before opening a pull request.
7. Open a pull request with a clear summary and screenshots for UI changes.

### Pull Request Guidelines

- Keep changes small and focused.
- Follow the existing standalone component structure.
- Prefer existing services, models, and shared styles before adding new patterns.
- Add tests when changing business logic, forms, routing, or shared components.
- Do not commit generated build output or local machine files.
- Mention any known limitations or follow-up work in the pull request.

## Current Contributor Opportunities

The app is functional, but there is plenty of useful work available:

- Add real authentication behind the login and signup pages.
- Add payment gateway integration.
- Add a backend API for bookings and contact submissions.
- Add real email delivery for booking confirmations.
- Improve SSR readiness for browser-only APIs such as `localStorage`.
- Add stronger accessibility coverage for keyboard and screen reader users.
- Add SEO metadata and structured data for destination pages.

## Testing Notes

Manual testing guidance is available in `TESTING_GUIDE.md`. Recent implementation
details and completed fixes are documented in `LATEST_UPDATES.md` and
`IMPLEMENTATION_SUMMARY.md`.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Support

For project questions, open an issue or start a discussion in the repository.

