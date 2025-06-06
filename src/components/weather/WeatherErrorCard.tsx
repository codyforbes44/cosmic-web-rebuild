
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Settings } from "lucide-react";

interface WeatherErrorCardProps {
  error: string;
}

const WeatherErrorCard = ({ error }: WeatherErrorCardProps) => {
  return (
    <Card className="bg-card/20 backdrop-blur-sm border-amber-500/50 mb-6">
      <CardContent className="pt-4 md:pt-6">
        <div className="flex items-center gap-2 text-amber-300">
          <Settings className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm md:text-base">{error}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherErrorCard;
