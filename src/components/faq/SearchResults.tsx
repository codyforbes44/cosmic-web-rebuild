
import React from 'react';
import { Button } from "@/components/ui/button";
import FAQAccordion from './FAQAccordion';
import { FAQCategory } from './types';

interface SearchResultsProps {
  searchQuery: string;
  filteredFAQs: Record<string, FAQCategory>;
  setSearchQuery: (query: string) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ 
  searchQuery, 
  filteredFAQs, 
  setSearchQuery 
}) => {
  const hasResults = Object.values(filteredFAQs).some(questions => questions.length > 0);
  
  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-white">Search Results</h2>
      {hasResults ? (
        Object.entries(filteredFAQs).map(([category, questions]) => (
          <div key={category} className="mb-8">
            <h3 className="text-xl font-semibold text-accent capitalize mb-4">{category}</h3>
            <FAQAccordion questions={questions} category={category} />
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-300 mb-4">No results found for "{searchQuery}"</p>
          <Button 
            variant="outline" 
            onClick={() => setSearchQuery('')}
            className="border-accent text-accent hover:bg-accent hover:text-white"
          >
            Clear Search
          </Button>
        </div>
      )}
    </>
  );
};

export default SearchResults;
