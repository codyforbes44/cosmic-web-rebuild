
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const PackagesHeader: React.FC = () => {
  return (
    <Card className="space-card bg-space-deep-blue/40 backdrop-blur-md border border-gray-800/40 rounded-xl mb-12">
      <CardContent className="p-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          Subscription Packages
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          Choose the perfect plan for your business needs. Our flexible packages are designed to provide you with the right level of support and technology solutions.
        </p>
      </CardContent>
    </Card>
  );
};

export default PackagesHeader;
