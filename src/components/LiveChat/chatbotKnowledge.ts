
import { services } from "@/data/servicesData";
import { productCategories, products } from "@/components/navbar/constants";

/**
 * Structured knowledge base for the chatbot containing information about
 * services, products, and common questions
 */

export interface KnowledgeItem {
  keywords: string[];
  response: string;
  restricted?: boolean; // Property to mark restricted information
  isCommonQuestion?: boolean; // New property to identify items that are good for quick suggestions
}

// Create service knowledge entries
const serviceKnowledge: KnowledgeItem[] = services.map(service => ({
  keywords: [
    service.title.toLowerCase(), 
    service.name?.toLowerCase() || "",
    service.subtitle.toLowerCase(),
    ...(service.benefits || []).map(b => b.toLowerCase())
  ].filter(Boolean),
  response: `
    ${service.title} is one of our specialized services. 
    ${service.description}
    
    Key benefits include:
    ${service.benefits ? service.benefits.map(b => `- ${b}`).join('\n    ') : ''}
    
    For more information or to request a quote, please visit our services page or contact us directly.
  `
}));

// Create product knowledge entries
const productKnowledge: KnowledgeItem[] = [
  ...productCategories.map(product => ({
    keywords: [product.title.toLowerCase(), product.description.toLowerCase()],
    response: `
      ${product.title} is one of our main product offerings. 
      ${product.description}
      
      To learn more or request a demo, please visit our products page or contact our sales team.
    `
  })),
  ...products.map(product => ({
    keywords: [product.title.toLowerCase(), product.description.toLowerCase()],
    response: `
      ${product.title} is one of our specialized solutions.
      ${product.description}
      
      To learn more or request a demo, please visit our products page or contact our sales team.
    `
  }))
];

// FAQ knowledge entries - Now tagged with isCommonQuestion for those that should be suggested
const faqKnowledge: KnowledgeItem[] = [
  {
    keywords: ["contact", "reach", "email", "phone", "get in touch"],
    response: `
      You can contact ƷBI through our contact form on the website, or by emailing info@3bi.ai.
      Our team typically responds within 24-48 business hours.
    `,
    isCommonQuestion: true
  },
  {
    keywords: ["quote", "pricing", "cost", "price", "estimate"],
    response: `
      To get a customized quote for our services or products, please fill out our quote request form.
      Pricing varies based on your specific needs and requirements.
    `,
    isCommonQuestion: true
  },
  {
    keywords: ["demo", "trial", "demonstration", "see it in action"],
    response: `
      We'd be happy to provide a demonstration of our products. You can request a demo through our product pages,
      and one of our representatives will reach out to schedule a convenient time.
    `,
    isCommonQuestion: true
  },
  {
    keywords: ["trucking", "logistics", "transportation", "drivers", "fleet"],
    response: `
      ƷBI specializes in solutions for the trucking and logistics industry. Our products and services
      are designed specifically to address the unique challenges of transportation companies, with a focus
      on driver recruitment, retention, and operational efficiency.
    `,
    isCommonQuestion: true
  },
  {
    keywords: ["different", "unique", "special", "stand out", "what makes", "why choose"],
    response: `
      What makes ƷBI different is our unique combination of industry expertise, innovative technology, and client-focused approach:
      
      1. Industry-Specific Knowledge: We specialize in technology solutions for the trucking and logistics industry, with deep understanding of the unique challenges faced by transportation companies.
      
      2. Data-Driven Solutions: Our platforms leverage advanced analytics and AI to provide actionable insights that drive measurable business outcomes.
      
      3. Custom Development: We build tailored solutions that address your specific business challenges rather than offering one-size-fits-all products.
      
      4. End-to-End Support: Our team provides comprehensive support from initial consultation through implementation and ongoing maintenance.
      
      5. Client Partnership: We see ourselves as partners in your success, not just a service provider, with a proven track record of helping transportation businesses improve operations and profitability.
    `,
    isCommonQuestion: true
  },
  {
    keywords: ["services", "service offerings", "what do you offer", "what services", "tell me about your services"],
    response: `
      ƷBI offers a comprehensive range of services designed for the transportation and logistics industry, including:
      
      - Digital Marketing Strategies
      - Custom Software Development
      - Driver Recruitment Solutions
      - Analytics and Performance Tracking
      - Social Media Management
      - Web Development and Design
      - AI-powered Automation Tools
      
      Each service is tailored to address the unique challenges faced by transportation companies. Would you like more specific information about any of these services?
    `,
    isCommonQuestion: true
  },
  {
    keywords: ["get started", "begin", "first steps", "how to start", "initial consultation"],
    response: `
      Getting started with ƷBI is simple! Here's how:
      
      1. Schedule an initial consultation through our contact form or by calling us directly
      2. Our team will conduct a needs assessment to understand your specific business challenges
      3. We'll develop a customized proposal outlining recommended solutions and implementation timeline
      4. Once approved, our team will begin implementation with regular progress updates
      5. After launch, we provide ongoing support and optimization
      
      Ready to get started? Contact us today for your free initial consultation!
    `,
    isCommonQuestion: true
  }
];

// Zapier integration knowledge - Now marked as restricted
const zapierKnowledge: KnowledgeItem[] = [
  {
    keywords: ["zapier", "zap", "automation", "webhook", "integration", "automate"],
    response: `
      Zapier integration features are only available to authenticated users. 
      Please sign in to your account to access Zapier integration functionality.
    `,
    restricted: true
  },
  {
    keywords: ["how to use zapier", "zapier commands", "zapier help", "zapier tutorial"],
    response: `
      Zapier integration help and tutorials are only available to authenticated users.
      Please sign in to your account to access Zapier integration documentation.
    `,
    restricted: true
  },
  {
    keywords: ["zapier webhook setup", "create zapier webhook", "zapier tutorial", "webhook instructions"],
    response: `
      Zapier webhook setup instructions are only available to authenticated users.
      Please sign in to your account to access Zapier webhook configuration guides.
    `,
    restricted: true
  }
];

// Combine all knowledge entries
export const chatbotKnowledge: KnowledgeItem[] = [
  ...serviceKnowledge,
  ...productKnowledge,
  ...faqKnowledge,
  ...zapierKnowledge
];

/**
 * Function to find the most relevant knowledge item based on user input
 * Now includes user authentication check for restricted content
 */
export function findRelevantResponse(userInput: string, isAuthenticated: boolean = false): string | null {
  const normalizedInput = userInput.toLowerCase().trim();
  
  if (!normalizedInput || normalizedInput.length < 2) {
    return "Could you please provide more details about what you're looking for?";
  }
  
  // Try to find a direct match first
  for (const item of chatbotKnowledge) {
    // Skip restricted content for unauthenticated users
    if (item.restricted && !isAuthenticated) continue;
    
    for (const keyword of item.keywords) {
      if (keyword && normalizedInput.includes(keyword)) {
        return item.response.trim();
      }
    }
  }
  
  // If no direct match, try to find partial matches
  const partialMatches = chatbotKnowledge.filter(item => 
    // Skip restricted content for unauthenticated users
    (!item.restricted || isAuthenticated) &&
    item.keywords.some(keyword => 
      keyword && keyword.length > 3 && normalizedInput.includes(keyword.substring(0, 3))
    )
  );
  
  if (partialMatches.length > 0) {
    return partialMatches[0].response.trim();
  }
  
  // Special case for Zapier-related queries from unauthenticated users
  if (normalizedInput.includes("zapier") || normalizedInput.includes("zap") || 
      normalizedInput.includes("webhook") || normalizedInput.includes("integration")) {
    return "I'm sorry, Zapier integration features are only available to authenticated users. Please sign in to access this functionality.";
  }
  
  // Fall back to a default response
  return null;
}

/**
 * Returns an array of suggested questions based on common questions in the knowledge base
 */
export function getSuggestedQuestions(): string[] {
  // Filter knowledge items that are marked as common questions
  const commonQuestions = chatbotKnowledge
    .filter(item => item.isCommonQuestion && !item.restricted)
    .map(item => {
      // For each item, find a representative question based on keywords
      const mainKeyword = item.keywords[0];
      
      // Format into a question
      if (mainKeyword.includes("what")) return mainKeyword.charAt(0).toUpperCase() + mainKeyword.slice(1) + "?";
      if (mainKeyword.includes("how")) return mainKeyword.charAt(0).toUpperCase() + mainKeyword.slice(1) + "?";
      if (mainKeyword === "different") return "What makes ƷBI different?";
      if (mainKeyword === "services") return "Tell me about your services";
      if (mainKeyword === "get started") return "How can I get started?";
      if (mainKeyword === "contact") return "How can I contact you?";
      if (mainKeyword === "quote") return "How do I get a quote?";
      if (mainKeyword === "demo") return "Can I see a demo?";
      
      // Default to a generic format
      return `Tell me about ${mainKeyword}`;
    });
  
  // Return a limited number of suggestions (3-5 is usually a good number for UI)
  return commonQuestions.slice(0, 5);
}
