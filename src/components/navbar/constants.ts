
import { 
  Home, 
  Briefcase, 
  Package, 
  Users, 
  Newspaper, 
  HelpCircle, 
  Mail 
} from 'lucide-react';

export interface NavLink {
  name: string;
  path: string;
  disabled?: boolean;
}

export const navLinks: NavLink[] = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'News', path: '/news' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Contact', path: '/contact' }
];

export interface ServiceCategory {
  title: string;
  href: string;
  description: string;
  color: string;
}

export const serviceCategories: ServiceCategory[] = [
  {
    title: 'Strategy Consulting',
    href: '/services',
    description: 'Develop a winning strategy for your trucking business',
    color: '#793ef9',
  },
  {
    title: 'Digital Marketing',
    href: '/services',
    description: 'Attract and retain drivers with targeted campaigns',
    color: '#ff6188',
  },
  {
    title: 'Custom Development',
    href: '/services',
    description: 'Tailor-made software solutions for your unique needs',
    color: '#50fa7b',
  },
  {
    title: 'Web Development',
    href: '/services',
    description: 'Build a professional website to showcase your brand',
    color: '#f1fa8c',
  },
  {
    title: 'Analytics & Tracking',
    href: '/services',
    description: 'Gain insights into your business performance',
    color: '#bd93f9',
  },
  {
    title: 'AI Solutions',
    href: '/services',
    description: 'Leverage the power of AI to optimize your operations',
    color: '#ff79c6',
  },
  {
    title: 'Recruitment Marketing',
    href: '/recruitment-marketing',
    description: 'Specialized marketing strategies for driver recruitment',
    color: '#A8FF32',
  },
];

export interface ProductCategory {
  title: string;
  href: string;
  description: string;
  image: string;
  color: string;
}

export const productCategories: ProductCategory[] = [
  {
    title: '3BI Connect',
    href: '/products?product=3bi-connect',
    description: 'The all-in-one platform for managing your trucking business',
    image: '/lovable-uploads/10a43409-3847-4d52-bf9a-80e8508797c3.png',
    color: '#ffb86c',
  },
  {
    title: 'TruckOnboard',
    href: '/products?product=truckonboard',
    description: 'Streamline your driver onboarding process',
    image: '/lovable-uploads/782b1ad6-c071-49e4-abbd-f8022130bdc2.png',
    color: '#8be9fd',
  },
];
