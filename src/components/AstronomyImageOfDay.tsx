
import { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

interface APOD {
  title: string;
  date: string;
  explanation: string;
  url: string;
  media_type: string;
}

const AstronomyImageOfDay = () => {
  const [apod, setApod] = useState<APOD | null>(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<Date>(new Date());

  // For demo purposes, we'll use a fixed APOD rather than making a real API call
  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setApod({
        title: "Pillars of Creation (2023)",
        date: format(date, 'yyyy-MM-dd'),
        explanation: "The Pillars of Creation are a stellar nursery located within the Eagle Nebula, approximately 6,500-7,000 light-years from Earth. This striking image captures towering structures of gas and dust that are in the process of creating new stars. First captured by the Hubble Space Telescope in 1995, this updated image provides unprecedented clarity of this cosmic wonder, showing intricate details of the ongoing star formation process.",
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
          <h2 className="section-heading">Astronomy Picture of the Day</h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Explore cosmic wonders captured in stunning detail, with a new celestial image featured each day
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
                <h3 className="text-2xl font-bold mb-4 text-white">{apod?.title}</h3>
                <p className="text-gray-300 mb-6">{apod?.explanation}</p>
                <p className="text-sm text-gray-400">Date: {apod?.date}</p>
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
                src={apod?.url} 
                alt={apod?.title} 
                className="w-full h-96 object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AstronomyImageOfDay;
