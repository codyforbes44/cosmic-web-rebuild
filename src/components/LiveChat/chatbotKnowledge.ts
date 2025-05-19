
import { services } from "@/data/servicesData";
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

// Zapier integration knowledge
const zapierKnowledge: KnowledgeItem[] = [
  {
    keywords: ["zapier", "zap", "automation", "webhook", "integration", "automate"],
    response: `
      You can integrate our chat with Zapier to automate tasks. Here's how to use Zapier with our chat:
      
      1. Add your Zapier webhooks by clicking the settings icon in the chat and selecting "Manage Zapier Integrations"
      2. To trigger a Zap, type "zap [category] with [data]" (e.g., "zap lead with name: John Doe, email: john@example.com")
      3. You can also just type "zap [category]" for simpler triggers
      
      For help setting up Zapier webhooks, click the settings icon and select "Manage Zapier Integrations".
    `
  },
  {
    keywords: ["how to use zapier", "zapier commands", "zapier help", "zapier tutorial"],
    response: `
      Zapier Commands Tutorial:
      
      Basic syntax: "zap [category] with [parameters]"
      
      Examples:
      - "zap task with title: Finish proposal, due: tomorrow"
      - "zap contact with name: Sarah Smith, phone: 555-1234"
      - "zap reminder with message: Call client at 3pm"
      
      To set up new Zapier integrations:
      1. Click the settings icon in the chat
      2. Select "Manage Zapier Integrations"
      3. Add your webhook URL from Zapier
      4. Assign a category name that you'll use to trigger it
      
      Need help setting up webhooks in Zapier? Type "zapier webhook setup" for instructions.
    `
  },
  {
    keywords: ["zapier webhook setup", "create zapier webhook", "zapier tutorial", "webhook instructions"],
    response: `
      How to create a Zapier webhook:
      
      1. Go to Zapier.com and create a new Zap
      2. Choose "Webhook by Zapier" as the trigger app
      3. Select "Catch Hook" as the trigger event
      4. Copy the webhook URL provided by Zapier
      5. Come back here and click the settings icon in the chat
      6. Select "Manage Zapier Integrations"
      7. Add a new webhook with:
         - Name: A memorable name for your webhook
         - Category: The command word you'll use to trigger it (e.g., "task")
         - URL: Paste the webhook URL from Zapier
      8. In Zapier, set up the action steps that should happen when the webhook is triggered
      
      That's it! Now you can trigger this Zap by typing "zap [category]" in the chat.
    `
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
