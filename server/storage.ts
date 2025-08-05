import { type RecentSearch } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getRecentSearches(): Promise<RecentSearch[]>;
  addRecentSearch(city: string): Promise<RecentSearch>;
}

export class MemStorage implements IStorage {
  private recentSearches: Map<string, RecentSearch>;

  constructor() {
    this.recentSearches = new Map();
  }

  async getRecentSearches(): Promise<RecentSearch[]> {
    return Array.from(this.recentSearches.values())
      .sort((a, b) => new Date(b.searchedAt).getTime() - new Date(a.searchedAt).getTime())
      .slice(0, 8);
  }

  async addRecentSearch(city: string): Promise<RecentSearch> {
    // Check if city already exists and remove it to add as most recent
    const existing = Array.from(this.recentSearches.values()).find(
      search => search.city.toLowerCase() === city.toLowerCase()
    );
    if (existing) {
      this.recentSearches.delete(existing.id);
    }

    const id = randomUUID();
    const recentSearch: RecentSearch = {
      id,
      city,
      searchedAt: new Date().toISOString(),
    };
    this.recentSearches.set(id, recentSearch);
    return recentSearch;
  }
}

export const storage = new MemStorage();
