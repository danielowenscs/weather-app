import { Card, CardContent } from "@/components/ui/card";
import type { WeatherData } from "@shared/schema";

interface WeatherCardProps {
  weatherData: WeatherData;
}

const getWeatherIcon = (iconCode: string) => {
  const iconMap: Record<string, string> = {
    "01d": "☀️", // clear sky day
    "01n": "🌙", // clear sky night
    "02d": "⛅", // few clouds day
    "02n": "☁️", // few clouds night
    "03d": "☁️", // scattered clouds
    "03n": "☁️",
    "04d": "☁️", // broken clouds
    "04n": "☁️",
    "09d": "🌧️", // shower rain
    "09n": "🌧️",
    "10d": "🌦️", // rain day
    "10n": "🌧️", // rain night
    "11d": "⛈️", // thunderstorm
    "11n": "⛈️",
    "13d": "❄️", // snow
    "13n": "❄️",
    "50d": "🌫️", // mist
    "50n": "🌫️",
  };
  return iconMap[iconCode] || "☀️";
};

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

const getTimeSinceUpdate = (isoString: string) => {
  const now = new Date();
  const updated = new Date(isoString);
  const diffMs = now.getTime() - updated.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return "Updated just now";
  if (diffMins === 1) return "Updated 1 minute ago";
  if (diffMins < 60) return `Updated ${diffMins} minutes ago`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours === 1) return "Updated 1 hour ago";
  return `Updated ${diffHours} hours ago`;
};

export default function WeatherCard({ weatherData }: WeatherCardProps) {
  return (
    <Card className="shadow-2xl animate-fade-in">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-3xl font-bold text-foreground mb-2" data-testid="text-current-city">
              {weatherData.city}, {weatherData.country}
            </h2>
            <p className="text-muted-foreground text-lg mb-4" data-testid="text-current-date">
              {formatDate(weatherData.lastUpdated)}
            </p>
            <div className="flex items-center justify-center md:justify-start mb-4">
              <span className="text-6xl md:text-7xl font-light text-foreground mr-4" data-testid="text-temperature">
                {weatherData.temperature}°
              </span>
              <div className="text-right">
                <p className="text-2xl text-muted-foreground capitalize" data-testid="text-weather-description">
                  {weatherData.description}
                </p>
                <p className="text-muted-foreground" data-testid="text-feels-like">
                  Feels like {weatherData.feelsLike}°
                </p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-8xl mb-4" data-testid="text-weather-icon">
              {getWeatherIcon(weatherData.icon)}
            </div>
            <p className="text-muted-foreground font-medium" data-testid="text-last-updated">
              {getTimeSinceUpdate(weatherData.lastUpdated)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
