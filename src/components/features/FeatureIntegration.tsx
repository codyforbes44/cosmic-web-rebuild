
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface FeatureIntegrationProps {
  featureName: string;
  isPremium: boolean;
  className?: string;
}

const FeatureIntegration: React.FC<FeatureIntegrationProps> = ({ featureName, isPremium, className = "" }) => {
  return (
    <div className={`bg-black/30 rounded-lg p-4 border border-gray-700 ${className}`}>
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
  );
};

export default FeatureIntegration;
