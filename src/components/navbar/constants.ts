import { Menu, Files, Home, BarChartHorizontalBig } from 'lucide-react';

export type NavLink = {
  name: string;
  path: string;
  icon?: any;
  disabled?: boolean;
};

export const navLinks: NavLink[] = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'News', path: '/news', icon: Menu },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Analytics', path: '/analytics', icon: BarChartHorizontalBig, disabled: true },
];

export const serviceCategories = [
  {
    title: 'Custom Software Development',
    href: '/services#custom-software',
    color: '#06B6D4', // teal
  },
  {
    title: 'Data Analytics',
    href: '/services#data-analytics',
    color: '#F59E0B', // amber
  },
  {
    title: 'Cloud Solutions',
    href: '/services#cloud-solutions',
    color: '#8B5CF6', // violet
  },
  {
    title: 'IT Consulting',
    href: '/services#it-consulting',
    color: '#EC4899', // pink
  },
  {
    title: 'Managed Services',
    href: '/services#managed-services',
    color: '#10B981', // emerald
  },
  {
    title: 'Cybersecurity',
    href: '/services#cybersecurity',
    color: '#EF4444', // red
  },
];
