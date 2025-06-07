
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export const LoadingState: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-space-deep-blue border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin text-accent" />
            <span className="text-white">Loading users...</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
