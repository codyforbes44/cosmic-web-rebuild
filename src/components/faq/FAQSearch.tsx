
import React from 'react';
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface FAQSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const FAQSearch: React.FC<FAQSearchProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="max-w-2xl mx-auto mb-12">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <Input 
          type="text"
          placeholder="Search for answers..."
          className="pl-10 py-6 bg-space-deep-blue/50 border-gray-700 text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default FAQSearch;
