import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell 
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { VisitorData, FormSubmissionData } from '@/types/tracking';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StarBackground from '@/components/StarBackground';
import SEO from '@/components/SEO';
import { Loader2, Info, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip as TooltipUI,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const Analytics = () => {
  const [visitorData, setVisitorData] = useState<VisitorData[]>([]);
  const [formData, setFormData] = useState<FormSubmissionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Add new state for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch visitor data
        const { data: visitors, error: visitorError } = await supabase
          .from('visitor_tracking')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(500);
        
        if (visitorError) throw visitorError;
        
        // Fetch form submission data
        const { data: forms, error: formError } = await supabase
          .from('form_submissions')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (formError) throw formError;
        
        // Cast data to the correct types
        setVisitorData(visitors as VisitorData[] || []);
        setFormData(forms as FormSubmissionData[] || []);
      } catch (err: any) {
        console.error('Error fetching analytics data:', err);
        setError(err.message || 'Failed to load analytics data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
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
  
  // Function to export visitor data as CSV
  const exportToCsv = () => {
    if (!visitorData.length) return;
    
    // Create CSV headers
    const headers = [
      'Session ID', 
      'Browser', 
      'OS', 
      'Device Type', 
      'Screen Size', 
      'Path', 
      'Referrer', 
      'Date'
    ].join(',');
    
    // Format data rows
    const rows = visitorData.map(visitor => [
      visitor.session_id,
      visitor.browser || 'Unknown',
      visitor.os || 'Unknown',
      visitor.device_type || 'Unknown',
      `${visitor.screen_width}x${visitor.screen_height}`,
      visitor.path,
      visitor.referrer,
      new Date(visitor.created_at).toLocaleString()
    ].join(','));
    
    // Combine headers and rows
    const csvContent = [headers, ...rows].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `visitor_data_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Calculate paginated data
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentVisitorData = visitorData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(visitorData.length / rowsPerPage);
  
  if (loading) {
    return (
      <>
        <SEO 
          title="Analytics Dashboard" 
          description="View website analytics and visitor data."
        />
        <Navbar />
        <StarBackground />
        <main className="min-h-screen pt-20 pb-24 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-accent mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white">Loading analytics data...</h2>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <SEO 
          title="Analytics Dashboard" 
          description="View website analytics and visitor data."
        />
        <Navbar />
        <StarBackground />
        <main className="min-h-screen pt-20 pb-24 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Error Loading Analytics</h2>
            <p className="text-gray-300 mb-6">{error}</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Retry
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <SEO 
        title="Analytics Dashboard" 
        description="View website analytics and visitor data."
      />
      <Navbar />
      <StarBackground />
      <main className="min-h-screen pt-20 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white">Analytics Dashboard</h1>
              <TooltipProvider>
                <TooltipUI>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Info className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Data from the last 500 visitor sessions</p>
                  </TooltipContent>
                </TooltipUI>
              </TooltipProvider>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-gray-800/50 border-gray-700 text-white">
                <CardHeader>
                  <CardTitle>Total Visitors</CardTitle>
                  <CardDescription className="text-gray-400">Unique sessions tracked</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">{new Set(visitorData.map(v => v.session_id)).size}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800/50 border-gray-700 text-white">
                <CardHeader>
                  <CardTitle>Form Submissions</CardTitle>
                  <CardDescription className="text-gray-400">Total forms submitted</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">{formData.length}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800/50 border-gray-700 text-white">
                <CardHeader>
                  <CardTitle>Page Views</CardTitle>
                  <CardDescription className="text-gray-400">Total page visits</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">{visitorData.length}</p>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="visitors" className="mb-8">
              <TabsList className="bg-gray-800/50 border-gray-700">
                <TabsTrigger value="visitors">Visitors</TabsTrigger>
                <TabsTrigger value="forms">Form Submissions</TabsTrigger>
                <TabsTrigger value="metadata">Visitor Metadata</TabsTrigger>
              </TabsList>
              
              <TabsContent value="visitors" className="mt-6">
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
              </TabsContent>
              
              <TabsContent value="forms" className="mt-6">
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
              </TabsContent>
              
              <TabsContent value="metadata" className="mt-6">
                <Card className="bg-gray-800/50 border-gray-700 text-white">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Visitor Metadata Details</CardTitle>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={exportToCsv}
                        className="flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Export CSV
                      </Button>
                    </div>
                    <CardDescription className="text-gray-400">
                      Detailed information about each visitor session
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border border-gray-700">
                      <Table>
                        <TableHeader>
                          <TableRow className="hover:bg-gray-800/70 bg-gray-800/40">
                            <TableHead>Browser</TableHead>
                            <TableHead>OS</TableHead>
                            <TableHead>Device</TableHead>
                            <TableHead>Screen Size</TableHead>
                            <TableHead>Path</TableHead>
                            <TableHead>Referrer</TableHead>
                            <TableHead>Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {currentVisitorData.length > 0 ? (
                            currentVisitorData.map((visitor, index) => (
                              <TableRow key={index} className="hover:bg-gray-800/70">
                                <TableCell>{visitor.browser || 'Unknown'}</TableCell>
                                <TableCell>{visitor.os || 'Unknown'}</TableCell>
                                <TableCell>{visitor.device_type || 'Unknown'}</TableCell>
                                <TableCell>{`${visitor.screen_width || 0}x${visitor.screen_height || 0}`}</TableCell>
                                <TableCell className="max-w-[150px] truncate">{visitor.path}</TableCell>
                                <TableCell className="max-w-[150px] truncate">{visitor.referrer}</TableCell>
                                <TableCell>{new Date(visitor.created_at).toLocaleString()}</TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={7} className="text-center py-4">No visitor data available</TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                    
                    {visitorData.length > rowsPerPage && (
                      <div className="flex items-center justify-center space-x-2 mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </Button>
                        <span className="text-sm text-gray-400">
                          Page {currentPage} of {totalPages}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Analytics;
