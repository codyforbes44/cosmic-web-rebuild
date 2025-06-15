import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  Cpu, 
  MemoryStick, 
  Clock,
  Zap,
  TrendingUp,
  Monitor
} from 'lucide-react';

interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  memoryUsage: number;
  gpuMemory: number;
  drawCalls: number;
  triangles: number;
  renderTime: number;
  cpuUsage: number;
}

interface PerformanceAnalyticsProps {
  showDetailed?: boolean;
}

export const PerformanceAnalytics: React.FC<PerformanceAnalyticsProps> = ({
  showDetailed = false
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    frameTime: 16.67,
    memoryUsage: 45,
    gpuMemory: 32,
    drawCalls: 156,
    triangles: 125000,
    renderTime: 8.5,
    cpuUsage: 25
  });

  const [history, setHistory] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        fps: Math.floor(Math.random() * 15) + 50, // 50-65 fps
        frameTime: 1000 / (Math.floor(Math.random() * 15) + 50),
        memoryUsage: Math.floor(Math.random() * 30) + 40, // 40-70%
        gpuMemory: Math.floor(Math.random() * 20) + 25, // 25-45%
        drawCalls: Math.floor(Math.random() * 50) + 130, // 130-180
        triangles: Math.floor(Math.random() * 50000) + 100000, // 100k-150k
        renderTime: Math.random() * 5 + 6, // 6-11ms
        cpuUsage: Math.floor(Math.random() * 20) + 20 // 20-40%
      }));

      setHistory(prev => {
        const newHistory = [...prev, Math.floor(Math.random() * 15) + 50];
        return newHistory.slice(-20); // Keep last 20 readings
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getPerformanceStatus = (fps: number) => {
    if (fps >= 55) return { status: 'excellent', color: 'text-green-400', bg: 'bg-green-500/20' };
    if (fps >= 45) return { status: 'good', color: 'text-yellow-400', bg: 'bg-yellow-500/20' };
    return { status: 'poor', color: 'text-red-400', bg: 'bg-red-500/20' };
  };

  const performanceStatus = getPerformanceStatus(metrics.fps);

  return (
    <Card className="bg-slate-900/95 border-slate-700/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-cyan-400 text-sm flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Performance Analytics
          </CardTitle>
          <Badge 
            variant="outline" 
            className={`text-xs ${performanceStatus.color} border-current/30 ${performanceStatus.bg}`}
          >
            {performanceStatus.status.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        
        {/* Core Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Monitor className="w-3 h-3" />
                FPS
              </span>
              <span className={`text-xs font-mono ${performanceStatus.color}`}>
                {metrics.fps}
              </span>
            </div>
            <Progress 
              value={(metrics.fps / 60) * 100} 
              className="h-1 bg-slate-700"
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Frame Time
              </span>
              <span className="text-xs font-mono text-white">
                {metrics.frameTime.toFixed(1)}ms
              </span>
            </div>
            <Progress 
              value={Math.min((metrics.frameTime / 33.33) * 100, 100)} 
              className="h-1 bg-slate-700"
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <MemoryStick className="w-3 h-3" />
                Memory
              </span>
              <span className="text-xs font-mono text-white">
                {metrics.memoryUsage}%
              </span>
            </div>
            <Progress 
              value={metrics.memoryUsage} 
              className="h-1 bg-slate-700"
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Cpu className="w-3 h-3" />
                CPU
              </span>
              <span className="text-xs font-mono text-white">
                {metrics.cpuUsage}%
              </span>
            </div>
            <Progress 
              value={metrics.cpuUsage} 
              className="h-1 bg-slate-700"
            />
          </div>
        </div>

        {showDetailed && (
          <>
            {/* Detailed Metrics */}
            <div className="pt-2 border-t border-slate-700/50 space-y-2">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Draw Calls:</span>
                  <span className="text-white font-mono">{metrics.drawCalls}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Triangles:</span>
                  <span className="text-white font-mono">{metrics.triangles.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Render Time:</span>
                  <span className="text-white font-mono">{metrics.renderTime.toFixed(1)}ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">GPU Memory:</span>
                  <span className="text-white font-mono">{metrics.gpuMemory}%</span>
                </div>
              </div>
            </div>

            {/* FPS History Chart */}
            <div className="pt-2 border-t border-slate-700/50">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-3 h-3 text-cyan-400" />
                <span className="text-xs text-cyan-400">FPS History</span>
              </div>
              <div className="h-12 flex items-end gap-0.5">
                {history.map((fps, index) => (
                  <div
                    key={index}
                    className="flex-1 bg-cyan-500/30 rounded-t"
                    style={{ height: `${(fps / 60) * 100}%` }}
                    title={`${fps} FPS`}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {/* Performance Tips */}
        <div className="pt-2 border-t border-slate-700/50">
          <div className="text-xs text-gray-400">
            {metrics.fps < 45 && (
              <div className="flex items-center gap-1 text-yellow-400">
                <Zap className="w-3 h-3" />
                Reduce quality or particle count for better performance
              </div>
            )}
            {metrics.fps >= 55 && (
              <div className="flex items-center gap-1 text-green-400">
                <Zap className="w-3 h-3" />
                Performance optimal - you can increase quality
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};