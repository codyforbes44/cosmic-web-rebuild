
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VisitorData, FormSubmissionData } from '@/types/tracking';
import VisitorCharts from './VisitorCharts';
import FormSubmissionCharts from './FormSubmissionCharts';
import VisitorMetadataTable from './VisitorMetadataTable';

interface AnalyticsTabsProps {
  visitorData: VisitorData[];
  formData: FormSubmissionData[];
}

const AnalyticsTabs: React.FC<AnalyticsTabsProps> = ({ visitorData, formData }) => {
  return (
    <Tabs defaultValue="visitors" className="mb-8">
      <TabsList className="bg-gray-800/50 border-gray-700">
        <TabsTrigger value="visitors">Visitors</TabsTrigger>
        <TabsTrigger value="forms">Form Submissions</TabsTrigger>
        <TabsTrigger value="metadata">Visitor Metadata</TabsTrigger>
      </TabsList>
      
      <TabsContent value="visitors" className="mt-6">
        <VisitorCharts visitorData={visitorData} />
      </TabsContent>
      
      <TabsContent value="forms" className="mt-6">
        <FormSubmissionCharts formData={formData} />
      </TabsContent>
      
      <TabsContent value="metadata" className="mt-6">
        <VisitorMetadataTable visitorData={visitorData} />
      </TabsContent>
    </Tabs>
  );
};

export default AnalyticsTabs;
