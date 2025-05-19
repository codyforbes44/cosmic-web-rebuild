import { Rocket, Code, LayoutDashboard, CircleUserRound, Mail, Calendar, FileText, GraduationCap, Briefcase, LucideIcon, Users } from "lucide-react";

export interface NavLink {
  name: string;
  path: string;
  icon?: LucideIcon;
  disabled?: boolean;
}

export const navLinks: NavLink[] = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'News', path: '/news' },
  { name: 'FAQ', path: '/faq' },
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
    title: "Recruitment Marketing",
    href: "/services?service=recruitment",
    description: "Powerful driver recruitment campaigns that deliver results",
    color: "#FF6B35"
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

// Add ProductCategory interface
export interface ProductCategory {
  title: string;
  href: string;
  description: string;
  color: string;
  image: string;
}

// Add productCategories array with updated image paths
export const productCategories: ProductCategory[] = [
  {
    title: "3BI Connect",
    href: "/products?product=3bi-connect",
    description: "Comprehensive platform for driver management and retention",
    color: "#2563EB",
    image: "/lovable-uploads/e3113b32-9c5a-4411-93bd-66a08ea62185.png"
  },
  {
    title: "Carrier Partner Network",
    href: "/products?product=carrier-partner-network",
    description: "Connect with qualified drivers and streamline hiring",
    color: "#10B981",
    image: "/lovable-uploads/b6488acc-bc3b-49ce-a399-f736207129fe.png"
  },
  {
    title: "TruckOnboard",
    href: "/products?product=truckonboard",
    description: "Digital onboarding solution for truck drivers",
    color: "#06B6D4",
    image: "/lovable-uploads/dbd9cb45-ab91-470f-8a3e-4640e6b5539c.png"
  },
  {
    title: "Drivers Matter",
    href: "/products?product=drivers-matter",
    description: "Advocating for commercial drivers' rights and improved working conditions",
    color: "#ea384c",
    image: "/lovable-uploads/1141a74c-1568-4bb7-b836-c7e5112efacf.png"
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
