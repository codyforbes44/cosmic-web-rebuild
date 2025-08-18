import { useState, useEffect, useMemo, useCallback } from 'react';

export interface SearchFilters {
  query: string;
  category?: string;
  tags?: string[];
  dateRange?: {
    start?: Date;
    end?: Date;
  };
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  status?: string;
  [key: string]: any;
}

export interface SearchableItem {
  id: string;
  title: string;
  content?: string;
  category?: string;
  tags?: string[];
  date?: Date;
  status?: string;
  [key: string]: any;
}

export interface UseAdvancedSearchOptions {
  items: SearchableItem[];
  searchFields?: string[];
  fuzzyThreshold?: number;
  debounceMs?: number;
}

export function useAdvancedSearch({
  items,
  searchFields = ['title', 'content'],
  fuzzyThreshold = 0.6,
  debounceMs = 300
}: UseAdvancedSearchOptions) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    sortBy: 'date',
    sortOrder: 'desc'
  });
  const [debouncedQuery, setDebouncedQuery] = useState(filters.query);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(filters.query);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [filters.query, debounceMs]);

  // Simple fuzzy search implementation
  const fuzzyMatch = useCallback((text: string, query: string): number => {
    if (!query) return 1;
    if (!text) return 0;

    const textLower = text.toLowerCase();
    const queryLower = query.toLowerCase();

    // Exact match
    if (textLower.includes(queryLower)) return 1;

    // Character by character fuzzy matching
    let textIndex = 0;
    let queryIndex = 0;
    let matches = 0;

    while (textIndex < textLower.length && queryIndex < queryLower.length) {
      if (textLower[textIndex] === queryLower[queryIndex]) {
        matches++;
        queryIndex++;
      }
      textIndex++;
    }

    return matches / queryLower.length;
  }, []);

  // Filter and search logic
  const filteredItems = useMemo(() => {
    let result = [...items];

    // Text search with fuzzy matching
    if (debouncedQuery) {
      result = result.filter(item => {
        const searchScore = Math.max(
          ...searchFields.map(field => {
            const value = item[field];
            if (typeof value === 'string') {
              return fuzzyMatch(value, debouncedQuery);
            }
            return 0;
          })
        );
        return searchScore >= fuzzyThreshold;
      });

      // Sort by relevance when searching
      result.sort((a, b) => {
        const scoreA = Math.max(
          ...searchFields.map(field => fuzzyMatch(a[field] || '', debouncedQuery))
        );
        const scoreB = Math.max(
          ...searchFields.map(field => fuzzyMatch(b[field] || '', debouncedQuery))
        );
        return scoreB - scoreA;
      });
    }

    // Category filter
    if (filters.category) {
      result = result.filter(item => item.category === filters.category);
    }

    // Tags filter
    if (filters.tags && filters.tags.length > 0) {
      result = result.filter(item =>
        item.tags?.some(tag => filters.tags!.includes(tag))
      );
    }

    // Date range filter
    if (filters.dateRange) {
      result = result.filter(item => {
        if (!item.date) return true;
        const itemDate = new Date(item.date);
        const { start, end } = filters.dateRange!;
        
        if (start && itemDate < start) return false;
        if (end && itemDate > end) return false;
        return true;
      });
    }

    // Status filter
    if (filters.status) {
      result = result.filter(item => item.status === filters.status);
    }

    // Sorting (when not searching by relevance)
    if (!debouncedQuery && filters.sortBy) {
      result.sort((a, b) => {
        const aVal = a[filters.sortBy!];
        const bVal = b[filters.sortBy!];
        
        let comparison = 0;
        if (aVal < bVal) comparison = -1;
        if (aVal > bVal) comparison = 1;
        
        return filters.sortOrder === 'desc' ? -comparison : comparison;
      });
    }

    return result;
  }, [items, debouncedQuery, filters, searchFields, fuzzyThreshold, fuzzyMatch]);

  // Update filters
  const updateFilters = useCallback((newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Clear filters
  const clearFilters = useCallback(() => {
    setFilters({
      query: '',
      sortBy: 'date',
      sortOrder: 'desc'
    });
  }, []);

  // Get unique values for filter options
  const getFilterOptions = useCallback(() => {
    const categories = [...new Set(items.map(item => item.category).filter(Boolean))];
    const tags = [...new Set(items.flatMap(item => item.tags || []))];
    const statuses = [...new Set(items.map(item => item.status).filter(Boolean))];

    return { categories, tags, statuses };
  }, [items]);

  return {
    filters,
    filteredItems,
    updateFilters,
    clearFilters,
    getFilterOptions,
    resultCount: filteredItems.length,
    totalCount: items.length,
    isSearching: !!debouncedQuery
  };
}

// Hook for saved searches
export function useSavedSearches() {
  const [savedSearches, setSavedSearches] = useState<
    Array<{ id: string; name: string; filters: SearchFilters }>
  >([]);

  useEffect(() => {
    const saved = localStorage.getItem('savedSearches');
    if (saved) {
      setSavedSearches(JSON.parse(saved));
    }
  }, []);

  const saveSearch = useCallback((name: string, filters: SearchFilters) => {
    const newSearch = {
      id: Date.now().toString(),
      name,
      filters
    };
    const updated = [...savedSearches, newSearch];
    setSavedSearches(updated);
    localStorage.setItem('savedSearches', JSON.stringify(updated));
  }, [savedSearches]);

  const deleteSearch = useCallback((id: string) => {
    const updated = savedSearches.filter(search => search.id !== id);
    setSavedSearches(updated);
    localStorage.setItem('savedSearches', JSON.stringify(updated));
  }, [savedSearches]);

  return { savedSearches, saveSearch, deleteSearch };
}