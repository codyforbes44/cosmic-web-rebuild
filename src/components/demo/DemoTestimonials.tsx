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
  return;
};
export default DemoTestimonials;