
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  AlertTriangle, 
  Lock, 
  Key, 
  Eye, 
  Ban,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink
} from 'lucide-react';
import { SecurityErrorModal } from '../modals/SecurityErrorModal';

interface SecurityEvent {
  id: string;
  type: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  status: 'active' | 'resolved' | 'investigating';
  details?: {
    ipAddress?: string;
    userAgent?: string;
    userId?: string;
    endpoint?: string;
    attemptCount?: number;
    location?: string;
  };
}

export const AdminSecurityPanel: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<SecurityEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const securityMetrics = [
    { name: 'Failed Logins', value: '12', status: 'warning', icon: Lock },
    { name: 'Blocked IPs', value: '3', status: 'good', icon: Ban },
    { name: 'Active Sessions', value: '89', status: 'good', icon: Eye },
    { name: 'Security Events', value: '5', status: 'warning', icon: AlertTriangle },
  ];

  const securityEvents: SecurityEvent[] = [
    {
      id: 'SEC-001',
      type: 'Failed Login',
      description: 'Multiple failed login attempts from IP 192.168.1.100',
      severity: 'medium',
      timestamp: '2024-01-15 14:30:22',
      status: 'active',
      details: {
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        endpoint: '/auth/login',
        attemptCount: 5,
        location: 'New York, NY, USA'
      }
    },
    {
      id: 'SEC-002',
      type: 'Rate Limit',
      description: 'Rate limit exceeded for API endpoint /api/data',
      severity: 'low',
      timestamp: '2024-01-15 13:45:10',
      status: 'resolved',
      details: {
        ipAddress: '10.0.0.50',
        endpoint: '/api/data',
        attemptCount: 100,
        userAgent: 'PostmanRuntime/7.32.3'
      }
    },
    {
      id: 'SEC-003',
      type: 'Suspicious Activity',
      description: 'Unusual access pattern detected from user admin@example.com',
      severity: 'high',
      timestamp: '2024-01-15 12:15:30',
      status: 'investigating',
      details: {
        userId: 'user_123456',
        ipAddress: '203.0.113.1',
        userAgent: 'curl/7.68.0',
        location: 'Unknown'
      }
    }
  ];

  const securitySettings = [
    { name: 'Two-Factor Authentication', enabled: true, description: 'Require 2FA for admin accounts' },
    { name: 'Password Policies', enabled: true, description: 'Enforce strong password requirements' },
    { name: 'Session Timeout', enabled: true, description: 'Auto-logout after 30 minutes of inactivity' },
    { name: 'IP Whitelist', enabled: false, description: 'Restrict access to specific IP addresses' },
    { name: 'Audit Logging', enabled: true, description: 'Log all administrative actions' },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'low': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Clock className="h-4 w-4 text-yellow-400" />;
      case 'resolved': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'investigating': return <Eye className="h-4 w-4 text-blue-400" />;
      default: return <XCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getMetricStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'warning': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const handleEventClick = (event: SecurityEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="space-y-6">
      {/* Security Alert */}
      <Alert className="border-yellow-500/50 bg-yellow-500/10">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="text-yellow-300">
          You have 3 pending security events that require attention. Review them below.
        </AlertDescription>
      </Alert>

      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {securityMetrics.map((metric, index) => (
          <Card key={index} className="bg-space-deep-blue border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{metric.name}</p>
                  <p className="text-2xl font-bold text-white">{metric.value}</p>
                  <Badge className={getMetricStatusColor(metric.status)}>
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
        {/* Security Events */}
        <Card className="bg-space-deep-blue border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Recent Security Events
            </CardTitle>
            <CardDescription className="text-gray-400">
              Latest security alerts and incidents (click to view details)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {securityEvents.map((event) => (
                <div 
                  key={event.id} 
                  className="p-4 bg-black/20 rounded-lg border border-gray-700 cursor-pointer hover:bg-black/30 transition-colors"
                  onClick={() => handleEventClick(event)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(event.status)}
                      <span className="text-white font-medium">{event.type}</span>
                      <ExternalLink className="h-3 w-3 text-gray-400" />
                    </div>
                    <Badge className={getSeverityColor(event.severity)}>
                      {event.severity}
                    </Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{event.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <p className="text-gray-400">{event.timestamp}</p>
                    <span className="text-gray-400">#{event.id}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="bg-space-deep-blue border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Settings
            </CardTitle>
            <CardDescription className="text-gray-400">
              Configure security policies and features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {securitySettings.map((setting, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-medium">{setting.name}</span>
                    {setting.enabled ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-400" />
                    )}
                  </div>
                  <p className="text-gray-400 text-sm">{setting.description}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-gray-600 hover:bg-gray-800"
                >
                  {setting.enabled ? 'Disable' : 'Enable'}
                </Button>
              </div>
            ))}
            
            <div className="pt-4 border-t border-gray-700">
              <Button className="w-full bg-accent hover:bg-accent/80 text-white">
                <Key className="h-4 w-4 mr-2" />
                Generate API Key
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <SecurityErrorModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        event={selectedEvent}
      />
    </div>
  );
};
