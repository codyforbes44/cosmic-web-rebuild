
import React, { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

interface TechnologyShowcase {
  title: string;
  date: string;
  explanation: string;
  url: string;
  media_type: string;
}

const TechShowcase: React.FC = () => {
  const [showcase, setShowcase] = useState<TechnologyShowcase | null>(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowcase({
        title: "AI-Powered Business Analytics",
        date: format(date, 'yyyy-MM-dd'),
        explanation: "Our cutting-edge AI business analytics platform transforms raw data into actionable insights. This powerful solution combines machine learning algorithms with intuitive visualization tools to help businesses identify trends, predict market changes, and optimize their operations for maximum efficiency and growth.",
        url: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
        media_type: "image"
      });
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [date]);

  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      setLoading(true);
    }
  };

  return (
    <section className="py-16 bg-space-deep-blue/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Technology Showcase
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Explore our latest innovations and cutting-edge solutions
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent"></div>
            </div>
          ) : showcase ? (
            <div className="bg-space-dark-blue/50 rounded-lg p-8 border border-gray-800">
              <img 
                src={showcase.url} 
                alt={showcase.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <h3 className="text-2xl font-bold mb-4 text-white">{showcase.title}</h3>
              <p className="text-gray-300 mb-6">{showcase.explanation}</p>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="border-gray-600 text-white">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(date, 'PPP')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-space-dark-blue border-gray-700">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default TechShowcase;
