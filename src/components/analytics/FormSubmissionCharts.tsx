
import React from 'react';
import { 
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FormSubmissionData } from '@/types/tracking';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

interface FormSubmissionChartsProps {
  formData: FormSubmissionData[];
}

const FormSubmissionCharts: React.FC<FormSubmissionChartsProps> = ({ formData }) => {
  // Process form data for pie chart
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

  // Process submission time data for time series visualization
  const prepareTimeSeriesData = () => {
    // Create a map to store submissions by day
    const submissionsByDate = new Map();
    
    // Get dates for the last 14 days
    const dates = [];
    for (let i = 13; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      dates.push(dateString);
      submissionsByDate.set(dateString, { date: dateString, count: 0 });
    }
    
    // Count submissions for each day
    formData.forEach(submission => {
      const submissionDate = new Date(submission.created_at).toISOString().split('T')[0];
      if (submissionsByDate.has(submissionDate)) {
        const dayData = submissionsByDate.get(submissionDate);
        dayData.count += 1;
        submissionsByDate.set(submissionDate, dayData);
      }
    });
    
    // Convert map to array
    return Array.from(submissionsByDate.values());
  };
  
  // Process form fields completion data
  const prepareFormFieldsData = () => {
    const fieldCounts: Record<string, number> = {};
    
    formData.forEach(submission => {
      if (submission.form_data && typeof submission.form_data === 'object') {
        Object.keys(submission.form_data).forEach(key => {
          if (!fieldCounts[key]) {
            fieldCounts[key] = 0;
          }
          fieldCounts[key] += 1;
        });
      }
    });
    
    return Object.entries(fieldCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8)
      .map(item => ({ name: item.name.replace(/_/g, ' '), value: item.value }));
  };
  
  // Prepare data for different visualizations
  const timeSeriesData = prepareTimeSeriesData();
  const formFieldsData = prepareFormFieldsData();

  return (
    <div className="space-y-6">
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
                  label={({ name, percent }) => `${name}: ${(Number(percent) * 100).toFixed(0)}%`}
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
            <CardTitle>Form Submissions Over Time</CardTitle>
            <CardDescription className="text-gray-400">Last 14 days</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={timeSeriesData}
                margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis 
                  dataKey="date" 
                  stroke="#aaa"
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return `${date.getMonth() + 1}/${date.getDate()}`;
                  }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis stroke="#aaa" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1E293B', color: '#fff', border: 'none' }}
                  formatter={(value) => [`${value} submissions`, 'Count']}
                  labelFormatter={(label) => {
                    const date = new Date(label);
                    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#8884d8" 
                  strokeWidth={2} 
                  name="Submissions"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800/50 border-gray-700 text-white">
          <CardHeader>
            <CardTitle>Most Common Form Fields</CardTitle>
            <CardDescription className="text-gray-400">Field usage across all submissions</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={formFieldsData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis type="number" stroke="#aaa" />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke="#aaa" 
                  width={100}
                  tickFormatter={(value) => {
                    return value.length > 15 ? value.substring(0, 15) + '...' : value;
                  }}
                />
                <Tooltip contentStyle={{ backgroundColor: '#1E293B', color: '#fff', border: 'none' }} />
                <Bar 
                  dataKey="value" 
                  name="Field Count" 
                  fill="#00C49F" 
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
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
    </div>
  );
};

export default FormSubmissionCharts;
