
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Info, CheckCircle } from 'lucide-react';

const WeatherAlerts = () => {
  // Mock weather alerts - in a real app, this would come from weather API
  const alerts = [
    {
      id: 1,
      type: 'info',
      title: 'Partly Cloudy Conditions',
      description: 'Expect partly cloudy skies throughout the day with temperatures in the comfortable range.',
      severity: 'low',
      expires: '6:00 PM today'
    }
  ];

  const getAlertIcon = (type: string, severity: string) => {
    if (severity === 'high') return <AlertTriangle className="w-5 h-5 text-red-400" />;
    if (severity === 'medium') return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
    return <Info className="w-5 h-5 text-blue-400" />;
  };

  const getAlertBorderColor = (severity: string) => {
    if (severity === 'high') return 'border-red-500/50';
    if (severity === 'medium') return 'border-yellow-500/50';
    return 'border-blue-500/50';
  };

  if (alerts.length === 0) {
    return (
      <Card className="bg-card/20 backdrop-blur-sm border-green-500/50 mt-6">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 text-green-300">
            <CheckCircle className="w-5 h-5" />
            <span>No weather alerts for your area</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-xl font-semibold text-white">Weather Alerts</h2>
      {alerts.map((alert) => (
        <Card
          key={alert.id}
          className={`bg-card/20 backdrop-blur-sm ${getAlertBorderColor(alert.severity)}`}
        >
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-3">
              {getAlertIcon(alert.type, alert.severity)}
              {alert.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-2">{alert.description}</p>
            <p className="text-sm text-gray-400">Expires: {alert.expires}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default WeatherAlerts;
