
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const PortfolioHeader = () => {
  return (
    <Card className="space-card bg-space-deep-blue/40 backdrop-blur-md border border-gray-800/40 rounded-xl mb-12">
      <CardContent className="p-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          Our Portfolio
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          Explore our successful projects and see how we've helped businesses transform and grow
        </p>
      </CardContent>
    </Card>
  );
};

export default PortfolioHeader;
