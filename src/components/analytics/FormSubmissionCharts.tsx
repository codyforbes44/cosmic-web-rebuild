
import React from 'react';
import { 
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormSubmissionData } from '@/types/tracking';

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
        <CardContent className="max-h-80 overflow-auto">
          <div className="space-y-4">
            {formData.slice(0, 5).map((submission, index) => (
              <div key={index} className="p-4 bg-gray-700/30 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-accent">{submission.form_name}</span>
                  <span className="text-sm text-gray-400">
                    {new Date(submission.created_at).toLocaleString()}
                  </span>
                </div>
                <div className="text-sm">
                  <p>Path: {submission.path}</p>
                  <p>Session ID: {submission.session_id.substring(0, 8)}...</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormSubmissionCharts;
