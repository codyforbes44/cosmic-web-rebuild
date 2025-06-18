
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Target,
  Activity,
  ArrowRight,
  Zap
} from "lucide-react";

interface DemoTourProps {
  step: 'kpis' | 'analytics';
}

const DemoTour: React.FC<DemoTourProps> = ({ step }) => {
  const [highlightedMetric, setHighlightedMetric] = useState<number | null>(null);
  const [animatingValues, setAnimatingValues] = useState(false);

  useEffect(() => {
    // Simulate metric highlighting tour
    const highlights = [0, 1, 2, 3];
    let currentHighlight = 0;

    const interval = setInterval(() => {
      setHighlightedMetric(highlights[currentHighlight]);
      currentHighlight = (currentHighlight + 1) % highlights.length;
    }, 2000);

    // Animate values periodically
    const valueInterval = setInterval(() => {
      setAnimatingValues(true);
      setTimeout(() => setAnimatingValues(false), 500);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(valueInterval);
    };
  }, []);

  const kpiData = [
    {
      title: "Revenue Growth",
      value: "$2.4M",
      change: 12.5,
      trend: 'up' as const,
      icon: DollarSign,
      color: "text-green-500",
      description: "Monthly recurring revenue increased by 12.5% compared to last month"
    },
    {
      title: "Active Users",
      value: "45,321",
      change: 8.2,
      trend: 'up' as const,
      icon: Users,
      color: "text-blue-500",
      description: "Daily active users showing consistent growth pattern"
    },
    {
      title: "Conversion Rate",
      value: "3.45%",
      change: -0.3,
      trend: 'down' as const,
      icon: Target,
      color: "text-orange-500",
      description: "Slight decrease in conversion, optimization opportunities identified"
    },
    {
      title: "System Performance",
      value: "99.9%",
      change: 0.1,
      trend: 'up' as const,
      icon: Activity,
      color: "text-purple-500",
      description: "Exceptional uptime maintained across all services"
    }
  ];

  if (step === 'kpis') {
    return (
      <div className="p-6 space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-white mb-2">Real-time KPI Monitoring</h3>
          <p className="text-gray-300">Watch how metrics update automatically with live data streams</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiData.map((kpi, index) => (
            <Card 
              key={index} 
              className={`bg-white/5 backdrop-blur-sm transition-all duration-500 ${
                highlightedMetric === index
                  ? 'border-orange-500 shadow-lg shadow-orange-500/20 scale-105'
                  : 'border-white/10'
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-400">{kpi.title}</CardTitle>
                  <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <p className={`text-2xl font-bold text-white transition-all duration-300 ${
                    animatingValues ? 'scale-110 text-orange-400' : ''
                  }`}>
                    {kpi.value}
                  </p>
                  <div className="flex items-center">
                    {kpi.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        kpi.trend === 'up' 
                          ? 'text-green-400 border-green-500/30' 
                          : 'text-red-400 border-red-500/30'
                      }`}
                    >
                      {kpi.change > 0 ? '+' : ''}{kpi.change}%
                    </Badge>
                  </div>
                  
                  {highlightedMetric === index && (
                    <div className="mt-3 p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                      <p className="text-xs text-orange-300">{kpi.description}</p>
                      <Button size="sm" className="mt-2 bg-orange-500 hover:bg-orange-600 text-white">
                        <Zap className="w-3 h-3 mr-1" />
                        View Details
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-500/20 rounded-lg border border-green-500/30">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm">Live data updates every 30 seconds</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Advanced Analytics</h3>
        <p className="text-gray-300">Explore detailed insights and performance trends</p>
      </div>
      
      <div className="space-y-4">
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-semibold">Analytics Deep Dive</h4>
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                <ArrowRight className="w-4 h-4 mr-1" />
                Explore
              </Button>
            </div>
            <p className="text-gray-300 text-sm">
              Interactive charts, filtering capabilities, and predictive analytics powered by machine learning algorithms.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DemoTour;
