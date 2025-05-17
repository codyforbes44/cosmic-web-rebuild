
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { VisitorData } from '@/types/tracking';
import VisitorGeoMap from './VisitorGeoMap';
import VisitDurationChart from './VisitDurationChart';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

interface VisitorChartsProps {
  visitorData: VisitorData[];
}

const VisitorCharts: React.FC<VisitorChartsProps> = ({ visitorData }) => {
  // Process visitor data for charts
  const browserData = visitorData.reduce((acc, visitor) => {
    const browser = visitor.browser || 'Unknown';
    const existing = acc.find(item => item.name === browser);
    
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: browser, value: 1 });
    }
    
    return acc;
  }, [] as Array<{ name: string; value: number }>);
  
  const deviceData = visitorData.reduce((acc, visitor) => {
    const device = visitor.device_type || 'Unknown';
    const existing = acc.find(item => item.name === device);
    
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: device, value: 1 });
    }
    
    return acc;
  }, [] as Array<{ name: string; value: number }>);
  
  // Recent pages visited
  const pageVisits = visitorData.reduce((acc, visitor) => {
    const path = visitor.path;
    const existing = acc.find(item => item.name === path);
    
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: path, value: 1 });
    }
    
    return acc;
  }, [] as Array<{ name: string; value: number }>)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
  
  // Format data for daily visit chart
  const getDailyVisits = () => {
    const last7Days = new Array(7).fill(null).map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return {
        date: date.toISOString().split('T')[0],
        visits: 0
      };
    });
    
    visitorData.forEach(visitor => {
      const visitDate = visitor.created_at.split('T')[0];
      const dayObj = last7Days.find(day => day.date === visitDate);
      if (dayObj) {
        dayObj.visits++;
      }
    });
    
    return last7Days.map(day => ({
      name: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
      visits: day.visits
    }));
  };
  
  const dailyVisitData = getDailyVisits();

  return (
    <div className="space-y-6">
      {/* First row with daily visitors and browsers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800/50 border-gray-700 text-white">
          <CardHeader>
            <CardTitle>Daily Visitors</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyVisitData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip contentStyle={{ backgroundColor: '#1E293B', color: '#fff', border: 'none' }} />
                <Bar dataKey="visits" fill="#4C1D95" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800/50 border-gray-700 text-white">
          <CardHeader>
            <CardTitle>Browsers</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={browserData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {browserData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1E293B', color: '#fff', border: 'none' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Second row with device types and top pages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800/50 border-gray-700 text-white">
          <CardHeader>
            <CardTitle>Device Types</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
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
            <CardTitle>Top Pages</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={pageVisits}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis type="number" stroke="#aaa" />
                <YAxis dataKey="name" type="category" stroke="#aaa" width={100} />
                <Tooltip contentStyle={{ backgroundColor: '#1E293B', color: '#fff', border: 'none' }} />
                <Bar dataKey="value" name="Visits" fill="#06B6D4" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Third row with new geographic visualization and visit duration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VisitorGeoMap visitorData={visitorData} />
        <VisitDurationChart visitorData={visitorData} />
      </div>
    </div>
  );
};

export default VisitorCharts;
