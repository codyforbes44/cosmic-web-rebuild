
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const DemoCharts: React.FC = () => {
  const revenueData = [
    { month: 'Jan', revenue: 1800000, target: 2000000 },
    { month: 'Feb', revenue: 2100000, target: 2000000 },
    { month: 'Mar', revenue: 1950000, target: 2000000 },
    { month: 'Apr', revenue: 2300000, target: 2200000 },
    { month: 'May', revenue: 2450000, target: 2200000 },
    { month: 'Jun', revenue: 2400000, target: 2200000 },
  ];

  const userGrowthData = [
    { month: 'Jan', users: 32000 },
    { month: 'Feb', users: 35000 },
    { month: 'Mar', users: 38000 },
    { month: 'Apr', users: 42000 },
    { month: 'May', users: 45000 },
    { month: 'Jun', users: 45321 },
  ];

  const channelData = [
    { name: 'Organic Search', value: 35, color: '#f97316' },
    { name: 'Social Media', value: 25, color: '#3b82f6' },
    { name: 'Direct', value: 20, color: '#10b981' },
    { name: 'Email', value: 12, color: '#8b5cf6' },
    { name: 'Paid Ads', value: 8, color: '#f59e0b' },
  ];

  const conversionData = [
    { stage: 'Visitors', count: 100000 },
    { stage: 'Leads', count: 15000 },
    { stage: 'Qualified', count: 8500 },
    { stage: 'Customers', count: 3450 },
  ];

  return (
    <section className="py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Analytics Dashboard</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Comprehensive data visualization and business intelligence insights
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Tracking */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Revenue vs Target</CardTitle>
            <CardDescription className="text-gray-400">Monthly performance comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                  formatter={(value: number) => [`$${(value / 1000000).toFixed(2)}M`, '']}
                />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={3} name="Actual Revenue" />
                <Line type="monotone" dataKey="target" stroke="#6b7280" strokeWidth={2} strokeDasharray="5 5" name="Target" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* User Growth */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white">User Growth</CardTitle>
            <CardDescription className="text-gray-400">Active user base expansion</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                  formatter={(value: number) => [`${value.toLocaleString()}`, 'Users']}
                />
                <Area type="monotone" dataKey="users" stroke="#3b82f6" fill="rgba(59, 130, 246, 0.1)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Traffic Sources</CardTitle>
            <CardDescription className="text-gray-400">Channel distribution breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={channelData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {channelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                  formatter={(value: number) => [`${value}%`, 'Share']}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Conversion Funnel */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Conversion Funnel</CardTitle>
            <CardDescription className="text-gray-400">Customer journey optimization</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={conversionData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#9ca3af" tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} />
                <YAxis dataKey="stage" type="category" stroke="#9ca3af" width={80} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                  formatter={(value: number) => [`${value.toLocaleString()}`, 'Count']}
                />
                <Bar dataKey="count" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default DemoCharts;
