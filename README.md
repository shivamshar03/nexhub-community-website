# NexHub Community Website

A modern, responsive website for the NexHub Community built with React, TypeScript, and Tailwind CSS.

## Features

- Fully responsive design
- Dark mode/light mode toggle
- Interactive UI with animations using Framer Motion
- Multiple pages: Home, About, Events, Team, Contact, and Join Us

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Framer Motion
- React Router

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/shivamshar03/nexhub-website.git
   cd nexhub
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
nexhub/
├── public/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page components
│   ├── context/         # Context providers (e.g., ThemeContext)
│   ├── assets/          # Static assets like images
│   ├── App.tsx          # Main App component
│   └── main.tsx         # Entry point
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## Customization

- **Colors**: Edit the theme colors in `tailwind.config.js`
- **Content**: Update the content in the respective page components
- **Styling**: Modify the Tailwind classes or add custom CSS in `src/index.css`

## Deployment

This site can be easily deployed to platforms like Vercel, Netlify, or GitHub Pages.

```bash
npm run build
# or
yarn build
```

## License

MIT 
# nexhubwebsite
