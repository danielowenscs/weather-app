import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CloudSun } from "lucide-react";
import SearchForm from "@/components/search-form";
import WeatherCard from "@/components/weather-card";
import WeatherDetails from "@/components/weather-details";
import RecentSearches from "@/components/recent-searches";
import { Card, CardContent } from "@/components/ui/card";
import type { WeatherData, RecentSearch } from "@shared/schema";

export default function WeatherPage() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: recentSearches = [], refetch: refetchRecentSearches } = useQuery<RecentSearch[]>({
    queryKey: ["/api/recent-searches"],
  });

  const handleWeatherSearch = async (city: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch("/api/weather", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ city }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch weather data");
      }

      const data = await response.json();
      setWeatherData(data);
      refetchRecentSearches();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCitySelect = (city: string) => {
    handleWeatherSearch(city);
  };

  const handleRetry = () => {
    if (weatherData?.city) {
      handleWeatherSearch(weatherData.city);
    }
    setError(null);
  };

  return (
    <div className="min-h-screen weather-gradient py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <CloudSun className="h-12 w-12 md:h-16 md:w-16" />
            WeatherNow
          </h1>
          <p className="text-blue-100 text-lg">Get instant weather updates for any city worldwide</p>
        </header>

        {/* Search Section */}
        <div className="glass-effect rounded-2xl p-6 mb-8 shadow-2xl animate-slide-up">
          <SearchForm onSearch={handleWeatherSearch} isLoading={isLoading} />
        </div>

        {/* Loading State */}
        {isLoading && (
          <Card className="mb-6 animate-slide-up">
            <CardContent className="pt-12 pb-12 text-center">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mb-4"></div>
                <p className="text-muted-foreground text-lg">Fetching weather data...</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <Card className="mb-6 border-destructive animate-slide-up">
            <CardContent className="pt-8 pb-8 text-center">
              <div className="flex flex-col items-center">
                <div className="text-destructive text-4xl mb-4">⚠️</div>
                <h3 className="text-xl font-semibold text-destructive mb-2">Unable to fetch weather data</h3>
                <p className="text-destructive/80 mb-4">{error}</p>
                <button 
                  onClick={handleRetry}
                  className="bg-destructive text-destructive-foreground px-6 py-2 rounded-lg hover:bg-destructive/90 transition-colors duration-200"
                  data-testid="button-retry"
                >
                  Try Again
                </button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Weather Display */}
        {weatherData && !isLoading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <WeatherCard weatherData={weatherData} />
            </div>
            <div>
              <WeatherDetails weatherData={weatherData} />
            </div>
          </div>
        )}

        {/* Recent Searches */}
        <RecentSearches 
          searches={recentSearches} 
          onCitySelect={handleCitySelect}
          isLoading={isLoading}
        />

        {/* Footer */}
        <footer className="text-center mt-8 text-blue-100">
          <p className="mb-2">Powered by OpenWeatherMap API</p>
          <p className="text-sm opacity-75">Weather data updated every 10 minutes</p>
        </footer>
      </div>
    </div>
  );
}
