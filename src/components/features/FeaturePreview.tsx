
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FeatureIcon from './FeatureIcon';
import FeatureDescription from './FeatureDescription';
import FeatureCapabilities from './FeatureCapabilities';
import FeatureIntegration from './FeatureIntegration';
import FeatureDialog from './FeatureDialog';
import FeatureStatusBadge from './FeatureStatusBadge';

interface FeaturePreviewProps {
  featureName: string;
  onActivate: (feature: string, requiresAuth?: boolean) => void;
}

const FeaturePreview: React.FC<FeaturePreviewProps> = ({ featureName, onActivate }) => {
  // Determine feature status
  const isPremium = featureName === "Custom API Access" || featureName === "AI Assistant";
  const isComingSoon = featureName === "User Accounts" || featureName === "Advanced Settings";
  
  return (
    <Card className="bg-space-deep-blue/60 border-gray-700 mb-12 mt-8">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <FeatureIcon featureName={featureName} size="lg" />
            <div>
              <CardTitle className="text-2xl text-white">{featureName}</CardTitle>
              <CardDescription className="text-gray-400 mt-1">
                Enhanced capabilities for your workflow
              </CardDescription>
            </div>
          </div>
          
          <FeatureStatusBadge isPremium={isPremium} isComingSoon={isComingSoon} />
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div className="md:col-span-2">
            <h3 className="text-white text-lg font-medium mb-2">About this Feature</h3>
            <FeatureDescription featureName={featureName} className="mb-4" />
            
            <h3 className="text-white text-lg font-medium mb-2">Key Capabilities</h3>
            <FeatureCapabilities featureName={featureName} />
            
            <div className="mt-6 flex gap-4">
              <Button 
                className="bg-brand-gold hover:bg-brand-gold/90 text-black"
                disabled={isComingSoon}
                onClick={() => onActivate(featureName, isPremium)}
              >
                {isPremium ? 'Upgrade to Access' : isComingSoon ? 'Coming Soon' : 'Activate Now'}
              </Button>
              
              <FeatureDialog 
                featureName={featureName}
                isPremium={isPremium} 
                isComingSoon={isComingSoon}
              />
            </div>
          </div>
          
          <FeatureIntegration 
            featureName={featureName}
            isPremium={isPremium}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturePreview;
