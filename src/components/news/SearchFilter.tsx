
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Category {
  value: string;
  label: string;
}

interface SearchFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
  categories: Category[];
}

const SearchFilter = ({ 
  searchQuery, 
  setSearchQuery, 
  activeCategory, 
  setActiveCategory, 
  categories 
}: SearchFilterProps) => {
  return (
    <div className="mb-12">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-3 pl-10 pr-4 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-accent text-white"
          />
        </div>
        <Button
          onClick={() => setSearchQuery("")}
          variant="outline"
          className="border-gray-700 hover:bg-gray-700 text-white"
          disabled={!searchQuery}
        >
          Clear
        </Button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3">
        <button
          className={`px-3 py-1 rounded-full transition-colors text-sm ${
            activeCategory === null
              ? 'bg-accent text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          onClick={() => setActiveCategory(null)}
        >
          All Topics
        </button>
        {categories.map((category) => (
          <button
            key={category.value}
            className={`px-3 py-1 rounded-full transition-colors text-sm ${
              activeCategory === category.value
                ? 'bg-accent text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setActiveCategory(category.value)}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchFilter;
