
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Users, Globe, Clock, MonitorSmartphone } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];

interface VisitorCount {
  date: string;
  count: number;
}

interface DeviceData {
  name: string;
  value: number;
}

interface CountryData {
  name: string;
  value: number;
}

interface SourceData {
  name: string;
  value: number;
}

const Analytics: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [visitorData, setVisitorData] = useState<any[]>([]);
  const [dailyVisitors, setDailyVisitors] = useState<VisitorCount[]>([]);
  const [deviceData, setDeviceData] = useState<DeviceData[]>([]);
  const [countryData, setCountryData] = useState<CountryData[]>([]);
  const [sourceData, setSourceData] = useState<SourceData[]>([]);
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [totalCountries, setTotalCountries] = useState(0);
  const [avgTimeOnPage, setAvgTimeOnPage] = useState(0);
  const [topPage, setTopPage] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnalyticsData() {
      try {
        setLoading(true);
        
        // Fetch all visitor data
        const { data, error } = await supabase
          .from('visitor_metadata')
          .select('*')
          .order('visit_timestamp', { ascending: false });
        
        if (error) throw error;
        setVisitorData(data || []);
        
        // Process daily visitors (last 7 days)
        const now = new Date();
        const dailyData: VisitorCount[] = [];
        
        for (let i = 6; i >= 0; i--) {
          const date = new Date(now);
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          
          const count = (data || []).filter(v => {
            const visitDate = v.visit_timestamp ? new Date(v.visit_timestamp).toISOString().split('T')[0] : null;
            return visitDate === dateStr;
          }).length;
          
          dailyData.push({ date: dateStr, count });
        }
        setDailyVisitors(dailyData);
        
        // Process device data
        const devices: {[key: string]: number} = {};
        (data || []).forEach((visitor) => {
          if (visitor.device_type) {
            devices[visitor.device_type] = (devices[visitor.device_type] || 0) + 1;
          }
        });
        
        const deviceArray = Object.keys(devices).map(key => ({ 
          name: key.charAt(0).toUpperCase() + key.slice(1), 
          value: devices[key] 
        }));
        setDeviceData(deviceArray);
        
        // Process country data
        const countries: {[key: string]: number} = {};
        (data || []).forEach((visitor) => {
          if (visitor.country) {
            countries[visitor.country] = (countries[visitor.country] || 0) + 1;
          } else {
            countries['Unknown'] = (countries['Unknown'] || 0) + 1;
          }
        });
        
        const countryArray = Object.keys(countries)
          .map(key => ({ name: key, value: countries[key] }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 8); // Top 8 countries
        setCountryData(countryArray);
        
        // Process source data (UTM)
        const sources: {[key: string]: number} = {};
        (data || []).forEach((visitor) => {
          let source = visitor.utm_source || (visitor.referrer ? 'Referral' : 'Direct');
          sources[source] = (sources[source] || 0) + 1;
        });
        
        const sourceArray = Object.keys(sources)
          .map(key => ({ name: key, value: sources[key] }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 5); // Top 5 sources
        setSourceData(sourceArray);
        
        // Calculate aggregated metrics
        setTotalVisitors(data?.length || 0);
        
        const uniqueCountries = new Set();
        (data || []).forEach(visitor => {
          if (visitor.country) uniqueCountries.add(visitor.country);
        });
        setTotalCountries(uniqueCountries.size);
        
        // Calculate average time on page
        const timeValues = (data || [])
          .filter(v => v.time_on_page && v.time_on_page > 0 && v.time_on_page < 3600) // Filter out outliers
          .map(v => v.time_on_page);
        
        const avgTime = timeValues.length > 0 
          ? timeValues.reduce((a, b) => a + b, 0) / timeValues.length 
          : 0;
        setAvgTimeOnPage(Math.round(avgTime));
        
        // Find most popular page
        const pages: {[key: string]: number} = {};
        (data || []).forEach((visitor) => {
          if (visitor.page_url) {
            const url = new URL(visitor.page_url);
            pages[url.pathname] = (pages[url.pathname] || 0) + 1;
          }
        });
        
        const sortedPages = Object.keys(pages)
          .sort((a, b) => pages[b] - pages[a]);
        
        setTopPage(sortedPages[0] || '/');
        
      } catch (err) {
        console.error('Error fetching analytics data:', err);
        setError('Failed to load analytics data');
        toast({
          title: 'Error',
          description: 'Failed to load analytics data',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    }
    
    fetchAnalyticsData();
  }, []);

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
  
  return (
    <>
      <SEO
        title="Analytics Dashboard | ƷBI"
        description="Visitor analytics and insights for ƷBI website"
        keywords="analytics, visitor data, website metrics, ƷBI"
      />
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-space-dark-blue to-space-deep-blue py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Analytics Dashboard</h1>
            <p className="text-gray-400">Visitor insights and website performance metrics</p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
            </div>
          ) : error ? (
            <Card className="bg-card/20 backdrop-blur-sm border-red-500/50">
              <CardContent className="pt-6">
                <p className="text-red-400">{error}</p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Card className="bg-card/20 backdrop-blur-sm border-white/10">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Total Visitors</p>
                        <h4 className="text-2xl font-bold text-white mt-1">{totalVisitors}</h4>
                      </div>
                      <Users size={24} className="text-accent" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-card/20 backdrop-blur-sm border-white/10">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Countries</p>
                        <h4 className="text-2xl font-bold text-white mt-1">{totalCountries}</h4>
                      </div>
                      <Globe size={24} className="text-accent" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-card/20 backdrop-blur-sm border-white/10">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Avg. Time on Page</p>
                        <h4 className="text-2xl font-bold text-white mt-1">{avgTimeOnPage} sec</h4>
                      </div>
                      <Clock size={24} className="text-accent" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-card/20 backdrop-blur-sm border-white/10">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Most Visited Page</p>
                        <h4 className="text-lg font-bold text-white mt-1 truncate max-w-[140px]" title={topPage}>{topPage}</h4>
                      </div>
                      <ArrowUpRight size={24} className="text-accent" />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="bg-card/20 backdrop-blur-sm border-white/10 mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="visitors">Visitors</TabsTrigger>
                  <TabsTrigger value="geography">Geography</TabsTrigger>
                  <TabsTrigger value="sources">Sources</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
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
                </TabsContent>
                
                <TabsContent value="visitors">
                  <Card className="bg-card/20 backdrop-blur-sm border-white/10">
                    <CardHeader>
                      <CardTitle>Recent Visitors</CardTitle>
                      <CardDescription>Last 20 website visitors</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-700">
                              <th className="text-left py-3 px-4 text-gray-400">Time</th>
                              <th className="text-left py-3 px-4 text-gray-400">Page</th>
                              <th className="text-left py-3 px-4 text-gray-400">Location</th>
                              <th className="text-left py-3 px-4 text-gray-400">Device</th>
                              <th className="text-left py-3 px-4 text-gray-400">Source</th>
                            </tr>
                          </thead>
                          <tbody>
                            {visitorData.slice(0, 20).map((visitor, index) => {
                              const visitUrl = visitor.page_url ? new URL(visitor.page_url) : null;
                              const visitPath = visitUrl ? visitUrl.pathname : 'Unknown';
                              const visitTime = visitor.visit_timestamp ? new Date(visitor.visit_timestamp).toLocaleString() : 'Unknown';
                              const location = visitor.country ? `${visitor.city ? visitor.city + ', ' : ''}${visitor.country}` : 'Unknown';
                              const source = visitor.utm_source || (visitor.referrer ? 'Referral' : 'Direct');
                              
                              return (
                                <tr key={index} className="border-b border-gray-800">
                                  <td className="py-3 px-4 text-sm text-gray-300">{visitTime}</td>
                                  <td className="py-3 px-4 text-sm text-gray-300">
                                    <span className="truncate block max-w-[140px]" title={visitPath}>
                                      {visitPath}
                                    </span>
                                  </td>
                                  <td className="py-3 px-4 text-sm text-gray-300">{location}</td>
                                  <td className="py-3 px-4 text-sm text-gray-300">
                                    <div className="flex items-center">
                                      <MonitorSmartphone size={14} className="mr-1" />
                                      <span>{visitor.device_type || 'Unknown'}</span>
                                    </div>
                                  </td>
                                  <td className="py-3 px-4">
                                    <Badge variant="outline" className="bg-white/5">
                                      {source}
                                    </Badge>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="geography">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  </div>
                </TabsContent>
                
                <TabsContent value="sources">
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
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Analytics;
