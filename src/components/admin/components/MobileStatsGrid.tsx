
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatCard {
  title: string;
  value: string;
  icon: LucideIcon;
  change: string;
}

interface MobileStatsGridProps {
  stats: StatCard[];
}

export const MobileStatsGrid: React.FC<MobileStatsGridProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-space-deep-blue border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-gray-400 text-xs truncate">{stat.title}</p>
                <p className="text-lg md:text-2xl font-bold text-white truncate">{stat.value}</p>
                <p className="text-gray-400 text-xs truncate">{stat.change}</p>
              </div>
              <stat.icon className="h-6 w-6 md:h-8 md:w-8 text-accent flex-shrink-0 ml-2" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
