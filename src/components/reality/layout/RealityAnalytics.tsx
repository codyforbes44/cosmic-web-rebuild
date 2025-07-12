import React from 'react';
import { PerformanceAnalytics } from '@/components/zephel/reality/features/PerformanceAnalytics';
import { SessionHistory } from '@/components/zephel/reality/features/SessionHistory';

interface RealityAnalyticsProps {
  showDetailed?: boolean;
  onRestoreSession?: (config: any) => void;
}

export const RealityAnalytics: React.FC<RealityAnalyticsProps> = ({
  showDetailed = true,
  onRestoreSession
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <PerformanceAnalytics showDetailed={showDetailed} />
      <SessionHistory 
        onRestoreSession={onRestoreSession || ((config) => console.log('Restore session:', config))} 
      />
    </div>
  );
};