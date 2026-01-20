/**
 * Centralized Navigation Configuration
 * Single source of truth for all navigation items, routes, and access control
 */

import { Shield, BarChart3, FolderKanban, Sparkles, Bot, Brain, Mic, Map, Calculator, Cloud, Stethoscope } from 'lucide-react';

// ============= Types =============
export interface NavigationItem {
  name: string;
  href: string;
  hasDropdown?: boolean;
  external?: boolean;
  description?: string;
  color?: string;
  icon?: React.ComponentType<{ className?: string }>;
  requiresAuth?: boolean;
  requiresAdmin?: boolean;
  hideInProduction?: boolean;
}

export interface NavigationCategory {
  title: string;
  href: string;
  description: string;
  color?: string;
  external?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}

// ============= Main Navigation =============
export const mainNavigation: NavigationItem[] = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services", hasDropdown: true },
  { name: "Products", href: "/products", hasDropdown: true },
  { name: "FAQ", href: "/faq" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" }
];

// ============= Service Categories =============
export const serviceCategories: NavigationCategory[] = [
  {
    title: "Digital Marketing",
    href: "/digital-marketing",
    description: "Comprehensive digital marketing solutions",
    color: "hsl(38, 92%, 50%)" // amber-500 equivalent
  },
  {
    title: "Web Development",
    href: "/web-development",
    description: "Custom websites and web applications",
    color: "hsl(217, 91%, 60%)" // blue-500 equivalent
  },
  {
    title: "AI Solutions",
    href: "/ai-solutions",
    description: "Artificial intelligence integration",
    color: "hsl(263, 70%, 58%)" // violet-500 equivalent
  },
  {
    title: "Strategy Consulting",
    href: "/strategy-consulting",
    description: "Business strategy and consulting",
    color: "hsl(160, 84%, 39%)" // emerald-500 equivalent
  },
  {
    title: "Social Media Management",
    href: "/social-media-management",
    description: "Social media strategy and management",
    color: "hsl(330, 81%, 60%)" // pink-400 equivalent
  },
  {
    title: "Recruitment Marketing",
    href: "/recruitment-marketing",
    description: "Specialized recruitment solutions",
    color: "hsl(0, 84%, 60%)" // red-500 equivalent
  }
];

// ============= Product Categories =============
export const productCategories: NavigationCategory[] = [
  {
    title: "ATS.ME",
    href: "https://ats.me",
    description: "Modern applicant tracking system for growing teams",
    external: true
  },
  {
    title: "AI Chatbots",
    href: "/chatbot-products",
    description: "Intelligent chatbot solutions for your website",
    icon: Bot
  },
  {
    title: "Multi-AI Assistant",
    href: "/multi-ai",
    description: "Combined AI capabilities in one powerful interface",
    icon: Brain
  },
  {
    title: "Voice AI Assistant",
    href: "/voice",
    description: "Natural voice interaction technology",
    icon: Mic
  }
];

// ============= Secure/Protected Pages (require auth) =============
export const securePages: NavigationItem[] = [
  {
    name: "OpenAI Playground",
    href: "/openai",
    description: "Advanced AI language model testing",
    icon: Sparkles
  },
  {
    name: "HuggingFace Models",
    href: "/huggingface",
    description: "Access to various AI models",
    icon: Brain
  },
  {
    name: "Interactive Maps",
    href: "/maps",
    description: "Advanced mapping and location services",
    icon: Map
  }
];

// ============= Admin Navigation (require admin role) =============
export const adminNavigation: NavigationItem[] = [
  {
    name: "Admin Dashboard",
    href: "/admin",
    description: "System administration and management",
    icon: Shield,
    requiresAuth: true,
    requiresAdmin: true
  },
  {
    name: "Analytics",
    href: "/analytics",
    description: "Platform analytics and insights",
    icon: BarChart3,
    requiresAuth: true,
    requiresAdmin: true
  },
  {
    name: "Project Management",
    href: "/projects",
    description: "Manage projects and tasks",
    icon: FolderKanban,
    requiresAuth: true
  }
];

// ============= Developer Pages (hide in production) =============
export const developerPages: NavigationItem[] = [
  {
    name: "Component Catalog",
    href: "/component-catalog",
    description: "UI component library and documentation",
    hideInProduction: true
  }
];

// ============= User Menu Items =============
export const userMenuItems: NavigationItem[] = [
  { name: "Profile", href: "/profile", requiresAuth: true },
  { name: "Features", href: "/features", requiresAuth: true },
  ...adminNavigation.filter(item => item.requiresAdmin)
];

// ============= Footer Quick Links =============
export const footerQuickLinks: NavigationItem[] = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Accessibility", href: "/accessibility" },
  { name: "FAQ", href: "/faq" }
];

// ============= Helper Functions =============
export const isExternalLink = (href: string): boolean => {
  return href.startsWith('http://') || href.startsWith('https://');
};

export const getServiceGroups = () => [
  {
    title: "Marketing Services",
    items: serviceCategories.filter(service =>
      service.title.includes("Marketing") || service.title.includes("Social")
    )
  },
  {
    title: "Technology Services",
    items: serviceCategories.filter(service =>
      service.title.includes("Development") ||
      service.title.includes("Web") ||
      service.title.includes("AI")
    )
  },
  {
    title: "Strategic Services",
    items: serviceCategories.filter(service =>
      service.title.includes("Strategy") || service.title.includes("Consulting")
    )
  }
];

// ============= Legacy Exports (backward compatibility) =============
export interface NavLink {
  name: string;
  path: string;
  disabled?: boolean;
}

export const navLinks: NavLink[] = mainNavigation.map(item => ({
  name: item.name,
  path: item.href,
  disabled: false
}));

export const secureNavLinks: NavLink[] = adminNavigation.map(item => ({
  name: item.name,
  path: item.href,
  disabled: false
}));

// Re-export for compatibility with old imports
export const navigationItems = mainNavigation;
