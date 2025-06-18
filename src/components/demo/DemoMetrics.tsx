
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Server, 
  Database, 
  Shield, 
  Zap, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  Cpu
} from "lucide-react";

const DemoMetrics: React.FC = () => {
  const [systemMetrics, setSystemMetrics] = useState({
    serverUptime: 99.97,
    databasePerformance: 98.5,
    securityScore: 96.8,
    responseTime: 145,
    activeConnections: 1247,
    throughput: 850,
    errorRate: 0.02,
    cpuUsage: 45
  });

  // Simulate real-time metric updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics(prev => ({
        ...prev,
        responseTime: Math.max(100, Math.min(200, prev.responseTime + (Math.random() - 0.5) * 20)),
        activeConnections: Math.max(1000, Math.min(1500, prev.activeConnections + Math.floor((Math.random() - 0.5) * 50))),
        throughput: Math.max(700, Math.min(1000, prev.throughput + Math.floor((Math.random() - 0.5) * 100))),
        cpuUsage: Math.max(30, Math.min(70, prev.cpuUsage + (Math.random() - 0.5) * 10))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const performanceData = [
    {
      title: "System Uptime",
      value: `${systemMetrics.serverUptime}%`,
      progress: systemMetrics.serverUptime,
      icon: Server,
      status: "excellent",
      color: "text-green-500"
    },
    {
      title: "Database Performance",
      value: `${systemMetrics.databasePerformance}%`,
      progress: systemMetrics.databasePerformance,
      icon: Database,
      status: "good",
      color: "text-blue-500"
    },
    {
      title: "Security Score",
      value: `${systemMetrics.securityScore}%`,
      progress: systemMetrics.securityScore,
      icon: Shield,
      status: "excellent",
      color: "text-purple-500"
    },
    {
      title: "CPU Usage",
      value: `${systemMetrics.cpuUsage.toFixed(1)}%`,
      progress: systemMetrics.cpuUsage,
      icon: Cpu,
      status: systemMetrics.cpuUsage > 60 ? "warning" : "good",
      color: systemMetrics.cpuUsage > 60 ? "text-yellow-500" : "text-green-500"
    }
  ];

  const liveMetrics = [
    {
      title: "Response Time",
      value: `${systemMetrics.responseTime}ms`,
      icon: Zap,
      trend: systemMetrics.responseTime < 150 ? "good" : "warning"
    },
    {
      title: "Active Connections",
      value: systemMetrics.activeConnections.toLocaleString(),
      icon: CheckCircle,
      trend: "good"
    },
    {
      title: "Requests/min",
      value: systemMetrics.throughput.toLocaleString(),
      icon: Clock,
      trend: "good"
    },
    {
      title: "Error Rate",
      value: `${systemMetrics.errorRate}%`,
      icon: AlertTriangle,
      trend: systemMetrics.errorRate < 0.1 ? "good" : "warning"
    }
  ];

  return (
    <section className="py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">System Performance</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Real-time monitoring of system health, performance metrics, and operational status
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Performance Metrics */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-white mb-4">Performance Overview</h3>
          {performanceData.map((metric, index) => (
            <Card key={index} className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <metric.icon className={`h-6 w-6 ${metric.color}`} />
                    <div>
                      <p className="text-white font-medium">{metric.title}</p>
                      <p className="text-2xl font-bold text-white">{metric.value}</p>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`${
                      metric.status === 'excellent' 
                        ? 'text-green-400 border-green-500/30' 
                        : metric.status === 'good'
                        ? 'text-blue-400 border-blue-500/30'
                        : 'text-yellow-400 border-yellow-500/30'
                    }`}
                  >
                    {metric.status.toUpperCase()}
                  </Badge>
                </div>
                <Progress 
                  value={metric.progress} 
                  className="h-2"
                />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Live Metrics */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-white mb-4">Live Metrics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {liveMetrics.map((metric, index) => (
              <Card key={index} className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-orange-500/30 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">{metric.title}</p>
                      <p className="text-xl font-bold text-white">{metric.value}</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <metric.icon className={`h-6 w-6 ${
                        metric.trend === 'good' ? 'text-green-500' : 'text-yellow-500'
                      }`} />
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        metric.trend === 'good' ? 'bg-green-500' : 'bg-yellow-500'
                      } animate-pulse`}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* System Status */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-white">System Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-white">All Systems Operational</span>
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  HEALTHY
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">API Endpoints:</span>
                  <span className="text-green-400">Online</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Database:</span>
                  <span className="text-green-400">Connected</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">CDN:</span>
                  <span className="text-green-400">Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Monitoring:</span>
                  <span className="text-green-400">Running</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DemoMetrics;
