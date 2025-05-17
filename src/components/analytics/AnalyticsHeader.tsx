
import React from 'react';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const AnalyticsHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white">Analytics Dashboard</h1>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <Info className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Data from the last 500 visitor sessions (excluding Lovable visits)</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default AnalyticsHeader;
