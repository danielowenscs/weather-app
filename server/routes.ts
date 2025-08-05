import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { searchRequestSchema, weatherDataSchema } from "@shared/schema";
import { z } from "zod";

const API_KEY = process.env.OPENWEATHER_API_KEY || process.env.WEATHER_API_KEY || "";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get weather data for a city
  app.post("/api/weather", async (req, res) => {
    try {
      const { city } = searchRequestSchema.parse(req.body);
      
      if (!API_KEY) {
        return res.status(500).json({ 
          message: "Weather API key not configured. Please set OPENWEATHER_API_KEY environment variable." 
        });
      }

      // Fetch current weather from OpenWeatherMap
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=imperial`
      );

      if (!weatherResponse.ok) {
        if (weatherResponse.status === 404) {
          return res.status(404).json({ message: "City not found. Please check the spelling and try again." });
        }
        throw new Error(`Weather API error: ${weatherResponse.status}`);
      }

      const weatherData = await weatherResponse.json();

      // Fetch UV Index from One Call API
      let uvIndex = 0;
      try {
        const uvResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/uvi?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&appid=${API_KEY}`
        );
        if (uvResponse.ok) {
          const uvData = await uvResponse.json();
          uvIndex = Math.round(uvData.value || 0);
        }
      } catch (error) {
        console.log("UV Index fetch failed, using default value");
      }

      // Transform the data to match our schema
      const transformedData = {
        city: weatherData.name,
        country: weatherData.sys.country,
        temperature: Math.round(weatherData.main.temp),
        feelsLike: Math.round(weatherData.main.feels_like),
        description: weatherData.weather[0].description,
        humidity: weatherData.main.humidity,
        windSpeed: Math.round(weatherData.wind.speed),
        visibility: Math.round(weatherData.visibility / 1609.34), // Convert meters to miles
        pressure: (weatherData.main.pressure * 0.02953).toFixed(2), // Convert hPa to inches
        uvIndex,
        icon: weatherData.weather[0].icon,
        lastUpdated: new Date().toISOString(),
      };

      // Validate the transformed data
      const validatedData = weatherDataSchema.parse(transformedData);

      // Add to recent searches
      await storage.addRecentSearch(`${validatedData.city}, ${validatedData.country}`);

      res.json(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid request data" });
      }
      console.error("Weather API error:", error);
      res.status(500).json({ message: "Failed to fetch weather data. Please try again." });
    }
  });

  // Get recent searches
  app.get("/api/recent-searches", async (req, res) => {
    try {
      const recentSearches = await storage.getRecentSearches();
      res.json(recentSearches);
    } catch (error) {
      console.error("Failed to fetch recent searches:", error);
      res.status(500).json({ message: "Failed to fetch recent searches" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
