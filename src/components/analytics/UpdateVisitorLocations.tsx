
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { RefreshCw, MapPin } from 'lucide-react';
import { useLocationUpdater } from '@/hooks/useLocationUpdater';
import ErrorMessage from './ErrorMessage';
import ProcessingProgress from './ProcessingProgress';

const UpdateVisitorLocations: React.FC = () => {
  const {
    isProcessing,
    progress,
    processedCount,
    totalToProcess,
    error,
    updateVisitorLocations
  } = useLocationUpdater();

  return (
    <Card className="bg-gray-800/50 border-gray-700 text-white">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Update Visitor Locations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ErrorMessage error={error} />
        
        <div className="space-y-4">
          <ProcessingProgress 
            isProcessing={isProcessing}
            progress={progress}
            processedCount={processedCount}
            totalToProcess={totalToProcess}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={updateVisitorLocations} 
          disabled={isProcessing}
          className="w-full"
        >
          {isProcessing ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Processing Location Data...
            </>
          ) : (
            <>
              <MapPin className="h-4 w-4 mr-2" />
              Update Visitor Locations
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UpdateVisitorLocations;
