
import { Service } from '@/types/services';
import { TrendingUp, BarChart2, PieChart } from 'lucide-react';

export const analyticsService: Service = {
  id: 'analytics',
  name: 'Data Analytics',
  title: 'Data Analytics',
  subtitle: 'Advanced data analytics and visualization solutions',
  description: 'Transform your data into actionable insights with advanced analytics and visualization solutions.',
  image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  icon: BarChart2, // Adding icon
  color: '#059669',
  deliverables: 'Dashboards, Reports, Data models, KPI tracking',
  duration: '1-3 months',
  process: 'Data Assessment, Platform Setup, Dashboard Creation, Training',
  key_benefit: 'Make data-driven decisions with real-time insights into your business operations',
  benefits: [
    'Visualize complex data through intuitive dashboards',
    'Track key performance indicators in real-time',
    'Uncover hidden insights to drive strategic decisions',
    'Predict trends and identify opportunities with advanced analytics'
  ],
  pain_points: [
    'Scattered data making insights difficult to obtain',
    'Inability to track business performance effectively',
    'Time wasted manually creating reports',
    'Decision making based on incomplete information'
  ],
  features: [
    {
      title: 'Interactive Dashboards',
      description: 'Customizable views of your most important metrics',
      icon: BarChart2
    },
    {
      title: 'Predictive Analytics',
      description: 'Forecast future trends based on historical data',
      icon: TrendingUp
    },
    {
      title: 'Data Visualization',
      description: 'Complex insights presented in easy-to-understand formats',
      icon: PieChart
    }
  ],
  case_study: {
    title: "Retail Analytics Dashboard",
    client: "National Retail Chain",
    description: "We developed an integrated analytics platform that provided real-time insights across 200+ locations, enabling data-driven inventory and staffing decisions.",
    results: [
      { label: "Inventory Cost", value: "-23%", icon: TrendingUp },
      { label: "Stock Outs", value: "-68%", icon: BarChart2 },
      { label: "Sales Increase", value: "+12%", icon: PieChart }
    ],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  testimonials: [
    {
      name: "Karen Martinez",
      position: "Retail Operations Director, National Retail Chain",
      quote: "The analytics dashboard has revolutionized our inventory management. We've reduced costs while improving product availability.",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      name: "Jason Taylor",
      position: "Regional Manager, Retail Excellence",
      quote: "Having real-time data at our fingertips has transformed how we make decisions. We can now respond to market changes immediately.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ]
};
