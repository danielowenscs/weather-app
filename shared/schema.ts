import { z } from "zod";

export const dailyForecastSchema = z.object({
  date: z.string(),
  dayName: z.string(),
  tempHigh: z.number(),
  tempLow: z.number(),
  description: z.string(),
  icon: z.string(),
  humidity: z.number(),
  windSpeed: z.number(),
  uvIndex: z.number(),
});

export const weatherDataSchema = z.object({
  city: z.string(),
  country: z.string(),
  temperature: z.number(),
  feelsLike: z.number(),
  description: z.string(),
  humidity: z.number(),
  windSpeed: z.number(),
  visibility: z.number(),
  pressure: z.number(),
  uvIndex: z.number(),
  icon: z.string(),
  lastUpdated: z.string(),
  forecast: z.array(dailyForecastSchema),
});

export const searchRequestSchema = z.object({
  city: z.string().min(1, "City name is required"),
});

export const recentSearchSchema = z.object({
  id: z.string(),
  city: z.string(),
  searchedAt: z.string(),
});

export type WeatherData = z.infer<typeof weatherDataSchema>;
export type DailyForecast = z.infer<typeof dailyForecastSchema>;
export type SearchRequest = z.infer<typeof searchRequestSchema>;
export type RecentSearch = z.infer<typeof recentSearchSchema>;
