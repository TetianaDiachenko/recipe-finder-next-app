# Recipe Finder App

## Overview

**Recipe Finder App** is a Next.js web application that enables users to search for recipes by keyword, cuisine, and maximum preparation time. Search results are displayed on a separate page with options to view detailed information about each recipe.

---

## Features

- **Recipe Search** with filters: keyword query, cuisine type, and max preparation time
- **Results Page** displaying recipe titles and images
- **Recipe Details Page** showing ingredients and additional recipe information
- Server-Side Rendering (**SSR**) for improved SEO and faster initial load
- API response caching for **1 minute** to optimize network requests
- Use of **React Suspense** to handle loading states smoothly
- Styling with **Tailwind CSS** for a clean, responsive UI
- Form validation and conditional enabling of buttons
- Accessibility best practices and mobile responsiveness

---

## Technologies & Architecture

- **Next.js** — server-side rendering, routing, and API integration
- **React 19** — component-based UI with Suspense for asynchronous rendering
- **Tailwind CSS** — utility-first CSS framework for fast and flexible styling
- **Spoonacular API** — external API used to fetch recipe data
- **ESLint & Prettier** — code quality and formatting tools
- **Environment Variables** — `.env.local` file to securely store API keys and configs

---

## Getting Started

### Prerequisites

- Node.js (recommended version 20)
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/recipe-finder-app.git
   cd recipe-finder-app

2. Install dependencies:

npm install

3. Create a .env.local file in the project root and add your Spoonacular API key:
NEXT_PUBLIC_SPOONACULAR_API_KEY=your_api_key_here

### Running the Application Locally

npm run dev
