
import { Message } from './types';

export const AUTO_RESPONSES = [
  {
    keywords: ['pricing', 'cost', 'price', 'package', 'subscription'],
    response: "Our pricing varies based on your specific needs. We offer flexible packages starting from $799/month. Would you like to speak with a sales representative to get a custom quote?"
  },
  {
    keywords: ['web', 'website', 'development'],
    response: "Our web development services include responsive design, e-commerce solutions, and custom web applications. We've helped businesses of all sizes establish a strong online presence. What kind of website are you looking to build?"
  },
  {
    keywords: ['social', 'media', 'marketing', 'facebook', 'instagram', 'linkedin'],
    response: "Our social media marketing services help businesses increase engagement and drive conversions. We offer content creation, community management, and paid advertising campaigns. Which platforms are you currently using?"
  },
  {
    keywords: ['web3', 'blockchain', 'crypto', 'nft'],
    response: "Our Web3 services include blockchain integration, smart contract development, and NFT marketplace creation. We're at the forefront of this emerging technology. What specific Web3 project are you interested in?"
  },
  {
    keywords: ['software', 'app', 'application', 'development'],
    response: "Our software development team creates custom applications tailored to your business needs. We specialize in scalable, secure, and user-friendly solutions. What kind of software are you looking to develop?"
  },
  {
    keywords: ['contact', 'call', 'phone', 'email', 'reach'],
    response: "You can reach our team at contact@3bi.io or call us at (817) 757-2828. Would you like us to have someone contact you directly?"
  },
  {
    keywords: ['thanks', 'thank you', 'great', 'awesome', 'excellent'],
    response: "You're welcome! Is there anything else I can help you with today?"
  },
  // Ʒʙɪ-specific service info
  {
    keywords: ['services', 'offer', 'what services', '3bi'],
    response: "Ʒʙɪ provides a wide range of specialized marketing and technology solutions, including:\n\n– Digital Marketing: Targeted campaigns and advertising strategies across platforms like Google, Facebook, Instagram, LinkedIn, and more to reach and engage your desired audience.\n\n– Business Intelligence (BI) Reporting: Comprehensive analysis and visual representation of marketing metrics and market analytics using tools like Tableau, Power BI, and Looker to support strategic decision-making.\n\n– Workflow Optimization Solutions: Automation and management of marketing and business operations through platforms such as Zapier, Monday.com, and Asana to improve efficiency.\n\n– AI Adaptation & Integration: Integration of AI technologies into marketing and business processes to enhance customer engagement, predictive analytics, and operational efficiency.\n\n– Technology Migrations: Assistance in transitioning businesses to new technologies, ensuring minimal disruption and seamless integration."
  },
  {
    keywords: ['improve', 'marketing strategy', 'strategy'],
    response: "We analyze your current marketing efforts to develop customized, data-driven strategies. This includes optimizing digital campaigns, enhancing brand visibility, and using targeted advertising techniques to reach the right audience effectively."
  },
  {
    keywords: ['business intelligence', 'bi reporting'],
    response: "BI reporting involves collecting, analyzing, and visualizing data related to marketing performance, customer behavior, and industry trends. This empowers organizations to make informed strategic decisions, optimize their marketing approaches, and identify opportunities for growth."
  },
  {
    keywords: ['automate', 'automation', 'workflow', 'processes'],
    response: "Absolutely! We utilize automation tools to streamline various marketing and operational tasks, such as customer communication, data management, and campaign scheduling, reducing manual workloads and enabling your team to focus on high-value initiatives."
  },
  {
    keywords: ['integrate ai', 'ai', 'artificial intelligence'],
    response: "We implement AI technologies across multiple business areas, including customer segmentation, predictive analytics, automated content personalization, and interactive chatbots to enhance customer engagement and optimize operational efficiency."
  },
  {
    keywords: ['industries', 'industry'],
    response: "Ʒʙɪ serves clients across diverse industries, including technology, healthcare, finance, manufacturing, retail, and more. We tailor our marketing and technology solutions to align with the unique requirements of each sector."
  },
  {
    keywords: ['technical capabilities', 'capabilities'],
    response: "Our technical capabilities include:\n\n– Data Visualization: Creation of clear and actionable visual reports using Tableau, Power BI, and Looker.\n– Automation Tools: Expertise in workflow automation using platforms like Zapier, Asana, and Monday.com.\n– AI Technologies: Implementation of advanced AI solutions for predictive analytics, customer engagement, and operational improvements.\n– Analytics Platforms: Proficiency in analytics tools such as Google Analytics, SEMrush, and Adobe Analytics to track, measure, and optimize marketing performance."
  },
  {
    keywords: ['get in touch', 'support', 'contact'],
    response: "You can contact us via phone at 817-757-2828, email at support@3bi.io, or through our social media channels on X and LinkedIn."
  },
  {
    keywords: ['what sets', 'apart', 'differentiate'],
    response: "Ʒʙɪ distinguishes itself through an innovative approach, deep expertise in data-driven strategies, and a commitment to leveraging the latest technologies. Our personalized service and tailored solutions ensure we address the specific challenges and goals of each client effectively."
  }
];

export const DEFAULT_RESPONSE = "Thank you for your message. I unfortunately do not have knowledge on that. Is there anything else you'd like to know?";

export const INITIAL_MESSAGE: Message = {
  id: '1', 
  sender: 'agent', 
  text: 'Hello! Welcome to Ʒʙɪ. How can I help you today?', 
  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};
