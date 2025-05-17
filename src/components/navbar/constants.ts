
export const serviceCategories = [
  {
    title: "Strategic Consulting",
    description: "Technology strategy development and roadmap planning aligned with business objectives.",
    href: "/services?service=strategy",
    color: "#7C3AED"
  },
  {
    title: "Digital Transformation",
    description: "End-to-end digital transformation services to modernize legacy systems.",
    href: "/services?service=digital",
    color: "#2563EB"
  },
  {
    title: "Custom Software",
    description: "Tailored software solutions designed for your unique business challenges.",
    href: "/services?service=custom",
    color: "#E11D48"
  },
  {
    title: "Web & Mobile Apps",
    description: "Responsive, user-friendly applications for web and mobile platforms.",
    href: "/services?service=web",
    color: "#F59E0B"
  },
  {
    title: "Data Analytics",
    description: "Transform your data into actionable insights with advanced analytics.",
    href: "/services?service=analytics",
    color: "#059669"
  },
  {
    title: "AI & Machine Learning",
    description: "Leverage artificial intelligence to optimize operations and gain competitive advantages.",
    href: "/services?service=ai",
    color: "#8B5CF6"
  }
];

// Define the interface for our navigation links
export interface NavLink {
  name: string;
  path: string;
  disabled?: boolean;
}

export const navLinks: NavLink[] = [
  { name: 'Home', path: '/' },
  { name: 'Packages', path: '/packages' },
  { name: 'Business Insights', path: '/news' },
  { name: 'About', path: '/about' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Contact', path: '/contact' },
];
