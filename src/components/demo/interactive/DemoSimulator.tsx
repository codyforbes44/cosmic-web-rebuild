
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  TrendingUp, 
  TrendingDown,
  Zap,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

const DemoSimulator: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [scenario, setScenario] = useState<'growth' | 'crisis' | 'normal'>('normal');
  const [progress, setProgress] = useState(0);
  const [metrics, setMetrics] = useState({
    revenue: 100,
    users: 100,
    performance: 100,
    satisfaction: 100
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsRunning(false);
            return 100;
          }
          return prev + 2;
        });

        // Simulate different scenarios
        setMetrics(prev => {
          const multiplier = scenario === 'growth' ? 1.05 : scenario === 'crisis' ? 0.95 : 1.01;
          return {
            revenue: Math.max(0, prev.revenue * (multiplier + (Math.random() - 0.5) * 0.02)),
            users: Math.max(0, prev.users * (multiplier + (Math.random() - 0.5) * 0.03)),
            performance: Math.max(0, Math.min(100, prev.performance * (multiplier + (Math.random() - 0.5) * 0.01))),
            satisfaction: Math.max(0, Math.min(100, prev.satisfaction * (multiplier + (Math.random() - 0.5) * 0.02)))
          };
        });
      }, 200);
    }

    return () => clearInterval(interval);
  }, [isRunning, scenario]);

  const handleStart = (selectedScenario: 'growth' | 'crisis' | 'normal') => {
    setScenario(selectedScenario);
    setIsRunning(true);
    setProgress(0);
  };

  const handleReset = () => {
    setIsRunning(false);
    setProgress(0);
    setMetrics({
      revenue: 100,
      users: 100,
      performance: 100,
      satisfaction: 100
    });
    setScenario('normal');
  };

  const scenarios = [
    {
      id: 'growth' as const,
      title: 'Market Growth',
      description: 'Simulate rapid business expansion',
      icon: TrendingUp,
      color: 'text-green-500',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-500/30'
    },
    {
      id: 'crisis' as const,
      title: 'Market Crisis',
      description: 'Test system resilience during downturns',
      icon: TrendingDown,
      color: 'text-red-500',
      bgColor: 'bg-red-500/20',
      borderColor: 'border-red-500/30'
    },
    {
      id: 'normal' as const,
      title: 'Normal Conditions',
      description: 'Standard market conditions',
      icon: CheckCircle,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-500/30'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Business Scenario Simulator</h3>
        <p className="text-gray-300">Test how your KPIs respond to different market conditions</p>
      </div>

      {/* Scenario Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {scenarios.map((s) => (
          <Card
            key={s.id}
            className={`cursor-pointer transition-all duration-300 ${
              scenario === s.id
                ? `${s.bgColor} ${s.borderColor}`
                : 'bg-white/5 border-white/10 hover:border-white/20'
            }`}
            onClick={() => !isRunning && handleStart(s.id)}
          >
            <CardContent className="p-4 text-center">
              <s.icon className={`w-8 h-8 ${s.color} mx-auto mb-2`} />
              <h4 className="text-white font-semibold mb-1">{s.title}</h4>
              <p className="text-gray-400 text-sm">{s.description}</p>
              {scenario === s.id && isRunning && (
                <Badge className="mt-2 bg-orange-500/20 text-orange-400 border-orange-500/30">
                  RUNNING
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Simulation Controls */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            Simulation Controls
            <div className="flex items-center space-x-2">
              {!isRunning ? (
                <Button
                  size="sm"
                  onClick={() => handleStart(scenario)}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsRunning(false)}
                  className="border-gray-600 text-white hover:bg-gray-800"
                >
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </Button>
              )}
              <Button
                size="sm"
                variant="outline"
                onClick={handleReset}
                className="border-gray-600 text-white hover:bg-gray-800"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Simulation Progress</span>
                <span className="text-gray-300">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {isRunning && (
              <div className="flex items-center space-x-2 text-sm">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="text-yellow-400">
                  Simulating {scenario} scenario with real-time data updates
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Live Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardContent className="p-4">
            <h4 className="text-gray-400 text-sm mb-1">Revenue</h4>
            <p className="text-xl font-bold text-white">
              {metrics.revenue.toFixed(1)}%
            </p>
            <div className="flex items-center mt-1">
              {metrics.revenue > 100 ? (
                <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
              )}
              <span className={`text-xs ${
                metrics.revenue > 100 ? 'text-green-400' : 'text-red-400'
              }`}>
                {(metrics.revenue - 100).toFixed(1)}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardContent className="p-4">
            <h4 className="text-gray-400 text-sm mb-1">Users</h4>
            <p className="text-xl font-bold text-white">
              {metrics.users.toFixed(1)}%
            </p>
            <div className="flex items-center mt-1">
              {metrics.users > 100 ? (
                <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
              )}
              <span className={`text-xs ${
                metrics.users > 100 ? 'text-green-400' : 'text-red-400'
              }`}>
                {(metrics.users - 100).toFixed(1)}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardContent className="p-4">
            <h4 className="text-gray-400 text-sm mb-1">Performance</h4>
            <p className="text-xl font-bold text-white">
              {metrics.performance.toFixed(1)}%
            </p>
            <div className="flex items-center mt-1">
              {metrics.performance > 95 ? (
                <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
              ) : (
                <AlertTriangle className="w-3 h-3 text-yellow-500 mr-1" />
              )}
              <span className={`text-xs ${
                metrics.performance > 95 ? 'text-green-400' : 'text-yellow-400'
              }`}>
                {metrics.performance > 95 ? 'Excellent' : 'Warning'}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardContent className="p-4">
            <h4 className="text-gray-400 text-sm mb-1">Satisfaction</h4>
            <p className="text-xl font-bold text-white">
              {metrics.satisfaction.toFixed(1)}%
            </p>
            <div className="flex items-center mt-1">
              {metrics.satisfaction > 90 ? (
                <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
              ) : (
                <AlertTriangle className="w-3 h-3 text-orange-500 mr-1" />
              )}
              <span className={`text-xs ${
                metrics.satisfaction > 90 ? 'text-green-400' : 'text-orange-400'
              }`}>
                {metrics.satisfaction > 90 ? 'High' : 'Monitor'}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DemoSimulator;
