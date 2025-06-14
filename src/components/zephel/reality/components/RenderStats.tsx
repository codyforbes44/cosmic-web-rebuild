import React from 'react';
import { Badge } from "@/components/ui/badge";

interface RenderStatsProps {
  renderStats: {
    fps: number;
    triangles: number;
    drawCalls: number;
  };
}

export const RenderStats: React.FC<RenderStatsProps> = ({ renderStats }) => {
  return (
    <div className="flex gap-1">
      <Badge variant="outline" className="text-xs border-green-500 text-green-400">
        {renderStats.fps} FPS
      </Badge>
      <Badge variant="outline" className="text-xs border-blue-500 text-blue-400">
        {Math.floor(renderStats.triangles / 1000)}K ▲
      </Badge>
      <Badge variant="outline" className="text-xs border-purple-500 text-purple-400">
        {renderStats.drawCalls} DC
      </Badge>
    </div>
  );
};