import { Button } from "@/components/ui/button";
import type { RecentSearch } from "@shared/schema";

interface RecentSearchesProps {
  searches: RecentSearch[];
  onCitySelect: (city: string) => void;
  isLoading: boolean;
}

export default function RecentSearches({ searches, onCitySelect, isLoading }: RecentSearchesProps) {
  if (searches.length === 0) {
    return null;
  }

  return (
    <div className="glass-effect rounded-2xl p-6 shadow-2xl animate-fade-in">
      <h3 className="text-xl font-semibold text-white mb-4">Recent Searches</h3>
      <div className="flex flex-wrap gap-2">
        {searches.map((search) => (
          <Button
            key={search.id}
            variant="ghost"
            onClick={() => onCitySelect(search.city)}
            disabled={isLoading}
            className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-all duration-200 backdrop-blur-sm border-0"
            data-testid={`button-recent-city-${search.id}`}
          >
            {search.city}
          </Button>
        ))}
      </div>
    </div>
  );
}
