
import React from 'react';
import { 
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormSubmissionData } from '@/types/tracking';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

interface FormSubmissionChartsProps {
  formData: FormSubmissionData[];
}

const FormSubmissionCharts: React.FC<FormSubmissionChartsProps> = ({ formData }) => {
  // Process form data
  const formTypeData = formData.reduce((acc, form) => {
    const formType = form.form_name;
    const existing = acc.find(item => item.name === formType);
    
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: formType, value: 1 });
    }
    
    return acc;
  }, [] as Array<{ name: string; value: number }>);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-gray-800/50 border-gray-700 text-white">
        <CardHeader>
          <CardTitle>Form Types</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={formTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {formTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1E293B', color: '#fff', border: 'none' }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card className="bg-gray-800/50 border-gray-700 text-white">
        <CardHeader>
          <CardTitle>Recent Submissions</CardTitle>
        </CardHeader>
        <CardContent className="max-h-96 overflow-auto">
          <div className="space-y-4">
            {formData.length === 0 ? (
              <p className="text-gray-400 text-center py-4">No form submissions available</p>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {formData.map((submission, index) => (
                  <AccordionItem key={index} value={`submission-${index}`} className="border-b border-gray-700">
                    <AccordionTrigger className="py-4 hover:bg-gray-700/30 rounded-lg px-4">
                      <div className="flex flex-col items-start text-left">
                        <span className="font-medium text-accent">{submission.form_name}</span>
                        <span className="text-sm text-gray-400 mt-1">
                          {new Date(submission.created_at).toLocaleString()}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="grid grid-cols-1 gap-2 bg-gray-700/20 p-3 rounded-md">
                        <div className="grid grid-cols-3 gap-2">
                          <div className="text-gray-400">Session ID:</div>
                          <div className="col-span-2 font-mono text-sm break-all">{submission.session_id}</div>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="text-gray-400">Path:</div>
                          <div className="col-span-2">{submission.path}</div>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="text-gray-400">Date:</div>
                          <div className="col-span-2">{new Date(submission.created_at).toLocaleString()}</div>
                        </div>
                        
                        <div className="mt-3 pt-3 border-t border-gray-700">
                          <div className="text-gray-400 mb-2 font-medium">Form Data:</div>
                          {submission.form_data && typeof submission.form_data === 'object' ? (
                            Object.entries(submission.form_data).map(([key, value]) => (
                              <div key={key} className="grid grid-cols-3 gap-2 mb-2">
                                <div className="text-gray-400 capitalize">{key.replace(/_/g, ' ')}:</div>
                                <div className="col-span-2 break-all">
                                  {typeof value === 'boolean' 
                                    ? value ? 'Yes' : 'No'
                                    : typeof value === 'object' 
                                      ? JSON.stringify(value)
                                      : String(value)
                                  }
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-gray-400">No structured data available</div>
                          )}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormSubmissionCharts;
