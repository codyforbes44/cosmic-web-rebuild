
import React, { useMemo } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { VisitorData } from '@/types/tracking';
import { ChartBar } from 'lucide-react';

interface VisitDurationChartProps {
  visitorData: VisitorData[];
}

const VisitDurationChart: React.FC<VisitDurationChartProps> = ({ visitorData }) => {
  // Process visitor data to estimate page visit durations
  // This is a simulation since we don't have actual duration data
  const durationData = useMemo(() => {
    // Group visitors by path
    const pathGroups: Record<string, { count: number; }> = {};
    
    visitorData.forEach(visitor => {
      const path = visitor.path || '/';
      
      if (!pathGroups[path]) {
        pathGroups[path] = { count: 0 };
      }
      
      pathGroups[path].count += 1;
    });
    
    // Convert to chart data format and sort by count (proxy for engagement)
    return Object.entries(pathGroups)
      .map(([path, data]) => {
        // Simulate duration based on visit count (just for demonstration)
        // In a real app, you would calculate actual time spent on each page
        const avgDuration = Math.floor(data.count * 1.5 + Math.random() * 60);
        
        return {
          name: path.length > 15 ? `${path.substring(0, 15)}...` : path,
          fullPath: path,
          duration: avgDuration
        };
      })
      .sort((a, b) => b.duration - a.duration)
      .slice(0, 7); // Show top 7 pages
  }, [visitorData]);
  
  return (
    <Card className="bg-gray-800/50 border-gray-700 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChartBar className="h-5 w-5" />
          Estimated Page Engagement
        </CardTitle>
        <CardDescription className="text-gray-400">
          Estimated visitor engagement by page (seconds)
        </CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        {durationData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={durationData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis type="number" stroke="#aaa" />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={100}
                stroke="#aaa" 
                tick={{ fill: '#aaa' }}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1E293B', color: '#fff', border: 'none' }}
                formatter={(value, name, props) => {
                  return [`${value} seconds`, 'Est. Duration'];
                }}
                labelFormatter={(label) => {
                  const item = durationData.find(item => item.name === label);
                  return item?.fullPath || label;
                }}
              />
              <Bar dataKey="duration" name="Seconds" fill="#4C1D95" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <ChartBar className="mr-2 h-5 w-5" />
            No duration data available
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VisitDurationChart;
