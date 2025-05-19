
import { useState, useEffect } from 'react';
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

const TechnologyShowcase = () => {
  const [showcase, setShowcase] = useState<TechnologyShowcase | null>(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<Date>(new Date());

  // For demo purposes, we'll use a fixed showcase rather than making a real API call
  useEffect(() => {
    // Simulate API fetch delay
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
    <section className="py-24 bg-space-deep-blue">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-heading">Technology Showcase</h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Explore our innovative technology solutions designed to transform your business operations and drive growth
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-card p-6 overflow-hidden rounded-xl order-2 lg:order-1">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Select Date</h3>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-gray-700 bg-gray-800 hover:bg-gray-700 text-white"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(date, 'PPP')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    initialFocus
                    disabled={(date) => date > new Date()}
                    className="bg-gray-800 text-white"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-4 text-white">{showcase?.title}</h3>
                <p className="text-gray-300 mb-6">{showcase?.explanation}</p>
                <p className="text-sm text-gray-400">Date: {showcase?.date}</p>
              </>
            )}
          </div>

          <div className="space-card overflow-hidden rounded-xl order-1 lg:order-2">
            {loading ? (
              <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
              </div>
            ) : (
              <img 
                src={showcase?.url} 
                alt={showcase?.title} 
                className="w-full h-96 object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyShowcase;
