# Weather Application

## Overview

This is a modern weather application built with React and Express.js that allows users to search for weather information by city name. The application features a clean, responsive interface with real-time weather data, recent search functionality, and detailed weather metrics including temperature, humidity, wind speed, visibility, pressure, and UV index.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: shadcn/ui component library built on Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS for utility-first styling with custom CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript for the REST API server
- **Data Storage**: In-memory storage using a Map-based implementation for recent searches
- **Schema Validation**: Zod for runtime type checking and API request/response validation
- **Development**: Hot reload support with integrated Vite middleware in development mode

### API Design
- **POST /api/weather**: Accepts city name and returns comprehensive weather data
- **GET /api/recent-searches**: Returns user's recent search history (up to 8 items)
- Weather data includes current conditions, feels-like temperature, humidity, wind speed, visibility, pressure, and UV index

### Data Storage Solutions
- **Recent Searches**: In-memory storage with automatic deduplication and chronological ordering
- **Weather Data**: Real-time fetching from external APIs with no local persistence
- **Database Setup**: Drizzle ORM configured for PostgreSQL with migration support (currently unused but prepared for future data persistence needs)

### External Dependencies

#### Weather Data
- **OpenWeatherMap API**: Primary weather data source providing current conditions, coordinates, and basic weather information
- **UV Index API**: OpenWeatherMap's UV Index endpoint for additional health-related weather data

#### UI and Styling
- **Radix UI**: Comprehensive primitive components for accessibility and interaction patterns
- **Tailwind CSS**: Utility-first CSS framework with custom design system variables
- **Lucide React**: Modern icon library for consistent iconography

#### Development and Build Tools
- **Vite**: Build tool and development server with React plugin support
- **esbuild**: Fast JavaScript bundler for production builds
- **TypeScript**: Static type checking across the entire application
- **Drizzle Kit**: Database schema management and migration tools

#### Runtime Dependencies
- **@neondatabase/serverless**: PostgreSQL client for serverless environments
- **date-fns**: Date manipulation and formatting utilities
- **class-variance-authority**: Type-safe variant API for component styling
- **cmdk**: Command palette component for enhanced user interactions

The application follows a clean separation of concerns with shared schema definitions, modular component architecture, and a scalable folder structure that separates client, server, and shared code.