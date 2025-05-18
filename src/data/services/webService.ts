
import { Service } from '@/types/services';
import { TrendingUp, BarChart2, PieChart } from 'lucide-react';

export const webService: Service = {
  id: 'web',
  name: 'Web & Mobile Apps',
  title: 'Web & Mobile Apps',
  subtitle: 'Modern web and mobile application development',
  description: 'Responsive, user-friendly applications for web and mobile platforms with exceptional user experiences.',
  image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  icon: TrendingUp, // Adding icon
  color: '#F59E0B',
  deliverables: 'Progressive web apps, Native mobile apps, Responsive websites',
  duration: '1-6 months',
  process: 'UI/UX Design, Frontend Development, Backend Integration, Testing',
  key_benefit: 'Reach your customers on any device with intuitive, engaging digital experiences',
  benefits: [
    'Engage users with intuitive, responsive interfaces',
    'Consistent experience across all devices and platforms',
    'Performance optimized for conversion and retention',
    'Future-proof technologies with ongoing support'
  ],
  pain_points: [
    'Poor user experience limiting customer engagement',
    'Outdated websites not optimized for mobile devices',
    'Difficulty maintaining consistent brand experience',
    'Need for better digital conversion rates'
  ],
  features: [
    {
      title: 'Responsive Design',
      description: 'Websites that work beautifully on any device',
      icon: BarChart2
    },
    {
      title: 'User Experience',
      description: 'Intuitive interfaces that delight users',
      icon: PieChart
    },
    {
      title: 'Performance',
      description: 'Blazing fast load times and smooth interactions',
      icon: TrendingUp
    }
  ],
  case_study: {
    title: "E-commerce App Redesign",
    client: "Fashion Retailer Inc.",
    description: "We reimagined the client's online shopping experience with a modern, intuitive mobile app and responsive website, dramatically increasing conversions.",
    results: [
      { label: "Conversion Rate", value: "+58%", icon: TrendingUp },
      { label: "Engagement", value: "+125%", icon: BarChart2 },
      { label: "Cart Abandonment", value: "-40%", icon: PieChart }
    ],
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  testimonials: [
    {
      name: "Jennifer Smith",
      position: "Digital Marketing Director, Fashion Retailer Inc.",
      quote: "Our conversion rates have skyrocketed since the app redesign. The seamless shopping experience has transformed our digital business.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      name: "David Wong",
      position: "E-commerce Manager, Online Trends",
      quote: "The mobile-first approach paid off immediately. Our customers love how easily they can browse and purchase on any device.",
      avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ]
};
