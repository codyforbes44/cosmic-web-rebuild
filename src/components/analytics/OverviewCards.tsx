
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Globe, Clock, ArrowUpRight } from "lucide-react";

interface OverviewCardsProps {
  totalVisitors: number;
  totalCountries: number;
  avgTimeOnPage: number;
  topPage: string;
}

const OverviewCards: React.FC<OverviewCardsProps> = ({ 
  totalVisitors, 
  totalCountries, 
  avgTimeOnPage, 
  topPage 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card className="bg-card/20 backdrop-blur-sm border-white/10">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Visitors</p>
              <h4 className="text-2xl font-bold text-white mt-1">{totalVisitors}</h4>
            </div>
            <Users size={24} className="text-accent" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-card/20 backdrop-blur-sm border-white/10">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Countries</p>
              <h4 className="text-2xl font-bold text-white mt-1">{totalCountries}</h4>
            </div>
            <Globe size={24} className="text-accent" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-card/20 backdrop-blur-sm border-white/10">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Avg. Time on Page</p>
              <h4 className="text-2xl font-bold text-white mt-1">{avgTimeOnPage} sec</h4>
            </div>
            <Clock size={24} className="text-accent" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-card/20 backdrop-blur-sm border-white/10">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Most Visited Page</p>
              <h4 className="text-lg font-bold text-white mt-1 truncate max-w-[140px]" title={topPage}>
                {topPage}
              </h4>
            </div>
            <ArrowUpRight size={24} className="text-accent" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewCards;
