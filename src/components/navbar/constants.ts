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
  { name: 'Contact', path: '/contact' },
  { name: 'FAQ', path: '/faq' }
];

// Secure navigation links for authenticated users
export const secureNavLinks: NavLink[] = [
  { name: 'Admin Dashboard', path: '/admin' },
  { name: 'Projects', path: '/projects' },
  { name: 'Analytics', path: '/analytics' },
  { name: 'Weather', path: '/weather' },
  { name: 'Calculator', path: '/calculator' },
  { name: 'OpenAI Chat', path: '/openai' },
  { name: 'HuggingFace AI', path: '/huggingface' },
  { name: 'Features', path: '/features' },
  { name: 'Medical Diagnosis', path: '/medical-diagnosis' }
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
    href: '/services?service=strategy',
    description: 'Develop a winning strategy for your business',
    color: '#ff6b35',
  },
  {
    title: 'Digital Marketing',
    href: '/services?service=digital',
    description: 'Attract and retain customers with targeted campaigns',
    color: '#ff6b35',
  },
  {
    title: 'Custom Development',
    href: '/services?service=custom',
    description: 'Tailor-made software solutions for your unique needs',
    color: '#ff6b35',
  },
  {
    title: 'Web Development',
    href: '/services?service=web',
    description: 'Build a professional website to showcase your brand',
    color: '#ff6b35',
  },
  {
    title: 'Analytics & Tracking',
    href: '/services?service=analytics',
    description: 'Gain insights into your business performance',
    color: '#ff6b35',
  },
  {
    title: 'AI Solutions',
    href: '/services?service=ai',
    description: 'Leverage the power of AI to optimize your operations',
    color: '#ff6b35',
  },
  {
    title: 'Recruitment Marketing',
    href: '/services?service=recruitment',
    description: 'Specialized marketing strategies for recruiting talent',
    color: '#ff6b35',
  },
];
