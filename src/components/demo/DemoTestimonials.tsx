
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Quote, TrendingUp, DollarSign, Users } from 'lucide-react';

const DemoTestimonials: React.FC = () => {
  const testimonials = [
    {
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
    },
    {
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
    },
    {
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
    }
  ];

  const companyLogos = [
    { name: 'TechCorp', logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=60&fit=crop' },
    { name: 'Global Retail', logo: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=120&h=60&fit=crop' },
    { name: 'StartupX', logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=60&fit=crop' },
    { name: 'InnovateCo', logo: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=120&h=60&fit=crop' }
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-8">
            See how our clients transformed their businesses with data-driven insights and achieved remarkable results.
          </p>
          
          {/* Company Logos */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12 opacity-60">
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
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card/20 backdrop-blur-sm border-white/10 hover:bg-card/30 transition-all duration-300 relative overflow-hidden">
              <CardContent className="p-6">
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-accent/30 mb-4" />
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-300 mb-6 italic">"{testimonial.quote}"</p>

                {/* Metric Badge */}
                <div className="flex items-center gap-2 mb-4">
                  <testimonial.metrics.icon className="w-4 h-4 text-accent" />
                  <Badge className="bg-accent/20 text-accent border-accent/30">
                    {testimonial.metrics.improvement}
                  </Badge>
                  <span className="text-sm text-gray-400">in {testimonial.metrics.timeframe}</span>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.position}</div>
                    <div className="text-sm text-accent">{testimonial.company}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Results Summary */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-accent/20 to-accent/10 border-accent/30 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Join 500+ Companies Already Succeeding
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">340%</div>
                  <div className="text-sm text-gray-300">Average ROI Increase</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">25hrs</div>
                  <div className="text-sm text-gray-300">Weekly Time Savings</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">90%</div>
                  <div className="text-sm text-gray-300">Client Satisfaction</div>
                </div>
              </div>
              <p className="text-gray-300">
                Don't let your data go to waste. Start making smarter decisions today.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DemoTestimonials;
