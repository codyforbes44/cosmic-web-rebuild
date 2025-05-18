
import React from "react";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { useAnalytics } from "@/hooks/use-analytics";
import OverviewCards from "@/components/analytics/OverviewCards";
import AnalyticsTabs from "@/components/analytics/AnalyticsTabs";

const Analytics: React.FC = () => {
  const { data, loading, error } = useAnalytics();
  
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
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Analytics Dashboard</h1>
            <p className="text-gray-400">Visitor insights and website performance metrics</p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
            </div>
          ) : error ? (
            <Card className="bg-card/20 backdrop-blur-sm border-red-500/50">
              <CardContent className="pt-6">
                <p className="text-red-400">{error}</p>
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
            </>
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Analytics;
