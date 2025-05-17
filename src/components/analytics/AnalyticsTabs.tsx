
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VisitorData, FormSubmissionData } from '@/types/tracking';
import VisitorCharts from './VisitorCharts';
import FormSubmissionCharts from './FormSubmissionCharts';
import VisitorMetadataTable from './VisitorMetadataTable';
import UpdateVisitorLocations from './UpdateVisitorLocations';
import ChatInteractionsAnalytics from './ChatInteractionsAnalytics';
import ChatbotIconSelector from './ChatbotIconSelector';

interface AnalyticsTabsProps {
  visitorData: VisitorData[];
  formData: FormSubmissionData[];
  chatData: any[]; // Chat interaction data
  refetch: () => Promise<void>;
}

const AnalyticsTabs: React.FC<AnalyticsTabsProps> = ({ visitorData, formData, chatData, refetch }) => {
  return (
    <Tabs defaultValue="visitors" className="mb-8">
      <TabsList className="bg-gray-800/50 border-gray-700">
        <TabsTrigger value="visitors">Visitors</TabsTrigger>
        <TabsTrigger value="forms">Form Submissions</TabsTrigger>
        <TabsTrigger value="chat">Chat Interactions</TabsTrigger>
        <TabsTrigger value="metadata">Visitor Metadata</TabsTrigger>
        <TabsTrigger value="settings">Chat Settings</TabsTrigger>
      </TabsList>
      
      <TabsContent value="visitors" className="mt-6">
        <VisitorCharts visitorData={visitorData} />
      </TabsContent>
      
      <TabsContent value="forms" className="mt-6">
        <FormSubmissionCharts formData={formData} />
      </TabsContent>
      
      <TabsContent value="chat" className="mt-6">
        <ChatInteractionsAnalytics chatData={chatData} />
      </TabsContent>
      
      <TabsContent value="metadata" className="mt-6">
        <div className="space-y-6">
          <UpdateVisitorLocations />
          <VisitorMetadataTable visitorData={visitorData} />
        </div>
      </TabsContent>
      
      <TabsContent value="settings" className="mt-6">
        <div className="space-y-6">
          <ChatbotIconSelector refetchAnalytics={refetch} />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default AnalyticsTabs;
