
import React from 'react';
import { CloudLightning, Map, Calculator, LineChart, Users, Database, Zap, Settings, Brain, Robot, MessageSquare, Palette, Shield, Globe } from "lucide-react";

interface FeatureIconProps {
  featureName: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const FeatureIcon: React.FC<FeatureIconProps> = ({ featureName, size = "md", className = "" }) => {
  // Determine icon size based on prop
  const iconSize = size === "sm" ? "h-8 w-8" : size === "lg" ? "h-12 w-12" : "h-8 w-8";
  
  // Get the appropriate icon component based on feature name
  const getIcon = () => {
    switch (featureName) {
      case "Weather Alerts": return <CloudLightning className={`${iconSize} text-blue-400 ${className}`} />;
      case "Interactive Maps": return <Map className={`${iconSize} text-green-400 ${className}`} />;
      case "Scientific Calculator": return <Calculator className={`${iconSize} text-purple-400 ${className}`} />;
      case "Analytics Dashboard": return <LineChart className={`${iconSize} text-orange-400 ${className}`} />;
      case "User Accounts": return <Users className={`${iconSize} text-cyan-400 ${className}`} />;
      case "Custom API Access": return <Database className={`${iconSize} text-red-400 ${className}`} />;
      case "AI Assistant": return <Zap className={`${iconSize} text-yellow-400 ${className}`} />;
      case "Advanced Settings": return <Settings className={`${iconSize} text-indigo-400 ${className}`} />;
      case "OpenAI Assistant": return <Brain className={`${iconSize} text-blue-400 ${className}`} />;
      case "Hugging Face Models": return <Robot className={`${iconSize} text-orange-400 ${className}`} />;
      case "Smart Notifications": return <MessageSquare className={`${iconSize} text-green-400 ${className}`} />;
      case "Theme Customization": return <Palette className={`${iconSize} text-purple-400 ${className}`} />;
      case "Advanced Security": return <Shield className={`${iconSize} text-red-400 ${className}`} />;
      case "Global CDN": return <Globe className={`${iconSize} text-cyan-400 ${className}`} />;
      default: return null;
    }
  };
  
  return getIcon();
};

export default FeatureIcon;
