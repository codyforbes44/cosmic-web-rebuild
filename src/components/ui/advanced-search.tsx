import * as React from "react";
import { Search, X, Filter, Save, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "./input";
import { Button } from "./button";
import { InteractiveButton } from "./interactive-button";
import { Badge } from "./badge";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Label } from "./label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { useAdvancedSearch, SearchFilters } from "@/hooks/use-advanced-search";

interface AdvancedSearchProps {
  placeholder?: string;
  filters: SearchFilters;
  onFiltersChange: (filters: Partial<SearchFilters>) => void;
  onClear?: () => void;
  filterOptions?: {
    categories?: string[];
    tags?: string[];
    statuses?: string[];
  };
  showSaveSearch?: boolean;
  onSaveSearch?: (name: string) => void;
  savedSearches?: Array<{ id: string; name: string; filters: SearchFilters }>;
  onLoadSearch?: (filters: SearchFilters) => void;
  className?: string;
}

export const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  placeholder = "Search...",
  filters,
  onFiltersChange,
  onClear,
  filterOptions = {},
  showSaveSearch = false,
  onSaveSearch,
  savedSearches = [],
  onLoadSearch,
  className
}) => {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [saveSearchName, setSaveSearchName] = React.useState("");

  const hasActiveFilters = React.useMemo(() => {
    return filters.category || 
           (filters.tags && filters.tags.length > 0) || 
           filters.status ||
           (filters.dateRange && (filters.dateRange.start || filters.dateRange.end));
  }, [filters]);

  const handleSaveSearch = () => {
    if (saveSearchName.trim() && onSaveSearch) {
      onSaveSearch(saveSearchName.trim());
      setSaveSearchName("");
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Main Search Bar */}
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder={placeholder}
            value={filters.query || ""}
            onChange={(e) => onFiltersChange({ query: e.target.value })}
            className="pl-10 pr-10"
          />
          {filters.query && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 p-0"
              onClick={() => onFiltersChange({ query: "" })}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>

        {/* Filter Toggle */}
        <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <PopoverTrigger asChild>
            <InteractiveButton
              variant={hasActiveFilters ? "default" : "outline"}
              size="default"
              leftIcon={<Filter className="h-4 w-4" />}
            >
              Filter
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
                  {Object.values(filters).filter(v => 
                    v && (Array.isArray(v) ? v.length > 0 : true)
                  ).length - 1}
                </Badge>
              )}
            </InteractiveButton>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4" align="end">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Filters</h4>
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={onClear}>
                    Clear all
                  </Button>
                )}
              </div>

              {/* Category Filter */}
              {filterOptions.categories && filterOptions.categories.length > 0 && (
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={filters.category || ""}
                    onValueChange={(value) => 
                      onFiltersChange({ category: value || undefined })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All categories</SelectItem>
                      {filterOptions.categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Status Filter */}
              {filterOptions.statuses && filterOptions.statuses.length > 0 && (
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={filters.status || ""}
                    onValueChange={(value) => 
                      onFiltersChange({ status: value || undefined })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All statuses</SelectItem>
                      {filterOptions.statuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Sort Options */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label>Sort by</Label>
                  <Select
                    value={filters.sortBy || "date"}
                    onValueChange={(value) => onFiltersChange({ sortBy: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="title">Title</SelectItem>
                      <SelectItem value="category">Category</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Order</Label>
                  <Select
                    value={filters.sortOrder || "desc"}
                    onValueChange={(value) => 
                      onFiltersChange({ sortOrder: value as "asc" | "desc" })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="desc">Newest first</SelectItem>
                      <SelectItem value="asc">Oldest first</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Save Search */}
        {showSaveSearch && (
          <Popover>
            <PopoverTrigger asChild>
              <InteractiveButton
                variant="outline"
                size="default"
                leftIcon={<Save className="h-4 w-4" />}
              >
                Save
              </InteractiveButton>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-4" align="end">
              <div className="space-y-3">
                <Label>Save current search</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Search name..."
                    value={saveSearchName}
                    onChange={(e) => setSaveSearchName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSaveSearch()}
                  />
                  <Button
                    size="sm"
                    onClick={handleSaveSearch}
                    disabled={!saveSearchName.trim()}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.category && (
            <Badge variant="secondary" className="gap-1">
              Category: {filters.category}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => onFiltersChange({ category: undefined })}
              />
            </Badge>
          )}
          {filters.status && (
            <Badge variant="secondary" className="gap-1">
              Status: {filters.status}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => onFiltersChange({ status: undefined })}
              />
            </Badge>
          )}
          {filters.tags && filters.tags.length > 0 && filters.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="gap-1">
              {tag}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => onFiltersChange({
                  tags: filters.tags?.filter(t => t !== tag)
                })}
              />
            </Badge>
          ))}
        </div>
      )}

      {/* Saved Searches */}
      {savedSearches.length > 0 && (
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Saved searches</Label>
          <div className="flex flex-wrap gap-2">
            {savedSearches.map((search) => (
              <Button
                key={search.id}
                variant="ghost"
                size="sm"
                onClick={() => onLoadSearch?.(search.filters)}
                className="h-7 text-xs gap-2"
              >
                <Clock className="h-3 w-3" />
                {search.name}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};