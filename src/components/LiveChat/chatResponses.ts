
// Collection of predefined responses for the chatbot
// These are used as fallbacks or for specific scenarios

// Welcome messages when chat is first opened
export const welcomeMessages = [
  "👋 Welcome to ƷBI! How can I help you today?",
  "Hello! Thanks for reaching out to ƷBI. What can I assist you with?",
  "Welcome to ƷBI's support chat. How may I assist you?"
];

// Responses for when the user asks about products
export const productResponses = {
  "3bi-connect": "Our 3BI Connect platform helps trucking companies retain drivers through comprehensive driver management tools, communication features, and data analytics.",
  "carrier-partner-network": "The Carrier Partner Network connects trucking companies with qualified drivers, streamlining the hiring process and improving match quality.",
  "truckonboard": "TruckOnboard is our digital onboarding solution that simplifies paperwork, ensures compliance, and provides a smooth start for new drivers.",
  "drivers-matter": "Drivers Matter is our advocacy platform focused on improving working conditions for commercial truck drivers through resources, support, and community."
};

// Responses for when the user asks about services
export const serviceResponses = {
  "strategy": "Our Strategic Consulting service helps align your technology investments with your business objectives and create a roadmap for implementation.",
  "recruitment": "Our Recruitment Marketing services help trucking companies attract qualified drivers through targeted campaigns and industry-specific strategies.",
  "digital": "Our Digital Marketing solutions help increase your online presence, generate leads, and improve conversion rates for trucking businesses.",
  "social": "We provide comprehensive Social Media Marketing services tailored for trucking companies, building your brand and engaging with your audience.",
  "custom": "Our Custom Development team creates tailored solutions specific to your trucking company's unique needs and workflow requirements.",
  "web": "We develop modern, responsive web and mobile applications that enhance your operations and provide a seamless user experience.",
  "analytics": "Our Data Analytics services turn your operational data into actionable insights to improve efficiency and decision-making.",
  "ai": "We implement AI & Machine Learning solutions that can predict maintenance needs, optimize routes, and automate routine tasks."
};

// Responses when the user is asking for help or is confused
export const helpResponses = [
  "I can help you learn about our products, services, or company. What would you like to know?",
  "Not sure where to start? You can ask about our enterprise software solutions, services, or how to get a demo.",
  "I'm here to assist with information about ƷBI's offerings. Would you like to know about our products, services, or how to contact our team?"
];

// Responses for when the chat doesn't understand the user's input
export const fallbackResponses = [
  "I'm not sure I understand. Could you rephrase your question?",
  "I don't have specific information about that. Could you ask about our products, services, or company information?",
  "I'm still learning! To best assist you, please ask about ƷBI's products, services, or how to get in touch with our team.",
  "I'm not able to help with that specific request. Would you like information about our products or services instead?"
];

// Closing messages
export const closingResponses = [
  "Is there anything else I can help you with today?",
  "Do you have any other questions about ƷBI's products or services?",
  "Is there something else you'd like to know about our solutions?"
];

// Thank you responses
export const thankYouResponses = [
  "You're welcome! If you have any more questions, feel free to ask.",
  "Happy to help! Let me know if you need anything else.",
  "My pleasure! Don't hesitate to reach out if you have more questions."
];
