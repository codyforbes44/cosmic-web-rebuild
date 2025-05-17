
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, RefreshCw } from 'lucide-react';
import { useDataPopulator } from '@/hooks/useDataPopulator';
import DataPopulatorStatus from './DataPopulatorStatus';
import { DataPopulatorProps } from '@/types/generatedData';

const DataPopulator: React.FC<DataPopulatorProps> = ({ className }) => {
  const { isProcessing, progress, processedCount, error, populateData } = useDataPopulator();

  return (
    <Card className={`bg-gray-800/50 border-gray-700 text-white mb-6 ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Analytics Data Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DataPopulatorStatus
          isProcessing={isProcessing}
          progress={progress}
          processedCount={processedCount}
          error={error}
        />
        
        <div className="space-y-4">
          <Button 
            onClick={populateData} 
            disabled={isProcessing}
            className="w-full"
            variant="destructive"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Generating Sample Data...
              </>
            ) : (
              <>
                <Database className="h-4 w-4 mr-2" />
                Reset & Populate Analytics Data
              </>
            )}
          </Button>
          <p className="text-xs text-gray-500 text-center">
            Warning: This will clear existing analytics data and replace it with sample data
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataPopulator;
