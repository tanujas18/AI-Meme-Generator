# AI Meme Generator

A full-stack AI-powered meme generator built with React 19+, Express, TypeScript, and Vite.

## Features

- **AI-Generated Memes**: Uses OpenRouter's free models to generate contextual meme captions
- **Multiple Categories**: Bollywood, Cartoons, Viral Songs, Sports
- **Modern Stack**: React 19, TypeScript, Vite, Express
- **Code Quality**: ESLint + Prettier configured
- **Responsive Design**: Works on desktop and mobile
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

## Project Structure

```
ai-meme-generator/
├── client/                 # React 19+ frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── types/         # TypeScript types
│   │   ├── utils/         # Utility functions
│   │   ├── App.tsx        # Main app component
│   │   ├── main.tsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── eslint.config.js
├── server/                 # Express backend
│   ├── index.js           # Express server entry
│   ├── memes-core.js      # Core meme generation logic
│   ├── memegen.js         # Meme template/image handling
│   ├── openrouter.js      # OpenRouter API integration
│   ├── package.json
│   └── .env.example
├── package.json           # Root workspace config
├── .prettierrc
├── .prettierignore
├── .gitignore
└── README.md
```

## Prerequisites

- Node.js 20+
- npm 10+
- OpenRouter API key (free at [openrouter.ai](https://openrouter.ai/keys))

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

This installs dependencies for both client and server workspaces.

### 2. Configure Environment

```bash
cp server/.env.example server/.env
```

Edit `server/.env` and add your OpenRouter API key:

```env
OPEN_ROUTER_API_KEY=your_actual_api_key_here
```

### 3. Start Development Servers

```bash
npm run dev
```

This starts both servers concurrently:

- Frontend: http://localhost:5173
- Backend: http://localhost:8787

The Vite dev server proxies `/api` requests to the Express backend.

## Available Scripts

| Command                | Description                                 |
| ---------------------- | ------------------------------------------- |
| `npm run dev`          | Start both client and server in development |
| `npm run dev:client`   | Start only the Vite dev server              |
| `npm run dev:server`   | Start only the Express server               |
| `npm run build`        | Build both client and server for production |
| `npm run build:client` | Build only the client                       |
| `npm run build:server` | Build only the server                       |
| `npm run lint`         | Run ESLint on all workspaces                |
| `npm run lint:fix`     | Auto-fix ESLint issues                      |
| `npm run format`       | Format code with Prettier                   |
| `npm start`            | Start production server                     |

## API Endpoints

### POST /api/memes

Generate memes for a category.

**Request:**

```json
{
  "category": "bollywood" // or "cartoon", "viral-songs", "sports"
}
```

**Response:**

```json
{
  "memes": [
    {
      "id": "bollywood-0-1234567890",
      "imageUrl": "https://api.memegen.link/images/drake/...",
      "caption": "Top text · Bottom text"
    }
  ]
}
```

## Tech Stack

### Frontend

- React 19 (Release Candidate)
- TypeScript 5.6
- Vite 5
- ESLint 9 + TypeScript ESLint
- Prettier 3

### Backend

- Express 4
- Node.js 20+ (ES Modules)
- OpenRouter API (free models)
- memegen.link API (free meme templates)

## Code Style

This project uses:

- **ESLint** for linting (with React hooks and TypeScript rules)
- **Prettier** for formatting
- **TypeScript** strict mode enabled

Run `npm run lint` to check for issues and `npm run format` to auto-format.

## Deployment

### Frontend (Vercel/Netlify)

```bash
npm run build:client
```

Deploy the `client/dist` folder.

### Backend (Vercel Functions/Railway/Render)

The server can be deployed as-is to any Node.js hosting platform. For Vercel, use the `api/memes.js` pattern (see memes-core.js comments).

## License

MIT
