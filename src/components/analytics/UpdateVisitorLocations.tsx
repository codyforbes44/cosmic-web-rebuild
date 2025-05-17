
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { RefreshCw, MapPin, Globe } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
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
    <Card className="bg-gradient-to-br from-purple-900/70 to-indigo-900/70 border-purple-500/40 text-white">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-yellow-400" />
            Enhance Your Analytics With Real Data
          </CardTitle>
          <Badge variant="outline" className="bg-purple-600/50 text-yellow-200 border-yellow-400/30">
            Real Data
          </Badge>
        </div>
        <CardDescription className="text-purple-200">
          Enrich your analytics with accurate geographic location data based on visitor IP addresses
        </CardDescription>
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
          className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-purple-900 font-medium"
          size="lg"
        >
          {isProcessing ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Processing Real Location Data...
            </>
          ) : (
            <>
              <MapPin className="h-4 w-4 mr-2" />
              Analyze & Populate Real Location Data
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UpdateVisitorLocations;
