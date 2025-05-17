
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VisitorData, FormSubmissionData } from '@/types/tracking';
import VisitorCharts from './VisitorCharts';
import VisitorMetadataTable from './VisitorMetadataTable';
import FormSubmissionCharts from './FormSubmissionCharts';
import ChatInteractionsAnalytics from './ChatInteractionsAnalytics';
import DataPopulator from './DataPopulator';
import UpdateVisitorLocations from './UpdateVisitorLocations';

interface AnalyticsTabsProps {
  visitorData: VisitorData[];
  formData: FormSubmissionData[];
  chatData: any[];
  refetch: () => Promise<void>;
  realDataPercentage?: number;
}

const AnalyticsTabs: React.FC<AnalyticsTabsProps> = ({ 
  visitorData, 
  formData, 
  chatData, 
  refetch,
  realDataPercentage = 0
}) => {
  return (
    <Tabs defaultValue="charts" className="space-y-4">
      <div className="flex justify-between items-center border-b border-gray-700">
        <TabsList className="bg-gray-800/50 border border-gray-700">
          <TabsTrigger value="charts">Charts & Visualizations</TabsTrigger>
          <TabsTrigger value="visitors">Raw Visitor Data</TabsTrigger>
          <TabsTrigger value="forms">Form Submissions</TabsTrigger>
          <TabsTrigger value="chat">Chat Analytics</TabsTrigger>
          <TabsTrigger value="tools">Data Tools</TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value="charts" className="mt-0 space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <VisitorCharts visitorData={visitorData} />
          </div>
          <div className="lg:col-span-1">
            <UpdateVisitorLocations />
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="visitors" className="mt-0">
        <VisitorMetadataTable visitorData={visitorData} />
      </TabsContent>
      
      <TabsContent value="forms" className="mt-0">
        <FormSubmissionCharts formData={formData} />
      </TabsContent>
      
      <TabsContent value="chat" className="mt-0">
        <ChatInteractionsAnalytics chatData={chatData} />
      </TabsContent>
      
      <TabsContent value="tools" className="mt-0">
        <div className="grid grid-cols-1 gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DataPopulator />
            <UpdateVisitorLocations />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default AnalyticsTabs;
