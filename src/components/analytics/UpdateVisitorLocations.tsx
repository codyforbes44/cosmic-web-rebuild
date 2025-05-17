
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RefreshCw, MapPin, AlertCircle, Globe } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { VisitorData } from "@/types/tracking";
import { Badge } from "@/components/ui/badge";

const UpdateVisitorLocations: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processedCount, setProcessedCount] = useState(0);
  const [totalToProcess, setTotalToProcess] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Get location data from IP address
  const getLocationData = async (ipAddress: string | null): Promise<{ country_code?: string; city?: string; state?: string }> => {
    if (!ipAddress) return {};
    
    try {
      // Use a reliable IP geolocation service
      const response = await fetch(`https://ipapi.co/${ipAddress}/json/`);
      const data = await response.json();
      
      // Check if the API returned an error
      if (data.error) {
        console.error('Error in IP geolocation:', data.reason);
        return {};
      }
      
      return {
        country_code: data.country_code,
        city: data.city,
        state: data.region_code // This field contains state codes (e.g., "CA" for California)
      };
    } catch (err) {
      console.error('Error getting location data:', err);
      return {};
    }
  };

  const updateVisitorLocations = async () => {
    setIsProcessing(true);
    setProgress(0);
    setProcessedCount(0);
    setError(null);
    
    try {
      // Get visitors with IP addresses but missing location data
      const { data: visitors, error: fetchError } = await supabase
        .from('visitor_tracking')
        .select('*')
        .is('country_code', null)
        .not('ip_address', 'is', null);
      
      if (fetchError) throw fetchError;
      
      if (!visitors || visitors.length === 0) {
        toast({
          title: "No records to process",
          description: "All visitor records with IP addresses already have location data.",
          variant: "default"
        });
        setIsProcessing(false);
        return;
      }
      
      setTotalToProcess(visitors.length);
      toast({
        title: "Processing started",
        description: `Found ${visitors.length} records to update with location data.`,
        variant: "default"
      });
      
      // Process in batches to avoid rate limits
      const batchSize = 5;
      const totalBatches = Math.ceil(visitors.length / batchSize);
      
      for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
        const batchStart = batchIndex * batchSize;
        const batchEnd = Math.min((batchIndex + 1) * batchSize, visitors.length);
        const batch = visitors.slice(batchStart, batchEnd);
        
        // Process each visitor in the current batch
        const updates = await Promise.all(
          batch.map(async (visitor: VisitorData) => {
            // Skip if no IP address
            if (!visitor.ip_address) return null;
            
            // Get location data
            const locationData = await getLocationData(visitor.ip_address);
            
            // Update record
            if (locationData.country_code || locationData.city || locationData.state) {
              const { error: updateError } = await supabase
                .from('visitor_tracking')
                .update({
                  country_code: locationData.country_code,
                  city: locationData.city,
                  state: locationData.state
                })
                .eq('id', visitor.id);
              
              if (updateError) {
                console.error(`Error updating visitor ${visitor.id}:`, updateError);
                return null;
              }
              
              return visitor.id;
            }
            
            return null;
          })
        );
        
        // Update progress
        const successfulUpdates = updates.filter(id => id !== null).length;
        setProcessedCount(prev => prev + successfulUpdates);
        const newProgress = Math.round(((batchIndex + 1) * batchSize / visitors.length) * 100);
        setProgress(Math.min(newProgress, 100));
        
        // Add a small delay to avoid overwhelming the API
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      toast({
        title: "Processing completed",
        description: `Updated location data for ${processedCount} visitor records.`,
        variant: "default"
      });
    } catch (err: any) {
      setError(err.message || "An error occurred while processing location data");
      toast({
        title: "Error updating locations",
        description: err.message || "An error occurred while processing location data",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

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
        {error && (
          <div className="flex items-center gap-2 text-red-300 mb-4 p-2 bg-red-900/30 rounded-md border border-red-500/30">
            <AlertCircle className="h-4 w-4" />
            <p className="text-sm">{error}</p>
          </div>
        )}
        
        <div className="space-y-4">
          {isProcessing && (
            <div className="space-y-2">
              <Progress value={progress} className="h-2 bg-purple-800" indicatorClassName="bg-gradient-to-r from-yellow-400 to-amber-500" />
              <p className="text-sm text-purple-200">
                Processing {processedCount} of {totalToProcess} records ({progress}% complete)
              </p>
            </div>
          )}
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
