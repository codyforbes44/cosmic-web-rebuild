import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings } from 'lucide-react';

interface SystemMetric {
  value: string | number | boolean;
  status: 'active' | 'warning' | 'error' | 'offline';
}

interface SystemStatusProps {
  metrics: Record<string, SystemMetric>;
}

export const SystemStatus: React.FC<SystemStatusProps> = ({ metrics }) => {
  return (
    <Card className="bg-space-deep-blue/90 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white text-sm flex items-center gap-2">
          <Settings className="w-4 h-4" />
          System Cores
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {Object.entries(metrics).map(([system, metric]) => (
          <div key={system} className="flex justify-between items-center">
            <span className="text-xs text-gray-400">{system}</span>
            <Badge variant="outline" className={`text-xs ${
              metric.status === 'active' ? 'border-green-500 text-green-400' :
              metric.status === 'warning' ? 'border-yellow-500 text-yellow-400' :
              metric.status === 'error' ? 'border-red-500 text-red-400' :
              'border-gray-500 text-gray-400'
            }`}>
              {String(metric.value)}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};