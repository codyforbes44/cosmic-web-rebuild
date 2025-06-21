
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RefreshCw } from 'lucide-react';

export const APIHealthStatus: React.FC = () => {
  const healthStatuses = [
    {
      name: 'Supabase',
      status: 'Operational',
      lastCheck: '1 minute ago',
      isHealthy: true
    },
    {
      name: 'OpenAI API',
      status: 'Operational',
      lastCheck: '2 minutes ago',
      isHealthy: true
    },
    {
      name: 'Anthropic API',
      status: 'Operational',
      lastCheck: '3 minutes ago',
      isHealthy: true
    },
    {
      name: 'HuggingFace API',
      status: 'Operational',
      lastCheck: '5 minutes ago',
      isHealthy: true
    },
    {
      name: 'ElevenLabs API',
      status: 'Operational',
      lastCheck: '4 minutes ago',
      isHealthy: true
    },
    {
      name: 'Stripe API',
      status: 'Operational',
      lastCheck: '6 minutes ago',
      isHealthy: true
    }
  ];

  return (
    <Card className="bg-space-deep-blue border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <RefreshCw className="h-5 w-5" />
          API Health Status
        </CardTitle>
        <CardDescription className="text-gray-400">
          Monitor the status of external API services
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {healthStatuses.map((service) => (
            <div key={service.name} className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${service.isHealthy ? 'bg-green-500' : 'bg-red-500'}`} />
                <div>
                  <p className="text-white font-medium">{service.name}</p>
                  <p className="text-gray-400 text-sm">Last check: {service.lastCheck}</p>
                </div>
              </div>
              <Badge className={`${service.isHealthy 
                ? 'bg-green-500/20 text-green-400 border-green-500/50' 
                : 'bg-red-500/20 text-red-400 border-red-500/50'}`}>
                {service.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
