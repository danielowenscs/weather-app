# WeatherNow - Real-Time Weather Application

A modern, responsive weather application that provides real-time weather information for cities worldwide.

## Features

- 🌤️ **Real-time Weather Data** - Get current weather conditions for any city
- 📍 **City Search** - Search for weather by city name with instant results
- 📊 **Detailed Metrics** - Temperature, humidity, wind speed, visibility, pressure, and UV index
- 🕒 **Recent Searches** - Quick access to previously searched cities
- 📱 **Responsive Design** - Works perfectly on desktop and mobile devices
- 🎨 **Modern UI** - Clean, intuitive interface with gradient backgrounds

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **TanStack Query** for data fetching
- **Wouter** for routing
- **Vite** for build tooling

### Backend
- **Express.js** with TypeScript
- **Zod** for schema validation
- **OpenWeatherMap API** for weather data
- In-memory storage for recent searches

## Getting Started

### Prerequisites
- Node.js 18 or higher
- OpenWeatherMap API key

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd weather-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create your OpenWeatherMap API key at [openweathermap.org](https://openweathermap.org/api) and add it to your environment:
```
OPENWEATHER_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5000`

## API Endpoints

- `POST /api/weather` - Get weather data for a city
- `GET /api/recent-searches` - Get recent search history

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utilities and configurations
├── server/                 # Backend Express server
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   └── storage.ts         # Data storage layer
├── shared/                # Shared TypeScript schemas
└── components.json        # shadcn/ui configuration
```

## Deployment

This application is designed to run on Replit and can be easily deployed using Replit's deployment features.

## License

MIT License - feel free to use this project for learning and development.