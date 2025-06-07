
import React from "react";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, TestTube, Calendar } from "lucide-react";
import { useAnalytics } from "@/hooks/use-analytics";
import OverviewCards from "@/components/analytics/OverviewCards";
import AnalyticsTabs from "@/components/analytics/AnalyticsTabs";
import FormSubmissionsCard from "@/components/analytics/FormSubmissionsCard";
import { trackVisitor } from "@/utils/visitorTracking";
import { toast } from "@/hooks/use-toast";

const Analytics: React.FC = () => {
  const { data, loading, error } = useAnalytics();
  
  console.log('Analytics page state:', { data: !!data, loading, error });
  
  const handleRefresh = () => {
    window.location.reload();
  };
  
  const handleTestTracking = async () => {
    console.log('Manual tracking test initiated');
    await trackVisitor();
    toast({
      title: "Tracking Test",
      description: "Manual visitor tracking triggered. Check console for details.",
      duration: 3000,
    });
  };
  
  return (
    <>
      <SEO
        title="Analytics Dashboard | ƷBI"
        description="90-day visitor analytics and insights for ƷBI website"
        keywords="analytics, visitor data, website metrics, ƷBI"
      />
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-space-dark-blue to-space-deep-blue py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Breadcrumb navigation */}
          <BreadcrumbNav currentPageLabel="Analytics Dashboard" />
          
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Analytics Dashboard</h1>
              <p className="text-gray-400 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                90-day historical visitor insights and website performance metrics (up to 10,000 records)
              </p>
            </div>
            <div className="flex gap-2">
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
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
              <p className="ml-4 text-white">Loading 90 days of analytics data...</p>
            </div>
          ) : error ? (
            <Card className="bg-card/20 backdrop-blur-sm border-red-500/50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-red-400 mb-2">Analytics Error</h3>
                  <p className="text-red-300 mb-4">{error}</p>
                  <p className="text-gray-400 text-sm mb-4">
                    This could be due to database connectivity or permission issues.
                  </p>
                  <Button 
                    onClick={handleRefresh}
                    variant="outline"
                    size="sm"
                    className="bg-transparent border-red-500/50 text-red-300 hover:bg-red-500/10 focus:ring-2 focus:ring-red-500"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : data ? (
            <>
              <OverviewCards 
                totalVisitors={data.totalVisitors} 
                totalCountries={data.totalCountries} 
                avgTimeOnPage={data.avgTimeOnPage} 
                topPage={data.topPage} 
              />
              
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
                      <p className="text-gray-400 text-sm mb-4">
                        Visit different pages of your website to start collecting analytics data, or use the "Test Tracking" button above to manually trigger tracking.
                      </p>
                      <Button 
                        onClick={handleTestTracking}
                        variant="outline"
                        size="sm"
                        className="bg-transparent border-yellow-500/50 text-yellow-300 hover:bg-yellow-500/10 focus:ring-2 focus:ring-yellow-500"
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
            <Card className="bg-card/20 backdrop-blur-sm border-white/10">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-gray-400">No 90-day analytics data available</p>
                  <Button 
                    onClick={handleRefresh}
                    variant="outline"
                    size="sm"
                    className="mt-4 bg-transparent border-white/20 text-white hover:bg-white/10 focus:ring-2 focus:ring-accent"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Check Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Analytics;
