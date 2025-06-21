
export const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services", hasDropdown: true },
  { name: "Products", href: "/products", hasDropdown: true },
  { name: "Partners", href: "/partners" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" }
];

export const serviceCategories = [
  {
    title: "Digital Marketing",
    href: "/services?service=digital-marketing",
    description: "Comprehensive digital marketing solutions",
    color: "#f59e0b"
  },
  {
    title: "Web Development",
    href: "/services?service=web-development", 
    description: "Custom websites and web applications",
    color: "#3b82f6"
  },
  {
    title: "AI Solutions",
    href: "/services?service=ai-solutions",
    description: "Artificial intelligence integration",
    color: "#8b5cf6"
  },
  {
    title: "Strategy Consulting", 
    href: "/services?service=strategy-consulting",
    description: "Business strategy and consulting",
    color: "#10b981"
  },
  {
    title: "Social Media Management",
    href: "/services?service=social-media",
    description: "Social media strategy and management",
    color: "#f472b6"
  },
  {
    title: "Recruitment Marketing",
    href: "/services?service=recruitment-marketing", 
    description: "Specialized recruitment solutions",
    color: "#ef4444"
  }
];

export const productCategories = [
  {
    title: "AI Chatbots",
    href: "/chatbot-products",
    description: "Intelligent chatbot solutions for your website"
  },
  {
    title: "Analytics Platform",
    href: "/demo",
    description: "Advanced business intelligence tools"
  },
  {
    title: "Voice AI Assistant", 
    href: "/voice",
    description: "Natural voice interaction technology"
  },
  {
    title: "Scientific Calculator",
    href: "/calculator",
    description: "Advanced calculation tools"
  },
  {
    title: "Weather Services",
    href: "/weather", 
    description: "Comprehensive weather data and forecasting"
  },
  {
    title: "Medical Diagnosis AI",
    href: "/medical-diagnosis",
    description: "AI-powered medical assistance tools"
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
  { name: "Weather", path: "/weather", disabled: false },
  { name: "Calculator", path: "/calculator", disabled: false },
  { name: "OpenAI Playground", path: "/openai", disabled: false },
  { name: "HuggingFace Models", path: "/huggingface", disabled: false },
  { name: "Medical Diagnosis", path: "/medical-diagnosis", disabled: false },
  { name: "Features", path: "/features", disabled: false }
];
