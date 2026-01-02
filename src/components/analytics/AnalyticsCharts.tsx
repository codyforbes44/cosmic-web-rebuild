import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { DailyVisitorData, DeviceData, CountryData, SourceData } from "@/types/analytics";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];

interface AnalyticsChartsProps {
  dailyVisitors?: DailyVisitorData[];
  deviceData?: DeviceData[];
  countryData?: CountryData[];
  sourceData?: SourceData[];
  loading: boolean;
  chartType?: "overview" | "geography" | "sources";
}

const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ 
  dailyVisitors = [], 
  deviceData = [], 
  countryData = [],
  sourceData = [],
  loading,
  chartType = "overview"
}) => {
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6">
        <Card className="bg-card/20 backdrop-blur-sm border-white/10">
          <CardContent className="h-80 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Geography charts
  if (chartType === "geography") {
    return (
      <>
        <Card className="bg-card/20 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle>Top Countries</CardTitle>
            <CardDescription>Visitor distribution by country</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart 
                data={countryData} 
                layout="vertical"
                margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" horizontal={true} vertical={false} />
                <XAxis type="number" stroke="#888" tick={{ fill: '#888' }} />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke="#888" 
                  tick={{ fill: '#888' }} 
                  width={100}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#222', borderColor: '#444' }}
                  formatter={(value) => [`${value} visitors`, 'Count']}
                />
                <Bar dataKey="value" fill="#00C49F" name="Visitors" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="bg-card/20 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle>Country Breakdown</CardTitle>
            <CardDescription>Percentage of visitors by country</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={countryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {countryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#222', borderColor: '#444' }}
                  formatter={(value) => [`${value} visitors`, 'Count']}
                />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </>
    );
  }

  // Sources charts
  if (chartType === "sources") {
    return (
      <Card className="bg-card/20 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle>Traffic Sources</CardTitle>
          <CardDescription>Where your visitors are coming from</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart 
              data={sourceData} 
              margin={{ top: 5, right: 20, bottom: 20, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
              <XAxis dataKey="name" stroke="#888" tick={{ fill: '#888' }} />
              <YAxis stroke="#888" tick={{ fill: '#888' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#222', borderColor: '#444' }}
                formatter={(value) => [`${value} visitors`, 'Count']}
              />
              <Legend />
              <Bar dataKey="value" name="Visitors" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  }

  // Default overview charts
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Daily Visitors Chart */}
      <Card className="bg-card/20 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle>Daily Visitors</CardTitle>
          <CardDescription>Visitor count for the last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyVisitors} margin={{ top: 5, right: 20, bottom: 20, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
              <XAxis 
                dataKey="date" 
                stroke="#888" 
                tickFormatter={formatDate} 
                tick={{ fill: '#888' }}
              />
              <YAxis stroke="#888" tick={{ fill: '#888' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#222', borderColor: '#444', color: '#fff' }}
                labelStyle={{ color: '#fff' }}
                formatter={(value) => [`${value} visitors`, 'Count']}
                labelFormatter={(label) => `Date: ${formatDate(label)}`}
              />
              <Bar dataKey="count" fill="#8884d8" name="Visitors" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
              
      {/* Device Distribution */}
      <Card className="bg-card/20 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle>Device Distribution</CardTitle>
          <CardDescription>Visitors by device type</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={deviceData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {deviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#222', borderColor: '#444' }}
                formatter={(value) => [`${value} visitors`, 'Count']}
              />
              <Legend layout="horizontal" verticalAlign="bottom" align="center" />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsCharts;
