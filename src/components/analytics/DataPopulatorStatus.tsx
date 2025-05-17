
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface DataPopulatorStatusProps {
  isProcessing: boolean;
  progress: number;
  processedCount: number;
  error: string | null;
}

const DataPopulatorStatus: React.FC<DataPopulatorStatusProps> = ({ 
  isProcessing, 
  progress, 
  processedCount, 
  error 
}) => {
  return (
    <div className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 text-red-400 mb-4 p-2 bg-red-900/20 rounded-md">
          <AlertCircle className="h-4 w-4" />
          <p className="text-sm">{error}</p>
        </div>
      )}
      
      {isProcessing && (
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-gray-400">
            Processing {processedCount} of 180 records ({progress}% complete)
          </p>
        </div>
      )}
    </div>
  );
};

export default DataPopulatorStatus;
