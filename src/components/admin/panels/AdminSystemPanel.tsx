
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Database, 
  Server, 
  Zap, 
  HardDrive, 
  Cpu, 
  MemoryStick,
  RefreshCw,
  Download,
  Upload
} from 'lucide-react';

export const AdminSystemPanel: React.FC = () => {
  const systemMetrics = [
    { name: 'CPU Usage', value: '45%', status: 'good', icon: Cpu },
    { name: 'Memory', value: '67%', status: 'warning', icon: MemoryStick },
    { name: 'Storage', value: '23%', status: 'good', icon: HardDrive },
    { name: 'Bandwidth', value: '12GB', status: 'good', icon: Upload },
  ];

  const services = [
    { name: 'Database', status: 'operational', uptime: '99.9%', version: 'PostgreSQL 15' },
    { name: 'Authentication', status: 'operational', uptime: '99.8%', version: 'Supabase Auth' },
    { name: 'Edge Functions', status: 'operational', uptime: '99.7%', version: 'Deno 1.x' },
    { name: 'Storage', status: 'operational', uptime: '99.9%', version: 'Supabase Storage' },
    { name: 'Realtime', status: 'operational', uptime: '99.6%', version: 'Phoenix' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'warning': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'operational': return 'bg-green-500/20 text-green-400 border-green-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  return (
    <div className="space-y-6">
      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemMetrics.map((metric, index) => (
          <Card key={index} className="bg-space-deep-blue border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{metric.name}</p>
                  <p className="text-2xl font-bold text-white">{metric.value}</p>
                  <Badge className={getStatusColor(metric.status)}>
                    {metric.status}
                  </Badge>
                </div>
                <metric.icon className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Services Status */}
        <Card className="bg-space-deep-blue border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Server className="h-5 w-5" />
              Services Status
            </CardTitle>
            <CardDescription className="text-gray-400">
              Real-time status of all system services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {services.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-black/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <div>
                      <p className="text-white font-medium">{service.name}</p>
                      <p className="text-gray-400 text-sm">{service.version}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(service.status)}>
                      {service.status}
                    </Badge>
                    <p className="text-gray-400 text-sm mt-1">{service.uptime} uptime</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Actions */}
        <Card className="bg-space-deep-blue border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="h-5 w-5" />
              System Actions
            </CardTitle>
            <CardDescription className="text-gray-400">
              Administrative tools and maintenance tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <Button variant="outline" className="justify-start border-gray-600 hover:bg-gray-800">
                <Database className="h-4 w-4 mr-2" />
                Database Backup
              </Button>
              <Button variant="outline" className="justify-start border-gray-600 hover:bg-gray-800">
                <RefreshCw className="h-4 w-4 mr-2" />
                Restart Services
              </Button>
              <Button variant="outline" className="justify-start border-gray-600 hover:bg-gray-800">
                <Download className="h-4 w-4 mr-2" />
                Export Logs
              </Button>
              <Button variant="outline" className="justify-start border-gray-600 hover:bg-gray-800">
                <Upload className="h-4 w-4 mr-2" />
                Deploy Update
              </Button>
            </div>

            <div className="pt-4 border-t border-gray-700">
              <h4 className="text-white font-medium mb-3">Quick Stats</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Database Size:</span>
                  <span className="text-white">2.3 GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Requests:</span>
                  <span className="text-white">1.2M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Error Rate:</span>
                  <span className="text-white">0.1%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Avg Response:</span>
                  <span className="text-white">145ms</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
