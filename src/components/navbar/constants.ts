import { Rocket, Code, LayoutDashboard, CircleUserRound, Mail, Calendar, FileText, GraduationCap, Briefcase, LucideIcon } from "lucide-react";

export interface NavLink {
  name: string;
  path: string;
  icon?: LucideIcon;
  disabled?: boolean;
}

export const navLinks: NavLink[] = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Products', path: '/products' },
  { name: 'Case Studies', path: '/case-studies' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

export interface ServiceCategory {
  title: string;
  href: string;
  description: string;
  color: string;
}

export const serviceCategories = [
  {
    title: "Strategic Consulting",
    href: "/services?service=strategy",
    description: "Technology strategy development and roadmap planning aligned with business objectives",
    color: "#10B981"
  },
  {
    title: "Digital Marketing",
    href: "/services?service=digital",
    description: "Strategic digital marketing solutions for trucking companies",
    color: "#2563EB"
  },
  {
    title: "Social Media Marketing",
    href: "/services?service=social",
    description: "Strategic social media solutions for trucking and logistics",
    color: "#E91E63"
  },
  {
    title: "Custom Development",
    href: "/services?service=custom",
    description: "Tailor-made software solutions for your unique business needs",
    color: "#8B5CF6"
  },
  {
    title: "Web & Mobile Apps",
    href: "/services?service=web",
    description: "Modern web and mobile application development",
    color: "#F59E0B"
  },
  {
    title: "Data Analytics",
    href: "/services?service=analytics",
    description: "Advanced analytics and visualization solutions",
    color: "#EC4899"
  },
  {
    title: "AI & Machine Learning",
    href: "/services?service=ai",
    description: "Intelligent automation and prediction solutions",
    color: "#06B6D4"
  }
];

export interface Product {
  title: string;
  href: string;
  description: string;
  icon: LucideIcon;
}

export const products: Product[] = [
  {
    title: "AI Trucking Assistant",
    href: "/products/ai-trucking-assistant",
    description: "AI-powered virtual assistant for trucking operations",
    icon: Rocket,
  },
  {
    title: "Custom TMS",
    href: "/products/custom-tms",
    description: "Customizable Transportation Management System",
    icon: Code,
  },
  {
    title: "Driver Management",
    href: "/products/driver-management",
    description: "Streamline driver management processes",
    icon: CircleUserRound,
  },
  {
    title: "Analytics Dashboard",
    href: "/products/analytics-dashboard",
    description: "Real-time analytics dashboard for informed decisions",
    icon: LayoutDashboard,
  },
];

export interface DashboardConfig {
  sidebarNav: {
    title: string;
    href: string;
    icon?: LucideIcon;
  }[];
}

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: CircleUserRound,
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: Mail,
    },
    {
      title: "Invoices",
      href: "/dashboard/invoices",
      icon: FileText,
    },
    {
      title: "Schedule",
      href: "/dashboard/schedule",
      icon: Calendar,
    },
    {
      title: "Education",
      href: "/dashboard/education",
      icon: GraduationCap,
    },
    {
      title: "Careers",
      href: "/dashboard/careers",
      icon: Briefcase,
    },
  ],
}
