
export interface NavLink {
  name: string;
  path: string;
  disabled?: boolean;
}

export const navLinks: NavLink[] = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'About', path: '/about' },
  { name: 'Partners', path: '/partners' },
  { name: 'News', path: '/news' },
  { name: 'Packages', path: '/packages' },
  { name: 'Contact', path: '/contact' }
];

export const serviceCategories = [
  { title: 'Strategic Consulting', href: '/services?service=strategy', color: '#7C3AED' },
  { title: 'Digital Transformation', href: '/services?service=digital', color: '#2563EB' },
  { title: 'Custom Software', href: '/services?service=custom', color: '#E11D48' },
  { title: 'Web & Mobile Apps', href: '/services?service=web', color: '#F59E0B' },
  { title: 'Data Analytics', href: '/services?service=analytics', color: '#059669' },
  { title: 'AI & Machine Learning', href: '/services?service=ai', color: '#8B5CF6' },
];
