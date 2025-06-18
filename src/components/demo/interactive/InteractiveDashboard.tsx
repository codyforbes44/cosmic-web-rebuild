
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign,
  Activity,
  ArrowRight,
  Play,
  Settings
} from "lucide-react";

const InteractiveDashboard: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [liveData, setLiveData] = useState({
    revenue: 2400000,
    users: 45321,
    conversion: 3.45,
    uptime: 99.9
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => ({
        revenue: prev.revenue + Math.floor(Math.random() * 10000) - 5000,
        users: prev.users + Math.floor(Math.random() * 100) - 50,
        conversion: Math.max(0, prev.conversion + (Math.random() - 0.5) * 0.1),
        uptime: Math.min(100, prev.uptime + (Math.random() - 0.5) * 0.01)
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const dashboardFeatures = [
    {
      title: "Real-time Analytics",
      description: "Monitor your business metrics as they happen",
      icon: BarChart3,
      color: "text-blue-500",
      action: "View Analytics"
    },
    {
      title: "Performance Tracking",
      description: "Track KPIs and performance indicators",
      icon: TrendingUp,
      color: "text-green-500",
      action: "View Performance"
    },
    {
      title: "User Management",
      description: "Manage users, roles, and permissions",
      icon: Users,
      color: "text-purple-500",
      action: "Manage Users"
    },
    {
      title: "System Health",
      description: "Monitor system status and health metrics",
      icon: Activity,
      color: "text-orange-500",
      action: "Check Health"
    }
  ];

  return (
    <div className="p-6 space-y-6 h-full overflow-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">ƷBI Platform Overview</h3>
        <p className="text-gray-300">Comprehensive business intelligence at your fingertips</p>
        <Badge className="mt-2 bg-green-500/20 text-green-400 border-green-500/30">
          LIVE DEMO ENVIRONMENT
        </Badge>
      </div>

      {/* Live Data Display */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-400 text-sm">Revenue</p>
                <p className="text-2xl font-bold text-white">
                  ${(liveData.revenue / 1000000).toFixed(2)}M
                </p>
              </div>
              <DollarSign className="text-blue-500 h-8 w-8" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-400 text-sm">Active Users</p>
                <p className="text-2xl font-bold text-white">
                  {liveData.users.toLocaleString()}
                </p>
              </div>
              <Users className="text-green-500 h-8 w-8" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-400 text-sm">Conversion</p>
                <p className="text-2xl font-bold text-white">
                  {liveData.conversion.toFixed(2)}%
                </p>
              </div>
              <TrendingUp className="text-orange-500 h-8 w-8" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-400 text-sm">Uptime</p>
                <p className="text-2xl font-bold text-white">
                  {liveData.uptime.toFixed(1)}%
                </p>
              </div>
              <Activity className="text-purple-500 h-8 w-8" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dashboardFeatures.map((feature, index) => (
          <Card
            key={index}
            className={`bg-white/5 backdrop-blur-sm border-white/10 transition-all duration-300 cursor-pointer ${
              activeCard === index
                ? 'border-orange-500/50 shadow-lg shadow-orange-500/10'
                : 'hover:border-white/20'
            }`}
            onMouseEnter={() => setActiveCard(index)}
            onMouseLeave={() => setActiveCard(null)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center space-x-3">
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  <span>{feature.title}</span>
                </CardTitle>
                {activeCard === index && (
                  <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                    <Play className="w-3 h-3 mr-1" />
                    Try Now
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">{feature.description}</p>
              
              {activeCard === index && (
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-orange-300">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Interactive demo available
                  </div>
                  <div className="flex items-center text-sm text-blue-300">
                    <Settings className="w-4 h-4 mr-2" />
                    Customizable settings
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-8 p-6 bg-gradient-to-r from-orange-500/10 to-red-600/10 rounded-lg border border-orange-500/20">
        <h4 className="text-xl font-bold text-white mb-2">Ready to Get Started?</h4>
        <p className="text-gray-300 mb-4">
          Experience the full power of ƷBI with a personalized demonstration
        </p>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
          Schedule Live Demo
        </Button>
      </div>
    </div>
  );
};

export default InteractiveDashboard;
