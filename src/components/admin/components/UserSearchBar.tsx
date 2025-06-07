
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface UserSearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const UserSearchBar: React.FC<UserSearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        placeholder="Search users by email or name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10 bg-gray-800 border-gray-600 text-white focus:ring-2 focus:ring-accent"
      />
    </div>
  );
};
