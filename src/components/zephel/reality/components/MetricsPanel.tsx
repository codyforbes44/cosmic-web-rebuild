import React from 'react';

interface MetricsPanelProps {
  showMetrics: boolean;
  metrics: {
    performance: number;
    complexity: number;
    accuracy: number;
  };
}

export const MetricsPanel: React.FC<MetricsPanelProps> = ({
  showMetrics,
  metrics
}) => {
  if (!showMetrics) return null;

  return (
    <div className="absolute top-4 right-4 z-10 bg-black/80 p-3 rounded-lg border border-gray-600">
      <div className="text-xs text-cyan-400 font-semibold mb-2">System Metrics</div>
      <div className="space-y-1 text-xs text-gray-300">
        <div className="flex justify-between gap-4">
          <span>Performance:</span>
          <span className="text-green-400">{metrics.performance}%</span>
        </div>
        <div className="flex justify-between gap-4">
          <span>Complexity:</span>
          <span className="text-yellow-400">{metrics.complexity}%</span>
        </div>
        <div className="flex justify-between gap-4">
          <span>Accuracy:</span>
          <span className="text-blue-400">{metrics.accuracy}%</span>
        </div>
      </div>
    </div>
  );
};