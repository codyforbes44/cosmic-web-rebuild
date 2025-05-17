
import React, { useMemo } from 'react';
import { ResponsiveContainer, ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FormSubmissionData } from '@/types/tracking';

interface GeoDistributionChartProps {
  formData: FormSubmissionData[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const GeoDistributionChart: React.FC<GeoDistributionChartProps> = ({ formData }) => {
  // Process the form data to extract countries/regions
  const geoData = useMemo(() => {
    // Map to store country/region counts
    const countryCounts: Record<string, number> = {};
    
    formData.forEach(submission => {
      // Check if the submission has country/region information
      // This depends on your data structure - adjust as needed
      const country = submission.form_data?.country || 
                     submission.form_data?.location || 
                     'Unknown';
      
      if (!countryCounts[country]) {
        countryCounts[country] = 0;
      }
      countryCounts[country] += 1;
    });
    
    // Convert to chart data format and sort by count
    return Object.entries(countryCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10); // Show top 10 countries/regions
  }, [formData]);
  
  return (
    <Card className="bg-gray-800/50 border-gray-700 text-white">
      <CardHeader>
        <CardTitle>Geographic Distribution</CardTitle>
        <CardDescription className="text-gray-400">Top locations of form submissions</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        {geoData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              layout="vertical"
              data={geoData}
              margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis type="number" stroke="#aaa" />
              <YAxis 
                dataKey="name" 
                type="category" 
                scale="band" 
                stroke="#aaa"
                tick={{ fill: '#aaa' }}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1E293B', color: '#fff', border: 'none' }} 
                formatter={(value) => [`${value} submissions`, 'Count']}
              />
              <Bar 
                dataKey="value" 
                fill="#8884d8" 
                barSize={20}
                radius={[0, 4, 4, 0]}
              >
                {geoData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </ComposedChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No geographic data available
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GeoDistributionChart;
