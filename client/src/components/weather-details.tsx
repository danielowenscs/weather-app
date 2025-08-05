import { Card, CardContent } from "@/components/ui/card";
import { Eye, Droplets, Wind, Thermometer, Sun } from "lucide-react";
import type { WeatherData } from "@shared/schema";

interface WeatherDetailsProps {
  weatherData: WeatherData;
}

const getUVIndexLevel = (uvIndex: number) => {
  if (uvIndex <= 2) return "Low";
  if (uvIndex <= 5) return "Moderate";
  if (uvIndex <= 7) return "High";
  if (uvIndex <= 10) return "Very High";
  return "Extreme";
};

export default function WeatherDetails({ weatherData }: WeatherDetailsProps) {
  const weatherMetrics = [
    {
      icon: Eye,
      label: "Visibility",
      value: `${weatherData.visibility} mi`,
      testId: "text-visibility"
    },
    {
      icon: Droplets,
      label: "Humidity",
      value: `${weatherData.humidity}%`,
      testId: "text-humidity"
    },
    {
      icon: Wind,
      label: "Wind Speed",
      value: `${weatherData.windSpeed} mph`,
      testId: "text-wind-speed"
    },
    {
      icon: Thermometer,
      label: "Pressure",
      value: `${weatherData.pressure} in`,
      testId: "text-pressure"
    },
    {
      icon: Sun,
      label: "UV Index",
      value: `${weatherData.uvIndex} (${getUVIndexLevel(weatherData.uvIndex)})`,
      testId: "text-uv-index"
    }
  ];

  return (
    <Card className="shadow-2xl animate-fade-in">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-6">Weather Details</h3>
        <div className="space-y-4">
          {weatherMetrics.map((metric) => (
            <div key={metric.label} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center">
                <metric.icon className="h-5 w-5 text-primary mr-3" />
                <span className="text-muted-foreground">{metric.label}</span>
              </div>
              <span className="font-semibold text-foreground" data-testid={metric.testId}>
                {metric.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
