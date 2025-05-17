
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { VisitorData, FormSubmissionData } from '@/types/tracking';

interface AnalyticsSummaryCardsProps {
  visitorData: VisitorData[];
  formData: FormSubmissionData[];
}

const AnalyticsSummaryCards: React.FC<AnalyticsSummaryCardsProps> = ({ visitorData, formData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="bg-gray-800/50 border-gray-700 text-white">
        <CardHeader>
          <CardTitle>Total Visitors</CardTitle>
          <CardDescription className="text-gray-400">Unique sessions tracked</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{new Set(visitorData.map(v => v.session_id)).size}</p>
        </CardContent>
      </Card>
      
      <Card className="bg-gray-800/50 border-gray-700 text-white">
        <CardHeader>
          <CardTitle>Form Submissions</CardTitle>
          <CardDescription className="text-gray-400">Total forms submitted</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{formData.length}</p>
        </CardContent>
      </Card>
      
      <Card className="bg-gray-800/50 border-gray-700 text-white">
        <CardHeader>
          <CardTitle>Page Views</CardTitle>
          <CardDescription className="text-gray-400">Total page visits</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{visitorData.length}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsSummaryCards;
