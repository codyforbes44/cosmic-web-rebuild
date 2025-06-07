
import React from 'react';

interface FeatureDescriptionProps {
  featureName: string;
  className?: string;
}

const FeatureDescription: React.FC<FeatureDescriptionProps> = ({ featureName, className = "" }) => {
  const getDescription = () => {
    switch (featureName) {
      case "Weather Alerts": 
        return "Stay ahead of severe weather with real-time alerts tailored to your locations. Our weather alert system monitors conditions 24/7 and notifies you about critical changes that might affect your plans or safety.";
      case "Interactive Maps": 
        return "Explore detailed maps with layers of information including traffic, points of interest, and custom routes. Plan journeys with turn-by-turn directions and discover new places with our comprehensive mapping system.";
      case "Scientific Calculator": 
        return "Perform complex calculations with our advanced scientific calculator. From basic arithmetic to advanced trigonometric and logarithmic functions, this tool is perfect for students, professionals, and anyone needing reliable calculations.";
      case "Analytics Dashboard": 
        return "Gain insights into your business performance with customizable charts, reports, and data visualizations. Track key metrics, identify trends, and make data-driven decisions with our comprehensive analytics platform.";
      case "User Accounts": 
        return "Create a personalized experience by saving preferences, history, and custom settings across all our tools. Synchronize your work across multiple devices and access your data securely from anywhere.";
      case "Custom API Access": 
        return "Connect our platform's capabilities to your own systems with secure API endpoints. Retrieve data, trigger actions, and build custom integrations that extend the functionality of our tools to match your unique workflow needs.";
      case "AI Assistant": 
        return "Get intelligent help as you work with contextual suggestions, automated workflows, and predictive assistance. Our AI understands your goals and provides relevant insights to help you work more efficiently.";
      case "Advanced Settings": 
        return "Fine-tune your experience with detailed configuration options for all our tools. Customize the behavior, appearance, and functionality to match your exact preferences and workflow requirements.";
      case "OpenAI Assistant":
        return "Access cutting-edge AI capabilities with our OpenAI integration. Chat with advanced language models like GPT-4o, customize system prompts, and adjust parameters for optimal responses tailored to your specific needs.";
      case "Hugging Face Models":
        return "Explore the vast ecosystem of open-source AI models from Hugging Face. Test different models for text generation, image processing, sentiment analysis, and more, all within our unified interface.";
      case "Smart Notifications":
        return "Receive intelligent, context-aware notifications that learn from your behavior and preferences. Our AI-powered system ensures you only get alerts that matter, when they matter most.";
      case "Theme Customization":
        return "Personalize your workspace with custom themes and visual preferences. Create color schemes that match your brand, adjust layouts for optimal productivity, and save multiple theme configurations.";
      case "Advanced Security":
        return "Protect your data with enterprise-grade security features including two-factor authentication, encrypted data transmission, audit logs, and compliance reporting for regulated industries.";
      case "Global CDN":
        return "Accelerate your applications worldwide with our global content delivery network. Reduce latency, improve performance, and ensure reliable access to your tools from anywhere in the world.";
      default: 
        return "Learn more about this powerful feature and how it can enhance your experience.";
    }
  };
  
  return (
    <p className={`text-gray-300 ${className}`}>{getDescription()}</p>
  );
};

export default FeatureDescription;
