
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  ShoppingCart, 
  Target,
  Clock,
  Globe,
  BarChart3,
  Activity
} from "lucide-react";

interface KPIData {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ElementType;
  color: string;
}

const DemoKPIGrid: React.FC = () => {
  const [kpis, setKpis] = useState<KPIData[]>([
    {
      title: "Monthly Revenue",
      value: "$2.4M",
      change: 12.5,
      trend: 'up',
      icon: DollarSign,
      color: "text-green-500"
    },
    {
      title: "Active Users",
      value: "45,321",
      change: 8.2,
      trend: 'up',
      icon: Users,
      color: "text-blue-500"
    },
    {
      title: "Conversion Rate",
      value: "3.45%",
      change: -0.3,
      trend: 'down',
      icon: Target,
      color: "text-orange-500"
    },
    {
      title: "Order Volume",
      value: "12,847",
      change: 15.7,
      trend: 'up',
      icon: ShoppingCart,
      color: "text-purple-500"
    },
    {
      title: "Avg. Session Duration",
      value: "4m 32s",
      change: 5.1,
      trend: 'up',
      icon: Clock,
      color: "text-cyan-500"
    },
    {
      title: "Global Reach",
      value: "87 Countries",
      change: 2.0,
      trend: 'up',
      icon: Globe,
      color: "text-pink-500"
    },
    {
      title: "Customer Satisfaction",
      value: "94.8%",
      change: 1.2,
      trend: 'up',
      icon: Activity,
      color: "text-emerald-500"
    },
    {
      title: "Market Share",
      value: "23.4%",
      change: 0.8,
      trend: 'up',
      icon: BarChart3,
      color: "text-yellow-500"
    }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setKpis(prevKpis => 
        prevKpis.map(kpi => ({
          ...kpi,
          change: kpi.change + (Math.random() - 0.5) * 0.2
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Key Performance Indicators</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Monitor your business performance with real-time KPIs and actionable insights
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <Card key={index} className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-orange-500/30 transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-400">{kpi.title}</CardTitle>
                <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-white">{kpi.value}</p>
                  <div className="flex items-center mt-1">
                    {kpi.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : kpi.trend === 'down' ? (
                      <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    ) : null}
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        kpi.trend === 'up' 
                          ? 'text-green-400 border-green-500/30' 
                          : kpi.trend === 'down'
                          ? 'text-red-400 border-red-500/30'
                          : 'text-gray-400 border-gray-500/30'
                      }`}
                    >
                      {kpi.change > 0 ? '+' : ''}{kpi.change.toFixed(1)}%
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default DemoKPIGrid;
