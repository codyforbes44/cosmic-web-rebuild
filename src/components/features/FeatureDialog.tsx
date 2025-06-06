
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FeatureIcon from './FeatureIcon';
import FeatureDescription from './FeatureDescription';
import FeatureCapabilities from './FeatureCapabilities';
import { Badge } from "@/components/ui/badge";

interface FeatureDialogProps {
  featureName: string;
  isPremium: boolean;
  isComingSoon: boolean;
}

const FeatureDialog: React.FC<FeatureDialogProps> = ({ featureName, isPremium, isComingSoon }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
          Learn More
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-space-deep-blue border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <FeatureIcon featureName={featureName} size="sm" />
            <span>{featureName} Details</span>
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Comprehensive information about this feature
          </DialogDescription>
        </DialogHeader>
        <div className="text-gray-300 space-y-4">
          <FeatureDescription featureName={featureName} />
          <h4 className="text-white font-medium">Key Features</h4>
          <FeatureCapabilities featureName={featureName} />
          <p className="italic text-sm text-gray-400">
            {isPremium ? 'This is a premium feature requiring subscription.' : 
             isComingSoon ? 'This feature is currently in development and will be available soon.' : 
             'This feature is included with your current plan.'}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeatureDialog;
