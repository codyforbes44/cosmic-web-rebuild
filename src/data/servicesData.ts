
import { BarChart2, PieChart, TrendingUp } from 'lucide-react';
import { Service } from '@/types/services';

export const services: Service[] = [
  {
    id: 'strategy',
    name: 'Strategic Consulting',
    description: 'Comprehensive technology strategy development and roadmap planning aligned with your business objectives.',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    color: '#7C3AED',
    deliverables: 'Technology roadmap, Gap analysis, ROI projections',
    duration: '4-8 weeks',
    process: 'Assessment, Analysis, Strategy Development, Implementation Planning',
    key_benefit: 'Align technology investments with business goals to maximize ROI and competitive advantage',
    benefits: [
      'Strategic technology roadmap tailored to your business goals',
      'Comprehensive analysis of current systems and future needs',
      'Clear implementation priorities with ROI projections',
      'Expert guidance from industry veterans'
    ],
    pain_points: [
      'Outdated systems holding back business growth',
      'Unclear technology investment priorities',
      'Difficulty aligning IT with business objectives',
      'Concerns about wasting resources on the wrong solutions'
    ],
    case_study: {
      title: "Tech Transformation Strategy",
      client: "Global Manufacturing Inc.",
      description: "We developed a comprehensive technology strategy for this manufacturing leader, identifying key opportunities for digital transformation and automation.",
      results: [
        { label: "ROI Increase", value: "37%", icon: TrendingUp },
        { label: "Cost Savings", value: "$1.2M", icon: BarChart2 },
        { label: "Efficiency Gain", value: "25%", icon: PieChart }
      ]
    },
    testimonials: [
      {
        name: "Sarah Johnson",
        position: "CTO, Global Manufacturing Inc.",
        quote: "The strategic roadmap developed by the team has transformed how we approach technology investments. We now have clear priorities and measurable outcomes.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      },
      {
        name: "Michael Chen",
        position: "CEO, TechInnovate",
        quote: "The ROI projections were spot on. We've already seen a 30% increase in operational efficiency within the first quarter of implementation.",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      }
    ]
  },
  {
    id: 'digital',
    name: 'Digital Transformation',
    description: 'End-to-end digital transformation services to modernize legacy systems and create innovative digital experiences.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    color: '#2563EB',
    deliverables: 'Transformation blueprint, System architecture, Implementation roadmap',
    duration: '3-12 months',
    process: 'Discovery, Design, Development, Deployment, Support',
    key_benefit: 'Increase operational efficiency while reducing costs through strategic technology adoption',
    benefits: [
      'Modernize legacy systems with minimal disruption',
      'Streamline operations with integrated digital workflows',
      'Enable data-driven decision making across your organization',
      'Improve customer and employee digital experiences'
    ],
    pain_points: [
      'Legacy systems that can't keep up with business needs',
      'Disconnected data silos limiting visibility',
      'Inefficient manual processes wasting time and resources',
      'Competitive pressure from more digitally advanced rivals'
    ],
    case_study: {
      title: "Healthcare Provider Digital Overhaul",
      client: "Regional Medical Center",
      description: "We transformed the client's outdated record systems into a modern digital platform, improving patient care and operational efficiency.",
      results: [
        { label: "Time Saved", value: "65%", icon: TrendingUp },
        { label: "Error Reduction", value: "87%", icon: BarChart2 },
        { label: "Patient Satisfaction", value: "+42%", icon: PieChart }
      ]
    },
    testimonials: [
      {
        name: "Dr. Emily Roberts",
        position: "Chief Medical Officer, Regional Medical Center",
        quote: "The digital transformation has completely changed how we deliver patient care. Our staff can now focus on patients instead of paperwork.",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      },
      {
        name: "Robert Thompson",
        position: "IT Director, Healthcare Solutions",
        quote: "The seamless integration between our legacy systems and new digital platform exceeded our expectations. The transition was remarkably smooth.",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      }
    ]
  },
  {
    id: 'custom',
    name: 'Custom Software',
    description: 'Tailored software solutions designed and developed to address your unique business challenges.',
    image: 'https://images.unsplash.com/photo-1573495612937-f02b76716e91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    color: '#E11D48',
    deliverables: 'Custom applications, API integrations, User documentation',
    duration: '2-9 months',
    process: 'Requirements, Design, Development, Testing, Deployment',
    key_benefit: 'Purpose-built software that perfectly addresses your specific business requirements',
    benefits: [
      'Precisely tailored solutions for your unique business needs',
      'Seamless integration with your existing technology ecosystem',
      'Scalable architecture designed to grow with your business',
      'Full ownership of your custom software assets'
    ],
    pain_points: [
      'Off-the-shelf software that doesn't fit your processes',
      'Unique business challenges requiring specialized solutions',
      'Integration issues between multiple software systems',
      'Need for competitive advantage through proprietary tools'
    ],
    case_study: {
      title: "Logistics Management Platform",
      client: "Interstate Transport Co.",
      description: "We built a custom logistics management platform that integrated route optimization, driver management, and customer communications.",
      results: [
        { label: "Fuel Savings", value: "22%", icon: TrendingUp },
        { label: "Delivery Time", value: "-35%", icon: BarChart2 },
        { label: "Customer Retention", value: "+18%", icon: PieChart }
      ]
    },
    testimonials: [
      {
        name: "Thomas Rivera",
        position: "Operations Director, Interstate Transport",
        quote: "This custom platform solved problems we've struggled with for years. The ROI was evident within the first three months of implementation.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      },
      {
        name: "Amanda Lewis",
        position: "Fleet Manager, Logistics Pro",
        quote: "The route optimization alone has saved us thousands in fuel costs. The drivers love the intuitive mobile interface too.",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      }
    ]
  },
  {
    id: 'web',
    name: 'Web & Mobile Apps',
    description: 'Responsive, user-friendly applications for web and mobile platforms with exceptional user experiences.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    color: '#F59E0B',
    deliverables: 'Progressive web apps, Native mobile apps, Responsive websites',
    duration: '1-6 months',
    process: 'UI/UX Design, Frontend Development, Backend Integration, Testing',
    key_benefit: 'Reach your customers on any device with intuitive, engaging digital experiences',
    benefits: [
      'Engage users with intuitive, responsive interfaces',
      'Consistent experience across all devices and platforms',
      'Performance optimized for conversion and retention',
      'Future-proof technologies with ongoing support'
    ],
    pain_points: [
      'Poor user experience limiting customer engagement',
      'Outdated websites not optimized for mobile devices',
      'Difficulty maintaining consistent brand experience',
      'Need for better digital conversion rates'
    ],
    case_study: {
      title: "E-commerce App Redesign",
      client: "Fashion Retailer Inc.",
      description: "We reimagined the client's online shopping experience with a modern, intuitive mobile app and responsive website, dramatically increasing conversions.",
      results: [
        { label: "Conversion Rate", value: "+58%", icon: TrendingUp },
        { label: "Engagement", value: "+125%", icon: BarChart2 },
        { label: "Cart Abandonment", value: "-40%", icon: PieChart }
      ]
    },
    testimonials: [
      {
        name: "Jennifer Smith",
        position: "Digital Marketing Director, Fashion Retailer Inc.",
        quote: "Our conversion rates have skyrocketed since the app redesign. The seamless shopping experience has transformed our digital business.",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      },
      {
        name: "David Wong",
        position: "E-commerce Manager, Online Trends",
        quote: "The mobile-first approach paid off immediately. Our customers love how easily they can browse and purchase on any device.",
        avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      }
    ]
  },
  {
    id: 'analytics',
    name: 'Data Analytics',
    description: 'Transform your data into actionable insights with advanced analytics and visualization solutions.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    color: '#059669',
    deliverables: 'Dashboards, Reports, Data models, KPI tracking',
    duration: '1-3 months',
    process: 'Data Assessment, Platform Setup, Dashboard Creation, Training',
    key_benefit: 'Make data-driven decisions with real-time insights into your business operations',
    benefits: [
      'Visualize complex data through intuitive dashboards',
      'Track key performance indicators in real-time',
      'Uncover hidden insights to drive strategic decisions',
      'Predict trends and identify opportunities with advanced analytics'
    ],
    pain_points: [
      'Scattered data making insights difficult to obtain',
      'Inability to track business performance effectively',
      'Time wasted manually creating reports',
      'Decision making based on incomplete information'
    ],
    case_study: {
      title: "Retail Analytics Dashboard",
      client: "National Retail Chain",
      description: "We developed an integrated analytics platform that provided real-time insights across 200+ locations, enabling data-driven inventory and staffing decisions.",
      results: [
        { label: "Inventory Cost", value: "-23%", icon: TrendingUp },
        { label: "Stock Outs", value: "-68%", icon: BarChart2 },
        { label: "Sales Increase", value: "+12%", icon: PieChart }
      ]
    },
    testimonials: [
      {
        name: "Karen Martinez",
        position: "Retail Operations Director, National Retail Chain",
        quote: "The analytics dashboard has revolutionized our inventory management. We've reduced costs while improving product availability.",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      },
      {
        name: "Jason Taylor",
        position: "Regional Manager, Retail Excellence",
        quote: "Having real-time data at our fingertips has transformed how we make decisions. We can now respond to market changes immediately.",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      }
    ]
  },
  {
    id: 'ai',
    name: 'AI & Machine Learning',
    description: 'Leverage artificial intelligence and machine learning to optimize operations and gain competitive advantages.',
    image: 'https://images.unsplash.com/photo-1551636898-47668aa61de2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    color: '#8B5CF6',
    deliverables: 'Predictive models, ML algorithms, AI integrations',
    duration: '2-6 months',
    process: 'Data Preparation, Model Development, Validation, Integration',
    key_benefit: 'Automate processes, predict trends, and unlock new opportunities with AI-powered solutions',
    benefits: [
      'Automate complex tasks to improve efficiency',
      'Predict customer behavior and market trends',
      'Enhance decision making with intelligent recommendations',
      'Stay ahead of competition with cutting-edge AI capabilities'
    ],
    pain_points: [
      'Manual processes consuming valuable resources',
      'Difficulty predicting customer needs and market changes',
      'Complex decisions requiring advanced analysis',
      'Competitors gaining advantage through AI adoption'
    ],
    case_study: {
      title: "Predictive Maintenance System",
      client: "Industrial Manufacturing Corp.",
      description: "We implemented an AI-powered predictive maintenance system that analyzed equipment sensor data to forecast failures before they occurred.",
      results: [
        { label: "Downtime", value: "-78%", icon: TrendingUp },
        { label: "Maintenance Cost", value: "-42%", icon: BarChart2 },
        { label: "Equipment Lifespan", value: "+35%", icon: PieChart }
      ]
    },
    testimonials: [
      {
        name: "Frank Miller",
        position: "Operations Manager, Industrial Manufacturing Corp.",
        quote: "The predictive maintenance system has been a game-changer. We've dramatically reduced downtime and extended the life of our equipment.",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      },
      {
        name: "Lisa Patel",
        position: "Chief Innovation Officer, Tech Innovations",
        quote: "The AI models have exceeded our expectations in accuracy. We're now expanding the implementation across our entire production line.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      }
    ]
  }
];
