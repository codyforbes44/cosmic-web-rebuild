
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, Users, DollarSign, Eye, RefreshCw, Download, Filter } from 'lucide-react';

const COLORS = ['#ff6b35', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const InteractiveDashboard: React.FC = () => {
  const [activeMetric, setActiveMetric] = useState('revenue');
  const [isLive, setIsLive] = useState(false);
  const [data, setData] = useState({
    revenue: [
      { month: 'Jan', value: 45000, growth: 12 },
      { month: 'Feb', value: 52000, growth: 15 },
      { month: 'Mar', value: 48000, growth: -8 },
      { month: 'Apr', value: 61000, growth: 27 },
      { month: 'May', value: 67000, growth: 10 },
      { month: 'Jun', value: 75000, growth: 12 }
    ],
    users: [
      { month: 'Jan', value: 1200, growth: 8 },
      { month: 'Feb', value: 1450, growth: 21 },
      { month: 'Mar', value: 1380, growth: -5 },
      { month: 'Apr', value: 1650, growth: 20 },
      { month: 'May', value: 1820, growth: 10 },
      { month: 'Jun', value: 2100, growth: 15 }
    ],
    conversion: [
      { name: 'Direct', value: 35, color: COLORS[0] },
      { name: 'Organic', value: 28, color: COLORS[1] },
      { name: 'Social', value: 20, color: COLORS[2] },
      { name: 'Email', value: 12, color: COLORS[3] },
      { name: 'Paid', value: 5, color: COLORS[4] }
    ]
  });

  const [kpis, setKpis] = useState({
    totalRevenue: 348000,
    totalUsers: 10600,
    conversionRate: 3.4,
    avgOrderValue: 127
  });

  // Simulate real-time data updates
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setKpis(prev => ({
        totalRevenue: prev.totalRevenue + Math.floor(Math.random() * 1000),
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 10),
        conversionRate: +(prev.conversionRate + (Math.random() - 0.5) * 0.1).toFixed(2),
        avgOrderValue: +(prev.avgOrderValue + (Math.random() - 0.5) * 5).toFixed(0)
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [isLive]);

  const toggleLiveMode = () => {
    setIsLive(!isLive);
  };

  return (
    <section id="interactive-demo" className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Interactive Analytics Dashboard
          </h2>
          <p className="text-gray-300 text-lg mb-6">
            Explore real-time data visualization and customizable reporting features
          </p>
          
          <div className="flex justify-center gap-4 mb-8">
            <Button
              onClick={toggleLiveMode}
              variant={isLive ? "default" : "outline"}
              className={isLive ? "bg-green-600 hover:bg-green-700" : "border-white/20 text-white hover:bg-white/5"}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLive ? 'animate-spin' : ''}`} />
              {isLive ? 'Live Mode ON' : 'Enable Live Mode'}
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/5">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/5">
              <Filter className="w-4 h-4 mr-2" />
              Custom Filters
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card/20 backdrop-blur-sm border-white/10 hover:bg-card/30 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Total Revenue</p>
                  <p className="text-2xl font-bold text-white">
                    ${kpis.totalRevenue.toLocaleString()}
                    {isLive && <Badge className="ml-2 bg-green-600 animate-pulse">LIVE</Badge>}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-accent" />
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500">+12.5%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/20 backdrop-blur-sm border-white/10 hover:bg-card/30 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Active Users</p>
                  <p className="text-2xl font-bold text-white">
                    {kpis.totalUsers.toLocaleString()}
                    {isLive && <Badge className="ml-2 bg-green-600 animate-pulse">LIVE</Badge>}
                  </p>
                </div>
                <Users className="h-8 w-8 text-accent" />
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500">+8.2%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/20 backdrop-blur-sm border-white/10 hover:bg-card/30 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Conversion Rate</p>
                  <p className="text-2xl font-bold text-white">
                    {kpis.conversionRate}%
                    {isLive && <Badge className="ml-2 bg-green-600 animate-pulse">LIVE</Badge>}
                  </p>
                </div>
                <Eye className="h-8 w-8 text-accent" />
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500">+2.1%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/20 backdrop-blur-sm border-white/10 hover:bg-card/30 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Avg Order Value</p>
                  <p className="text-2xl font-bold text-white">
                    ${kpis.avgOrderValue}
                    {isLive && <Badge className="ml-2 bg-green-600 animate-pulse">LIVE</Badge>}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-accent" />
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500">+5.7%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Charts */}
        <Tabs defaultValue="revenue" className="w-full">
          <TabsList className="bg-card/20 backdrop-blur-sm border-white/10 mb-6">
            <TabsTrigger value="revenue">Revenue Analytics</TabsTrigger>
            <TabsTrigger value="users">User Growth</TabsTrigger>
            <TabsTrigger value="sources">Traffic Sources</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="revenue">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card/20 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Monthly Revenue Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={data.revenue}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="month" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#222', borderColor: '#444' }}
                        formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#ff6b35" 
                        fill="#ff6b35" 
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-card/20 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Growth Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data.revenue}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="month" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#222', borderColor: '#444' }}
                        formatter={(value) => [`${value}%`, 'Growth']}
                      />
                      <Bar dataKey="growth" fill="#00C49F" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <Card className="bg-card/20 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white">User Growth Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={data.users}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="month" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#222', borderColor: '#444' }}
                      formatter={(value) => [value.toLocaleString(), 'Users']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#0088FE" 
                      strokeWidth={3}
                      dot={{ fill: '#0088FE', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sources">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card/20 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Traffic Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={data.conversion}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {data.conversion.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#222', borderColor: '#444' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-card/20 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Source Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {data.conversion.map((source, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: source.color }}
                        />
                        <span className="text-white">{source.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold">{source.value}%</div>
                        <div className="text-sm text-gray-400">
                          {Math.floor(source.value * 100)} visitors
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-card/20 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Page Load Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-accent mb-2">1.2s</div>
                  <div className="text-sm text-green-500">↓ 15% faster</div>
                </CardContent>
              </Card>

              <Card className="bg-card/20 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Bounce Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-accent mb-2">24.5%</div>
                  <div className="text-sm text-green-500">↓ 8% improvement</div>
                </CardContent>
              </Card>

              <Card className="bg-card/20 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Session Duration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-accent mb-2">4m 32s</div>
                  <div className="text-sm text-green-500">↑ 22% increase</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default InteractiveDashboard;
