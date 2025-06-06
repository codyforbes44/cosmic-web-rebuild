
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CloudLightning, Map, Calculator, LineChart, Users, Database, Zap, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface FeaturePreviewProps {
  featureName: string;
  onActivate: (feature: string, requiresAuth?: boolean) => void;
}

const FeaturePreview: React.FC<FeaturePreviewProps> = ({ featureName, onActivate }) => {
  const isPremium = featureName === "Custom API Access" || featureName === "AI Assistant";
  const isComingSoon = featureName === "User Accounts" || featureName === "Advanced Settings";
  
  const getFeatureIcon = () => {
    switch (featureName) {
      case "Weather Alerts": return <CloudLightning className="h-12 w-12 text-blue-400" />;
      case "Interactive Maps": return <Map className="h-12 w-12 text-green-400" />;
      case "Scientific Calculator": return <Calculator className="h-12 w-12 text-purple-400" />;
      case "Analytics Dashboard": return <LineChart className="h-12 w-12 text-orange-400" />;
      case "User Accounts": return <Users className="h-12 w-12 text-cyan-400" />;
      case "Custom API Access": return <Database className="h-12 w-12 text-red-400" />;
      case "AI Assistant": return <Zap className="h-12 w-12 text-yellow-400" />;
      case "Advanced Settings": return <Settings className="h-12 w-12 text-indigo-400" />;
      default: return null;
    }
  };
  
  const getFeatureDescription = () => {
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
      default: 
        return "Learn more about this powerful feature and how it can enhance your experience.";
    }
  };
  
  const getFeatureFeatures = () => {
    switch (featureName) {
      case "Weather Alerts":
        return [
          "Customizable alert thresholds",
          "Multiple notification methods",
          "Severe weather warnings",
          "Hourly forecast updates",
          "Historical alert tracking"
        ];
      case "Interactive Maps":
        return [
          "Real-time traffic information",
          "Custom route planning",
          "Points of interest search",
          "Satellite and street views",
          "Offline map downloads"
        ];
      case "Scientific Calculator":
        return [
          "Advanced mathematical functions",
          "Unit conversion capabilities",
          "Formula memory and history",
          "Customizable number formats",
          "Graph visualization options"
        ];
      case "Analytics Dashboard":
        return [
          "Customizable data reports",
          "Interactive data visualization",
          "Trend analysis tools",
          "Export capabilities",
          "Real-time data monitoring"
        ];
      case "User Accounts":
        return [
          "Cross-device synchronization",
          "Personalized dashboard",
          "Saved preferences",
          "History tracking",
          "Secure data storage"
        ];
      case "Custom API Access":
        return [
          "Authenticated API endpoints",
          "Comprehensive documentation",
          "Rate-limited access tiers",
          "Real-time data streaming",
          "Custom webhook triggers"
        ];
      case "AI Assistant":
        return [
          "Context-aware suggestions",
          "Natural language processing",
          "Predictive task completion",
          "Learning from your usage patterns",
          "Cross-tool functionality"
        ];
      case "Advanced Settings":
        return [
          "Tool-specific configurations",
          "Interface customization",
          "Performance optimization settings",
          "Data handling preferences",
          "Integration options"
        ];
      default:
        return ["Feature information not available"];
    }
  };

  return (
    <Card className="bg-space-deep-blue/60 border-gray-700 mb-12 mt-8">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            {getFeatureIcon()}
            <div>
              <CardTitle className="text-2xl text-white">{featureName}</CardTitle>
              <CardDescription className="text-gray-400 mt-1">
                Enhanced capabilities for your workflow
              </CardDescription>
            </div>
          </div>
          
          {isPremium && <Badge className="bg-brand-gold text-black">Premium</Badge>}
          {isComingSoon && <Badge className="bg-amber-700">Coming Soon</Badge>}
          {!isPremium && !isComingSoon && <Badge>Available Now</Badge>}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div className="md:col-span-2">
            <h3 className="text-white text-lg font-medium mb-2">About this Feature</h3>
            <p className="text-gray-300 mb-4">{getFeatureDescription()}</p>
            
            <h3 className="text-white text-lg font-medium mb-2">Key Capabilities</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {getFeatureFeatures().map((feature, index) => (
                <li key={index} className="flex items-center text-gray-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold mr-2"></div>
                  {feature}
                </li>
              ))}
            </ul>
            
            <div className="mt-6 flex gap-4">
              <Button 
                className="bg-brand-gold hover:bg-brand-gold/90 text-black"
                disabled={isComingSoon}
                onClick={() => onActivate(featureName, isPremium)}
              >
                {isPremium ? 'Upgrade to Access' : isComingSoon ? 'Coming Soon' : 'Activate Now'}
              </Button>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                    Learn More
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-space-deep-blue border-gray-700">
                  <DialogHeader>
                    <DialogTitle className="text-white flex items-center gap-2">
                      {getFeatureIcon()}
                      <span>{featureName} Details</span>
                    </DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Comprehensive information about this feature
                    </DialogDescription>
                  </DialogHeader>
                  <div className="text-gray-300 space-y-4">
                    <p>{getFeatureDescription()}</p>
                    <h4 className="text-white font-medium">Key Features</h4>
                    <ul className="space-y-1">
                      {getFeatureFeatures().map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-gold mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <p className="italic text-sm text-gray-400">
                      {isPremium ? 'This is a premium feature requiring subscription.' : 
                       isComingSoon ? 'This feature is currently in development and will be available soon.' : 
                       'This feature is included with your current plan.'}
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <div className="bg-black/30 rounded-lg p-4 border border-gray-700">
            <h3 className="text-white text-lg font-medium mb-4">Integration Options</h3>
            
            <div className="space-y-3">
              <div className="bg-black/20 p-3 rounded border border-gray-800">
                <h4 className="text-white font-medium">Standalone Access</h4>
                <p className="text-sm text-gray-400 mt-1">Use this feature independently through our platform interface.</p>
              </div>
              
              <div className="bg-black/20 p-3 rounded border border-gray-800">
                <h4 className="text-white font-medium">API Connection</h4>
                <p className="text-sm text-gray-400 mt-1">Connect to your systems via secure API endpoints.</p>
                {isPremium && <Badge className="bg-brand-gold text-black text-xs mt-2">Premium</Badge>}
              </div>
              
              <div className="bg-black/20 p-3 rounded border border-gray-800">
                <h4 className="text-white font-medium">Embed Option</h4>
                <p className="text-sm text-gray-400 mt-1">Add this feature directly to your website or application.</p>
                {isPremium && <Badge className="bg-brand-gold text-black text-xs mt-2">Premium</Badge>}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturePreview;
