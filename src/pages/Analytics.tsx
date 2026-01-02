import React from 'react';
import StandardPageLayout from '@/layouts/StandardPageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, TestTube, Calendar, BarChart3 } from 'lucide-react';
import { useAnalytics } from '@/hooks/use-analytics';
import AnalyticsTabs from '@/components/analytics/AnalyticsTabs';
import FormSubmissionsCard from '@/components/analytics/FormSubmissionsCard';
import { trackVisitor } from '@/utils/visitorTracking';
import { toast } from '@/hooks/use-toast';
import UnifiedLoading from '@/components/ui/UnifiedLoading';
import { QueryErrorBoundary } from '@/components/ui/QueryErrorBoundary';

const Analytics: React.FC = () => {
  const { data, loading, error } = useAnalytics();
  
  const handleRefresh = () => {
    window.location.reload();
  };
  
  const handleTestTracking = async () => {
    await trackVisitor();
    toast({
      title: "Tracking Test",
      description: "Manual visitor tracking triggered. Check console for details.",
      duration: 3000,
    });
  };
  
  return (
    <QueryErrorBoundary
      fallbackTitle="Analytics Error"
      fallbackDescription="Failed to load analytics data. Please try again."
    >
      <StandardPageLayout
        seo={{
          title: "Analytics Dashboard | ƷBI",
          description: "90-day visitor analytics and insights for ƷBI website",
          keywords: "analytics, visitor data, website metrics, ƷBI"
        }}
        breadcrumb={{ label: "Analytics Dashboard" }}
        header={{
          title: "Analytics Dashboard",
          description: "90-day historical visitor insights and website performance metrics",
          icon: BarChart3
        }}
      >
      {/* Action buttons */}
      <div className="flex justify-end gap-2 mb-8">
        <Button 
          onClick={handleTestTracking}
          variant="outline"
          size="sm"
          className="bg-transparent border-accent/50 text-accent hover:bg-accent-hover/10 focus:ring-2 focus:ring-accent"
        >
          <TestTube className="w-4 h-4 mr-2" />
          Test Tracking
        </Button>
        <Button 
          onClick={handleRefresh}
          variant="outline"
          size="sm"
          className="bg-transparent border-white/20 text-white hover:bg-white/10 focus:ring-2 focus:ring-accent"
          disabled={loading}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh Data
        </Button>
      </div>
      
      {loading ? (
        <UnifiedLoading 
          variant="spinner" 
          size="lg" 
          message="Loading 90 days of analytics data..." 
        />
      ) : error ? (
        <Card className="bg-card/20 backdrop-blur-sm border-destructive/50">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-destructive mb-2">Analytics Error</h3>
              <p className="text-destructive/80 mb-4">{error}</p>
              <p className="text-muted-foreground text-sm mb-4">
                This could be due to database connectivity or permission issues.
              </p>
              <Button 
                onClick={handleRefresh}
                variant="outline"
                size="sm"
                className="bg-transparent border-destructive/50 text-destructive hover:bg-destructive/10"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : data ? (
        <>
          {/* Form Submissions Section */}
          <div className="mb-8">
            <FormSubmissionsCard />
          </div>
          
          <AnalyticsTabs 
            analyticsData={data} 
            loading={loading} 
          />
          
          {data.totalVisitors === 0 && (
            <Card className="bg-card/20 backdrop-blur-sm border-yellow-500/50 mt-6">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-yellow-400 mb-2">No Historical Data Found</h3>
                  <p className="text-yellow-300 mb-2">
                    No visitor data has been collected in the last 90 days.
                  </p>
                  <p className="text-muted-foreground text-sm mb-4">
                    Visit different pages of your website to start collecting analytics data, or use the "Test Tracking" button above to manually trigger tracking.
                  </p>
                  <Button 
                    onClick={handleTestTracking}
                    variant="outline"
                    size="sm"
                    className="bg-transparent border-yellow-500/50 text-yellow-300 hover:bg-yellow-500/10"
                  >
                    <TestTube className="w-4 h-4 mr-2" />
                    Test Visitor Tracking
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        <Card className="bg-card/20 backdrop-blur-sm border-border">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-muted-foreground">No 90-day analytics data available</p>
              <Button 
                onClick={handleRefresh}
                variant="outline"
                size="sm"
                className="mt-4 bg-transparent border-border text-foreground hover:bg-muted"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Check Again
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      </StandardPageLayout>
    </QueryErrorBoundary>
  );
};

export default Analytics;
