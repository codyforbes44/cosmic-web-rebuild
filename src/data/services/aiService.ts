
import { Service } from '@/types/services';
import { TrendingUp, BarChart2, PieChart } from 'lucide-react';

export const aiService: Service = {
  id: 'ai',
  name: 'AI & Machine Learning',
  description: 'Leverage artificial intelligence and machine learning to optimize operations and gain competitive advantages.',
  image: 'https://images.unsplash.com/photo-1551636898-47668aa61de2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  color: '#8B5CF6',
  deliverables: 'Predictive models, ML algorithms, AI integrations',
  duration: '2-6 months',
  process: 'Data Preparation, Model Development, Validation, Integration',
  key_benefit: 'Automate processes, predict trends, and unlock new opportunities with AI-powered solutions',
  benefits: [
    'Automate complex tasks to improve efficiency',
    'Predict customer behavior and market trends',
    'Enhance decision making with intelligent recommendations',
    'Stay ahead of competition with cutting-edge AI capabilities'
  ],
  pain_points: [
    'Manual processes consuming valuable resources',
    'Difficulty predicting customer needs and market changes',
    'Complex decisions requiring advanced analysis',
    'Competitors gaining advantage through AI adoption'
  ],
  case_study: {
    title: "Predictive Maintenance System",
    client: "Industrial Manufacturing Corp.",
    description: "We implemented an AI-powered predictive maintenance system that analyzed equipment sensor data to forecast failures before they occurred.",
    results: [
      { label: "Downtime", value: "-78%", icon: TrendingUp },
      { label: "Maintenance Cost", value: "-42%", icon: BarChart2 },
      { label: "Equipment Lifespan", value: "+35%", icon: PieChart }
    ]
  },
  testimonials: [
    {
      name: "Frank Miller",
      position: "Operations Manager, Industrial Manufacturing Corp.",
      quote: "The predictive maintenance system has been a game-changer. We've dramatically reduced downtime and extended the life of our equipment.",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      name: "Lisa Patel",
      position: "Chief Innovation Officer, Tech Innovations",
      quote: "The AI models have exceeded our expectations in accuracy. We're now expanding the implementation across our entire production line.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ]
};
