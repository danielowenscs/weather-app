import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DailyForecast } from "@shared/schema";

interface ForecastCardProps {
  forecast: DailyForecast[];
}

const getWeatherIcon = (iconCode: string) => {
  const iconMap: Record<string, string> = {
    "01d": "☀️", "01n": "🌙", "02d": "⛅", "02n": "☁️",
    "03d": "☁️", "03n": "☁️", "04d": "☁️", "04n": "☁️",
    "09d": "🌧️", "09n": "🌧️", "10d": "🌦️", "10n": "🌧️",
    "11d": "⛈️", "11n": "⛈️", "13d": "❄️", "13n": "❄️",
    "50d": "🌫️", "50n": "🌫️",
  };
  return iconMap[iconCode] || "☀️";
};

export default function ForecastCard({ forecast }: ForecastCardProps) {
  if (!forecast || forecast.length === 0) {
    return null;
  }

  return (
    <Card className="shadow-2xl animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground">
          5-Day Forecast
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {forecast.map((day, index) => (
            <div 
              key={day.date} 
              className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
              data-testid={`forecast-day-${index}`}
            >
              <div className="flex items-center space-x-4">
                <div className="text-2xl" data-testid={`forecast-icon-${index}`}>
                  {getWeatherIcon(day.icon)}
                </div>
                <div>
                  <p className="font-medium text-foreground" data-testid={`forecast-day-name-${index}`}>
                    {day.dayName}
                  </p>
                  <p className="text-sm text-muted-foreground capitalize" data-testid={`forecast-description-${index}`}>
                    {day.description}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-semibold text-foreground" data-testid={`forecast-high-${index}`}>
                    {day.tempHigh}°
                  </span>
                  <span className="text-muted-foreground" data-testid={`forecast-low-${index}`}>
                    {day.tempLow}°
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                  <span data-testid={`forecast-humidity-${index}`}>💧 {day.humidity}%</span>
                  <span data-testid={`forecast-wind-${index}`}>💨 {day.windSpeed}mph</span>
                  <span data-testid={`forecast-uv-${index}`}>☀️ {day.uvIndex}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}