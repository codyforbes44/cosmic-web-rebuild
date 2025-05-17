
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FAQAccordion from './FAQAccordion';
import { FAQCategory } from './types';

interface CategoryTabsProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  faqData: Record<string, FAQCategory>;
  navigate: (path: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ 
  activeCategory, 
  setActiveCategory, 
  faqData,
  navigate
}) => {
  return (
    <Tabs defaultValue="services" value={activeCategory} onValueChange={setActiveCategory}>
      <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-8">
        <TabsTrigger value="services">Services</TabsTrigger>
        <TabsTrigger value="process">Process</TabsTrigger>
        <TabsTrigger value="pricing">Pricing</TabsTrigger>
        <TabsTrigger value="technology">Technology</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      
      {Object.entries(faqData).map(([category, questions]) => (
        <TabsContent key={category} value={category} className="space-y-4">
          <FAQAccordion questions={questions} category={category} navigate={navigate} />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default CategoryTabs;
