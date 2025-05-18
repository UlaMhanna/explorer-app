### Project Setup Instructions

## 1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name

## 2. Install dependencies:
   npm install
   Run the development server:
   npm start
   Open http://localhost:3000 in your browser.

## Tech Stack Used

- React 18
- TypeScript
- Tailwind CSS
- React Router
- LocalStorage (for saving favorites)

- # Key Design Decisions

- Used React Context to manage favorites state globally across the app.
- Tailwind CSS was chosen for rapid and responsive styling.
- LocalStorage is used to persist favorite products across sessions.
- React Router handles client-side routing for a SPA experience.
- Product data fetched from FakeStore API for demo purposes.

## Known Issues / Areas for Improvement

- No authentication implemented yet.
- No shopping cart.
- No pagination or infinite scroll for product list.
- Favorites functionality doesn't sync across multiple browser tabs.
- Error handling for network requests can be improved.
- Unit and integration tests are missing.

