
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Key } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

export const APIUsageOverview: React.FC = () => {
  const { data: apiUsage, isLoading: isLoadingUsage } = useQuery({
    queryKey: ['api-usage'],
    queryFn: async () => {
      // Mock API usage data - in real implementation, fetch from edge functions logs
      return {
        openai: { requests: 245, lastUsed: '2024-01-15T10:30:00Z' },
        huggingface: { requests: 89, lastUsed: '2024-01-15T09:15:00Z' },
        anthropic: { requests: 156, lastUsed: '2024-01-18T14:22:00Z' },
        elevenlabs: { requests: 42, lastUsed: '2024-01-17T11:45:00Z' },
        stripe: { requests: 23, lastUsed: '2024-01-12T16:30:00Z' },
        total: 555
      };
    },
  });

  return (
    <Card className="bg-space-deep-blue border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Activity className="h-5 w-5" />
          API Usage Overview
        </CardTitle>
        <CardDescription className="text-gray-400">
          Monitor API usage and performance metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-black/20 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Requests</p>
                <p className="text-2xl font-bold text-white">
                  {isLoadingUsage ? '...' : apiUsage?.total || 0}
                </p>
                <p className="text-gray-400 text-sm">Last 30 days</p>
              </div>
              <Activity className="h-8 w-8 text-accent" />
            </div>
          </div>
          <div className="p-4 bg-black/20 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">OpenAI Requests</p>
                <p className="text-2xl font-bold text-white">
                  {isLoadingUsage ? '...' : apiUsage?.openai?.requests || 0}
                </p>
                <p className="text-gray-400 text-sm">Last 30 days</p>
              </div>
              <Key className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="p-4 bg-black/20 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Anthropic Requests</p>
                <p className="text-2xl font-bold text-white">
                  {isLoadingUsage ? '...' : apiUsage?.anthropic?.requests || 0}
                </p>
                <p className="text-gray-400 text-sm">Last 30 days</p>
              </div>
              <Key className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <div className="p-4 bg-black/20 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">HuggingFace Requests</p>
                <p className="text-2xl font-bold text-white">
                  {isLoadingUsage ? '...' : apiUsage?.huggingface?.requests || 0}
                </p>
                <p className="text-gray-400 text-sm">Last 30 days</p>
              </div>
              <Key className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="p-4 bg-black/20 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">ElevenLabs Requests</p>
                <p className="text-2xl font-bold text-white">
                  {isLoadingUsage ? '...' : apiUsage?.elevenlabs?.requests || 0}
                </p>
                <p className="text-gray-400 text-sm">Last 30 days</p>
              </div>
              <Key className="h-8 w-8 text-orange-400" />
            </div>
          </div>
          <div className="p-4 bg-black/20 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Stripe Requests</p>
                <p className="text-2xl font-bold text-white">
                  {isLoadingUsage ? '...' : apiUsage?.stripe?.requests || 0}
                </p>
                <p className="text-gray-400 text-sm">Last 30 days</p>
              </div>
              <Key className="h-8 w-8 text-indigo-400" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
