
import { services } from "@/data/services";
import { productCategories, products } from "@/components/navbar/constants";

/**
 * Structured knowledge base for the chatbot containing information about
 * services, products, and common questions
 */

export interface KnowledgeItem {
  keywords: string[];
  response: string;
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

// FAQ knowledge entries
const faqKnowledge: KnowledgeItem[] = [
  {
    keywords: ["contact", "reach", "email", "phone", "get in touch"],
    response: `
      You can contact ƷBI through our contact form on the website, or by emailing info@3bi.ai.
      Our team typically responds within 24-48 business hours.
    `
  },
  {
    keywords: ["quote", "pricing", "cost", "price", "estimate"],
    response: `
      To get a customized quote for our services or products, please fill out our quote request form.
      Pricing varies based on your specific needs and requirements.
    `
  },
  {
    keywords: ["demo", "trial", "demonstration", "see it in action"],
    response: `
      We'd be happy to provide a demonstration of our products. You can request a demo through our product pages,
      and one of our representatives will reach out to schedule a convenient time.
    `
  },
  {
    keywords: ["trucking", "logistics", "transportation", "drivers", "fleet"],
    response: `
      ƷBI specializes in solutions for the trucking and logistics industry. Our products and services
      are designed specifically to address the unique challenges of transportation companies, with a focus
      on driver recruitment, retention, and operational efficiency.
    `
  }
];

// Combine all knowledge entries
export const chatbotKnowledge: KnowledgeItem[] = [
  ...serviceKnowledge,
  ...productKnowledge,
  ...faqKnowledge
];

/**
 * Function to find the most relevant knowledge item based on user input
 */
export function findRelevantResponse(userInput: string): string | null {
  const normalizedInput = userInput.toLowerCase();
  
  // Try to find a direct match first
  for (const item of chatbotKnowledge) {
    for (const keyword of item.keywords) {
      if (normalizedInput.includes(keyword)) {
        return item.response.trim();
      }
    }
  }
  
  // If no direct match, try to find partial matches
  const partialMatches = chatbotKnowledge.filter(item => 
    item.keywords.some(keyword => 
      keyword.length > 5 && normalizedInput.includes(keyword.substring(0, 5))
    )
  );
  
  if (partialMatches.length > 0) {
    return partialMatches[0].response.trim();
  }
  
  // Fall back to a default response
  return null;
}
