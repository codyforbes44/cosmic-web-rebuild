
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
}

const AnalyticsTabs: React.FC<AnalyticsTabsProps> = ({ 
  visitorData, 
  formData, 
  chatData, 
  refetch
}) => {
  return (
    <Tabs defaultValue="charts" className="space-y-4">
      <div className="flex justify-between items-center border-b border-gray-700">
        <TabsList className="bg-gray-800/50 border border-gray-700">
          <TabsTrigger value="charts">Charts & Visualizations</TabsTrigger>
          <TabsTrigger value="visitors">Raw Visitor Data</TabsTrigger>
          <TabsTrigger value="forms">Form Submissions</TabsTrigger>
          <TabsTrigger value="chat">Chat Analytics</TabsTrigger>
          <TabsTrigger value="tools">Data Management</TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value="charts" className="mt-0 space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          <VisitorCharts visitorData={visitorData} />
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
