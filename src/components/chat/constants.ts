
import { Message } from './types';

export const AUTO_RESPONSES = [
  {
    keywords: ['pricing', 'cost', 'price', 'package', 'subscription'],
    response: "Thanks for asking about our pricing! We offer flexible packages starting from $799/month, tailored to your specific needs. Would you like me to connect you with a sales representative for a personalized quote?"
  },
  {
    keywords: ['web', 'website', 'development'],
    response: "Our web development team creates stunning, responsive websites that drive results. From simple landing pages to complex e-commerce platforms, we've helped businesses of all sizes establish a powerful online presence. What type of website project are you considering?"
  },
  {
    keywords: ['social', 'media', 'marketing', 'facebook', 'instagram', 'linkedin'],
    response: "Social media is a powerful tool for growing your brand! Our team can help with content creation, community management, and targeted ad campaigns that convert. Which platforms are most important for your business right now?"
  },
  {
    keywords: ['web3', 'blockchain', 'crypto', 'nft'],
    response: "Excited about Web3? So are we! Our team specializes in blockchain integration, smart contract development, and NFT marketplace creation. We'd love to hear more about your Web3 vision and how we can bring it to life."
  },
  {
    keywords: ['software', 'app', 'application', 'development'],
    response: "Custom software solutions can transform your business operations! Whether you need a mobile app, web application, or enterprise software, our development team creates scalable, secure, and user-friendly solutions. What challenges are you looking to solve with custom software?"
  },
  {
    keywords: ['contact', 'call', 'phone', 'email', 'reach'],
    response: "I'd be happy to connect you with our team! You can reach us at contact@3bi.io or call (817) 757-2828. Alternatively, I can have someone contact you directly. Would that be helpful?"
  },
  {
    keywords: ['thanks', 'thank you', 'great', 'awesome', 'excellent'],
    response: "You're very welcome! I'm here to help with anything else you might need. Is there anything else I can assist you with today?"
  },
  // Ʒʙɪ-specific service info
  {
    keywords: ['services', 'offer', 'what services', '3bi'],
    response: "At Ʒʙɪ, we offer a comprehensive suite of digital solutions to help your business thrive:\n\n– Digital Marketing: Strategic campaigns across Google, Facebook, Instagram, LinkedIn, and more to connect with your ideal audience.\n\n– Business Intelligence: Data-driven insights using Tableau, Power BI, and Looker to inform smarter business decisions.\n\n– Workflow Optimization: Streamlining your operations with Zapier, Monday.com, and Asana to boost efficiency.\n\n– AI Integration: Leveraging cutting-edge AI to enhance customer engagement and operational effectiveness.\n\n– Technology Migrations: Seamless transitions to new technologies with minimal disruption.\n\nWhich of these areas are you most interested in exploring?"
  },
  {
    keywords: ['improve', 'marketing strategy', 'strategy'],
    response: "Ready to elevate your marketing strategy? We start by analyzing your current efforts and competitive landscape, then develop a customized approach that aligns with your business goals. Our data-driven strategies enhance your brand visibility and connect you with the right audience at the right time. What specific marketing challenges are you facing?"
  },
  {
    keywords: ['business intelligence', 'bi reporting'],
    response: "Business intelligence transforms raw data into actionable insights! Our BI reporting solutions help you understand customer behavior, track marketing performance, and identify growth opportunities. With visual dashboards and regular reports, you'll make confident, data-backed decisions. How are you currently measuring your business performance?"
  },
  {
    keywords: ['automate', 'automation', 'workflow', 'processes'],
    response: "Automation is a game-changer for productivity! We can help streamline your marketing and operational workflows, reducing manual tasks and freeing your team to focus on strategic initiatives. From customer communications to campaign management, what processes would you like to automate?"
  },
  {
    keywords: ['integrate ai', 'ai', 'artificial intelligence'],
    response: "AI is revolutionizing how businesses operate! We integrate AI solutions for customer segmentation, predictive analytics, content personalization, and interactive support. By harnessing AI technology, you'll enhance customer experiences and optimize operations. What AI capabilities are you most interested in exploring?"
  },
  {
    keywords: ['industries', 'industry'],
    response: "We've successfully partnered with clients across diverse industries including technology, healthcare, finance, retail, and manufacturing. Our solutions are tailored to address the unique challenges and opportunities in your specific sector. What industry are you in, and what challenges are you facing?"
  },
  {
    keywords: ['technical capabilities', 'capabilities'],
    response: "Our technical expertise spans multiple disciplines:\n\n– Data Visualization: Creating intuitive dashboards with Tableau, Power BI, and Looker.\n– Automation: Streamlining workflows with Zapier, Asana, and Monday.com.\n– AI Implementation: Developing smart solutions for analytics and customer engagement.\n– Analytics: Leveraging tools like Google Analytics and Adobe Analytics to optimize performance.\n\nWhich of these capabilities would be most valuable for your business?"
  },
  {
    keywords: ['get in touch', 'support', 'contact'],
    response: "I'd be happy to connect you with our team! You can reach us at 817-757-2828, email support@3bi.io, or connect through X and LinkedIn. Would you like me to arrange for someone to contact you directly?"
  },
  {
    keywords: ['what sets', 'apart', 'differentiate'],
    response: "What sets Ʒʙɪ apart is our unique combination of innovative thinking, data-driven expertise, and personalized service. We don't just implement solutions – we partner with you to understand your business goals and develop strategies that deliver measurable results. How can our approach benefit your specific business needs?"
  },
  {
    keywords: ['hello', 'hi', 'hey', 'morning', 'afternoon', 'evening'],
    response: "Hello there! 👋 Welcome to Ʒʙɪ. I'm excited to chat with you today. How can I help with your digital marketing, business intelligence, or technology needs?"
  }
];

export const DEFAULT_RESPONSE = "Thanks for reaching out! I don't have specific information on that topic, but I'd be happy to connect you with someone who does. Is there something specific about our services you'd like to know more about?";

export const INITIAL_MESSAGE: Message = {
  id: '1', 
  sender: 'agent', 
  text: "Hi there! 👋 Welcome to Ʒʙɪ. I'm here to help answer your questions about our digital marketing, business intelligence, and technology solutions. How can I assist you today?", 
  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};
