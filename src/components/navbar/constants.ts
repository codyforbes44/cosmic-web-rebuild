
export const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services", hasDropdown: true },
  { name: "Products", href: "/products", hasDropdown: true },
  { name: "FAQ", href: "/faq" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" }
];

export const serviceCategories = [
  {
    title: "Digital Marketing",
    href: "/digital-marketing",
    description: "Comprehensive digital marketing solutions",
    color: "#f59e0b"
  },
  {
    title: "Web Development",
    href: "/web-development", 
    description: "Custom websites and web applications",
    color: "#3b82f6"
  },
  {
    title: "AI Solutions",
    href: "/ai-solutions",
    description: "Artificial intelligence integration",
    color: "#8b5cf6"
  },
  {
    title: "Strategy Consulting", 
    href: "/strategy-consulting",
    description: "Business strategy and consulting",
    color: "#10b981"
  },
  {
    title: "Social Media Management",
    href: "/social-media-management",
    description: "Social media strategy and management",
    color: "#f472b6"
  },
  {
    title: "Recruitment Marketing",
    href: "/recruitment-marketing", 
    description: "Specialized recruitment solutions",
    color: "#ef4444"
  }
];

export const productCategories = [
  {
    title: "ATS.ME",
    href: "https://ats.me",
    description: "Modern applicant tracking system for growing teams",
    external: true
  },
  {
    title: "AI Chatbots",
    href: "/chatbot-products",
    description: "Intelligent chatbot solutions for your website"
  },
  {
    title: "Multi-AI Assistant",
    href: "/multi-ai",
    description: "Combined AI capabilities in one powerful interface"
  },
  {
    title: "Voice AI Assistant", 
    href: "/voice",
    description: "Natural voice interaction technology"
  }
];

export const securePages = [
  {
    title: "OpenAI Playground",
    href: "/openai",
    description: "Advanced AI language model testing"
  },
  {
    title: "HuggingFace Models",
    href: "/huggingface", 
    description: "Access to various AI models"
  },
  {
    title: "Interactive Maps",
    href: "/maps",
    description: "Advanced mapping and location services"
  }
];

// Legacy exports for backward compatibility
export interface NavLink {
  name: string;
  path: string;
  disabled?: boolean;
}

export const navLinks: NavLink[] = navigationItems.map(item => ({
  name: item.name,
  path: item.href,
  disabled: false
}));

export const secureNavLinks: NavLink[] = [
  { name: "Admin Dashboard", path: "/admin", disabled: false },
  { name: "Analytics", path: "/analytics", disabled: false },
  { name: "Project Management", path: "/projects", disabled: false },
  { name: "Features", path: "/features", disabled: false }
];
