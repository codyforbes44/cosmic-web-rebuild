
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { AnalyticsData } from "@/hooks/use-analytics";
import AnalyticsCharts from "@/components/analytics/AnalyticsCharts";
import VisitorTable from "@/components/analytics/VisitorTable";

interface AnalyticsTabsProps {
  analyticsData: AnalyticsData;
  loading: boolean;
}

const AnalyticsTabs: React.FC<AnalyticsTabsProps> = ({ analyticsData, loading }) => {
  const { 
    visitorData, 
    dailyVisitors, 
    deviceData, 
    countryData, 
    sourceData 
  } = analyticsData;

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="bg-card/20 backdrop-blur-sm border-white/10 mb-6">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="visitors">Visitors</TabsTrigger>
        <TabsTrigger value="geography">Geography</TabsTrigger>
        <TabsTrigger value="sources">Sources</TabsTrigger>
        <TabsTrigger value="data">Raw Data</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview">
        <AnalyticsCharts 
          dailyVisitors={dailyVisitors} 
          deviceData={deviceData} 
          countryData={countryData}
          sourceData={sourceData}
          loading={loading}
        />
      </TabsContent>
      
      <TabsContent value="visitors">
        <Card className="bg-card/20 backdrop-blur-sm border-white/10">
          <CardContent className="pt-6">
            <VisitorTable 
              visitorData={visitorData.slice(0, 20)} 
              isLoading={loading} 
              simplified={true} 
            />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="geography">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnalyticsCharts 
            countryData={countryData}
            loading={loading}
            chartType="geography"
          />
        </div>
      </TabsContent>
      
      <TabsContent value="sources">
        <AnalyticsCharts
          sourceData={sourceData}
          loading={loading}
          chartType="sources" 
        />
      </TabsContent>
      
      <TabsContent value="data">
        <Card className="bg-card/20 backdrop-blur-sm border-white/10">
          <CardContent className="pt-6">
            <VisitorTable 
              visitorData={visitorData} 
              isLoading={loading} 
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default AnalyticsTabs;
