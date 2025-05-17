
export const projects = [
  {
    id: 1,
    title: "Enterprise Resource Planning System",
    client: "Global Manufacturing Inc.",
    industry: "Manufacturing",
    description: "Designed and implemented a comprehensive ERP system to streamline operations across 12 manufacturing facilities, resulting in a 35% increase in productivity.",
    image: "https://images.unsplash.com/photo-1664575599736-c5197c684128?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    technologies: ["React", "Node.js", "PostgreSQL", "Docker"],
    category: "enterprise"
  },
  {
    id: 2,
    title: "Healthcare Patient Management Platform",
    client: "Regional Medical Center",
    industry: "Healthcare",
    description: "Built a secure, HIPAA-compliant patient management system with telemedicine capabilities, electronic health records, and automated billing integration.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    technologies: ["Angular", "Python", "MongoDB", "AWS"],
    category: "healthcare"
  },
  {
    id: 3,
    title: "Retail E-commerce Platform",
    client: "Fashion Retailer",
    industry: "Retail",
    description: "Developed a scalable e-commerce platform with personalized recommendations, inventory management, and omnichannel capabilities.",
    image: "https://images.unsplash.com/photo-1561069934-eee225952461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    technologies: ["Next.js", "GraphQL", "Stripe", "Vercel"],
    category: "ecommerce"
  },
  {
    id: 4,
    title: "Financial Analytics Dashboard",
    client: "Investment Firm",
    industry: "Finance",
    description: "Created a real-time financial analytics dashboard with predictive modeling, risk assessment, and portfolio management tools.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    technologies: ["Vue.js", "D3.js", "Python", "TensorFlow"],
    category: "analytics"
  },
  {
    id: 5,
    title: "Supply Chain Management System",
    client: "Logistics Company",
    industry: "Logistics",
    description: "Engineered an end-to-end supply chain management system with route optimization, inventory tracking, and predictive maintenance.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    technologies: ["React", "Node.js", "Redis", "Google Maps API"],
    category: "logistics"
  },
  {
    id: 6,
    title: "Mobile Banking Application",
    client: "National Bank",
    industry: "Finance",
    description: "Built a secure mobile banking application with biometric authentication, transaction monitoring, and investment services.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    technologies: ["React Native", "Spring Boot", "AWS", "OAuth"],
    category: "finance"
  }
];

export const categories = [
  { id: "all", name: "All Projects" },
  { id: "enterprise", name: "Enterprise" },
  { id: "healthcare", name: "Healthcare" },
  { id: "ecommerce", name: "E-commerce" },
  { id: "finance", name: "Finance" },
  { id: "logistics", name: "Logistics" }
];
