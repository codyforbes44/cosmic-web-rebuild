
import React, { createContext, useContext, useState } from 'react';
import { BusinessArticle } from '@/types/news';
import { businessArticles, categories } from '@/data/newsData';

interface NewsContextType {
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedArticle: BusinessArticle | null;
  setSelectedArticle: (article: BusinessArticle | null) => void;
  filteredArticles: BusinessArticle[];
  categories: { value: string; label: string }[];
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
};

interface NewsProviderProps {
  children: React.ReactNode;
}

export const NewsProvider: React.FC<NewsProviderProps> = ({ children }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<BusinessArticle | null>(null);

  const filteredArticles = businessArticles.filter(article => {
    const categoryMatch = activeCategory ? article.category === activeCategory : true;
    const searchMatch = searchQuery 
      ? article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    return categoryMatch && searchMatch;
  });

  const value = {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    selectedArticle,
    setSelectedArticle,
    filteredArticles,
    categories,
  };

  return (
    <NewsContext.Provider value={value}>
      {children}
    </NewsContext.Provider>
  );
};
