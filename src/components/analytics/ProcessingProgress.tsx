
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface ProcessingProgressProps {
  isProcessing: boolean;
  progress: number;
  processedCount: number;
  totalToProcess: number;
}

const ProcessingProgress: React.FC<ProcessingProgressProps> = ({ 
  isProcessing,
  progress,
  processedCount,
  totalToProcess 
}) => {
  if (!isProcessing) return null;
  
  return (
    <div className="space-y-2">
      <Progress 
        value={progress} 
        className="h-2 bg-purple-800"
        indicatorClassName="bg-gradient-to-r from-yellow-400 to-amber-500" 
      />
      <p className="text-sm text-purple-200">
        Processing {processedCount} of {totalToProcess} records ({progress}% complete)
      </p>
    </div>
  );
};

export default ProcessingProgress;
