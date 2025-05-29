
import React from 'react';
import { BarChart } from 'lucide-react';

interface CaseStudyContentProps {
  challenge: string;
  solution: string;
  images: string[];
  results: {
    text: string;
    stats: Array<{
      value: string;
      label: string;
    }>;
  };
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
}

const CaseStudyContent: React.FC<CaseStudyContentProps> = ({
  challenge,
  solution,
  images,
  results,
  testimonial
}) => {
  return (
    <div className="lg:col-span-2">
      {/* Challenge Section */}
      <section className="space-card p-8 rounded-xl mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">The Challenge</h2>
        <p className="text-gray-300">{challenge}</p>
      </section>
      
      {/* Solution Section */}
      <section className="space-card p-8 rounded-xl mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Our Solution</h2>
        <p className="text-gray-300 mb-6">{solution}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {images.map((image, index) => (
            <div key={index} className="rounded-lg overflow-hidden">
              <img 
                src={image} 
                alt={`Solution image ${index + 1}`}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </section>
      
      {/* Results Section */}
      <section className="space-card p-8 rounded-xl mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">
          <div className="flex items-center">
            <BarChart className="mr-2" />
            <span>Results & Impact</span>
          </div>
        </h2>
        <p className="text-gray-300 mb-6">{results.text}</p>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          {results.stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-accent/10 p-4 rounded-lg text-center border border-accent/20"
            >
              <div className="text-accent text-2xl md:text-3xl font-bold">
                {stat.value}
              </div>
              <div className="text-gray-300 text-sm mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Testimonial Section */}
      {testimonial && (
        <section className="space-card p-8 rounded-xl mb-8">
          <div className="flex flex-col items-center text-center">
            <div className="text-accent text-6xl font-serif mb-4">"</div>
            <p className="text-white text-lg md:text-xl italic mb-6">
              {testimonial.quote}
            </p>
            <div className="flex flex-col items-center">
              <p className="font-medium text-white">
                {testimonial.author}
              </p>
              <p className="text-gray-400">
                {testimonial.position}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default CaseStudyContent;
