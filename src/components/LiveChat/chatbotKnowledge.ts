// This file contains the knowledge base for the chatbot
// Add or modify responses based on common questions/topics

// Define knowledge categories
type KnowledgeCategory = {
  patterns: RegExp[];
  responses: string[];
  requiresAuth?: boolean;
};

// Knowledge base organized by categories
const knowledgeBase: Record<string, KnowledgeCategory> = {
  companyInfo: {
    patterns: [
      /what is ƷBI/i,
      /who are you/i,
      /about (your|the) company/i,
      /tell me about ƷBI/i,
      /company info/i
    ],
    responses: [
      "ƷBI is a technology solutions company that builds specialized enterprise software for businesses across all industries. We focus on improving operational efficiency, employee management, and overall business performance.",
      "We're ƷBI, a technology company that creates comprehensive business solutions. Our services help companies streamline operations, enhance productivity, and achieve sustainable growth through innovative technology."
    ]
  },
  
  products: {
    patterns: [
      /products/i,
      /what (solutions|products) (do you offer|do you have)/i,
      /tell me about your (solutions|products)/i,
      /what can (I|we) use/i
    ],
    responses: [
      "ƷBI offers several enterprise products: AI Chatbots for customer service automation, Analytics Platform for business intelligence, Voice AI Assistant for hands-free operations, and Custom Development solutions tailored to your specific needs.",
      "Our main products include AI-powered Chatbots, comprehensive Analytics Platform, Voice AI Assistant, and Custom Development services designed to enhance business operations across all industries."
    ]
  },
  
  services: {
    patterns: [
      /services/i,
      /what services (do you offer|do you have)/i,
      /consulting/i,
      /how can you help/i
    ],
    responses: [
      "ƷBI offers various services including Strategic Consulting, Recruitment Marketing, Digital Marketing, Social Media Marketing, Custom Development, Web & Mobile Apps, Data Analytics, and AI & Machine Learning solutions for businesses across all sectors.",
      "Our services span from strategic consulting and marketing solutions to custom development, web/mobile apps, and advanced data analytics and AI/ML solutions tailored for modern businesses."
    ]
  },
  
  contact: {
    patterns: [
      /contact/i,
      /get in touch/i,
      /talk to (someone|a person|a representative)/i,
      /phone number/i,
      /email address/i
    ],
    responses: [
      "You can contact our team through the Contact page on our website, or send an email to contact@3bi.io. For immediate inquiries, call us at (800) 555-1234.",
      "To get in touch with our team, please visit our Contact page, email us at contact@3bi.io, or call our support line at (800) 555-1234."
    ]
  },
  
  pricing: {
    patterns: [
      /pricing/i,
      /how much (does it cost|is it)/i,
      /price/i,
      /subscription/i,
      /payment/i
    ],
    responses: [
      "Our pricing varies based on your specific needs and the scale of implementation. Please reach out through our 'Get Quote' page for a customized pricing proposal.",
      "ƷBI offers tailored pricing based on your business size, needs, and which products you're interested in. Contact us through the 'Get Quote' page for a detailed pricing proposal."
    ]
  },
  
  demo: {
    patterns: [
      /demo/i,
      /try (it|the product|the software)/i,
      /free trial/i,
      /see how it works/i
    ],
    responses: [
      "We'd be happy to demonstrate our products! You can request a personalized demo through our website by clicking on the 'Request a Demo' button on any product page.",
      "To see our products in action, schedule a personalized demo by clicking 'Request a Demo' on our website. Our team will walk you through the features relevant to your business needs."
    ]
  },
  
  implementation: {
    patterns: [
      /how (to|do I|can I|do we) (implement|integrate|set up|install)/i,
      /onboarding process/i,
      /get started/i
    ],
    responses: [
      "Implementation begins with an initial consultation where we assess your needs. Our team will then create a custom implementation plan, provide training, and offer ongoing support to ensure a smooth transition.",
      "Getting started with ƷBI products involves a collaborative process: we begin with understanding your specific needs, configure the software accordingly, provide comprehensive training, and offer continuous support."
    ]
  },
  
  support: {
    patterns: [
      /support/i,
      /help (with|using)/i,
      /customer service/i,
      /technical (support|assistance)/i,
      /troubleshoot/i
    ],
    responses: [
      "Our customer support team is available Monday through Friday, 8 AM to 6 PM ET. You can reach them via email at support@3bi.io or by phone at (800) 555-5678.",
      "ƷBI provides dedicated technical support through our help portal, email support at support@3bi.io, and phone assistance at (800) 555-5678 during business hours."
    ]
  },
  
  career: {
    patterns: [
      /careers/i,
      /jobs/i,
      /work (for|at) ƷBI/i,
      /employment/i,
      /hiring/i
    ],
    responses: [
      "We're always looking for talented individuals to join our team! Check our website's Careers section for current openings or send your resume to careers@3bi.io.",
      "ƷBI values innovation and expertise. Visit our Careers page to see our current openings, or submit your resume to careers@3bi.io if you're interested in joining our team."
    ]
  },
  
  // Account specific information (requires auth)
  accountInfo: {
    patterns: [
      /my account/i,
      /account settings/i,
      /profile/i,
      /my subscription/i,
      /billing information/i
    ],
    responses: [
      "To access your account information, please log in to your dashboard. There you can view and update your profile, subscription details, and billing information.",
      "Your account settings, subscription details, and billing information can be managed through your personal dashboard after logging in."
    ],
    requiresAuth: true
  }
};

// Function to find a relevant response based on user input
export const findRelevantResponse = (
  userInput: string, 
  isAuthenticated: boolean = false
): string | undefined => {
  // Loop through knowledge categories
  for (const category in knowledgeBase) {
    const { patterns, responses, requiresAuth } = knowledgeBase[category];
    
    // Skip categories that require authentication if user is not authenticated
    if (requiresAuth && !isAuthenticated) continue;
    
    // Check if any pattern matches the user input
    if (patterns.some(pattern => pattern.test(userInput))) {
      // Return a random response from the matching category
      const randomIndex = Math.floor(Math.random() * responses.length);
      return responses[randomIndex];
    }
  }
  
  // Return undefined if no match is found
  return undefined;
};

// Suggested questions for quick responses
export const getSuggestedQuestions = (): string[] => {
  return [
    "What products do you offer?",
    "Request a demo",
    "How can I get started?"
  ];
};

// Export additional knowledge base functions as needed
export const getKnowledgeCategories = (): string[] => {
  return Object.keys(knowledgeBase);
};
