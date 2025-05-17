
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const PopularSolutions: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="max-w-4xl mx-auto mt-16">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">Popular Solutions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Collapsible className="space-card p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-white">Digital Transformation</h3>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="p-0 hover:bg-transparent">
                <Search className="h-4 w-4 text-accent" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="mt-4">
            <p className="text-gray-300 mb-4">
              <strong className="text-accent">93% of companies</strong> report increased operational efficiency 
              after implementing our digital transformation solutions.
            </p>
            <Button 
              variant="link" 
              className="text-accent p-0 h-auto"
              onClick={() => navigate('/services')}
            >
              Learn about our digital transformation services →
            </Button>
          </CollapsibleContent>
        </Collapsible>
        
        <Collapsible className="space-card p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-white">AI & Machine Learning</h3>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="p-0 hover:bg-transparent">
                <Search className="h-4 w-4 text-accent" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="mt-4">
            <p className="text-gray-300 mb-4">
              Our AI solutions deliver <strong className="text-accent">40% average cost reduction</strong> in 
              data processing while improving accuracy by 35%.
            </p>
            <Button 
              variant="link" 
              className="text-accent p-0 h-auto"
              onClick={() => navigate('/services')}
            >
              Discover our AI & ML capabilities →
            </Button>
          </CollapsibleContent>
        </Collapsible>
        
        <Collapsible className="space-card p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-white">Cloud Migration</h3>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="p-0 hover:bg-transparent">
                <Search className="h-4 w-4 text-accent" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="mt-4">
            <p className="text-gray-300 mb-4">
              Clients report <strong className="text-accent">67% reduction in infrastructure costs</strong> and 
              99.9% uptime after our cloud migration services.
            </p>
            <Button 
              variant="link" 
              className="text-accent p-0 h-auto"
              onClick={() => navigate('/services')}
            >
              Explore our cloud migration services →
            </Button>
          </CollapsibleContent>
        </Collapsible>
        
        <Collapsible className="space-card p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-white">Data Analytics</h3>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="p-0 hover:bg-transparent">
                <Search className="h-4 w-4 text-accent" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="mt-4">
            <p className="text-gray-300 mb-4">
              Our data analytics clients see <strong className="text-accent">28% increase in revenue</strong> through 
              data-driven decision making and predictive insights.
            </p>
            <Button 
              variant="link" 
              className="text-accent p-0 h-auto"
              onClick={() => navigate('/services')}
            >
              Learn about our data analytics services →
            </Button>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default PopularSolutions;
