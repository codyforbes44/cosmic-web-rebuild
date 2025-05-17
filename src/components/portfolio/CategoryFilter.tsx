
import React from "react";

interface Category {
  id: string;
  name: string;
}

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const CategoryFilter = ({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-16">
      {categories.map((category) => (
        <button
          key={category.id}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeCategory === category.id
              ? 'bg-accent text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          onClick={() => onCategoryChange(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
