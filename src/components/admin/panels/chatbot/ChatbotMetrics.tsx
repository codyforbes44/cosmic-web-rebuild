
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, BarChart3, Zap, Clock } from 'lucide-react';

export const ChatbotMetrics: React.FC = () => {
  const chatbotMetrics = [
    { name: 'Active Conversations', value: '24', icon: MessageSquare, color: 'text-blue-400' },
    { name: 'Messages Today', value: '156', icon: BarChart3, color: 'text-green-400' },
    { name: 'Response Rate', value: '98%', icon: Zap, color: 'text-yellow-400' },
    { name: 'Avg Response Time', value: '2.3s', icon: Clock, color: 'text-purple-400' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {chatbotMetrics.map((metric, index) => (
        <Card key={index} className="bg-space-deep-blue border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{metric.name}</p>
                <p className="text-2xl font-bold text-white">{metric.value}</p>
              </div>
              <metric.icon className={`h-8 w-8 ${metric.color}`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
