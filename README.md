# NexHub Community Website

A modern, responsive website for the NexHub Community built with React, TypeScript, and Tailwind CSS. This platform serves as the official website for the NexHub Community, providing information about events, team members, and opportunities to join the community.
- Deployed Link : [https://nexhubcommunity.vercel.app/](https://nexhubcommunity.vercel.app/)
## Features

- 🎨 Fully responsive design with modern UI/UX
- 🌓 Dark mode/light mode toggle
- ✨ Interactive UI with smooth animations using Framer Motion
- 📱 Mobile-first approach
- 📧 Contact form with email integration
- 🔐 Privacy policy and terms of service
- 📝 Dynamic content management
- 🎯 Multiple pages: Home, About, Events, Team, Contact, and Join Us

## Tech Stack

- ⚛️ React 18
- 📘 TypeScript
- 🎨 Tailwind CSS
- �� Framer Motion
- 🛣️ React Router
- 📧 EmailJS for contact forms
- 🔄 Vite for build tooling
- 🚀 Express.js backend
- 📱 Responsive design

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Git

## Installation

1. Clone the repository
   ```bash
    git clone https://github.com/shivamshar03/
   nexhub-website.git
   ```
   or 
   
   ```bash
   git clone https://github.com/NexHub-Community/Official_Website.git
   cd nexhub
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory and add necessary environment variables:
   ```bash
   SMTP_PASSWORD=**** **** ****
   SMTP_EMAIL=noreply.nexhub@gmail.com
   # Server Settings
   PORT=5000
   GOOGLE_SCRIPT_URL=https://script.google.com/.........
   VITE_API_URL=https://nexhubcommunity.vercel.app 
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
