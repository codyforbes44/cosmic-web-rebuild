
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, Users, Globe, MousePointer } from 'lucide-react';

export const AdminAnalyticsPanel: React.FC = () => {
  const analyticsData = [
    { title: 'Total Visits', value: '12,543', change: '+15%', icon: MousePointer },
    { title: 'Unique Visitors', value: '8,921', change: '+12%', icon: Users },
    { title: 'Page Views', value: '45,231', change: '+23%', icon: BarChart3 },
    { title: 'Countries', value: '47', change: '+3%', icon: Globe },
  ];

  const topPages = [
    { path: '/', views: 15420, percentage: 34 },
    { path: '/services', views: 8920, percentage: 20 },
    { path: '/portfolio', views: 6750, percentage: 15 },
    { path: '/about', views: 4320, percentage: 10 },
    { path: '/contact', views: 3890, percentage: 9 },
  ];

  const recentVisitors = [
    { country: 'United States', city: 'New York', visits: 1250 },
    { country: 'United Kingdom', city: 'London', visits: 890 },
    { country: 'Canada', city: 'Toronto', visits: 670 },
    { country: 'Germany', city: 'Berlin', visits: 450 },
    { country: 'France', city: 'Paris', visits: 320 },
  ];

  return (
    <div className="space-y-6">
      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsData.map((stat, index) => (
          <Card key={index} className="bg-space-deep-blue border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-green-400 text-sm">{stat.change}</p>
                </div>
                <stat.icon className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card className="bg-space-deep-blue border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Top Pages
            </CardTitle>
            <CardDescription className="text-gray-400">
              Most visited pages in the last 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPages.map((page, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                  <div className="flex-1">
                    <p className="text-white font-medium">{page.path}</p>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div 
                        className="bg-accent h-2 rounded-full" 
                        style={{ width: `${page.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-white font-medium">{page.views.toLocaleString()}</p>
                    <p className="text-gray-400 text-sm">{page.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Geographic Data */}
        <Card className="bg-space-deep-blue border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Geographic Distribution
            </CardTitle>
            <CardDescription className="text-gray-400">
              Visitor locations by country and city
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentVisitors.map((visitor, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{visitor.country}</p>
                    <p className="text-gray-400 text-sm">{visitor.city}</p>
                  </div>
                  <Badge className="bg-accent/20 text-accent border-accent/50">
                    {visitor.visits}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
