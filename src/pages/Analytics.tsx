
import React from "react";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useAnalytics } from "@/hooks/use-analytics";
import OverviewCards from "@/components/analytics/OverviewCards";
import AnalyticsTabs from "@/components/analytics/AnalyticsTabs";

const Analytics: React.FC = () => {
  const { data, loading, error } = useAnalytics();
  
  console.log('Analytics page state:', { data: !!data, loading, error });
  
  const handleRefresh = () => {
    window.location.reload();
  };
  
  return (
    <>
      <SEO
        title="Analytics Dashboard | ƷBI"
        description="Visitor analytics and insights for ƷBI website"
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
              <p className="text-gray-400">Historical visitor insights and website performance metrics</p>
            </div>
            <Button 
              onClick={handleRefresh}
              variant="outline"
              size="sm"
              className="bg-transparent border-white/20 text-white hover:bg-white/10"
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh Data
            </Button>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
              <p className="ml-4 text-white">Loading historical analytics data...</p>
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
                    className="bg-transparent border-red-500/50 text-red-300 hover:bg-red-500/10"
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
                        No visitor data has been collected yet.
                      </p>
                      <p className="text-gray-400 text-sm">
                        Visit different pages of your website to start collecting analytics data, or check if the visitor tracking is properly configured.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <Card className="bg-card/20 backdrop-blur-sm border-white/10">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-gray-400">No historical analytics data available</p>
                  <Button 
                    onClick={handleRefresh}
                    variant="outline"
                    size="sm"
                    className="mt-4 bg-transparent border-white/20 text-white hover:bg-white/10"
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
