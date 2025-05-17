
import React, { useMemo } from 'react';
import { ResponsiveContainer, ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { VisitorData } from '@/types/tracking';
import { MapPin } from 'lucide-react';

interface VisitorGeoMapProps {
  visitorData: VisitorData[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const VisitorGeoMap: React.FC<VisitorGeoMapProps> = ({ visitorData }) => {
  // Process the visitor data to extract countries/regions
  const geoData = useMemo(() => {
    // Map to store country/region counts
    const countryCounts: Record<string, number> = {};
    
    visitorData.forEach(visitor => {
      // Extract country information from visitor data
      const country = visitor.country_code || 'Unknown';
      
      if (!countryCounts[country]) {
        countryCounts[country] = 0;
      }
      countryCounts[country] += 1;
    });
    
    // Convert to chart data format and sort by count
    return Object.entries(countryCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10); // Show top 10 countries
  }, [visitorData]);
  
  return (
    <Card className="bg-gray-800/50 border-gray-700 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Visitor Geographic Distribution
        </CardTitle>
        <CardDescription className="text-gray-400">Top visitor locations</CardDescription>
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
                formatter={(value) => [`${value} visitors`, 'Count']}
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
            <MapPin className="mr-2 h-5 w-5" />
            No geographic data available
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VisitorGeoMap;
