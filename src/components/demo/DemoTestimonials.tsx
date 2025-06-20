
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Quote, TrendingUp, DollarSign, Users } from 'lucide-react';

const DemoTestimonials: React.FC = () => {
  const testimonials = [{
    name: 'Sarah Johnson',
    position: 'VP of Analytics',
    company: 'TechCorp Solutions',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616c364f3b6?w=150&h=150&fit=crop&crop=face',
    quote: 'This platform transformed how we make data-driven decisions. The real-time insights helped us increase revenue by 45% in just 6 months.',
    metrics: {
      improvement: '45% Revenue Growth',
      timeframe: '6 months',
      icon: DollarSign
    },
    rating: 5
  }, {
    name: 'Michael Chen',
    position: 'Chief Data Officer',
    company: 'Global Retail Inc',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    quote: 'The intuitive dashboards and automated reporting saved our team 20 hours per week. Now we focus on strategy instead of data preparation.',
    metrics: {
      improvement: '20 hrs/week saved',
      timeframe: 'Immediately',
      icon: TrendingUp
    },
    rating: 5
  }, {
    name: 'Emily Rodriguez',
    position: 'Marketing Director',
    company: 'StartupX',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    quote: 'The customer segmentation features helped us identify our most valuable prospects. Our conversion rate improved by 280%!',
    metrics: {
      improvement: '280% Conversion',
      timeframe: '3 months',
      icon: Users
    },
    rating: 5
  }];

  const companyLogos = [{
    name: 'TechCorp',
    logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=60&fit=crop'
  }, {
    name: 'Global Retail',
    logo: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=120&h=60&fit=crop'
  }, {
    name: 'StartupX',
    logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=60&fit=crop'
  }, {
    name: 'InnovateCo',
    logo: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=120&h=60&fit=crop'
  }];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            See how our analytics platform has transformed businesses across industries with measurable results.
          </p>
        </div>

        {/* Company Logos */}
        <div className="flex flex-wrap justify-center items-center gap-8 mb-16 opacity-60">
          {companyLogos.map((company, index) => (
            <div key={index} className="grayscale hover:grayscale-0 transition-all duration-300">
              <img 
                src={company.logo} 
                alt={company.name}
                className="h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card/20 backdrop-blur-sm border-white/10 hover:bg-card/30 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.position}</p>
                    <p className="text-gray-500 text-xs">{testimonial.company}</p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                <Quote className="w-6 h-6 text-accent mb-3" />
                <p className="text-gray-300 mb-4 italic">"{testimonial.quote}"</p>

                <div className="bg-accent/10 rounded-lg p-3 border border-accent/20">
                  <div className="flex items-center gap-2 mb-1">
                    <testimonial.metrics.icon className="w-4 h-4 text-accent" />
                    <span className="text-accent font-semibold text-sm">
                      {testimonial.metrics.improvement}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs">
                    Achieved in {testimonial.metrics.timeframe}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DemoTestimonials;
