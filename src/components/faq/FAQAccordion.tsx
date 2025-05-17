
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { FAQItem } from './types';

interface FAQAccordionProps {
  questions: FAQItem[];
  category: string;
  navigate?: (path: string) => void;
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ questions, category, navigate }) => {
  const defaultNavigate = useNavigate();
  const navigationFunction = navigate || defaultNavigate;
  
  return (
    <Accordion type="single" collapsible className="space-y-4">
      {questions.map((item, index) => (
        <AccordionItem 
          key={index} 
          value={`${category}-${index}`}
          className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800/30"
        >
          <AccordionTrigger className="px-4 py-3 text-white hover:text-accent text-left">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 text-gray-300">
            <p>{item.answer}</p>
            {category === 'services' && index === 0 && (
              <Button 
                variant="link" 
                className="text-accent p-0 mt-2 h-auto"
                onClick={() => navigationFunction('/services')}
              >
                View our full services catalog →
              </Button>
            )}
            {category === 'pricing' && index === 1 && (
              <Button 
                variant="link" 
                className="text-accent p-0 mt-2 h-auto"
                onClick={() => navigationFunction('/packages')}
              >
                Browse our startup packages →
              </Button>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FAQAccordion;
