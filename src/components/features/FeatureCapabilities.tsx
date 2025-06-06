
import React from 'react';

interface FeatureCapabilitiesProps {
  featureName: string;
  className?: string;
}

const FeatureCapabilities: React.FC<FeatureCapabilitiesProps> = ({ featureName, className = "" }) => {
  const getFeatureCapabilities = () => {
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
    <ul className={`grid grid-cols-1 sm:grid-cols-2 gap-2 ${className}`}>
      {getFeatureCapabilities().map((capability, index) => (
        <li key={index} className="flex items-center text-gray-300">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-gold mr-2"></div>
          {capability}
        </li>
      ))}
    </ul>
  );
};

export default FeatureCapabilities;
